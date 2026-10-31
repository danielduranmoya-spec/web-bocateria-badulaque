# Bocatería Badulaque · web (demo para el cliente)

Propuesta de web para Bocatería Badulaque (Pl. de Pizarro, 17, Mérida · 622 64 11 69 · Instagram @bocateriabadulaque). Tarifa *Landing page* del portfolio (desde 390 €), sobre la estructura del modelo ÁNCORA / piloto Café Joplin.

Demo: https://danielduranmoya-spec.github.io/web-bocateria-badulaque/ (con `noindex`: no sale en Google)

```
web-bocateria-badulaque/
├── index.html        ← la web (estructura y textos)
├── style.css         ← estilos: colores, tipografías y espaciado al principio, en :root
├── script.js         ← teléfono, WhatsApp, Just Eat, horario y carta (CONFIG y CARTA)
├── aviso-legal.html  ← plantilla: completa los campos [PENDIENTE]
├── privacidad.html   ← plantilla: completa los campos [PENDIENTE]
├── cookies.html      ← qué guarda la web y qué servicios externos usa
└── favicon.svg
```

## Secciones

1. **Inicio**: «El badulaque de los bocatas», cielo con nubes y la fachada de la tienda dibujada (toldo de rayas, escaparate, mostrador y caja registradora). Detrás del mostrador saluda la mascota, un bocadillo con gorro de dependiente. El cartel de la puerta y el aviso de arriba cambian entre «Abierto» y «Cerrado» según la hora real.
2. **Las estanterías (carta + ticket de caja)**: cada sección es un «pasillo» (bocadillos, hamburguesas, perritos, para picar, peques y bebidas). Los platos están en baldas con etiqueta de precio y un botón «+». La cesta sale como un ticket de caja que se envía ya escrito por WhatsApp, con nombre y hora de recogida, y termina en «¡Gracias, vuelva pronto!». En móvil, una barra fija muestra cuántas cosas llevas y el total.
3. **Opiniones**: extractos reales de reseñas en bocadillos de cómic y las etiquetas de la ficha de Google.
4. **Horario y dónde**: horario con el día de hoy marcado, WhatsApp, llamar, Just Eat y mapa (solo si se acepta).
5. **Dudas rápidas** y pie.

## Estética

Inspirada en la tienda de barrio de los dibujos animados, porque el nombre del local es un guiño a ella: trazo negro grueso, colores planos (cielo, amarillo, rojo, verde), sombras sólidas y botones «de goma». Tipografías Lilita One (títulos), Nunito (texto) y Courier Prime (tickets y etiquetas).

No usa personajes, logotipos ni imágenes de *Los Simpson*: están protegidos por derechos de autor y marca de Disney, y en la web de un negocio real pueden acabar en una reclamación o en la retirada de la web. La mascota y la fachada son dibujos propios hechos en SVG dentro de `index.html`.

## Fuentes de los datos (octubre 2026)

- Dirección, teléfono, nota y reseñas: [GastroRanking](https://gastroranking.es/r/bocateria-en-merida-badulaque_280426/).
- Horario, servicios (terraza, para llevar, Just Eat, tarjeta, menú infantil) y tipo de comida: [InTravel](https://intravel.net/extremadura-merida/restaurants-cafes/bocateria-badulaque).

## Pendiente de confirmar con el local

- **Carta y precios**: no hay carta publicada en texto. Los platos son de ejemplo según lo que dicen las fichas (bocadillos, hamburguesas, perritos, croquetas, alioli, menú infantil) y los precios son orientativos dentro del rango 1–10 €. Cambiar en `CARTA` (`script.js`) y quitar la nota «Precios orientativos» (`.carta__note` en `index.html`).
- **Horario**: `CONFIG.horario` (`script.js`) y la tabla `.hours` (`index.html`).
- **WhatsApp**: se usa el mismo número del teléfono. Confirmar que tiene WhatsApp.
- **Just Eat**: poner el enlace directo a su ficha en `CONFIG.justEat`.
- **Fotos**: la demo no lleva fotos. Con fotos reales de sus bocadillos, la ilustración del inicio se puede cambiar por una foto.
- **Textos legales**: titular, NIF y correo en `aviso-legal.html` y `privacidad.html`.
- Al pasar a web real: quitar la barra «Propuesta» (`.concept-bar`), el `noindex` del `<head>` y el crédito del pie si el cliente lo prefiere.

## Publicar cambios

GitHub Pages desde la rama `main` (carpeta raíz). Cada `git push` a `main` actualiza la web en uno o dos minutos.
