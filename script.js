/* =========================================================
   Bocatería Badulaque · script
   Todo lo editable está en CONFIG y CARTA (al principio).
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Datos editables ---------- */
  var CONFIG = {
    telefono: '+34622641169',          // para los enlaces tel:
    telefonoVisible: '622 64 11 69',   // como se muestra en la web
    justEat: 'https://www.just-eat.es/', // PENDIENTE: enlace directo a la ficha del local en Just Eat
    zonaHoraria: 'Europe/Madrid',
    // 0 = domingo, 1 = lunes … 6 = sábado. Tramos 'HH:MM' ('24:00' = medianoche).
    // Tomado de fichas públicas (InTravel, octubre 2026). PENDIENTE: confirmar con el local.
    horario: {
      0: [['20:30', '23:30']],
      1: [],
      2: [['20:30', '23:30']],
      3: [['20:30', '23:30']],
      4: [['20:30', '23:30']],
      5: [['20:30', '24:00']],
      6: [['20:30', '24:00']]
    },
    mapa: 'https://www.openstreetmap.org/export/embed.html?bbox=-6.3480%2C38.9135%2C-6.3410%2C38.9175&layer=mapnik&marker=38.91550%2C-6.34440',
    claveConsentimiento: 'badulaque-consent'
  };

  var ORDEN = ['bocadillos', 'hamburguesas', 'perritos', 'picar', 'peques'];

  // Platos de ejemplo según lo que publican las fichas del local (bocadillos,
  // hamburguesas, perritos, croquetas, alioli, menú infantil).
  // PENDIENTE: sustituir por la carta y los precios reales.
  var CARTA = {
    bocadillos: {
      nombre: 'Bocadillos',
      intro: 'Barra crujiente hecha a la plancha en el momento. Todos se pueden pedir con alioli de la casa.',
      platos: [
        { id: 'b-lomo', n: 'Lomo con queso', d: 'Lomo a la plancha, queso fundido y alioli.', p: 4.5, tag: 'El que más sale' },
        { id: 'b-pepito', n: 'Pepito de ternera', d: 'Filete de ternera, pimiento verde frito y mayonesa.', p: 5.5 },
        { id: 'b-serranito', n: 'Serranito', d: 'Lomo, jamón serrano, pimiento frito y tomate.', p: 5.5 },
        { id: 'b-pollo', n: 'Pollo crujiente', d: 'Pechuga empanada, lechuga, tomate y salsa de miel y mostaza.', p: 5 },
        { id: 'b-tortilla', n: 'Tortilla de patatas', d: 'Tortilla jugosa con alioli o con pimientos.', p: 4 },
        { id: 'b-calamares', n: 'Calamares', d: 'Rabas recién fritas con limón y alioli.', p: 5.5 }
      ]
    },
    hamburguesas: {
      nombre: 'Hamburguesas',
      intro: 'Carne a la plancha en pan brioche, con patatas fritas de acompañamiento.',
      platos: [
        { id: 'h-badulaque', n: 'Badulaque', d: 'Ternera, cheddar, bacon, cebolla caramelizada y salsa de la casa.', p: 7.5, tag: 'De la casa' },
        { id: 'h-clasica', n: 'Clásica', d: 'Ternera, queso, lechuga, tomate y cebolla.', p: 6 },
        { id: 'h-pollo', n: 'Pollo crispy', d: 'Pollo rebozado, queso, lechuga y mayonesa de lima.', p: 6.5 },
        { id: 'h-doble', n: 'Doble queso', d: 'Dos carnes, doble cheddar y pepinillo.', p: 8.5 }
      ]
    },
    perritos: {
      nombre: 'Perritos',
      intro: 'Salchicha a la plancha en pan blandito. Para cenar rápido o picar algo antes de salir.',
      platos: [
        { id: 'p-clasico', n: 'Perrito clásico', d: 'Kétchup, mostaza y cebolla crujiente.', p: 3.5 },
        { id: 'p-bacon', n: 'Perrito con bacon y queso', d: 'Bacon a la plancha y cheddar fundido.', p: 4.5 },
        { id: 'p-alioli', n: 'Perrito alioli', d: 'Con el alioli de la casa y patatas paja.', p: 4 }
      ]
    },
    picar: {
      nombre: 'Para picar',
      intro: 'Raciones para compartir en la terraza de la plaza.',
      platos: [
        { id: 'r-croquetas', n: 'Croquetas caseras', d: 'Ración de seis, de jamón.', p: 6, tag: 'Caseras' },
        { id: 'r-alioli', n: 'Patatas con alioli', d: 'Patatas fritas con alioli de la casa por encima.', p: 4 },
        { id: 'r-bravas', n: 'Patatas bravas', d: 'Con salsa picante y alioli.', p: 4.5 },
        { id: 'r-nuggets', n: 'Nuggets de pollo', d: 'Ocho piezas con salsa a elegir.', p: 5 }
      ]
    },
    peques: {
      nombre: 'Peques y bebidas',
      intro: 'Menú infantil y algo para beber con la cena.',
      platos: [
        { id: 'i-menu', n: 'Menú infantil', d: 'Mini hamburguesa o nuggets, patatas y bebida.', p: 6.5 },
        { id: 'x-refresco', n: 'Refresco', d: 'Lata a elegir.', p: 1.8 },
        { id: 'x-cerveza', n: 'Cerveza', d: 'Botellín o caña.', p: 1.8 },
        { id: 'x-agua', n: 'Agua', d: 'Botella de 50 cl.', p: 1.2 }
      ]
    }
  };

  /* ---------- Utilidades ---------- */
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function euros(n) { return n.toFixed(2).replace('.', ',') + ' €'; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function storageGet(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
  }
  function storageSet(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* sin almacenamiento: no pasa nada */ }
  }

  /* ---------- Enlaces de contacto ---------- */
  function applyContactLinks(ctx) {
    $$('[data-tel]', ctx).forEach(function (a) { a.href = 'tel:' + CONFIG.telefono; });
    $$('[data-tel-text]', ctx).forEach(function (el) { el.textContent = CONFIG.telefonoVisible; });
    $$('[data-justeat]', ctx).forEach(function (a) { a.href = CONFIG.justEat; });
  }

  /* ---------- Carta por secciones ---------- */
  function cartaMarkup(key) {
    var c = CARTA[key];
    var item = function (p) {
      return '<li class="item"><div><h3>' + esc(p.n) + (p.tag ? '<span class="badge">' + esc(p.tag) + '</span>' : '') + '</h3><p>' + esc(p.d) + '</p></div>' +
        '<span class="item__price num">' + euros(p.p) + '</span></li>';
    };
    return '<p class="carta__intro">' + esc(c.intro) + '</p><ul class="items">' + c.platos.map(item).join('') + '</ul>';
  }

  function initCarta() {
    var panel = $('[data-panel]');
    var tabsWrap = $('[data-tabs]');
    if (!panel || !tabsWrap) return;
    var current = ORDEN[0];
    var timer = null;

    tabsWrap.innerHTML = ORDEN.map(function (k, i) {
      return '<button type="button" class="tab" role="tab" id="tab-' + k + '" aria-controls="panel-carta" data-tab="' + k + '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '">' +
        '<span class="tab__pasillo">Pasillo ' + (i + 1) + '</span>' + CARTA[k].nombre + '</button>';
    }).join('');
    panel.id = 'panel-carta';
    var tabs = $$('.tab', tabsWrap);

    function mark(key) {
      tabs.forEach(function (t) {
        var on = t.getAttribute('data-tab') === key;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
      });
      panel.setAttribute('aria-labelledby', 'tab-' + key);
    }
    function swap(key) { panel.innerHTML = cartaMarkup(key); }

    function select(key) {
      if (!CARTA[key] || key === current) return;
      current = key;
      mark(key);
      if (reduceMotion) { swap(key); return; }
      clearTimeout(timer);
      panel.classList.add('is-leaving');
      timer = setTimeout(function () { swap(key); panel.classList.remove('is-leaving'); }, 150);
    }

    tabs.forEach(function (t) { t.addEventListener('click', function () { select(t.getAttribute('data-tab')); }); });
    tabsWrap.addEventListener('keydown', function (e) {
      var i = tabs.indexOf(document.activeElement);
      if (i === -1) return;
      var next = null;
      if (e.key === 'ArrowRight') next = (i + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      if (next === null) return;
      e.preventDefault();
      tabs[next].focus();
      select(tabs[next].getAttribute('data-tab'));
    });

    mark(current);
    swap(current);
  }

  /* ---------- Horario: abierto ahora ---------- */
  function toMin(hhmm) {
    var p = hhmm.split(':');
    return parseInt(p[0], 10) * 60 + parseInt(p[1], 10);
  }
  function fmt(hhmm) {
    if (hhmm === '24:00') return '00:00';
    var p = hhmm.split(':');
    return parseInt(p[0], 10) + ':' + p[1];
  }
  var DIAS = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];

  function nowInLocal() {
    try {
      var parts = new Intl.DateTimeFormat('en-GB', {
        timeZone: CONFIG.zonaHoraria,
        weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
      }).formatToParts(new Date());
      var get = function (t) { for (var i = 0; i < parts.length; i++) if (parts[i].type === t) return parts[i].value; return ''; };
      var day = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[get('weekday')];
      return { day: day, mins: parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10) };
    } catch (e) {
      var d = new Date();
      return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() };
    }
  }

  function hoursStatus(now) {
    var today = CONFIG.horario[now.day] || [];
    for (var i = 0; i < today.length; i++) {
      var s = toMin(today[i][0]), e = toMin(today[i][1]);
      if (now.mins >= s && now.mins < e) {
        return { open: true, text: 'Abierto ahora · cierra a las ' + fmt(today[i][1]) };
      }
    }
    for (var j = 0; j < today.length; j++) {
      if (toMin(today[j][0]) > now.mins) {
        return { open: false, text: 'Cerrado · abre hoy a las ' + fmt(today[j][0]) };
      }
    }
    for (var k = 1; k <= 7; k++) {
      var d = (now.day + k) % 7;
      var tramos = CONFIG.horario[d] || [];
      if (tramos.length) {
        var cuando = k === 1 ? 'mañana' : 'el ' + DIAS[d];
        return { open: false, text: 'Cerrado · abre ' + cuando + ' a las ' + fmt(tramos[0][0]) };
      }
    }
    return { open: false, text: 'Cerrado' };
  }

  function initHours() {
    var status = $('[data-status]');
    var text = $('[data-status-text]');
    if (!status || !text) return;
    function update() {
      var now = nowInLocal();
      var st = hoursStatus(now);
      status.setAttribute('data-state', st.open ? 'open' : 'closed');
      text.textContent = st.text;
      $$('[data-status-copy]').forEach(function (el) { el.textContent = st.text; });
      $$('.hours tr[data-days]').forEach(function (tr) {
        var days = tr.getAttribute('data-days').split(',').map(Number);
        tr.classList.toggle('is-today', days.indexOf(now.day) !== -1);
      });
    }
    update();
    setInterval(update, 60 * 1000);
  }

  /* ---------- Consentimiento y mapa ---------- */
  function loadMap() {
    var box = $('[data-map]');
    if (!box || box.querySelector('iframe')) return;
    var iframe = document.createElement('iframe');
    iframe.src = CONFIG.mapa;
    iframe.title = 'Mapa con la ubicación de Bocatería Badulaque en la plaza de Pizarro, Mérida';
    iframe.loading = 'lazy';
    iframe.referrerPolicy = 'no-referrer';
    box.appendChild(iframe);
    var ph = $('[data-map-placeholder]');
    if (ph) ph.hidden = true;
  }
  function unloadMap() {
    var box = $('[data-map]');
    if (!box) return;
    var iframe = box.querySelector('iframe');
    if (iframe) iframe.remove();
    var ph = $('[data-map-placeholder]');
    if (ph) ph.hidden = false;
  }

  function initConsent() {
    var banner = $('[data-cookie-banner]');
    var mobileCta = $('[data-mobile-cta]');
    var stored = storageGet(CONFIG.claveConsentimiento);

    function setCtaBlocked(blocked) {
      if (mobileCta) mobileCta.classList.toggle('is-blocked', blocked);
      document.dispatchEvent(new CustomEvent('badulaque:cta'));
    }
    function hide() {
      if (!banner || banner.hidden) return;
      if (reduceMotion) { banner.hidden = true; setCtaBlocked(false); return; }
      banner.classList.add('is-leaving');
      setTimeout(function () {
        banner.hidden = true;
        banner.classList.remove('is-leaving');
        setCtaBlocked(false);
      }, 180);
    }
    function show() {
      if (!banner) return;
      banner.hidden = false;
      setCtaBlocked(true);
    }

    if (stored === 'accepted') loadMap();
    if (!stored) show();

    $$('[data-consent]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var value = btn.getAttribute('data-consent');
        storageSet(CONFIG.claveConsentimiento, value);
        if (value === 'accepted') loadMap(); else unloadMap();
        hide();
      });
    });
    $$('[data-open-cookies]').forEach(function (btn) { btn.addEventListener('click', show); });
    var loadBtn = $('[data-map-load]');
    if (loadBtn) loadBtn.addEventListener('click', loadMap);
  }

  /* ---------- Cabecera y CTA móvil ---------- */
  function initHeader() {
    var header = $('[data-header]');
    if (!header) return;
    var ticking = false;
    function update() {
      header.classList.toggle('is-scrolled', window.scrollY > 40);
      ticking = false;
    }
    window.addEventListener('scroll', function () {
      if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
    }, { passive: true });
    update();
  }

  // En móvil, el botón de llamar aparece fuera del inicio y de la sección de horario.
  function initMobileCta() {
    var cta = $('[data-mobile-cta]');
    var hero = $('[data-hero]');
    var contact = $('[data-contact]');
    if (!cta || !hero || !('IntersectionObserver' in window)) return;
    var vis = { hero: true, contact: false };
    function update() {
      var show = !vis.hero && !vis.contact && !cta.classList.contains('is-blocked');
      cta.classList.toggle('is-visible', show);
    }
    function watch(el, key) {
      if (!el) return;
      new IntersectionObserver(function (entries) { vis[key] = entries[0].isIntersecting; update(); }, { threshold: 0 }).observe(el);
    }
    watch(hero, 'hero');
    watch(contact, 'contact');
    document.addEventListener('badulaque:cta', update);
  }

  /* ---------- Entradas al hacer scroll ---------- */
  function initReveal() {
    var items = $$('.section__head, .item, .quote, .opiniones__score, .hours, .faq__list details, .marco');
    items.forEach(function (el) { el.classList.add('reveal'); });
    if (reduceMotion || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('is-in'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          io.unobserve(entry.target);
        }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Arranque ---------- */
  function init() {
    applyContactLinks(document);
    initCarta();
    initHours();
    initConsent();
    initHeader();
    initMobileCta();
    initReveal();
    $$('[data-year]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();

  // Datos accesibles desde la consola del navegador: __badulaque.config, __badulaque.carta
  window.__badulaque = { config: CONFIG, carta: CARTA };
})();
