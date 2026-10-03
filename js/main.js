/* PLUMBING_V 4 — Bespoke Studio · meccanica invisibile canonica.
   ────────────────────────────────────────────────────────────────
   CONFINE (inviolabile): questo file contiene SOLO plumbing — la meccanica
   che il visitatore non percepisce come design. NIENTE markup di sezioni,
   NIENTE stile, NIENTE struttura: concept, griglia, tipografia, hero e
   animazioni-firma si progettano DA ZERO per ogni cliente (GATE #3).
   Se qui dentro scivola del layout, questo diventa il nuovo scheletro
   condiviso — cioè il difetto "copia-incolla" che il metodo combatte.

   Come si usa: si COPIA nella cartella js/ del sito e si adatta la sola
   costante SITE. Le animazioni-firma del sito si scrivono nel proprio
   main.js DOPO questo file (o in coda a questo file, sotto il marcatore).
   Ogni bug nuovo si corregge QUI (bump PLUMBING_V + changelog nel README)
   e poi nel sito: mai il contrario.

   Fix già incorporati (non rimuovere):
   - ScrollTrigger registrato SUBITO allo script load, MAI dentro l'intro
     o un setTimeout (bug APF #5 del 16/7: race col watchdog → sezioni
     che sparivano allo scroll).
   - Reveal con once:true (niente re-animazioni da zero ri-scorrendo).
   - Watchdog 1,5s che forza visibile e UCCIDE i trigger non scattati.
   - Lightbox su [hidden] + override CSS !important (bug: display:flex
     batteva [hidden] e la lightbox restava visibile).
   - Foto-contenuto MAI lazy (regola workflow §8): il plumbing non tocca
     il loading, ma il lint lo verifica.
   - Orari Europe/Rome con finestre multiple e scavalco di mezzanotte
     (pattern Il Cavallante 18:00–00:30). */

(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) root.classList.add('reduced-motion');

  /* ══════════ CONFIG PER-SITO — l'unica parte da adattare ══════════ */
  var SITE = {
    slug: 'primordial-pain-tattoos',
    /* nessun WhatsApp dichiarato: il telefono (02 2040 4041, dalle loro pagine Facebook) e la mail */
    whatsapp: { number: '', message: '', ids: [] },
    /* la scheda Google (2/10/2026): lunedì–sabato 12–19:30, domenica chiuso */
    hours: {
      0: [],
      1: [['12:00', '19:30']], 2: [['12:00', '19:30']], 3: [['12:00', '19:30']], 4: [['12:00', '19:30']], 5: [['12:00', '19:30']], 6: [['12:00', '19:30']],
    },
    hoursStatusId: 'orarioStato',
    hoursTableSelector: '[data-day]',
    todayClass: 'is-today',
    introId: 'intro',
    introDuration: 1800,
    revealSelector: '.reveal',
    inViewClass: 'in-view',
    breakpointMenu: 1100,
    EN: {
      "m.salta": "Skip to the content",
      "m.top": "Primordial Pain: back to the top",
      "m.nav": "The sections",
      "m.lingua": "Language",
      "m.menu": "Open the menu",
      "m.ingrandisciStampa": "Enlarge the print",
      "m.indice": "The chapters",
      "m.ingrandisci": "Enlarge the photo",
      "m.lightbox": "Enlarged photo",
      "m.chiudi": "Close",
      "n.nome": "The name",
      "n.tebori": "Tebori",
      "n.lavori": "Our work",
      "n.famiglia": "The family",
      "n.recensioni": "Reviews",
      "n.studio": "The studio",
      "t.chiama": "Call",
      "t.scrivi": "Write to us",
      "t.indicazioni": "Directions",
      "h.marchio": "Tattoo studio",
      "h.cosa": "Tattoos and piercing",
      "h.ortica": "Ortica · Milan",
      "h.frase": "We have been a tattoo studio since 1999. Horibudo I tattoos irezumi by hand, with tebori; working with him are the residents and the guests: blackwork, dot and black, ornamental, tribal, handpoke, realism. And piercing.",
      "h.votoN": "4.9",
      "h.voto": "on Google, 93 reviews",
      "h.fitaso": "Tsukioka Yoshitoshi, «Itasō – Looking painful», 1888. A woman bites her handkerchief while her arm is being tattooed: the print that goes with our name.",
      "a.itaso": "Yoshitoshi’s print: a woman in a purple kimono bites a light blue handkerchief while a hand, on the right, tattoos her arm.",
      "i.nome": "The primordial pain",
      "i.tebori": "Tebori",
      "i.lavori": "Our work",
      "i.famiglia": "The family",
      "i.recensioni": "Reviews",
      "i.studio": "Via Tucidide 56",
      "i.domande": "Before you come",
      "no.titolo": "The <span class=\"gotica\">p</span>rimordial pain",
      "no.p1": "Primordial Pain is Roberto Borsi’s studio. The name comes from far back: in 1989 he wrote the first thesis on tattoos at an Italian university, and since then he has been searching for the origins of tattooing.",
      "no.p2": "From one artist to a group, then to a family: today the residents work with him, and guests come from elsewhere for a few days. The studio, open since 1999, is now in Via Tucidide 56, in Ortica.",
      "no.borsi": "<span class=\"citazione__trad\">Translated from Italian: “With modern times, more refined tools and sterilisation, tattooing had only one element inseparably bound to the past: the ‘primordial pain’, the rite of passage, the test of endurance and perseverance.”</span>Roberto Borsi",
      "te.titolo": "Tebori",
      "te.kanji": "Shodai Horibudo: Horibudo the first",
      "te.p1": "Roberto Borsi, known as Horibudo I, is a member of the family of master Horitoshi I and tattoos irezumi, the traditional Japanese tattoo, by hand: with tebori.",
      "te.p2": "Tebori means to carve (hori) by hand (te). No machine: a rod with the needles tied to its tip, and the hand that gives the stroke. He says you work at about a third of the speed, and that it is the tattooer who gives the needle its strength.",
      "te.p3": "The subjects are those of the tradition: the chrysanthemum, the koi carp, the dragon, the phoenix, the hannya mask, Raijin and Fujin, the god of thunder and the god of wind. Cover-ups too, all in tebori.",
      "te.p4": "We have drawn it here: the needles tied with thread, the tip in the sumi ink, then one stroke at a time. For the line, a few needles close together; for the shading, many needles in a row.",
      "te.ig": "Horibudo I on Instagram",
      "b.titolo": "The rod: tied by hand, dipped in sumi, one dot at a time",
      "b.desc": "Seen from above, on black: the tebori rod, with its wooden handle. The needles settle on the tip, the red silk thread ties them to the handle turn after turn and makes the knot; the tip is dipped in the sumi ink of the bowl; then the rod works on a square of skin, one stroke at a time, and the dots stay. For the line, a few needles close together make the crest of a wave; for the shading, nine needles in a row leave dense dots that thin out.",
      "b.d0": "The line: three needles close together, tied with thread, dipped in sumi. One stroke at a time, the crest of a wave.",
      "b.d1": "The shading: nine needles in a row. Dense strokes on the left, then sparser and sparser: the black fading into the skin.",
      "b.modi": "The needles on the rod",
      "b.b0": "Line",
      "b.b1": "Shading",
      "l.titolo": "Our work",
      "l.galleria": "Our work",
      "l.tocca": "Tap to enlarge",
      "l.irezumi": "Tebori · Horibudo I",
      "l.kiku": "Kiku, the white chrysanthemum",
      "l.drago": "Dragon with lightning",
      "l.koiBraccio": "Koi, on the forearm",
      "l.raijin": "Raijin, the god of thunder",
      "l.fujin": "Fujin, the god of wind",
      "l.hannya": "Hannya",
      "l.dragoAceri": "Dragon and maple leaves",
      "l.fenice": "Hō-ō, the phoenix",
      "l.koiManica": "Full sleeve, koi and waves",
      "l.raijinCoscia": "Raijin, on the thigh (2025)",
      "l.koiFianco": "Koi, on the side",
      "l.peonia": "Peony and lion, a cover-up in tebori",
      "l.altri": "The other styles",
      "l.altriSotto": "The residents",
      "l.tribale": "Dot and black, tribal · Le Sacre Linee",
      "l.freehand": "Freehand, «Hellish Jaw» · Raven",
      "l.serpente": "Blackwork · Davide DW",
      "l.piercing": "Piercing",
      "a.kiku": "A white chrysanthemum tattooed in the middle of the chest; on the shoulder, a peony among the clouds.",
      "a.drago": "A green dragon with red and orange lightning on the chest and shoulder, among black clouds.",
      "a.koiBraccio": "A red and white koi carp swimming up grey waves on the forearm, with maple leaves.",
      "a.raijinSpalla": "Raijin, the god of thunder, in red, with his drums and lightning on the shoulder and chest.",
      "a.fujin": "Fujin, the god of wind, in green, with his wind bag and cherry blossoms on the shoulder.",
      "a.dragoAceri": "A purple dragon among clouds and orange maple leaves, over the whole arm and the chest.",
      "a.hannya": "A light blue hannya mask with horns, among maple leaves, on the thigh.",
      "a.fenice": "A green and purple phoenix with open wings on the shoulder and arm, large leaves below.",
      "a.koiManica": "A full sleeve from shoulder to wrist: koi carp, waves and maple leaves on a black background.",
      "a.raijinCoscia": "Raijin with his orange drums on the thigh, on a green cloud.",
      "a.koiFianco": "An orange koi carp among the waves on the side.",
      "a.peonia": "A purple peony and a white lion with light blue dots on the arm.",
      "a.tribale": "Back, side and leg covered in black tribal rays and triangles; behind, a wall with calligraphy.",
      "a.freehand": "On the knee, a mouth full of teeth in black, drawn freehand.",
      "a.serpente": "A snake coiling around a hand, in dotted blackwork, on the arm.",
      "a.piercing": "An ear with four steel piercings: one in the concha and three in the lobe.",
      "a.tengu": "The Tengu tattooed in tebori: the red long-nosed mask with a black beard, on the calf.",
      "a.studio": "Our white logo over the studio as it is today: white bricks, flash prints with beetles, a monstera, antlers, an arched mirror.",
      "f.titolo": "The family",
      "f.stili": "The styles of the studio",
      "f.s1": "Dot and black",
      "f.s2": "Ornamental",
      "f.s3": "Tribal",
      "f.s4": "Realism",
      "f.p1": "Alongside Horibudo I work the residents, each with their own style, and the guests, who come from other cities for a few days.",
      "f.p2": "We announce the next guests on Instagram, in our story highlights; to book with a guest, you write to the artist directly. And at the Milano Tattoo Convention we are there, all of us.",
      "f.ganbaru": "A Japanese word that suits us: to work with perseverance.",
      "f.ig": "The guests on Instagram",
      "r.titolo": "Reviews",
      "r.g24f": "Google, 2024 · the photo of his Tengu",
      "r.fb19": "Facebook, 2019",
      "r.g25": "Google, 2025",
      "r.g24": "Google, 2024",
      "r.g20": "Google, 2020",
      "r.nota": "From the reviews on Google and Facebook, as they were written, in Italian; […] where we shortened them.",
      "r.tutte": "All the reviews on Google",
      "s.fstudio": "The studio today, with our logo (Instagram, March 2026)",
      "s.p1": "We are at Via Tucidide 56, in Ortica. «Private shop», as we write on Instagram: for an appointment, an email, a call or a message.",
      "w.dove": "Where",
      "w.dovev": "Via Tucidide 56, 20134 Milan",
      "w.tel": "Phone",
      "w.mail": "Email",
      "w.bus": "Bus",
      "w.busv": "the 38 at the Via Corelli – Via Tucidide stop, about 50 metres away; the 54 at Via Ortica 16, about 120 metres away; the 54, the 39 and the 39/ at Via Cima – Via Zambaldi, about 190 metres away",
      "w.metro": "Metro and rail",
      "w.metrov": "M4 Stazione Forlanini and the Milano Forlanini railway station, about a kilometre away",
      "w.mappa": "Map: Primordial Pain, Via Tucidide 56, Milan",
      "o.orari": "Hours",
      "o.cap": "Opening hours",
      "o.nota": "Hours from our Google listing (October 2026).",
      "g.lun": "Monday",
      "g.mar": "Tuesday",
      "g.mer": "Wednesday",
      "g.gio": "Thursday",
      "g.ven": "Friday",
      "g.sab": "Saturday",
      "g.dom": "Sunday",
      "g.chiuso": "closed",
      "q.titolo": "Before you come",
      "q.d1": "How do I book an appointment?",
      "q.r1": "With an email to primordialpaintattoo@gmail.com, a call to 02 2040 4041 or a message on Instagram. For guests, you write to the artist directly.",
      "q.d2": "What is tebori?",
      "q.r2": "It is the traditional Japanese tattoo made by hand, without a machine: a rod with the needles tied to its tip and the hand that gives the stroke. Here it is done by Horibudo I.",
      "q.d3": "Do you only do Japanese tattoos?",
      "q.r3": "No: alongside Horibudo I’s irezumi, residents and guests work in other styles: blackwork, dot and black, ornamental, tribal, handpoke, realism, freehand.",
      "q.d4": "Do you also do piercing?",
      "q.r4": "Yes, piercings are done in the studio too. Write or call us to find out when.",
      "q.d5": "What are your opening hours?",
      "q.r5": "Monday to Saturday from 12 noon to 7:30pm; on Sundays we are closed.",
      "f2.orario": "<span class=\"piede__pezzo\">Monday–Saturday 12 noon–7:30pm</span><span class=\"piede__sep\" aria-hidden=\"true\"> · </span><span class=\"piede__pezzo\">Sunday closed</span>",
      "f2.cred": "Demo website made by <a href=\"https://bespokestud.io\" rel=\"noopener\">Bespoke Studio</a> · <a href=\"privacy.html\">Privacy</a> · hours, rating and reviews from the Google listing (October 2026), one review from Facebook; photos from our Facebook and Instagram pages, our old website and the Google listing (the Tengu is Sergio Alliegro’s photo); Yoshitoshi’s print is in the public domain. We drew the rod ourselves.",
      "f2.su": "Back to top"
    },
    LANGS: null,
    RTL: ['ar', 'he', 'fa', 'ur'],
    HOURS_I18N: null,
  };
  /* normalizzazione: EN storico -> LANGS */
  if (!SITE.LANGS) SITE.LANGS = SITE.EN && Object.keys(SITE.EN).length ? { en: SITE.EN } : {};
  var LANG_CODES = Object.keys(SITE.LANGS);   // senza 'it', che è il DOM
  /* ═════════════════════════════════════════════════════════════════ */

  /* ---------- WhatsApp wiring ---------- */
  if (SITE.whatsapp.number) {
    var waHref = 'https://wa.me/' + SITE.whatsapp.number + '?text=' +
      encodeURIComponent(SITE.whatsapp.message);
    SITE.whatsapp.ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) { el.href = waHref; el.target = '_blank'; el.rel = 'noopener'; }
    });
  }

  /* ---------- GSAP: registrazione IMMEDIATA + reveal + watchdog ---------- */
  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  function showAllReveals() {
    var els = document.querySelectorAll(SITE.revealSelector);
    els.forEach(function (el) { el.classList.add(SITE.inViewClass); });
    if (hasGsap) {
      if (hasST) {
        els.forEach(function (el) {
          ScrollTrigger.getAll().forEach(function (st) {
            if (st.trigger === el && !st.progress) st.kill();
          });
        });
      }
      gsap.set(els, { opacity: 1, y: 0, x: 0 });
    }
  }
  // FIX FOUC (18/7): il watchdog è SOLO un fallback se GSAP non c'è (o reduced-motion).
  // Rivelare in anticipo tutti i .reveal mentre gli scroll-trigger sono attivi causava il
  // flash (scompaiono/ricompaiono) sotto la piega. Con GSAP attivo, rivelano gli ScrollTrigger.
  setTimeout(function () { if (!hasGsap || reducedMotion) showAllReveals(); }, 1500);

  if (hasGsap && !reducedMotion) {
    // reveal generico: le animazioni-FIRMA del sito vanno oltre questo,
    // ma si registrano ANCHE LORO subito, mai dopo l'intro.
    // ⚠️ REGOLA ANTI-FLASH (18/7): un elemento .reveal deve avere UNA SOLA animazione che
    // ne porta l'opacità a 1. Se un elemento ha una FIRMA che ne anima l'opacità (stagger,
    // timeline, ecc.), ESCLUDILO da qui via SITE.revealSelector (es. '.reveal:not(.mondo)'),
    // altrimenti il reveal generico + la firma si sovrappongono e l'elemento FLASHA.
    // immediateRender:false → lo stato "from" (opacity:0) NON viene ri-applicato ad ogni
    // ScrollTrigger.refresh() (che scatta al window.load mentre scrolli) → niente flash su refresh.
    gsap.utils.toArray(SITE.revealSelector).forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });
  } else {
    // fallback senza GSAP: IntersectionObserver + classe
    if ('IntersectionObserver' in window && !reducedMotion) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add(SITE.inViewClass); io.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
      document.querySelectorAll(SITE.revealSelector).forEach(function (el) { io.observe(el); });
    } else {
      showAllReveals();
    }
  }

  /* ---------- intro skippabile (NON gate-a nulla) ---------- */
  var intro = document.getElementById(SITE.introId);
  /* ⚠️ L'hook si legge AL MOMENTO DELLA CHIAMATA, mai catturato per valore
     qui. Il codice-firma vive sotto il marcatore di fine plumbing — cioè
     gira DOPO questa riga — quindi `window.bespokeHeroEntrance ||
     function(){}` congelava la funzione vuota e l'entrata dell'hero non
     partiva più: titolo a opacity 0 per sempre, hero vuota sul live.
     (20/7/2026, riprodotto a schermo su Benessere Futuro #159.) */
  function heroEntrance() {
    if (typeof window.bespokeHeroEntrance === 'function') window.bespokeHeroEntrance();
  }
  function hideIntro() {
    if (!intro) return;
    var el = intro; intro = null;
    el.classList.add('hide');
    setTimeout(function () { el.remove(); }, 700);
    heroEntrance();
  }
  // rimozione IMMEDIATA (niente fade): serve quando qualcosa deve stare sopra
  // l'intro subito, es. l'apertura del menu. Durante il fade l'intro resta
  // hit-testable e i link del drawer non sono cliccabili.
  function killIntroNow() {
    if (!intro) return;
    var el = intro; intro = null;
    el.remove();
    heroEntrance();
  }
  if (reducedMotion || !intro) {
    if (intro) { intro.remove(); intro = null; }
    /* ⚠️ setTimeout 0 NON è decorativo: senza intro questo ramo gira in modo
       SINCRONO, cioè PRIMA che il codice-firma — che sta sotto il marcatore
       di fine plumbing, dentro questa stessa IIFE — abbia assegnato
       `window.bespokeHeroEntrance`. Il risultato è un'entrata dell'hero MUTA:
       nessun errore, elementi visibili, animazione semplicemente mai partita.
       Rimandando di un tick la IIFE è conclusa e l'hook esiste.
       (14/8/2026, A.S.FA. Sicilia: misurato h1 a opacity 1 già al load.)
       Cugino del bug `hero-hook-congelato` del 20/7: lì l'hook era catturato
       troppo presto, qui è CHIAMATO troppo presto. */
    setTimeout(heroEntrance, 0);
  } else {
    setTimeout(hideIntro, SITE.introDuration);
    setTimeout(hideIntro, 6000); // safety net: l'intro non può incastrarsi
    intro.addEventListener('click', hideIntro);
  }

  /* ---------- burger menu (inert + focus + Escape + resize) ---------- */
  var burger = document.getElementById('burger');
  /* 26/7/2026 (Il Papiro #168) — IL PANNELLO SI RISOLVE DA `aria-controls`.
     Il canone apriva sempre `#mainNav`, dando per scontato che la nav
     desktop FOSSE anche il drawer. Molti siti invece hanno un drawer
     separato (`#mobile-menu`) con `hidden`, mentre `#mainNav` su mobile è
     `display:none`: il burger aggiungeva `nav-open` a un elemento nascosto
     e il menu non si apriva. È la stessa decisione già presa il 20/7 per
     qa-motion — «è lì che il markup accessibile dice qual è il pannello» —
     che però non era mai rientrata qui. */
  var nav = (function () {
    var byAria = burger && burger.getAttribute('aria-controls');
    return (byAria && document.getElementById(byAria)) || document.getElementById('mainNav');
  })();
  if (burger && nav) {
    var navUsaHidden = nav.hasAttribute('hidden');
    var lastFocus = null;
    var closeNav = function () {
      nav.classList.remove('nav-open');
      if (navUsaHidden) nav.hidden = true;
      burger.setAttribute('aria-expanded', 'false');
      if (lastFocus) { lastFocus.focus(); lastFocus = null; }
    };
    var openNav = function () {
      // L'intro ha z-index alto ed è figlia del body: se è ancora a schermo
      // copre il drawer (che vive nello stacking context dell'header) e i link
      // risultano non cliccabili. Aprire il menu chiude l'intro.
      // (bug trovato da qa-motion su Linea Uomo, 19/7/2026 → PLUMBING_V 2)
      if (typeof killIntroNow === 'function') killIntroNow();
      lastFocus = document.activeElement;
      if (navUsaHidden) nav.hidden = false;
      nav.classList.add('nav-open');
      burger.setAttribute('aria-expanded', 'true');
      var first = nav.querySelector('a, button');
      if (first) first.focus();
    };
    burger.addEventListener('click', function () {
      nav.classList.contains('nav-open') ? closeNav() : openNav();
    });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav();
    });
    window.addEventListener('resize', function () {
      if (window.innerWidth > SITE.breakpointMenu) closeNav();
    });
  }

  /* ---------- lightbox accessibile ---------- */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  if (lightbox && lightboxImg) {
    var opener = null;
    var openLb = function (src, alt) {
      lightboxImg.src = src; lightboxImg.alt = alt || '';
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      if (lightboxClose) lightboxClose.focus();
    };
    var closeLb = function () {
      lightbox.hidden = true; lightboxImg.src = '';
      document.body.style.overflow = '';
      if (opener) { opener.focus(); opener = null; }
    };
    document.querySelectorAll('[data-full]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        opener = btn;
        var img = btn.querySelector('img');
        openLb(btn.getAttribute('data-full'), img ? img.alt : '');
      });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !lightbox.hidden) closeLb();
    });
  }

  /* ---------- orari dinamici Europe/Rome (finestre multiple + scavalco) ---------- */
  function romeNow() {
    try {
      var f = new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false,
      });
      var p = f.formatToParts(new Date());
      var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var get = function (t) { return p.find(function (x) { return x.type === t; }).value; };
      return { day: map[get('weekday')], mins: parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10) };
    } catch (e) {
      var d = new Date();
      return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() };
    }
  }
  var toMin = function (hm) {
    var a = hm.split(':');
    return parseInt(a[0], 10) * 60 + parseInt(a[1], 10);
  };
  var fmt = function (m) {
    m = m % 1440;
    return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2);
  };
  var DAYS_IT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  var HOURS_BASE = {
    it: { open: 'Aperto ora', closesAt: 'chiude alle ', opensToday: 'Chiuso · apre oggi alle ',
          opensOn: 'Chiuso · apre {day} alle ', closed: 'Chiuso', days: DAYS_IT },
    en: { open: 'Open now', closesAt: 'closes at ', opensToday: 'Closed · opens today at ',
          opensOn: 'Closed · opens {day} at ', closed: 'Closed', days: DAYS_EN },
  };
  /* risolve le etichette orari per la lingua richiesta, con fallback en -> it */
  function strings(lang) {
    var custom = (SITE.HOURS_I18N && SITE.HOURS_I18N[lang]) || null;
    var base = HOURS_BASE[lang] || HOURS_BASE.en;
    if (!custom) return base;
    var outp = {};
    Object.keys(HOURS_BASE.it).forEach(function (k) {
      outp[k] = custom[k] !== undefined ? custom[k] : base[k];
    });
    return outp;
  }

  function hoursState() {
    var now = romeNow();
    // finestra del giorno corrente
    var wins = SITE.hours[now.day] || [];
    for (var i = 0; i < wins.length; i++) {
      var s = toMin(wins[i][0]), e = toMin(wins[i][1]);
      if (now.mins >= s && now.mins < Math.min(e, 1440)) {
        return { open: true, day: now.day, closesAt: fmt(e) };
      }
    }
    // coda dopo mezzanotte della sera PRIMA
    var prev = (now.day + 6) % 7;
    var pw = SITE.hours[prev] || [];
    for (var j = 0; j < pw.length; j++) {
      var pe = toMin(pw[j][1]);
      if (pe > 1440 && now.mins < pe - 1440) {
        return { open: true, day: prev, closesAt: fmt(pe) };
      }
    }
    // chiuso: prossima apertura (oggi o nei prossimi 7 giorni)
    for (var k = 0; k < wins.length; k++) {
      if (now.mins < toMin(wins[k][0])) {
        return { open: false, day: now.day, opensToday: fmt(toMin(wins[k][0])) };
      }
    }
    for (var d = 1; d <= 7; d++) {
      var nd = (now.day + d) % 7;
      var nw = SITE.hours[nd] || [];
      if (nw.length) return { open: false, day: now.day, opensDay: nd, opensAt: fmt(toMin(nw[0][0])) };
    }
    return { open: false, day: now.day };
  }

  function renderHours() {
    var el = document.getElementById(SITE.hoursStatusId);
    var st = hoursState();
    document.querySelectorAll(SITE.hoursTableSelector).forEach(function (row) {
      row.classList.toggle(SITE.todayClass,
        parseInt(row.getAttribute('data-day'), 10) === st.day);
    });
    if (!el) return;
    /* V4: le etichette si risolvono per lingua corrente, non con un booleano
       en/it. Fallback a catena lingua -> en -> it, così un sito con AR o FR
       che non traduce lo stato orari resta comunque leggibile. */
    var L = strings(root.lang);
    var txt;
    if (st.open) {
      txt = L.open + ' · ' + L.closesAt + st.closesAt;
    } else if (st.opensToday) {
      txt = L.opensToday + st.opensToday;
    } else if (st.opensAt !== undefined) {
      txt = L.opensOn.replace('{day}', L.days[st.opensDay]) + st.opensAt;
    } else {
      txt = L.closed;
    }
    el.textContent = txt;
  }
  renderHours();
  setInterval(renderHours, 60000);

  /* ---------- i18n overlay (EN sopra l'IT del DOM) ---------- */
  var originals = {}; // attr -> key -> testo IT
  var I18N_ATTRS = [
    ['data-i18n', null],
    ['data-i18n-aria', 'aria-label'],
    ['data-i18n-alt', 'alt'],
    ['data-i18n-placeholder', 'placeholder'],
    ['data-i18n-title', 'title'],
  ];
  function setLang(lang) {
    /* V4: qualunque lingua dichiarata in SITE.LANGS, non più solo 'en'.
       'it' resta la lingua del DOM: nessun dizionario, nessuna sostituzione.
       Una lingua sconosciuta ricade su 'it' invece di rompere la pagina. */
    root.lang = (lang === 'it' || LANG_CODES.indexOf(lang) !== -1) ? lang : 'it';
    root.dir = SITE.RTL.indexOf(root.lang) !== -1 ? 'rtl' : 'ltr';
    var dict = SITE.LANGS[root.lang] || null;
    I18N_ATTRS.forEach(function (pair) {
      var dattr = pair[0], target = pair[1];
      if (!originals[dattr]) originals[dattr] = {};
      document.querySelectorAll('[' + dattr + ']').forEach(function (el) {
        var key = el.getAttribute(dattr);
        var store = originals[dattr];
        /* innerHTML, NON textContent: gli elementi tradotti contengono
           quasi sempre markup (<strong>, <br>) e con textContent il primo
           passaggio a EN lo appiattisce — tornando in italiano il grassetto
           non torna più. I valori del dizionario sono statici e scritti da
           noi. (20/7/2026: la flotta era già così, il boilerplate no.) */
        if (!(key in store)) store[key] = target ? el.getAttribute(target) : el.innerHTML;
        var val = dict && dict[key] !== undefined ? dict[key] : store[key];
        if (target) el.setAttribute(target, val); else el.innerHTML = val;
      });
    });
    renderHours();
    /* stato visivo della coppia di bottoni lingua, se il sito la usa */
    document.querySelectorAll('[data-lang]').forEach(function (b) {
      var on = b.getAttribute('data-lang') === root.lang;
      b.classList.toggle('is-on', on);
      if (b.tagName === 'BUTTON') b.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    try { localStorage.setItem(SITE.slug + '-lang', lang); } catch (e) {}
  }
  /* 26/7/2026 (Il Papiro #168) — SI CABLANO ENTRAMBE LE FORME DI SELETTORE.
     Il canone conosceva solo il toggle singolo `#langToggle`, ma nella
     flotta esiste da tempo anche la COPPIA di bottoni `[data-lang]`
     (Warsa, Mido…): `i18n-roundtrip` era già stato insegnato a riconoscerle
     il 20/7, il plumbing no. Chi copiava il boilerplate e usava la coppia
     si ritrovava il cambio lingua MORTO, e nessun lint statico se ne
     accorgeva (lo becca solo qa-motion, a runtime). */
  var langToggle = document.getElementById('langToggle');
  if (langToggle) {
    /* V4: il toggle singolo CICLA sull'anello ['it', ...LANG_CODES].
       Con due lingue il comportamento è identico a prima (it <-> en). */
    var RING = ['it'].concat(LANG_CODES);
    langToggle.addEventListener('click', function () {
      var i = RING.indexOf(root.lang);
      setLang(RING[(i + 1) % RING.length]);
    });
  }
  document.querySelectorAll('[data-lang]').forEach(function (b) {
    b.addEventListener('click', function () { setLang(b.getAttribute('data-lang')); });
  });
  try {
    var saved = localStorage.getItem(SITE.slug + '-lang');
    if (saved && saved !== 'it' && LANG_CODES.indexOf(saved) !== -1) setLang(saved);
  } catch (e) {}

  /* ---------- action-bar mobile (opzionale: #actionBar) ---------- */
  var actionBar = document.getElementById('actionBar');
  if (actionBar) {
    var onScroll = function () {
      actionBar.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ══════════ FINE PLUMBING — da qui in giù SOLO il codice-firma
     del sito (animazioni e interazioni uniche del cliente), che si
     registra comunque SUBITO, mai dentro setTimeout/intro. ══════════ */

  /* ══════════ PRIMORDIAL PAIN — tatuaggi e piercing, Via Tucidide 56 ══════════
     la FIRMA — «la bacchetta»: la bacchetta del tebori vista dall'alto. Gli aghi si posano, il filo di seta li lega giro dopo giro e fa
     il nodo, la punta si bagna nel sumi, poi un colpo alla volta sulla pelle e i punti restano. Lo stato è M (Linea / Sfumatura),
     T (0…1) e V (0 al suo posto; fino a 1 la scena sale di poco e si spegne; da −1 a 0 arriva la prossima, con la bacchetta nuda).
     Senza JS e alla fine: Linea, T = 1, V = 0 (l'HTML). L'attesa (classe nell'head): la bacchetta nuda e a riposo. Reduced-motion:
     tutto subito. rAF a tempo, guardia 1,5 s, IO al 60 %, resize solo se cambia la larghezza; un gesto durante l'animazione la
     ferma dov'è. */
  var DATI = {"vb":[640,560],"via":-14,"modi":[{"nome":"Linea","riposo":[96,150,0,1.45],"ciotola":[528,448,-122,1],"arrivo":-36,"aghi":[0.02,0.05],"giri":[[0.08,0.025],[0.1,0.025],[0.12,0.025],[0.14,0.025],[0.16,0.025],[0.18,0.025],[0.2,0.025],[0.22,0.025],[0.24,0.025]],"nodo":[0.275,0.03],"alza":[0.32,0.07],"inchiostro":[0.39,0.04],"verso":[0.44,0.05],"scendi":[0.49,0.01],"via":[0.962,0.038],"lavoro":{"angolo":-58,"su":22,"colpo":9,"lampo":0.0045,"colpi":[[62.4,489.9],[72.4,487.5],[82.6,484.4],[92.5,480.8],[102.6,476.5],[112,471.9],[121.4,466.6],[130.1,461],[138.7,454.8],[146.9,448],[154.7,440.9],[162.2,433],[168.9,425.1],[175.3,416.4],[181,407.3],[186.1,397.9],[190.6,388.6],[195.5,379],[200.7,369.9],[206.6,360.7],[212.6,352.2],[219.3,343.8],[226.4,335.8],[233.8,328.5],[241.9,321.5],[250.4,315.4],[259.8,309.9],[269.2,305.5],[279.4,302.3],[289.8,300.4],[300.4,300.1],[310.8,302],[320.2,306.9],[327.2,314.9],[331,324.8],[331.5,335.2],[328.8,345.5],[323.4,354.5],[315.6,361.8],[306,366.4],[295.6,367.8],[285.3,365.6],[277,359],[273.6,349.2],[275.6,338.8],[282.9,331.4],[293.2,330.4],[302,336]],"tempi":[0.5,0.51,0.519,0.529,0.539,0.548,0.558,0.568,0.577,0.587,0.597,0.606,0.616,0.626,0.636,0.645,0.655,0.665,0.674,0.684,0.694,0.703,0.713,0.723,0.732,0.742,0.752,0.761,0.771,0.781,0.79,0.8,0.81,0.819,0.829,0.839,0.849,0.858,0.868,0.878,0.887,0.897,0.907,0.916,0.926,0.936,0.945,0.955]}},{"nome":"Sfumatura","riposo":[96,150,0,1.45],"ciotola":[528,448,-122,1],"arrivo":-36,"aghi":[0.02,0.05],"giri":[[0.08,0.025],[0.1,0.025],[0.12,0.025],[0.14,0.025],[0.16,0.025],[0.18,0.025],[0.2,0.025],[0.22,0.025],[0.24,0.025]],"nodo":[0.275,0.03],"alza":[0.32,0.07],"inchiostro":[0.39,0.04],"verso":[0.44,0.05],"scendi":[0.49,0.01],"via":[0.962,0.038],"lavoro":{"angolo":-58,"su":22,"colpo":9,"lampo":0.0045,"colpi":[[70,300],[77,326],[70,352],[77,378],[70,404],[77,430],[70,456],[90,456],[97,430],[90,404],[97,378],[90,352],[97,326],[90,300],[110,300],[117,326],[110,352],[117,378],[110,404],[117,430],[110,456],[130,456],[137,430],[130,404],[137,378],[130,352],[137,326],[130,300],[150,300],[157,326],[150,352],[157,378],[150,404],[157,430],[150,456],[170,456],[177,430],[170,404],[177,378],[170,352],[177,326],[170,300],[190,300],[197,326],[190,352],[197,378],[190,404],[197,430],[190,456],[210,456],[217,430],[210,404],[217,378],[210,352],[217,326],[210,300],[230,300],[237,326],[230,352],[237,378],[230,404],[237,430],[230,456],[250,456],[257,430],[250,404],[257,378],[250,352],[257,326],[250,300],[270,300],[277,326],[270,352],[277,378],[270,404],[277,430],[270,456],[290,456],[297,430],[290,404],[297,378],[290,352],[297,326],[290,300]],"tempi":[0.5,0.505,0.511,0.516,0.522,0.527,0.533,0.538,0.544,0.549,0.555,0.56,0.566,0.571,0.577,0.582,0.588,0.593,0.599,0.604,0.61,0.615,0.621,0.626,0.632,0.637,0.643,0.648,0.653,0.659,0.664,0.67,0.675,0.681,0.686,0.692,0.697,0.703,0.708,0.714,0.719,0.725,0.73,0.736,0.741,0.747,0.752,0.758,0.763,0.769,0.774,0.78,0.785,0.791,0.796,0.802,0.807,0.812,0.818,0.823,0.829,0.834,0.84,0.845,0.851,0.856,0.862,0.867,0.873,0.878,0.884,0.889,0.895,0.9,0.906,0.911,0.917,0.922,0.928,0.933,0.939,0.944,0.95,0.955]}}],"tempi":{"inizio":300,"bacchetta":8000,"servi":420,"arriva":480,"bacchettaV":7000}};
  /* la bacchetta a (M, T, V) — una sola fonte: la usano _ppt_firma.mjs (l'HTML allo stato finale), main.js (via main.cjs) e la
     prova (firma-prova.mjs). T = 1, V = 0 dà gli stessi attributi dell'HTML; T = 0 gli stessi pixel dell'attesa (il CSS).
     La bacchetta del tebori vista dall'alto: gli aghi si posano sulla punta, il filo di seta la lega giro dopo giro, il nodo; la
     bacchetta va alla ciotola del sumi e la punta si bagna; poi lavora sul riquadro di pelle un colpo alla volta (a ogni colpo
     arretra e torna) e i punti restano. Col V la scena sale di poco e si spegne; la prossima arriva, con la bacchetta nuda. */
  function creaBacchetta(svg, D) {
    var c01 = function (t) { return Math.max(0, Math.min(1, t)); };
    var r1 = function (n) { return Math.round(n * 10) / 10; };
    var r3 = function (n) { return Math.round(n * 1000) / 1000; };
    /* la fine di una fase arriva a 1 esatto (#256) */
    var fase = function (t, w) { return t >= w[0] + w[1] - 1e-9 ? 1 : c01((t - w[0]) / w[1]); };
    var dolce = function (u) { return u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2; };
    var q = function (sel) { return svg.querySelector(sel); };
    var servito = q('.servito');
    var uno = function (cl, m, k) { return q('.' + cl + '[data-m="' + m + '"]' + (k === undefined ? '' : '[data-k="' + k + '"]')); };
    var pezzi = D.modi.map(function (M, m) {
      return {
        bacchetta: uno('bc-bacchetta', m), aghi: uno('bc-aghi', m), nodo: uno('bc-nodo', m), inchiostro: uno('bc-inchiostro', m),
        giri: M.giri.map(function (_, k) { return uno('bc-giro', m, k); }),
        colpi: M.lavoro.colpi.map(function (_, k) { return uno('bc-colpo', m, k); })
      };
    });
    var lerp = function (a, b, u) { return a + (b - a) * u; };
    /* la scala cambia nella prima metà del tratto: la bacchetta grande non esce dal riquadro mentre gira */
    var mista = function (A, B, u) { return [lerp(A[0], B[0], u), lerp(A[1], B[1], u), lerp(A[2], B[2], u), lerp(A[3], B[3], Math.min(1, 2 * u))]; };
    /* la posa della bacchetta: [x, y, angolo, scala] della punta (a riposo è più grande: si vede legare) */
    function posa(M, t) {
      var L = M.lavoro, n = L.colpi.length, ax = Math.cos(L.angolo * Math.PI / 180), ay = Math.sin(L.angolo * Math.PI / 180);
      var su = function (p, h) { return [p[0] + h * ax, p[1] + h * ay, L.angolo, 1]; };
      if (t < M.verso[0]) return mista(M.riposo, M.ciotola, dolce(fase(t, M.alza)));
      if (t < M.scendi[0]) return mista(M.ciotola, su(L.colpi[0], L.su), dolce(fase(t, M.verso)));
      if (t < L.tempi[0]) return mista(su(L.colpi[0], L.su), su(L.colpi[0], 0), fase(t, M.scendi));
      if (t < L.tempi[n - 1]) {
        var j = 0;
        while (j < n - 2 && t >= L.tempi[j + 1]) j++;
        var u = c01((t - L.tempi[j]) / (L.tempi[j + 1] - L.tempi[j]));
        var A = L.colpi[j], B = L.colpi[j + 1];
        return su([lerp(A[0], B[0], u), lerp(A[1], B[1], u)], L.colpo * Math.sin(Math.PI * u));
      }
      return su(L.colpi[n - 1], L.su * dolce(fase(t, M.via)));
    }
    function disegna(m, t, v) {
      var P = pezzi[m], M = D.modi[m], k;
      var p = posa(M, t);
      P.bacchetta.setAttribute('transform', 'translate(' + r1(p[0]) + ' ' + r1(p[1]) + ') rotate(' + r1(p[2]) + ') scale(' + r3(p[3]) + ')');
      /* gli aghi arrivano da sinistra e si posano sulla punta */
      var a = dolce(fase(t, M.aghi));
      P.aghi.setAttribute('transform', 'translate(' + r1(M.arrivo * (1 - a)) + ' 0)');
      P.aghi.setAttribute('opacity', r3(a));
      /* il filo: un giro dopo l'altro, poi il nodo */
      for (k = 0; k < P.giri.length; k++) P.giri[k].setAttribute('stroke-dashoffset', r3(1 - dolce(fase(t, M.giri[k]))));
      P.nodo.setAttribute('opacity', r3(dolce(fase(t, M.nodo))));
      /* la punta bagnata nel sumi */
      P.inchiostro.setAttribute('opacity', r3(dolce(fase(t, M.inchiostro))));
      /* i colpi: i punti restano */
      for (k = 0; k < P.colpi.length; k++) P.colpi[k].setAttribute('opacity', r3(fase(t, [M.lavoro.tempi[k], M.lavoro.lampo])));
      /* col V la scena sale di poco e si spegne; la prossima arriva */
      servito.setAttribute('transform', 'translate(0 ' + r1(D.via * v) + ')');
      servito.setAttribute('opacity', r3(1 - Math.abs(v)));
    }
    var completo = !!servito && pezzi.every(function (P) { return P.bacchetta && P.aghi && P.nodo && P.inchiostro && P.giri.every(Boolean) && P.colpi.every(Boolean); });
    return { disegna: disegna, pezzi: pezzi, completo: completo, posa: posa };
  }

  var prendi = function (id) { return document.getElementById(id); };
  var figuraF = prendi('bacchetta-firma'), svgF = prendi('bacchettaSvg'), leggiF = prendi('bacchettaLeggi');
  var BACCHETTA = svgF ? creaBacchetta(svgF, DATI) : null;
  var BOTTONI = [].slice.call(document.querySelectorAll('.bacchetta__modi button[data-modo]'));
  var TF = DATI.tempi;
  var faseF = 'fatta', modoF = '', rafF = 0, guardiaF = 0, larghezzaAvvioF = 0, corseF = 0, pianoF = null;
  var MF = 0, TT = 1, VF = 0;
  var destinazioneF = { m: 0 };
  var c01 = function (t) { return Math.max(0, Math.min(1, t)); };
  var CURVE = {
    dolce: function (u) { return u < .5 ? 4 * u * u * u : 1 - Math.pow(-2 * u + 2, 3) / 2; },
    lineare: function (u) { return u; }
  };
  function annunciaF(m) {
    var el = document.querySelector('.bacchetta__d[data-m="' + m + '"]');
    if (leggiF) leggiF.textContent = el ? el.textContent : '';
  }
  function disegnaF(m, t, v) {
    if (m !== MF || figuraF.getAttribute('data-modo') !== String(m)) {
      MF = m;
      figuraF.setAttribute('data-modo', String(m));
      BOTTONI.forEach(function (bt) { bt.setAttribute('aria-pressed', String(+bt.getAttribute('data-modo') === m)); });
    }
    TT = t; VF = v;
    BACCHETTA.disegna(m, t, v);
  }
  /* un piano: tratti { da, a, m, x0: {t, v}, x1: {…}, curva } */
  function fotogrammaF(t) {
    var P = pianoF.piano, cur = null;
    for (var i = 0; i < P.length; i++) if (t >= P[i].da) cur = P[i];
    if (!cur) return;
    var q = t < cur.a ? c01((t - cur.da) / Math.max(1, cur.a - cur.da)) : 1, e = CURVE[cur.curva](q), A = cur.x0, B = cur.x1;
    disegnaF(cur.m, A.t + (B.t - A.t) * e, A.v + (B.v - A.v) * e);
  }
  var st2 = function (t, v) { return { t: t, v: v }; };
  function sorvegliaF() { clearTimeout(guardiaF); guardiaF = setTimeout(chiudiF, 1500); }
  function chiudiF() {
    cancelAnimationFrame(rafF); rafF = 0;
    clearTimeout(guardiaF);
    disegnaF(destinazioneF.m, 1, 0);
    /* gli altri modi tornano come nell'HTML (#257) */
    DATI.modi.forEach(function (_, k) { if (k !== destinazioneF.m) BACCHETTA.disegna(k, 1, 0); });
    BACCHETTA.disegna(destinazioneF.m, 1, 0);
    if (figuraF) figuraF.setAttribute('data-firma', 'fatta');
    root.classList.remove('firma-attesa');
    faseF = 'fatta';
  }
  /* un gesto durante un'animazione (o nell'attesa): tutto si ferma dov'è (#244); dall'attesa resta la bacchetta nuda e a riposo */
  function fermaF() {
    cancelAnimationFrame(rafF); rafF = 0;
    clearTimeout(guardiaF);
    if (root.classList.contains('firma-attesa')) { disegnaF(MF, 0, 0); root.classList.remove('firma-attesa'); }
    else disegnaF(MF, TT, VF);
    if (figuraF) figuraF.setAttribute('data-firma', 'fatta');
    faseF = 'fatta';
  }
  function avviaF(modo, piano) {
    cancelAnimationFrame(rafF); rafF = 0;
    modoF = modo; pianoF = piano;
    root.classList.remove('firma-attesa');
    faseF = 'corre'; if (figuraF) figuraF.setAttribute('data-firma', 'corre');
    larghezzaAvvioF = window.innerWidth;
    var t0 = null, corsa = ++corseF;
    function fotogramma(ts) {
      rafF = 0;
      /* un fotogramma rimasto in coda dopo la chiusura (o di una corsa vecchia) non riapre niente */
      if (faseF !== 'corre' || corsa !== corseF) return;
      if (t0 === null) t0 = ts;
      var t = ts - t0;
      fotogrammaF(t);
      if (t >= pianoF.fine) { chiudiF(); return; }
      sorvegliaF();
      rafF = requestAnimationFrame(fotogramma);
    }
    sorvegliaF();
    rafF = requestAnimationFrame(fotogramma);
  }
  function avviaIntroF() {
    /* dalla classe d'attesa agli attributi senza cambiare un pixel: la bacchetta nuda e a riposo */
    disegnaF(0, 0, 0);
    destinazioneF = { m: 0 };
    var P = [{ da: 0, a: TF.inizio, m: 0, x0: st2(0, 0), x1: st2(0, 0), curva: 'lineare' }, { da: TF.inizio, a: TF.inizio + TF.bacchetta, m: 0, x0: st2(0, 0), x1: st2(1, 0), curva: 'lineare' }];
    avviaF('intro', { piano: P, fine: TF.inizio + TF.bacchetta });
  }
  /* il gesto: scegliere che cosa guardare. Se è quello che si sta già facendo, niente; altrimenti tutto si ferma dov'è,
     la scena scende e si spegne, arriva dall'alto la prossima, vuota, e si rifà da capo. */
  function sceltaF(m) {
    if (faseF === 'corre' && destinazioneF.m === m) return;
    if (faseF === 'corre' || root.classList.contains('firma-attesa')) fermaF();
    destinazioneF = { m: m };
    annunciaF(m);
    if (reducedMotion) { chiudiF(); return; }
    var P = [], t = 0, mm = MF, a = st2(TT, VF);
    var passo = function (dura, m2, b, curva) { P.push({ da: t, a: t + dura, m: m2, x0: a, x1: b, curva: curva }); t += dura; a = b; };
    if (a.v >= 0) {
      passo(TF.servi, mm, st2(a.t, 1), 'dolce');
      a = st2(0, -1);
    }
    passo(TF.arriva, m, st2(0, 0), 'dolce');
    passo(TF.bacchettaV, m, st2(1, 0), 'lineare');
    avviaF('prepara', { piano: P, fine: t });
  }

  /* la testata segna la sezione in cui ti trovi */
  var linkVoci = [].slice.call(document.querySelectorAll('#mainNav a'));
  var bersagliVoci = linkVoci.map(function (a) { return document.querySelector(a.getAttribute('href')); });
  function aggiornaVoci() {
    var y = (document.getElementById('testata') || { offsetHeight: 80 }).offsetHeight + 40, ora = -1;
    for (var i = 0; i < bersagliVoci.length; i++) { if (bersagliVoci[i] && bersagliVoci[i].getBoundingClientRect().top <= y) ora = i; }
    linkVoci.forEach(function (a, k) { if (k === ora) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
  }
  var tickVoci = 0;
  window.addEventListener('scroll', function () {
    if (tickVoci) return;
    tickVoci = requestAnimationFrame(function () { tickVoci = 0; aggiornaVoci(); });
  }, { passive: true });
  aggiornaVoci();

  /* lo stato degli orari anche sopra la tabella */
  function copiaStato() {
    var primo = document.getElementById(SITE.hoursStatusId);
    if (!primo) return;
    var aperto = hoursState().open;
    ['orarioStato', 'orarioStato2'].forEach(function (id) {
      var el = document.getElementById(id);
      if (!el) return;
      if (el !== primo) el.textContent = primo.textContent;
      el.classList.toggle('is-aperto', aperto);
    });
  }
  copiaStato();
  setInterval(copiaStato, 60000);
  /* la copia segue lo stato principale a ogni cambio, anche di lingua (#243, stato-lingua-check) */
  (function () {
    var primoS = document.getElementById(SITE.hoursStatusId);
    if (primoS && window.MutationObserver) new MutationObserver(copiaStato).observe(primoS, { childList: true, characterData: true, subtree: true });
  })();

  /* la firma è «in vista» quando se ne vede almeno il 60% (o il 60% della finestra, se è più alta della finestra); l'altezza è quella
     del documento: all'avvio innerHeight di un telefono può non essere ancora quella vera (#233) */
  function altezzaVista() { return document.documentElement.clientHeight || window.innerHeight || 800; }
  function abbastanza(top, bottom, alto, vh) { return Math.min(bottom, vh) - Math.max(top, 0) >= 0.6 * Math.min(alto, vh); }
  function inVistaF() { var r = svgF.getBoundingClientRect(); return abbastanza(r.top, r.bottom, r.height, altezzaVista()); }

  if (figuraF && svgF && BACCHETTA && BACCHETTA.completo && BOTTONI.length === DATI.modi.length) {
    try { clearTimeout(window.__attesaBacchetta); } catch (e) {}
    window.__bacchetta = {
      stato: function () {
        return { fase: faseF, modo: modoF, corse: corseF, m: MF, t: TT, v: VF, meta: destinazioneF.m };
      },
      tempi: TF,
    };
    var daFareF = !reducedMotion && root.classList.contains('firma-attesa');
    /* la pagina aperta su una sezione (#orari): il browser ci scorre dopo, la firma non si vedrebbe */
    var ancoraF = location.hash && location.hash.length > 1 && location.hash !== '#inizio';
    var inVista = inVistaF();
    /* perché la firma è partita o no (lo legge il check) */
    window.__bacchetta.avvio = { daFare: daFareF, ancora: !!ancoraF, inVista: inVista, top: svgF.getBoundingClientRect().top, vh: altezzaVista() };
    if (!daFareF || ancoraF) chiudiF();
    else if (inVista) avviaIntroF();
    else if ('IntersectionObserver' in window) {
      /* la firma sotto la piega (sul telefono): parte quando se ne vede abbastanza; fino ad allora resta la bacchetta nuda e a riposo */
      var soglie = []; for (var sg = 0; sg <= 20; sg++) soglie.push(sg / 20);
      var ioF = new IntersectionObserver(function (voci) {
        if (!voci.some(function (v) { return v.isIntersecting && abbastanza(v.boundingClientRect.top, v.boundingClientRect.bottom, v.boundingClientRect.height, altezzaVista()); })) return;
        ioF.disconnect();
        if (faseF === 'fatta' && root.classList.contains('firma-attesa')) avviaIntroF();
      }, { threshold: soglie });
      ioF.observe(svgF);
      window.__bacchetta.avvio.aspetta = true;
    } else chiudiF();
    /* un resize chiude la firma solo se cambia la LARGHEZZA (sul telefono arrivano resize della sola altezza, #228) */
    window.addEventListener('resize', function () {
      if (faseF !== 'corre' || Math.abs(window.innerWidth - larghezzaAvvioF) <= 1) return;
      chiudiF();
    });
    BOTTONI.forEach(function (b) { b.addEventListener('click', function () { sceltaF(+b.getAttribute('data-modo')); }); });
  }
})();
