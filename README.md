# Bocatería Badulaque · web (demo para el cliente)

Propuesta de web para Bocatería Badulaque (Pl. de Pizarro, 17, Mérida · 622 64 11 69 · Instagram @bocateriabadulaque). Tarifa *Landing page* del portfolio (desde 390 €), sobre la estructura del modelo ÁNCORA / piloto Café Joplin.

Demo: https://danielduranmoya-spec.github.io/web-bocateria-badulaque/ (con `noindex`: no sale en Google)

```
web-bocateria-badulaque/
├── index.html        ← la web (estructura y textos)
├── style.css         ← estilos: colores, tipografías y espaciado al principio, en :root
├── script.js         ← teléfono, Just Eat, horario y carta (CONFIG y CARTA)
├── img/              ← capturas de Los Simpson usadas en la ambientación (apu-cara.jpg es el icono del mapa)
├── vendor/leaflet/   ← librería del mapa (Leaflet 1.9.4, licencia BSD)
├── aviso-legal.html  ← plantilla: completa los campos [PENDIENTE]
├── privacidad.html   ← plantilla: completa los campos [PENDIENTE]
├── cookies.html      ← qué guarda la web y qué servicios externos usa
└── favicon.svg
```

## Secciones

En la cabecera, un **menú desplegable** con los cinco pasillos de la carta (abren directamente esa sección), Opiniones, Horario, Cómo llegar, Preguntas y el botón de llamar.


1. **Inicio**: «El badulaque de los bocatas» sobre la pared de la tienda, aviso «Abierto ahora / Cerrado» en directo, nota de Google (4,3 · 131 reseñas) y la escena de Apu con Bart en el mostrador, en marco de viñeta con el bocadillo «¡Gracias, vuelva pronto!».
2. **La carta**: cada sección es un «pasillo» (bocadillos, hamburguesas, perritos, para picar, peques y bebidas) con los platos en baldas y etiqueta de precio. Es solo informativa: no hay carrito. Al lado, la imagen de Apu en el pasillo 3 y un cartel rojo «¿Te lo preparamos?» con el botón de llamar al local. En móvil, un botón fijo «Llamar para pedir».
3. **Opiniones**: extractos reales de reseñas en bocadillos de cómic y las etiquetas de la ficha de Google.
4. **Horario y cómo llegar**: horario con el día de hoy marcado, llamar y Just Eat. Al aceptar el mapa (OpenStreetMap con Leaflet), Apu camina por la ruta real a pie desde la plaza de España hasta el local (603 m, ruta calculada con OSRM a pie) y al llegar dice «¡Gracias, vuelva pronto!». Botón «Repetir el paseo».
5. **Preguntas en el mostrador**, con la imagen de Apu subido al mostrador, y pie «¡Gracias, vuelva pronto!».

## Estética

Ambientada en el Badulaque de *Los Simpson*, a petición de Daniel y con sus imágenes de referencia (carpeta `img/`): trazo negro grueso, colores planos, sombras sólidas y botones «de goma». Tipografías Lilita One (títulos), Nunito (texto) y Courier Prime (etiquetas).

**Aviso sobre derechos**: los personajes y las capturas de *Los Simpson* son propiedad de Disney/20th Television. Valen para la demo, pero en la web definitiva del local es mejor sustituirlas por fotos propias o ilustraciones originales, o asumir el riesgo de una reclamación o retirada.

## Fuentes de los datos (octubre 2026)

- Dirección, teléfono, nota y reseñas: [GastroRanking](https://gastroranking.es/r/bocateria-en-merida-badulaque_280426/).
- Horario, servicios (terraza, para llevar, Just Eat, tarjeta, menú infantil) y tipo de comida: [InTravel](https://intravel.net/extremadura-merida/restaurants-cafes/bocateria-badulaque).

## Pendiente de confirmar con el local

- **Carta y precios**: no hay carta publicada en texto. Los platos son de ejemplo según lo que dicen las fichas (bocadillos, hamburguesas, perritos, croquetas, alioli, menú infantil) y los precios son orientativos dentro del rango 1–10 €. Cambiar en `CARTA` (`script.js`) y quitar la nota «Precios orientativos» (`.carta__note` en `index.html`).
- **Horario**: `CONFIG.horario` (`script.js`) y la tabla `.hours` (`index.html`).
- **Ruta del mapa**: `CONFIG.ruta` y `CONFIG.local` (`script.js`). El punto del local sale de la ficha de GastroRanking; conviene comprobarlo en el mapa real.
- **Just Eat**: poner el enlace directo a su ficha en `CONFIG.justEat`.
- **Fotos**: la demo no lleva fotos del local. Ver el aviso sobre derechos de las imágenes de la serie.
- **Textos legales**: titular, NIF y correo en `aviso-legal.html` y `privacidad.html`.
- Al pasar a web real: quitar la barra «Propuesta» (`.concept-bar`), el `noindex` del `<head>` y el crédito del pie si el cliente lo prefiere.

## Publicar cambios

GitHub Pages desde la rama `main` (carpeta raíz). Cada `git push` a `main` actualiza la web en uno o dos minutos.
