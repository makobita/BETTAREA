# Historial de versiones · Bettarea Control interno

El formato sigue versiones `MAYOR.MENOR.PARCHE`.

## 0.1.23 — 2026-11-13
- App instalable (PWA): manifiesto, iconos de Bettarea y modo sin conexión (service worker).
- APK de Android compilado automáticamente por GitHub Actions en cada cambio y publicado en Releases (`bettarea.apk`), firmado siempre con la misma clave.
- La app Android (Trusted Web Activity con Chrome) carga la web publicada: se actualiza sola y mantiene Bluetooth para la impresora.
- Configuración → Actualizaciones: enlace para descargar el APK.
- Las actualizaciones siguen llegando desde GitHub: primero se consulta la red y, sin internet, se usa la copia guardada.

## 0.1.22 — 2026-11-13
- Nuevo: Recordatorios, con botón de campana en la cabecera y contador de los pendientes de hoy.
- Lista de próximos recordatorios ordenados por fecha; alta con texto, día y hora, y atajos (30 min, 1 h, 3 h, mañana 9:00).
- A la hora indicada salta un aviso a pantalla completa con sonido: «Hecho» o «Posponer 10 min».
- Los recordatorios que vencieron con la app cerrada avisan al abrirla. Completados ocultables.
- Cabecera más compacta en tablets de 7".

## 0.1.21 — 2026-11-13
- Pantalla de Venta: eliminado el contador «Hoy: X ventas · importe»; esos datos siguen en Contabilidad.

## 0.1.20 — 2026-11-13
- Configuración → Ticket: diseño a dos columnas, opciones a la izquierda y vista previa a la derecha, con cambios en tiempo real.
- En pantallas estrechas (7" vertical) la vista previa queda fija arriba mientras se desplazan las opciones.

## 0.1.19 — 2026-11-13
- Cierre de caja: tras cerrar, la app pregunta «¿Quieres imprimir el justificante de ventas del día?» (Imprimir / No, gracias).
- El impreso pasa a llamarse «Justificante de ventas» e indica el periodo del cierre.
- Configuración → Caja: opción para activar o desactivar esta pregunta.

## 0.1.18 — 2026-11-13
- Al abrir la app, los productos de prueba cargados antes de la 0.1.17 reciben automáticamente su foto (no hace falta resetear).

## 0.1.17 — 2026-11-13
- Datos de prueba: 113 de los 230 productos traen foto real de su especie (38 fotos de Wikimedia Commons, incluidas en la app).
- Para verlas: Configuración → Datos de prueba → Resetear, o desactivar y activar los datos de prueba.

## 0.1.16 — 2026-11-13
- Gestión: estrella para marcar productos como favoritos (en la lista del inventario y en la ficha del producto).
- Venta: sección «Favoritos» arriba del todo, ordenada por unidades vendidas; los agotados van al final.
- Venta: nuevo filtro «★ Favoritos» junto a las categorías.

## 0.1.15 — 2026-11-13
- Forzar venta: campo «Texto adicional» en modo Betta para completar la descripción (p. ej. «Betta macho Crowntail azul koi»).
- Botón «Forzar venta» en el naranja de la marca.
- Buscadores de Venta e Inventario con botón ✕ para borrar el texto y quitar el filtro.

## 0.1.14 — 2026-11-13
- Venta: botón «Forzar venta» para vender con precio y cantidad a mano.
- Modo texto libre (opcional) o modo Betta: macho/hembra y tipo de aleta (Crowntail, Longtail, Shorttail, Doble cola, Dumbo, Veiltail).
- El texto elegido es el que sale en el ticket; si no hay texto, solo cantidad y precio.
- Las líneas manuales se pueden añadir a la cesta o cobrar al momento; cuentan en contabilidad y no modifican el stock.

## 0.1.13 — 2026-11-13
- Impresora: perfil para la Qian T80UL (80 mm, 576 puntos, ESC/POS).
- Corte automático del papel al terminar cada ticket (activable).
- Opción para abrir el cajón portamonedas conectado a la impresora al vender (desactivada por defecto; no se abre al reimprimir).
- Papel de 80 mm por defecto y guía de conexión por Bluetooth directo o app RawBT.

## 0.1.12 — 2026-11-13
- Ticket: el logo pasa a ser de línea; los dos bettas salen en blanco con contorno negro.
- Trazos más gruesos para una impresión limpia en térmicas de 58 y 80 mm.

## 0.1.11 — 2026-11-13
- Logo rehecho en alta calidad a partir del archivo original (EPS).
- Ticket: nuevo logo en blanco y negro con los dos bettas abrazados y el texto «BETTAREA.ES · CENTRO ESPECIALIZADO DE ACUAROFILIA» en círculo, preparado para impresoras térmicas de 58 y 80 mm.
- App: logo de la cabecera más nítido en pantallas de tablet.

## 0.1.10 — 2026-11-13
Primera versión publicada en GitHub.
- Venta: productos por categorías, cesta con sumar/restar/eliminar, total y confirmación de venta.
- Ofertas por lote: siempre se cobra la combinación más barata para el cliente, con desglose y aviso para completar lote.
- Gestión: alta y edición de productos (nombre, nombre técnico, stock, precio, lotes, fecha de entrada, foto) y categorías.
- Contabilidad: turno del día con cierre automático a una hora configurable, cierre de caja manual, filtros por día, fechas, mes y año, reimpresión y anulación de ventas.
- Impresora térmica 58/80 mm por Bluetooth (BLE) o app RawBT, con conexión automática al abrir.
- Ticket configurable: logo, nombre de la tienda, agradecimiento, frase a mano y texto propio; secciones movibles y redimensionables.
- Temas claro y oscuro, optimizado para tablet Android de 7" a 11".
- Configuración en lista y buscador de actualizaciones conectado a este repositorio.
