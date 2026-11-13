# Bettarea · Control interno

App de venta, inventario y contabilidad de **Bettarea** (www.bettarea.es), pensada para tablet Android de 7" a 11".

**App publicada:** https://makobita.github.io/BETTAREA/

## Archivos
| Archivo | Para qué sirve |
|---|---|
| `index.html` | La app completa (un solo archivo). |
| `version.json` | Versión publicada. La app lo consulta en *Configuración → Actualizaciones*. |
| `CHANGELOG.md` | Historial de cambios. |
| `.nojekyll` | Para que GitHub Pages sirva los archivos tal cual. |

## Puesta en marcha (una sola vez)
1. Sube estos archivos a la rama `main` del repositorio.
2. En GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, rama `main`, carpeta `/ (root)` → **Save**.
3. A los 1-2 minutos la app estará en https://makobita.github.io/BETTAREA/
4. En la tablet ábrela con **Chrome** y usa el menú ⋮ → **Añadir a pantalla de inicio** para tenerla como una app.

## Cómo se publica una versión nueva
1. Sustituye `index.html` por la versión nueva (lleva dentro `APP_VERSION`).
2. Actualiza `version.json` con el mismo número, la fecha y las novedades.
3. Añade la entrada en `CHANGELOG.md`.
4. En la tablet: *Configuración → Actualizaciones → Buscar actualización → Instalar*.

Los datos (productos, ventas, ajustes) se guardan en la propia tablet y **se conservan al actualizar**.

## Versiones
`MAYOR.MENOR.PARCHE` — empezamos en **0.1.10**.
- PARCHE (0.1.**11**): arreglos y cambios pequeños.
- MENOR (0.**2**.0): funciones nuevas.
- MAYOR (**1**.0.0): versión estable definitiva.
