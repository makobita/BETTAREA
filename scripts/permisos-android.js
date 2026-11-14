// Ajusta el proyecto Android: permisos de Bluetooth (impresora), micrófono (búsqueda por voz), notificaciones (recordatorios),
// instalación de actualizaciones, orientación libre, pantalla siempre encendida y pantalla completa.
// Se ejecuta una vez, después de "npx cap add android".
const fs = require('fs');
const path = require('path');
const ruta = 'android/app/src/main/AndroidManifest.xml';
if (!fs.existsSync(ruta)) { console.error('No existe ' + ruta + '. Ejecuta antes: npx cap add android'); process.exit(1); }
let xml = fs.readFileSync(ruta, 'utf8');
const permisos = [
  '<uses-permission android:name="android.permission.BLUETOOTH" />',
  '<uses-permission android:name="android.permission.BLUETOOTH_ADMIN" />',
  '<uses-permission android:name="android.permission.BLUETOOTH_SCAN" android:usesPermissionFlags="neverForLocation" />',
  '<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />',
  '<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" android:maxSdkVersion="30" />',
  '<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" android:maxSdkVersion="30" />',
  '<uses-permission android:name="android.permission.REQUEST_INSTALL_PACKAGES" />',
  '<uses-permission android:name="android.permission.POST_NOTIFICATIONS" />',
  '<uses-permission android:name="android.permission.SCHEDULE_EXACT_ALARM" />',
  '<uses-permission android:name="android.permission.RECEIVE_BOOT_COMPLETED" />',
  '<uses-permission android:name="android.permission.RECORD_AUDIO" />',
  '<uses-feature android:name="android.hardware.bluetooth" android:required="false" />',
  '<uses-feature android:name="android.hardware.bluetooth_le" android:required="false" />'
];
let añadidos = 0;
for (const p of permisos) {
  const nombre = p.match(/android:name="([^"]+)"/)[1];
  if (!xml.includes('"' + nombre + '"')) { xml = xml.replace('</manifest>', '    ' + p + '\n</manifest>'); añadidos++; }
}
// Búsqueda por voz: Android 11+ necesita poder ver el servicio de reconocimiento de voz
if (!xml.includes('android.speech.RecognitionService')) {
  xml = xml.replace('</manifest>', '    <queries>\n        <intent>\n            <action android:name="android.speech.RecognitionService" />\n        </intent>\n    </queries>\n</manifest>');
}
// La app gira libremente (vertical u horizontal)
xml = xml.replace(/ android:screenOrientation="[^"]*"/g, '');
xml = xml.replace(/<activity\b/, '<activity android:screenOrientation="fullSensor"');
fs.writeFileSync(ruta, xml);
console.log('Permisos añadidos: ' + añadidos);

// Actividad principal: pantalla siempre encendida, pantalla completa y complemento "Instalador" de actualizaciones
const javaDir = path.join(__dirname, '..', 'android', 'app', 'src', 'main', 'java');
const buscarActividad = d => { for (const f of fs.readdirSync(d, { withFileTypes:true })) { const r = path.join(d, f.name); if (f.isDirectory()) { const x = buscarActividad(r); if (x) return x; } else if (f.name === 'MainActivity.java') return r; } return null; };
const act = fs.existsSync(javaDir) ? buscarActividad(javaDir) : null;
if (!act) { console.error('No se encuentra MainActivity.java'); process.exit(1); }
const paquete = (fs.readFileSync(act, 'utf8').match(/^package\s+[^;]+;/m) || [''])[0];
fs.writeFileSync(act, paquete + `

import android.os.Bundle;
import android.view.WindowManager;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(InstaladorPlugin.class);
        super.onCreate(savedInstanceState);
        getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
        pantallaCompleta();
    }
    // Pantalla completa: oculta la barra de arriba y la de navegación (se ven deslizando desde el borde)
    private void pantallaCompleta() {
        WindowCompat.setDecorFitsSystemWindows(getWindow(), false);
        WindowInsetsControllerCompat c = WindowCompat.getInsetsController(getWindow(), getWindow().getDecorView());
        c.hide(WindowInsetsCompat.Type.systemBars());
        c.setSystemBarsBehavior(WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
    }
    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus) pantallaCompleta();
    }
}
`);
// Instalador de actualizaciones: descarga el APK nuevo de GitHub y abre el instalador de Android
fs.writeFileSync(path.join(path.dirname(act), 'InstaladorPlugin.java'), paquete + `

import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import androidx.core.content.FileProvider;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

@CapacitorPlugin(name = "Instalador")
public class InstaladorPlugin extends Plugin {
    @PluginMethod
    public void instalar(PluginCall call) {
        String url = call.getString("url");
        if (url == null) { call.reject("sin url"); return; }
        if (Build.VERSION.SDK_INT >= 26 && !getContext().getPackageManager().canRequestPackageInstalls()) {
            Intent ajustes = new Intent(Settings.ACTION_MANAGE_UNKNOWN_APP_SOURCES, Uri.parse("package:" + getContext().getPackageName()));
            ajustes.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            getContext().startActivity(ajustes);
            JSObject r = new JSObject(); r.put("permiso", false); call.resolve(r); return;
        }
        new Thread(() -> {
            try {
                File apk = new File(getContext().getCacheDir(), "Bettarea-actualizacion.apk");
                HttpURLConnection c = (HttpURLConnection) new URL(url).openConnection();
                c.setInstanceFollowRedirects(true);
                for (int i = 0; i < 5; i++) { int code = c.getResponseCode(); if (code / 100 != 3) break; c = (HttpURLConnection) new URL(c.getHeaderField("Location")).openConnection(); }
                long total = c.getContentLengthLong(), hecho = 0; int ultimo = -1;
                try (InputStream in = c.getInputStream(); FileOutputStream out = new FileOutputStream(apk)) {
                    byte[] b = new byte[65536]; int n;
                    while ((n = in.read(b)) > 0) {
                        out.write(b, 0, n); hecho += n;
                        int pct = total > 0 ? (int) (hecho * 100 / total) : -1;
                        if (pct != ultimo) { ultimo = pct; JSObject pr = new JSObject(); pr.put("pct", pct); pr.put("bytes", hecho); notifyListeners("progreso", pr); }
                    }
                }
                Uri uri = FileProvider.getUriForFile(getContext(), getContext().getPackageName() + ".fileprovider", apk);
                Intent i = new Intent(Intent.ACTION_VIEW);
                i.setDataAndType(uri, "application/vnd.android.package-archive");
                i.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION | Intent.FLAG_ACTIVITY_NEW_TASK);
                getContext().startActivity(i);
                JSObject r = new JSObject(); r.put("permiso", true); call.resolve(r);
            } catch (Exception e) { call.reject("descarga: " + e.getMessage()); }
        }).start();
    }
}
`);
console.log('Pantalla encendida, pantalla completa e instalador configurados');
