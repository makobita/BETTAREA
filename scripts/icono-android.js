// Pone el icono de la app y la pantalla de arranque (carpeta recursos/android-res) en el proyecto Android.
// Se ejecuta después de "npx cap add android".
const fs = require('fs');
const path = require('path');
const origen = path.join(__dirname, '..', 'recursos', 'android-res');
const destino = path.join(__dirname, '..', 'android', 'app', 'src', 'main', 'res');
if (!fs.existsSync(destino)) { console.error('No existe ' + destino + '. Ejecuta antes: npx cap add android'); process.exit(1); }
fs.cpSync(origen, destino, { recursive: true, force: true });
console.log('Icono y pantalla de arranque copiados');


// Pantalla de arranque: fondo naranja Bettarea con el logo grande en el centro.
// Se sustituyen las imágenes splash.png antiguas por un dibujo que usa recursos/splash_icon.png
for (const dir of fs.readdirSync(destino)) {
  const f = path.join(destino, dir, 'splash.png');
  if (dir.startsWith('drawable') && fs.existsSync(f)) fs.unlinkSync(f);
}
fs.mkdirSync(path.join(destino, 'drawable'), { recursive: true });
fs.mkdirSync(path.join(destino, 'drawable-nodpi'), { recursive: true });
const logoArranque = path.join(__dirname, '..', 'recursos', 'splash_icon.png');
if (fs.existsSync(logoArranque)) fs.copyFileSync(logoArranque, path.join(destino, 'drawable-nodpi', 'splash_icon.png'));
fs.writeFileSync(path.join(destino, 'drawable', 'splash.xml'),
`<?xml version="1.0" encoding="utf-8"?>
<layer-list xmlns:android="http://schemas.android.com/apk/res/android">
    <item android:drawable="@color/ic_launcher_background" />
    <item android:width="320dp" android:height="320dp" android:gravity="center" android:drawable="@drawable/splash_icon" />
</layer-list>
`);
// Android 12 o más: la pantalla de arranque del sistema también en naranja con el logo
const estilos = path.join(destino, 'values', 'styles.xml');
if (fs.existsSync(estilos)) {
  let xml = fs.readFileSync(estilos, 'utf8');
  if (!xml.includes('windowSplashScreenBackground')) {
    xml = xml.replace(/(<style name="AppTheme\.NoActionBarLaunch"[^>]*>)/,
      '$1\n        <item name="windowSplashScreenBackground">#FF6600</item>\n        <item name="windowSplashScreenAnimatedIcon">@drawable/splash_icon</item>\n        <item name="android:windowBackground">@drawable/splash</item>');
    fs.writeFileSync(estilos, xml);
  }
}
console.log('Pantalla de arranque naranja configurada');
