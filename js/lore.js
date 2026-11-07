/* =========================================================
   WHITEWOOD — ładowanie lore z plików
   lore/ustawienia.json   → kolejność miejsc
   lore/miejsca/*.md      → jedno miejsce = jeden plik
   lore/osada.md, lore/powodz.md, lore/do-ustalenia.md → dokumenty
   lore/slownik.tsv       → słownik Birdfolk

   W trybie publicznym znikają sekcje „· MG” i propozycje „[?]”.
   ========================================================= */
(() => {
  "use strict";
  window.WW = window.WW || {};
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const PROP = /^\[\?\]\s*/;
  const plain = s => s.replace(/`([^`]+)`/g, "$1").replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*]+)\*/g, "$1");

  /* ---------- mini-markdown ---------- */
  function inline(s) {
    return esc(s)
      .replace(/`([^`]+)`/g, '<code class="native">$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>")
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '<a href="$2">$1</a>');
  }
  // ctx: { pub: bool, props: [] (zbiera propozycje), where: "nazwa pliku/sekcji" }
  function md(text, ctx = {}) {
    const out = []; let list = null, para = [], table = null;
    const flushP = () => {
      if (!para.length) return;
      let t = para.join(" "); const prop = PROP.test(t); t = t.replace(PROP, ""); para = [];
      if (prop) { if (ctx.pub) return; ctx.props?.push({ where: ctx.where, text: plain(t) }); }
      out.push(`<p${prop ? ' class="prop"' : ""}>${inline(t)}</p>`);
    };
    const flushL = () => {
      if (!list) return;
      const items = list.filter(li => !(li.prop && ctx.pub));
      if (items.length) out.push(`<ul>${items.map(li => `<li${li.prop ? ' class="prop"' : ""}>${li.html}</li>`).join("")}</ul>`);
      list = null;
    };
    const flushT = () => {
      if (!table) return;
      const rows = table.filter(r => !/^\|?\s*:?-{2,}/.test(r)).map(r => r.replace(/^\||\|$/g, "").split("|").map(c => c.trim()));
      const [head, ...body] = rows;
      out.push(`<div class="md-table"><table><thead><tr>${head.map(c => `<th>${inline(c)}</th>`).join("")}</tr></thead><tbody>${body.map(r => `<tr>${r.map(c => `<td>${inline(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div>`);
      table = null;
    };
    for (const raw of text.split("\n")) {
      const line = raw.trim();
      const h = line.match(/^(#{3,4})\s+(.*)$/);
      const m = line.match(/^[-*]\s+(?:\[( |x)\]\s+)?(.*)$/);
      if (line.startsWith("|")) { flushP(); flushL(); (table ||= []).push(line); continue; }
      flushT();
      if (h) { flushP(); flushL(); out.push(`<h${h[1].length}>${inline(h[2])}</h${h[1].length}>`); }
      else if (m) {
        flushP();
        const prop = PROP.test(m[2]); const body = m[2].replace(PROP, "");
        if (prop && !ctx.pub) ctx.props?.push({ where: ctx.where, text: plain(body) });
        (list ||= []).push({ prop, html: (m[1] ? `<span class="chk${m[1] === "x" ? " chk--done" : ""}"></span>` : "") + inline(body) });
      }
      else if (!line) { flushP(); flushL(); }
      else { flushL(); para.push(line); }
    }
    flushP(); flushL(); flushT();
    return out.join("");
  }

  /* ---------- dokument z frontmatter i sekcjami „## ” ---------- */
  function parseDoc(src, file, opts = {}) {
    const pub = WW.mode !== "tworca";
    src = src.replace(/\r/g, "").replace(/<!--[\s\S]*?-->/g, "");
    const fm = src.match(/^---\n([\s\S]*?)\n---\n?/);
    const meta = {};
    if (fm) fm[1].split("\n").forEach(l => { const i = l.indexOf(":"); if (i > 0) meta[l.slice(0, i).trim()] = l.slice(i + 1).trim(); });
    let body = fm ? src.slice(fm[0].length) : src;
    const h1 = body.match(/^#\s+(.+)$/m);
    if (h1) body = body.replace(h1[0], "");
    const props = [];
    const intro = body.split(/^##\s+/m)[0].trim();
    const sections = [];
    body.split(/^##\s+/m).slice(1).forEach(chunk => {
      const nl = chunk.indexOf("\n");
      let title = (nl < 0 ? chunk : chunk.slice(0, nl)).trim();
      const content = nl < 0 ? "" : chunk.slice(nl + 1).trim();
      const gm = /·\s*MG\s*$/i.test(title);
      const prop = /·\s*\?\s*$/.test(title);          // „## Tytuł · ?” = cała sekcja jest propozycją
      title = title.replace(/\s*·\s*(MG|\?)\s*$/i, "");
      if (!content || content === "—" || ((gm || prop) && pub)) return;
      const where = `${meta.nazwa || file} → ${title}`;
      if (prop) props.push({ where, text: "cała sekcja „" + title + "”" });
      const html = md(content, { pub, props: prop ? [] : props, where });
      if (html) sections.push({ title, gm, prop, html, id: slug(title) });
    });
    const points = (meta.mapa || "").split(";").map(p => p.split(",").map(Number)).filter(p => p.length === 2 && p.every(n => !isNaN(n)));
    return {
      id: meta.id || file, file,
      name: meta.nazwa || (h1 && h1[1]) || file,
      native: meta.birdfolk || "—",
      nativeGloss: meta.birdfolk_znaczenie || "",
      kind: meta.typ || "",
      status: meta.status || "kanon",
      tags: (meta.tagi || "").split(",").map(s => s.trim()).filter(Boolean),
      points, sections, props,
      intro: intro ? md(intro, { pub, props, where: meta.nazwa || file }) : ""
    };
  }
  const slug = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/ł/g, "l").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  WW.slug = slug;

  /* ---------- słownik TSV ---------- */
  function parseTSV(src) {
    const rows = src.replace(/\r/g, "").split("\n").filter(l => l.trim() && !l.startsWith("#"));
    rows.shift();
    const pub = WW.mode !== "tworca";
    return rows.map(l => {
      const [word, meaning, cat, ety, source, status] = l.split("\t").map(s => (s || "").trim());
      return { word, meaning, cat, ety, source, status: status || "kanon" };
    }).filter(r => r.word && !(pub && r.status !== "kanon"));
  }

  /* ---------- ładowanie z pamięcią podręczną ---------- */
  const cache = {};
  const get = (url, as) => cache[url] ||= fetch(url, { cache: "no-cache" }).then(r => { if (!r.ok) throw new Error(url + " → " + r.status); return r[as](); });

  WW.lore = {
    md: (t, ctx) => md(t, { pub: WW.mode !== "tworca", ...ctx }),
    settings: () => get("lore/ustawienia.json", "json"),
    async places() {
      const cfg = await this.settings();
      return Promise.all(cfg.miejsca.map(id => get(`lore/miejsca/${id}.md`, "text").then(t => parseDoc(t, id))));
    },
    dict: () => get("lore/slownik.tsv", "text").then(parseTSV),
    gwary: () => get("lore/gwary.tsv", "text").then(src => {
      const pub = WW.mode !== "tworca";
      const rows = src.replace(/\r/g, "").split("\n").filter(l => l.trim() && !l.startsWith("#")); rows.shift();
      return rows.map(l => { const [word, dialect, meaning, insp, status] = l.split("\t").map(s => (s || "").trim()); return { word, dialect, meaning, insp, status: status || "kanon" }; })
        .filter(r => r.word && !(pub && r.status !== "kanon"));
    }),
    doc: name => get(`lore/${name}.md`, "text").then(t => parseDoc(t, name))
  };

  WW.loreError = (el, err) => {
    console.error(err);
    if (el) el.innerHTML = `<p class="lore-error">Nie udało się wczytać plików z <code>lore/</code>. Otwórz stronę przez serwer (np. <code>python3 -m http.server</code>), nie bezpośrednio z dysku.</p>`;
  };
})();
