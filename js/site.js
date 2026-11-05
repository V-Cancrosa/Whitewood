/* =========================================================
   WHITEWOOD — wspólna warstwa wszystkich stron
   menu · stopka · tryb twórców (hasło) · animacje wejścia
   ========================================================= */
(() => {
  "use strict";
  window.WW = window.WW || {};
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- tryb twórców ----------
     To zasłonka dla znajomych, nie zamek: treść jest w plikach repozytorium.
     Hasło nie jest zapisane wprost, tylko jako skrót. */
  const KEY = "ww-tworca", VIEW = "ww-widok";
  const HASH = 1812966590700843;
  const cyrb53 = (str, seed = 7) => {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed;
    for (let i = 0, ch; i < str.length; i++) { ch = str.charCodeAt(i); h1 = Math.imul(h1 ^ ch, 2654435761); h2 = Math.imul(h2 ^ ch, 1597334677); }
    h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507); h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
    h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507); h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
    return 4294967296 * (2097151 & h2) + (h1 >>> 0);
  };
  const store = {
    get(k, s = localStorage) { try { return s.getItem(k); } catch { return null; } },
    set(k, v, s = localStorage) { try { v == null ? s.removeItem(k) : s.setItem(k, v); } catch { /* prywatne okno — tryb trwa do odświeżenia */ } }
  };
  let memCreator = false;
  const isCreator = () => memCreator || store.get(KEY) === "1";
  const playerView = () => store.get(VIEW, sessionStorage) === "gracz";
  WW.creator = isCreator();
  WW.mode = WW.creator && !playerView() ? "tworca" : "publiczny";
  document.documentElement.dataset.mode = WW.mode;

  WW.login = pass => {
    if (cyrb53(String(pass).trim().toLowerCase()) !== HASH) return false;
    memCreator = true; store.set(KEY, "1"); store.set(VIEW, null, sessionStorage); location.reload(); return true;
  };
  WW.logout = () => { store.set(KEY, null); store.set(VIEW, null, sessionStorage); location.reload(); };
  WW.togglePlayerView = () => { store.set(VIEW, playerView() ? null : "gracz", sessionStorage); location.reload(); };

  /* ---------- menu ---------- */
  const PAGES = [
    ["osada.html", "Osada"], ["index.html#atlas", "Atlas"], ["kronika.html", "Kronika"], ["powodz.html", "Powódź"],
    ["krag.html", "Krąg"], ["ludy.html", "Ludy"], ["bestiariusz.html", "Bestiariusz"], ["jezyk.html", "Birdfolk"], ["postacie.html", "Postacie"], ["opowiesc.html", "Opowieść"]
  ];
  const here = (location.pathname.split("/").pop() || "index.html");
  const brand = `<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="29"/><path d="M32 12v40M32 24l-9-7M32 30l10-8M32 38l-11-6M32 44l9-5"/></svg>`;

  const nav = document.createElement("header");
  nav.className = "nav" + (document.body.classList.contains("has-hero") ? "" : " is-solid");
  nav.id = "nav";
  nav.innerHTML = `
    <a class="nav__brand" href="index.html" aria-label="Whitewood — strona główna">${brand}<span>Whitewood</span></a>
    <nav id="navlinks" class="nav__links">
      ${PAGES.map(([href, label]) => `<a href="${href}"${href === here ? ' class="is-active" aria-current="page"' : ""}>${label}</a>`).join("")}
      ${WW.creator ? `<a href="pracownia.html" class="nav__workshop${here === "pracownia.html" ? " is-active" : ""}">Pracownia</a>` : ""}
    </nav>
    <button class="nav__key" type="button" aria-label="${WW.creator ? "Tryb twórców" : "Wejście dla twórców"}" title="${WW.creator ? "Tryb twórców" : "Wejście dla twórców"}">
      ${WW.creator ? (WW.mode === "tworca" ? "Twórca" : "Widok gracza") : `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="12" r="4"/><path d="M12 12h9M18 12v3M21 12v2"/></svg>`}
    </button>
    <button class="nav__toggle" aria-expanded="false" aria-controls="navlinks" aria-label="Menu"><span></span><span></span></button>
    <div class="nav__progress" aria-hidden="true"><i></i></div>`;
  document.body.prepend(nav);

  const toggle = $(".nav__toggle", nav), links = $("#navlinks", nav);
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", open); links.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  $$("a", links).forEach(a => a.addEventListener("click", () => {
    toggle.setAttribute("aria-expanded", "false"); links.classList.remove("is-open"); document.body.style.overflow = "";
  }));

  /* ---------- okno twórców ---------- */
  const dlg = document.createElement("dialog");
  dlg.className = "gate";
  dlg.innerHTML = WW.creator ? `
      <form method="dialog" class="gate__box">
        <p class="eyebrow">Krąg twórców</p>
        <h2>${WW.mode === "tworca" ? "Widzisz wszystko" : "Widzisz to, co gracze"}</h2>
        <p class="gate__text">${WW.mode === "tworca"
          ? "Notatki MG, propozycje i otwarte pytania są widoczne. Możesz podejrzeć, co zobaczą gracze."
          : "Notatki MG i propozycje są ukryte, tak jak dla graczy."}</p>
        <div class="gate__actions">
          <button type="button" class="btn btn--gold" data-act="view">${WW.mode === "tworca" ? "Pokaż widok gracza" : "Wróć do widoku twórcy"}</button>
          <a class="btn btn--ghost" href="pracownia.html">Pracownia</a>
          <button type="button" class="btn btn--ghost" data-act="out">Wyloguj</button>
        </div>
        <button class="gate__close" value="close" aria-label="Zamknij">×</button>
      </form>` : `
      <form class="gate__box">
        <p class="eyebrow">Krąg twórców</p>
        <h2>Wejście dla twórców</h2>
        <p class="gate__text">Pełnia danych o Whitewood: notatki prowadzącego, sekrety, propozycje i otwarte pytania.</p>
        <label class="field"><span class="visually-hidden">Hasło</span><input type="password" name="pass" placeholder="hasło" autocomplete="current-password" required></label>
        <p class="gate__err" hidden>To nie to słowo.</p>
        <div class="gate__actions"><button class="btn btn--gold">Wejdź</button></div>
        <button type="button" class="gate__close" aria-label="Zamknij">×</button>
      </form>`;
  document.body.appendChild(dlg);
  $(".nav__key", nav).addEventListener("click", () => { dlg.showModal(); $("input", dlg)?.focus(); });
  $(".gate__close", dlg).addEventListener("click", () => dlg.close());
  dlg.addEventListener("click", e => { if (e.target === dlg) dlg.close(); });
  if (WW.creator) {
    $('[data-act="view"]', dlg).addEventListener("click", WW.togglePlayerView);
    $('[data-act="out"]', dlg).addEventListener("click", WW.logout);
  } else {
    $("form", dlg).addEventListener("submit", e => {
      e.preventDefault();
      if (!WW.login($("input", dlg).value)) { $(".gate__err", dlg).hidden = false; $("input", dlg).select(); }
    });
  }

  /* ---------- stopka ---------- */
  const foot = document.createElement("footer");
  foot.className = "footer";
  foot.innerHTML = `
    <div class="wrap">
      <p class="footer__farewell">silun strig</p>
      <p class="footer__gloss">spokoju nocy</p>
      <nav class="footer__nav">${PAGES.map(([h, l]) => `<a href="${h}">${l}</a>`).join("")}</nav>
      <div class="footer__meta">
        <p>Whitewood · Vetora — Krong<br>Świat kampanii D&amp;D <strong>Krąg Cieni</strong></p>
        <p>Lore: „Whitewood”, „Birdfolk — Architektura języka v2.0”, „Jack — Vulpin”.<br>Historia Whitewood: rozwój według Mieszka.</p>
      </div>
    </div>`;
  document.body.appendChild(foot);

  /* ---------- przewijanie: tło menu, pasek postępu ---------- */
  const bar = $(".nav__progress i", nav), hasHero = document.body.classList.contains("has-hero");
  const onScroll = () => {
    const y = scrollY, H = document.documentElement.scrollHeight - innerHeight;
    if (hasHero) nav.classList.toggle("is-solid", y > 60);
    bar.style.transform = `scaleX(${H > 0 ? y / H : 0})`;
    WW.onScroll?.(y);
  };
  addEventListener("scroll", onScroll, { passive: true });
  WW.refreshScroll = onScroll;

  /* ---------- animacje wejścia ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -10% 0px", threshold: 0.05 });
  WW.reveal = root => $$(".reveal, .reveal-stagger", root || document).forEach(n => { if (!n.classList.contains("is-in")) io.observe(n); });
  WW.reveal();
  onScroll();
})();
