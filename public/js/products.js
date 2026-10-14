(() => {
  const products = [
    {
      id: 1,
      name: "Air Zoom Pegasus 41",
      brand: "Nike",
      category: "Chạy bộ",
      price: 3290000,
      imageUrl:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=85",
      description:
        "Giày chạy bộ nhẹ, đệm êm và linh hoạt cho những buổi chạy hằng ngày.",
      stock: 18,
    },
    {
      id: 2,
      name: "Ultraboost Light",
      brand: "Adidas",
      category: "Chạy bộ",
      price: 4590000,
      imageUrl:
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=900&q=85",
      description:
        "Cảm giác đàn hồi nhẹ nhàng, phù hợp cho chạy bộ và di chuyển cả ngày.",
      stock: 12,
    },
    {
      id: 3,
      name: "Air Jordan 1 Low",
      brand: "Jordan",
      category: "Bóng rổ",
      price: 3190000,
      imageUrl:
        "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=900&q=85",
      description:
        "Phong cách bóng rổ kinh điển với phom dáng thấp dễ phối đồ.",
      stock: 9,
    },
    {
      id: 4,
      name: "Gel-Kayano 30",
      brand: "ASICS",
      category: "Chạy bộ",
      price: 3890000,
      imageUrl:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=900&q=85",
      description:
        "Giày chạy bộ ổn định với lớp đệm thoải mái trên quãng đường dài.",
      stock: 15,
    },
    {
      id: 5,
      name: "Fresh Foam 1080v13",
      brand: "New Balance",
      category: "Chạy bộ",
      price: 4290000,
      imageUrl:
        "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=900&q=85",
      description:
        "Đệm mềm mại, chuyển động mượt mà cho lịch tập luyện thường xuyên.",
      stock: 7,
    },
    {
      id: 6,
      name: "Chuck 70 High Top",
      brand: "Converse",
      category: "Phong cách",
      price: 1890000,
      imageUrl:
        "https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=900&q=85",
      description:
        "Thiết kế canvas vượt thời gian cho phong cách năng động mỗi ngày.",
      stock: 20,
    },
    {
      id: 7,
      name: "Court Vision Low",
      brand: "Nike",
      category: "Phong cách",
      price: 2190000,
      imageUrl:
        "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?auto=format&fit=crop&w=900&q=85",
      description:
        "Cảm hứng sân bóng rổ cổ điển trong một thiết kế đời thường.",
      stock: 11,
    },
    {
      id: 8,
      name: "Predator League",
      brand: "Adidas",
      category: "Bóng đá",
      price: 2790000,
      imageUrl:
        "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=900&q=85",
      description:
        "Giày bóng đá kiểm soát bóng tốt cho những trận đấu sôi động.",
      stock: 6,
    },
  ];
  const stockKey = "sportshoes-stock";
  const money = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  });

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => {
      const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      };
      return entities[character];
    });
  }

  function safeImage(value) {
    try {
      const url = new URL(value);
      return ["http:", "https:"].includes(url.protocol)
        ? escapeHtml(url.href)
        : "";
    } catch {
      return "";
    }
  }

  function readStock() {
    const stock = JSON.parse(localStorage.getItem(stockKey) || "{}");
    return stock && typeof stock === "object" && !Array.isArray(stock)
      ? stock
      : {};
  }

  function getProducts() {
    const stock = readStock();
    return products.map((product) => ({
      ...product,
      stock:
        Number.isSafeInteger(stock[product.id]) && stock[product.id] >= 0
          ? stock[product.id]
          : product.stock,
    }));
  }

  function addButton(product, label = "Thêm vào giỏ") {
    return `<button class="button button--dark product-add" type="button" data-add-to-cart data-id="${product.id}" data-name="${escapeHtml(product.name)}" data-brand="${escapeHtml(product.brand)}" data-price="${product.price}" data-stock="${product.stock}" data-image="${escapeHtml(product.imageUrl)}">${label} <span aria-hidden="true">↗</span></button>`;
  }

  function productCard(product) {
    const image = safeImage(product.imageUrl);
    return `<article class="product-card">
      <a class="product-card__image" href="product.html?id=${product.id}" aria-label="Xem ${escapeHtml(product.name)}">
        ${image ? `<img src="${image}" alt="${escapeHtml(product.name)}" loading="lazy" />` : ""}
        <span class="product-card__badge">${escapeHtml(product.category)}</span>
      </a>
      <div class="product-card__body">
        <p class="product-card__brand">${escapeHtml(product.brand)}</p>
        <a class="product-card__name" href="product.html?id=${product.id}">${escapeHtml(product.name)}</a>
        <div class="product-card__bottom"><strong>${money.format(product.price)}</strong>${product.stock > 0 ? addButton(product, "Thêm") : `<span class="muted">Tạm hết hàng</span>`}</div>
      </div>
    </article>`;
  }

  function renderGrid(grid, category, query) {
    const normalizedQuery = query.trim().toLocaleLowerCase("vi");
    const result = getProducts().filter((product) => {
      const matchesCategory = !category || product.category === category;
      const matchesQuery =
        !normalizedQuery ||
        `${product.name} ${product.brand}`
          .toLocaleLowerCase("vi")
          .includes(normalizedQuery);
      return matchesCategory && matchesQuery;
    });
    grid.innerHTML = result.length
      ? result.map(productCard).join("")
      : `<div class="empty-results"><p class="eyebrow">CHƯA TÌM THẤY</p><h3>Thử một tìm kiếm khác nhé.</h3><p>Hãy đổi từ khóa hoặc chọn danh mục khác.</p></div>`;
  }

  const params = new URLSearchParams(window.location.search);
  const grid = document.querySelector("[data-product-grid]");
  const searchForm = document.querySelector("[data-product-search]");
  const searchInput = searchForm?.querySelector('input[name="q"]');

  if (grid) {
    const category = params.get("category") || "";
    if (searchInput) {
      searchInput.value = params.get("q") || "";
    }
    renderGrid(grid, category, searchInput?.value || "");
    searchForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      renderGrid(grid, category, searchInput?.value || "");
      grid.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  } else if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = searchInput?.value.trim() || "";
      const target = query
        ? `index.html?q=${encodeURIComponent(query)}#san-pham`
        : "index.html#san-pham";
      window.location.href = target;
    });
  }

  document.querySelectorAll("[data-category-grid]").forEach((categoryGrid) => {
    renderGrid(categoryGrid, categoryGrid.dataset.categoryGrid, "");
  });

  const detail = document.querySelector("[data-product-detail]");
  if (detail) {
    const id = Number(params.get("id"));
    const product = getProducts().find((entry) => entry.id === id);
    if (!product) {
      detail.innerHTML = `<div class="empty-results"><h2>Không tìm thấy sản phẩm.</h2><a class="button button--dark" href="index.html">Về trang chủ</a></div>`;
    } else {
      const image = safeImage(product.imageUrl);
      document.title = `${product.name} — SportShoes`;
      detail.innerHTML = `<div class="product-detail__image">${image ? `<img src="${image}" alt="${escapeHtml(product.name)}" />` : ""}<span class="product-card__badge">${escapeHtml(product.category)}</span></div>
        <div class="product-detail__info"><p class="eyebrow">${escapeHtml(product.brand)}</p><h1>${escapeHtml(product.name)}</h1><p class="product-detail__price">${money.format(product.price)}</p><p class="product-detail__description">${escapeHtml(product.description)}</p><p class="stock-note"><span class="status-dot"></span> ${product.stock > 0 ? `Còn ${product.stock} sản phẩm` : "Tạm hết hàng"}</p>${product.stock > 0 ? addButton(product, "Thêm vào giỏ hàng") : ""}<p class="product-promise">✓ Sản phẩm chính hãng<br />✓ Đổi trả trong 7 ngày<br />✓ Giao hàng toàn quốc</p></div>`;
    }
  }

  window.SportShoesProducts = {
    getProducts,
    reduceStock(items) {
      const stock = readStock();
      for (const item of items) {
        const product = products.find((entry) => entry.id === item.id);
        const available = Number.isSafeInteger(stock[item.id])
          ? stock[item.id]
          : product?.stock || 0;
        if (!product || item.quantity > available) {
          throw new Error(`Sản phẩm "${product?.name || item.id}" không đủ số lượng.`);
        }
      }
      for (const item of items) {
        const product = products.find((entry) => entry.id === item.id);
        const available = Number.isSafeInteger(stock[item.id])
          ? stock[item.id]
          : product.stock;
        stock[item.id] = available - item.quantity;
      }
      localStorage.setItem(stockKey, JSON.stringify(stock));
    },
  };
})();
