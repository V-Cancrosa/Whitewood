/* =========================================================
   WHITEWOOD — interakcje
   ========================================================= */
(() => {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const el = (tag, cls, html) => { const n = document.createElement(tag); if (cls) n.className = cls; if (html != null) n.innerHTML = html; return n; };
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const D = window.WW;

  /* ---------- hero: litery tytułu ---------- */
  $$("[data-split]").forEach(node => {
    const txt = node.textContent;
    node.textContent = "";
    node.setAttribute("aria-hidden", "true");
    [...txt].forEach((c, i) => {
      const s = el("span", "ch", c);
      s.style.animationDelay = (0.35 + i * 0.07) + "s";
      node.appendChild(s);
    });
  });

  /* ---------- hero: cząsteczki (nasiona brzozy) ---------- */
  (function particles() {
    const cv = $(".hero__particles");
    if (!cv || reduced) return;
    const ctx = cv.getContext("2d");
    let w, h, dpr, parts = [], running = true;
    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = cv.clientWidth; h = cv.clientHeight;
      cv.width = w * dpr; cv.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(90, w * h / 16000));
      parts = Array.from({ length: n }, () => spawn(true));
    };
    const spawn = (anywhere) => ({
      x: Math.random() * w, y: anywhere ? Math.random() * h : -10,
      r: Math.random() * 1.8 + .4, vy: Math.random() * .35 + .12, vx: Math.random() * .3 - .05,
      ph: Math.random() * Math.PI * 2, a: Math.random() * .55 + .15, leaf: Math.random() < .18, rot: Math.random() * 6
    });
    const tick = () => {
      if (!running) return;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.ph += .012; p.y += p.vy; p.x += p.vx + Math.sin(p.ph) * .35; p.rot += .01;
        if (p.y > h + 10 || p.x > w + 10) Object.assign(p, spawn(false), { x: Math.random() * w });
        ctx.globalAlpha = p.a * (0.6 + 0.4 * Math.sin(p.ph * 2));
        if (p.leaf) {
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
          ctx.fillStyle = "#e5c88a"; ctx.beginPath(); ctx.ellipse(0, 0, p.r * 2.4, p.r, 0, 0, Math.PI * 2); ctx.fill(); ctx.restore();
        } else {
          ctx.fillStyle = "#efe9dc"; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        }
      }
      requestAnimationFrame(tick);
    };
    resize(); addEventListener("resize", resize);
    new IntersectionObserver(([e]) => { const was = running; running = e.isIntersecting; if (running && !was) tick(); }).observe(cv);
    tick();
  })();

  /* ---------- hero: paralaksa ---------- */
  const heroMap = $(".hero__map"), heroContent = $(".hero__content");
  /* ---------- nav ---------- */
  const nav = $("#nav"), bar = $(".nav__progress i");
  const onScroll = () => {
    const y = scrollY, H = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle("is-solid", y > 60);
    bar.style.transform = `scaleX(${H > 0 ? y / H : 0})`;
    if (!reduced && y < innerHeight * 1.2) {
      heroMap.style.translate = `0 ${y * 0.25}px`;
      heroContent.style.transform = `translateY(${y * 0.35}px)`;
      heroContent.style.opacity = Math.max(0, 1 - y / (innerHeight * .7));
    }
    timelineFill();
  };
  addEventListener("scroll", onScroll, { passive: true });

  const toggle = $(".nav__toggle"), links = $("#navlinks");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", open); links.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  $$("a", links).forEach(a => a.addEventListener("click", () => {
    toggle.setAttribute("aria-expanded", "false"); links.classList.remove("is-open"); document.body.style.overflow = "";
  }));

  // aktywna sekcja
  const navMap = new Map($$("a", links).map(a => [a.getAttribute("href").slice(1), a]));
  const secObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { navMap.forEach(a => a.classList.remove("is-active")); navMap.get(e.target.id)?.classList.add("is-active"); }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  navMap.forEach((_, id) => { const s = document.getElementById(id); if (s) secObs.observe(s); });

  /* =========================================================
     ATLAS
     ========================================================= */
  const atlas = $("#atlas"), canvas = $("#atlasCanvas"), pinsBox = $("#atlasPins"),
        panel = $("#atlasPanel"), list = $("#atlasList"), reset = $("#atlasReset");
  let current = -1, PLACES = [];
  const STATUS = { "propozycja": "propozycja", "sprzeczność": "sprzeczność", "do opisania": "do opisania" };

  function initAtlas(places) {
    PLACES = places;
    places.forEach((loc, i) => {
      const pending = loc.status !== "kanon";
      loc.points.forEach(([x, y]) => {
        const b = el("button", "pin" + (pending ? " pin--pending" : ""));
        b.dataset.i = i;
        b.style.left = x + "%"; b.style.top = y + "%";
        b.setAttribute("aria-label", loc.name);
        b.appendChild(el("span", "pin__label", esc(loc.name)));
        b.addEventListener("click", () => select(i));
        pinsBox.appendChild(b);
      });
      const li = el("li"); const lb = el("button", null, esc(loc.name));
      lb.setAttribute("aria-pressed", "false"); lb.addEventListener("click", () => select(i));
      li.appendChild(lb); list.appendChild(li);
    });
  }

  function select(i, { zoom = true } = {}) {
    const n = PLACES.length; i = (i + n) % n; current = i;
    const loc = PLACES[i];
    $$(".pin", pinsBox).forEach(p => p.classList.toggle("is-active", +p.dataset.i === i));
    $$("button", list).forEach((b, k) => b.setAttribute("aria-pressed", k === i));

    const [first, ...rest] = loc.sections;
    const lead = first && first.title.toLowerCase() === "opis" && !first.gm ? first : null;
    const secs = lead ? rest : loc.sections;
    const badge = STATUS[loc.status] ? `<span class="place__status">${esc(STATUS[loc.status])}</span>` : "";

    panel.innerHTML = "";
    const art = el("article", "place");
    art.innerHTML = `
      <p class="place__kind${loc.status !== "kanon" ? " place__kind--pending" : ""}">${esc(loc.kind)} ${badge}</p>
      <h3>${esc(loc.name)}</h3>
      <p class="place__native"><code>${esc(loc.native)}</code>${loc.nativeGloss ? " — " + esc(loc.nativeGloss) : ""}</p>
      ${lead ? `<div class="place__lead">${lead.html}</div>` : ""}
      ${secs.map(s => `<details class="place__sec${s.gm ? " place__sec--gm" : ""}"${s.gm && /na głos/i.test(s.title) ? " open" : ""}>
          <summary>${esc(s.title)}${s.gm ? '<span class="gm-tag">MG</span>' : ""}</summary>
          <div class="place__body">${s.html}</div></details>`).join("")}
      <ul class="place__tags">${loc.tags.map(t => `<li>${esc(t)}</li>`).join("")}</ul>
      <div class="place__nav"><button data-d="-1">← Poprzednie</button><button data-d="1">Następne →</button></div>`;
    $$(".place__nav button", art).forEach(b => b.addEventListener("click", () => select(current + +b.dataset.d)));
    panel.appendChild(art);
    panel.scrollTop = 0;

    if (zoom && loc.points.length) {
      const xs = loc.points.map(p => p[0]), ys = loc.points.map(p => p[1]);
      const cx = (Math.min(...xs) + Math.max(...xs)) / 2, cy = (Math.min(...ys) + Math.max(...ys)) / 2;
      const span = Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys));
      const s = Math.max(1.15, Math.min(innerWidth < 600 ? 1.9 : 2.2, 60 / Math.max(span, 1)));
      const tx = Math.min(0, Math.max(-(s - 1) * 100, 50 - cx * s));
      const ty = Math.min(0, Math.max(-(s - 1) * 100, 50 - cy * s));
      canvas.style.transform = `translate(${tx}%, ${ty}%) scale(${s})`;
      $$(".pin", pinsBox).forEach(p => p.style.transform = `scale(${1 / s})`);
      atlas.classList.add("is-zoomed"); reset.hidden = false;
    }
  }
  reset.addEventListener("click", () => {
    canvas.style.transform = ""; $$(".pin", pinsBox).forEach(p => p.style.transform = "");
    atlas.classList.remove("is-zoomed"); reset.hidden = true;
  });
  document.addEventListener("keydown", e => {
    if (current < 0 || !["ArrowLeft", "ArrowRight"].includes(e.key)) return;
    if (/input|textarea/i.test(document.activeElement.tagName)) return;
    const r = atlas.getBoundingClientRect(); if (r.bottom < 0 || r.top > innerHeight) return;
    e.preventDefault(); select(current + (e.key === "ArrowRight" ? 1 : -1));
  });

  /* =========================================================
     KRONIKA
     ========================================================= */
  const tl = $("#timeline");
  const fill = el("li", "timeline__fill"); fill.setAttribute("aria-hidden", "true"); tl.appendChild(fill);
  D.timeline.forEach((t, i) => {
    const li = el("li", "tl reveal" + (i % 2 ? " tl--r" : " tl--l") + (t.flood ? " tl--flood" : ""));
    li.innerHTML = `<span class="tl__dot" aria-hidden="true"></span><p class="tl__era">${esc(t.era)}</p><h3>${esc(t.title)}</h3><p>${esc(t.text)}</p>`;
    tl.appendChild(li);
  });
  function timelineFill() {
    const r = tl.getBoundingClientRect();
    const p = Math.min(1, Math.max(0, (innerHeight * .6 - r.top) / r.height));
    fill.style.height = (p * 100) + "%";
  }

  /* =========================================================
     POWÓDŹ — fale
     ========================================================= */
  (function water() {
    const cv = $(".flood__water"); if (!cv) return;
    const ctx = cv.getContext("2d"); let w, h, t = 0, run = false;
    const resize = () => { const d = Math.min(devicePixelRatio || 1, 2); w = cv.clientWidth; h = cv.clientHeight; cv.width = w * d; cv.height = h * d; ctx.setTransform(d, 0, 0, d, 0, 0); };
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
    new IntersectionObserver(([e]) => { const was = run; run = e.isIntersecting; if (run && !was) draw(); }).observe(cv);
    draw();
  })();

  /* =========================================================
     KRĘGI
     ========================================================= */
  const ctext = $("#circlesText");
  function showCircle(id) {
    const c = D.circles.find(x => x.id === id);
    $$(".ring").forEach(r => r.classList.toggle("is-active", r.dataset.ring === id));
    ctext.innerHTML = `<div class="circle-card"><code>${esc(c.name)}</code><h3>${esc(c.pl)}</h3><p>${esc(c.text)}</p></div>
      <div class="circle-tabs" role="tablist">${D.circles.map(x => `<button role="tab" aria-selected="${x.id === id}" data-c="${x.id}">${esc(x.name)}</button>`).join("")}</div>`;
    $$(".circle-tabs button", ctext).forEach(b => b.addEventListener("click", () => showCircle(b.dataset.c)));
  }
  $$(".ring").forEach(r => { r.addEventListener("click", () => showCircle(r.dataset.ring)); r.addEventListener("mouseenter", () => showCircle(r.dataset.ring)); });
  showCircle("sekor");

  /* ---------- kodeks ---------- */
  $("#codex").innerHTML = D.codex.map(l =>
    `<article class="law${l.n === "V" ? " law--hard" : ""}"><span class="law__n">${l.n}</span><h4>${esc(l.title)}</h4><p>${esc(l.text)}</p></article>`).join("");

  /* =========================================================
     LUDY
     ========================================================= */
  const peopleBox = $("#people");
  function renderPeople(fam) {
    const items = D.peoples.filter(p => fam === "all" || p.fam === fam);
    peopleBox.innerHTML = items.map((p, i) => {
      const circ = D.families[p.fam].circle;
      return `<article class="folk" style="animation-delay:${i * 40}ms">
        <span class="folk__circle folk__circle--${circ}">${circ}</span>
        <p class="folk__group">${esc(D.families[p.fam].label)} · ${esc(p.group)}</p>
        <h3>${esc(p.races)}</h3>
        <p class="folk__role">${esc(p.role)}</p>
        <p>${esc(p.text)}</p>
        <span class="folk__monogram" aria-hidden="true">${esc(p.group[0])}</span>
      </article>`;
    }).join("");
  }
  $$("#peopleTabs button").forEach(b => {
    const fam = b.dataset.fam;
    const count = fam === "all" ? D.peoples.length : D.peoples.filter(p => p.fam === fam).length;
    b.insertAdjacentHTML("beforeend", `<sup>${count}</sup>`);
    b.addEventListener("click", () => {
      $$("#peopleTabs button").forEach(x => x.setAttribute("aria-selected", x === b));
      renderPeople(fam);
    });
  });
  renderPeople("all");

  /* =========================================================
     BESTIARIUSZ
     ========================================================= */
  $("#beasts").innerHTML = D.bestiary.map(b => {
    const cls = b.danger ? " beast--danger" : b.rite ? " beast--rite" : b.mystery ? " beast--mystery" : "";
    return `<article class="beast${cls}"${b.mystery ? ' tabindex="0"' : ""}>
      <p class="beast__tier">${esc(b.tier)}</p><h3>${esc(b.name)}</h3><p>${esc(b.text)}</p>
      ${b.mystery ? '<p class="beast__hint">Najedź lub dotknij, by spojrzeć w głębinę.</p>' : ""}</article>`;
  }).join("");
  $$(".beast--mystery").forEach(b => b.addEventListener("click", () => b.classList.add("is-revealed")));

  /* =========================================================
     JĘZYK — emfaza
     ========================================================= */
  const emph = $("#emph"), eLine = $("#emphLine"), eGloss = $("#emphGloss"), eDots = $("#emphDots");
  let eIdx = 0, eTimer;
  D.emphasis.forEach((_, i) => {
    const b = el("button", null, String(i + 1)); b.setAttribute("role", "tab");
    b.addEventListener("click", () => { showEmph(i); clearInterval(eTimer); });
    eDots.appendChild(b);
  });
  function showEmph(i) {
    eIdx = i; emph.classList.add("is-fading");
    setTimeout(() => {
      eLine.innerHTML = D.emphasis[i].html; eGloss.textContent = D.emphasis[i].gloss;
      $$("button", eDots).forEach((b, k) => b.setAttribute("aria-selected", k === i));
      emph.classList.remove("is-fading");
    }, reduced ? 0 : 300);
  }
  showEmph(0);
  if (!reduced) eTimer = setInterval(() => showEmph((eIdx + 1) % D.emphasis.length), 4200);

  /* ---------- JĘZYK — zapis imienia ---------- */
  const nameIn = $("#nameInput"), nameOut = $("#nameOut");
  const LAB = { m: "n", p: "t", b: "d", f: "h", w: "ł" };
  function birdify(word) {
    // wymiana głosek wargowych + epenteza „y” przy zbitkach >2 spółgłosek na początku
    let out = "", marked = "";
    for (const ch of word) {
      const r = LAB[ch];
      out += r || ch; marked += r ? `<mark>${r}</mark>` : esc(ch);
    }
    const m = out.match(/^[^aeiouyąęäöüóé]+/);
    if (m && m[0].length > 2 && word[0] in LAB) {
      out = out[0] + "y" + out.slice(1);
      marked = marked.replace(/^(<mark>.<\/mark>)/, "$1<mark>y</mark>");
    }
    return { out, marked };
  }
  function renderName() {
    const raw = nameIn.value.trim().toLowerCase();
    if (!raw) { nameOut.innerHTML = `<dt>—</dt><dd>wpisz imię</dd>`; return; }
    const words = raw.split(/\s+/);
    const bird = words.map(birdify);
    nameOut.innerHTML = `
      <dt>Kuropatwa</dt><dd>${words.map(w => "!" + esc(w) + "!").join(" ")}</dd>
      <dt>Prawdziwe</dt><dd>${words.map(w => "!!" + esc(w) + "!!").join(" ")}</dd>
      <dt>Wymowa ptasia</dt><dd>${bird.map(b => b.marked).join(" ")}</dd>`;
  }
  nameIn.addEventListener("input", renderName); renderName();

  /* ---------- JĘZYK — słownik ---------- */
  const dSearch = $("#dictSearch"), dTable = $("#dictTable"), dCats = $("#dictCats"), dCount = $("#dictCount");
  let dCat = "wszystko", DICT = [];
  const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ł/g, "l");
  function initDict(rows) {
    DICT = rows;
    const cats = ["wszystko", ...new Set(rows.map(r => r.cat).filter(Boolean))];
    if (rows.some(r => r.status !== "kanon")) cats.push("propozycje");
    cats.forEach(k => {
      const b = el("button", k === "propozycje" ? "chip--prop" : null, esc(k[0].toUpperCase() + k.slice(1)));
      b.setAttribute("aria-pressed", k === dCat);
      b.addEventListener("click", () => { dCat = k; $$("button", dCats).forEach(x => x.setAttribute("aria-pressed", x === b)); renderDict(); });
      dCats.appendChild(b);
    });
    dSearch.addEventListener("input", renderDict); renderDict();
  }
  function renderDict() {
    const q = norm(dSearch.value.trim());
    const rows = DICT.filter(r =>
      (dCat === "wszystko" || r.cat === dCat || (dCat === "propozycje" && r.status !== "kanon")) &&
      (!q || norm(`${r.word} ${r.meaning} ${r.ety}`).includes(q)));
    dTable.innerHTML = rows.length
      ? rows.map(r => `<div class="word${r.status !== "kanon" ? " word--prop" : ""}" role="listitem"><b>${esc(r.word)}</b><span>${esc(r.meaning)}</span>${r.ety ? `<i>${esc(r.ety)}</i>` : ""}${r.status !== "kanon" ? `<em class="word__status">${esc(r.status)}</em>` : ""}</div>`).join("")
      : `<p class="dict__empty">Brak takiego słowa — może jeszcze nie zostało wymówione.</p>`;
    const props = DICT.filter(r => r.status !== "kanon").length;
    dCount.textContent = `${rows.length} z ${DICT.length} słów${props ? ` · ${props} propozycji` : ""} · pełny słownik liczy ponad 300 rdzeni`;
  }

  /* ---------- LEOTHERN ---------- */
  $("#ethos").innerHTML = D.ethos.map(e => `<li>${esc(e)}</li>`).join("");

  /* ---------- POSTACIE ---------- */
  $("#cast").innerHTML = D.characters.map(c => `
    <article class="hero-card">
      ${c.pending ? '<span class="hero-card__pending">szkic</span>' : ""}
      <div class="hero-card__sigil" aria-hidden="true">${esc(c.initial)}</div>
      <p class="hero-card__race">${esc(c.race)}</p>
      <h3>${esc(c.name)}</h3>
      <p class="hero-card__role">${esc(c.role)}</p>
      <p class="hero-card__text">${esc(c.text)}</p>
      <p class="hero-card__quote">${esc(c.quote)}</p>
    </article>`).join("");

  /* =========================================================
     REVEAL ON SCROLL
     ========================================================= */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.08 });
  $$(".reveal, .reveal-stagger").forEach(n => io.observe(n));

  onScroll();

  /* =========================================================
     LORE Z PLIKÓW
     ========================================================= */
  WW.loadLore().then(({ mode, places, dict }) => {
    document.body.dataset.mode = mode;
    if (mode === "mg") {
      const tag = el("a", "mode-badge", "Tryb MG");
      tag.href = "?publiczny"; tag.title = "Notatki prowadzącego są widoczne. Kliknij, by zobaczyć wersję publiczną.";
      $("#nav").insertBefore(tag, $(".nav__toggle"));
    }
    initAtlas(places); initDict(dict);
  }).catch(err => {
    console.error(err);
    const msg = `<p class="lore-error">Nie udało się wczytać plików z <code>lore/</code>. Otwórz stronę przez serwer (np. <code>python3 -m http.server</code>), nie bezpośrednio z dysku.</p>`;
    $("#atlasPanel").innerHTML = msg; $("#dictTable").innerHTML = msg;
  });
})();
