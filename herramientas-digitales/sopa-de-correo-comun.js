/* Sopa de Correo · partes compartidas (estudiante y pantalla)
   Juego creado por: Jarlin Figueroa M.A. */
'use strict';
const SOPA = (() => {
  const WORDS = ['ADJUNTO','ARCHIVO','ARROBA','ASUNTO','CARPETA','CODIGO','COMPARTIR','CONTRASEÑA','CORREO','DOMINIO',
    'DRIVE','ENLACE','FIRMA','GMAIL','NUBE','OUTLOOK','PAPELERA','PHISHING','USUARIO','VERIFICACION'];
  const N = 15, DUR = 20 * 60 * 1000, CUENTA = 4000;
  const DIRS = [[0,1],[0,-1],[1,0],[-1,0],[1,1],[-1,-1],[1,-1],[-1,1]];

  /* ---------- generador determinista: misma ronda = misma sopa para todos ---------- */
  const hash = s => { let h = 2166136261; for (const ch of s) { h ^= ch.codePointAt(0); h = Math.imul(h, 16777619); } return h >>> 0; };
  const rng = seed => { let a = seed >>> 0; return () => { a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; };
  const contar = (G, w) => { let n = 0; for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) for (const d of DIRS) {
    let k = 0; for (; k < w.length; k++) { const rr = r + d[0] * k, cc = c + d[1] * k; if (rr < 0 || rr >= N || cc < 0 || cc >= N || G[rr][cc] !== w[k]) break; }
    if (k === w.length) n++; } return n; };
  function intento(R) {
    const ri = n => Math.floor(R() * n);
    const mezclar = a => { for (let i = a.length - 1; i > 0; i--) { const j = ri(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
    const G = Array.from({ length: N }, () => Array(N).fill(''));
    const cabe = (w, r, c, d, soloVacias) => { for (let k = 0; k < w.length; k++) { const rr = r + d[0] * k, cc = c + d[1] * k;
      if (rr < 0 || rr >= N || cc < 0 || cc >= N) return false; const x = G[rr][cc]; if (soloVacias ? x : (x && x !== w[k])) return false; } return true; };
    const poner = (w, r, c, d) => { const cells = []; for (let k = 0; k < w.length; k++) { const rr = r + d[0] * k, cc = c + d[1] * k; G[rr][cc] = w[k]; cells.push([rr, cc]); } return cells; };
    // direcciones repartidas: cada una de las 8 aparece 2 o 3 veces (muchas diagonales y al revés)
    const dl = mezclar([...Array(24)].map((_, i) => i % 8));
    const orden = WORDS.map((_, i) => i).sort((a, b) => WORDS[b].length - WORDS[a].length);
    const place = [];
    for (let o = 0; o < orden.length; o++) {
      const wi = orden[o], w = WORDS[wi]; let ok = null;
      const probar = d => { for (let t = 0; t < 250 && !ok; t++) { const r = ri(N), c = ri(N); if (cabe(w, r, c, d)) ok = poner(w, r, c, d); } };
      probar(DIRS[dl[o]]);
      if (!ok) for (const k of mezclar([0,1,2,3,4,5,6,7])) { probar(DIRS[k]); if (ok) break; }
      if (!ok) return null;
      place[wi] = { w, cells: ok };
    }
    // señuelos: pedazos de palabras (sin la última letra) para despistar
    const pool = WORDS.join('');
    mezclar(WORDS.slice()).slice(0, 12).forEach(w => {
      const f = w.slice(0, Math.max(3, w.length - 1 - ri(2))); const d = DIRS[ri(8)];
      for (let t = 0; t < 80; t++) { const r = ri(N), c = ri(N); if (cabe(f, r, c, d, true)) { poner(f, r, c, d); break; } }
    });
    const libres = []; for (let r = 0; r < N; r++) for (let c = 0; c < N; c++) if (!G[r][c]) libres.push([r, c]);
    for (let v = 0; v < 60; v++) {
      libres.forEach(([r, c]) => { G[r][c] = pool[ri(pool.length)]; });
      if (WORDS.every(w => contar(G, w) === 1)) return { G, place };
    }
    return null;
  }
  const cache = {};
  function generar(semilla) {
    if (cache[semilla]) return cache[semilla];
    for (let i = 0; i < 300; i++) { const g = intento(rng(hash(semilla + '#' + i))); if (g) return (cache[semilla] = g); }
    throw new Error('No se pudo generar la sopa');
  }
  const igual = (a, b) => a.length === b.length && a.every((p, i) => p[0] === b[i][0] && p[1] === b[i][1]);
  const buscar = (g, cells) => g.place.findIndex(p => igual(p.cells, cells) || igual(p.cells, cells.slice().reverse()));

  /* ---------- ranking: 1 punto por palabra; empate = gana quien llegó primero a ese puntaje ---------- */
  function ranking(J, P) {
    const m = {};
    Object.entries(J || {}).forEach(([id, j]) => { if (j && j.n) m[id] = { id, n: j.n, c: j.c || 0, p: 0, t: 0, ws: [] }; });
    Object.entries(P || {}).forEach(([k, x]) => { if (x && m[x.id]) { const o = m[x.id]; o.p++; o.t = Math.max(o.t, x.t || 0); o.ws.push(+k.slice(1)); } });
    return Object.values(m).sort((a, b) => b.p - a.p || (a.p ? a.t - b.t : 0) || a.c - b.c);
  }
  const COLS = ['#1E6FE0','#2BB34A','#E5484D','#7B5CE0','#F08C00','#0FA3B1','#D6336C','#5C7CFA','#37B24D','#AE3EC9','#E8590C','#1098AD'];
  const color = id => COLS[hash(id || '') % COLS.length];
  const reloj = ms => { ms = Math.max(0, ms || 0); const s = Math.ceil(ms / 1000); return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`; };
  const tFin = P => { const v = Object.values(P || {}); return v.length >= WORDS.length ? Math.max(...v.map(x => x.t || 0)) : null; };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- sonido (Web Audio, sin archivos) ---------- */
  let AC = null, OUTN = null;
  const A = { muted: false, music: true, onState: null };
  const ac = () => { if (!AC) { try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) {} } if (AC && AC.state === 'suspended') AC.resume().catch(() => {}); return AC; };
  const OUT = a => { if (!OUTN) { const m = a.createGain(), c = a.createDynamicsCompressor(); m.gain.value = 2.4; c.threshold.value = -10; c.ratio.value = 4; m.connect(c).connect(a.destination); OUTN = m; } return OUTN; };
  try { if (navigator.audioSession) navigator.audioSession.type = 'playback'; } catch (e) {}
  const unlock = () => { const a = ac(); if (!a) return; if (!a.__u) { try { const b = a.createBuffer(1, 1, 22050), s = a.createBufferSource(); s.buffer = b; s.connect(a.destination); s.start(0); a.__u = 1; } catch (e) {} }
    if (a.state !== 'running') a.resume().catch(() => {}); setTimeout(() => A.onState && A.onState(), 150); };
  ['pointerdown', 'touchend', 'click', 'keydown'].forEach(t => document.addEventListener(t, unlock, true));
  const corriendo = () => !!(AC && AC.state === 'running');
  const toneAt = (f, t, d, type = 'sine', v = .15, f2, music) => { const a = AC; if (!a || A.muted || (music && !A.music)) return;
    const o = a.createOscillator(), g = a.createGain(); o.type = type; o.frequency.setValueAtTime(f, t); if (f2) o.frequency.exponentialRampToValueAtTime(f2, t + d);
    g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(v, t + .01); g.gain.exponentialRampToValueAtTime(.001, t + d); o.connect(g).connect(OUT(a)); o.start(t); o.stop(t + d + .05); };
  const noiseAt = (t, d, f0, f1, v = .2, q = 1.2, type = 'bandpass', music) => { const a = AC; if (!a || A.muted || (music && !A.music)) return;
    const n = Math.max(1, Math.floor(a.sampleRate * d)), b = a.createBuffer(1, n, a.sampleRate), ch = b.getChannelData(0);
    for (let i = 0; i < n; i++) ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2);
    const s = a.createBufferSource(), fl = a.createBiquadFilter(), g = a.createGain(); s.buffer = b; fl.type = type; fl.Q.value = q;
    fl.frequency.setValueAtTime(f0, t); if (f1 !== f0) fl.frequency.exponentialRampToValueAtTime(f1, t + d); g.gain.value = v; s.connect(fl).connect(g).connect(OUT(a)); s.start(t); };
  const tone = (f, d, type, v, t0 = 0, f2) => { const a = ac(); if (a) toneAt(f, a.currentTime + t0, d, type, v, f2); };
  const noise = (d, f0, f1, v, q, t0 = 0, type) => { const a = ac(); if (a) noiseAt(a.currentTime + t0, d, f0, f1, v, q, type); };
  let lastSel = 0;
  const S = {
    sel: k => { const n = performance.now(); if (n - lastSel < 25) return; lastSel = n; tone(420 + Math.min(k, 14) * 55, .06, 'triangle', .08); },
    tap: () => { tone(880, .05, 'triangle', .07); tone(1320, .05, 'sine', .04, .03); },
    win: () => { [659, 784, 1047, 1319, 1568].forEach((f, i) => tone(f, .22, 'triangle', .13, i * .06)); noise(.5, 5000, 9000, .1, 1, .25, 'highpass'); tone(2093, .5, 'sine', .05, .35); },
    no: () => { tone(220, .16, 'sawtooth', .07, 0, 150); tone(150, .22, 'square', .05, .1); },
    late: () => { tone(700, .14, 'square', .07, 0, 520); tone(520, .16, 'square', .07, .14, 390); tone(390, .3, 'square', .06, .3, 260); },
    ding: () => { tone(1175, .2, 'sine', .1); tone(1568, .3, 'sine', .06, .08); },
    join: () => { tone(660, .08, 'triangle', .08); tone(990, .12, 'triangle', .08, .08); },
    count: () => { tone(660, .18, 'square', .09); },
    go: () => { [523, 659, 784, 1047].forEach((f, i) => tone(f, .2, 'square', .09, i * .07)); tone(1047, .6, 'triangle', .1, .3); noise(.6, 400, 4000, .2, 1.2, 0); },
    tick: () => { tone(1500, .04, 'square', .06); },
    end: () => { [880, 698, 587, 440].forEach((f, i) => tone(f, .35, 'square', .08, i * .16)); tone(220, 1.2, 'triangle', .14, .6); noise(1.2, 300, 120, .25, .8, .6); },
    fan: () => { [392, 523, 659, 784, 659, 784, 1047].forEach((f, i) => tone(f, .26, 'triangle', .14, i * .11)); [262, 392, 523].forEach(f => tone(f, 1.4, 'sine', .06, .8)); noise(1.2, 3000, 9000, .1, 1, .8, 'highpass'); }
  };

  /* ---------- música del juego (chiptune en bucle) ---------- */
  const mf = m => 440 * Math.pow(2, (m - 69) / 12);
  const CH = [[48, 55, 60, 64], [45, 52, 57, 60], [41, 48, 53, 57], [43, 50, 55, 59]];
  const MEL = [[72,0,76,0,79,0,76,0,77,0,76,0,74,0,72,0],[69,0,72,0,76,0,72,0,74,0,72,0,71,0,69,0],
               [65,0,69,0,72,0,77,0,76,0,72,0,69,0,72,0],[67,0,71,0,74,0,79,0,77,0,74,0,71,0,74,0]];
  const MUS = { timer: null, next: 0, step: 0, fast: false };
  function sched() {
    const a = AC; if (!a) return; const spb = 60 / (MUS.fast ? 158 : 128) / 4;
    while (MUS.next < a.currentTime + .15) {
      const s = MUS.step, t = MUS.next, bar = Math.floor(s / 16) % 4, i = s % 16, ch = CH[bar];
      if (i % 2 === 0) toneAt(mf(ch[0] - 12), t, spb * 1.7, 'triangle', .16, null, true);
      if (i % 4 === 0) toneAt(140, t, .16, 'sine', .22, 45, true);
      if (i % 8 === 4) noiseAt(t, .12, 1800, 1800, .22, .8, 'bandpass', true);
      if (i % 2 === 1) noiseAt(t, .03, 8000, 8000, .07, 1, 'highpass', true);
      toneAt(mf(ch[[0, 1, 2, 3, 2, 1, 2, 3][i % 8]] + 12), t, spb * .9, 'square', .025, null, true);
      const m = MEL[bar][i]; if (m && s >= 32) toneAt(mf(m), t, spb * 1.8, 'square', .045, null, true);
      MUS.next += spb; MUS.step = (MUS.step + 1) % 128;
    }
  }
  const musica = {
    start() { const a = ac(); if (!a || MUS.timer) return; MUS.next = a.currentTime + .1; MUS.step = 0; MUS.timer = setInterval(sched, 30); },
    stop() { clearInterval(MUS.timer); MUS.timer = null; },
    rapida(v) { MUS.fast = !!v; },
    get on() { return !!MUS.timer; }
  };

  /* ---------- confeti ---------- */
  let fx, fc, parts = [], anim = false;
  function confeti(n = 160) {
    if (!fx) { fx = document.createElement('canvas'); fx.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:90'; document.body.appendChild(fx); fc = fx.getContext('2d');
      const fit = () => { fx.width = innerWidth; fx.height = innerHeight; }; fit(); addEventListener('resize', fit); }
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    for (let i = 0; i < n; i++) parts.push({ x: Math.random() * innerWidth, y: -20 - Math.random() * 300, vx: (Math.random() - .5) * 3, vy: 2 + Math.random() * 3, l: 260,
      c: ['#1E6FE0', '#4FB3F6', '#2BB34A', '#F5B700', '#E5484D', '#7B5CE0'][i % 6], s: 7 + Math.random() * 7, r: Math.random() * 6 });
    if (!anim) { anim = true; requestAnimationFrame(loop); }
  }
  function loop() { fc.clearRect(0, 0, fx.width, fx.height); parts = parts.filter(p => p.l > 0 && p.y < fx.height + 30);
    parts.forEach(p => { p.x += p.vx; p.y += p.vy; p.vy += .03; p.l--; p.r += .15; fc.save(); fc.translate(p.x, p.y); fc.rotate(p.r); fc.fillStyle = p.c; fc.fillRect(-p.s / 2, -p.s / 4, p.s, p.s / 2); fc.restore(); });
    if (parts.length) requestAnimationFrame(loop); else { anim = false; fc.clearRect(0, 0, fx.width, fx.height); } }

  /* ---------- tablero (letras + líneas en SVG) ---------- */
  function tablero(el) {
    el.innerHTML = `<svg class="ln" viewBox="0 0 ${N} ${N}" aria-hidden="true"><g class="fd"></g><g class="tmp"></g></svg><div class="cells"></div>`;
    return {
      pintarLetras(g) { el.querySelector('.cells').innerHTML = g.G.map(row => row.map(ch => `<span>${ch}</span>`).join('')).join(''); },
      linea(cells, color, extra = '') { const a = cells[0], b = cells[cells.length - 1];
        return `<line x1="${a[1] + .5}" y1="${a[0] + .5}" x2="${b[1] + .5}" y2="${b[0] + .5}" stroke="${color}" ${extra}/>`; },
      fd: el.querySelector('.fd'), tmp: el.querySelector('.tmp'),
      celda(e) { const r = el.getBoundingClientRect(); const c = Math.floor((e.clientX - r.left) / r.width * N), f = Math.floor((e.clientY - r.top) / r.height * N);
        return { r: Math.max(0, Math.min(N - 1, f)), c: Math.max(0, Math.min(N - 1, c)) }; }
    };
  }
  function ajustar(a, p) { // lleva la selección a una de las 8 direcciones, dentro del tablero
    const dr = p.r - a.r, dc = p.c - a.c; if (!dr && !dc) return { r: a.r, c: a.c };
    const oct = Math.round(Math.atan2(dr, dc) / (Math.PI / 4)), ang = oct * Math.PI / 4;
    const d = [Math.round(Math.sin(ang)), Math.round(Math.cos(ang))];
    let len = Math.max(Math.abs(dr), Math.abs(dc));
    while (len > 0) { const r = a.r + d[0] * len, c = a.c + d[1] * len; if (r >= 0 && r < N && c >= 0 && c < N) return { r, c }; len--; }
    return { r: a.r, c: a.c };
  }
  function trazo(a, b) { const dr = Math.sign(b.r - a.r), dc = Math.sign(b.c - a.c), len = Math.max(Math.abs(b.r - a.r), Math.abs(b.c - a.c));
    return Array.from({ length: len + 1 }, (_, k) => [a.r + dr * k, a.c + dc * k]); }

  /* ---------- Firebase (mismo proyecto de los otros juegos) ---------- */
  function firebaseListo() {
    const cfg = { apiKey: "AIzaSyCLrT88lr0by0elfhI6bwdbgFN3u3ORCDI", authDomain: "excel-avanzado-icadep.firebaseapp.com", databaseURL: "https://excel-avanzado-icadep-default-rtdb.firebaseio.com",
      projectId: "excel-avanzado-icadep", storageBucket: "excel-avanzado-icadep.firebasestorage.app", messagingSenderId: "391674719896", appId: "1:391674719896:web:738cc75c1d9720dd7caaed" };
    const APP = ["https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js", "https://cdnjs.cloudflare.com/ajax/libs/firebase/10.13.2/firebase-app-compat.min.js"];
    const DB = ["https://www.gstatic.com/firebasejs/10.13.2/firebase-database-compat.js", "https://cdnjs.cloudflare.com/ajax/libs/firebase/10.13.2/firebase-database-compat.min.js"];
    const load = src => new Promise((ok, ko) => { const s = document.createElement('script'); s.src = src; s.onload = ok; s.onerror = ko; document.head.appendChild(s); });
    const fb = urls => { let i = 0; const n = () => i >= urls.length ? Promise.reject() : load(urls[i++]).catch(n); return n(); };
    return fb(APP).then(() => fb(DB)).then(() => { firebase.initializeApp(cfg); return firebase.database(); });
  }

  return { tFin, WORDS, N, DUR, CUENTA, generar, buscar, ranking, color, reloj, esc, A, S, musica, confeti, tablero, ajustar, trazo, firebaseListo, corriendo, unlock, ac };
})();
