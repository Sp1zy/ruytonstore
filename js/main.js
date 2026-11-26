/* Shared behaviour for every page */

const gbp = (n) => "£" + n.toFixed(2);
const productUrl = (p) => p.url || STORE_URL + "/products";

/* ---------- Mobile menu ---------- */
const menuBtn = document.querySelector(".menu-toggle");
const drawer = document.querySelector(".drawer");
if (menuBtn && drawer) {
  menuBtn.addEventListener("click", () => {
    const open = document.body.classList.toggle("menu-open");
    menuBtn.setAttribute("aria-expanded", open);
  });
  drawer.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => document.body.classList.remove("menu-open"))
  );
}

/* ---------- Basket links go to SumUp ---------- */
document.querySelectorAll("[data-store-link]").forEach((a) => {
  a.href = STORE_URL + (a.dataset.storeLink || "");
});

/* ---------- Open now / opening hours ---------- */
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const toMin = (t) => { const [h, m] = t.split(":").map(Number); return h * 60 + m; };

function openStatus(now = new Date()) {
  const d = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const [o, c] = HOURS[d];
  if (mins >= toMin(o) && mins < toMin(c)) return { open: true, text: `Open now · until ${c}` };
  if (mins < toMin(o)) return { open: false, text: `Closed · opens ${o} today` };
  const next = (d + 1) % 7;
  return { open: false, text: `Closed · opens ${HOURS[next][0]} tomorrow` };
}

document.querySelectorAll("[data-open-status]").forEach((el) => {
  const s = openStatus();
  el.textContent = s.text;
  el.classList.toggle("is-open", s.open);
});

document.querySelectorAll("[data-hours]").forEach((tbody) => {
  const today = new Date().getDay();
  [1, 2, 3, 4, 5, 6, 0].forEach((d) => {
    const tr = document.createElement("tr");
    if (d === today) tr.className = "today";
    tr.innerHTML = `<th scope="row">${DAY_NAMES[d]}</th><td>${HOURS[d][0]} – ${HOURS[d][1]}</td>`;
    tbody.appendChild(tr);
  });
});

/* ---------- Product cards ---------- */
function card(p) {
  return `
  <article class="product" data-cat="${p.category}">
    <a class="product-media" href="${productUrl(p)}" target="_blank" rel="noopener">
      <img src="${p.image}" alt="${p.name}" loading="lazy" width="560" height="560">
      ${p.category === "bundles" ? '<span class="tag">Bundle</span>' : ""}
    </a>
    <div class="product-body">
      <h3>${p.name}</h3>
      ${p.blurb ? `<p class="product-blurb">${p.blurb}</p>` : ""}
      <div class="product-foot">
        <span class="price">${p.variants ? '<small>from</small> ' : ""}${gbp(p.price)}</span>
        <a class="btn btn-small" href="${productUrl(p)}" target="_blank" rel="noopener">Order<span class="sr"> ${p.name}</span> <span aria-hidden="true">→</span></a>
      </div>
    </div>
  </article>`;
}

const featured = document.querySelector("[data-featured]");
if (featured) featured.innerHTML = PRODUCTS.filter((p) => p.featured && p.category !== "bundles").slice(0, 4).map(card).join("");

/* ---------- Shop page: filters + sort ---------- */
const grid = document.querySelector("[data-shop-grid]");
if (grid) {
  const chips = document.querySelector("[data-filters]");
  const sortSel = document.querySelector("[data-sort]");
  const count = document.querySelector("[data-count]");
  const title = document.querySelector("[data-shop-title]");
  let current = "all";

  chips.innerHTML = CATEGORIES.map(
    (c) => `<button type="button" class="chip" data-cat="${c.id}">${c.label}</button>`
  ).join("");

  function render() {
    let list = PRODUCTS.filter((p) => current === "all" || p.category === current);
    const s = sortSel.value;
    list = [...list].sort((a, b) =>
      s === "price-asc" ? a.price - b.price :
      s === "price-desc" ? b.price - a.price :
      a.name.localeCompare(b.name)
    );
    grid.innerHTML = list.length ? list.map(card).join("") : '<p class="empty">Nothing here yet — check back soon.</p>';
    count.textContent = `${list.length} item${list.length === 1 ? "" : "s"}`;
    const cat = CATEGORIES.find((c) => c.id === current);
    title.textContent = current === "all" ? "All products" : cat.label;
    chips.querySelectorAll(".chip").forEach((b) => b.setAttribute("aria-pressed", b.dataset.cat === current));
  }

  function fromHash() {
    const h = location.hash.slice(1);
    current = CATEGORIES.some((c) => c.id === h) ? h : "all";
    render();
  }

  chips.addEventListener("click", (e) => {
    const b = e.target.closest(".chip");
    if (!b) return;
    history.replaceState(null, "", b.dataset.cat === "all" ? location.pathname : "#" + b.dataset.cat);
    current = b.dataset.cat;
    render();
    markNav();
  });
  sortSel.addEventListener("change", render);
  window.addEventListener("hashchange", () => { fromHash(); markNav(); });
  fromHash();
}

/* ---------- Highlight current nav item (Products vs Bundles share a page) ---------- */
function markNav() {
  const page = location.pathname.split("/").pop() || "index.html";
  const hash = location.hash;
  document.querySelectorAll(".nav a, .drawer a").forEach((a) => {
    const [p, h] = a.getAttribute("href").split("#");
    let active = p === page;
    if (page === "shop.html") active = p === page && ((h === "bundles") === (hash === "#bundles"));
    if (page === "about.html") active = p === page && ((h === "suppliers") === (hash === "#suppliers"));
    a.toggleAttribute("aria-current", active);
    if (active) a.setAttribute("aria-current", "page");
  });
}
markNav();
window.addEventListener("hashchange", markNav);

document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
