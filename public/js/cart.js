(() => {
  const storageKey = "sportshoes-cart";
  const money = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  });

  function readCart() {
    const value = JSON.parse(localStorage.getItem(storageKey) || "[]");
    if (!Array.isArray(value)) {
      return [];
    }
    return value.filter(
      (item) =>
        item &&
        Number.isSafeInteger(item.id) &&
        typeof item.name === "string" &&
        Number.isFinite(item.price) &&
        item.price >= 0 &&
        Number.isSafeInteger(item.quantity) &&
        item.quantity > 0,
    );
  }

  let items = readCart();

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

  function imageUrl(value) {
    try {
      const url = new URL(value, window.location.origin);
      return ["http:", "https:"].includes(url.protocol)
        ? escapeHtml(url.href)
        : "";
    } catch {
      return "";
    }
  }

  function persist() {
    localStorage.setItem(storageKey, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent("sportshoes:cart-change"));
    renderCartPage();
    renderCheckoutSummary();
  }

  function add(product) {
    const stock = Number.isSafeInteger(product.stock)
      ? Math.max(0, product.stock)
      : 10;
    const existing = items.find((item) => item.id === product.id);
    const quantity = existing ? existing.quantity : 0;
    if (quantity >= Math.min(10, stock)) {
      window.dispatchEvent(
        new CustomEvent("sportshoes:notice", {
          detail: "Đã đạt số lượng sản phẩm hiện có trong kho.",
        }),
      );
      return;
    }
    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({ ...product, stock, quantity: 1 });
    }
    persist();
    window.dispatchEvent(
      new CustomEvent("sportshoes:notice", {
        detail: `${product.name} đã được thêm vào giỏ hàng.`,
      }),
    );
  }

  function setQuantity(id, quantity) {
    const item = items.find((entry) => entry.id === id);
    if (!item) {
      return;
    }
    if (quantity < 1) {
      items = items.filter((entry) => entry.id !== id);
    } else {
      item.quantity = Math.min(quantity, 10, item.stock || 10);
    }
    persist();
  }

  function total() {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  function emptyState() {
    return `<div class="empty-state"><span class="empty-state__icon" aria-hidden="true">◇</span><h2>Giỏ hàng đang trống</h2><p>Chọn một đôi giày yêu thích và bắt đầu hành trình của bạn.</p><a class="button button--dark" href="index.html">Khám phá sản phẩm <span aria-hidden="true">→</span></a></div>`;
  }

  function renderCartPage() {
    const container = document.querySelector("[data-cart-page]");
    if (!container) {
      return;
    }

    const list = container.querySelector("[data-cart-items]");
    const summary = container.querySelector("[data-cart-summary]");
    if (!items.length) {
      list.innerHTML = emptyState();
      summary.innerHTML = "";
      return;
    }

    list.innerHTML = items
      .map((item) => {
        const image = imageUrl(item.imageUrl);
        return `<article class="cart-item">
          <a class="cart-item__image" href="product.html?id=${item.id}">${image ? `<img src="${image}" alt="${escapeHtml(item.name)}" />` : ""}</a>
          <div class="cart-item__info">
            <a class="cart-item__name" href="product.html?id=${item.id}">${escapeHtml(item.name)}</a>
            <span class="muted">${escapeHtml(item.brand || "")}</span>
            <strong>${money.format(item.price)}</strong>
            <div class="quantity-control" aria-label="Số lượng">
              <button type="button" data-cart-action="decrease" data-id="${item.id}" aria-label="Giảm số lượng">−</button>
              <span>${item.quantity}</span>
              <button type="button" data-cart-action="increase" data-id="${item.id}" aria-label="Tăng số lượng">+</button>
            </div>
          </div>
          <button class="remove-button" type="button" data-cart-action="remove" data-id="${item.id}">Xóa</button>
        </article>`;
      })
      .join("");

    summary.innerHTML = `<p class="eyebrow">TÓM TẮT ĐƠN HÀNG</p>
      <div class="summary-row"><span>Tạm tính</span><strong>${money.format(total())}</strong></div>
      <div class="summary-row"><span>Giao hàng</span><span>${total() >= 1500000 ? "Miễn phí" : "Tính khi xác nhận"}</span></div>
      <div class="summary-row summary-row--total"><span>Tổng cộng</span><strong>${money.format(total())}</strong></div>
      <a class="button button--dark button--full" href="checkout.html">Tiến hành đặt hàng <span aria-hidden="true">→</span></a>
      <a class="summary-back" href="index.html">← Tiếp tục mua sắm</a>`;
  }

  function renderCheckoutSummary() {
    const summary = document.querySelector("[data-checkout-summary]");
    if (!summary) {
      return;
    }
    if (!items.length) {
      summary.innerHTML = `<p class="eyebrow">ĐƠN HÀNG CỦA BẠN</p>${emptyState()}`;
      const form = document.querySelector("[data-checkout-form]");
      if (form) {
        form.hidden = true;
      }
      return;
    }

    summary.innerHTML = `<p class="eyebrow">ĐƠN HÀNG CỦA BẠN</p>
      <div class="checkout-lines">${items
        .map(
          (item) => `<div class="checkout-line"><span>${escapeHtml(item.name)} <small>× ${item.quantity}</small></span><strong>${money.format(item.price * item.quantity)}</strong></div>`,
        )
        .join("")}</div>
      <div class="summary-row"><span>Giao hàng</span><span>${total() >= 1500000 ? "Miễn phí" : "Tính khi xác nhận"}</span></div>
      <div class="summary-row summary-row--total"><span>Tổng cộng</span><strong>${money.format(total())}</strong></div>`;
  }

  document.addEventListener("click", (event) => {
    const addButton = event.target.closest("[data-add-to-cart]");
    if (addButton) {
      add({
        id: Number(addButton.dataset.id),
        name: addButton.dataset.name,
        brand: addButton.dataset.brand || "",
        price: Number(addButton.dataset.price),
        imageUrl: addButton.dataset.image || "",
        stock: Number(addButton.dataset.stock),
      });
      return;
    }

    const actionButton = event.target.closest("[data-cart-action]");
    if (!actionButton) {
      return;
    }
    const id = Number(actionButton.dataset.id);
    const item = items.find((entry) => entry.id === id);
    if (!item) {
      return;
    }
    if (actionButton.dataset.cartAction === "remove") {
      setQuantity(id, 0);
    } else if (actionButton.dataset.cartAction === "increase") {
      setQuantity(id, item.quantity + 1);
    } else if (actionButton.dataset.cartAction === "decrease") {
      setQuantity(id, item.quantity - 1);
    }
  });

  document.addEventListener("submit", (event) => {
    const form = event.target.closest("[data-checkout-form]");
    if (!form) {
      return;
    }
    event.preventDefault();
    if (!items.length) {
      return;
    }

    const message = form.querySelector("[data-checkout-message]");
    const button = form.querySelector('button[type="submit"]');
    const customer = Object.fromEntries(new FormData(form).entries());
    button.disabled = true;
    message.textContent = "Đang lưu đơn hàng trên trình duyệt...";
    message.className = "form-message";

    try {
      const orderItems = items.map(({ id, quantity }) => ({ id, quantity }));
      window.SportShoesProducts.reduceStock(orderItems);
      const orders = JSON.parse(localStorage.getItem("sportshoes-orders") || "[]");
      const orderId = `SS${Date.now().toString().slice(-8)}`;
      orders.push({
        id: orderId,
        customer,
        items: items.map((item) => ({ ...item })),
        total: total(),
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem("sportshoes-orders", JSON.stringify(orders));

      items = [];
      persist();
      form.innerHTML = `<div class="order-success"><span aria-hidden="true">✓</span><p class="eyebrow">ĐẶT HÀNG ĐÃ LƯU TRÊN THIẾT BỊ</p><h2>Cảm ơn bạn!</h2><p>Mã đơn hàng <strong>#${orderId}</strong> đã được lưu trong trình duyệt này. Đây là bản xem thử: đơn hàng chưa được gửi đến cửa hàng.</p><a class="button button--dark" href="index.html">Tiếp tục mua sắm <span aria-hidden="true">→</span></a></div>`;
    } catch (error) {
      message.textContent = error.message;
      message.classList.add("form-message--error");
      button.disabled = false;
    }
  });

  window.SportShoesCart = {
    getItems: () => items.map((item) => ({ ...item })),
    count: () => items.reduce((sum, item) => sum + item.quantity, 0),
    total,
  };

  renderCartPage();
  renderCheckoutSummary();
})();
