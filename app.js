/* Leanders Routine – eigenständige Web-App, ohne Abhängigkeiten.
   Daten bleiben lokal auf dem Gerät (localStorage). Testzeit: ?now=2026-10-07T06:52 */
'use strict';
(function () {
  var CONFIG_KEY = 'leander-routine-config-v1';
  var DAY_KEY = 'leander-routine-day-v1';
  var WEEKDAYS = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'];
  var DAY_SHORT = [[1, 'Mo'], [2, 'Di'], [3, 'Mi'], [4, 'Do'], [5, 'Fr']];

  /* ---------- Icons (Linienstil, 24er Raster) ---------- */
  var ICONS = {
    treppe: '<path d="M3 7h4v4h4v4h4v4h6"/><path d="M18 4v7"/><path d="M15.5 8.5L18 11l2.5-2.5"/>',
    essen: '<path d="M7 3v18"/><path d="M4.5 3v5a2.5 2.5 0 0 0 5 0V3"/><path d="M17 21V3c-2.2 1.6-3 4-3 7v3h3"/>',
    wasser: '<path d="M6 3h12l-1.6 16.2a2 2 0 0 1-2 1.8H9.6a2 2 0 0 1-2-1.8z"/><path d="M6.8 10h10.4"/>',
    pille: '<rect x="2.5" y="8.5" width="19" height="7" rx="3.5" transform="rotate(-45 12 12)"/><path d="M9.5 9.5l5 5"/>',
    geschirr: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/>',
    zahn: '<path d="M7.5 3.5c-2.5 0-4 2-4 4.5 0 3 1.5 4.5 2 7.5.4 2.6 1 5 2.5 5 1.3 0 1.6-2 2-4 .3-1.5 1-2.5 2-2.5s1.7 1 2 2.5c.4 2 .7 4 2 4 1.5 0 2.1-2.4 2.5-5 .5-3 2-4.5 2-7.5 0-2.5-1.5-4.5-4-4.5-1.8 0-2.8 1-4.5 1s-2.7-1-4.5-1z"/>',
    kamm: '<rect x="3" y="7" width="18" height="4.5" rx="1.5"/><path d="M5.5 11.5V17M8.5 11.5V17M11.5 11.5V17M14.5 11.5V17M17.5 11.5V17"/>',
    gesicht: '<circle cx="10" cy="14" r="7"/><path d="M7 16.3c1.6 1.4 4.4 1.4 6 0"/><path d="M7.5 12h.01M12.5 12h.01"/><path d="M19.5 2.5c1.2 1.6 2 2.7 2 3.7a2 2 0 0 1-4 0c0-1 .8-2.1 2-3.7z"/>',
    shirt: '<path d="M8.5 3.5L3.5 6l-1.5 5 3.2 1.2V20.5h13.6v-8.3L22 11l-1.5-5-5-2.5c-.4 1.7-1.8 2.8-3.5 2.8S8.9 5.2 8.5 3.5z"/>',
    zopf: '<circle cx="12" cy="12" r="7.5"/><circle cx="12" cy="12" r="5.5"/>',
    schuh: '<path d="M2.5 17V8.5h5l2 3 6 1.8c3 .9 5.5 1.7 5.5 3.7v1z"/><path d="M2.5 17v2.5h19V17"/><path d="M10.5 12.5l1.2-1.6M13 13.3l1.2-1.6"/>',
    jacke: '<path d="M8.5 3.5L4 6.5v14h16v-14l-4.5-3"/><path d="M8.5 3.5L12 8l3.5-4.5"/><path d="M12 8v12.5"/><path d="M4 11h3M17 11h3"/>',
    apfel: '<path d="M12 8c-1.5-1-3.5-1.3-5-.5-2.5 1.3-3.2 4.6-2.2 7.8C5.8 18.2 8 21 10 21c.8 0 1.3-.4 2-.4s1.2.4 2 .4c2 0 4.2-2.8 5.2-6.2 1-3.2.3-6.5-2.2-7.8-1.5-.8-3.5-.5-5 .5z"/><path d="M12 8c0-2 .5-3.5 2-4.5"/><path d="M13 6c1.2-1.6 3.2-2.2 5-1.6-.6 1.9-2.6 2.6-5 1.6z"/>',
    rucksack: '<path d="M6 10a6 6 0 0 1 12 0v9a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z"/><path d="M10 4V3h4v1"/><path d="M9 15h6v3H9z"/><path d="M9 11h6"/>',
    muetze: '<path d="M5 16a7 7 0 0 1 14 0"/><rect x="4" y="16" width="16" height="3.5" rx="1.2"/><circle cx="12" cy="6.8" r="1.6"/>',
    buegel: '<path d="M10 6a2 2 0 1 1 2 2v1.5"/><path d="M12 9.5L3 16.5h18z"/>',
    flasche: '<path d="M10 2.5h4v3l1.8 2.5v12a1.5 1.5 0 0 1-1.5 1.5H9.7a1.5 1.5 0 0 1-1.5-1.5V8L10 5.5z"/><path d="M8.2 12h7.6"/>',
    heft: '<path d="M5 4.5h10.5a2 2 0 0 1 2 2V20H7a2 2 0 0 1-2-2z"/><path d="M5 18a2 2 0 0 1 2-2h10.5"/><path d="M8.5 8.5h5.5M8.5 11.5h4"/>',
    buch: '<path d="M3 5.5c3-1 6-1 9 1 3-2 6-2 9-1v13c-3-1-6-1-9 1-3-2-6-2-9-1z"/><path d="M12 6.5v13"/>',
    mond: '<path d="M19.5 14.5A8 8 0 1 1 9.5 4.5a6.5 6.5 0 0 0 10 10z"/>',
    waesche: '<path d="M3.5 9.5h17l-1.8 10.2a1.5 1.5 0 0 1-1.5 1.3H6.8a1.5 1.5 0 0 1-1.5-1.3z"/><path d="M8 9.5l2-5M16 9.5l-2-5"/><path d="M9 13.5v3.5M12 13.5v3.5M15 13.5v3.5"/>',
    spray: '<path d="M9 10.5h6v9a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 19.5z"/><path d="M11 10.5V5h2v5.5"/><path d="M16.5 4h.01M18.5 6h.01M18.5 2.5h.01M20.5 4.3h.01"/>',
    tropfen: '<path d="M12 3c3 4 5.5 7 5.5 10a5.5 5.5 0 0 1-11 0C6.5 10 9 7 12 3z"/>',
    bett: '<path d="M3 6v14M3 16h18v4M21 16v-3.5a2.5 2.5 0 0 0-2.5-2.5H11v6"/><rect x="5" y="10.5" width="4" height="3" rx="1.2"/>',
    haus: '<path d="M3.5 11L12 4l8.5 7"/><path d="M5.5 9.5V20h13V9.5"/><path d="M10 20v-5h4v5"/>',
    sonne: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',
    ball: '<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c2.5 2.3 3.8 5.2 3.8 8.5s-1.3 6.2-3.8 8.5M12 3.5C9.5 5.8 8.2 8.7 8.2 12s1.3 6.2 3.8 8.5"/>',
    stern: '<path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z"/>',
    uhr: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    /* Bedienelemente */
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    chev: '<path d="M9 6l6 6-6 6"/>',
    chevdown: '<path d="M6 9l6 6 6-6"/>',
    stift: '<path d="M4 20h4L19 9a2.1 2.1 0 0 0-3-3L5 17z"/><path d="M14 8l3 3"/>',
    schloss: '<rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5"/><path d="M12 14.5v2.5"/>',
    loeschen: '<path d="M9 5h11v14H9l-6-7z"/><path d="M12.5 9.5l5 5M17.5 9.5l-5 5"/>',
    muell: '<path d="M4.5 7h15M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13"/>',
    hoch: '<path d="M12 19V5M6.5 10.5L12 5l5.5 5.5"/>',
    runter: '<path d="M12 5v14M6.5 13.5L12 19l5.5-5.5"/>',
    sichern: '<path d="M12 4v11M7.5 10.5L12 15l4.5-4.5"/><path d="M4.5 19.5h15"/>',
    laden: '<path d="M12 15V4M7.5 8.5L12 4l4.5 4.5"/><path d="M4.5 19.5h15"/>',
    zurueck: '<path d="M9 14L4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
    play: '<path d="M8 5.5v13a1 1 0 0 0 1.5.9l10-6.5a1 1 0 0 0 0-1.7l-10-6.5A1 1 0 0 0 8 5.5z"/>',
    pause: '<rect x="6.5" y="5" width="3.8" height="14" rx="1.2"/><rect x="13.7" y="5" width="3.8" height="14" rx="1.2"/>',
    ton: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M15.5 9a4.5 4.5 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11"/>',
    tonaus: '<path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z"/><path d="M16 9.5l5 5M21 9.5l-5 5"/>',
    zu: '<path d="M6 6l12 12M18 6L6 18"/>',
    nochmal: '<path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3"/><path d="M4.5 4.5v4h4"/>'
  };
  var TASK_ICONS = ['treppe', 'essen', 'wasser', 'pille', 'geschirr', 'zahn', 'kamm', 'gesicht', 'shirt', 'zopf', 'schuh', 'jacke',
    'apfel', 'rucksack', 'muetze', 'buegel', 'flasche', 'heft', 'buch', 'mond', 'waesche', 'spray', 'tropfen', 'bett', 'haus', 'sonne', 'ball', 'stern', 'uhr'];
  var ICON_NAMES = { treppe: 'Treppe', essen: 'Besteck', wasser: 'Glas', pille: 'Tablette', geschirr: 'Teller', zahn: 'Zahn', kamm: 'Kamm',
    gesicht: 'Gesicht', shirt: 'T-Shirt', zopf: 'Haargummi', schuh: 'Schuh', jacke: 'Jacke', apfel: 'Apfel', rucksack: 'Schulranzen',
    muetze: 'Mütze', buegel: 'Kleiderbügel', flasche: 'Trinkflasche', heft: 'Heft', buch: 'Buch', mond: 'Mond', waesche: 'Wäschekorb',
    spray: 'Spray', tropfen: 'Tropfen', bett: 'Bett', haus: 'Haus', sonne: 'Sonne', ball: 'Ball', stern: 'Stern', uhr: 'Uhr' };

  function icon(name, size, extra) {
    var s = size || 28;
    return '<svg class="i" width="' + s + '" height="' + s + '" viewBox="0 0 24 24" aria-hidden="true"' + (extra || '') + '>' + (ICONS[name] || ICONS.stern) + '</svg>';
  }

  /* ---------- Hilfsfunktionen ---------- */
  function esc(s) {
    return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  }
  function uid(p) { return (p || 'x') + Math.random().toString(36).slice(2, 9); }
  function toMin(hhmm) { var p = String(hhmm || '0:0').split(':'); return (parseInt(p[0], 10) || 0) * 60 + (parseInt(p[1], 10) || 0); }
  function fmt(min) { min = ((Math.round(min) % 1440) + 1440) % 1440; var h = Math.floor(min / 60), m = min % 60; return h + ':' + (m < 10 ? '0' : '') + m; }
  function hhmm(min) { var t = fmt(min).split(':'); return (t[0].length < 2 ? '0' : '') + t[0] + ':' + t[1]; }
  function dateKey(d) { return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function clone(o) { return JSON.parse(JSON.stringify(o)); }
  function store(key, val) { try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) { /* Speicher nicht verfügbar */ } }
  function load(key) { try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : null; } catch (e) { return null; } }

  /* Uhr: Systemzeit, für Tests mit ?now=... verschiebbar */
  var offset = 0;
  try {
    var q = new URLSearchParams(location.search).get('now');
    if (q) { var t = new Date(q); if (!isNaN(t.getTime())) offset = t.getTime() - Date.now(); }
  } catch (e) { /* ignore */ }
  function now() { return new Date(Date.now() + offset); }

  /* ---------- Startbelegung aus dem PRD ---------- */
  var ALL = [1, 2, 3, 4, 5];
  function T(name, ic, opts) {
    opts = opts || {};
    var t = { id: uid('t'), name: name, icon: ic, days: opts.days || ALL.slice(), optional: !!opts.optional, hint: opts.hint || '' };
    if (opts.steps) { t.steps = opts.steps; t.sound = true; }
    return t;
  }
  function brushSteps() {
    return [{ id: uid('s'), name: 'Oben rechts', sec: 30 }, { id: uid('s'), name: 'Oben links', sec: 30 },
      { id: uid('s'), name: 'Unten links', sec: 30 }, { id: uid('s'), name: 'Unten rechts', sec: 30 }];
  }
  function hasSteps(t) { return !!(t && t.steps && t.steps.length); }
  function totalSec(t) { return (t.steps || []).reduce(function (s, x) { return s + (x.sec || 0); }, 0); }
  function fmtSec(s) { s = Math.max(0, Math.ceil(s)); return Math.floor(s / 60) + ':' + ('0' + (s % 60)).slice(-2); }
  function parseSec(v) {
    v = String(v || '').trim();
    if (/^\d+:\d{1,2}$/.test(v)) { var p = v.split(':'); return parseInt(p[0], 10) * 60 + parseInt(p[1], 10); }
    var n = parseInt(v, 10);
    return isNaN(n) ? null : n;
  }
  function defaultConfig() {
    return {
      version: 3,
      pin: '',
      routines: [
        { id: 'morgen', name: 'Morgen', icon: 'sonne', type: 'timeline', label: 'Dein Morgen', goal: 'Los', goalIcon: 'haus', goalText: 'bis Haus verlassen um', blocks: [
          { id: uid('b'), name: 'Aufstehen', start: '06:15', end: '06:30', tasks: [T('Nach unten gehen', 'treppe', { hint: 'um 6:30 am Tisch sitzen' })] },
          { id: uid('b'), name: 'Frühstück', start: '06:30', end: '06:50', tasks: [T('Essen', 'essen'), T('1 Glas Wasser trinken', 'wasser'), T('Concerta nehmen', 'pille'), T('Geschirr in die Küche', 'geschirr')] },
          { id: uid('b'), name: 'Bad & Umziehen', start: '06:50', end: '07:10', tasks: [T('Zähne putzen', 'zahn', { steps: brushSteps() }), T('Haare kämmen', 'kamm'), T('Gesicht waschen', 'gesicht'), T('Anziehen', 'shirt'), T('Schlafanzug ins Zimmer', 'mond'), T('Haare zusammenbinden', 'zopf', { days: [1, 3] })] },
          { id: uid('b'), name: 'Schuhe & Jacke', start: '07:10', end: '07:20', tasks: [T('Schuhe anziehen', 'schuh'), T('Jacke anziehen', 'jacke'), T('Jause einpacken', 'apfel'), T('Schulranzen anschnallen', 'rucksack'), T('Handschuhe & Mütze', 'muetze', { optional: true })] }
        ] },
        { id: 'mittag', name: 'Nach der Schule', icon: 'haus', type: 'checklist', tasks: [
          T('Jacke aufhängen', 'buegel'), T('Jausebox in die Küche stellen', 'apfel'), T('Trinkflasche in die Küche stellen', 'flasche'), T('HÜ machen', 'heft')
        ] },
        { id: 'abend', name: 'Abend', icon: 'mond', type: 'timeline', label: 'Dein Abend', goal: 'Bett', goalIcon: 'bett', goalText: 'bis ins Bett um', canShift: true, blocks: [
          { id: uid('b'), name: 'Abendessen', start: '18:30', end: '19:30', tasks: [T('Essen', 'essen'), T('1 Glas Wasser trinken', 'wasser'), T('Geschirr in die Küche', 'geschirr')] },
          { id: uid('b'), name: 'Hochgehen & Bad', start: '19:30', end: '20:00', tasks: [T('Zähne putzen', 'zahn', { steps: brushSteps() }), T('Haare kämmen', 'kamm'), T('Gesicht waschen', 'gesicht'), T('Schlafanzug anziehen', 'mond'), T('Unterhose & Socken in die Wäsche', 'waesche'), T('Kleidung aufhängen', 'buegel'), T('Spray nehmen', 'spray')] }
        ] }
      ]
    };
  }

  function validConfig(c) {
    if (!c || !Array.isArray(c.routines)) return false;
    var ids = c.routines.map(function (r) { return r.id; }).join(',');
    return ids === 'morgen,mittag,abend';
  }

  var config = load(CONFIG_KEY);
  if (!validConfig(config)) { config = defaultConfig(); store(CONFIG_KEY, config); }
  /* Version 2: Zähne putzen bekommt einmalig die vier Timer-Schritte */
  if ((config.version || 1) < 2) {
    config.routines.forEach(function (r) {
      var lists = r.blocks ? r.blocks.map(function (b) { return b.tasks; }) : [r.tasks || []];
      lists.forEach(function (ts) {
        ts.forEach(function (t) {
          if (/z(ä|ae)hne\s*putzen/i.test(t.name || '') && !t.steps) { t.steps = brushSteps(); t.sound = true; }
        });
      });
    });
    config.version = 2;
    store(CONFIG_KEY, config);
  }
  /* Version 3: morgens im Bad kommt einmalig „Schlafanzug ins Zimmer“ dazu (nach „Anziehen“) */
  if (config.version < 3) {
    var mr = config.routines[0], bad = null;
    (mr.blocks || []).forEach(function (b) { if (!bad && /bad/i.test(b.name || '')) bad = b; });
    var exists = config.routines.some(function (r) {
      return (r.blocks || []).some(function (b) { return b.tasks.some(function (t) { return /schlafanzug\s+ins\s+zimmer/i.test(t.name || ''); }); });
    });
    if (bad && !exists) {
      var at = -1;
      bad.tasks.forEach(function (t, i) { if (/^anziehen$/i.test((t.name || '').trim())) at = i; });
      var nt = T('Schlafanzug ins Zimmer', 'mond');
      if (at >= 0) bad.tasks.splice(at + 1, 0, nt); else bad.tasks.push(nt);
    }
    config.version = 3;
    store(CONFIG_KEY, config);
  }
  function saveConfig() { store(CONFIG_KEY, config); }

  var day = null;
  function freshDay(d) { return { date: dateKey(d), done: {}, later: {}, celebrated: {}, brushed: {} }; }
  function ensureDay() {
    var d = now();
    if (!day) day = load(DAY_KEY);
    if (!day || day.date !== dateKey(d)) { day = freshDay(d); store(DAY_KEY, day); }
    day.done = day.done || {}; day.later = day.later || {}; day.celebrated = day.celebrated || {}; day.brushed = day.brushed || {};
  }
  function saveDay() { store(DAY_KEY, day); }

  /* ---------- Routinenlogik ---------- */
  function routine(id) { for (var i = 0; i < config.routines.length; i++) if (config.routines[i].id === id) return config.routines[i]; return null; }
  function isSchoolDay(wd) { return wd >= 1 && wd <= 5; }
  function todaysTasks(list, wd) {
    return (list || []).filter(function (t) { return !isSchoolDay(wd) || !t.days || t.days.indexOf(wd) >= 0; });
  }
  /* Blöcke in Minuten, sortiert; abends ggf. mit "heute später" verschoben (erster Block wird länger, Rest rückt nach) */
  function effBlocks(r) {
    var shift = (r.canShift && day.later[r.id]) || 0;
    var bs = (r.blocks || []).map(function (b) { return { b: b, start: toMin(b.start), end: toMin(b.end) }; });
    bs.sort(function (a, c) { return a.start - c.start; });
    if (shift) bs.forEach(function (x, i) { if (i > 0) x.start += shift; x.end += shift; });
    return bs;
  }
  function span(r) {
    var bs = effBlocks(r);
    if (!bs.length) return null;
    return { start: bs[0].start, end: Math.max.apply(null, bs.map(function (x) { return x.end; })) };
  }
  function autoRoutine(d) {
    var wd = d.getDay();
    if (!isSchoolDay(wd)) return 'frei';
    var m = d.getHours() * 60 + d.getMinutes();
    var ms = span(routine('morgen')), as = span(routine('abend'));
    if (!ms || !as) return 'mittag';
    if (m < ms.start - 45) return 'nacht';
    if (m < ms.end + 15) return 'morgen';
    if (m < as.start) return 'mittag';
    if (m < as.end + 45) return 'abend';
    return 'nacht';
  }
  function required(tasks) { return tasks.filter(function (t) { return !t.optional; }); }
  function openReq(tasks) { return required(tasks).filter(function (t) { return !day.done[t.id]; }); }

  /* ---------- Zustand der Oberfläche ---------- */
  var ui = { view: 'main', manual: null, pinMode: 'enter', pinBuf: '', pinFirst: '', pinErr: '', pinBack: 'main',
    editId: 'morgen', openBlock: null, picker: null, sig: '' };
  var app = document.getElementById('app');
  var cele = document.getElementById('celebrate');

  function currentId(d) {
    var auto = autoRoutine(d);
    if (ui.manual && ui.manual.auto === auto) return ui.manual.id;
    ui.manual = null;
    return auto;
  }

  /* ---------- Hauptansicht ---------- */
  function header(curId, d) {
    var tabs = config.routines.map(function (r) {
      if (r.id === curId) return '<button type="button" class="pill t-' + r.id + '" data-action="pick" data-id="' + r.id + '" aria-current="true">' + icon(r.icon, 24) + '<span>' + esc(r.name) + '</span></button>';
      return '<button type="button" class="pill-icon t-' + r.id + '" data-action="pick" data-id="' + r.id + '" aria-label="' + esc(r.name) + ' anzeigen">' + icon(r.icon, 24) + '</button>';
    }).join('');
    var m = d.getHours() * 60 + d.getMinutes();
    return '<header class="top"><div class="top-left"><nav class="switch" aria-label="Routine wählen">' + tabs + '</nav>' +
      '<span class="day">' + WEEKDAYS[d.getDay()] + '</span></div>' +
      '<div class="top-right"><span class="clock">' + fmt(m) + '</span>' +
      '<button type="button" class="icon-btn" data-action="edit" aria-label="Bearbeiten">' + icon('stift', 22) + '</button></div></header>';
  }

  function taskCard(t, state, tag) {
    var done = !!day.done[t.id];
    var cls = 'task' + (done ? ' done' : '') + (state === 'late' && !done ? ' late' : '') + (t.optional ? ' optional' : '');
    var sub = '';
    if (t.optional) sub += '<span class="tag">optional</span>';
    if (tag) sub += '<span class="tag">' + esc(tag) + '</span>';
    if (t.hint && !done) sub += '<span class="hint">' + esc(t.hint) + '</span>';
    if (hasSteps(t)) {
      /* Aufgabe mit Timer: Play öffnet die Putz-Ansicht, Kreis hakt ab (auch ohne Timer) */
      var ready = !done && day.brushed[t.id];
      var info = ready ? '<span class="hint">Alles geputzt, jetzt abhaken</span>'
        : '<span class="tag">' + fmtSec(totalSec(t)).replace(/:00$/, '') + ' Min · ' + t.steps.length + (t.steps.length === 1 ? ' Schritt' : ' Schritte') + '</span>';
      return '<div class="' + cls + ' has-timer' + (ready ? ' ready' : '') + '" data-id="' + t.id + '">' +
        '<button type="button" class="task-main" data-action="toggle" data-id="' + t.id + '" aria-pressed="' + (done ? 'true' : 'false') + '">' +
        '<span class="tile">' + icon(t.icon, 30) + '</span>' +
        '<span class="txt"><span class="label">' + esc(t.name) + '</span>' + sub + (done ? '' : info) + '</span></button>' +
        (done ? '' : '<button type="button" class="play" data-action="timer-open" data-id="' + t.id + '" aria-label="Timer für ' + esc(t.name) + ' starten">' + icon('play', 24, ' style="stroke-width:1.8"') + '</button>') +
        '<button type="button" class="chk-btn" data-action="toggle" data-id="' + t.id + '" aria-label="' + esc(t.name) + (done ? ' nicht mehr abhaken' : ' abhaken') + '"><span class="chk">' + (done ? icon('check', 22, ' style="stroke-width:2.4"') : '') + '</span></button></div>';
    }
    return '<button type="button" class="' + cls + '" data-action="toggle" data-id="' + t.id + '" aria-pressed="' + (done ? 'true' : 'false') + '">' +
      '<span class="tile">' + icon(t.icon, 30) + '</span>' +
      '<span class="txt"><span class="label">' + esc(t.name) + '</span>' + sub + '</span>' +
      '<span class="chk">' + (done ? icon('check', 22, ' style="stroke-width:2.4"') : '') + '</span></button>';
  }

  function viewTimeline(r, d) {
    var wd = d.getDay();
    var sec = d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
    var m = sec / 60;
    var bs = effBlocks(r);
    if (!bs.length) return '<div class="calm"><p>Für diese Routine gibt es noch keine Blöcke. Tippe auf den Stift, um welche anzulegen.</p></div>';
    var start = bs[0].start, end = span(r).end;
    var cur = null, curIdx = -1;
    bs.forEach(function (x, i) {
      x.tasks = todaysTasks(x.b.tasks, wd);
      x.open = openReq(x.tasks).length;
      x.req = required(x.tasks).length;
      if (m >= x.start && m < x.end && cur === null) { cur = x; curIdx = i; }
    });
    if (m < start) { cur = bs[0]; curIdx = 0; }
    bs.forEach(function (x) {
      if (m >= x.end) x.st = x.open ? 'late' : 'done';
      else if (m >= x.start) x.st = (x.end - m <= 2 && x.open) ? 'warn' : 'active';
      else x.st = (x.req && !x.open) ? 'done' : 'next';
    });
    var remSec = end * 60 - sec;
    var remMin = Math.ceil(remSec / 60);
    var warn = cur && cur.st === 'warn';

    /* Countdown */
    var cd;
    if (remSec <= 0) {
      cd = '<div class="card count"><span class="lead">Es ist</span><span class="big">' + fmt(end) + '</span><span class="sub">' + esc(r.id === 'morgen' ? 'Zeit zum Losgehen!' : 'Zeit fürs Bett!') + '</span><div class="bar"><span style="width:100%"></span></div></div>';
    } else {
      /* Großer Countdown: bis zum nächsten Block. Im letzten Block: bis zum Ziel (Haus verlassen / Bett). */
      var target, label, from;
      var nb = m < start ? bs[0] : bs[curIdx + 1];
      if (m < start) { target = start; label = 'bis ' + bs[0].b.name; from = start - 30; }
      else if (cur && nb) { target = nb.start; label = 'bis ' + nb.b.name; from = cur.start; }
      else { target = end; label = r.goalText + ' ' + fmt(end); from = cur ? cur.start : start; }
      var leftSec = target * 60 - sec, leftMin = Math.max(1, Math.ceil(leftSec / 60));
      var n = leftMin >= 60 ? Math.floor(leftMin / 60) + ':' + ('0' + (leftMin % 60)).slice(-2) : String(leftMin);
      var u = leftMin >= 60 ? 'Std.' : (leftMin === 1 ? 'Minute' : 'Minuten');
      var pct = Math.max(0, Math.min(100, (m - from) / Math.max(1, target - from) * 100));
      var goalLine = target === end ? '' :
        '<span class="goalline">' + icon(r.goalIcon || 'stern', 18) + '<span>' + esc(r.id === 'morgen' ? 'Losgehen' : 'Ins Bett') + ' um ' + fmt(end) + '</span>' +
        '<span class="gl-rest">noch ' + remMin + ' Min</span></span>';
      cd = '<div class="card count' + (warn ? ' warn' : '') + '"><span class="lead">Noch</span><div class="num"><span class="n">' + n + '</span><span class="u">' + u + '</span></div>' +
        '<span class="sub">' + esc(label) + '</span><div class="bar"><span style="width:' + pct.toFixed(1) + '%"></span></div>' + goalLine + '</div>';
    }

    /* Zeitstrahl */
    var blocks = bs.map(function (x, i) {
      var nm = (x.st === 'done' ? icon('check', 16, ' style="stroke-width:2.2"') : '') + '<span>' + esc(x.b.name) + '</span>';
      var note = x.st === 'late' ? '<span class="note">' + x.open + ' offen</span>' : '';
      var marker = '';
      if (i === curIdx && remSec > 0) {
        var lp = m < x.start ? 0 : Math.max(0, Math.min(100, (m - x.start) / (x.end - x.start) * 100));
        marker = '<span class="now" style="left:' + lp.toFixed(1) + '%"><b>jetzt</b><i></i></span>';
      }
      return '<div class="blk ' + x.st + '" style="flex-grow:' + Math.max(1, x.end - x.start) + '">' + marker +
        '<div class="blk-box"><span class="nm">' + nm + '</span>' + note + '</div><span class="blk-time">' + fmt(x.start) + '</span></div>';
    }).join('');
    var goalMarker = remSec <= 0 ? '<span class="now" style="left:50%"><b>jetzt</b><i></i></span>' : '';
    var tl = '<div class="card tl"><span class="tl-label">' + esc(r.label || r.name) + '</span><div class="tl-row"><div class="tl-blocks">' + blocks + '</div>' +
      '<div class="goal">' + goalMarker + '<div class="goal-box">' + icon(r.goalIcon || 'stern', 22) + '<span>' + esc(r.goal || 'Ziel') + '</span></div><span class="goal-time">' + fmt(end) + '</span></div></div></div>';

    /* Aufgaben: aktueller Block + offene Aufgaben aus vorbei gelaufenen Blöcken */
    var cards = [];
    bs.forEach(function (x) {
      if (x === cur || x.end > m) return;
      x.tasks.forEach(function (t) { if (!t.optional && !day.done[t.id]) cards.push(taskCard(t, 'late', 'noch offen von ' + x.b.name)); });
    });
    var head, extra = '';
    if (cur) {
      cur.tasks.forEach(function (t) { cards.push(taskCard(t, 'normal')); });
      var reqN = cur.req, doneN = cur.req - cur.open;
      var badge = warn ? '<span class="badge warn">noch ' + Math.max(1, Math.ceil(cur.end - m)) + (Math.ceil(cur.end - m) === 1 ? ' Minute' : ' Minuten') + '</span>'
        : '<span class="badge">' + doneN + ' von ' + reqN + ' erledigt</span>';
      head = '<div class="sec-head"><h2>' + (m < start ? 'Gleich geht es los: ' : 'Jetzt dran: ') + esc(cur.b.name) + '</h2>' + (reqN ? badge : '') + '</div>';
      var nxt = bs[curIdx + 1];
      if (reqN && !cur.open && nxt) extra = '<div class="banner">Super, ' + esc(cur.b.name) + ' ist fertig! Um ' + fmt(nxt.start) + ' geht es weiter mit ' + esc(nxt.b.name) + '.</div>';
      else if (reqN && !cur.open) extra = '<div class="banner">Super, alles erledigt!</div>';
      else if (nxt) extra = '<div class="next">' + icon('uhr', 20) + '<span>Danach: ' + esc(nxt.b.name) + ' ab ' + fmt(nxt.start) + '</span></div>';
    } else {
      head = '<div class="sec-head"><h2>' + (cards.length ? 'Das ist noch offen' : 'Alles erledigt') + '</h2></div>';
      if (!cards.length) extra = '<div class="banner">' + esc(r.id === 'morgen' ? 'Super! Ab in die Schule.' : 'Super! Schlaf gut.') + '</div>';
    }
    var g = cards.length ? '<div class="grid' + (cards.length <= 4 ? ' c2' : '') + '">' + cards.join('') + '</div>' : '';
    return '<section class="toprow">' + cd + tl + '</section><section class="tasks">' + head + g + extra + '</section>';
  }

  function viewChecklist(r, d) {
    var tasks = todaysTasks(r.tasks, d.getDay());
    var req = required(tasks).length, open = openReq(tasks).length, done = req - open;
    var msg = !req ? 'Heute steht nichts auf deiner Liste.' : (!open ? 'Alles erledigt, super!' : (open === 1 ? 'Noch 1 Ding auf deiner Liste.' : 'Noch ' + open + ' Dinge auf deiner Liste.'));
    var pct = req ? done / req * 100 : 100;
    var hero = '<section class="card hero"><div><h1>Willkommen zu Hause!</h1><p>' + msg + '</p></div>' +
      '<div class="prog"><b>' + done + ' von ' + req + '</b><div class="bar"><span style="width:' + pct.toFixed(0) + '%"></span></div></div></section>';
    var cols = tasks.length <= 4 ? ' c2' : '';
    return hero + '<div class="grid big fill' + cols + '">' + tasks.map(function (t) { return taskCard(t, 'normal'); }).join('') + '</div>';
  }

  function viewCalm(kind, d) {
    if (kind === 'frei') {
      return '<div class="calm"><div class="orb">' + icon('sonne', 72) + '</div><h1>Heute ist frei</h1><p>Schönes Wochenende!</p></div>';
    }
    var tomorrow = new Date(d.getTime() + 86400000);
    var ms = span(routine('morgen'));
    var morning = d.getHours() < 12;
    var txt;
    if (morning) txt = ms ? 'Der Morgen startet um ' + fmt(ms.start) + '.' : '';
    else txt = isSchoolDay(tomorrow.getDay()) ? (ms ? 'Morgen früh geht es um ' + fmt(ms.start) + ' weiter.' : '') : 'Morgen ist frei.';
    return '<div class="calm"><div class="orb">' + icon('mond', 72) + '</div><h1>Schlaf gut!</h1><p>' + txt + '</p></div>';
  }

  function themeFor(id) { return id === 'frei' ? 'mittag' : (id === 'nacht' ? 'abend' : id); }

  function mainSig(d) {
    var id = currentId(d);
    var sec = d.getHours() * 3600 + d.getMinutes() * 60 + d.getSeconds();
    var r = routine(id), extra = '';
    if (r && r.type === 'timeline') {
      var sp = span(r);
      if (sp) {
        var rem = sp.end * 60 - sec;
        extra = Math.ceil(rem / 60) + '|' + (rem <= 0) + '|' + effBlocks(r).map(function (x) { return (sec / 60 >= x.end ? 'p' : (sec / 60 >= x.start ? (x.end - sec / 60 <= 2 ? 'w' : 'a') : 'n')); }).join('');
      }
    }
    return 'main|' + id + '|' + d.getHours() + ':' + d.getMinutes() + '|' + extra;
  }

  function renderMain() {
    ensureDay();
    var d = now();
    var id = currentId(d);
    var r = routine(id);
    var body = r ? (r.type === 'timeline' ? viewTimeline(r, d) : viewChecklist(r, d)) : viewCalm(id, d);
    app.className = 'app t-' + themeFor(id);
    app.innerHTML = header(id, d) + body;
    ui.sig = mainSig(d);
    updateWakeLock(r && r.type === 'timeline' && id === autoRoutine(d));
  }

  /* Funken beim Abhaken */
  var SPARKS = ['var(--mid)', '#A6C9AF', '#BCAFE6', '#EDC14A'];
  function burst(id) {
    var el = app.querySelector('.task[data-id="' + id + '"]');
    if (!el) return;
    var b = document.createElement('span');
    b.className = 'burst';
    var h = '<span class="ring"></span>';
    for (var i = 0; i < 8; i++) {
      var a = i * Math.PI / 4, dx = Math.round(Math.cos(a) * 58), dy = Math.round(Math.sin(a) * 58);
      h += '<span class="sp" style="background:' + SPARKS[i % 4] + ';--dx:' + dx + 'px;--dy:' + dy + 'px"></span>';
    }
    b.innerHTML = h;
    el.appendChild(b);
    setTimeout(function () { if (b.parentNode) b.parentNode.removeChild(b); }, 1000);
  }

  /* Großes Feuerwerk, wenn eine Routine fertig ist */
  function routineComplete(r, d) {
    var wd = d.getDay(), tasks = [];
    if (r.type === 'timeline') effBlocks(r).forEach(function (x) { tasks = tasks.concat(todaysTasks(x.b.tasks, wd)); });
    else tasks = todaysTasks(r.tasks, wd);
    return required(tasks).length > 0 && openReq(tasks).length === 0;
  }
  function fireworks() {
    var spots = [[110, 120, 70, 'var(--mid)', 12, 0], [310, 90, 88, '#BCAFE6', 14, 300], [510, 125, 66, '#A6C9AF', 12, 150], [215, 190, 34, '#EDC14A', 8, 500], [420, 195, 30, 'var(--mid)', 8, 650]];
    return '<div class="fw" aria-hidden="true">' + spots.map(function (s) {
      var rays = '';
      for (var i = 0; i < s[4]; i++) {
        var deg = 360 * i / s[4];
        rays += '<span class="r" style="background:' + s[3] + ';--len:' + Math.round(s[2] * 0.62) + 'px;transform:rotate(' + deg + 'deg) translateY(' + Math.round(s[2] * 0.38) + 'px);animation-delay:' + s[5] + 'ms"></span>';
      }
      return '<span class="b" style="left:' + (s[0] / 6.2) + '%;top:' + s[1] + 'px">' + rays + '</span>';
    }).join('') + '</div>';
  }
  var celeTimer = null;
  function celebrate(r, d) {
    var m = d.getHours() * 60 + d.getMinutes();
    var l2 = '';
    if (r.type === 'timeline') {
      var sp = span(r), left = sp ? sp.end - m : 0;
      if (left > 0) l2 = 'Noch ' + left + (left === 1 ? ' Minute ' : ' Minuten ') + r.goalText + ' ' + fmt(sp.end) + '.';
      else if (r.id === 'abend') l2 = 'Gute Nacht!';
    }
    cele.className = 'celebrate t-' + r.id;
    cele.innerHTML = fireworks() + '<h1>Geschafft!</h1><p class="l1">' + esc(r.name) + ': alles erledigt um ' + fmt(m) + '.</p>' + (l2 ? '<p class="l2">' + esc(l2) + '</p>' : '') +
      '<button type="button" class="link-btn tap" data-action="close-cele">Antippen zum Schließen</button>';
    cele.hidden = false;
    clearTimeout(celeTimer);
    celeTimer = setTimeout(closeCele, 9000);
  }
  function closeCele() { cele.hidden = true; cele.innerHTML = ''; clearTimeout(celeTimer); }
  cele.addEventListener('click', closeCele);

  function toggleTask(id) {
    ensureDay();
    var nowDone = !day.done[id];
    if (nowDone) day.done[id] = Date.now(); else delete day.done[id];
    var d = now(), rid = currentId(d), r = routine(rid);
    var fire = false;
    if (nowDone && r && !day.celebrated[r.id] && routineComplete(r, d)) { day.celebrated[r.id] = true; fire = true; }
    saveDay();
    renderMain();
    if (nowDone) burst(id);
    if (fire) setTimeout(function () { celebrate(r, d); }, 450);
  }

  /* ---------- Timer-Ansicht (z. B. Zähne putzen) ---------- */
  var actx = null;
  function audioInit() {
    /* "ambient" mischt sich unter andere Audioquellen, damit der Podcast weiterläuft (Safari 16.4+) */
    try { if (navigator.audioSession) navigator.audioSession.type = 'ambient'; } catch (e) { /* nicht unterstützt */ }
    try {
      if (!actx) { var AC = window.AudioContext || window.webkitAudioContext; if (AC) actx = new AC(); }
      if (actx && actx.state === 'suspended') actx.resume();
    } catch (e) { actx = null; }
  }
  function chime(kind) {
    if (!actx) return;
    try {
      var t0 = actx.currentTime + 0.03;
      var notes = kind === 'done' ? [659.25, 783.99, 1046.5] : [783.99, 1046.5];
      notes.forEach(function (f, i) {
        var o = actx.createOscillator(), g = actx.createGain(), st = t0 + i * 0.17;
        o.type = 'sine'; o.frequency.value = f;
        g.gain.setValueAtTime(0.0001, st);
        g.gain.exponentialRampToValueAtTime(0.35, st + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, st + 0.7);
        o.connect(g); g.connect(actx.destination);
        o.start(st); o.stop(st + 0.75);
      });
    } catch (e) { /* Ton nicht möglich */ }
  }

  function mouthPos(name) {
    var n = (name || '').toLowerCase();
    var row = /oben/.test(n) ? 0 : (/unten/.test(n) ? 1 : -1);
    var col = /links/.test(n) ? 0 : (/rechts/.test(n) ? 1 : -1);
    return row < 0 || col < 0 ? -1 : row * 2 + col;
  }
  function isMouth(t) {
    if (t.steps.length !== 4) return false;
    var seen = {};
    return t.steps.every(function (s) { var p = mouthPos(s.name); if (p < 0 || seen[p]) return false; seen[p] = 1; return true; });
  }
  function teeth(upper) {
    var h = '';
    for (var i = 0; i < 4; i++) h += '<span class="tooth' + (i === 1 || i === 2 ? ' long' : '') + '"></span>';
    return '<span class="teeth ' + (upper ? 'up' : 'down') + '">' + h + '</span>';
  }
  function stepState(i) {
    var b = ui.brush;
    if (b.phase === 'done' || i < b.idx) return 'done';
    if (i === b.idx && b.phase !== 'start') return 'active';
    return 'next';
  }
  function stepTile(s, i, mouth) {
    var st = stepState(i);
    var badge = st === 'done' ? '<span class="sdone">' + icon('check', 20, ' style="stroke-width:2.4"') + '</span>'
      : (st === 'active' ? '<span class="snow">jetzt</span>' : '<span class="sgap"></span>');
    var lab = '<span class="slab"><b>' + esc(s.name) + '</b>' + badge + '</span>';
    var up = mouth && mouthPos(s.name) < 2;
    var inner = mouth ? (up ? teeth(true) + lab : lab + teeth(false)) : lab;
    return '<div class="step ' + st + (mouth ? (up ? ' up' : ' down') : '') + '">' + inner + '</div>';
  }
  function dots(n) {
    var h = '';
    for (var i = 0; i < n; i++) {
      var st = stepState(i);
      h += '<span class="' + (st === 'done' ? 'on' : (st === 'active' ? 'cur' : '')) + '"></span>';
    }
    return '<span class="sdots" aria-hidden="true">' + h + '</span>';
  }
  function brushLeft() {
    var b = ui.brush;
    return b.phase === 'pause' ? b.left : Math.max(0, b.stepEnd - Date.now());
  }

  function renderBrush() {
    ensureDay();
    var b = ui.brush, f = findTask(b.id);
    if (!f) { ui.view = 'main'; return renderMain(); }
    var t = f.t, n = t.steps.length, mouth = isMouth(t);
    var tiles;
    if (mouth) {
      var byPos = [];
      t.steps.forEach(function (s, i) { byPos[mouthPos(s.name)] = stepTile(s, i, true); });
      tiles = '<div class="mouth">' + byPos.join('') + '</div>';
    } else {
      tiles = '<div class="steps-list">' + t.steps.map(function (s, i) { return stepTile(s, i, false); }).join('') + '</div>';
    }
    var noun = mouth ? 'Bereiche' : 'Schritte';
    var right;
    if (b.phase === 'start') {
      var same = t.steps.every(function (s) { return s.sec === t.steps[0].sec; });
      var title = same ? n + ' ' + noun + ',<br>je ' + (t.steps[0].sec % 60 ? t.steps[0].sec + ' Sekunden' : (t.steps[0].sec / 60) + (t.steps[0].sec === 60 ? ' Minute' : ' Minuten'))
        : n + ' ' + noun + ',<br>zusammen ' + fmtSec(totalSec(t)) + ' Min';
      right = '<span class="kicker">Bereit?</span><h1>' + title + '</h1>' +
        '<p>Die App sagt dir, wann du weiter darfst.<br>Du musst nichts mehr antippen.</p>' +
        '<button type="button" class="bigbtn" data-action="timer-start">' + icon('play', 34, ' style="stroke-width:2"') + '<span>Start</span></button>';
    } else if (b.phase === 'done') {
      right = '<div class="kgroup"><span class="kicker strong">' + fmtSec(totalSec(t)).replace(/:00$/, '') + ' Minuten geschafft</span>' + dots(n) + '</div>' +
        '<h1>' + (mouth ? 'Alle Seiten<br>sind sauber!' : 'Alles<br>geschafft!') + '</h1><p>Jetzt noch selbst abhaken.</p>' +
        '<button type="button" class="bigbtn" data-action="timer-check">' + icon('check', 34, ' style="stroke-width:2.4"') + '<span>Abhaken</span></button>' +
        '<button type="button" class="link-btn again" data-action="timer-start">' + icon('nochmal', 20) + '<span>Nochmal starten</span></button>';
    } else {
      var s = t.steps[b.idx], left = brushLeft(), pct = 100 - left / (s.sec * 1000) * 100;
      var nxt = t.steps[b.idx + 1];
      var paused = b.phase === 'pause';
      right = '<div class="kgroup"><span class="kicker">' + (mouth ? 'Bereich ' : 'Schritt ') + (b.idx + 1) + ' von ' + n + (paused ? ' · Pause' : '') + '</span>' + dots(n) + '</div>' +
        '<h1 class="stepname">' + esc(s.name) + '</h1>' +
        '<span class="bigtime">' + fmtSec(left / 1000) + '</span>' +
        '<span class="sbar"><span style="width:' + Math.max(0, Math.min(100, pct)).toFixed(1) + '%"></span></span>' +
        '<div class="ctrl"><button type="button" class="roundbtn' + (paused ? ' go' : '') + '" data-action="' + (paused ? 'timer-resume' : 'timer-pause') + '" aria-label="' + (paused ? 'Weiter' : 'Pause') + '">' + icon(paused ? 'play' : 'pause', 30) + '</button>' +
        '<span class="nexttxt">' + (nxt ? 'Danach: ' + esc(nxt.name) : 'Letzter ' + (mouth ? 'Bereich' : 'Schritt') + '!') + '</span></div>';
    }
    var snd = t.sound !== false;
    app.className = 'app brush t-' + themeFor(currentId(now()));
    app.innerHTML = '<header class="top"><span class="pill">' + icon(t.icon, 24) + '<span>' + esc(t.name) + '</span></span>' +
      '<div class="top-right"><button type="button" class="sndbtn' + (snd ? ' on' : '') + '" data-action="timer-sound" aria-pressed="' + snd + '">' + icon(snd ? 'ton' : 'tonaus', 22) + '<span>' + (snd ? 'Ton an' : 'Ton aus') + '</span></button>' +
      '<button type="button" class="icon-btn" data-action="timer-close" aria-label="Schließen">' + icon('zu', 22) + '</button></div></header>' +
      '<div class="stage">' + tiles + '<div class="sright">' + right + '</div></div>';
    ui.sig = brushSig();
    updateWakeLock(true);
  }
  function brushSig() {
    var b = ui.brush;
    return 'brush|' + b.phase + '|' + b.idx + '|' + Math.ceil(brushLeft() / 1000);
  }
  function openTimer(id) {
    ui.brush = { id: id, idx: 0, phase: 'start', stepEnd: 0, left: 0 };
    ui.view = 'brush';
    closeCele(); render();
  }
  function startTimer() {
    var f = findTask(ui.brush.id); if (!f) return;
    if (f.t.sound !== false) audioInit();
    ui.brush.idx = 0; ui.brush.phase = 'run';
    ui.brush.stepEnd = Date.now() + f.t.steps[0].sec * 1000;
    render();
  }
  function tickTimer() {
    var b = ui.brush; if (!b || b.phase !== 'run') return;
    var f = findTask(b.id); if (!f) return;
    var steps = f.t.steps, changed = false;
    while (b.phase === 'run' && Date.now() >= b.stepEnd) {
      b.idx++; changed = true;
      if (b.idx >= steps.length) {
        b.phase = 'done'; b.idx = steps.length;
        ensureDay(); day.brushed[b.id] = true; saveDay();
      } else {
        b.stepEnd += steps[b.idx].sec * 1000;
      }
    }
    if (changed && f.t.sound !== false) chime(b.phase === 'done' ? 'done' : 'step');
  }

  /* ---------- PIN ---------- */
  function renderPin() {
    app.className = 'app t-morgen';
    var title = ui.pinMode === 'enter' ? 'PIN eingeben' : (ui.pinMode === 'set1' ? 'Neue PIN festlegen' : 'PIN wiederholen');
    var sub = ui.pinErr || (ui.pinMode === 'enter' ? 'zum Bearbeiten der Routinen' : (ui.pinMode === 'set1' ? '4 Ziffern, die nur ihr kennt' : 'zur Sicherheit noch einmal'));
    var dots = '';
    for (var i = 0; i < 4; i++) dots += '<span class="' + (i < ui.pinBuf.length ? 'on' : '') + '"></span>';
    var keys = '';
    for (var k = 1; k <= 9; k++) keys += '<button type="button" class="key" data-action="digit" data-d="' + k + '">' + k + '</button>';
    keys += '<span></span><button type="button" class="key" data-action="digit" data-d="0">0</button>' +
      '<button type="button" class="key plain" data-action="pin-del" aria-label="Ziffer löschen">' + icon('loeschen', 30) + '</button>';
    app.innerHTML = '<div class="pin-wrap"><div class="pin"><span class="lock">' + icon('schloss', 32) + '</span>' +
      '<div><h1>' + title + '</h1><p class="' + (ui.pinErr ? 'err' : '') + '">' + esc(sub) + '</p></div>' +
      '<div class="dots' + (ui.pinErr ? ' shake' : '') + '" aria-label="' + ui.pinBuf.length + ' von 4 Ziffern">' + dots + '</div>' +
      '<div class="keys">' + keys + '</div>' +
      '<button type="button" class="link-btn" data-action="pin-cancel">Abbrechen</button></div></div>';
  }
  function openPin(mode, back) {
    ui.view = 'pin'; ui.pinMode = mode; ui.pinBuf = ''; ui.pinFirst = ''; ui.pinErr = ''; ui.pinBack = back || 'main';
    closeCele(); render();
  }
  function pinDigit(dg) {
    if (ui.pinBuf.length >= 4) return;
    ui.pinBuf += dg; ui.pinErr = '';
    if (ui.pinBuf.length < 4) return render();
    var entered = ui.pinBuf;
    setTimeout(function () {
      if (ui.pinMode === 'enter') {
        if (entered === config.pin) { ui.view = 'edit'; ui.editId = 'morgen'; ui.openBlock = null; ui.picker = null; }
        else { ui.pinBuf = ''; ui.pinErr = 'Falsche PIN, bitte noch einmal.'; }
      } else if (ui.pinMode === 'set1') {
        ui.pinFirst = entered; ui.pinBuf = ''; ui.pinMode = 'set2';
      } else {
        if (entered === ui.pinFirst) { config.pin = entered; saveConfig(); ui.view = 'edit'; }
        else { ui.pinMode = 'set1'; ui.pinBuf = ''; ui.pinFirst = ''; ui.pinErr = 'Die PINs waren verschieden. Bitte neu festlegen.'; }
      }
      render();
    }, 180);
    render();
  }

  /* ---------- Bearbeiten ---------- */
  function findTask(id) {
    for (var i = 0; i < config.routines.length; i++) {
      var r = config.routines[i];
      if (r.tasks) for (var j = 0; j < r.tasks.length; j++) if (r.tasks[j].id === id) return { list: r.tasks, idx: j, t: r.tasks[j] };
      if (r.blocks) for (var b = 0; b < r.blocks.length; b++) {
        var ts = r.blocks[b].tasks;
        for (var k = 0; k < ts.length; k++) if (ts[k].id === id) return { list: ts, idx: k, t: ts[k] };
      }
    }
    return null;
  }
  function findBlock(id) {
    for (var i = 0; i < config.routines.length; i++) {
      var bl = config.routines[i].blocks;
      if (bl) for (var j = 0; j < bl.length; j++) if (bl[j].id === id) return { list: bl, idx: j, b: bl[j] };
    }
    return null;
  }
  function move(list, idx, dir) {
    var to = idx + dir;
    if (to < 0 || to >= list.length) return;
    var x = list[idx]; list[idx] = list[to]; list[to] = x;
  }

  function taskRowEd(t, i, n) {
    var days = DAY_SHORT.map(function (d) {
      var on = t.days.indexOf(d[0]) >= 0;
      return '<button type="button" class="' + (on ? 'on' : '') + '" data-action="day" data-id="' + t.id + '" data-d="' + d[0] + '" aria-pressed="' + on + '">' + d[1] + '</button>';
    }).join('');
    var picker = '';
    if (ui.picker === t.id) {
      picker = '<div class="picker" role="group" aria-label="Icon wählen">' + TASK_ICONS.map(function (k) {
        return '<button type="button" class="' + (k === t.icon ? 'on' : '') + '" data-action="icon-pick" data-id="' + t.id + '" data-icon="' + k + '" aria-label="' + ICON_NAMES[k] + '">' + icon(k, 26) + '</button>';
      }).join('') + '</div>';
    }
    return '<div class="t-row">' +
      '<div class="t-line"><button type="button" class="ico-btn" data-action="icon-open" data-id="' + t.id + '" aria-label="Icon ändern (' + esc(ICON_NAMES[t.icon] || t.icon) + ')">' + icon(t.icon, 22) + '</button>' +
      '<input class="inp name" data-field="task-name" data-id="' + t.id + '" value="' + esc(t.name) + '" aria-label="Aufgabe" placeholder="Aufgabe">' +
      '<div class="days" role="group" aria-label="Wochentage">' + days + '</div>' +
      '<button type="button" class="sw' + (t.optional ? ' on' : '') + '" data-action="opt" data-id="' + t.id + '" aria-pressed="' + t.optional + '"><span>optional</span><span class="tr"><i></i></span></button></div>' +
      '<div class="t-line sub"><input class="inp hint" data-field="task-hint" data-id="' + t.id + '" value="' + esc(t.hint) + '" placeholder="Hinweis (optional), z. B. um 6:30 am Tisch sitzen" aria-label="Hinweis">' +
      '<button type="button" class="mini" data-action="task-up" data-id="' + t.id + '" aria-label="Nach oben"' + (i === 0 ? ' disabled' : '') + '>' + icon('hoch', 20) + '</button>' +
      '<button type="button" class="mini" data-action="task-down" data-id="' + t.id + '" aria-label="Nach unten"' + (i === n - 1 ? ' disabled' : '') + '>' + icon('runter', 20) + '</button>' +
      '<button type="button" class="mini del" data-action="task-del" data-id="' + t.id + '" aria-label="Aufgabe löschen">' + icon('muell', 20) + '</button></div>' +
      timerEd(t) + picker + '</div>';
  }
  function timerEd(t) {
    var on = hasSteps(t), snd = t.sound !== false;
    var h = '<div class="t-line sub timer-line">' +
      '<button type="button" class="sw' + (on ? ' on' : '') + '" data-action="steps-toggle" data-id="' + t.id + '" aria-pressed="' + on + '"><span class="tr"><i></i></span><span>Mit Timer-Schritten</span></button>';
    if (on) h += '<button type="button" class="sw' + (snd ? ' on' : '') + '" data-action="sound-toggle" data-id="' + t.id + '" aria-pressed="' + snd + '"><span class="tr"><i></i></span><span>Ton beim Wechsel</span></button>' +
      '<span class="cnt">Gesamt ' + fmtSec(totalSec(t)) + ' Min</span>';
    h += '</div>';
    if (!on) return h;
    h += '<div class="steps-ed">' + t.steps.map(function (s, k) {
      return '<div class="step-ed"><span class="num">' + (k + 1) + '</span>' +
        '<input class="inp name" data-field="step-name" data-id="' + t.id + '" data-s="' + s.id + '" value="' + esc(s.name) + '" aria-label="Name von Schritt ' + (k + 1) + '">' +
        '<input class="inp dur" data-field="step-sec" data-id="' + t.id + '" data-s="' + s.id + '" value="' + fmtSec(s.sec) + '" inputmode="numeric" aria-label="Dauer von Schritt ' + (k + 1) + ' (Minuten:Sekunden)">' +
        '<button type="button" class="mini del" data-action="step-del" data-id="' + t.id + '" data-s="' + s.id + '" aria-label="Schritt löschen"' + (t.steps.length === 1 ? ' disabled' : '') + '>' + icon('muell', 20) + '</button></div>';
    }).join('') +
      '<button type="button" class="add-btn small" data-action="step-add" data-id="' + t.id + '">' + icon('plus', 18) + '<span>Schritt hinzufügen</span></button></div>';
    return h;
  }
  function taskListEd(tasks, ownerAttr) {
    var rows = tasks.map(function (t, i) { return taskRowEd(t, i, tasks.length); }).join('');
    return '<div class="t-list">' + (rows || '<p class="empty">Noch keine Aufgaben.</p>') + '</div>' +
      '<button type="button" class="add-btn" data-action="task-add" ' + ownerAttr + '>' + icon('plus', 18) + '<span>Aufgabe hinzufügen</span></button>';
  }

  function renderEdit() {
    ensureDay();
    var r = routine(ui.editId);
    app.className = 'app t-' + r.id;
    var side = '<div class="side"><div class="card"><span class="cap">Routinen</span>' + config.routines.map(function (x) {
      var sp = x.type === 'timeline' ? span(x) : null;
      var sub = x.type === 'timeline' ? (sp ? fmt(toMin(x.blocks.slice().sort(function (a, b) { return toMin(a.start) - toMin(b.start); })[0].start)) + ' – ' + fmt(Math.max.apply(null, x.blocks.map(function (b) { return toMin(b.end); }))) : 'keine Blöcke') : 'Checkliste ohne Uhrzeit';
      return '<button type="button" class="r-btn t-' + x.id + (x.id === r.id ? ' on' : '') + '" data-action="sel-routine" data-id="' + x.id + '" aria-pressed="' + (x.id === r.id) + '">' +
        '<span class="ic">' + icon(x.icon, 22) + '</span><span><b>' + esc(x.name) + '</b><small>' + sub + '</small></span></button>';
    }).join('') + '</div>';
    var l = day.later.abend || 0;
    side += '<div class="card later"><b>Heute später ins Bett</b><p>Bad und Bettzeit rücken nur für heute nach hinten.' + (l ? ' Aktuell: +' + l + ' Min.' : '') + '</p>' +
      '<div class="row"><button type="button" class="chip-btn' + (l === 15 ? ' on' : '') + '" data-action="later" data-min="15">+15 Min</button>' +
      '<button type="button" class="chip-btn' + (l === 30 ? ' on' : '') + '" data-action="later" data-min="30">+30 Min</button>' +
      (l ? '<button type="button" class="chip-btn" data-action="later" data-min="0" aria-label="Zurücksetzen">' + icon('zurueck', 20) + '</button>' : '') + '</div></div>';
    side += '<div class="card" style="padding:8px 14px">' +
      '<button type="button" class="s-btn" data-action="pin-change"><span class="ic">' + icon('schloss', 20) + '</span><span>PIN ändern</span></button>' +
      '<button type="button" class="s-btn" data-action="export"><span class="ic">' + icon('sichern', 20) + '</span><span>Sichern (Datei speichern)</span></button>' +
      '<label class="s-btn" style="cursor:pointer"><span class="ic">' + icon('laden', 20) + '</span><span>Laden (Datei öffnen)</span><input type="file" accept="application/json,.json" data-field="import" class="vh"></label>' +
      '<button type="button" class="s-btn danger" data-action="reset-all"><span class="ic" style="color:inherit">' + icon('zurueck', 20) + '</span><span>Auf Startwerte zurücksetzen</span></button>' +
      '</div></div>';

    var main = '<div class="card main-ed"><div class="head"><span class="ic">' + icon(r.icon, 24) + '</span><h2>' + esc(r.name) + '</h2>';
    if (r.type === 'timeline') {
      var sp = span(r);
      main += '<span class="meta">' + esc(r.goal === 'Los' ? 'Haus verlassen' : 'Im Bett') + ' um ' + (sp ? fmt(Math.max.apply(null, r.blocks.map(function (b) { return toMin(b.end); }))) : '–') + ' · Ende des letzten Blocks</span>' +
        '<button type="button" class="soft-btn" data-action="block-add">' + icon('plus', 18) + '<span>Block</span></button></div>';
      main += r.blocks.map(function (b, i) {
        var open = ui.openBlock === b.id;
        var bad = toMin(b.end) <= toMin(b.start) ? '<span class="bad">Ende vor Start</span>' : '';
        var h = '<div class="blk-ed' + (open ? ' open' : '') + '"><div class="blk-h">' +
          '<button type="button" class="tog" data-action="block-toggle" data-id="' + b.id + '" aria-expanded="' + open + '" aria-label="Aufgaben ' + (open ? 'zuklappen' : 'aufklappen') + '">' + icon(open ? 'chevdown' : 'chev', 20) + '</button>' +
          '<input class="inp name" data-field="block-name" data-id="' + b.id + '" value="' + esc(b.name) + '" aria-label="Name des Blocks">' +
          '<span class="cnt">' + b.tasks.length + (b.tasks.length === 1 ? ' Aufgabe' : ' Aufgaben') + '</span>' + bad +
          '<input class="inp time" type="time" data-field="block-start" data-id="' + b.id + '" value="' + esc(hhmm(toMin(b.start))) + '" aria-label="Beginn">' +
          '<input class="inp time" type="time" data-field="block-end" data-id="' + b.id + '" value="' + esc(hhmm(toMin(b.end))) + '" aria-label="Ende">' +
          '<button type="button" class="mini" data-action="block-up" data-id="' + b.id + '" aria-label="Block nach oben"' + (i === 0 ? ' disabled' : '') + '>' + icon('hoch', 20) + '</button>' +
          '<button type="button" class="mini" data-action="block-down" data-id="' + b.id + '" aria-label="Block nach unten"' + (i === r.blocks.length - 1 ? ' disabled' : '') + '>' + icon('runter', 20) + '</button>' +
          '<button type="button" class="mini del" data-action="block-del" data-id="' + b.id + '" aria-label="Block löschen">' + icon('muell', 20) + '</button></div>';
        if (open) h += taskListEd(b.tasks, 'data-block="' + b.id + '"');
        return h + '</div>';
      }).join('');
      if (!r.blocks.length) main += '<p class="empty">Noch keine Blöcke.</p>';
    } else {
      main += '<span class="meta">ohne Uhrzeit</span></div>' + taskListEd(r.tasks, 'data-routine="' + r.id + '"');
    }
    main += '</div>';
    app.innerHTML = '<div class="ed-top"><h1>Routinen bearbeiten</h1><button type="button" class="btn-dark" data-action="edit-done">Fertig</button></div>' +
      '<div class="ed">' + side + main + '</div>';
  }

  function sortBlocks() {
    config.routines.forEach(function (r) { if (r.blocks) r.blocks.sort(function (a, b) { return toMin(a.start) - toMin(b.start); }); });
  }

  function exportConfig() {
    var data = JSON.stringify(config, null, 2);
    var blob = new Blob([data], { type: 'application/json' });
    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'leanders-routine-' + dateKey(now()) + '.json';
    document.body.appendChild(a); a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); a.remove(); }, 1000);
  }
  function importConfig(file) {
    var fr = new FileReader();
    fr.onload = function () {
      try {
        var c = JSON.parse(fr.result);
        if (!validConfig(c)) throw new Error('Format');
        if (!window.confirm('Die geladene Datei ersetzt alle aktuellen Routinen. Fortfahren?')) return;
        c.pin = c.pin || config.pin;
        config = c; saveConfig(); ui.openBlock = null; ui.picker = null; render();
      } catch (e) { window.alert('Die Datei konnte nicht geladen werden. Ist es eine Sicherung dieser App?'); }
    };
    fr.readAsText(file);
  }

  /* ---------- Ereignisse ---------- */
  app.addEventListener('click', function (ev) {
    var el = ev.target.closest('[data-action]');
    if (!el || !app.contains(el) || el.disabled) return;
    var a = el.getAttribute('data-action'), id = el.getAttribute('data-id');
    var f, r;
    switch (a) {
      case 'pick': {
        var d = now(), auto = autoRoutine(d);
        ui.manual = id === auto ? null : { id: id, auto: auto };
        renderMain(); break;
      }
      case 'toggle': toggleTask(id); break;
      case 'timer-open': openTimer(id); break;
      case 'timer-start': startTimer(); break;
      case 'timer-pause': ui.brush.left = brushLeft(); ui.brush.phase = 'pause'; render(); break;
      case 'timer-resume': ui.brush.stepEnd = Date.now() + ui.brush.left; ui.brush.phase = 'run'; render(); break;
      case 'timer-close': ui.view = 'main'; ui.brush = null; render(); break;
      case 'timer-sound': {
        f = findTask(ui.brush.id);
        if (f) { f.t.sound = f.t.sound === false; saveConfig(); if (f.t.sound) { audioInit(); chime('step'); } }
        render(); break;
      }
      case 'timer-check': {
        var tid = ui.brush.id;
        ui.view = 'main'; ui.brush = null;
        ensureDay();
        if (!day.done[tid]) toggleTask(tid); else render();
        break;
      }
      case 'steps-toggle': {
        f = findTask(id); if (!f) break;
        if (hasSteps(f.t)) { f.t.savedSteps = f.t.steps; f.t.steps = []; }
        else {
          f.t.steps = (f.t.savedSteps && f.t.savedSteps.length) ? f.t.savedSteps
            : (/z(ä|ae)hne/i.test(f.t.name) ? brushSteps() : [{ id: uid('s'), name: 'Schritt 1', sec: 30 }]);
          if (f.t.sound === undefined) f.t.sound = true;
        }
        saveConfig(); render(); break;
      }
      case 'step-add': {
        f = findTask(id); if (!f) break;
        f.t.steps.push({ id: uid('s'), name: 'Schritt ' + (f.t.steps.length + 1), sec: 30 });
        saveConfig(); render(); break;
      }
      case 'step-del': {
        f = findTask(id); if (!f) break;
        var sid = el.getAttribute('data-s');
        f.t.steps = f.t.steps.filter(function (x) { return x.id !== sid; });
        saveConfig(); render(); break;
      }
      case 'sound-toggle': f = findTask(id); if (f) { f.t.sound = f.t.sound === false; saveConfig(); render(); } break;
      case 'edit': openPin(config.pin ? 'enter' : 'set1', 'main'); break;
      case 'digit': pinDigit(el.getAttribute('data-d')); break;
      case 'pin-del': ui.pinBuf = ui.pinBuf.slice(0, -1); ui.pinErr = ''; render(); break;
      case 'pin-cancel': ui.view = ui.pinBack === 'edit' && config.pin ? 'edit' : 'main'; render(); break;
      case 'pin-change': openPin('set1', 'edit'); break;
      case 'edit-done': sortBlocks(); saveConfig(); ui.view = 'main'; ui.picker = null; render(); break;
      case 'sel-routine': ui.editId = id; ui.openBlock = null; ui.picker = null; render(); break;
      case 'later': day.later.abend = parseInt(el.getAttribute('data-min'), 10) || 0; saveDay(); render(); break;
      case 'export': exportConfig(); break;
      case 'reset-all':
        if (window.confirm('Alle Routinen auf die Startwerte zurücksetzen? Eure Änderungen gehen verloren, die PIN bleibt.')) {
          var pin = config.pin; config = defaultConfig(); config.pin = pin; saveConfig(); ui.openBlock = null; render();
        }
        break;
      case 'block-toggle': ui.openBlock = ui.openBlock === id ? null : id; ui.picker = null; render(); break;
      case 'block-add': {
        r = routine(ui.editId);
        var last = r.blocks.length ? Math.max.apply(null, r.blocks.map(function (b) { return toMin(b.end); })) : 7 * 60;
        var nb = { id: uid('b'), name: 'Neuer Block', start: hhmm(last), end: hhmm(last + 10), tasks: [] };
        r.blocks.push(nb); ui.openBlock = nb.id; saveConfig(); render(); break;
      }
      case 'block-del':
        f = findBlock(id);
        if (f && window.confirm('Block „' + f.b.name + '“ mit allen Aufgaben löschen?')) { f.list.splice(f.idx, 1); saveConfig(); render(); }
        break;
      case 'block-up': f = findBlock(id); if (f) { move(f.list, f.idx, -1); saveConfig(); render(); } break;
      case 'block-down': f = findBlock(id); if (f) { move(f.list, f.idx, 1); saveConfig(); render(); } break;
      case 'task-add': {
        var nt = T('', 'stern');
        var bid = el.getAttribute('data-block');
        if (bid) { f = findBlock(bid); if (f) f.b.tasks.push(nt); }
        else { r = routine(el.getAttribute('data-routine')); if (r) r.tasks.push(nt); }
        saveConfig(); render();
        var inp = app.querySelector('input[data-field="task-name"][data-id="' + nt.id + '"]');
        if (inp) inp.focus();
        break;
      }
      case 'task-del':
        f = findTask(id);
        if (f && window.confirm('Aufgabe „' + (f.t.name || 'ohne Namen') + '“ löschen?')) { f.list.splice(f.idx, 1); delete day.done[id]; saveDay(); saveConfig(); render(); }
        break;
      case 'task-up': f = findTask(id); if (f) { move(f.list, f.idx, -1); saveConfig(); render(); } break;
      case 'task-down': f = findTask(id); if (f) { move(f.list, f.idx, 1); saveConfig(); render(); } break;
      case 'day': {
        f = findTask(id); if (!f) break;
        var dn = parseInt(el.getAttribute('data-d'), 10), p = f.t.days.indexOf(dn);
        if (p >= 0) f.t.days.splice(p, 1); else { f.t.days.push(dn); f.t.days.sort(); }
        saveConfig(); render(); break;
      }
      case 'opt': f = findTask(id); if (f) { f.t.optional = !f.t.optional; saveConfig(); render(); } break;
      case 'icon-open': ui.picker = ui.picker === id ? null : id; render(); break;
      case 'icon-pick': f = findTask(id); if (f) { f.t.icon = el.getAttribute('data-icon'); ui.picker = null; saveConfig(); render(); } break;
    }
  });

  app.addEventListener('input', function (ev) {
    var el = ev.target, field = el.getAttribute('data-field'), id = el.getAttribute('data-id'), f;
    if (field === 'task-name') { f = findTask(id); if (f) { f.t.name = el.value; saveConfig(); } }
    else if (field === 'task-hint') { f = findTask(id); if (f) { f.t.hint = el.value; saveConfig(); } }
    else if (field === 'block-name') { f = findBlock(id); if (f) { f.b.name = el.value; saveConfig(); } }
    else if (field === 'step-name') {
      f = findTask(id);
      if (f) { f.t.steps.forEach(function (x) { if (x.id === el.getAttribute('data-s')) x.name = el.value; }); saveConfig(); }
    }
  });
  app.addEventListener('change', function (ev) {
    var el = ev.target, field = el.getAttribute('data-field'), id = el.getAttribute('data-id'), f;
    if ((field === 'block-start' || field === 'block-end') && el.value) {
      f = findBlock(id);
      if (f) { f.b[field === 'block-start' ? 'start' : 'end'] = el.value; saveConfig(); render(); }
    } else if (field === 'step-sec') {
      f = findTask(id);
      var v = parseSec(el.value);
      if (f && v !== null) {
        v = Math.max(5, Math.min(600, v));
        f.t.steps.forEach(function (x) { if (x.id === el.getAttribute('data-s')) x.sec = v; });
        saveConfig();
      }
      render();
    } else if (field === 'import' && el.files && el.files[0]) {
      importConfig(el.files[0]); el.value = '';
    }
  });

  function render() {
    if (ui.view === 'edit') return renderEdit();
    if (ui.view === 'pin') return renderPin();
    if (ui.view === 'brush') return renderBrush();
    return renderMain();
  }

  /* Bildschirm während einer laufenden Routine wach halten */
  var wake = null, wantWake = false;
  function updateWakeLock(want) {
    wantWake = !!want;
    try {
      if (wantWake && !wake && navigator.wakeLock && document.visibilityState === 'visible') {
        navigator.wakeLock.request('screen').then(function (w) {
          wake = w; w.addEventListener('release', function () { wake = null; });
        }).catch(function () { /* nicht erlaubt */ });
      } else if (!wantWake && wake) { wake.release(); wake = null; }
    } catch (e) { /* nicht unterstützt */ }
  }
  document.addEventListener('visibilitychange', function () {
    if (document.visibilityState === 'visible') { if (ui.view === 'main') renderMain(); }
  });

  /* Takt: jede Sekunde prüfen, nur bei Änderungen neu zeichnen */
  setInterval(function () {
    if (ui.view === 'brush') {
      tickTimer();
      if (brushSig() !== ui.sig) renderBrush();
      return;
    }
    if (ui.view !== 'main') return;
    var d = now();
    if (!day || day.date !== dateKey(d) || mainSig(d) !== ui.sig) renderMain();
  }, 250);

  render();

  if ('serviceWorker' in navigator && location.protocol === 'https:') {
    try { navigator.serviceWorker.register('sw.js').catch(function () {}); } catch (e) { /* ignore */ }
  }
})();
