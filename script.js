(() => {
  "use strict";

  const STORAGE = {
    cart: "wrap_district_cart_v1",
    history: "wrap_district_history_v1",
    user: "wrap_district_user_v1",
    checkoutDraft: "wrap_district_checkout_draft_v1",
    lastOrder: "wrap_district_last_order_v1",
    promoSeen: "wrap_district_promo_seen_v1"
  };

  const PAYSTACK_PUBLIC_KEY =
    window.WRAP_DISTRICT_PAYSTACK_PUBLIC_KEY ||
    window.PAYSTACK_PUBLIC_KEY ||
    "pk_test_297586e51710e83d3c159bfe71ff45c7e23411fa";

  const PROMO_WINDOW = {
    start: new Date("2026-04-28T00:00:00"),
    end: new Date("2026-05-01T23:59:59")
  };

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

  const safeLoadJSON = (key, fallback) => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  };

  const safeSaveJSON = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore storage failures.
    }
  };

  const safeGet = (key) => {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  };

  const safeSet = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Ignore storage failures.
    }
  };

  const money = (value) => {
    const num = Number(value) || 0;
    return `GHS ${num.toFixed(2)}`;
  };

  const uid = (prefix = "WD") => {
    const tail = Math.random().toString(36).slice(2, 6).toUpperCase();
    const stamp = Date.now().toString(36).slice(-5).toUpperCase();
    return `${prefix}-${stamp}${tail}`;
  };

  const nowIso = () => new Date().toISOString();

  const formatDateTime = (iso) => {
    try {
      return new Intl.DateTimeFormat("en-GH", {
        dateStyle: "medium",
        timeStyle: "short"
      }).format(new Date(iso));
    } catch {
      return iso || "";
    }
  };

  const capitalize = (text) =>
    text ? String(text).charAt(0).toUpperCase() + String(text).slice(1) : "";

  const esc = (value) =>
    String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");

  const safeText = (value) =>
    String(value ?? "")
      .replace(/\s+/g, " ")
      .trim();

  const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

  const isPromoActive = () => {
    const now = new Date();
    return now >= PROMO_WINDOW.start && now <= PROMO_WINDOW.end;
  };

  const els = {
    body: document.body,
    navDrawer: $("#mobileNav"),
    cartDrawer: $("#cartDrawer"),
    productDrawer: $("#productDrawer"),
    checkoutModal: $("#checkoutModal"),
    historyModal: $("#historyModal"),
    confirmedModal: $("#orderConfirmedModal"),
    checkoutForm: $("#checkoutForm"),
    historySearch: $("#historySearch"),
    historyList: $("#historyList"),
    cartItems: $("#cartItems"),
    cartBadge: $("#cartBadge"),
    cartSubtotal: $("#cartSubtotal"),
    cartDiscount: $("#cartDiscount"),
    cartTotal: $("#cartTotal"),
    checkoutSubtotal: $("#checkoutSubtotal"),
    checkoutDelivery: $("#checkoutDelivery"),
    checkoutDiscount: $("#checkoutDiscount"),
    checkoutTotal: $("#checkoutTotal"),
    checkoutItemsList: $("#checkoutItemsList"),
    checkoutItemsCount: $("#checkoutItemsCount"),
    orderType: $("#orderType"),
    productDrawerImg: $("#productDrawerImg"),
    productDrawerBadge: $("#productDrawerBadge"),
    productDrawerCategory: $("#productDrawerCategory"),
    productDrawerTitle: $("#productDrawerTitle"),
    productDrawerDescription: $("#productDrawerDescription"),
    productDrawerHighlights: $("#productDrawerHighlights"),
    productDrawerOptions: $("#productDrawerOptions"),
    productDrawerForm: $("#productDrawerForm"),
    productQtyMinus: $("#productQtyMinus"),
    productQtyPlus: $("#productQtyPlus"),
    productQtyValue: $("#productQtyValue"),
    addProductToCartBtn: $("#addProductToCartBtn"),
    toastStack: $("#toastStack"),
    heroSlides: $$(".hero__slide"),
    heroDots: $$(".hero-dot"),
    menuChips: $$(".menu-chip"),
    menuItems: $$(".menu-item"),
    saveInvoicePdfBtn: $("#saveInvoicePdfBtn"),
    orderConfirmedDetails: $("#orderConfirmedDetails")
  };

  const catalog = {
    shawarma: {
      id: "shawarma",
      title: "Signature Shawarma",
      categoryLabel: "Shawarma",
      badge: "Buy 2 → 1 Free",
      image:
        "https://images.unsplash.com/photo-1606756790138-261d2b21cd75?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
      description:
        "Choose size, then protein. Add extra sauce or extra cheese for a richer finish.",
      highlights: ["Promo applies automatically", "Third shawarma becomes free", "Great for sharing"],
      optionGroups: [
        {
          key: "size",
          label: "Choose size",
          type: "radio",
          required: true,
          options: [
            { label: "Lite", value: "Lite", price: 45, default: true },
            { label: "Classic", value: "Classic", price: 55 },
            { label: "District Max", value: "District Max", price: 70 }
          ]
        },
        {
          key: "protein",
          label: "Choose protein",
          type: "radio",
          required: true,
          options: [
            { label: "None", value: "None", price: 0, default: true },
            { label: "Extra Chicken", value: "Extra Chicken", price: 8 },
            { label: "Extra Sausage", value: "Extra Sausage", price: 4 },
            { label: "Mixed", value: "Mixed", price: 12 }
          ]
        },
        {
          key: "extras",
          label: "Extras",
          type: "checkbox",
          options: [
            { label: "Extra Sauce", value: "Extra Sauce", price: 5 },
            { label: "Extra Cheese", value: "Extra Cheese", price: 10 }
          ]
        }
      ]
    },

    "loaded-fries": {
      id: "loaded-fries",
      title: "Loaded Fries",
      categoryLabel: "Loaded Fries",
      badge: "Free Coke",
      image:
        "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
      description:
        "Choose a portion and load it with chicken, cheese, or sauce. A free Coke joins the cart automatically during promo hours.",
      highlights: ["Free Coke in cart", "Perfect for sharing", "Rich and crispy finish"],
      optionGroups: [
        {
          key: "portion",
          label: "Choose portion",
          type: "radio",
          required: true,
          options: [
            { label: "Regular", value: "Regular", price: 65, default: true },
            { label: "Medium", value: "Medium", price: 75 },
            { label: "Large", value: "Large", price: 85 }
          ]
        },
        {
          key: "toppings",
          label: "Toppings",
          type: "checkbox",
          options: [
            { label: "Extra Chicken", value: "Extra Chicken", price: 15 },
            { label: "Extra Cheese", value: "Extra Cheese", price: 10 },
            { label: "Extra Sauce", value: "Extra Sauce", price: 10 }
          ]
        }
      ]
    },

    "fried-rice": {
      id: "fried-rice",
      title: "Fried Rice",
      categoryLabel: "Rice",
      badge: "Classic",
      image:
        "https://images.unsplash.com/photo-1665556899022-9761f95769e5?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
      description: "Classic spiced fried rice with your choice of protein.",
      highlights: ["Chicken, beef, or gizzard", "Balanced and filling", "Freshly prepared to order"],
      optionGroups: [
        {
          key: "protein",
          label: "Choose protein",
          type: "radio",
          required: true,
          options: [
            { label: "Chicken", value: "Chicken", price: 60, default: true },
            { label: "Beef", value: "Beef", price: 60 },
            { label: "Gizzard", value: "Gizzard", price: 60 }
          ]
        }
      ]
    },

    "loaded-angwamo": {
      id: "loaded-angwamo",
      title: "Loaded Angwamo",
      categoryLabel: "Angwamo",
      badge: "New price",
      image:
        "https://images.unsplash.com/photo-1604908176997-125f25cc500f?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
      description:
        "Tiered portions with bold fillings. The new price is highlighted and the old price stays crossed out.",
      highlights: ["Basic, Classic, Max", "Lower prices now on the menu", "Bold portions, better value"],
      optionGroups: [
        {
          key: "tier",
          label: "Choose tier",
          type: "radio",
          required: true,
          options: [
            { label: "Basic", value: "Basic", price: 60, oldPrice: 65, default: true },
            { label: "Classic", value: "Classic", price: 70, oldPrice: 75 },
            { label: "Max, 5 proteins", value: "Max", price: 80, oldPrice: 85 }
          ]
        }
      ]
    },

    "loaded-jollof": {
      id: "loaded-jollof",
      title: "Loaded Jollof",
      categoryLabel: "Rice",
      badge: "New",
      image:
        "https://images.unsplash.com/photo-1665556899022-9761f95769e5?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
      description: "A hearty portion of Jungle Jumbo fully loaded jollof rice with protein and extras.",
      highlights: ["Big portion", "Packed with flavor", "A fast favorite"],
      optionGroups: []
    },

    noodles: {
      id: "noodles",
      title: "Noodles",
      categoryLabel: "Specials",
      badge: "Fast favorite",
      image:
        "https://images.unsplash.com/photo-1713810980083-229ca8c818c3?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
      description: "Assorted proteins available, made for a quick and satisfying meal.",
      highlights: ["Quick and satisfying", "Assorted proteins available", "Great for busy days"],
      optionGroups: []
    },

    coke: {
      id: "promo-coke",
      title: "Free Coke",
      categoryLabel: "Promo item",
      badge: "Free",
      image:
        "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=60&w=3000",
      description: "Free Coke added automatically with every loaded fries order during promo hours.",
      highlights: ["Automatic promo reward", "Added to cart for free", "Included during promo hours"],
      optionGroups: []
    }
  };

  const state = {
    cart: safeLoadJSON(STORAGE.cart, []),
    history: safeLoadJSON(STORAGE.history, []),
    user: safeLoadJSON(STORAGE.user, { name: "", phone: "", email: "" }),
    checkoutDraft: safeLoadJSON(STORAGE.checkoutDraft, {}),
    lastOrder: safeLoadJSON(STORAGE.lastOrder, null),
    activeHeroIndex: 0,
    heroTimer: null,
    activeModalOrder: null,
    currentProductId: null,
    currentQuantity: 1,
    currentSelections: {}
  };

  function saveState() {
    safeSaveJSON(STORAGE.cart, state.cart);
    safeSaveJSON(STORAGE.history, state.history);
    safeSaveJSON(STORAGE.user, state.user);
    safeSaveJSON(STORAGE.checkoutDraft, state.checkoutDraft);
    safeSaveJSON(STORAGE.lastOrder, state.lastOrder);
  }

  function setBodyLocked(locked) {
    document.documentElement.classList.toggle("is-locked", locked);
    els.body.classList.toggle("is-locked", locked);
  }

  function togglePanel(el, open) {
    if (!el) return;
    el.setAttribute("aria-hidden", open ? "false" : "true");
    el.classList.toggle("is-open", open);
  }

  function maybeUnlockBody() {
    const anyOpen = [
      els.navDrawer,
      els.cartDrawer,
      els.productDrawer,
      els.checkoutModal,
      els.historyModal,
      els.confirmedModal
    ].some((node) => node?.classList.contains("is-open"));

    if (!anyOpen) setBodyLocked(false);
  }

  function closeAllOverlays() {
    [
      els.navDrawer,
      els.cartDrawer,
      els.productDrawer,
      els.checkoutModal,
      els.historyModal,
      els.confirmedModal
    ].forEach((panel) => togglePanel(panel, false));
    maybeUnlockBody();
  }

  function openNavDrawer() {
    closeAllOverlays();
    togglePanel(els.navDrawer, true);
    setBodyLocked(true);
  }

  function closeNavDrawer() {
    togglePanel(els.navDrawer, false);
    maybeUnlockBody();
  }

  function openCartDrawer() {
    closeAllOverlays();
    renderCart();
    togglePanel(els.cartDrawer, true);
    setBodyLocked(true);
  }

  function closeCartDrawer() {
    togglePanel(els.cartDrawer, false);
    maybeUnlockBody();
  }

  function getDefaultSelections(product) {
    const selections = {};
    for (const group of product.optionGroups || []) {
      if (group.type === "radio") {
        const def = group.options.find((opt) => opt.default) || group.options[0];
        selections[group.key] = def?.value ?? null;
      } else if (group.type === "checkbox") {
        selections[group.key] = [];
      } else {
        selections[group.key] = group.options?.[0]?.value ?? null;
      }
    }
    return selections;
  }

  function openProductDrawer(productId) {
    const product = catalog[productId];
    if (!product) return;

    closeAllOverlays();
    state.currentProductId = productId;
    state.currentQuantity = 1;
    state.currentSelections = getDefaultSelections(product);

    populateProductDrawer(product);
    renderProductDrawerPrice();
    togglePanel(els.productDrawer, true);
    setBodyLocked(true);
  }

  function closeProductDrawer() {
    togglePanel(els.productDrawer, false);
    maybeUnlockBody();
  }

  function focusFirstElement(root) {
    const focusable = $(
      [
        'button:not([disabled])',
        "[href]",
        "input:not([disabled])",
        "select:not([disabled])",
        "textarea:not([disabled])",
        '[tabindex]:not([tabindex="-1"])'
      ].join(", "),
      root
    );

    if (focusable) {
      window.setTimeout(() => focusable.focus({ preventScroll: true }), 30);
    }
  }

  function openModal(modalEl) {
    if (!modalEl) return;
    closeAllOverlays();
    togglePanel(modalEl, true);
    setBodyLocked(true);
    focusFirstElement(modalEl);
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    togglePanel(modalEl, false);
    maybeUnlockBody();
  }

  function showToast(message) {
    if (!els.toastStack) return;

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
      <span class="toast__icon"><i class="fa-solid fa-circle-check"></i></span>
      <span class="toast__text">${esc(message)}</span>
    `;

    els.toastStack.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add("toast--show"));

    window.setTimeout(() => {
      toast.classList.remove("toast--show");
      window.setTimeout(() => toast.remove(), 250);
    }, 2600);
  }

  function renderHero(index = state.activeHeroIndex) {
    if (!els.heroSlides.length) return;

    state.activeHeroIndex = clamp(index, 0, els.heroSlides.length - 1);

    els.heroSlides.forEach((slide, i) =>
      slide.classList.toggle("hero__slide--active", i === state.activeHeroIndex)
    );

    els.heroDots.forEach((dot, i) =>
      dot.classList.toggle("hero-dot--active", i === state.activeHeroIndex)
    );
  }

  function stopHeroAutoplay() {
    if (state.heroTimer) {
      clearInterval(state.heroTimer);
      state.heroTimer = null;
    }
  }

  function startHeroAutoplay() {
    stopHeroAutoplay();
    if (els.heroSlides.length < 2) return;

    state.heroTimer = window.setInterval(() => {
      const next = (state.activeHeroIndex + 1) % els.heroSlides.length;
      renderHero(next);
    }, 6500);
  }

  function matchesFilter(itemEl, filter) {
    const cat = itemEl.dataset.category || "";
    const id = itemEl.id || "";

    if (filter === "all") return true;
    if (filter === "specials") return id === "loaded-jollof" || id === "noodles" || cat === "specials";
    if (filter === "rice") return cat === "rice" || id === "loaded-jollof" || id === "fried-rice";
    return cat === filter;
  }

  function applyMenuFilter(filter = "all") {
    els.menuItems.forEach((item) => {
      const show = matchesFilter(item, filter);
      item.hidden = !show;
      item.classList.toggle("is-hidden", !show);
    });

    els.menuChips.forEach((chip) => {
      const active = chip.dataset.filter === filter;
      chip.classList.toggle("menu-chip--active", active);
      chip.setAttribute("aria-selected", active ? "true" : "false");
    });
  }

  function populateProductDrawer(product) {
    if (!els.productDrawerImg || !els.productDrawerTitle) return;

    els.productDrawerImg.src = product.image;
    els.productDrawerImg.alt = product.title;
    if (els.productDrawerBadge) els.productDrawerBadge.textContent = product.badge;
    if (els.productDrawerCategory) els.productDrawerCategory.textContent = product.categoryLabel;
    if (els.productDrawerTitle) els.productDrawerTitle.textContent = product.title;
    if (els.productDrawerDescription) els.productDrawerDescription.textContent = product.description;

    if (els.productDrawerHighlights) {
      els.productDrawerHighlights.innerHTML = product.highlights
        .map(
          (text) => `
            <span class="product-chip">
              <i class="fa-solid fa-circle-check"></i>
              ${esc(text)}
            </span>
          `
        )
        .join("");
    }

    if (els.productDrawerOptions) {
      els.productDrawerOptions.innerHTML = product.optionGroups.length
        ? product.optionGroups
            .map(
              (group) => `
                <fieldset class="option-group" data-group="${esc(group.key)}">
                  <legend>${esc(group.label)}</legend>
                  <div class="option-group__list">
                    ${group.options
                      .map((option) => {
                        const checked =
                          group.type === "radio"
                            ? (state.currentSelections[group.key] ?? null) === option.value
                            : (state.currentSelections[group.key] || []).includes(option.value);

                        const inputType = group.type === "checkbox" ? "checkbox" : "radio";
                        const name = group.type === "checkbox" ? `${group.key}[]` : group.key;
                        const priceMarkup =
                          typeof option.oldPrice === "number"
                            ? `<span class="option-price"><del>${money(option.oldPrice)}</del> <strong>${money(option.price)}</strong></span>`
                            : `<span class="option-price"><strong>${option.price === 0 ? "Free" : `+ ${money(option.price)}`}</strong></span>`;

                        return `
                          <label class="option-pill">
                            <input
                              type="${inputType}"
                              name="${esc(name)}"
                              value="${esc(option.value)}"
                              ${checked ? "checked" : ""}
                            />
                            <span class="option-pill__text">
                              <span>${esc(option.label)}</span>
                              ${priceMarkup}
                            </span>
                          </label>
                        `;
                      })
                      .join("")}
                  </div>
                </fieldset>
              `
            )
            .join("")
        : `
          <div class="drawer-note">
            <i class="fa-solid fa-circle-check"></i>
            This one is ready to add straight to the cart.
          </div>
        `;
    }
  }

  function readProductSelections(product) {
    const selections = getDefaultSelections(product);

    for (const group of product.optionGroups || []) {
      if (group.type === "radio") {
        const selected = $(`input[name="${group.key}"]:checked`, els.productDrawerOptions);
        selections[group.key] = selected?.value ?? selections[group.key];
      } else if (group.type === "checkbox") {
        selections[group.key] = $$(`input[name="${group.key}[]"]:checked`, els.productDrawerOptions).map(
          (input) => input.value
        );
      } else {
        const input = $(`[name="${group.key}"]`, els.productDrawerOptions);
        selections[group.key] = input?.value ?? selections[group.key];
      }
    }

    return selections;
  }

  function normalizeSelections(selections) {
    const out = {};
    Object.keys(selections || {})
      .sort()
      .forEach((key) => {
        const value = selections[key];
        out[key] = Array.isArray(value) ? [...value].sort() : value;
      });
    return out;
  }

  function makeLineKey(productId, selections) {
    return `${productId}::${JSON.stringify(normalizeSelections(selections))}`;
  }

  function computeUnitPrice(productId, selections) {
    if (productId === "loaded-jollof") return 85;
    if (productId === "noodles") return 50;
    if (productId === "fried-rice") return 60;

    if (productId === "loaded-angwamo") {
      const tier = selections.tier || "Basic";
      if (tier === "Classic") return 70;
      if (tier === "Max") return 80;
      return 60;
    }

    if (productId === "shawarma") {
      const size = selections.size || "Lite";
      const protein = selections.protein || "None";
      const extras = selections.extras || [];

      let price = size === "Classic" ? 55 : size === "District Max" ? 70 : 45;
      price += protein === "Extra Chicken" ? 8 : protein === "Extra Sausage" ? 4 : protein === "Mixed" ? 12 : 0;
      price += extras.includes("Extra Sauce") ? 5 : 0;
      price += extras.includes("Extra Cheese") ? 10 : 0;
      return price;
    }

    if (productId === "loaded-fries") {
      const portion = selections.portion || "Regular";
      const toppings = selections.toppings || [];

      let price = portion === "Medium" ? 75 : portion === "Large" ? 85 : 65;
      price += toppings.includes("Extra Chicken") ? 15 : 0;
      price += toppings.includes("Extra Cheese") ? 10 : 0;
      price += toppings.includes("Extra Sauce") ? 10 : 0;
      return price;
    }

    return 0;
  }

  function getSelectionLabel(productId, selections) {
    if (productId === "loaded-jollof" || productId === "noodles") return "";

    if (productId === "fried-rice") {
      return selections.protein || "";
    }

    if (productId === "loaded-angwamo") {
      return selections.tier || "Basic";
    }

    if (productId === "shawarma") {
      const parts = [];
      if (selections.size) parts.push(selections.size);
      if (selections.protein && selections.protein !== "None") parts.push(selections.protein);
      if (Array.isArray(selections.extras)) parts.push(...selections.extras);
      return parts.join(" • ");
    }

    if (productId === "loaded-fries") {
      const parts = [];
      if (selections.portion) parts.push(selections.portion);
      if (Array.isArray(selections.toppings)) parts.push(...selections.toppings);
      return parts.join(" • ");
    }

    return "";
  }

  function buildCartLineFromProduct(productId, selections, qty) {
    const product = catalog[productId];
    const unitPrice = computeUnitPrice(productId, selections);

    return {
      id: uid("ITEM"),
      productId,
      lineKey: makeLineKey(productId, selections),
      name: product.title,
      categoryLabel: product.categoryLabel,
      image: product.image,
      qty,
      unitPrice,
      selections: normalizeSelections(selections),
      note: getSelectionLabel(productId, selections),
      isPromo: false
    };
  }

  function addItemToCart(productId, quantity = 1, selections = null, quiet = false) {
    const product = catalog[productId];
    if (!product) return;

    const resolvedSelections = selections || getDefaultSelections(product);
    const lineKey = makeLineKey(productId, resolvedSelections);
    const existing = state.cart.find((item) => item.lineKey === lineKey && !item.isPromo);
    const unitPrice = computeUnitPrice(productId, resolvedSelections);

    if (existing) {
      existing.qty += quantity;
      existing.unitPrice = unitPrice;
      existing.note = getSelectionLabel(productId, resolvedSelections);
      existing.selections = normalizeSelections(resolvedSelections);
    } else {
      state.cart.push({
        id: uid("ITEM"),
        productId,
        lineKey,
        name: product.title,
        categoryLabel: product.categoryLabel,
        image: product.image,
        qty: quantity,
        unitPrice,
        selections: normalizeSelections(resolvedSelections),
        note: getSelectionLabel(productId, resolvedSelections),
        isPromo: false
      });
    }

    saveState();
    renderCart();

    if (!quiet) showToast(`${product.title} added to your cart.`);
  }

  function addSimpleItem(productId) {
    const product = catalog[productId];
    if (!product) return;

    const line = buildCartLineFromProduct(productId, getDefaultSelections(product), 1);
    const existing = state.cart.find((item) => item.lineKey === line.lineKey && !item.isPromo);

    if (existing) {
      existing.qty += 1;
    } else {
      state.cart.push(line);
    }

    saveState();
    renderCart();
    showToast(`${product.title} added to your cart.`);
  }

  function removeCartItem(lineKey) {
    state.cart = state.cart.filter((item) => item.lineKey !== lineKey);
    saveState();
    renderCart();
  }

  function setCartItemQty(lineKey, nextQty) {
    state.cart = state.cart
      .map((item) => (item.lineKey === lineKey ? { ...item, qty: nextQty } : item))
      .filter((item) => item.qty > 0);

    saveState();
    renderCart();
  }

  function computeDiscountAndPromos(baseLines) {
    const shawarmaUnits = [];
    let friesQty = 0;

    for (const item of baseLines) {
      if (item.productId === "shawarma") {
        for (let i = 0; i < item.qty; i += 1) {
          shawarmaUnits.push({ price: Number(item.unitPrice) || 0 });
        }
      }

      if (item.productId === "loaded-fries") {
        friesQty += item.qty;
      }
    }

    shawarmaUnits.sort((a, b) => a.price - b.price);
    const freeShawarmaCount = Math.floor(shawarmaUnits.length / 3);
    const shawarmaDiscount = shawarmaUnits
      .slice(0, freeShawarmaCount)
      .reduce((sum, unit) => sum + unit.price, 0);

    const promoItems = [];

    if (isPromoActive() && friesQty > 0) {
      promoItems.push({
        id: "promo-coke",
        productId: "promo-coke",
        lineKey: `promo-coke::${friesQty}`,
        name: "Free Coke",
        categoryLabel: "Promo item",
        image: catalog.coke.image,
        qty: friesQty,
        unitPrice: 0,
        note: "With Loaded Fries promo",
        isPromo: true
      });
    }

    return {
      discount: shawarmaDiscount,
      promoItems
    };
  }

  function getResolvedCart() {
    const base = state.cart.filter((item) => !item.isPromo);
    const promoState = computeDiscountAndPromos(base);
    const lines = [...base, ...promoState.promoItems];
    const subtotal = computeSubtotal(lines);
    const total = Math.max(0, subtotal - promoState.discount);

    return {
      lines,
      discount: promoState.discount,
      subtotal,
      total
    };
  }

  function computeSubtotal(lines) {
    return lines.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
  }

  function createEmptyState(text) {
    const wrap = document.createElement("div");
    wrap.className = "empty-state";
    wrap.innerHTML = `
      <i class="fa-solid fa-bag-shopping"></i>
      <p>${esc(text)}</p>
    `;
    return wrap;
  }

  function createCartItemNode(item) {
    const template = $("#cartItemTemplate");
    const node = template
      ? template.content.firstElementChild.cloneNode(true)
      : document.createElement("article");

    const img = $(".cart-item__thumb", node);
    const title = $("h3", node);
    const note = $("p", node);
    const qty = $(".cart-item__qty", node);
    const price = $(".cart-item__price", node);
    const minus = $(".quantity-btn--minus", node);
    const plus = $(".quantity-btn--plus", node);
    const remove = $(".cart-item__remove", node);

    if (img) {
      img.src = item.image;
      img.alt = item.name;
    }

    if (title) title.textContent = item.name;
    if (note) note.textContent = item.note || item.categoryLabel || "";
    if (qty) qty.textContent = String(item.qty);
    if (price) price.textContent = item.unitPrice === 0 ? "Free" : money(item.unitPrice * item.qty);

    if (item.isPromo) {
      if (minus) minus.disabled = true;
      if (plus) plus.disabled = true;
      if (remove) remove.hidden = true;
      if (note) note.textContent = item.note || "Promo reward";
    } else {
      if (minus) minus.addEventListener("click", () => setCartItemQty(item.lineKey, item.qty - 1));
      if (plus) plus.addEventListener("click", () => setCartItemQty(item.lineKey, item.qty + 1));
      if (remove) remove.addEventListener("click", () => removeCartItem(item.lineKey));
    }

    return node;
  }

  function renderCheckoutItems(lines = []) {
    if (!els.checkoutItemsList || !els.checkoutItemsCount) return;

    const visibleLines = lines.filter((item) => !item.isPromo);
    const totalItems = visibleLines.reduce((sum, item) => sum + item.qty, 0);

    els.checkoutItemsCount.textContent = totalItems === 1 ? "1 item" : `${totalItems} items`;
    els.checkoutItemsList.innerHTML = "";

    if (!lines.length) {
      els.checkoutItemsList.innerHTML = `
        <div class="checkout-item-empty">Your cart is empty.</div>
      `;
      return;
    }

    lines.forEach((item) => {
      const row = document.createElement("div");
      row.className = "checkout-item";

      const selectionsText = item.note
        ? item.note
        : item.selections && Object.keys(item.selections).length
          ? Object.entries(item.selections)
              .map(([key, value]) => {
                const pretty = Array.isArray(value) ? value.join(", ") : value;
                return `${capitalize(key)}: ${pretty}`;
              })
              .join(" • ")
          : item.categoryLabel || "";

      row.innerHTML = `
        <img class="checkout-item__thumb" src="${esc(item.image)}" alt="${esc(item.name)}" />
        <div class="checkout-item__info">
          <h4>${esc(item.name)}</h4>
          <p>${esc(selectionsText)}</p>
          <span>${esc(item.qty)} × ${item.unitPrice === 0 ? "Free" : money(item.unitPrice)}</span>
        </div>
        <strong class="checkout-item__price">
          ${item.unitPrice === 0 ? "Free" : money(item.unitPrice * item.qty)}
        </strong>
      `;
      els.checkoutItemsList.appendChild(row);
    });
  }

  function renderCart() {
    const cartState = getResolvedCart();
    const { lines, discount, subtotal } = cartState;

    if (!els.cartItems) return cartState;

    els.cartItems.innerHTML = "";

    if (!lines.length) {
      els.cartItems.appendChild(createEmptyState("Your cart is empty. Add something delicious."));
    } else {
      lines.forEach((item) => els.cartItems.appendChild(createCartItemNode(item)));
    }

    const count = lines.reduce((sum, item) => sum + item.qty, 0);
    if (els.cartBadge) els.cartBadge.textContent = String(count);
    if (els.cartSubtotal) els.cartSubtotal.textContent = money(subtotal);
    if (els.cartDiscount) els.cartDiscount.textContent = money(discount);
    if (els.cartTotal) els.cartTotal.textContent = money(cartState.total);

    if (els.checkoutSubtotal) els.checkoutSubtotal.textContent = money(subtotal);
    if (els.checkoutDiscount) els.checkoutDiscount.textContent = money(discount);
    if (els.checkoutTotal) els.checkoutTotal.textContent = money(cartState.total);
    if (els.checkoutDelivery) els.checkoutDelivery.textContent = "Calculated after checkout";

    renderCheckoutItems(lines);

    return cartState;
  }

  function renderProductDrawerPrice() {
    const product = catalog[state.currentProductId];
    if (!product) return;

    const selections = readProductSelections(product);
    const unitPrice = computeUnitPrice(product.id, selections);
    const total = unitPrice * state.currentQuantity;

    if (els.productQtyValue) els.productQtyValue.textContent = String(state.currentQuantity);
    if (els.productQtyMinus) els.productQtyMinus.disabled = state.currentQuantity <= 1;
    if (els.productQtyPlus) els.productQtyPlus.disabled = state.currentQuantity >= 99;

    if (els.addProductToCartBtn) {
      els.addProductToCartBtn.dataset.price = String(total);
      els.addProductToCartBtn.textContent = total > 0 ? `Add to cart • ${money(total)}` : "Add to cart";
    }
  }

  function updateCurrentQuantity(next) {
    state.currentQuantity = clamp(Number(next) || 1, 1, 99);
    if (els.productQtyValue) els.productQtyValue.textContent = String(state.currentQuantity);
    renderProductDrawerPrice();
  }

  function renderHistory(filter = "") {
    if (!els.historyList) return;

    const query = filter.trim().toLowerCase();
    const records = [...state.history].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

    const filtered = records.filter((order) => {
      const hay = `${order.reference} ${order.name} ${order.phone}`.toLowerCase();
      return !query || hay.includes(query);
    });

    els.historyList.innerHTML = "";

    if (!filtered.length) {
      els.historyList.appendChild(createEmptyHistoryState());
      return;
    }

    filtered.forEach((order) => els.historyList.appendChild(createHistoryItem(order)));
  }

  function createEmptyHistoryState() {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "history-empty";
    btn.innerHTML = `
      <i class="fa-regular fa-folder-open"></i>
      <span>No purchases found yet.</span>
    `;
    return btn;
  }

  function createHistoryItem(order) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "history-item";
    btn.dataset.reference = order.reference;
    btn.innerHTML = `
      <div class="history-item__main">
        <strong>${esc(order.reference)}</strong>
        <span>${esc(order.name)}</span>
      </div>
      <div class="history-item__meta">
        <span>${esc(order.phone)}</span>
        <strong>${esc(money(order.total))}</strong>
      </div>
    `;

    btn.addEventListener("click", () => openOrderSummary(order));
    return btn;
  }

  function createOrderItemsMarkup(order) {
    return (order.items || [])
      .map((item) => {
        const detailParts = [];
        if (item.note) detailParts.push(item.note);
        if (item.selections && Object.keys(item.selections).length) {
          detailParts.push(
            Object.entries(item.selections)
              .map(([key, value]) => {
                const pretty = Array.isArray(value) ? value.join(", ") : value;
                return `${capitalize(key)}: ${pretty}`;
              })
              .join(" • ")
          );
        }
        const detailText = detailParts.filter(Boolean).join(" • ");

        return `
          <div class="success-item">
            <span>${esc(item.qty)} x ${esc(item.name)}${detailText ? ` <small>(${esc(detailText)})</small>` : ""}</span>
            <strong>${item.unitPrice === 0 ? "Free" : esc(money(item.unitPrice * item.qty))}</strong>
          </div>
        `;
      })
      .join("");
  }

  function openOrderSummary(order) {
    state.activeModalOrder = order;

    if (!els.orderConfirmedDetails) return;

    els.orderConfirmedDetails.innerHTML = `
      <div class="success-grid">
        <p><strong>Reference:</strong> ${esc(order.reference)}</p>
        <p><strong>Name:</strong> ${esc(order.name)}</p>
        <p><strong>Phone:</strong> ${esc(order.phone)}</p>
        <p><strong>Email:</strong> ${esc(order.email)}</p>
        <p><strong>Order type:</strong> ${esc(capitalize(order.orderType))}</p>
        <p><strong>Address:</strong> ${esc(order.address)}</p>
        <p><strong>Preferred date:</strong> ${esc(order.preferredDate || "—")}</p>
        <p><strong>Preferred time:</strong> ${esc(order.preferredTime || "—")}</p>
        <p><strong>Notes:</strong> ${esc(order.notes || "None")}</p>
        <p><strong>Timestamp:</strong> ${esc(formatDateTime(order.timestamp))}</p>
      </div>
      <div class="success-total">
        <span>Total</span>
        <strong>${esc(money(order.total))}</strong>
      </div>
      <div class="success-items">
        ${createOrderItemsMarkup(order)}
      </div>
    `;

    openModal(els.confirmedModal);
  }

  function buildOrderObject(formData, paymentRef) {
    const cartState = getResolvedCart();

    return {
      reference: uid("WD"),
      paymentRef,
      name: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      orderType: String(formData.get("orderType") || "delivery"),
      address: String(formData.get("address") || "").trim(),
      preferredDate: String(formData.get("preferredDate") || ""),
      preferredTime: String(formData.get("preferredTime") || ""),
      notes: String(formData.get("notes") || "").trim(),
      timestamp: nowIso(),
      items: cartState.lines.map((item) => ({
        ...item,
        total: item.unitPrice * item.qty
      })),
      subtotal: cartState.subtotal,
      discount: cartState.discount,
      total: cartState.total
    };
  }

  function createInvoicePdf(order) {
    const JsPDF = window.jspdf?.jsPDF;
    if (!JsPDF || typeof window.jspdf?.jsPDF !== "function") return null;

    const doc = new JsPDF({
      orientation: "p",
      unit: "mm",
      format: "a4"
    });

    if (typeof doc.autoTable !== "function") {
      return null;
    }

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 14;
    const contentWidth = pageWidth - margin * 2;
    const dark = [17, 17, 17];
    const soft = [245, 245, 245];
    const accent = [255, 179, 71];
    const muted = [96, 96, 96];

    let y = 14;

    doc.setFillColor(...dark);
    doc.roundedRect(margin, y, contentWidth, 28, 5, 5, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("WRAP District", margin + 8, y + 11);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text("Tema Community 25, Devtraco", margin + 8, y + 18);

    doc.setFillColor(...accent);
    doc.roundedRect(pageWidth - margin - 48, y + 8, 40, 10, 2, 2, "F");
    doc.setTextColor(17, 17, 17);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("RECEIPT", pageWidth - margin - 28, y + 14, { align: "center" });

    y += 36;

    doc.setFillColor(...soft);
    doc.roundedRect(margin, y, contentWidth, 20, 4, 4, "F");
    doc.setTextColor(...dark);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("Order Receipt", margin + 8, y + 8);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(...muted);
    doc.text(`Reference: ${safeText(order.reference)}`, margin + 8, y + 15);
    doc.text(`Timestamp: ${formatDateTime(order.timestamp)}`, pageWidth - margin - 8, y + 15, {
      align: "right"
    });

    y += 28;

    const ensureSpace = (needed) => {
      if (y + needed > pageHeight - 18) {
        doc.addPage();
        y = 16;
      }
    };

    const writeLabelValue = (label, value) => {
      ensureSpace(9);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.setTextColor(72, 72, 72);
      doc.text(label, margin, y);

      doc.setFont("helvetica", "normal");
      doc.setTextColor(22, 22, 22);
      const lines = doc.splitTextToSize(safeText(value || "None"), contentWidth - 48);
      doc.text(lines, margin + 42, y);
      y += Math.max(6, lines.length * 5.5);
    };

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(...dark);
    doc.text("Customer details", margin, y);
    y += 6;

    writeLabelValue("Name:", order.name);
    writeLabelValue("Phone:", order.phone);
    writeLabelValue("Email:", order.email);
    writeLabelValue("Order type:", capitalize(order.orderType));
    writeLabelValue("Address:", order.address);
    writeLabelValue("Preferred date:", order.preferredDate);
    writeLabelValue("Preferred time:", order.preferredTime);
    writeLabelValue("Notes:", order.notes || "None");

    y += 4;
    ensureSpace(30);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(...dark);
    doc.text("Items purchased", margin, y);
    y += 4;

    const rows = (order.items || []).map((item) => {
      const selectionText =
        item.note ||
        (item.selections && Object.keys(item.selections).length
          ? Object.entries(item.selections)
              .map(([key, value]) => {
                const pretty = Array.isArray(value) ? value.join(", ") : value;
                return `${capitalize(key)}: ${pretty}`;
              })
              .join(" • ")
          : "");

      return [
        safeText(item.name),
        safeText(selectionText || item.categoryLabel || "None"),
        String(item.qty),
        item.unitPrice === 0 ? "Free" : money(item.unitPrice),
        item.unitPrice === 0 ? "Free" : money(item.unitPrice * item.qty)
      ];
    });

    doc.autoTable({
      startY: y,
      head: [["Item", "Details", "Qty", "Unit price", "Line total"]],
      body: rows.length ? rows : [["No items", "-", "-", "-", "-"]],
      theme: "grid",
      margin: { left: margin, right: margin },
      styles: {
        font: "helvetica",
        fontSize: 9,
        cellPadding: 3,
        textColor: [25, 25, 25],
        lineColor: [225, 225, 225],
        lineWidth: 0.2
      },
      headStyles: {
        fillColor: dark,
        textColor: 255,
        fontStyle: "bold"
      },
      alternateRowStyles: {
        fillColor: [250, 250, 250]
      },
      columnStyles: {
        2: { halign: "center" },
        3: { halign: "right" },
        4: { halign: "right" }
      }
    });

    y = doc.lastAutoTable.finalY + 10;

    ensureSpace(40);
    doc.setFillColor(...soft);
    doc.roundedRect(margin, y, contentWidth, 34, 4, 4, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...muted);
    doc.text("Subtotal", margin + 8, y + 10);
    doc.text("Delivery", margin + 8, y + 17);
    doc.text("Promo discount", margin + 8, y + 24);
    doc.text("Total", margin + 8, y + 31);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(...dark);
    doc.text(money(order.subtotal), margin + contentWidth - 8, y + 10, { align: "right" });
    doc.text("Calculated after checkout", margin + contentWidth - 8, y + 17, { align: "right" });
    doc.text(money(order.discount), margin + contentWidth - 8, y + 24, { align: "right" });
    doc.setFont("helvetica", "bold");
    doc.text(money(order.total), margin + contentWidth - 8, y + 31, { align: "right" });

    doc.setFont("helvetica", "italic");
    doc.setFontSize(9);
    doc.setTextColor(...muted);
    doc.text(
      "Thank you for ordering from WRAP District.",
      pageWidth / 2,
      pageHeight - 12,
      { align: "center" }
    );

    return doc;
  }

  function saveInvoicePdf(order) {
    try {
      const doc = createInvoicePdf(order);

      if (!doc) {
        showToast("PDF could not be generated. Make sure jsPDF and AutoTable are loaded.");
        return;
      }

      doc.save(`WRAP-District-${safeText(order.reference)}.pdf`);
    } catch (error) {
      console.error("PDF generation failed:", error);
      showToast("PDF could not be generated.");
    }
  }

  function syncCheckoutFields() {
    if (!els.checkoutForm) return;

    const { name, phone, email } = state.user || {};
    const draft = state.checkoutDraft || {};

    const nameInput = els.checkoutForm.elements.namedItem("name");
    const phoneInput = els.checkoutForm.elements.namedItem("phone");
    const emailInput = els.checkoutForm.elements.namedItem("email");
    const addressInput = els.checkoutForm.elements.namedItem("address");
    const dateInput = els.checkoutForm.elements.namedItem("preferredDate");
    const timeInput = els.checkoutForm.elements.namedItem("preferredTime");
    const notesInput = els.checkoutForm.elements.namedItem("notes");
    const orderTypeInput = els.checkoutForm.elements.namedItem("orderType");

    if (nameInput) nameInput.value = draft.name ?? name ?? "";
    if (phoneInput) phoneInput.value = draft.phone ?? phone ?? "";
    if (emailInput) emailInput.value = draft.email ?? email ?? "";
    if (addressInput) addressInput.value = draft.address ?? "";
    if (dateInput) dateInput.value = draft.preferredDate ?? "";
    if (timeInput) timeInput.value = draft.preferredTime ?? "";
    if (notesInput) notesInput.value = draft.notes ?? "";
    if (orderTypeInput && draft.orderType) orderTypeInput.value = draft.orderType;

    updateOrderTypePlaceholder();
  }

  function updateOrderTypePlaceholder() {
    if (!els.checkoutForm || !els.orderType) return;

    const addressField = els.checkoutForm.elements.namedItem("address");
    if (!addressField) return;

    addressField.placeholder = els.orderType.value === "pickup" ? "Pickup at Devtraco" : "Delivery address";
  }

  function persistCheckoutDraft() {
    if (!els.checkoutForm) return;

    const fd = new FormData(els.checkoutForm);
    state.checkoutDraft = {
      name: String(fd.get("name") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      address: String(fd.get("address") || "").trim(),
      preferredDate: String(fd.get("preferredDate") || ""),
      preferredTime: String(fd.get("preferredTime") || ""),
      notes: String(fd.get("notes") || "").trim(),
      orderType: String(fd.get("orderType") || "delivery")
    };

    saveState();
  }

  function openHistoryModal() {
    renderHistory(els.historySearch?.value || "");
    openModal(els.historyModal);
  }

  function openCheckoutModal() {
    const cartState = getResolvedCart();
    if (!cartState.lines.length) {
      showToast("Add at least one item before checkout.");
      return;
    }

    renderCart();
    renderCheckoutItems(cartState.lines);
    syncCheckoutFields();
    openModal(els.checkoutModal);
  }

  function openProductFromButton(btn) {
    const id = btn?.dataset?.openProduct;
    if (id && catalog[id]) openProductDrawer(id);
  }

  function buildPaystackMetadata(customer, cartState, paymentRef) {
    const itemsText = cartState.lines
      .map((item) => {
        const parts = [];
        if (item.note) parts.push(item.note);
        if (item.isPromo) parts.push("Promo item");
        if (item.selections && Object.keys(item.selections).length) {
          const selectionText = Object.entries(item.selections)
            .map(([key, value]) => {
              const pretty = Array.isArray(value) ? value.join(", ") : value;
              return `${capitalize(key)}: ${pretty}`;
            })
            .join(" • ");
          if (selectionText) parts.push(selectionText);
        }

        return `${item.qty} x ${safeText(item.name)}${parts.length ? ` — ${parts.join(" | ")}` : ""}`;
      })
      .join(" || ");

    const itemsJson = cartState.lines.map((item) => ({
      productId: item.productId,
      name: item.name,
      categoryLabel: item.categoryLabel,
      qty: item.qty,
      unitPrice: item.unitPrice,
      lineTotal: item.unitPrice * item.qty,
      note: item.note || "",
      selections: item.selections || {},
      isPromo: !!item.isPromo
    }));

    return {
      customer_name: customer.name,
      customer_phone: customer.phone,
      customer_email: customer.email,
      order_type: customer.orderType,
      address: customer.address,
      preferred_date: customer.preferredDate,
      preferred_time: customer.preferredTime,
      notes: customer.notes || "",
      cart_reference: paymentRef,
      subtotal: cartState.subtotal,
      discount: cartState.discount,
      total: cartState.total,
      items_json: JSON.stringify(itemsJson),
      items_text: itemsText,
      custom_fields: [
        { display_name: "Order Reference", variable_name: "order_reference", value: paymentRef },
        { display_name: "Name", variable_name: "name", value: customer.name },
        { display_name: "Email", variable_name: "email", value: customer.email },
        { display_name: "Phone", variable_name: "phone", value: customer.phone },
        { display_name: "Order Type", variable_name: "order_type", value: capitalize(customer.orderType) },
        { display_name: "Address", variable_name: "address", value: customer.address },
        { display_name: "Preferred Date", variable_name: "preferred_date", value: customer.preferredDate },
        { display_name: "Preferred Time", variable_name: "preferred_time", value: customer.preferredTime },
        { display_name: "Notes", variable_name: "notes", value: customer.notes || "None" },
        { display_name: "Items", variable_name: "items", value: itemsText || "None" },
        { display_name: "Subtotal", variable_name: "subtotal", value: money(cartState.subtotal) },
        { display_name: "Promo Discount", variable_name: "promo_discount", value: money(cartState.discount) },
        { display_name: "Total", variable_name: "total", value: money(cartState.total) }
      ]
    };
  }

  function handleCheckoutSubmit(formEl) {
    const data = new FormData(formEl);
    const name = String(data.get("name") || "").trim();
    const phone = String(data.get("phone") || "").trim();
    const email = String(data.get("email") || "").trim();
    const address = String(data.get("address") || "").trim();
    const orderType = String(data.get("orderType") || "delivery");
    const preferredDate = String(data.get("preferredDate") || "");
    const preferredTime = String(data.get("preferredTime") || "");
    const notes = String(data.get("notes") || "").trim();

    const cartState = getResolvedCart();

    if (!cartState.lines.length) {
      showToast("Add at least one item to continue.");
      return;
    }

    if (!name || !phone || !email || !address || !preferredDate || !preferredTime) {
      showToast("Please complete all required details.");
      return;
    }

    state.user = { name, phone, email };
    state.checkoutDraft = { name, phone, email, address, preferredDate, preferredTime, notes, orderType };
    saveState();

    const paymentMethod = formEl.querySelector('input[name="paymentMethod"]:checked')?.value || "paystack";
    const paymentRef = `PAY-${Date.now().toString(36).toUpperCase()}`;
    const metadata = buildPaystackMetadata(
      { name, phone, email, address, orderType, preferredDate, preferredTime, notes },
      cartState,
      paymentRef
    );

    const finalizeOrder = () => {
      const order = buildOrderObject(data, paymentRef);

      state.lastOrder = order;
      state.history.unshift(order);
      state.cart = [];
      saveState();

      renderCart();
      renderHistory(els.historySearch?.value || "");
      openOrderSummary(order);

      formEl.reset();
      if (els.orderType) els.orderType.value = "delivery";
      updateOrderTypePlaceholder();
      syncCheckoutFields();

      showToast(`Order confirmed for ${name}.`);
    };

    const canUsePaystack =
      paymentMethod === "paystack" &&
      typeof window.PaystackPop !== "undefined" &&
      PAYSTACK_PUBLIC_KEY &&
      !PAYSTACK_PUBLIC_KEY.includes("your_public_key_here");

    if (canUsePaystack) {
      try {
        const handler = window.PaystackPop.setup({
          key: PAYSTACK_PUBLIC_KEY,
          email,
          amount: Math.round(cartState.total * 100),
          currency: "GHS",
          ref: paymentRef,
          metadata,
          callback: () => finalizeOrder(),
          onClose: () => showToast("Payment window closed.")
        });

        handler.openIframe();
      } catch (error) {
        console.error("Paystack setup failed:", error);
        showToast("Payment could not be started. Completing the order in demo mode.");
        finalizeOrder();
      }
    } else {
      if (paymentMethod === "paystack") {
        showToast("Paystack is not configured yet. Completing the order in demo mode.");
      }
      window.setTimeout(finalizeOrder, 300);
    }
  }

  function handleProductFormSubmit(event) {
    event.preventDefault();

    const product = catalog[state.currentProductId];
    if (!product) return;

    const selections = readProductSelections(product);
    addItemToCart(product.id, state.currentQuantity, selections);
    closeProductDrawer();
  }

  function bindEvents() {
    document.addEventListener("click", (event) => {
      const action = event.target.closest(
        [
          "[data-open-product]",
          "[data-add-item]",
          "[data-filter]",
          "[data-go-slide]",
          "[data-open-nav]",
          "[data-open-cart]",
          "[data-open-history]",
          "[data-open-checkout]",
          "[data-open-search]",
          "[data-close-nav]",
          "[data-close-cart]",
          "[data-close-product]",
          "[data-close-modal]"
        ].join(", ")
      );

      if (!action) return;

      if (action.matches("[data-open-nav]")) {
        event.preventDefault();
        openNavDrawer();
        return;
      }

      if (action.matches("[data-open-cart]")) {
        event.preventDefault();
        openCartDrawer();
        return;
      }

      if (action.matches("[data-open-history]")) {
        event.preventDefault();
        openHistoryModal();
        return;
      }

      if (action.matches("[data-open-checkout]")) {
        event.preventDefault();
        openCheckoutModal();
        return;
      }

      if (action.matches("[data-open-search]")) {
        event.preventDefault();
        $("#menu")?.scrollIntoView({ behavior: "smooth", block: "start" });
        showToast("Browse the menu below.");
        return;
      }

      if (action.matches("[data-open-product]")) {
        event.preventDefault();
        openProductFromButton(action);
        return;
      }

      if (action.matches("[data-add-item]")) {
        event.preventDefault();
        addSimpleItem(action.dataset.addItem);
        return;
      }

      if (action.matches("[data-filter]")) {
        event.preventDefault();
        applyMenuFilter(action.dataset.filter || "all");
        return;
      }

      if (action.matches("[data-go-slide]")) {
        event.preventDefault();
        renderHero(Number(action.dataset.goSlide || 0));
        stopHeroAutoplay();
        startHeroAutoplay();
        return;
      }

      if (action.matches("[data-close-nav]")) {
        event.preventDefault();
        closeNavDrawer();
        return;
      }

      if (action.matches("[data-close-cart]")) {
        event.preventDefault();
        closeCartDrawer();
        return;
      }

      if (action.matches("[data-close-product]")) {
        event.preventDefault();
        closeProductDrawer();
        return;
      }

      if (action.matches("[data-close-modal]")) {
        event.preventDefault();
        const modal = action.closest(".modal");
        if (modal) closeModal(modal);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key !== "Escape") return;

      if (els.productDrawer?.classList.contains("is-open")) return closeProductDrawer();
      if (els.cartDrawer?.classList.contains("is-open")) return closeCartDrawer();
      if (els.navDrawer?.classList.contains("is-open")) return closeNavDrawer();
      if (els.checkoutModal?.classList.contains("is-open")) return closeModal(els.checkoutModal);
      if (els.historyModal?.classList.contains("is-open")) return closeModal(els.historyModal);
      if (els.confirmedModal?.classList.contains("is-open")) return closeModal(els.confirmedModal);
    });

    if (els.productDrawerOptions) {
      els.productDrawerOptions.addEventListener("change", () => {
        renderProductDrawerPrice();
      });
    }

    if (els.productDrawerForm) {
      els.productDrawerForm.addEventListener("submit", handleProductFormSubmit);
    }

    if (els.productQtyMinus) {
      els.productQtyMinus.addEventListener("click", () => updateCurrentQuantity(state.currentQuantity - 1));
    }

    if (els.productQtyPlus) {
      els.productQtyPlus.addEventListener("click", () => updateCurrentQuantity(state.currentQuantity + 1));
    }

    if (els.checkoutForm) {
      els.checkoutForm.addEventListener("submit", (event) => {
        event.preventDefault();
        handleCheckoutSubmit(els.checkoutForm);
      });

      els.checkoutForm.addEventListener("input", persistCheckoutDraft);
      els.checkoutForm.addEventListener("change", persistCheckoutDraft);
    }

    if (els.orderType) {
      els.orderType.addEventListener("change", () => {
        updateOrderTypePlaceholder();
        persistCheckoutDraft();
      });
    }

    if (els.historySearch) {
      els.historySearch.addEventListener("input", () => renderHistory(els.historySearch.value));
    }

    if (els.saveInvoicePdfBtn) {
      els.saveInvoicePdfBtn.addEventListener("click", () => {
        if (state.activeModalOrder) {
          saveInvoicePdf(state.activeModalOrder);
        } else if (state.lastOrder) {
          saveInvoicePdf(state.lastOrder);
        } else {
          showToast("No invoice is available yet.");
        }
      });
    }

    const heroSlider = $("#heroSlider");
    if (heroSlider) {
      heroSlider.addEventListener("pointerenter", stopHeroAutoplay);
      heroSlider.addEventListener("pointerleave", startHeroAutoplay);
    }

    document.addEventListener(
      "touchstart",
      () => {
        stopHeroAutoplay();
        startHeroAutoplay();
      },
      { passive: true }
    );

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) stopHeroAutoplay();
      else startHeroAutoplay();
    });
  }

  function showEntryPromoIfNeeded() {
    if (!isPromoActive()) return;
    if (safeGet(STORAGE.promoSeen)) return;

    safeSet(STORAGE.promoSeen, "1");
    showToast("This week only: Buy 2 shawarmas, get 1 free. Loaded fries come with a free Coke.");
  }

  function init() {
    renderHero(0);
    applyMenuFilter("all");
    renderCart();
    renderHistory("");
    syncCheckoutFields();
    bindEvents();
    startHeroAutoplay();
    showEntryPromoIfNeeded();
  }

  document.readyState === "loading"
    ? document.addEventListener("DOMContentLoaded", init)
    : init();
})();
