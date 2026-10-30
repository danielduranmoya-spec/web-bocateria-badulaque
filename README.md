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

1. **Inicio**: «Bocatas de noche en la plaza de Pizarro», aviso «Abierto ahora / Cerrado» en directo, nota de Google (4,3 · 131 reseñas) y un bocadillo ilustrado que se monta capa a capa al cargar.
2. **La carta + comanda**: cinco pestañas (bocadillos, hamburguesas, perritos, para picar, peques y bebidas). Cada plato tiene un botón «+» que lo suma a una comanda con forma de ticket; con nombre y hora de recogida, se envía ya escrita por WhatsApp. En móvil, una barra fija muestra cuántas cosas llevas y el total.
3. **Opiniones**: extractos reales de reseñas y las etiquetas de la ficha de Google.
4. **Horario y dónde**: horario con el día de hoy marcado, WhatsApp, llamar, Just Eat y mapa (solo si se acepta).
5. **Dudas rápidas** y pie.

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
