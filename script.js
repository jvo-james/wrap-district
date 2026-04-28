(() => {
  "use strict";

  const STORAGE_KEYS = {
    cart: "wrapdistrict_cart_v1",
    history: "wrapdistrict_purchase_history_v1",
    lastOrder: "wrapdistrict_last_order_v1",
    user: "wrapdistrict_user_v1",
    preorder: "wrapdistrict_preorder_v1",
    promoHide: "wrapdistrict_entry_promo_hide_v1",
    selections: "wrapdistrict_menu_selections_v1",
  };

  const PROMO_WINDOW = {
    start: new Date("2026-04-28T00:00:00"),
    end: new Date("2026-05-01T23:59:59"),
  };

  const PAYMENT_FEES = {
    paystackPercent: 1.95,
    mtnWithdrawalPercent: 1.5,
  };

  const PAYSTACK_PUBLIC_KEY =
    window.WRAPDISTRICT_PAYSTACK_PUBLIC_KEY || "pk_test_REPLACE_ME";

  const HERO_INTERVAL_MS = 6500;

  const products = {
    shawarma: {
      id: "shawarma",
      title: "Shawarma",
      badge: "Buy 2 → 1 Free",
      category: "shawarma",
      image:
        "https://images.unsplash.com/photo-1626700051175-6818013f7d4c?auto=format&fit=crop&w=1200&q=80",
      description:
        "Choose size, then protein. Clear pricing tiers with extra sauce and cheese available.",
      groups: [
        {
          key: "size",
          label: "Choose a size",
          type: "radio",
          required: true,
          options: [
            { id: "lite", label: "Lite", price: 45 },
            { id: "classic", label: "Classic", price: 55 },
            { id: "district-max", label: "District Max", price: 70 },
          ],
        },
        {
          key: "protein",
          label: "Extra protein",
          type: "radio",
          required: true,
          options: [
            { id: "none", label: "None", price: 0 },
            { id: "extra-chicken", label: "Extra Chicken", price: 8 },
            { id: "extra-sausage", label: "Extra Sausage", price: 4 },
            { id: "mixed", label: "Mixed", price: 12 },
          ],
        },
        {
          key: "addons",
          label: "Extras",
          type: "checkbox",
          required: false,
          options: [
            { id: "extra-sauce", label: "Extra Sauce", price: 5 },
            { id: "extra-cheese", label: "Extra Cheese", price: 10 },
          ],
        },
      ],
      defaultSelection: {
        size: "lite",
        protein: "none",
        addons: [],
      },
    },
    "loaded-fries": {
      id: "loaded-fries",
      title: "Loaded Fries",
      badge: "Free Coke",
      category: "shawarma",
      image:
        "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1200&q=80",
      description:
        "Choose portion and toppings. During promo hours, a free Coke is added to your cart automatically.",
      groups: [
        {
          key: "portion",
          label: "Choose a portion",
          type: "radio",
          required: true,
          options: [
            { id: "regular", label: "Regular", price: 65 },
            { id: "medium", label: "Medium", price: 75 },
            { id: "large", label: "Large", price: 85 },
          ],
        },
        {
          key: "toppings",
          label: "Toppings",
          type: "checkbox",
          required: false,
          options: [
            { id: "extra-chicken", label: "Extra Chicken", price: 15 },
            { id: "extra-cheese", label: "Extra Cheese", price: 10 },
            { id: "extra-sauce", label: "Extra Sauce", price: 10 },
          ],
        },
      ],
      defaultSelection: {
        portion: "regular",
        toppings: [],
      },
    },
    "fried-rice": {
      id: "fried-rice",
      title: "Fried Rice",
      badge: "Rice",
      category: "rice",
      image:
        "https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=1200&q=80",
      description:
        "Classic spiced fried rice. Choose your protein and keep it simple, warm, and satisfying.",
      groups: [
        {
          key: "protein",
          label: "Choose a protein",
          type: "radio",
          required: true,
          options: [
            { id: "chicken", label: "Classic Chicken", price: 60 },
            { id: "beef", label: "Beef", price: 60 },
            { id: "gizzard", label: "Gizzard", price: 60 },
          ],
        },
      ],
      defaultSelection: {
        protein: "chicken",
      },
    },
    "loaded-angwamo": {
      id: "loaded-angwamo",
      title: "Loaded Angwamo",
      badge: "New price",
      category: "angwamo",
      image:
        "https://images.unsplash.com/photo-1517244683847-7456b63c5969?auto=format&fit=crop&w=1200&q=80",
      description:
        "Tiered value with a bold finish. The old price is crossed out and the new price stands out clearly.",
      groups: [
        {
          key: "tier",
          label: "Choose a tier",
          type: "radio",
          required: true,
          options: [
            {
              id: "basic",
              label: "Basic",
              price: 60,
              oldPrice: 65,
            },
            {
              id: "classic",
              label: "Classic",
              price: 70,
              oldPrice: 75,
            },
            {
              id: "max",
              label: "Max, 5 proteins",
              price: 80,
              oldPrice: 85,
            },
          ],
        },
      ],
      defaultSelection: {
        tier: "classic",
      },
    },
    "loaded-jollof": {
      id: "loaded-jollof",
      title: "Loaded Jollof",
      badge: "New",
      category: "rice",
      image:
        "https://images.unsplash.com/photo-1633436375155-5c5c9b6f5b83?auto=format&fit=crop&w=1200&q=80",
      description:
        "Hearty Jungle Jumbo Fully Loaded Jollof rice with protein and extras for a premium meal.",
      groups: [
        {
          key: "protein",
          label: "Choose a protein",
          type: "radio",
          required: true,
          options: [
            { id: "chicken", label: "Chicken", price: 85 },
            { id: "beef", label: "Beef", price: 85 },
            { id: "gizzard", label: "Gizzard", price: 85 },
          ],
        },
        {
          key: "extras",
          label: "Extras",
          type: "checkbox",
          required: false,
          options: [
            { id: "extra-sauce", label: "Extra Sauce", price: 5 },
            { id: "extra-cheese", label: "Extra Cheese", price: 10 },
          ],
        },
      ],
      defaultSelection: {
        protein: "chicken",
        extras: [],
      },
    },
    noodles: {
      id: "noodles",
      title: "Noodles",
      badge: "Quick pick",
      category: "other",
      image:
        "https://images.unsplash.com/photo-1551892374-ecf8754cf8f6?auto=format&fit=crop&w=1200&q=80",
      description:
        "A quick bowl with assorted proteins available. Simple, fast, and easy to enjoy.",
      groups: [
        {
          key: "protein",
          label: "Choose a protein",
          type: "radio",
          required: true,
          options: [
            { id: "chicken", label: "Chicken", price: 50 },
            { id: "beef", label: "Beef", price: 50 },
            { id: "gizzard", label: "Gizzard", price: 50 },
          ],
        },
        {
          key: "extras",
          label: "Extras",
          type: "checkbox",
          required: false,
          options: [
            { id: "extra-sauce", label: "Extra Sauce", price: 5 },
            { id: "extra-cheese", label: "Extra Cheese", price: 10 },
          ],
        },
      ],
      defaultSelection: {
        protein: "chicken",
        extras: [],
      },
    },
  };

  const state = {
    cart: [],
    history: [],
    currentProductId: null,
    currentConfirmedOrder: null,
    activeSlide: 0,
    heroTimer: null,
    openOverlayId: null,
    menuFilter: "all",
    menuSearch: "",
    selectionCache: loadJSON(STORAGE_KEYS.selections, {}),
  };

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

  function loadJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  }

  function saveJSON(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore storage failures
    }
  }

  function formatGHS(value) {
    const number = Number(value) || 0;
    const formatted = new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
    return `GHC ${formatted}`;
  }

  function escapeHTML(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function uid(prefix = "WD") {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let out = "";
    for (let i = 0; i < 6; i += 1) {
      out += chars[Math.floor(Math.random() * chars.length)];
    }
    return `${prefix}-${out}`;
  }

  function now() {
    return new Date();
  }

  function isPromoActive() {
    const t = now().getTime();
    return t >= PROMO_WINDOW.start.getTime() && t <= PROMO_WINDOW.end.getTime();
  }

  function sum(arr) {
    return arr.reduce((acc, n) => acc + (Number(n) || 0), 0);
  }

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function getProduct(productId) {
    return products[productId] || null;
  }

  function getSelectionFromCache(productId) {
    const product = getProduct(productId);
    const base = clone(product?.defaultSelection || {});
    const cached = state.selectionCache?.[productId];
    if (!cached) return base;

    const selection = { ...base };
    for (const key of Object.keys(cached)) {
      selection[key] = Array.isArray(cached[key]) ? [...cached[key]] : cached[key];
    }
    return selection;
  }

  function saveSelectionCache(productId, selection) {
    state.selectionCache = state.selectionCache || {};
    state.selectionCache[productId] = clone(selection);
    saveJSON(STORAGE_KEYS.selections, state.selectionCache);
  }

  function selectionSignature(selection) {
    const normalized = {};
    const keys = Object.keys(selection || {}).sort();
    for (const key of keys) {
      const value = selection[key];
      normalized[key] = Array.isArray(value) ? [...value].sort() : value;
    }
    return JSON.stringify(normalized);
  }

  function buildSelectionSummary(product, selection) {
    const parts = [];
    for (const group of product.groups || []) {
      const selected = selection[group.key];
      if (group.type === "checkbox") {
        const labels = (selected || [])
          .map((id) => group.options.find((opt) => opt.id === id)?.label)
          .filter(Boolean);
        if (labels.length) parts.push(labels.join(", "));
      } else {
        const label = group.options.find((opt) => opt.id === selected)?.label;
        if (label) parts.push(label);
      }
    }
    return parts.join(" • ");
  }

  function calculateProductPrice(product, selection, quantity = 1) {
    let total = 0;
    for (const group of product.groups || []) {
      const chosen = selection[group.key];
      if (group.type === "checkbox") {
        const values = Array.isArray(chosen) ? chosen : [];
        values.forEach((id) => {
          const opt = group.options.find((o) => o.id === id);
          if (opt) total += Number(opt.price) || 0;
        });
      } else {
        const opt = group.options.find((o) => o.id === chosen);
        if (opt) total += Number(opt.price) || 0;
      }
    }
    return total * quantity;
  }

  function buildCartItem(productId, selection, quantity = 1) {
    const product = getProduct(productId);
    if (!product) return null;

    const cleanSelection = clone(selection || product.defaultSelection || {});
    const unitPrice = calculateProductPrice(product, cleanSelection, 1);
    const summary = buildSelectionSummary(product, cleanSelection);

    return {
      id: uid("ITEM"),
      productId,
      title: product.title,
      category: product.category,
      image: product.image,
      badge: product.badge,
      selection: cleanSelection,
      selectionSummary: summary,
      unitPrice,
      qty: Math.max(1, Number(quantity) || 1),
      isGift: false,
      giftNote: "",
    };
  }

  function addToCart(productId, selection, quantity = 1) {
    const product = getProduct(productId);
    if (!product) return;

    const item = buildCartItem(productId, selection, quantity);
    if (!item) return;

    const signature = selectionSignature(item.selection);
    const existing = state.cart.find(
      (entry) =>
        !entry.isGift &&
        entry.productId === item.productId &&
        selectionSignature(entry.selection) === signature
    );

    if (existing) {
      existing.qty += item.qty;
    } else {
      state.cart.push(item);
    }

    persistCart();
    renderCart();
    showToast(`${product.title} added to cart.`);
  }

  function updateCartQty(itemId, delta) {
    const index = state.cart.findIndex((item) => item.id === itemId && !item.isGift);
    if (index < 0) return;

    state.cart[index].qty += delta;
    if (state.cart[index].qty <= 0) {
      state.cart.splice(index, 1);
      showToast("Item removed from cart.");
    } else if (delta > 0) {
      showToast("Quantity updated.");
    }
    persistCart();
    renderCart();
  }

  function removeCartItem(itemId) {
    const index = state.cart.findIndex((item) => item.id === itemId);
    if (index < 0) return;
    state.cart.splice(index, 1);
    persistCart();
    renderCart();
    showToast("Item removed from cart.");
  }

  function clearCart(silent = false) {
    state.cart = [];
    persistCart();
    renderCart();
    if (!silent) showToast("Cart cleared.");
  }

  function persistCart() {
    saveJSON(STORAGE_KEYS.cart, state.cart.filter((item) => !item.isGift));
  }

  function loadCart() {
    const saved = loadJSON(STORAGE_KEYS.cart, []);
    state.cart = Array.isArray(saved) ? saved : [];
  }

  function getPaidItems() {
    return state.cart.filter((item) => !item.isGift);
  }

  function getShawarmaAllocation(items) {
    const units = [];
    items.forEach((item) => {
      if (item.productId !== "shawarma") return;
      for (let i = 0; i < item.qty; i += 1) {
        units.push({
          itemId: item.id,
          price: Number(item.unitPrice) || 0,
        });
      }
    });

    units.sort((a, b) => a.price - b.price);
    const freeCount = Math.floor(units.length / 3);
    const allocation = new Map();
    let discount = 0;

    for (let i = 0; i < freeCount; i += 1) {
      const unit = units[i];
      if (!unit) continue;
      discount += unit.price;
      allocation.set(unit.itemId, (allocation.get(unit.itemId) || 0) + unit.price);
    }

    return { allocation, discount, freeCount };
  }

  function getGiftItems(items) {
    const gifts = [];
    if (!isPromoActive()) return gifts;

    const loadedFriesQty = items
      .filter((item) => item.productId === "loaded-fries")
      .reduce((acc, item) => acc + item.qty, 0);

    for (let i = 0; i < loadedFriesQty; i += 1) {
      gifts.push({
        id: uid("GIFT"),
        productId: "free-coke",
        title: "Free Coke",
        category: "gift",
        image:
          "https://images.unsplash.com/photo-1626077628826-0d0f2a0ec4f4?auto=format&fit=crop&w=900&q=80",
        badge: "Promo",
        selectionSummary: "Included with Loaded Fries",
        unitPrice: 0,
        qty: 1,
        isGift: true,
        giftNote: "Added automatically with Loaded Fries during promo hours.",
      });
    }

    return gifts;
  }

  function getCartTotals() {
    const paidItems = getPaidItems();
    const { allocation, discount } = getShawarmaAllocation(paidItems);
    const subtotal = paidItems.reduce((acc, item) => acc + item.unitPrice * item.qty, 0);
    const total = Math.max(0, subtotal - discount);
    return {
      subtotal,
      discount,
      total,
      allocation,
      paidCount: paidItems.reduce((acc, item) => acc + item.qty, 0),
      gifts: getGiftItems(paidItems),
    };
  }

  function renderCart() {
    const cartItems = $("#cartItems");
    const emptyState = $("#cartEmptyState");
    if (!cartItems) return;

    const paidItems = getPaidItems();
    const totals = getCartTotals();
    const allVisibleItems = [...paidItems, ...totals.gifts];

    const hasItems = allVisibleItems.length > 0;
    if (emptyState) emptyState.style.display = hasItems ? "none" : "grid";

    cartItems.innerHTML = "";

    if (!hasItems) {
      updateCartUI();
      return;
    }

    allVisibleItems.forEach((item) => {
      const row = document.createElement("article");
      row.className = `cart-item${item.isGift ? " cart-item--gift" : ""}`;
      row.dataset.itemId = item.id;

      const lineQty = item.qty;
      const lineRaw = item.unitPrice * lineQty;
      const appliedDiscount = item.isGift ? lineRaw : totals.allocation.get(item.id) || 0;
      const lineTotal = Math.max(0, lineRaw - appliedDiscount);

      const imageStyle = item.image
        ? `style="background-image:url('${item.image}');"`
        : "";

      row.innerHTML = `
        <div class="cart-item__image" ${imageStyle}></div>
        <div class="cart-item__content">
          <div class="cart-item__topline">
            <div>
              <h3>${escapeHTML(item.title)}</h3>
              <p>${escapeHTML(item.selectionSummary || item.giftNote || "")}</p>
            </div>
            <div class="cart-item__price">
              ${
                item.isGift
                  ? `<strong>${formatGHS(0)}</strong>`
                  : appliedDiscount > 0
                    ? `<s>${formatGHS(lineRaw)}</s><strong>${formatGHS(lineTotal)}</strong>`
                    : `<strong>${formatGHS(lineRaw)}</strong>`
              }
            </div>
          </div>

          ${
            item.isGift
              ? `<div class="cart-item__meta cart-item__meta--gift"><i class="fa-solid fa-gift"></i> Included automatically</div>`
              : appliedDiscount > 0
                ? `<div class="cart-item__meta cart-item__meta--promo"><i class="fa-solid fa-tag"></i> Promo discount applied</div>`
                : ""
          }

          ${
            item.isGift
              ? ""
              : `
              <div class="cart-item__actions">
                <button type="button" class="qty-btn" data-decrease-qty="${item.id}" aria-label="Decrease quantity">
                  <i class="fa-solid fa-minus"></i>
                </button>
                <span class="qty-value">${lineQty}</span>
                <button type="button" class="qty-btn" data-increase-qty="${item.id}" aria-label="Increase quantity">
                  <i class="fa-solid fa-plus"></i>
                </button>
                <button type="button" class="remove-btn" data-remove-item="${item.id}" aria-label="Remove item">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>
            `
          }
        </div>
      `;

      cartItems.appendChild(row);
    });

    $("#subtotalValue").textContent = formatGHS(totals.subtotal);
    $("#promoValue").textContent = `- ${formatGHS(totals.discount)}`;
    $("#totalValue").textContent = formatGHS(totals.total);

    $("#cartSubtotal").textContent = formatGHS(totals.subtotal);
    $("#cartDiscount").textContent = `- ${formatGHS(totals.discount)}`;
    $("#cartTotal").textContent = formatGHS(totals.total);

    $("#checkoutSubtotal").textContent = formatGHS(totals.subtotal);
    $("#checkoutDiscount").textContent = `- ${formatGHS(totals.discount)}`;
    $("#checkoutTotal").textContent = formatGHS(totals.total);
    $("#checkoutDelivery").textContent = "Estimated after checkout";

    updateCartUI();
  }

  function updateCartUI() {
    const totals = getCartTotals();
    const countTargets = ["#cartCount", "#cartHeaderCount"];
    countTargets.forEach((sel) => {
      const el = $(sel);
      if (el) el.textContent = String(totals.paidCount);
    });

    const totalTargets = ["#cartHeaderTotal"];
    totalTargets.forEach((sel) => {
      const el = $(sel);
      if (el) el.textContent = formatGHS(totals.total);
    });
  }

  function populateProductModal(productId) {
    const product = getProduct(productId);
    if (!product) return;

    state.currentProductId = productId;

    const hero = $("#productDrawerHero");
    const badge = $("#productDrawerBadge");
    const title = $("#productDrawerTitle");
    const description = $("#productDrawerDescription");
    const optionsWrap = $("#productOptionGroups");
    const quantityInput = $("#productQuantity");
    const priceText = $("#productDrawerPrice");
    const form = $("#productOptionsForm");

    if (hero) {
      hero.style.backgroundImage = `url('${product.image}')`;
      hero.setAttribute("aria-hidden", "true");
    }
    if (badge) badge.textContent = product.badge || "Featured";
    if (title) title.textContent = product.title;
    if (description) description.textContent = product.description || "";

    const selection = getSelectionFromCache(productId);
    const quantity = Math.max(1, Number(quantityInput?.value) || 1);

    if (optionsWrap) {
      optionsWrap.innerHTML = "";
      product.groups.forEach((group) => {
        const section = document.createElement("section");
        section.className = "option-group__section";
        const selectedValue = selection[group.key];

        const heading = document.createElement("h3");
        heading.textContent = group.label;
        section.appendChild(heading);

        const controlGrid = document.createElement("div");
        controlGrid.className = `option-group__controls option-group__controls--${group.type}`;

        group.options.forEach((option) => {
          const id = `${productId}-${group.key}-${option.id}`;
          const label = document.createElement("label");
          label.className = "option-chip";

          const input = document.createElement("input");
          input.type = group.type === "checkbox" ? "checkbox" : "radio";
          input.name = `${productId}-${group.key}`;
          input.value = option.id;
          input.id = id;
          input.dataset.groupKey = group.key;
          input.dataset.groupType = group.type;
          input.dataset.optionPrice = String(option.price ?? 0);

          if (group.type === "checkbox") {
            input.checked = Array.isArray(selectedValue) && selectedValue.includes(option.id);
          } else {
            input.checked = selectedValue === option.id;
          }

          const price = document.createElement("span");
          price.className = "option-chip__price";
          price.textContent =
            option.oldPrice && Number(option.oldPrice) > Number(option.price)
              ? `${formatGHS(option.price)}`
              : option.price === 0 && product.id === "fried-rice"
                ? ""
                : option.price === 0
                  ? "+ GHC 0.00"
                  : `+ ${formatGHS(option.price)}`;

          label.appendChild(input);
          label.appendChild(document.createTextNode(option.label));

          if (option.oldPrice && Number(option.oldPrice) > Number(option.price)) {
            const old = document.createElement("s");
            old.className = "option-chip__old";
            old.textContent = formatGHS(option.oldPrice);
            label.appendChild(old);
          }

          if (price.textContent) label.appendChild(price);
          controlGrid.appendChild(label);
        });

        section.appendChild(controlGrid);
        optionsWrap.appendChild(section);
      });
    }

    if (quantityInput) quantityInput.value = String(state.selectionCache?.[productId]?.quantity || 1);

    const price = calculateProductPrice(product, selection, Math.max(1, Number(quantityInput?.value) || 1));
    if (priceText) priceText.textContent = formatGHS(price);

    if (form) {
      form.dataset.productId = productId;
    }
  }

  function readProductSelection(productId) {
    const product = getProduct(productId);
    if (!product) return null;

    const form = $("#productOptionsForm");
    if (!form) return null;

    const selection = clone(product.defaultSelection || {});
    const controls = $$("input[data-group-key]", form);

    const checkboxGroups = new Set(
      product.groups.filter((g) => g.type === "checkbox").map((g) => g.key)
    );

    for (const group of product.groups) {
      if (group.type === "checkbox") selection[group.key] = [];
    }

    controls.forEach((input) => {
      const key = input.dataset.groupKey;
      const type = input.dataset.groupType;
      if (type === "checkbox") {
        if (!Array.isArray(selection[key])) selection[key] = [];
        if (input.checked) selection[key].push(input.value);
      } else if (input.checked) {
        selection[key] = input.value;
      }
    });

    for (const group of product.groups) {
      if (group.type === "radio") {
        const hasSelection = selection[group.key] !== undefined;
        if (!hasSelection) {
          selection[group.key] = group.options[0]?.id;
        }
      } else if (checkboxGroups.has(group.key) && !Array.isArray(selection[group.key])) {
        selection[group.key] = [];
      }
    }

    saveSelectionCache(productId, selection);
    return selection;
  }

  function updateProductPricePreview() {
    const productId = $("#productOptionsForm")?.dataset.productId;
    const product = getProduct(productId);
    if (!product) return;

    const quantity = Math.max(1, Number($("#productQuantity")?.value) || 1);
    const selection = readProductSelection(productId);
    if (!selection) return;

    const price = calculateProductPrice(product, selection, quantity);
    const priceText = $("#productDrawerPrice");
    if (priceText) priceText.textContent = formatGHS(price);
  }

  function addCurrentProductToCart() {
    const productId = $("#productOptionsForm")?.dataset.productId;
    const product = getProduct(productId);
    if (!product) return;

    const selection = readProductSelection(productId);
    if (!selection) return;

    const quantity = Math.max(1, Number($("#productQuantity")?.value) || 1);
    addToCart(productId, selection, quantity);
    closeOverlay("productDrawer");
  }

  function showToast(message, type = "info") {
    let host = $("#toastHost");
    if (!host) {
      host = document.createElement("div");
      host.id = "toastHost";
      host.style.position = "fixed";
      host.style.left = "16px";
      host.style.right = "16px";
      host.style.bottom = "16px";
      host.style.zIndex = "9999";
      host.style.display = "grid";
      host.style.gap = "10px";
      host.style.pointerEvents = "none";
      document.body.appendChild(host);
    }

    const toast = document.createElement("div");
    toast.style.pointerEvents = "auto";
    toast.style.padding = "14px 16px";
    toast.style.borderRadius = "14px";
    toast.style.color = "#fff";
    toast.style.background =
      type === "error"
        ? "rgba(165, 40, 40, 0.95)"
        : "rgba(20, 20, 20, 0.95)";
    toast.style.border = "1px solid rgba(255,255,255,0.12)";
    toast.style.boxShadow = "0 18px 50px rgba(0,0,0,0.35)";
    toast.style.backdropFilter = "blur(10px)";
    toast.style.fontSize = "14px";
    toast.textContent = message;

    host.appendChild(toast);
    window.setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(8px)";
      toast.style.transition = "all 240ms ease";
      window.setTimeout(() => toast.remove(), 260);
    }, 2600);
  }

  function openOverlay(id) {
    closeTopOverlay(true);

    const el = document.getElementById(id);
    if (!el) return;

    state.openOverlayId = id;
    el.setAttribute("aria-hidden", "false");
    el.classList.add("is-open");

    if (id === "cartDrawer") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "hidden";
    }

    if (id === "mobileNav") {
      el.hidden = false;
      el.setAttribute("aria-hidden", "false");
      const firstLink = $(".mobile-nav a, .mobile-nav button", el);
      if (firstLink) firstLink.focus();
      return;
    }

    if (id === "productDrawer") {
      const first = $("#productQuantity");
      if (first) first.focus();
    } else {
      const focusable = el.querySelector(
        "button, input, select, textarea, a[href], [tabindex]:not([tabindex='-1'])"
      );
      if (focusable) focusable.focus();
    }
  }

  function closeOverlay(id) {
    const el = document.getElementById(id);
    if (!el) return;

    el.setAttribute("aria-hidden", "true");
    el.classList.remove("is-open");

    if (id === "mobileNav") {
      el.hidden = true;
    }

    const anyOpen = $$(".modal.is-open, .cart-drawer.is-open, .mobile-nav.is-open").length > 0;
    if (!anyOpen) document.body.style.overflow = "";

    if (state.openOverlayId === id) state.openOverlayId = null;
  }

  function closeTopOverlay(silent = false) {
    const opened =
      [...$$(".modal.is-open"), ...$$(".cart-drawer.is-open"), ...$$(".mobile-nav.is-open")].at(
        -1
      ) || null;
    if (!opened) return;

    const id = opened.id;
    if (!silent && id) closeOverlay(id);
    else if (id) closeOverlay(id);
  }

  function openCart() {
    renderCart();
    openOverlay("cartDrawer");
  }

  function closeCart() {
    closeOverlay("cartDrawer");
  }

  function openProduct(productId) {
    const product = getProduct(productId);
    if (!product) return;

    populateProductModal(productId);
    openOverlay("productDrawer");
  }

  function openModalById(id) {
    openOverlay(id);
  }

  function closeModalById(id) {
    closeOverlay(id);
  }

  function setHeroSlide(index) {
    const slides = $$(".hero-slide");
    const dots = $$(".hero-dot");
    if (!slides.length) return;

    state.activeSlide = ((index % slides.length) + slides.length) % slides.length;

    slides.forEach((slide, i) => {
      slide.classList.toggle("is-active", i === state.activeSlide);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle("is-active", i === state.activeSlide);
      dot.setAttribute("aria-pressed", i === state.activeSlide ? "true" : "false");
    });
  }

  function nextHeroSlide() {
    setHeroSlide(state.activeSlide + 1);
  }

  function prevHeroSlide() {
    setHeroSlide(state.activeSlide - 1);
  }

  function startHeroRotation() {
    if (state.heroTimer) window.clearInterval(state.heroTimer);
    state.heroTimer = window.setInterval(nextHeroSlide, HERO_INTERVAL_MS);
  }

  function stopHeroRotation() {
    if (state.heroTimer) {
      window.clearInterval(state.heroTimer);
      state.heroTimer = null;
    }
  }

  function scrollToMenu() {
    const menu = $("#menu");
    if (menu) {
      menu.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function applyMenuFilters() {
    const query = state.menuSearch.trim().toLowerCase();
    const filter = state.menuFilter;

    const cards = $$(".menu-feature");
    cards.forEach((card) => {
      const category = (card.dataset.category || "").toLowerCase();
      const text = card.textContent.toLowerCase();
      const matchesCategory = filter === "all" ? true : category.includes(filter);
      const matchesSearch = !query || text.includes(query);
      card.hidden = !(matchesCategory && matchesSearch);
    });

    const duo = $(".menu-duo");
    if (duo) {
      const visible = $$(".menu-feature", duo).some((card) => !card.hidden);
      duo.hidden = !visible;
    }

    const anyVisible = cards.some((card) => !card.hidden);
    let empty = $("#menuNoResults");
    if (!empty) {
      empty = document.createElement("p");
      empty.id = "menuNoResults";
      empty.style.margin = "18px 4px 0";
      empty.style.color = "rgba(255,255,255,0.7)";
      empty.style.fontSize = "14px";
      empty.textContent = "No matching menu items found.";
      $("#menu")?.appendChild(empty);
    }
    empty.hidden = anyVisible;
  }

  function setMenuFilter(filter) {
    state.menuFilter = filter;
    $$(".menu-pill").forEach((pill) => {
      const active = pill.dataset.filterCategory === filter;
      pill.classList.toggle("menu-pill--active", active);
      pill.setAttribute("aria-selected", active ? "true" : "false");
    });
    applyMenuFilters();
  }

  function setMenuSearch(value) {
    state.menuSearch = value || "";
    applyMenuFilters();
  }

  function generateReference() {
    const d = now();
    const stamp = `${String(d.getFullYear()).slice(-2)}${String(d.getMonth() + 1).padStart(2, "0")}${String(
      d.getDate()
    ).padStart(2, "0")}`;
    return `WD-${stamp}-${Math.floor(1000 + Math.random() * 9000)}`;
  }

  function readFormValues(form) {
    const data = new FormData(form);
    const out = {};
    for (const [key, value] of data.entries()) {
      if (out[key] !== undefined) {
        if (!Array.isArray(out[key])) out[key] = [out[key]];
        out[key].push(value);
      } else {
        out[key] = value;
      }
    }
    return out;
  }

  function saveUserProfile(profile) {
    saveJSON(STORAGE_KEYS.user, profile);
  }

  function loadUserProfile() {
    return loadJSON(STORAGE_KEYS.user, {});
  }

  function savePreorder(data) {
    saveJSON(STORAGE_KEYS.preorder, data);
  }

  function loadPreorder() {
    return loadJSON(STORAGE_KEYS.preorder, {});
  }

  function populateSavedFields() {
    const profile = loadUserProfile();
    const preorder = loadPreorder();

    const checkoutMap = {
      "#customerName": profile.name || "",
      "#customerPhone": profile.phone || "",
      "#customerEmail": profile.email || "",
      "#customerAddress": profile.address || "",
      "#preferredDate": profile.preferredDate || "",
      "#preferredTime": profile.preferredTime || "",
      "#orderNotes": profile.notes || "",
    };

    Object.entries(checkoutMap).forEach(([sel, value]) => {
      const el = $(sel);
      if (el) el.value = value;
    });

    const preorderMap = {
      "[name='preorderName']": preorder.preorderName || profile.name || "",
      "[name='preorderPhone']": preorder.preorderPhone || profile.phone || "",
      "[name='preorderDate']": preorder.preorderDate || "",
      "[name='preorderTime']": preorder.preorderTime || "",
      "[name='preorderNotes']": preorder.preorderNotes || "",
    };

    Object.entries(preorderMap).forEach(([sel, value]) => {
      const el = $(sel);
      if (el) el.value = value;
    });
  }

  function saveCheckoutProfileFromForm(formData) {
    const profile = {
      name: formData.name || "",
      phone: formData.phone || "",
      email: formData.email || "",
      address: formData.address || "",
      preferredDate: formData.preferredDate || "",
      preferredTime: formData.preferredTime || "",
      notes: formData.notes || "",
    };
    saveUserProfile(profile);
  }

  function buildOrderFromCheckout(formData, paymentMeta = {}) {
    const paidItems = getPaidItems();
    const totals = getCartTotals();
    const { allocation, discount } = getShawarmaAllocation(paidItems);
    const gifts = totals.gifts;

    const items = [...paidItems, ...gifts].map((item) => {
      const itemDiscount = item.isGift ? item.qty * item.unitPrice : allocation.get(item.id) || 0;
      const lineRaw = item.qty * item.unitPrice;
      const lineTotal = Math.max(0, lineRaw - itemDiscount);
      return {
        title: item.title,
        qty: item.qty,
        unitPrice: item.unitPrice,
        lineRaw,
        discount: itemDiscount,
        lineTotal,
        isGift: item.isGift,
        summary: item.selectionSummary || item.giftNote || "",
      };
    });

    const orderType = formData.orderType === "pickup" ? "Pickup" : "Delivery";

    return {
      reference: generateReference(),
      customer: {
        name: formData.name || "",
        phone: formData.phone || "",
        email: formData.email || "",
        address: formData.address || "",
      },
      orderType,
      notes: formData.notes || "",
      preferredDate: formData.preferredDate || "",
      preferredTime: formData.preferredTime || "",
      timestamp: new Date().toLocaleString(),
      subtotal: totals.subtotal,
      discount,
      delivery: orderType === "Delivery" ? "Estimated after checkout" : "Pickup at Devtraco",
      total: totals.total,
      items,
      payment: paymentMeta,
      status: "Confirmed",
    };
  }

  function saveOrderToHistory(order) {
    const history = loadJSON(STORAGE_KEYS.history, []);
    history.unshift(order);
    saveJSON(STORAGE_KEYS.history, history);
    state.history = history;
    saveJSON(STORAGE_KEYS.lastOrder, order);
    state.currentConfirmedOrder = order;
  }

  function loadHistory() {
    const history = loadJSON(STORAGE_KEYS.history, []);
    state.history = Array.isArray(history) ? history : [];
  }

  function renderHistoryList() {
    const list = $("#historyList");
    if (!list) return;

    const query = ($("#historySearch")?.value || "").trim().toLowerCase();
    const filtered = (state.history || []).filter((order) => {
      const haystack = [
        order.reference,
        order.customer?.name,
        order.customer?.phone,
        order.customer?.email,
      ]
        .join(" ")
        .toLowerCase();
      return !query || haystack.includes(query);
    });

    list.innerHTML = "";

    if (!filtered.length) {
      const empty = document.createElement("div");
      empty.className = "history-empty";
      empty.innerHTML = `
        <i class="fa-regular fa-folder-open"></i>
        <h3>No orders found</h3>
        <p>Try another reference, name, or phone number.</p>
      `;
      list.appendChild(empty);
      return;
    }

    filtered.forEach((order) => {
      const card = document.createElement("article");
      card.className = "history-item";
      card.innerHTML = `
        <div class="history-item__top">
          <div>
            <h3>${escapeHTML(order.reference)}</h3>
            <p>${escapeHTML(order.customer?.name || "")}</p>
          </div>
          <strong>${formatGHS(order.total || 0)}</strong>
        </div>
        <div class="history-item__meta">
          <span><i class="fa-solid fa-phone"></i> ${escapeHTML(order.customer?.phone || "")}</span>
          <span><i class="fa-regular fa-clock"></i> ${escapeHTML(order.timestamp || "")}</span>
        </div>
        <div class="history-item__actions">
          <button type="button" class="history-btn" data-history-open="${escapeHTML(order.reference)}">Open</button>
          <button type="button" class="history-btn" data-history-download="${escapeHTML(order.reference)}">Download</button>
          <button type="button" class="history-btn" data-history-print="${escapeHTML(order.reference)}">Print</button>
        </div>
      `;
      list.appendChild(card);
    });
  }

  function ensureHistoryToolbarButtons() {
    const tools = $(".history-tools");
    if (!tools) return;

    if ($(".history-tools__buttons", tools)) return;

    const toolbar = document.createElement("div");
    toolbar.className = "history-tools__buttons";
    toolbar.style.display = "flex";
    toolbar.style.gap = "10px";
    toolbar.style.flexWrap = "wrap";
    toolbar.style.marginTop = "12px";

    toolbar.innerHTML = `
      <button type="button" class="btn btn--ghost" id="historyRefreshBtn">
        <i class="fa-solid fa-rotate-right"></i>
        Refresh
      </button>
      <button type="button" class="btn btn--ghost" id="historyClearBtn">
        <i class="fa-solid fa-trash-can"></i>
        Clear all
      </button>
    `;

    tools.appendChild(toolbar);
  }

  function getOrderByReference(reference) {
    return (state.history || []).find((order) => order.reference === reference) || null;
  }

  function renderConfirmedOrder(order) {
    const details = $("#orderConfirmedDetails");
    if (!details || !order) return;

    details.innerHTML = "";

    const fields = [
      ["Reference", order.reference],
      ["Name", order.customer?.name || ""],
      ["Phone", order.customer?.phone || ""],
      ["Email", order.customer?.email || ""],
      ["Order type", order.orderType || ""],
      ["Address", order.customer?.address || ""],
      ["Notes", order.notes || ""],
      ["Timestamp", order.timestamp || ""],
      ["Total", formatGHS(order.total || 0)],
    ];

    fields.forEach(([label, value]) => {
      const row = document.createElement("div");
      row.className = "success-row";
      row.innerHTML = `
        <span>${escapeHTML(label)}</span>
        <strong>${escapeHTML(value || "-")}</strong>
      `;
      details.appendChild(row);
    });

    const itemBlock = document.createElement("div");
    itemBlock.className = "success-items";
    const itemList = (order.items || [])
      .map((item) => {
        const line = item.isGift
          ? `${item.title} x${item.qty} - ${formatGHS(0)}`
          : `${item.title} x${item.qty} - ${formatGHS(item.lineTotal || 0)}`;
        const summary = item.summary ? ` <span>${escapeHTML(item.summary)}</span>` : "";
        return `<div class="success-item">${escapeHTML(line)}${summary}</div>`;
      })
      .join("");
    itemBlock.innerHTML = itemList || "<p>No items recorded.</p>";
    details.appendChild(itemBlock);
  }

  function openConfirmedOrder(order) {
    state.currentConfirmedOrder = order;
    renderConfirmedOrder(order);
    openModalById("orderConfirmedModal");
  }

  function createInvoiceHTML(order) {
    const rows = (order.items || [])
      .map((item) => {
        return `
          <tr>
            <td>${escapeHTML(item.title)}</td>
            <td>${escapeHTML(item.summary || "")}</td>
            <td>${escapeHTML(item.qty)}</td>
            <td>${escapeHTML(formatGHS(item.lineTotal || 0))}</td>
          </tr>
        `;
      })
      .join("");

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Invoice ${escapeHTML(order.reference)}</title>
  <style>
    body { font-family: Arial, sans-serif; padding: 24px; color: #111; }
    .invoice { max-width: 900px; margin: 0 auto; }
    h1 { margin: 0 0 6px; }
    .meta, .customer, .summary { margin: 18px 0; }
    table { width: 100%; border-collapse: collapse; margin-top: 16px; }
    th, td { text-align: left; padding: 10px 8px; border-bottom: 1px solid #ddd; vertical-align: top; }
    th { background: #f5f5f5; }
    .total { font-size: 18px; font-weight: bold; text-align: right; margin-top: 16px; }
    .muted { color: #666; }
  </style>
</head>
<body>
  <div class="invoice">
    <h1>WRAP District</h1>
    <p class="muted">Tema Community 25, Devtraco</p>

    <div class="meta">
      <p><strong>Reference:</strong> ${escapeHTML(order.reference)}</p>
      <p><strong>Timestamp:</strong> ${escapeHTML(order.timestamp)}</p>
      <p><strong>Order type:</strong> ${escapeHTML(order.orderType || "")}</p>
    </div>

    <div class="customer">
      <p><strong>Name:</strong> ${escapeHTML(order.customer?.name || "")}</p>
      <p><strong>Phone:</strong> ${escapeHTML(order.customer?.phone || "")}</p>
      <p><strong>Email:</strong> ${escapeHTML(order.customer?.email || "")}</p>
      <p><strong>Address:</strong> ${escapeHTML(order.customer?.address || "")}</p>
      <p><strong>Notes:</strong> ${escapeHTML(order.notes || "")}</p>
    </div>

    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Option</th>
          <th>Qty</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>

    <div class="summary">
      <p><strong>Subtotal:</strong> ${escapeHTML(formatGHS(order.subtotal || 0))}</p>
      <p><strong>Promo discount:</strong> - ${escapeHTML(formatGHS(order.discount || 0))}</p>
      <p><strong>Delivery:</strong> ${escapeHTML(order.delivery || "")}</p>
      <div class="total">Total: ${escapeHTML(formatGHS(order.total || 0))}</div>
    </div>
  </div>
</body>
</html>`;
  }

  function downloadInvoice(order) {
    const html = createInvoiceHTML(order);
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Wrap-District-${order.reference}.html`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function printInvoice(order) {
    const win = window.open("", "_blank", "width=900,height=1000");
    if (!win) {
      showToast("Popup blocked. Please allow popups to print the invoice.", "error");
      return;
    }

    win.document.open();
    win.document.write(createInvoiceHTML(order));
    win.document.close();
    win.focus();
    win.onload = () => {
      win.print();
    };
  }

  async function ensurePaystackScriptLoaded() {
    if (window.PaystackPop) return true;

    return new Promise((resolve) => {
      const existing = document.querySelector(
        'script[src="https://js.paystack.co/v1/inline.js"]'
      );
      if (existing) {
        existing.addEventListener("load", () => resolve(true), { once: true });
        existing.addEventListener("error", () => resolve(false), { once: true });
        return;
      }

      const script = document.createElement("script");
      script.src = "https://js.paystack.co/v1/inline.js";
      script.async = true;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.head.appendChild(script);
    });
  }

  async function processPayment(order) {
    const configured =
      PAYSTACK_PUBLIC_KEY &&
      !PAYSTACK_PUBLIC_KEY.includes("REPLACE_ME") &&
      PAYSTACK_PUBLIC_KEY.startsWith("pk_");

    if (!configured) {
      finalizeOrder(order, {
        method: "demo",
        note: "Paystack key not configured, completed in demo mode.",
      });
      return;
    }

    const loaded = await ensurePaystackScriptLoaded();
    if (!loaded || !window.PaystackPop) {
      finalizeOrder(order, {
        method: "fallback",
        note: "Paystack script could not load, completed in fallback mode.",
      });
      return;
    }

    const handler = window.PaystackPop.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: order.customer.email || "customer@wrapdistrict.local",
      amount: Math.round(Number(order.total || 0) * 100),
      currency: "GHS",
      ref: order.reference,
      metadata: {
        custom_fields: [
          { display_name: "Customer Name", variable_name: "customer_name", value: order.customer.name || "" },
          { display_name: "Phone", variable_name: "phone", value: order.customer.phone || "" },
          { display_name: "Order Type", variable_name: "order_type", value: order.orderType || "" },
        ],
      },
      callback: function () {
        finalizeOrder(order, {
          method: "paystack",
          note: "Payment completed with Paystack.",
        });
      },
      onClose: function () {
        showToast("Payment window closed before completion.", "error");
      },
    });

    handler.openIframe();
  }

  function finalizeOrder(order, paymentMeta = {}) {
    order.payment = paymentMeta;
    saveOrderToHistory(order);
    clearCart(true);
    renderCart();
    renderHistoryList();
    openConfirmedOrder(order);
    showToast("Order confirmed.");
  }

  function handleCheckoutSubmit(event) {
    event.preventDefault();

    if (!getPaidItems().length) {
      showToast("Your cart is empty.", "error");
      return;
    }

    const form = event.currentTarget;
    const data = readFormValues(form);

    if (!data.name || !data.phone) {
      showToast("Please add your name and phone number.", "error");
      return;
    }

    if (String(data.orderType || "delivery") === "delivery" && !String(data.address || "").trim()) {
      showToast("Please add a delivery address.", "error");
      return;
    }

    saveCheckoutProfileFromForm(data);
    const order = buildOrderFromCheckout(data, {
      method: "pending",
      note: "Payment initiated.",
      feeLogic: {
        paystackPercent: PAYMENT_FEES.paystackPercent,
        mtnWithdrawalPercent: PAYMENT_FEES.mtnWithdrawalPercent,
      },
    });

    closeModalById("checkoutModal");
    processPayment(order);
  }

  function handlePreorderSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = readFormValues(form);
    savePreorder(data);
    showToast("Preorder saved.");
    closeModalById("preorderModal");
  }

  function updatePromotionModalState() {
    const hide = loadJSON(STORAGE_KEYS.promoHide, false);
    if (hide) return;
    if (!isPromoActive()) return;

    window.setTimeout(() => {
      openModalById("entryPromoModal");
    }, 700);
  }

  function bindEvents() {
    const heroPrev = $('[data-hero-prev]');
    const heroNext = $('[data-hero-next]');
    if (heroPrev) heroPrev.addEventListener("click", prevHeroSlide);
    if (heroNext) heroNext.addEventListener("click", nextHeroSlide);

    $$(".hero-dot").forEach((dot) => {
      dot.addEventListener("click", () => {
        setHeroSlide(Number(dot.dataset.goSlide || 0));
        startHeroRotation();
      });
    });

    $$(".menu-pill").forEach((pill) => {
      pill.addEventListener("click", () => setMenuFilter(pill.dataset.filterCategory || "all"));
    });

    const search = $("#menuSearch");
    if (search) {
      search.addEventListener("input", () => setMenuSearch(search.value));
    }

    document.addEventListener("click", (event) => {
      const target = event.target.closest("button, a");
      if (!target) return;

      if (target.matches(".mobile-menu-toggle")) {
        const nav = $("#mobileNav");
        if (nav.hidden) openOverlay("mobileNav");
        else closeOverlay("mobileNav");
        return;
      }

      if (target.id === "openCartBtn") {
        openCart();
        return;
      }

      if (target.id === "openHistoryBtn" || target.id === "openHistoryBtnMobile") {
        ensureHistoryToolbarButtons();
        renderHistoryList();
        openModalById("historyModal");
        return;
      }

      if (target.id === "checkoutBtn") {
        if (!getPaidItems().length) {
          showToast("Add something to your cart first.", "error");
          return;
        }
        populateSavedFields();
        openModalById("checkoutModal");
        renderCart();
        return;
      }

      if (target.id === "clearCartBtn") {
        if (getPaidItems().length && window.confirm("Clear the cart?")) clearCart();
        return;
      }

      if (target.id === "promoHelperBtn") {
        openModalById("entryPromoModal");
        return;
      }

      if (target.id === "saveInvoicePdfBtn") {
        if (!state.currentConfirmedOrder) {
          showToast("There is no order to save yet.", "error");
          return;
        }
        printInvoice(state.currentConfirmedOrder);
        return;
      }

      if (target.matches("[data-open-product]")) {
        const productId = target.dataset.openProduct;
        if (productId) openProduct(productId);
        return;
      }

      if (target.matches("[data-add-simple]")) {
        const productId = target.dataset.addSimple;
        const product = getProduct(productId);
        if (!product) return;
        addToCart(productId, clone(product.defaultSelection || {}), 1);
        return;
      }

      if (target.matches("[data-scroll-target]")) {
        event.preventDefault();
        const targetValue = target.dataset.scrollTarget;
        scrollToMenu();
        window.setTimeout(() => {
          if (targetValue === "shawarma") {
            openProduct("shawarma");
          } else if (targetValue === "loaded-fries") {
            openProduct("loaded-fries");
          } else {
            setMenuFilter("all");
          }
        }, 350);
        return;
      }

      if (target.matches("[data-go-slide]")) {
        return;
      }

      if (target.matches("[data-close-cart]")) {
        closeCart();
        return;
      }

      if (target.matches("[data-close-entry-promo]")) {
        const checkbox = $("#dontShowPromoAgain");
        if (checkbox?.checked) saveJSON(STORAGE_KEYS.promoHide, true);
        closeModalById("entryPromoModal");
        return;
      }

      if (target.matches("[data-close-product]")) {
        closeModalById("productDrawer");
        return;
      }

      if (target.matches("[data-close-preorder]")) {
        closeModalById("preorderModal");
        return;
      }

      if (target.matches("[data-close-checkout]")) {
        closeModalById("checkoutModal");
        return;
      }

      if (target.matches("[data-close-history]")) {
        closeModalById("historyModal");
        return;
      }

      if (target.matches("[data-close-confirmed]")) {
        closeModalById("orderConfirmedModal");
        return;
      }

      if (target.matches("[data-history-open]")) {
        const order = getOrderByReference(target.dataset.historyOpen);
        if (order) openConfirmedOrder(order);
        return;
      }

      if (target.matches("[data-history-download]")) {
        const order = getOrderByReference(target.dataset.historyDownload);
        if (order) downloadInvoice(order);
        return;
      }

      if (target.matches("[data-history-print]")) {
        const order = getOrderByReference(target.dataset.historyPrint);
        if (order) printInvoice(order);
        return;
      }

      if (target.matches("[id='historyRefreshBtn']")) {
        renderHistoryList();
        showToast("History refreshed.");
        return;
      }

      if (target.matches("[id='historyClearBtn']")) {
        if (window.confirm("Clear all purchase history?")) {
          saveJSON(STORAGE_KEYS.history, []);
          state.history = [];
          renderHistoryList();
          showToast("Purchase history cleared.");
        }
        return;
      }

      if (target.matches("[data-decrease-qty]")) {
        updateCartQty(target.dataset.decreaseQty, -1);
        return;
      }

      if (target.matches("[data-increase-qty]")) {
        updateCartQty(target.dataset.increaseQty, 1);
        return;
      }

      if (target.matches("[data-remove-item]")) {
        removeCartItem(target.dataset.removeItem);
        return;
      }
    });

    document.addEventListener("submit", (event) => {
      const form = event.target;

      if (form && form.id === "productOptionsForm") {
        event.preventDefault();
        addCurrentProductToCart();
        return;
      }

      if (form && form.id === "checkoutForm") {
        handleCheckoutSubmit(event);
        return;
      }

      if (form && form.id === "preorderForm") {
        handlePreorderSubmit(event);
        return;
      }
    });

    document.addEventListener("change", (event) => {
      const input = event.target;

      if (input && input.closest("#productOptionsForm")) {
        const productId = $("#productOptionsForm")?.dataset.productId;
        if (productId) {
          const selection = readProductSelection(productId);
          if (selection) {
            updateProductPricePreview();
          }
        }
        return;
      }

      if (input && input.id === "orderType") {
        const addressField = $("#customerAddress");
        if (addressField) {
          const delivery = String(input.value) === "pickup" ? "Pickup" : "Delivery";
          addressField.placeholder =
            delivery === "Pickup"
              ? "Optional pickup note"
              : "Delivery address";
        }
        return;
      }

      if (input && input.id === "dontShowPromoAgain" && input.checked) {
        saveJSON(STORAGE_KEYS.promoHide, true);
      }
    });

    document.addEventListener("input", (event) => {
      const input = event.target;

      if (input && input.id === "productQuantity") {
        if (Number(input.value) < 1) input.value = "1";
        updateProductPricePreview();
      }

      if (input && input.id === "historySearch") {
        renderHistoryList();
      }

      if (input && input.id === "checkoutForm") {
        return;
      }

      if (input && input.closest("#checkoutForm")) {
        const form = $("#checkoutForm");
        if (form) {
          const data = readFormValues(form);
          saveCheckoutProfileFromForm(data);
        }
      }

      if (input && input.closest("#preorderForm")) {
        const form = $("#preorderForm");
        if (form) {
          const data = readFormValues(form);
          savePreorder(data);
        }
      }
    });

    $$(".mobile-nav a").forEach((link) => {
      link.addEventListener("click", () => {
        closeOverlay("mobileNav");
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        if (state.openOverlayId) {
          closeOverlay(state.openOverlayId);
          return;
        }

        const anyModal = $$(".modal.is-open").at(-1);
        const anyDrawer = $$(".cart-drawer.is-open").at(-1);
        const mobileNav = $$(".mobile-nav.is-open").at(-1);
        const open = anyModal || anyDrawer || mobileNav;
        if (open) closeOverlay(open.id);
      }

      if (event.key === "ArrowLeft" && !state.openOverlayId) {
        if ($("#hero")) prevHeroSlide();
      }

      if (event.key === "ArrowRight" && !state.openOverlayId) {
        if ($("#hero")) nextHeroSlide();
      }
    });

    document.addEventListener("focusin", (event) => {
      const openModal = $$(".modal.is-open").at(-1) || $$(".cart-drawer.is-open").at(-1) || $$(".mobile-nav.is-open").at(-1);
      if (!openModal) return;

      if (!openModal.contains(event.target)) {
        const focusable = openModal.querySelector(
          "button, input, select, textarea, a[href], [tabindex]:not([tabindex='-1'])"
        );
        if (focusable) focusable.focus();
      }
    });

    const checkoutForm = $("#checkoutForm");
    if (checkoutForm) {
      checkoutForm.addEventListener("click", (event) => {
        const paymentRadio = event.target.closest("input[name='paymentMethod']");
        if (paymentRadio && paymentRadio.disabled) {
          event.preventDefault();
        }
      });
    }
  }

  function initHeaderState() {
    const header = $("#siteHeader");
    if (!header) return;

    const onScroll = () => {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  function initModalBackdrops() {
    document.querySelectorAll(".modal, .cart-drawer, .mobile-nav").forEach((overlay) => {
      overlay.addEventListener("click", (event) => {
        const target = event.target;
        if (target.matches(".modal__backdrop, .cart-drawer__backdrop, .mobile-nav__backdrop, .drawer-backdrop")) {
          closeOverlay(overlay.id);
        }
      });
    });
  }

  function syncHistoryToolbar() {
    ensureHistoryToolbarButtons();
    renderHistoryList();
  }

  function init() {
    loadCart();
    loadHistory();
    initHeaderState();
    initModalBackdrops();
    bindEvents();
    setHeroSlide(0);
    startHeroRotation();
    populateSavedFields();
    applyMenuFilters();
    renderCart();
    syncHistoryToolbar();
    updatePromotionModalState();

    const checkoutOrderType = $("#orderType");
    if (checkoutOrderType) {
      checkoutOrderType.value = "delivery";
    }

    const productQuantity = $("#productQuantity");
    if (productQuantity && !productQuantity.value) productQuantity.value = "1";

    showToast("Welcome to Wrap District.");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
