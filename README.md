# Bettarea · Control interno

App de venta, inventario y contabilidad de **Bettarea** (www.bettarea.es), para tablet Android de 7" a 11".

- **Web:** https://makobita.github.io/BETTAREA/
- **APK Android:** https://github.com/makobita/BETTAREA/releases/latest/download/bettarea.apk

## Cómo funciona
| Pieza | Qué hace |
|---|---|
| `index.html` | La app completa. |
| `version.json` | Versión publicada; la app la consulta en *Configuración → Actualizaciones*. |
| `manifest.webmanifest`, `sw.js`, `icon-*.png` | App instalable, icono y funcionamiento sin conexión. |
| `.github/workflows/android.yml` | GitHub Actions compila el **APK** en cada cambio y lo publica en *Releases*. |
| `CHANGELOG.md` | Historial de cambios. |

El APK es una *Trusted Web Activity*: abre la web publicada con el motor de Chrome (con Bluetooth para la impresora). Por eso **la app instalada se actualiza sola**: basta con subir los cambios a GitHub.

## Secretos necesarios (Settings → Secrets and variables → Actions)
| Nombre | Valor |
|---|---|
| `ANDROID_KEYSTORE_B64` | Contenido de `bettarea.jks.b64` |
| `ANDROID_KEYSTORE_PASSWORD` | Contraseña de la clave |

Con ellos el APK se firma siempre con la misma clave y se puede instalar encima del anterior. **Guarda una copia de `bettarea.jks` y su contraseña fuera de GitHub.**

## GitHub Pages
*Settings → Pages → Deploy from a branch → `main` / `(root)` → Save.*

## Publicar una versión nueva
1. Sustituye `index.html` (lleva dentro `APP_VERSION`).
2. Actualiza `version.json` con el mismo número, fecha y novedades, y añade la entrada en `CHANGELOG.md`.
3. GitHub publica la web y compila el APK solo (pestaña *Actions*).
4. En la tablet: *Configuración → Actualizaciones → Buscar actualización → Instalar*.

## Pantalla completa sin barra de dirección (opcional)
Android solo quita la barra de dirección si la web demuestra que el APK es suyo, con el archivo
`https://makobita.github.io/.well-known/assetlinks.json`. Para eso hace falta un repositorio llamado **`makobita.github.io`** con ese archivo (y un `.nojekyll`).

## Versiones
`MAYOR.MENOR.PARCHE` — empezamos en **0.1.10**.
