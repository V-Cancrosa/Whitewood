/* =========================================================
   WHITEWOOD — treść podstron
   Każdy blok uruchamia się tylko, gdy na stronie jest jego element.
   ========================================================= */
(() => {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const D = window.WW, L = WW.lore, creator = WW.mode === "tworca";
  const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ł/g, "l");
  const gmTag = '<span class="gm-tag">MG</span>';

  /* =========================================================
     HERO (strona główna)
     ========================================================= */
  $$("[data-split]").forEach(node => {
    const txt = node.textContent; node.textContent = ""; node.setAttribute("aria-hidden", "true");
    [...txt].forEach((c, i) => { const s = el("span", "ch", c); s.style.animationDelay = (0.35 + i * 0.07) + "s"; node.appendChild(s); });
  });

  const heroCanvas = $(".hero__particles");
  if (heroCanvas && !reduced) {
    const ctx = heroCanvas.getContext("2d");
    let w, h, parts = [], running = true;
    const spawn = any => ({ x: Math.random() * w, y: any ? Math.random() * h : -10, r: Math.random() * 1.8 + .4, vy: Math.random() * .35 + .12, vx: Math.random() * .3 - .05, ph: Math.random() * 6.28, a: Math.random() * .55 + .15, leaf: Math.random() < .18, rot: Math.random() * 6 });
    const resize = () => {
      const d = Math.min(devicePixelRatio || 1, 2); w = heroCanvas.clientWidth; h = heroCanvas.clientHeight;
      heroCanvas.width = w * d; heroCanvas.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0);
      parts = Array.from({ length: Math.round(Math.min(90, w * h / 16000)) }, () => spawn(true));
    };
    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.ph += .012; p.y += p.vy; p.x += p.vx + Math.sin(p.ph) * .35; p.rot += .01;
        if (p.y > h + 10 || p.x > w + 10) Object.assign(p, spawn(false));
        ctx.globalAlpha = p.a * (0.6 + 0.4 * Math.sin(p.ph * 2));
        if (p.leaf) { ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot); ctx.fillStyle = "#e5c88a"; ctx.beginPath(); ctx.ellipse(0, 0, p.r * 2.4, p.r, 0, 0, 6.29); ctx.fill(); ctx.restore(); }
        else { ctx.fillStyle = "#efe9dc"; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.29); ctx.fill(); }
      }
      requestAnimationFrame(tick);
    };
    resize(); addEventListener("resize", resize);
    new IntersectionObserver(([e]) => { const was = running; running = e.isIntersecting; if (running && !was) tick(); }).observe(heroCanvas);
    tick();
  }
  const heroMap = $(".hero__map"), heroContent = $(".hero__content");
  if (heroMap && !reduced) WW.onScroll = y => {
    if (y > innerHeight * 1.2) return;
    heroMap.style.translate = `0 ${y * 0.25}px`;
    heroContent.style.transform = `translateY(${y * 0.35}px)`;
    heroContent.style.opacity = Math.max(0, 1 - y / (innerHeight * .7));
  };

  /* =========================================================
     ATLAS (strona główna)
     ========================================================= */
  const atlas = $("#atlas");
  if (atlas) {
    const canvas = $("#atlasCanvas"), pinsBox = $("#atlasPins"), panel = $("#atlasPanel"), list = $("#atlasList"), reset = $("#atlasReset");
    let current = -1, PLACES = [];
    const zoomTo = (points) => {
      const xs = points.map(p => p[0]), ys = points.map(p => p[1]);
      const cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2;
      const span = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
      const s = Math.max(1.15, Math.min(innerWidth < 600 ? 1.9 : 2.2, 60 / Math.max(span, 1)));
      const tx = Math.min(0, Math.max(-(s - 1) * 100, 50 - cx * s)), ty = Math.min(0, Math.max(-(s - 1) * 100, 50 - cy * s));
      canvas.style.transform = `translate(${tx}%, ${ty}%) scale(${s})`;
      $$(".pin", pinsBox).forEach(p => p.style.transform = `scale(${1 / s})`);
      atlas.classList.add("is-zoomed"); reset.hidden = false;
    };
    const select = i => {
      const n = PLACES.length; i = (i + n) % n; current = i;
      const loc = PLACES[i];
      $$(".pin", pinsBox).forEach(p => p.classList.toggle("is-active", +p.dataset.i === i));
      $$("button", list).forEach((b, k) => b.setAttribute("aria-pressed", k === i));
      const lead = loc.sections.find(s => s.title.toLowerCase() === "opis" && !s.gm);
      const rest = loc.sections.filter(s => s !== lead);
      const badge = creator && loc.status !== "kanon" ? `<span class="place__status">${esc(loc.status)}</span>` : "";
      panel.innerHTML = `<article class="place">
        <p class="place__kind${loc.status !== "kanon" ? " place__kind--pending" : ""}">${esc(loc.kind)} ${badge}</p>
        <h3>${esc(loc.name)}</h3>
        <p class="place__native"><code>${esc(loc.native)}</code>${loc.nativeGloss ? " — " + esc(loc.nativeGloss) : ""}</p>
        ${lead ? `<div class="place__lead">${lead.html}</div>` : ""}
        ${rest.map(s => `<details class="place__sec${s.gm ? " place__sec--gm" : ""}"${s.gm && /na głos/i.test(s.title) ? " open" : ""}>
          <summary>${esc(s.title)}${s.gm ? gmTag : ""}</summary><div class="place__body">${s.html}</div></details>`).join("")}
        <a class="place__more" href="miejsce.html?id=${encodeURIComponent(loc.id)}">Pełna strona miejsca →</a>
        <div class="place__nav"><button data-d="-1">← Poprzednie</button><button data-d="1">Następne →</button></div>
      </article>`;
      $$(".place__nav button", panel).forEach(b => b.addEventListener("click", () => select(current + +b.dataset.d)));
      panel.scrollTop = 0;
      if (loc.points.length) zoomTo(loc.points);
    };
    reset.addEventListener("click", () => {
      canvas.style.transform = ""; $$(".pin", pinsBox).forEach(p => p.style.transform = "");
      atlas.classList.remove("is-zoomed"); reset.hidden = true;
    });
    document.addEventListener("keydown", e => {
      if (current < 0 || !["ArrowLeft", "ArrowRight"].includes(e.key) || /input|textarea/i.test(document.activeElement.tagName)) return;
      const r = atlas.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
      e.preventDefault(); select(current + (e.key === "ArrowRight" ? 1 : -1));
    });
    L.places().then(places => {
      PLACES = places;
      places.forEach((loc, i) => {
        loc.points.forEach(([x, y]) => {
          const b = el("button", "pin" + (loc.status !== "kanon" ? " pin--pending" : ""));
          b.dataset.i = i; b.style.left = x + "%"; b.style.top = y + "%"; b.setAttribute("aria-label", loc.name);
          b.appendChild(el("span", "pin__label", esc(loc.name))); b.addEventListener("click", () => select(i));
          pinsBox.appendChild(b);
        });
        const li = el("li"), lb = el("button", null, esc(loc.name));
        lb.setAttribute("aria-pressed", "false"); lb.addEventListener("click", () => select(i));
        li.appendChild(lb); list.appendChild(li);
      });
      const want = new URLSearchParams(location.search).get("miejsce");
      if (want) { const i = places.findIndex(p => p.id === want); if (i >= 0) select(i); }
    }).catch(e => WW.loreError(panel, e));
  }

  /* =========================================================
     DOKUMENTY Z lore/ (osada, powódź, …)
     data-doc="nazwa"  data-layout="cards" | "article"
     ========================================================= */
  $$("[data-doc]").forEach(box => {
    L.doc(box.dataset.doc).then(doc => {
      const layout = box.dataset.layout || "article";
      const scope = box.closest("section") || document;
      const title = $("[data-doc-title]", scope); if (title && doc.name) title.textContent = doc.name;
      const lead = doc.sections[0];
      const leadBox = $("[data-doc-lead]", scope);
      let secs = doc.sections;
      if (leadBox && lead && !lead.gm) { leadBox.innerHTML = lead.html; secs = doc.sections.slice(1); }
      if (layout === "cards") {
        box.innerHTML = secs.map(s => `<article class="settle__card${s.gm ? " settle__card--gm" : ""}" id="${s.id}">
          <h3>${esc(s.title)}${s.gm ? " " + gmTag : ""}</h3><div class="settle__body">${s.html}</div></article>`).join("");
      } else {
        box.innerHTML = (doc.intro ? `<div class="doc__intro">${doc.intro}</div>` : "") + secs.map(s => `<section class="doc__sec${s.gm ? " doc__sec--gm" : ""}" id="${s.id}">
          <h2>${esc(s.title)}${s.gm ? " " + gmTag : ""}</h2><div class="doc__body">${s.html}</div></section>`).join("");
        const toc = $("[data-doc-toc]");
        if (toc) toc.innerHTML = secs.map(s => `<a href="#${s.id}"${s.gm ? ' class="is-gm"' : ""}>${esc(s.title)}</a>`).join("");
      }
      box.classList.add("reveal-stagger"); WW.reveal(box.parentNode);
    }).catch(e => WW.loreError(box, e));
  });

  /* =========================================================
     KRONIKA
     ========================================================= */
  const tl = $("#timeline");
  if (tl) {
    const fill = el("li", "timeline__fill"); fill.setAttribute("aria-hidden", "true"); tl.appendChild(fill);
    D.timeline.forEach((t, i) => {
      const li = el("li", "tl reveal" + (i % 2 ? " tl--r" : " tl--l") + (t.flood ? " tl--flood" : ""));
      li.innerHTML = `<span class="tl__dot" aria-hidden="true"></span><p class="tl__era">${esc(t.era)}</p><h3>${esc(t.title)}</h3><p>${esc(t.text)}</p>${t.flood ? '<p class="tl__more"><a href="powodz.html">Pełna strona o Powodzi →</a></p>' : ""}`;
      tl.appendChild(li);
    });
    const prev = WW.onScroll;
    WW.onScroll = y => {
      prev?.(y);
      const r = tl.getBoundingClientRect();
      fill.style.height = Math.min(1, Math.max(0, (innerHeight * .6 - r.top) / r.height)) * 100 + "%";
    };
    WW.reveal(tl); WW.refreshScroll();
  }

  /* =========================================================
     POWÓDŹ — fale
     ========================================================= */
  const water = $(".flood__water");
  if (water) {
    const ctx = water.getContext("2d"); let w, h, t = 0, run = false;
    const resize = () => { const d = Math.min(devicePixelRatio || 1, 2); w = water.clientWidth; h = water.clientHeight; water.width = w * d; water.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0); };
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (let k = 0; k < 14; k++) {
        const base = h * (0.1 + k * 0.065), amp = 6 + k * 1.6, f = 0.004 + k * 0.0003, sp = 0.6 + k * 0.08;
        ctx.beginPath();
        for (let x = 0; x <= w; x += 8) {
          const y = base + Math.sin(x * f + t * sp * .02 + k) * amp + Math.sin(x * f * 2.3 - t * .013 + k * 2) * amp * .4;
          x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        ctx.strokeStyle = `rgba(140,195,205,${0.05 + k * 0.012})`; ctx.lineWidth = 1; ctx.stroke();
      }
      t++; if (run && !reduced) requestAnimationFrame(draw);
    };
    resize(); addEventListener("resize", resize);
    new IntersectionObserver(([e]) => { const was = run; run = e.isIntersecting; if (run && !was) draw(); }).observe(water);
    draw();
  }

  /* =========================================================
     KRĄG
     ========================================================= */
  const ctext = $("#circlesText");
  if (ctext) {
    const show = id => {
      const c = D.circles.find(x => x.id === id);
      $$(".ring").forEach(r => r.classList.toggle("is-active", r.dataset.ring === id));
      ctext.innerHTML = `<div class="circle-card"><code>${esc(c.name)}</code><h3>${esc(c.pl)}</h3><p>${esc(c.text)}</p></div>
        <div class="circle-tabs" role="tablist">${D.circles.map(x => `<button role="tab" aria-selected="${x.id === id}" data-c="${x.id}">${esc(x.name)}</button>`).join("")}</div>`;
      $$(".circle-tabs button", ctext).forEach(b => b.addEventListener("click", () => show(b.dataset.c)));
    };
    $$(".ring").forEach(r => { r.addEventListener("click", () => show(r.dataset.ring)); r.addEventListener("mouseenter", () => show(r.dataset.ring)); });
    show("sekor");
  }
  if ($("#codex")) $("#codex").innerHTML = D.codex.map(l =>
    `<article class="law${l.n === "V" ? " law--hard" : ""}"><span class="law__n">${l.n}</span><h4>${esc(l.title)}</h4><p>${esc(l.text)}</p></article>`).join("");

  /* =========================================================
     LUDY
     ========================================================= */
  const peopleBox = $("#people");
  if (peopleBox) {
    const render = fam => {
      peopleBox.innerHTML = D.peoples.filter(p => fam === "all" || p.fam === fam).map((p, i) => {
        const circ = D.families[p.fam].circle;
        return `<article class="folk" style="animation-delay:${i * 40}ms">
          <span class="folk__circle folk__circle--${circ}">${circ}</span>
          <p class="folk__group">${esc(D.families[p.fam].label)} · ${esc(p.group)}</p>
          <h3>${esc(p.races)}</h3><p class="folk__role">${esc(p.role)}</p><p>${esc(p.text)}</p>
          <span class="folk__monogram" aria-hidden="true">${esc(p.group[0])}</span></article>`;
      }).join("");
    };
    $$("#peopleTabs button").forEach(b => {
      const fam = b.dataset.fam;
      b.insertAdjacentHTML("beforeend", `<sup>${fam === "all" ? D.peoples.length : D.peoples.filter(p => p.fam === fam).length}</sup>`);
      b.addEventListener("click", () => { $$("#peopleTabs button").forEach(x => x.setAttribute("aria-selected", x === b)); render(fam); });
    });
    render("all");
  }

  /* =========================================================
     BESTIARIUSZ
     ========================================================= */
  if ($("#beasts")) {
    $("#beasts").innerHTML = D.bestiary.map(b => {
      const cls = b.danger ? " beast--danger" : b.rite ? " beast--rite" : b.mystery ? " beast--mystery" : "";
      return `<article class="beast${cls}"${b.mystery ? ' tabindex="0"' : ""}><p class="beast__tier">${esc(b.tier)}</p><h3>${esc(b.name)}</h3><p>${esc(b.text)}</p>
        ${b.mystery ? '<p class="beast__hint">Najedź lub dotknij, by spojrzeć w głębinę.</p>' : ""}</article>`;
    }).join("");
    $$(".beast--mystery").forEach(b => b.addEventListener("click", () => b.classList.add("is-revealed")));
  }

  /* =========================================================
     JĘZYK — ruchomy „!”
     ========================================================= */
  const emph = $("#emph");
  if (emph) {
    const line = $("#emphLine"), gloss = $("#emphGloss"), dots = $("#emphDots");
    let idx = 0, timer;
    const show = i => {
      idx = i; emph.classList.add("is-fading");
      setTimeout(() => {
        line.innerHTML = D.emphasis[i].html; gloss.textContent = D.emphasis[i].gloss;
        $$("button", dots).forEach((b, k) => b.setAttribute("aria-selected", k === i));
        emph.classList.remove("is-fading");
      }, reduced ? 0 : 300);
    };
    D.emphasis.forEach((_, i) => {
      const b = el("button", null, String(i + 1)); b.setAttribute("role", "tab");
      b.addEventListener("click", () => { show(i); clearInterval(timer); }); dots.appendChild(b);
    });
    show(0);
    if (!reduced) timer = setInterval(() => show((idx + 1) % D.emphasis.length), 4200);
  }

  /* ---------- JĘZYK — zapis imienia ---------- */
  const LAB = { m: "n", p: "t", b: "d", f: "h", w: "ł" };
  const birdify = word => {
    let out = "", marked = "";
    for (const ch of word) { const r = LAB[ch]; out += r || ch; marked += r ? `<mark>${r}</mark>` : esc(ch); }
    const m = out.match(/^[^aeiouyąęäöüóé]+/);
    if (m && m[0].length > 2 && word[0] in LAB) marked = marked.replace(/^(<mark>.<\/mark>)/, "$1<mark>y</mark>");
    return marked;
  };
  const nameIn = $("#nameInput");
  if (nameIn) {
    const out = $("#nameOut");
    const render = () => {
      const raw = nameIn.value.trim().toLowerCase();
      if (!raw) { out.innerHTML = `<dt>—</dt><dd>wpisz imię</dd>`; return; }
      const words = raw.split(/\s+/);
      out.innerHTML = `<dt>Kuropatwa</dt><dd>${words.map(w => "!" + esc(w) + "!").join(" ")}</dd>
        <dt>Prawdziwe</dt><dd>${words.map(w => "!!" + esc(w) + "!!").join(" ")}</dd>
        <dt>Wymowa ptasia</dt><dd>${words.map(birdify).join(" ")}</dd>`;
    };
    nameIn.addEventListener("input", render); render();
  }

  /* ---------- JĘZYK — słownik i tłumacz (wspólne dane) ---------- */
  const dictTable = $("#dictTable"), trBox = $("#translator");
  if (dictTable || trBox) L.dict().then(rows => { if (dictTable) initDict(rows); if (trBox) initTranslator(rows); })
    .catch(e => WW.loreError(dictTable || trBox, e));

  function initDict(DICT) {
    const search = $("#dictSearch"), cats = $("#dictCats"), count = $("#dictCount");
    let cat = "wszystko";
    const list = ["wszystko", ...new Set(DICT.map(r => r.cat).filter(Boolean))];
    if (DICT.some(r => r.status !== "kanon")) list.push("propozycje");
    list.forEach(k => {
      const b = el("button", k === "propozycje" ? "chip--prop" : null, esc(k[0].toUpperCase() + k.slice(1)));
      b.setAttribute("aria-pressed", k === cat);
      b.addEventListener("click", () => { cat = k; $$("button", cats).forEach(x => x.setAttribute("aria-pressed", x === b)); render(); });
      cats.appendChild(b);
    });
    const render = () => {
      const q = norm(search.value.trim());
      const rows = DICT.filter(r => (cat === "wszystko" || r.cat === cat || (cat === "propozycje" && r.status !== "kanon")) && (!q || norm(`${r.word} ${r.meaning} ${r.ety}`).includes(q)));
      dictTable.innerHTML = rows.length
        ? rows.map(r => `<div class="word${r.status !== "kanon" ? " word--prop" : ""}" role="listitem"><b>${esc(r.word)}</b><span>${esc(r.meaning)}</span>${r.ety ? `<i>${esc(r.ety)}</i>` : ""}${r.status !== "kanon" ? `<em class="word__status">${esc(r.status)}</em>` : ""}</div>`).join("")
        : `<p class="dict__empty">Brak takiego słowa — może jeszcze nie zostało wymówione.</p>`;
      const props = DICT.filter(r => r.status !== "kanon").length;
      count.textContent = `${rows.length} z ${DICT.length} słów${props ? ` · ${props} propozycji` : ""}`;
    };
    search.addEventListener("input", render); render();
  }

  /* ---------- JĘZYK — słowa z gwar ---------- */
  const gwBox = $("#gwaryTable");
  if (gwBox) L.gwary().then(rows => {
    gwBox.innerHTML = rows.length ? rows.map(r => `<div class="word word--gw${r.status !== "kanon" ? " word--prop" : ""}" role="listitem">
        <b class="gw">${esc(r.word)}</b><span>${esc(r.meaning)}</span><i>gwara: ${esc(r.dialect)}${creator && r.insp ? ` · ${esc(r.insp)}` : ""}</i>
        ${r.status !== "kanon" ? `<em class="word__status">${esc(r.status)}</em>` : ""}</div>`).join("")
      : `<p class="dict__empty">Na razie żadnych.</p>`;
  }).catch(e => WW.loreError(gwBox, e));

  /* =========================================================
     TŁUMACZ BIRDFOLK ⇄ POLSKI
     Słowo po słowie: rozbiór morfemów (birdfolk → polski)
     i podpowiedzi ze słownika (polski → birdfolk).
     ========================================================= */
  const MORPH = {
    pre: { "ne": "nie", "si": "pytanie", "drug": "dziki" },
    suf: {
      "ka": "dokonane", "si": "trwające", "ło": "przeszłe", "ha": "przyszłe",
      "at": "wykonawca", "ol": "miejsce", "ur": "narzędzie", "an": "przyrodnicze", "on": "wysokie / latające", "el": "dworskie / czułe",
      "ko": "małe", "ga": "wielkie", "ir": "liczba mnoga (rzeczy)", "or": "liczba mnoga (osoby)", "in": "czyje", "te": "przez / czym", "su": "dla / ku",
      "en": "porządkowe", "az": "osada", "i": "wewnętrzne", "a": "rzecz od czynności"
    }
  };
  const SUFS = Object.keys(MORPH.suf).sort((a, b) => b.length - a.length);

  function initTranslator(rows) {
    const bf = new Map(), pl = new Map();
    rows.forEach(r => {
      const k = r.word.toLowerCase();
      if (!bf.has(k)) bf.set(k, r);
      r.meaning.toLowerCase().replace(/\([^)]*\)|[„”"']/g, " ").split(/\s*(?:\/|,|;| — | – )\s*/).map(s => s.trim()).filter(Boolean)
        .forEach(m => { if (!pl.has(m)) pl.set(m, []); pl.get(m).push(r); });
    });
    const plKeys = [...pl.keys()];
    const input = $("#trInput"), out = $("#trOut"), dirBtns = $$("#trDir button");
    let dir = "bf";

    const short = r => r.meaning.split(/\s*(?:\/|;| — )\s*/)[0].replace(/\s*\([^)]*\)/g, "");

    // rozbiór jednego słowa birdfolk
    function analyse(word) {
      const w = word.toLowerCase();
      if (bf.has(w)) return { parts: [{ m: w, g: short(bf.get(w)), root: true }], ok: true };
      const pieces = w.split("-").filter(Boolean);
      if (pieces.length > 1 && pieces.every(p => bf.has(p) || p in MORPH.pre || p in MORPH.suf)) {
        let rootSeen = false;
        return { ok: true, parts: pieces.map((p, i) => {
          if (!rootSeen && i === 0 && p in MORPH.pre && !bf.has(p)) return { m: p + "-", g: MORPH.pre[p] };
          if (!rootSeen && bf.has(p)) { rootSeen = true; return { m: p, g: short(bf.get(p)), root: true }; }
          if (rootSeen && p in MORPH.suf) return { m: "-" + p, g: MORPH.suf[p] };
          return bf.has(p) ? { m: p, g: short(bf.get(p)), root: true } : { m: p, g: MORPH.suf[p] || MORPH.pre[p] };
        }) };
      }
      // zlepek bez myślników: przedrostek + rdzeń + przyrostki
      const flat = w.replace(/-/g, "");
      for (const pre of ["", "ne", "drug"]) {
        if (pre && !flat.startsWith(pre)) continue;
        const res = strip(flat.slice(pre.length), 0);
        if (res) return { ok: true, parts: [...(pre ? [{ m: pre + "-", g: MORPH.pre[pre] }] : []), ...res] };
      }
      return { ok: false, parts: [{ m: w, g: "?" }] };
    }
    function strip(s, depth) {
      if (bf.has(s) && s.length >= 2) return [{ m: s, g: short(bf.get(s)), root: true }];
      if (depth > 4) return null;
      for (const suf of SUFS) {
        if (s.length - suf.length < 2 || !s.endsWith(suf)) continue;
        if (suf.length === 1 && depth > 0) continue;
        const r = strip(s.slice(0, -suf.length), depth + 1);
        if (r) return [...r, { m: "-" + suf, g: MORPH.suf[suf] }];
      }
      return null;
    }

    function tokens(text) { return text.match(/\?*!{0,2}[\p{L}\p{N}ä-]+!{0,2}|[.,:;?!]/gu) || []; }

    function toPolish(text) {
      const toks = tokens(text), res = [];
      for (let i = 0; i < toks.length; i++) {
        const t = toks[i];
        if (/^[.,:;?!]$/.test(t)) { res.push({ punct: t }); continue; }
        // wyrażenia wielowyrazowe (np. „gali galsen”)
        let hit = null;
        for (let n = 3; n >= 2 && !hit; n--) {
          const phrase = toks.slice(i, i + n).join(" ").toLowerCase();
          if (bf.has(phrase)) { hit = { src: phrase, parts: [{ m: phrase, g: short(bf.get(phrase)), root: true }], ok: true }; i += n - 1; }
        }
        if (hit) { res.push(hit); continue; }
        const q = t.match(/^\?+/); let core = t.replace(/^\?+/, "");
        const name2 = core.match(/^!!(.+)!!$/), name1 = core.match(/^!([^!]+)!$/), emph = core.match(/^!([^!]+)$/);
        if (name2) { res.push({ src: t, ok: true, name: "imię prawdziwe", parts: [{ m: core, g: name2[1] }], q: !!q }); continue; }
        if (name1) { res.push({ src: t, ok: true, name: "imię", parts: [{ m: core, g: name1[1] }], q: !!q }); continue; }
        if (emph) core = emph[1];
        const a = analyse(core);
        res.push({ src: t, ...a, emph: !!emph, q: !!q });
      }
      return res;
    }

    function toBirdfolk(text) {
      const words = text.toLowerCase().match(/[\p{L}]+|[.,:;?!]/gu) || [], res = [];
      for (let i = 0; i < words.length; i++) {
        const t = words[i];
        if (/^[.,:;?!]$/.test(t)) { res.push({ punct: t }); continue; }
        let hit = null;
        for (let n = 3; n >= 2 && !hit; n--) {
          const ph = words.slice(i, i + n).join(" ");
          if (pl.has(ph)) { hit = { src: ph, ok: true, cands: pl.get(ph) }; i += n - 1; }
        }
        if (hit) { res.push(hit); continue; }
        if (pl.has(t)) { res.push({ src: t, ok: true, cands: pl.get(t) }); continue; }
        // prosty rdzeń polski: obcinamy końcówki i szukamy hasła o tym samym początku
        let found = null;
        for (let cut = 0; cut <= 4 && !found; cut++) {
          const stem = t.slice(0, t.length - cut); if (stem.length < 3) break;
          const key = plKeys.filter(k => k.split(" ").length === 1 && k.startsWith(stem) && k.length - stem.length <= 4).sort((a, b) => a.length - b.length)[0];
          if (key) found = { src: t, ok: true, guess: key, cands: pl.get(key) };
        }
        res.push(found || { src: t, ok: false });
      }
      return res;
    }

    function render() {
      const text = input.value.trim();
      if (!text) { out.innerHTML = ""; return; }
      if (dir === "bf") {
        const res = toPolish(text);
        const line = res.map(r => r.punct ? r.punct : (r.q ? "czy " : "") + (r.emph ? "<b>" : "") + (r.name ? `<span class="tr__name">${esc(r.parts[0].g)}</span>` : r.parts.filter(p => p.root).map(p => esc(p.g)).join(" ") || `<span class="tr__unk">${esc(r.src)}</span>`) + (r.emph ? "</b>" : "")).join(" ").replace(/ ([.,:;?!])/g, "$1");
        out.innerHTML = `<p class="tr__line">${line}</p>
          <div class="tr__words">${res.filter(r => !r.punct).map(r => `<div class="tr__word${r.ok ? "" : " is-unknown"}">
            <b>${esc(r.src)}</b>${r.name ? `<span class="tr__tag">${esc(r.name)}</span>` : ""}${r.emph ? '<span class="tr__tag">istotne</span>' : ""}${r.q ? '<span class="tr__tag">pytanie</span>' : ""}
            <div class="tr__morphs">${r.parts.map(p => `<span class="tr__m${p.root ? " is-root" : ""}"><code>${esc(p.m)}</code><i>${esc(p.g)}</i></span>`).join("")}</div>
          </div>`).join("")}</div>`;
      } else {
        const res = toBirdfolk(text);
        const line = res.map(r => r.punct ? r.punct : r.ok ? esc(r.cands[0].word) : `<span class="tr__unk">?${esc(r.src)}?</span>`).join(" ").replace(/ ([.,:;?!])/g, "$1");
        out.innerHTML = `<p class="tr__line tr__line--bf">${line}</p>
          <div class="tr__words">${res.filter(r => !r.punct).map(r => `<div class="tr__word${r.ok ? "" : " is-unknown"}">
            <b>${esc(r.src)}</b>${r.guess ? `<span class="tr__tag">≈ ${esc(r.guess)}</span>` : ""}
            <div class="tr__morphs">${r.ok ? r.cands.slice(0, 4).map(c => `<span class="tr__m is-root"><code>${esc(c.word)}</code><i>${esc(c.meaning)}</i></span>`).join("") : '<span class="tr__m"><i>brak w słowniku — może trzeba je stworzyć</i></span>'}</div>
          </div>`).join("")}</div>`;
      }
    }
    dirBtns.forEach(b => b.addEventListener("click", () => {
      dir = b.dataset.dir; dirBtns.forEach(x => x.setAttribute("aria-pressed", x === b));
      input.placeholder = dir === "bf" ? "np. na ne-kir-ło" : "np. dzień dobry, przyjacielu";
      $$("#trExamples button").forEach(x => x.hidden = x.dataset.dir !== dir);
      render();
    }));
    $$("#trExamples button").forEach(b => b.addEventListener("click", () => { input.value = b.textContent; render(); }));
    input.addEventListener("input", render); render();
  }

  /* =========================================================
     POSTACIE
     ========================================================= */
  if ($("#ethos")) $("#ethos").innerHTML = D.ethos.map(e => `<li>${esc(e)}</li>`).join("");
  if ($("#cast")) $("#cast").innerHTML = D.characters.map(c => `
    <article class="hero-card">${c.pending ? '<span class="hero-card__pending">szkic</span>' : ""}
      <div class="hero-card__sigil" aria-hidden="true">${esc(c.initial)}</div>
      <p class="hero-card__race">${esc(c.race)}</p><h3>${esc(c.name)}</h3>
      <p class="hero-card__role">${esc(c.role)}</p><p class="hero-card__text">${esc(c.text)}</p>
      <p class="hero-card__quote">${esc(c.quote)}</p></article>`).join("");

  /* =========================================================
     STRONA MIEJSCA  (miejsce.html?id=…)
     ========================================================= */
  const placeBox = $("#placePage");
  if (placeBox) {
    const id = new URLSearchParams(location.search).get("id");
    L.places().then(places => {
      const i = Math.max(0, places.findIndex(p => p.id === id)), loc = places[i];
      const prev = places[(i - 1 + places.length) % places.length], next = places[(i + 1) % places.length];
      document.title = `${loc.name} — Whitewood`;
      const [x, y] = loc.points[0] || [50, 50], s = 3;
      const bx = Math.min(100, Math.max(0, (x * s - 50) / (s - 1))), by = Math.min(100, Math.max(0, (y * s - 50) / (s - 1)));
      const lead = loc.sections.find(sec => sec.title.toLowerCase() === "opis" && !sec.gm);
      const pub = loc.sections.filter(sec => sec !== lead && !sec.gm), gm = loc.sections.filter(sec => sec.gm);
      placeBox.innerHTML = `
        <header class="ppage__head">
          <div class="ppage__map" style="background-position:${bx}% ${by}%" aria-hidden="true"><span class="ppage__pin"></span></div>
          <div class="ppage__title wrap">
            <a class="ppage__back" href="index.html?miejsce=${encodeURIComponent(loc.id)}#atlas">← Atlas</a>
            <p class="eyebrow">${esc(loc.kind)}${creator && loc.status !== "kanon" ? ` · <span class="place__status">${esc(loc.status)}</span>` : ""}</p>
            <h1>${esc(loc.name)}</h1>
            <p class="ppage__native"><code>${esc(loc.native)}</code>${loc.nativeGloss ? " — " + esc(loc.nativeGloss) : ""}</p>
          </div>
        </header>
        <div class="wrap ppage__body">
          <div class="ppage__main">
            ${lead ? `<div class="ppage__lead">${lead.html}</div>` : ""}
            ${pub.map(sec => `<section class="doc__sec"><h2>${esc(sec.title)}</h2><div class="doc__body">${sec.html}</div></section>`).join("")}
            ${loc.tags.length ? `<ul class="place__tags">${loc.tags.map(t => `<li>${esc(t)}</li>`).join("")}</ul>` : ""}
          </div>
          ${gm.length ? `<aside class="ppage__gm"><p class="ppage__gm-head">Notatki prowadzącego ${gmTag}</p>
            ${gm.map(sec => `<section class="doc__sec doc__sec--gm"><h3>${esc(sec.title)}</h3><div class="doc__body">${sec.html}</div></section>`).join("")}</aside>` : ""}
        </div>
        <nav class="wrap ppage__nav">
          <a href="miejsce.html?id=${encodeURIComponent(prev.id)}">← ${esc(prev.name)}</a>
          <a href="miejsce.html?id=${encodeURIComponent(next.id)}">${esc(next.name)} →</a>
        </nav>`;
      // pinezka: pozycja punktu w kadrze powiększonej mapy
      const pin = $(".ppage__pin", placeBox), map = $(".ppage__map", placeBox);
      const place = () => {
        const W = map.clientWidth, H = map.clientHeight, iw = W * s, ih = iw * 1024 / 1536;
        const ox = (W - iw) * bx / 100, oy = (H - ih) * by / 100;
        pin.style.left = (ox + iw * x / 100) + "px"; pin.style.top = (oy + ih * y / 100) + "px";
      };
      map.style.backgroundSize = `${s * 100}% auto`; place(); addEventListener("resize", place);
    }).catch(e => WW.loreError(placeBox, e));
  }

  /* =========================================================
     PRACOWNIA (tylko twórcy)
     ========================================================= */
  const shop = $("#workshop");
  if (shop) {
    if (!WW.creator) {
      shop.innerHTML = `<div class="ws__locked"><p>Pracownia jest dla twórców Whitewood.</p><button class="btn btn--gold" type="button">Wejdź hasłem</button></div>`;
      $("button", shop).addEventListener("click", () => $(".nav__key").click());
    } else if (WW.mode !== "tworca") {
      shop.innerHTML = `<div class="ws__locked"><p>Masz włączony widok gracza.</p><button class="btn btn--gold" type="button">Wróć do widoku twórcy</button></div>`;
      $("button", shop).addEventListener("click", WW.togglePlayerView);
    } else {
      Promise.all([L.doc("do-ustalenia"), L.doc("osada"), L.doc("powodz"), L.doc("vulpini"), L.doc("swieta"), L.places(), L.dict(), L.gwary()]).then(([todo, osada, powodz, vulpini, swieta, places, dict, gwary]) => {
        const docs = [osada, powodz, vulpini, swieta, ...places];
        const props = docs.flatMap(d => d.props.map(p => ({ ...p, href: d.file === "osada" ? "osada.html" : d.file === "powodz" ? "powodz.html" : d.file === "vulpini" ? "postacie.html" : d.file === "swieta" ? "ludy.html#swieta" : `miejsce.html?id=${d.id}` })));
        const words = dict.filter(r => r.status !== "kanon");
        const gwWords = gwary.filter(r => r.status !== "kanon");
        const gmCount = places.map(p => ({ p, n: p.sections.filter(s => s.gm).length }));
        const empty = places.filter(p => p.status === "do opisania");
        shop.innerHTML = `
          <div class="ws__stats">
            <div><b>${props.length}</b><span>propozycji czeka</span></div>
            <div><b>${words.length + gwWords.length}</b><span>słów-propozycji</span></div>
            <div><b>${empty.length}</b><span>miejsc do opisania</span></div>
            <div><b>${places.length}</b><span>miejsc na mapie</span></div>
          </div>
          <section class="ws__block"><h2>Propozycje do zatwierdzenia</h2>
            <p class="ws__hint">Zatwierdzasz, usuwając <code>[?]</code> w pliku. Odrzucasz, usuwając cały punkt.</p>
            ${Object.entries(props.reduce((a, p) => ((a[p.where.split(" → ")[0]] ||= []).push(p), a), {})).map(([file, ps]) => `
              <details class="ws__group" open><summary>${esc(file)} <span>${ps.length}</span></summary>
                <ol>${ps.map(p => `<li><a href="${p.href}">${esc(p.where.split(" → ")[1] || "")}</a> ${esc(p.text)}</li>`).join("")}</ol></details>`).join("") || "<p>Nic nie czeka.</p>"}
          </section>
          <section class="ws__block"><h2>Słowa-propozycje</h2>
            <h3>Birdfolk</h3>
            <div class="ws__words">${words.map(r => `<div class="word word--prop"><b>${esc(r.word)}</b><span>${esc(r.meaning)}</span>${r.ety ? `<i>${esc(r.ety)}</i>` : ""}</div>`).join("") || "<p>Brak.</p>"}</div>
            <h3>Gwary</h3>
            <div class="ws__words">${gwWords.map(r => `<div class="word word--prop"><b class="gw">${esc(r.word)}</b><span>${esc(r.meaning)}</span><i>gwara: ${esc(r.dialect)} · ${esc(r.insp)}</i></div>`).join("") || "<p>Brak.</p>"}</div>
          </section>
          <section class="ws__block"><h2>Miejsca</h2>
            <ul class="ws__places">${gmCount.map(({ p, n }) => `<li><a href="miejsce.html?id=${p.id}">${esc(p.name)}</a><span class="ws__st ws__st--${WW.slug(p.status)}">${esc(p.status)}</span><span>${n} notatek MG</span></li>`).join("")}</ul>
          </section>
          <section class="ws__block ws__todo"><h2>Do ustalenia</h2>
            ${todo.intro}${todo.sections.map(s => `<h3>${esc(s.title)}</h3>${s.html}`).join("")}
          </section>`;
      }).catch(e => WW.loreError(shop, e));
    }
  }
})();
