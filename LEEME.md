# Bettarea · Control interno (app Android)

App de venta, inventario y contabilidad de **Bettarea** (www.bettarea.es) para tablet Android.
Es una app nativa hecha con **Capacitor**: la interfaz está en `www/index.html` y GitHub compila el APK.

## Estructura
| Ruta | Qué es |
|---|---|
| `www/index.html` | La app completa (pantallas, venta, gestión, contabilidad, impresora…). |
| `version.txt` | Número de versión (p. ej. `0.2.0`). Cada versión nueva crea un APK en *Releases*. |
| `package.json`, `capacitor.config.json` | Configuración de Capacitor y de los complementos nativos. |
| `scripts/` | Preparan el proyecto Android: permisos, icono, firma y el instalador de actualizaciones. |
| `recursos/` | Icono, pantalla de arranque y clave de firma (`firma.keystore`). |
| `.github/workflows/compilar-apk.yml` | Compila el APK en GitHub en cada subida. |

## Complementos nativos
- **Impresora Bluetooth clásica** (impresoras ya vinculadas): `cordova-plugin-bluetooth-serial`.
- **Impresora BLE**: `@capacitor-community/bluetooth-le`.
- **Recordatorios** con notificación aunque la app esté cerrada: `@capacitor/local-notifications`.
- **Actualizaciones**: la app consulta *Releases* de GitHub, descarga el APK y abre el instalador.

## Publicar una versión nueva
1. Sustituye los archivos que cambien (normalmente `www/index.html` y `version.txt`).
2. Súbelos a la rama `main` → **Actions** compila el APK (unos 4 minutos) y lo publica en **Releases**.
3. En la tablet: *Configuración → Actualizaciones → Buscar actualización → Descargar e instalar*.

La firma es siempre la misma (`recursos/firma.keystore`), así cada APK se instala encima del anterior sin perder datos.

## Primera instalación
Descarga el `.apk` de **Releases** en la tablet, ábrelo y permite «Instalar apps de origen desconocido».
