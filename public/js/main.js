(() => {
  const header = document.querySelector("[data-site-header]");
  if (header) {
    header.innerHTML = `<header class="site-header">
        <div class="wrap nav-wrap">
          <button class="menu-toggle" type="button" aria-label="Mở menu" aria-expanded="false" data-menu-toggle><span></span><span></span><span></span></button>
          <a class="brand" href="index.html" aria-label="SportShoes — Trang chủ"><span class="brand__mark">S</span><span>SPORT<span>SHOES</span></span></a>
          <nav class="main-nav" aria-label="Điều hướng chính" data-main-nav>
            <a href="index.html#danh-muc">Danh mục giày</a>
            <a href="index.html?category=Bóng%20đá#san-pham">Bóng đá</a>
            <a href="index.html?category=Bóng%20rổ#san-pham">Bóng rổ</a>
            <a href="index.html?category=Chạy%20bộ#san-pham">Chạy bộ</a>
            <a href="index.html?q=Nike#san-pham">Thương hiệu</a>
          </nav>
          <div class="nav-actions"><a class="nav-login" href="login.html">Tài khoản</a><a class="cart-link" href="cart.html" aria-label="Giỏ hàng, 0 sản phẩm"><span class="cart-link__label">Giỏ hàng</span><span data-cart-count>0</span></a></div>
        </div>
        <div class="header-search-wrap">
          <form class="header-search" data-product-search role="search">
            <label class="sr-only" for="header-product-search">Tìm kiếm sản phẩm</label>
            <span class="header-search__icon" aria-hidden="true">⌕</span>
            <input id="header-product-search" type="search" name="q" placeholder="Tìm kiếm sản phẩm ..." />
            <button type="submit" aria-label="Tìm kiếm">Tìm</button>
          </form>
        </div>
      </header>`;
  }

  const promoBanner = document.querySelector("[data-promo-banner]");
  if (promoBanner) {
    const slides = [
      {
        image:
          "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&w=1800&q=90",
        eyebrow: "SPORTSHOES · BỘ SƯU TẬP 2026",
        title: "BỨT PHÁ\nMỌI GIỚI HẠN",
        description:
          "Chọn người bạn đồng hành cho từng bước chạy, trận đấu và hành trình của bạn.",
        offer: ["NEW", "SEASON"],
      },
      {
        image:
          "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=1800&q=90",
        eyebrow: "DÀNH CHO NHỮNG NGƯỜI KHÔNG NGỪNG TIẾN LÊN",
        title: "CHẠY THEO\nCÁCH CỦA BẠN",
        description:
          "Khám phá giày chạy bộ nhẹ êm cho những cung đường dài và mục tiêu mới.",
        offer: ["RUN", "YOUR WAY"],
      },
      {
        image:
          "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=1800&q=90",
        eyebrow: "SẴN SÀNG CHO TRẬN ĐẤU",
        title: "LÀM CHỦ\nSÂN CỎ",
        description:
          "Tìm đôi giày bóng đá phù hợp để tự tin trong mọi pha chạm bóng.",
        offer: ["GAME", "ON"],
      },
    ];
    let activeSlide = 0;
    const image = promoBanner.querySelector("[data-promo-image]");
    const eyebrow = promoBanner.querySelector("[data-promo-eyebrow]");
    const title = promoBanner.querySelector("[data-promo-title]");
    const description = promoBanner.querySelector("[data-promo-description]");
    const offer = promoBanner.querySelector("[data-promo-offer]");
    const dots = [...promoBanner.querySelectorAll("[data-promo-dot]")];

    function showSlide(index) {
      activeSlide = (index + slides.length) % slides.length;
      const slide = slides[activeSlide];
      image.src = slide.image;
      image.alt = slide.eyebrow;
      eyebrow.textContent = slide.eyebrow;
      title.textContent = slide.title;
      description.textContent = slide.description;
      offer.replaceChildren(
        slide.offer[0],
        document.createElement("br"),
        Object.assign(document.createElement("strong"), {
          textContent: slide.offer[1],
        }),
      );
      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle("is-active", dotIndex === activeSlide);
        dot.setAttribute("aria-current", dotIndex === activeSlide ? "true" : "false");
      });
    }

    promoBanner.querySelector("[data-promo-prev]")?.addEventListener("click", () => {
      showSlide(activeSlide - 1);
    });
    promoBanner.querySelector("[data-promo-next]")?.addEventListener("click", () => {
      showSlide(activeSlide + 1);
    });
    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        showSlide(Number(dot.dataset.promoDot));
      });
    });
    showSlide(activeSlide);
  }

  const footer = document.querySelector("[data-site-footer]");
  if (footer) {
    footer.innerHTML = `<footer class="site-footer"><div class="wrap footer-grid">
      <div class="footer-brand"><a class="brand brand--footer" href="index.html"><span class="brand__mark">S</span><span>SPORT<span>SHOES</span></span></a><p>Tìm đôi giày cùng bạn chinh phục từng chuyển động.</p></div>
      <div><p class="footer-title">Khám phá</p><a href="index.html#san-pham">Tất cả sản phẩm</a><a href="index.html?category=Chạy%20bộ#san-pham">Chạy bộ</a><a href="index.html?category=Bóng%20rổ#san-pham">Bóng rổ</a></div>
      <div><p class="footer-title">Hỗ trợ</p><a href="cart.html">Giỏ hàng</a><a href="checkout.html">Đặt hàng</a><a href="login.html">Tài khoản</a></div>
      <div class="footer-contact"><p class="footer-title">Luôn chuyển động</p><p>Đăng ký nhận tin về bộ sưu tập và ưu đãi mới.</p><a href="mailto:hello@sportshoes.vn">hello@sportshoes.vn ↗</a></div>
    </div><div class="wrap footer-bottom"><span>© 2026 SportShoes. All rights reserved.</span><span>Made for movement.</span></div></footer>`;
  }

  const cartCount = document.querySelector("[data-cart-count]");
  function updateCartCount() {
    if (!cartCount || !window.SportShoesCart) {
      return;
    }
    const count = window.SportShoesCart.count();
    cartCount.textContent = count;
    document.querySelector(".cart-link")?.setAttribute(
      "aria-label",
      `Giỏ hàng, ${count} sản phẩm`,
    );
  }
  updateCartCount();
  window.addEventListener("sportshoes:cart-change", updateCartCount);
  window.addEventListener("storage", updateCartCount);

  document.querySelector("[data-menu-toggle]")?.addEventListener("click", (event) => {
    const button = event.currentTarget;
    const nav = document.querySelector("[data-main-nav]");
    const expanded = button.getAttribute("aria-expanded") === "true";
    button.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("main-nav--open", !expanded);
  });

  window.addEventListener("sportshoes:notice", (event) => {
    let notice = document.querySelector("[data-site-notice]");
    if (!notice) {
      notice = document.createElement("div");
      notice.className = "site-notice";
      notice.dataset.siteNotice = "";
      notice.setAttribute("role", "status");
      document.body.append(notice);
    }
    notice.textContent = event.detail;
    notice.classList.add("site-notice--visible");
    window.clearTimeout(notice.timeoutId);
    notice.timeoutId = window.setTimeout(
      () => notice.classList.remove("site-notice--visible"),
      2600,
    );
  });

  const bottomNavigation = document.createElement("nav");
  bottomNavigation.className = "mobile-bottom-nav";
  bottomNavigation.setAttribute("aria-label", "Điều hướng nhanh");
  bottomNavigation.innerHTML = `<a href="index.html" class="mobile-bottom-nav__item"><span aria-hidden="true">⌂</span><small>Trang chủ</small></a>
    <a href="checkout.html" class="mobile-bottom-nav__item"><span aria-hidden="true">▣</span><small>Thanh toán</small></a>
    <a href="index.html#san-pham" class="mobile-bottom-nav__item"><span aria-hidden="true">▤</span><small>Cửa hàng</small></a>
    <a href="cart.html" class="mobile-bottom-nav__item"><span aria-hidden="true">♡</span><small>Giỏ hàng</small></a>
    <a href="login.html" class="mobile-bottom-nav__item"><span aria-hidden="true">♙</span><small>Tài khoản</small></a>`;
  document.body.append(bottomNavigation);
})();
