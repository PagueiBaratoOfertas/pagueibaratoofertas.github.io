const SETTINGS = {
  whatsapp: "#", // Trocaremos pelo link real do Grupo VIP.
};

const products = [
  {
    title: "Escova Secadora",
    category: "Beleza",
    store: "TikTok Shop",
    emoji: "💇‍♀️",
    description: "Praticidade para secar e modelar os cabelos em casa.",
    priceText: "Confira o preço",
    link: "#"
  },
  {
    title: "Aspirador Vertical",
    category: "Casa e Cozinha",
    store: "TikTok Shop",
    emoji: "🧹",
    description: "Opção prática para limpeza rápida do dia a dia.",
    priceText: "Confira o preço",
    link: "#"
  },
  {
    title: "Smartwatch",
    category: "Eletrônicos",
    store: "TikTok Shop",
    emoji: "⌚",
    description: "Acompanhe notificações e recursos do dia a dia no pulso.",
    priceText: "Confira o preço",
    link: "#"
  },
  {
    title: "Organizador de Cozinha",
    category: "Casa e Cozinha",
    store: "Shopee",
    emoji: "🧺",
    description: "Ajuda a ganhar espaço e deixar a rotina mais organizada.",
    priceText: "Confira o preço",
    link: "#"
  },
  {
    title: "Saia Midi de Alfaiataria",
    category: "Moda",
    store: "TikTok Shop",
    emoji: "👗",
    description: "Peça versátil para compor looks casuais e arrumados.",
    priceText: "Confira o preço",
    link: "#"
  },
  {
    title: "Timer Digital Magnético",
    category: "Utilidades",
    store: "Mercado Livre",
    emoji: "⏱️",
    description: "Útil para cozinha, estudos, treinos e organização de tarefas.",
    priceText: "Confira o preço",
    link: "#"
  }
];

let activeCategory = "Todos";
let searchTerm = "";

const grid = document.getElementById("productGrid");
const empty = document.getElementById("emptyState");
const count = document.getElementById("resultsCount");
const searchInput = document.getElementById("searchInput");

function normalize(text) {
  return text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function renderProducts() {
  const filtered = products.filter(p => {
    const matchesCategory = activeCategory === "Todos" || p.category === activeCategory;
    const haystack = normalize(`${p.title} ${p.category} ${p.store} ${p.description}`);
    const matchesSearch = haystack.includes(normalize(searchTerm));
    return matchesCategory && matchesSearch;
  });

  grid.innerHTML = filtered.map(p => {
    const enabled = p.link && p.link !== "#";
    return `
      <article class="product-card">
        <div class="product-visual">
          <span class="store-badge">${p.store}</span>
          <span aria-hidden="true">${p.emoji}</span>
        </div>
        <div class="product-body">
          <span class="product-category">${p.category}</span>
          <h3 class="product-title">${p.title}</h3>
          <p class="product-desc">${p.description}</p>
          <div class="product-meta">
            <span class="price-text">${p.priceText}</span>
            ${enabled
              ? `<a class="offer-btn" href="${p.link}" target="_blank" rel="nofollow sponsored noopener">Ver oferta</a>`
              : `<span class="offer-btn disabled" title="Link será adicionado na próxima etapa">Em breve</span>`
            }
          </div>
        </div>
      </article>
    `;
  }).join("");

  count.textContent = `${filtered.length} ${filtered.length === 1 ? "oferta" : "ofertas"}`;
  empty.hidden = filtered.length !== 0;
}

document.querySelectorAll(".category").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".category").forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    activeCategory = button.dataset.category;
    renderProducts();
  });
});

searchInput.addEventListener("input", e => {
  searchTerm = e.target.value;
  renderProducts();
});

document.getElementById("clearSearch").addEventListener("click", () => {
  searchInput.value = "";
  searchTerm = "";
  renderProducts();
  searchInput.focus();
});

document.querySelectorAll('[data-link="whatsapp"]').forEach(a => {
  a.href = SETTINGS.whatsapp;
  if (SETTINGS.whatsapp === "#") {
    a.addEventListener("click", e => e.preventDefault());
    a.title = "Vamos adicionar o link do Grupo VIP na próxima etapa";
  }
});

document.getElementById("year").textContent = new Date().getFullYear();
renderProducts();
