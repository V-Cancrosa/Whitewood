/* =========================================================
   WHITEWOOD — ładowanie lore z plików
   lore/ustawienia.json   → tryb (mg / publiczny) i kolejność miejsc
   lore/miejsca/*.md      → jedno miejsce = jeden plik
   lore/slownik.tsv       → słownik Birdfolk
   ========================================================= */
(() => {
  "use strict";
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  /* ---------- mini-markdown: akapity, listy, **b**, *i*, `kod` ---------- */
  function inline(s) {
    return esc(s)
      .replace(/`([^`]+)`/g, '<code class="native">$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
      .replace(/(^|[^*])\*([^*]+)\*/g, "$1<em>$2</em>")
      .replace(/(^|[\s(])_([^_]+)_(?=[\s.,;:)!?]|$)/g, "$1<em>$2</em>");
  }
  function md(text) {
    const out = []; let list = null, para = [];
    const flushP = () => { if (para.length) { out.push(`<p>${inline(para.join(" "))}</p>`); para = []; } };
    const flushL = () => { if (list) { out.push(`<ul>${list.map(li => `<li>${li}</li>`).join("")}</ul>`); list = null; } };
    for (const raw of text.split("\n")) {
      const line = raw.trim();
      const m = line.match(/^[-*]\s+(?:\[( |x)\]\s+)?(.*)$/);
      if (m) { flushP(); (list ||= []).push((m[1] ? `<span class="chk${m[1] === "x" ? " chk--done" : ""}"></span>` : "") + inline(m[2])); }
      else if (!line) { flushP(); flushL(); }
      else { flushL(); para.push(line); }
    }
    flushP(); flushL();
    return out.join("");
  }

  /* ---------- plik miejsca ---------- */
  function parsePlace(src, file) {
    src = src.replace(/\r/g, "").replace(/<!--[\s\S]*?-->/g, "");
    const fm = src.match(/^---\n([\s\S]*?)\n---\n?/);
    const meta = {};
    if (fm) fm[1].split("\n").forEach(l => { const i = l.indexOf(":"); if (i > 0) meta[l.slice(0, i).trim()] = l.slice(i + 1).trim(); });
    const body = fm ? src.slice(fm[0].length) : src;
    const sections = [];
    body.split(/^##\s+/m).slice(1).forEach(chunk => {
      const nl = chunk.indexOf("\n");
      let title = (nl < 0 ? chunk : chunk.slice(0, nl)).trim();
      const content = nl < 0 ? "" : chunk.slice(nl + 1).trim();
      const gm = /·\s*MG\s*$/i.test(title);
      title = title.replace(/\s*·\s*MG\s*$/i, "");
      if (content && content !== "—") sections.push({ title, gm, html: md(content) });
    });
    const points = (meta.mapa || "").split(";").map(p => p.split(",").map(Number)).filter(p => p.length === 2 && p.every(n => !isNaN(n)));
    return {
      id: meta.id || file,
      name: meta.nazwa || file,
      native: meta.birdfolk || "—",
      nativeGloss: meta.birdfolk_znaczenie || "",
      kind: meta.typ || "",
      status: meta.status || "kanon",
      tags: (meta.tagi || "").split(",").map(s => s.trim()).filter(Boolean),
      points,
      sections
    };
  }

  /* ---------- słownik TSV ---------- */
  function parseTSV(src) {
    const rows = src.replace(/\r/g, "").split("\n").filter(l => l.trim() && !l.startsWith("#"));
    rows.shift(); // nagłówek
    return rows.map(l => {
      const [word, meaning, cat, ety, source, status] = l.split("\t").map(s => (s || "").trim());
      return { word, meaning, cat, ety, source, status: status || "kanon" };
    }).filter(r => r.word);
  }

  const get = (url, as) => fetch(url, { cache: "no-cache" }).then(r => { if (!r.ok) throw new Error(url + " → " + r.status); return r[as](); });

  window.WW = window.WW || {};
  WW.loadLore = async function () {
    const cfg = await get("lore/ustawienia.json", "json");
    const qs = new URLSearchParams(location.search);
    let mode = cfg.tryb === "mg" ? "mg" : "publiczny";
    if (qs.has("publiczny")) mode = "publiczny";
    const [places, dict, settlement] = await Promise.all([
      Promise.all(cfg.miejsca.map(id => get(`lore/miejsca/${id}.md`, "text").then(t => parsePlace(t, id)))),
      get("lore/slownik.tsv", "text").then(parseTSV),
      get("lore/osada.md", "text").then(t => parsePlace(t, "osada"))
    ]);
    if (mode !== "mg") [...places, settlement].forEach(p => p.sections = p.sections.filter(s => !s.gm));
    return { mode, places, dict, settlement };
  };
  WW.md = md;
})();
