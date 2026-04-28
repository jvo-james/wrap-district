(() => {
  "use strict";

  const LS_KEYS = {
    cart: "wrapdistrict-cart",
    selections: "wrapdistrict-menu-selections",
    history: "wrapdistrict-purchase-history",
    lastOrder: "wrapdistrict-last-order",
    user: "wrapdistrict-user",
    preorder: "wrapdistrict-preorder",
    promoSeen: "wrapdistrict-entry-promo-seen",
  };

  const PAYSTACK_PUBLIC_KEY = "pk_test_REPLACE_WITH_YOUR_PUBLIC_KEY";
  const PAYSTACK_PERCENT = 0.015;
  const MTN_WITHDRAW_PERCENT = 0.01;

  const PROMO_START = "2026-04-28";
  const PROMO_END = "2026-05-01";

  const IMAGE = {
    shawarma:
      "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=1200&q=80",
    fries:
      "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&w=1200&q=80",
    rice:
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80",
    angwamo:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    jollof:
      "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=1200&q=80",
    noodles:
      "https://images.unsplash.com/photo-1529042410759-befb1204b468?auto=format&fit=crop&w=1200&q=80",
    coke:
      "https://images.unsplash.com/photo-1554866585-cd9465b27f0d?auto=format&fit=crop&w=1200&q=80",
    hero1:
      "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?auto=format&fit=crop&w=1600&q=80",
    hero2:
      "https://images.unsplash.com/photo-1529518169091-5f6a6f1b2f8a?auto=format&fit=crop&w=1600&q=80",
    hero3:
      "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1600&q=80",
  };

  const catalog = {
    shawarma: {
      id: "shawarma",
      name: "Shawarma",
      category: "shawarma",
      image: IMAGE.shawarma,
      promoBadge: "Buy 2 → 1 Free",
      description:
        "Choose size, then protein. Add extra sauce or cheese for more flavor.",
      fixedPrice: null,
      optionSets: [
        {
          key: "size",
          label: "Size",
          type: "radio",
          defaultValue: "Lite",
          options: [
            { label: "Lite", price: 45 },
            { label: "Classic", price: 55 },
            { label: "District Max", price: 70 },
          ],
        },
        {
          key: "protein",
          label: "Protein",
          type: "radio",
          defaultValue: "None",
          options: [
            { label: "None", price: 0 },
            { label: "Extra Chicken", price: 8 },
            { label: "Extra Sausage", price: 4 },
            { label: "Mixed", price: 12 },
          ],
        },
        {
          key: "extras",
          label: "Extras",
          type: "checkbox",
          options: [
            { label: "Extra Sauce", price: 5 },
            { label: "Extra Cheese", price: 10 },
          ],
        },
      ],
    },
    "loaded-fries": {
      id: "loaded-fries",
      name: "Loaded Fries",
      category: "fries",
      image: IMAGE.fries,
      promoBadge: "Free Coke",
      description:
        "Choose a portion, then add protein, cheese, or sauce. A free Coke is added automatically during the promo.",
      fixedPrice: null,
      optionSets: [
        {
          key: "portion",
          label: "Portion",
          type: "radio",
          defaultValue: "Regular",
          options: [
            { label: "Regular", price: 65 },
            { label: "Medium", price: 75 },
            { label: "Large", price: 85 },
          ],
        },
        {
          key: "toppings",
          label: "Toppings",
          type: "checkbox",
          options: [
            { label: "Extra Chicken", price: 15 },
            { label: "Extra Cheese", price: 10 },
            { label: "Extra Sauce", price: 10 },
          ],
        },
      ],
    },
    "fried-rice": {
      id: "fried-rice",
      name: "Fried Rice",
      category: "rice",
      image: IMAGE.rice,
      promoBadge: "Classic Favorite",
      description:
        "Classic spiced fried rice with your choice of protein.",
      fixedPrice: 60,
      optionSets: [
        {
          key: "protein",
          label: "Protein",
          type: "radio",
          defaultValue: "Classic (+Chicken)",
          options: [
            { label: "Classic (+Chicken)", price: 0 },
            { label: "Beef", price: 0 },
            { label: "Gizzard", price: 0 },
          ],
        },
      ],
    },
    "loaded-angwamo": {
      id: "loaded-angwamo",
      name: "Loaded Angwamo",
      category: "angwamo",
      image: IMAGE.angwamo,
      promoBadge: "Best Value",
      description:
        "Tiered upgrade meals with old prices crossed out and new prices highlighted.",
      fixedPrice: null,
      optionSets: [
        {
          key: "tier",
          label: "Tier",
          type: "radio",
          defaultValue: "Basic",
          options: [
            { label: "Basic", price: 60, oldPrice: 65 },
            { label: "Classic", price: 70, oldPrice: 75 },
            { label: "Max (5 proteins)", price: 80, oldPrice: 85 },
          ],
        },
      ],
    },
    "loaded-jollof": {
      id: "loaded-jollof",
      name: "Loaded Jollof",
      category: "rice",
      image: IMAGE.jollof,
      promoBadge: "New",
      description:
        "Hearty portion of Jungle Jumbo fully loaded jollof rice with protein and extras.",
      fixedPrice: 85,
      optionSets: [],
    },
    noodles: {
      id: "noodles",
      name: "Noodles",
      category: "noodles",
      image: IMAGE.noodles,
      promoBadge: "Quick Bite",
      description: "Assorted proteins available for a simple, tasty meal.",
      fixedPrice: 50,
      optionSets: [],
    },
    "promo-coke-free": {
      id: "promo-coke-free",
      name: "Free Coke",
      category: "promo",
      image: IMAGE.coke,
      promoBadge: "Free with Fries",
      description:
        "Automatic promo item added when loaded fries are in cart during promo week.",
      fixedPrice: 0,
      optionSets: [],
    },
  };

  const state = {
    cart: [],
    selections: loadJSON(LS_KEYS.selections, getDefaultSelections()),
    history: loadJSON(LS_KEYS.history, []),
    lastOrder: loadJSON(LS_KEYS.lastOrder, null),
    user: loadJSON(LS_KEYS.user, {
      name: "",
      phone: "",
      email: "",
    }),
    preorder: loadJSON(LS_KEYS.preorder, null),
    currentProductId: null,
    activePanel: null,
    panelStack: [],
    focusReturnTo: null,
    heroIndex: 0,
    heroTimer: null,
    lastToast: 0,
  };

  const dom = {
    body: document.body,
    overlay: byId("globalOverlay"),
    header: byId("siteHeader"),
    cartCountBadge: byId("cartCountBadge"),
    cartLiveTotal: byId("cartLiveTotal"),
    cartDrawer: byId("cartDrawer"),
    openCartBtn: byId("openCartBtn"),
    closeCartBtn: byId("closeCartBtn"),
    openHistoryBtn: byId("openHistoryBtn"),
    openHistoryFromMobileBtn: byId("openHistoryFromMobileBtn"),
    openCartFromMobileBtn: byId("openCartFromMobileBtn"),
    clearCartBtn: byId("clearCartBtn"),
    openCheckoutBtn: byId("openCheckoutBtn"),
    checkoutModal: byId("checkoutModal"),
    checkoutForm: byId("checkoutForm"),
    checkoutSubtotalPreview: byId("checkoutSubtotalPreview"),
    checkoutTotalPreview: byId("checkoutTotalPreview"),
    paystackCheckoutBtn: byId("paystackCheckoutBtn"),
    cartItemsList: byId("cartItemsList"),
    cartSubtotal: byId("cartSubtotal"),
    cartPromoDiscount: byId("cartPromoDiscount"),
    cartTotal: byId("cartTotal"),
    historyModal: byId("historyModal"),
    purchaseHistoryList: byId("purchaseHistoryList"),
    productModal: byId("productModal"),
    productImage: byId("productImage"),
    productCategory: byId("productCategory"),
    productModalTitle: byId("productModalTitle"),
    productDescription: byId("productDescription"),
    productPrice: byId("productPrice"),
    productPromoBadge: byId("productPromoBadge"),
    productOptionsRoot: byId("productOptionsRoot"),
    productAddBtn: byId("productAddBtn"),
    preorderModal: byId("preorderModal"),
    preorderForm: byId("preorderForm"),
    preorderDate: byId("preorderDate"),
    preorderTime: byId("preorderTime"),
    preorderNotes: byId("preorderNotes"),
    entryPromoModal: byId("entryPromoModal"),
    orderConfirmedModal: byId("orderConfirmedModal"),
    orderRef: byId("orderRef"),
    orderName: byId("orderName"),
    orderPhone: byId("orderPhone"),
    orderEmail: byId("orderEmail"),
    orderType: byId("orderType"),
    orderAddress: byId("orderAddress"),
    orderNotes: byId("orderNotes"),
    orderTimestamp: byId("orderTimestamp"),
    orderTotal: byId("orderTotal"),
    orderLineItems: byId("orderLineItems"),
    saveInvoicePdfBtn: byId("saveInvoicePdfBtn"),
    orderOkayBtn: byId("orderOkayBtn"),
    invoicePrintArea: byId("invoicePrintArea"),
    toastRegion: byId("toastRegion"),
    menuToggle: byId("menuToggle"),
    mobileNavDrawer: byId("mobileNavDrawer"),
    closeMenuBtn: byId("closeMenuBtn"),
    menuBackdrop: byId("menuBackdrop"),
    heroSlider: byId("heroSlider"),
    heroPrev: byId("heroPrev"),
    heroNext: byId("heroNext"),
    heroDots: qsa("#heroDots .hero__dot"),
    menuChips: qsa(".menu-nav__chip"),
    menuStageFeatures: qsa(".menu-stage__feature"),
    menuLineupItems: qsa(".menu-lineup__item"),
    topJumpButtons: qsa("[data-jump-to]"),
    productOpenButtons: qsa("[data-open-product]"),
    addToCartButtons: qsa(".add-to-cart-btn"),
    closeModalButtons: qsa("[data-close-modal]"),
    allModals: qsa(".modal"),
    allPanels: qsa(".modal, .cart-drawer, .mobile-nav"),
  };

  const panelFocusablesSelector =
    'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

  init();

  function init() {
    hydrateFormFields();
    hydrateInlineMenuSelections();
    hydrateCartFromStorage();
    syncPromos();
    renderCart();
    renderHistory();
    renderCurrentProductIfOpen();
    updateHeaderTotals();
    bindEvents();
    startHeroSlider();
    maybeShowEntryPromo();
    exposeHelpers();
    syncMenuDisplay();
  }

  function exposeHelpers() {
    window.wrapDistrictOpenPreorder = openPreorderModal;
    window.wrapDistrictOpenCheckout = openCheckoutModal;
  }

  function bindEvents() {
    dom.menuToggle?.addEventListener("click", () => openMobileNav(dom.menuToggle));
    dom.closeMenuBtn?.addEventListener("click", closeMobileNav);
    dom.menuBackdrop?.addEventListener("click", closeMobileNav);

    dom.openCartBtn?.addEventListener("click", () => openCartDrawer(dom.openCartBtn));
    dom.openCartFromMobileBtn?.addEventListener("click", () => {
      closeMobileNav();
      openCartDrawer(dom.openCartFromMobileBtn);
    });
    dom.closeCartBtn?.addEventListener("click", closeCartDrawer);

    dom.openHistoryBtn?.addEventListener("click", () =>
      openHistoryModal(dom.openHistoryBtn)
    );
    dom.openHistoryFromMobileBtn?.addEventListener("click", () => {
      closeMobileNav();
      openHistoryModal(dom.openHistoryFromMobileBtn);
    });

    dom.clearCartBtn?.addEventListener("click", clearCart);
    dom.openCheckoutBtn?.addEventListener("click", openCheckoutModal);

    dom.checkoutForm?.addEventListener("submit", handleCheckoutSubmit);
    dom.paystackCheckoutBtn?.addEventListener("click", (e) => {
      if (!state.cart.length) {
        e.preventDefault();
        toast("Your cart is empty.");
      }
    });

    dom.preorderForm?.addEventListener("submit", handlePreorderSubmit);
    dom.saveInvoicePdfBtn?.addEventListener("click", saveInvoiceAsPdf);
    dom.orderOkayBtn?.addEventListener("click", closeOrderConfirmed);

    dom.heroPrev?.addEventListener("click", prevHeroSlide);
    dom.heroNext?.addEventListener("click", nextHeroSlide);
    dom.heroDots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const index = Number(dot.dataset.goTo || 0);
        goToHeroSlide(index);
      });
    });

    dom.topJumpButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.jumpTo;
        const highlight = btn.dataset.highlight;
        if (highlight) filterMenu(highlight);
        if (target) {
          const el = document.querySelector(target);
          if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });

    dom.menuChips.forEach((chip) => {
      chip.addEventListener("click", () => {
        dom.menuChips.forEach((c) => c.classList.remove("is-active"));
        chip.classList.add("is-active");
        filterMenu(chip.dataset.filter || "all");
      });
    });

    dom.productOpenButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const productId = btn.dataset.openProduct;
        if (productId) openProductModal(productId, btn);
      });
    });

    dom.addToCartButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const productId = btn.dataset.itemId;
        if (!productId) return;
        const selection = readInlineSelection(productId);
        addProductToCart(productId, selection, 1);
        toast(`${catalog[productId].name} added to cart.`);
      });
    });

    dom.menuStageFeatures.forEach((feature) => {
      const id = feature.dataset.menuItem;
      if (!id) return;
      feature.addEventListener("click", (event) => {
        const target = event.target;
        if (target.closest("button, input, label")) return;
        openProductModal(id, feature);
      });
    });

    dom.menuLineupItems.forEach((item) => {
      const id = item.dataset.menuItem;
      if (!id) return;
      item.addEventListener("click", (event) => {
        const target = event.target;
        if (target.closest("button")) return;
        openProductModal(id, item);
      });
    });

    document.addEventListener("change", handleGlobalChange);
    document.addEventListener("input", handleGlobalInput);
    document.addEventListener("click", handleDocumentClick);
    document.addEventListener("keydown", handleGlobalKeydown);

    dom.overlay?.addEventListener("click", () => {
      closeTopMostPanel();
    });

    dom.closeModalButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = btn.dataset.closeModal;
        if (target) closePanel(byId(target));
      });
    });

    dom.cartItemsList?.addEventListener("click", handleCartListClick);
    dom.purchaseHistoryList?.addEventListener("click", handleHistoryListClick);
    dom.productAddBtn?.addEventListener("click", () => {
      if (!state.currentProductId) return;
      const selection = readProductModalSelection(state.currentProductId);
      addProductToCart(state.currentProductId, selection, 1);
      toast(`${catalog[state.currentProductId].name} added to cart.`);
      closePanel(dom.productModal);
    });

    bindFormFieldPersistence();
    bindPanelBackdropClose();
    bindSwipeAndScrollGuard();
    bindResize();
  }

  function bindSwipeAndScrollGuard() {
    let startX = 0;
    let startY = 0;

    const touchTarget = dom.mobileNavDrawer;
    if (!touchTarget) return;

    touchTarget.addEventListener(
      "touchstart",
      (e) => {
        if (!e.touches || !e.touches.length) return;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
      },
      { passive: true }
    );

    touchTarget.addEventListener(
      "touchend",
      (e) => {
        if (!e.changedTouches || !e.changedTouches.length) return;
        const dx = e.changedTouches[0].clientX - startX;
        const dy = e.changedTouches[0].clientY - startY;
        if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy)) {
          closeMobileNav();
        }
      },
      { passive: true }
    );
  }

  function bindResize() {
    window.addEventListener("resize", () => {
      if (window.innerWidth >= 960) {
        closeMobileNav();
      }
    });
  }

  function bindPanelBackdropClose() {
    const panelIds = [
      "cartDrawer",
      "checkoutModal",
      "historyModal",
      "productModal",
      "preorderModal",
      "entryPromoModal",
      "mobileNavDrawer",
      "orderConfirmedModal",
    ];

    panelIds.forEach((id) => {
      const panel = byId(id);
      if (!panel) return;
      panel.addEventListener("keydown", trapFocus);
    });
  }

  function bindFormFieldPersistence() {
    const fields = [
      "checkoutName",
      "checkoutPhone",
      "checkoutEmail",
      "checkoutAddress",
      "checkoutNotes",
      "checkoutDate",
      "checkoutTime",
      "preorderDate",
      "preorderTime",
      "preorderNotes",
    ];

    fields.forEach((id) => {
      const el = byId(id);
      if (!el) return;

      el.value = getPersistedFieldValue(id);

      el.addEventListener("input", () => {
        persistFieldValue(id, el.value);
      });
    });
  }

  function handleGlobalChange(event) {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const inMenu = target.closest(".menu-stage__feature");
    if (inMenu) {
      const productId = inMenu.dataset.menuItem;
      if (productId && isConfigurable(productId)) {
        state.selections[productId] = readInlineSelection(productId);
        persistSelections();
        updateInlinePriceHint(productId);
      }
    }

    if (target.matches("#checkoutOrderType")) {
      persistFieldValue("checkoutOrderType", target.value);
    }

    if (target.matches('input[name="paymentMethod"]')) {
      persistFieldValue("paymentMethod", target.value);
    }

    if (target.closest("#productOptionsRoot")) {
      updateProductModalPrice();
    }
  }

  function handleGlobalInput(event) {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    if (target.closest(".menu-stage__feature")) {
      const productId = target.closest(".menu-stage__feature")?.dataset.menuItem;
      if (productId && isConfigurable(productId)) {
        state.selections[productId] = readInlineSelection(productId);
        persistSelections();
        updateInlinePriceHint(productId);
      }
    }

    if (
      target.matches("#checkoutName") ||
      target.matches("#checkoutPhone") ||
      target.matches("#checkoutEmail") ||
      target.matches("#checkoutAddress") ||
      target.matches("#checkoutNotes") ||
      target.matches("#checkoutDate") ||
      target.matches("#checkoutTime") ||
      target.matches("#preorderDate") ||
      target.matches("#preorderTime") ||
      target.matches("#preorderNotes")
    ) {
      persistFieldValue(target.id, target.value);
    }
  }

  function handleDocumentClick(event) {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;

    const drawerButton = target.closest("[data-action]");
    if (drawerButton) {
      const action = drawerButton.dataset.action;
      const key = drawerButton.dataset.key;
      if (action === "inc" && key) incrementCartItem(key);
      if (action === "dec" && key) decrementCartItem(key);
      if (action === "remove" && key) removeCartItem(key);
      return;
    }

    if (target.closest("[data-reorder-order]")) {
      const index = Number(target.closest("[data-reorder-order]")?.dataset.reorderOrder || -1);
      if (Number.isFinite(index) && index >= 0) reorderPastOrder(index);
    }

    if (target.matches("[data-open-preorder]")) {
      openPreorderModal(target);
    }

    if (target.matches("[data-close-panel]")) {
      const panel = byId(target.dataset.closePanel);
      if (panel) closePanel(panel);
    }
  }

  function handleGlobalKeydown(event) {
    if (event.key === "Escape") {
      closeTopMostPanel();
      return;
    }

    if (event.altKey && !event.ctrlKey && !event.metaKey) {
      const key = event.key.toLowerCase();
      if (key === "c") {
        event.preventDefault();
        openCartDrawer();
      }
      if (key === "h") {
        event.preventDefault();
        openHistoryModal();
      }
      if (key === "m") {
        event.preventDefault();
        openMobileNav();
      }
      if (key === "p") {
        event.preventDefault();
        openPreorderModal();
      }
    }

    if (isTypingTarget(event.target)) return;

    if (event.key === "ArrowLeft" && isHeroVisible()) {
      prevHeroSlide();
    }

    if (event.key === "ArrowRight" && isHeroVisible()) {
      nextHeroSlide();
    }
  }

  function isTypingTarget(target) {
    const el = target;
    if (!(el instanceof HTMLElement)) return false;
    return (
      el.matches("input, textarea, select") || el.isContentEditable === true
    );
  }

  function isHeroVisible() {
    const hero = byId("hero");
    if (!hero) return false;
    const rect = hero.getBoundingClientRect();
    return rect.top < window.innerHeight && rect.bottom > 0;
  }

  function trapFocus(event) {
    const panel = event.currentTarget;
    if (!(panel instanceof HTMLElement)) return;

    if (event.key !== "Tab") return;
    const focusable = [...panel.querySelectorAll(panelFocusablesSelector)].filter(
      (el) => !el.hasAttribute("disabled") && isVisible(el)
    );
    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const current = document.activeElement;

    if (event.shiftKey && current === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && current === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function isVisible(el) {
    return !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length);
  }

  function openMobileNav(trigger) {
    closeAllPanels("mobileNavDrawer");
    dom.mobileNavDrawer?.setAttribute("aria-hidden", "false");
    dom.mobileNavDrawer?.classList.add("is-open");
    showOverlay();
    lockBody();
    setPanel("mobileNavDrawer", trigger);
    focusFirst(dom.mobileNavDrawer);
  }

  function closeMobileNav() {
    const panel = dom.mobileNavDrawer;
    if (!panel) return;
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    clearPanel("mobileNavDrawer");
    hideOverlayIfNoneOpen();
    unlockBodyIfNoneOpen();
    restoreFocus();
  }

  function openCartDrawer(trigger) {
    closeAllPanels("cartDrawer");
    dom.cartDrawer?.setAttribute("aria-hidden", "false");
    dom.cartDrawer?.classList.add("is-open");
    showOverlay();
    lockBody();
    setPanel("cartDrawer", trigger);
    focusFirst(dom.cartDrawer);
    renderCart();
  }

  function closeCartDrawer() {
    const panel = dom.cartDrawer;
    if (!panel) return;
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    clearPanel("cartDrawer");
    hideOverlayIfNoneOpen();
    unlockBodyIfNoneOpen();
    restoreFocus();
  }

  function openHistoryModal(trigger) {
    closeAllPanels("historyModal");
    dom.historyModal?.setAttribute("aria-hidden", "false");
    dom.historyModal?.classList.add("is-open");
    showOverlay();
    lockBody();
    setPanel("historyModal", trigger);
    renderHistory();
    focusFirst(dom.historyModal);
  }

  function openCheckoutModal(trigger) {
    if (!state.cart.length) {
      toast("Your cart is empty.");
      return;
    }
    closePanel(dom.cartDrawer);
    closeAllPanels("checkoutModal");
    dom.checkoutModal?.setAttribute("aria-hidden", "false");
    dom.checkoutModal?.classList.add("is-open");
    showOverlay();
    lockBody();
    setPanel("checkoutModal", trigger);
    prefillCheckoutForm();
    renderCheckoutSummary();
    focusFirst(dom.checkoutModal);
  }

  function closeCheckoutModal() {
    closePanel(dom.checkoutModal);
  }

  function openProductModal(productId, trigger) {
    const product = catalog[productId];
    if (!product) return;

    closeAllPanels("productModal");
    state.currentProductId = productId;
    renderProductModal(productId);
    dom.productModal?.setAttribute("aria-hidden", "false");
    dom.productModal?.classList.add("is-open");
    showOverlay();
    lockBody();
    setPanel("productModal", trigger);
    focusFirst(dom.productModal);
  }

  function openPreorderModal(trigger) {
    closeAllPanels("preorderModal");
    dom.preorderModal?.setAttribute("aria-hidden", "false");
    dom.preorderModal?.classList.add("is-open");
    showOverlay();
    lockBody();
    setPanel("preorderModal", trigger);
    hydratePreorderForm();
    focusFirst(dom.preorderModal);
  }

  function maybeShowEntryPromo() {
    const seen = localStorage.getItem(LS_KEYS.promoSeen);
    if (seen) return;
    window.setTimeout(() => {
      openEntryPromoModal();
      localStorage.setItem(LS_KEYS.promoSeen, String(Date.now()));
    }, 500);
  }

  function openEntryPromoModal() {
    closeAllPanels("entryPromoModal");
    dom.entryPromoModal?.setAttribute("aria-hidden", "false");
    dom.entryPromoModal?.classList.add("is-open");
    showOverlay();
    lockBody();
    setPanel("entryPromoModal", document.activeElement);
    focusFirst(dom.entryPromoModal);
  }

  function closeOrderConfirmed() {
    closePanel(dom.orderConfirmedModal);
  }

  function closePanel(panel) {
    if (!panel) return;
    const id = panel.id;
    if (id === "cartDrawer") return closeCartDrawer();
    if (id === "mobileNavDrawer") return closeMobileNav();
    if (id === "checkoutModal") return closeCheckoutModal();
    if (id === "historyModal") {
      panel.classList.remove("is-open");
      panel.setAttribute("aria-hidden", "true");
      clearPanel("historyModal");
    }
    if (id === "productModal") {
      panel.classList.remove("is-open");
      panel.setAttribute("aria-hidden", "true");
      clearPanel("productModal");
      state.currentProductId = null;
    }
    if (id === "preorderModal") {
      panel.classList.remove("is-open");
      panel.setAttribute("aria-hidden", "true");
      clearPanel("preorderModal");
    }
    if (id === "entryPromoModal") {
      panel.classList.remove("is-open");
      panel.setAttribute("aria-hidden", "true");
      clearPanel("entryPromoModal");
    }
    if (id === "orderConfirmedModal") {
      panel.classList.remove("is-open");
      panel.setAttribute("aria-hidden", "true");
      clearPanel("orderConfirmedModal");
    }

    hideOverlayIfNoneOpen();
    unlockBodyIfNoneOpen();
    restoreFocus();
  }

  function closeAllPanels(exceptId = "") {
    const ids = [
      "cartDrawer",
      "checkoutModal",
      "historyModal",
      "productModal",
      "preorderModal",
      "entryPromoModal",
      "mobileNavDrawer",
      "orderConfirmedModal",
    ];

    ids.forEach((id) => {
      if (id === exceptId) return;
      const panel = byId(id);
      if (!panel) return;
      panel.classList.remove("is-open");
      panel.setAttribute("aria-hidden", "true");
      clearPanel(id);
    });

    hideOverlayIfNoneOpen();
    unlockBodyIfNoneOpen();
  }

  function closeTopMostPanel() {
    const openIds = [
      "orderConfirmedModal",
      "entryPromoModal",
      "preorderModal",
      "productModal",
      "checkoutModal",
      "historyModal",
      "cartDrawer",
      "mobileNavDrawer",
    ];
    const openPanelId = openIds.find((id) => {
      const panel = byId(id);
      return panel && panel.classList.contains("is-open");
    });

    if (openPanelId) {
      closePanel(byId(openPanelId));
    }
  }

  function setPanel(id, trigger) {
    state.panelStack.push(id);
    state.focusReturnTo = trigger && trigger.focus ? trigger : document.activeElement;
    state.activePanel = id;
  }

  function clearPanel(id) {
    state.panelStack = state.panelStack.filter((item) => item !== id);
    state.activePanel = state.panelStack[state.panelStack.length - 1] || null;
    if (!state.panelStack.length) {
      state.focusReturnTo = null;
    }
  }

  function restoreFocus() {
    const target = state.focusReturnTo;
    if (target && typeof target.focus === "function") {
      window.setTimeout(() => target.focus(), 0);
    }
  }

  function focusFirst(panel) {
    if (!panel) return;
    const focusable = [...panel.querySelectorAll(panelFocusablesSelector)].filter(
      (el) => !el.hasAttribute("disabled") && isVisible(el)
    );
    const target = focusable[0] || panel;
    window.setTimeout(() => {
      if (target && typeof target.focus === "function") target.focus();
    }, 0);
  }

  function showOverlay() {
    if (!dom.overlay) return;
    dom.overlay.hidden = false;
    dom.overlay.classList.add("is-visible");
  }

  function hideOverlayIfNoneOpen() {
    const anyOpen = [
      dom.cartDrawer,
      dom.checkoutModal,
      dom.historyModal,
      dom.productModal,
      dom.preorderModal,
      dom.entryPromoModal,
      dom.mobileNavDrawer,
      dom.orderConfirmedModal,
    ].some((panel) => panel && panel.classList.contains("is-open"));
    if (!anyOpen && dom.overlay) {
      dom.overlay.classList.remove("is-visible");
      dom.overlay.hidden = true;
    }
  }

  function lockBody() {
    dom.body.style.overflow = "hidden";
  }

  function unlockBodyIfNoneOpen() {
    const anyOpen = [
      dom.cartDrawer,
      dom.checkoutModal,
      dom.historyModal,
      dom.productModal,
      dom.preorderModal,
      dom.entryPromoModal,
      dom.mobileNavDrawer,
      dom.orderConfirmedModal,
    ].some((panel) => panel && panel.classList.contains("is-open"));
    if (!anyOpen) {
      dom.body.style.overflow = "";
    }
  }

  function hydrateFormFields() {
    const name = byId("checkoutName");
    const phone = byId("checkoutPhone");
    const email = byId("checkoutEmail");
    const address = byId("checkoutAddress");
    const notes = byId("checkoutNotes");
    const date = byId("checkoutDate");
    const time = byId("checkoutTime");

    if (name) name.value = state.user.name || "";
    if (phone) phone.value = state.user.phone || "";
    if (email) email.value = state.user.email || "";
    if (address && !address.value) address.value = "";
    if (notes && !notes.value) notes.value = "";

    if (date && state.lastOrder?.preferredDate) date.value = state.lastOrder.preferredDate;
    if (time && state.lastOrder?.preferredTime) time.value = state.lastOrder.preferredTime;
  }

  function hydratePreorderForm() {
    if (dom.preorderDate && state.preorder?.date) dom.preorderDate.value = state.preorder.date;
    if (dom.preorderTime && state.preorder?.time) dom.preorderTime.value = state.preorder.time;
    if (dom.preorderNotes && state.preorder?.notes) dom.preorderNotes.value = state.preorder.notes;
  }

  function prefillCheckoutForm() {
    const fields = {
      checkoutName: state.user.name || "",
      checkoutPhone: state.user.phone || "",
      checkoutEmail: state.user.email || "",
      checkoutAddress: state.lastOrder?.address || "",
      checkoutNotes: state.lastOrder?.notes || "",
      checkoutDate: state.lastOrder?.preferredDate || "",
      checkoutTime: state.lastOrder?.preferredTime || "",
    };

    Object.entries(fields).forEach(([id, value]) => {
      const el = byId(id);
      if (el && !el.value) el.value = value;
    });

    const orderType = byId("checkoutOrderType");
    if (orderType && state.lastOrder?.orderType) {
      orderType.value = state.lastOrder.orderType;
    }

    const payment = document.querySelector(
      'input[name="paymentMethod"][value="Paystack mobile money or card"]'
    );
    if (payment instanceof HTMLInputElement) {
      payment.checked = true;
    }

    state.user.name = byId("checkoutName")?.value?.trim() || state.user.name;
    state.user.phone = byId("checkoutPhone")?.value?.trim() || state.user.phone;
    state.user.email = byId("checkoutEmail")?.value?.trim() || state.user.email;
    persistUser();
  }

  function hydrateInlineMenuSelections() {
    Object.entries(state.selections || {}).forEach(([productId, selection]) => {
      applyInlineSelection(productId, selection);
      updateInlinePriceHint(productId);
    });
  }

  function applyInlineSelection(productId, selection) {
    const feature = document.querySelector(
      `[data-menu-item="${cssEscape(productId)}"]`
    );
    if (!feature) return;
    const formInputs = feature.querySelectorAll("input");
    formInputs.forEach((input) => {
      if (input.type === "radio") {
        input.checked = selection[input.name?.split("-").pop() || ""] === input.value;
      }
    });

    const radios = feature.querySelectorAll('input[type="radio"]');
    radios.forEach((radio) => {
      const key = radio.name.includes("shawarma")
        ? radio.name.includes("size")
          ? "size"
          : "protein"
        : radio.name.includes("fries")
        ? "portion"
        : radio.name.includes("fried")
        ? "protein"
        : radio.name.includes("angwamo")
        ? "tier"
        : "";
      if (!key) return;
      radio.checked = getSelectionValue(selection, key) === radio.value;
    });

    const checks = feature.querySelectorAll('input[type="checkbox"]');
    checks.forEach((cb) => {
      const key = cb.name.includes("shawarma")
        ? "extras"
        : cb.name.includes("fries")
        ? "toppings"
        : "";
      if (!key) return;
      cb.checked = (selection[key] || []).includes(cb.parentElement?.textContent?.trim().split(" ")[0] || cb.value);
    });
  }

  function readInlineSelection(productId) {
    const feature = document.querySelector(
      `[data-menu-item="${cssEscape(productId)}"]`
    );
    if (!feature) return {};

    if (productId === "shawarma") {
      return {
        size: getCheckedValue(feature, 'input[name="shawarma-size"]') || "Lite",
        protein:
          getCheckedValue(feature, 'input[name="shawarma-protein"]') || "None",
        extras: getCheckedValues(feature, 'input[name="shawarma-extra-sauce"], input[name="shawarma-extra-cheese"]'),
      };
    }

    if (productId === "loaded-fries") {
      return {
        portion: getCheckedValue(feature, 'input[name="fries-portion"]') || "Regular",
        toppings: getCheckedValues(
          feature,
          'input[name="fries-chicken"], input[name="fries-cheese"], input[name="fries-sauce"]'
        ),
      };
    }

    return {};
  }

  function readProductModalSelection(productId) {
    const root = dom.productOptionsRoot;
    if (!root) return {};
    if (!isConfigurable(productId)) return {};

    if (productId === "shawarma") {
      return {
        size: getCheckedValue(root, 'input[name="modal-shawarma-size"]') || "Lite",
        protein:
          getCheckedValue(root, 'input[name="modal-shawarma-protein"]') || "None",
        extras: getCheckedValues(
          root,
          'input[name="modal-shawarma-extra-sauce"], input[name="modal-shawarma-extra-cheese"]'
        ),
      };
    }

    if (productId === "loaded-fries") {
      return {
        portion:
          getCheckedValue(root, 'input[name="modal-fries-portion"]') || "Regular",
        toppings: getCheckedValues(
          root,
          'input[name="modal-fries-chicken"], input[name="modal-fries-cheese"], input[name="modal-fries-sauce"]'
        ),
      };
    }

    if (productId === "fried-rice") {
      return {
        protein:
          getCheckedValue(root, 'input[name="modal-fried-rice-protein"]') ||
          "Classic (+Chicken)",
      };
    }

    if (productId === "loaded-angwamo") {
      return {
        tier:
          getCheckedValue(root, 'input[name="modal-angwamo-tier"]') || "Basic",
      };
    }

    return {};
  }

  function renderProductModal(productId) {
    const product = catalog[productId];
    if (!product || !dom.productOptionsRoot) return;

    if (dom.productImage) {
      dom.productImage.src = product.image;
      dom.productImage.alt = product.name;
    }

    if (dom.productCategory) {
      dom.productCategory.textContent =
        product.category.charAt(0).toUpperCase() + product.category.slice(1);
    }

    if (dom.productModalTitle) dom.productModalTitle.textContent = product.name;
    if (dom.productDescription) dom.productDescription.textContent = product.description;
    if (dom.productPromoBadge) dom.productPromoBadge.textContent = product.promoBadge;

    const selection = state.selections[productId] || getDefaultSelectionFor(productId);

    if (!isConfigurable(productId)) {
      dom.productOptionsRoot.innerHTML = `
        <div class="product-modal__fixed">
          <div class="product-modal__fixed-price">
            <strong>${formatMoney(product.fixedPrice)}</strong>
            <span>Ready to add</span>
          </div>
        </div>
      `;
      if (dom.productPrice) dom.productPrice.textContent = formatMoney(product.fixedPrice);
      if (dom.productAddBtn) dom.productAddBtn.textContent = "Add to cart";
      return;
    }

    dom.productOptionsRoot.innerHTML = buildOptionsMarkup(productId, selection);
    bindProductModalOptionEvents();
    updateProductModalPrice();
  }

  function bindProductModalOptionEvents() {
    if (!dom.productOptionsRoot) return;
    dom.productOptionsRoot.querySelectorAll("input").forEach((input) => {
      input.addEventListener("change", () => {
        updateProductModalPrice();
      });
    });
  }

  function updateProductModalPrice() {
    if (!state.currentProductId || !dom.productPrice) return;
    const product = catalog[state.currentProductId];
    const selection = readProductModalSelection(state.currentProductId);
    const price = calculateProductPrice(state.currentProductId, selection);
    dom.productPrice.textContent = formatMoney(price);

    if (dom.productAddBtn) {
      dom.productAddBtn.textContent = product.optionSets.length
        ? `Add to cart ${formatMoney(price)}`
        : "Add to cart";
    }
  }

  function updateInlinePriceHint(productId) {
    const feature = document.querySelector(
      `[data-menu-item="${cssEscape(productId)}"]`
    );
    if (!feature) return;
    const priceNode = feature.querySelector(".menu-stage__price");
    if (!priceNode) return;
    const selection = readInlineSelection(productId);
    const price = calculateProductPrice(productId, selection);
    if (productId === "shawarma") {
      priceNode.textContent = `From ${formatMoney(price)}`;
    }
    if (productId === "loaded-fries") {
      priceNode.textContent = `From ${formatMoney(price)}`;
    }
  }

  function buildOptionsMarkup(productId, selection) {
    const product = catalog[productId];
    if (!product || !product.optionSets.length) return "";

    let html = `<div class="product-options">`;

    product.optionSets.forEach((group) => {
      html += `<fieldset class="product-options__group">
        <legend>${escapeHtml(group.label)}</legend>`;

      if (group.type === "radio") {
        group.options.forEach((option) => {
          const checked = getSelectionValue(selection, group.key) === option.label;
          const inputName = modalInputName(productId, group.key);
          html += `
            <label class="product-options__option">
              <input type="radio" name="${inputName}" value="${escapeAttr(option.label)}" ${checked ? "checked" : ""} />
              <span>${escapeHtml(option.label)}</span>
              <strong>${option.oldPrice ? `<del>${formatMoney(option.oldPrice)}</del> ` : ""}${option.price ? `+${formatMoney(option.price)}` : "Included"}</strong>
            </label>
          `;
        });
      }

      if (group.type === "checkbox") {
        const values = getSelectionList(selection, group.key);
        group.options.forEach((option) => {
          const checked = values.includes(option.label);
          const inputName = modalInputName(productId, group.key);
          html += `
            <label class="product-options__option">
              <input type="checkbox" name="${inputName}" value="${escapeAttr(option.label)}" ${checked ? "checked" : ""} />
              <span>${escapeHtml(option.label)}</span>
              <strong>+${formatMoney(option.price)}</strong>
            </label>
          `;
        });
      }

      html += `</fieldset>`;
    });

    html += `</div>`;
    return html;
  }

  function calculateProductPrice(productId, selection = {}) {
    const product = catalog[productId];
    if (!product) return 0;
    if (!isConfigurable(productId)) return product.fixedPrice || 0;

    if (productId === "shawarma") {
      const size = selection.size || "Lite";
      const protein = selection.protein || "None";
      const extras = selection.extras || [];
      const sizePrice = lookupOptionPrice(product, "size", size);
      const proteinPrice = lookupOptionPrice(product, "protein", protein);
      const extrasPrice = extras.reduce((sum, item) => {
        sum += lookupOptionPrice(product, "extras", item);
        return sum;
      }, 0);
      return sizePrice + proteinPrice + extrasPrice;
    }

    if (productId === "loaded-fries") {
      const portion = selection.portion || "Regular";
      const toppings = selection.toppings || [];
      const portionPrice = lookupOptionPrice(product, "portion", portion);
      const toppingsPrice = toppings.reduce((sum, item) => {
        sum += lookupOptionPrice(product, "toppings", item);
        return sum;
      }, 0);
      return portionPrice + toppingsPrice;
    }

    if (productId === "fried-rice") {
      return 60;
    }

    if (productId === "loaded-angwamo") {
      const tier = selection.tier || "Basic";
      return lookupOptionPrice(product, "tier", tier);
    }

    return product.fixedPrice || 0;
  }

  function lookupOptionPrice(product, groupKey, optionLabel) {
    const group = product.optionSets.find((item) => item.key === groupKey);
    if (!group) return 0;
    const option = group.options.find((item) => item.label === optionLabel);
    return option ? Number(option.price || 0) : 0;
  }

  function addProductToCart(productId, selection = {}, qty = 1) {
    const product = catalog[productId];
    if (!product) return;

    const normalizedSelection = normalizeSelection(productId, selection);
    const unitPrice = calculateProductPrice(productId, normalizedSelection);
    const key = cartItemKey(productId, normalizedSelection);

    const existing = state.cart.find((item) => item.key === key);
    if (existing) {
      existing.qty += qty;
    } else {
      state.cart.push({
        key,
        id: product.id,
        name: product.name,
        category: product.category,
        image: product.image,
        unitPrice,
        qty,
        selection: normalizedSelection,
        details: selectionSummary(productId, normalizedSelection),
        promoFree: false,
        locked: false,
      });
    }

    state.cart = mergeDuplicateCartItems(state.cart);
    syncPromos();
    saveCart();
    renderCart();
    updateHeaderTotals();
  }

  function incrementCartItem(key) {
    const item = state.cart.find((entry) => entry.key === key);
    if (!item) return;
    if (item.locked) return;
    item.qty += 1;
    syncPromos();
    saveCart();
    renderCart();
    updateHeaderTotals();
  }

  function decrementCartItem(key) {
    const item = state.cart.find((entry) => entry.key === key);
    if (!item) return;
    if (item.locked) return;
    item.qty -= 1;
    if (item.qty <= 0) {
      removeCartItem(key);
      return;
    }
    syncPromos();
    saveCart();
    renderCart();
    updateHeaderTotals();
  }

  function removeCartItem(key) {
    state.cart = state.cart.filter((item) => item.key !== key);
    syncPromos();
    saveCart();
    renderCart();
    updateHeaderTotals();
  }

  function clearCart() {
    if (!state.cart.length) {
      toast("Your cart is already empty.");
      return;
    }
    const confirmed = window.confirm("Clear the whole cart?");
    if (!confirmed) return;
    state.cart = [];
    syncPromos();
    saveCart();
    renderCart();
    updateHeaderTotals();
    toast("Cart cleared.");
  }

  function reorderPastOrder(index) {
    const order = state.history[index];
    if (!order) return;
    order.items.forEach((item) => {
      const productId = item.id;
      const selection = item.selection || {};
      const qty = item.qty || 1;
      if (productId && catalog[productId]) {
        addProductToCart(productId, selection, qty);
      }
    });
    toast("Order added back to cart.");
    openCartDrawer();
  }

  function syncPromos() {
    state.cart = state.cart.filter((item) => item.id !== "promo-coke-free");

    if (isPromoWeek() && hasLoadedFriesInCart()) {
      state.cart.push({
        key: "promo-coke-free",
        id: "promo-coke-free",
        name: "Free Coke",
        category: "promo",
        image: catalog["promo-coke-free"].image,
        unitPrice: 0,
        qty: 1,
        selection: {},
        details: "Automatic promo item",
        promoFree: true,
        locked: true,
      });
    }

    state.cart = mergeDuplicateCartItems(state.cart);
  }

  function hasLoadedFriesInCart() {
    return state.cart.some((item) => item.id === "loaded-fries" && item.qty > 0);
  }

  function calculateShawarmaPromoDiscount() {
    if (!isPromoWeek()) return 0;

    const shawarmaUnits = [];
    state.cart.forEach((item) => {
      if (item.id !== "shawarma" || item.promoFree) return;
      for (let i = 0; i < item.qty; i += 1) {
        shawarmaUnits.push(item.unitPrice);
      }
    });

    shawarmaUnits.sort((a, b) => a - b);
    const freeCount = Math.floor(shawarmaUnits.length / 3);
    return shawarmaUnits.slice(0, freeCount).reduce((sum, value) => sum + value, 0);
  }

  function calculateSubtotal() {
    return state.cart.reduce((sum, item) => sum + item.unitPrice * item.qty, 0);
  }

  function calculateCartTotal() {
    return Math.max(0, calculateSubtotal() - calculateShawarmaPromoDiscount());
  }

  function calculateProcessingFee(amount) {
    const paystackFee = amount * PAYSTACK_PERCENT;
    const mtnFee = amount * MTN_WITHDRAW_PERCENT;
    return roundMoney(paystackFee + mtnFee);
  }

  function calculateCheckoutCharge(amount) {
    return roundMoney(amount + calculateProcessingFee(amount));
  }

  function renderCart() {
    if (!dom.cartItemsList) return;

    if (!state.cart.length) {
      dom.cartItemsList.innerHTML = `
        <div class="empty-state">
          <i class="fa-solid fa-basket-shopping"></i>
          <strong>Your cart is empty</strong>
          <p>Add a shawarma, fries, rice, or noodles to get started.</p>
        </div>
      `;
    } else {
      dom.cartItemsList.innerHTML = state.cart.map(renderCartItem).join("");
    }

    const subtotal = calculateSubtotal();
    const discount = calculateShawarmaPromoDiscount();
    const total = calculateCartTotal();

    if (dom.cartSubtotal) dom.cartSubtotal.textContent = formatMoney(subtotal);
    if (dom.cartPromoDiscount)
      dom.cartPromoDiscount.textContent = `-${formatMoney(discount)}`;
    if (dom.cartTotal) dom.cartTotal.textContent = formatMoney(total);

    renderCheckoutSummary();
    renderHistory();
    updateHeaderTotals();
  }

  function renderCartItem(item) {
    const isPromoFree = item.promoFree;
    const details = item.details ? escapeHtml(item.details) : "";
    const qtyControls = isPromoFree
      ? `<span class="cart-item__promo">Automatic promo item</span>`
      : `
        <div class="cart-item__qty">
          <button type="button" data-action="dec" data-key="${escapeAttr(item.key)}" aria-label="Decrease quantity">
            <i class="fa-solid fa-minus"></i>
          </button>
          <strong>${item.qty}</strong>
          <button type="button" data-action="inc" data-key="${escapeAttr(item.key)}" aria-label="Increase quantity">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      `;

    const removeBtn = isPromoFree
      ? ""
      : `<button class="cart-item__remove" type="button" data-action="remove" data-key="${escapeAttr(item.key)}" aria-label="Remove item">
            <i class="fa-solid fa-trash-can"></i>
         </button>`;

    return `
      <article class="cart-item">
        <img class="cart-item__image" src="${escapeAttr(item.image)}" alt="${escapeAttr(item.name)}" />
        <div class="cart-item__body">
          <div class="cart-item__top">
            <div>
              <h3>${escapeHtml(item.name)}</h3>
              <p>${details || escapeHtml(item.category)}</p>
            </div>
            <strong>${isPromoFree ? "Free" : formatMoney(item.unitPrice)}</strong>
          </div>
          <div class="cart-item__footer">
            ${qtyControls}
            ${removeBtn}
          </div>
        </div>
      </article>
    `;
  }

  function updateHeaderTotals() {
    const totalQty = state.cart.reduce((sum, item) => sum + item.qty, 0);
    const total = calculateCartTotal();

    if (dom.cartCountBadge) dom.cartCountBadge.textContent = String(totalQty);
    if (dom.cartLiveTotal) dom.cartLiveTotal.textContent = formatMoney(total);
  }

  function renderCheckoutSummary() {
    if (!dom.checkoutSubtotalPreview || !dom.checkoutTotalPreview) return;

    const subtotal = calculateSubtotal();
    const charge = calculateCheckoutCharge(calculateCartTotal());
    const fee = calculateProcessingFee(calculateCartTotal());

    dom.checkoutSubtotalPreview.textContent = formatMoney(subtotal);

    ensureCheckoutFeeRow();
    const feeRowValue = byId("checkoutProcessingFeeValue");
    if (feeRowValue) feeRowValue.textContent = formatMoney(fee);

    dom.checkoutTotalPreview.textContent = formatMoney(charge);
  }

  function ensureCheckoutFeeRow() {
    const summary = document.querySelector(".checkout-form__summary");
    if (!summary) return;
    if (byId("checkoutProcessingFeeRow")) return;

    const row = document.createElement("div");
    row.id = "checkoutProcessingFeeRow";
    row.className = "checkout-form__summary-row";
    row.innerHTML = `
      <span>Processing fee</span>
      <strong id="checkoutProcessingFeeValue">${formatMoney(0)}</strong>
    `;
    const totalBlock = summary.querySelector("div:last-child");
    if (totalBlock) {
      summary.insertBefore(row, totalBlock);
    } else {
      summary.appendChild(row);
    }
  }

  function handleCheckoutSubmit(event) {
    event.preventDefault();

    if (!state.cart.length) {
      toast("Your cart is empty.");
      return;
    }

    const form = event.currentTarget;
    const name = byId("checkoutName")?.value.trim() || "";
    const phone = byId("checkoutPhone")?.value.trim() || "";
    const email = byId("checkoutEmail")?.value.trim() || "";
    const orderType = byId("checkoutOrderType")?.value || "Delivery";
    const address = byId("checkoutAddress")?.value.trim() || "";
    const preferredDate = byId("checkoutDate")?.value || "";
    const preferredTime = byId("checkoutTime")?.value || "";
    const notes = byId("checkoutNotes")?.value.trim() || "";
    const paymentMethod = document.querySelector(
      'input[name="paymentMethod"]:checked'
    )?.value || "Paystack mobile money or card";

    if (!name) return toastAndFocus("Please enter your name.", "checkoutName");
    if (!phone) return toastAndFocus("Please enter your phone number.", "checkoutPhone");
    if (!email) return toastAndFocus("Please enter your email address.", "checkoutEmail");
    if (orderType === "Delivery" && !address)
      return toastAndFocus("Please enter a delivery address.", "checkoutAddress");

    state.user = { name, phone, email };
    persistUser();

    const checkoutSubtotal = calculateCartTotal();
    const amountToCharge = calculateCheckoutCharge(checkoutSubtotal);
    const reference = generateReference();

    const paymentPayload = {
      reference,
      name,
      phone,
      email,
      orderType,
      address,
      preferredDate,
      preferredTime,
      notes,
      paymentMethod,
      subtotal: checkoutSubtotal,
      amountToCharge,
      items: cloneCartForOrder(),
      timestamp: new Date().toISOString(),
      currency: "GHS",
      processingFee: calculateProcessingFee(checkoutSubtotal),
    };

    if (
      paymentMethod === "Paystack mobile money or card" &&
      window.PaystackPop &&
      typeof window.PaystackPop.setup === "function" &&
      PAYSTACK_PUBLIC_KEY &&
      !PAYSTACK_PUBLIC_KEY.includes("REPLACE_WITH_YOUR_PUBLIC_KEY")
    ) {
      const handler = window.PaystackPop.setup({
        key: PAYSTACK_PUBLIC_KEY,
        email,
        amount: Math.round(amountToCharge * 100),
        currency: "GHS",
        ref: reference,
        metadata: {
          custom_fields: [
            { display_name: "Name", variable_name: "name", value: name },
            { display_name: "Phone", variable_name: "phone", value: phone },
            { display_name: "Order type", variable_name: "order_type", value: orderType },
          ],
        },
        callback: function (response) {
          completeOrder({
            ...paymentPayload,
            paymentReference: response?.reference || reference,
            paymentStatus: "paid",
          });
        },
        onClose: function () {
          toast("Payment window closed.");
        },
      });

      try {
        handler.openIframe();
        toast("Redirecting to Paystack.");
      } catch (error) {
        console.error(error);
        simulateSuccessfulPayment(paymentPayload);
      }
      return;
    }

    simulateSuccessfulPayment(paymentPayload);
  }

  function simulateSuccessfulPayment(paymentPayload) {
    toast("Payment completed.");
    window.setTimeout(() => {
      completeOrder({
        ...paymentPayload,
        paymentReference: paymentPayload.reference,
        paymentStatus: "paid-demo",
      });
    }, 300);
  }

  function completeOrder(orderPayload) {
    const order = {
      reference: orderPayload.reference,
      paymentReference: orderPayload.paymentReference || orderPayload.reference,
      paymentStatus: orderPayload.paymentStatus || "paid",
      name: orderPayload.name,
      phone: orderPayload.phone,
      email: orderPayload.email,
      orderType: orderPayload.orderType,
      address: orderPayload.address,
      preferredDate: orderPayload.preferredDate,
      preferredTime: orderPayload.preferredTime,
      notes: orderPayload.notes,
      paymentMethod: orderPayload.paymentMethod,
      subtotal: orderPayload.subtotal,
      amountToCharge: orderPayload.amountToCharge,
      processingFee: orderPayload.processingFee,
      items: orderPayload.items,
      timestamp: orderPayload.timestamp,
      currency: orderPayload.currency,
    };

    state.lastOrder = order;
    state.history.unshift(order);
    persistLastOrder();
    persistHistory();

    renderOrderConfirmation(order);

    state.cart = [];
    syncPromos();
    saveCart();
    renderCart();
    updateHeaderTotals();

    closePanel(dom.checkoutModal);
    openOrderConfirmedModal();
    toast("Order confirmed.");
  }

  function openOrderConfirmedModal() {
    closeAllPanels("orderConfirmedModal");
    dom.orderConfirmedModal?.setAttribute("aria-hidden", "false");
    dom.orderConfirmedModal?.classList.add("is-open");
    showOverlay();
    lockBody();
    setPanel("orderConfirmedModal", document.activeElement);
    focusFirst(dom.orderConfirmedModal);
  }

  function renderOrderConfirmation(order) {
    if (!order) return;

    if (dom.orderRef) dom.orderRef.textContent = order.reference || "-";
    if (dom.orderName) dom.orderName.textContent = order.name || "-";
    if (dom.orderPhone) dom.orderPhone.textContent = order.phone || "-";
    if (dom.orderEmail) dom.orderEmail.textContent = order.email || "-";
    if (dom.orderType) dom.orderType.textContent = order.orderType || "-";
    if (dom.orderAddress)
      dom.orderAddress.textContent = order.address || "Pickup at Devtraco";
    if (dom.orderNotes)
      dom.orderNotes.textContent = order.notes || "No notes provided";
    if (dom.orderTimestamp)
      dom.orderTimestamp.textContent = formatTimestamp(order.timestamp);
    if (dom.orderTotal)
      dom.orderTotal.textContent = formatMoney(order.amountToCharge || order.subtotal || 0);

    if (dom.orderLineItems) {
      dom.orderLineItems.innerHTML = (order.items || [])
        .map(
          (item) => `
          <div class="order-line-item">
            <img src="${escapeAttr(item.image)}" alt="${escapeAttr(item.name)}" />
            <div>
              <strong>${escapeHtml(item.name)}</strong>
              <span>${escapeHtml(item.details || "")}</span>
            </div>
            <em>${item.promoFree ? "Free" : formatMoney(item.unitPrice)} × ${item.qty}</em>
          </div>
        `
        )
        .join("");
    }

    renderInvoiceArea(order);
  }

  function renderInvoiceArea(order) {
    if (!dom.invoicePrintArea) return;
    dom.invoicePrintArea.innerHTML = buildInvoiceHtml(order);
  }

  function buildInvoiceHtml(order) {
    const itemsHtml = (order.items || [])
      .map(
        (item) => `
        <tr>
          <td>${escapeHtml(item.name)}</td>
          <td>${escapeHtml(item.details || "")}</td>
          <td>${item.qty}</td>
          <td>${item.promoFree ? "Free" : formatMoney(item.unitPrice)}</td>
          <td>${item.promoFree ? "Free" : formatMoney(item.unitPrice * item.qty)}</td>
        </tr>
      `
      )
      .join("");

    return `
      <div class="invoice">
        <div class="invoice__header">
          <h1>WRAP District</h1>
          <p>Tema Community 25, Devtraco</p>
          <p>Phone: 0552509241 | Email: kennethkamkam22@gmail.com</p>
        </div>
        <div class="invoice__meta">
          <div><strong>Reference</strong><span>${escapeHtml(order.reference)}</span></div>
          <div><strong>Name</strong><span>${escapeHtml(order.name)}</span></div>
          <div><strong>Phone</strong><span>${escapeHtml(order.phone)}</span></div>
          <div><strong>Email</strong><span>${escapeHtml(order.email)}</span></div>
          <div><strong>Order type</strong><span>${escapeHtml(order.orderType)}</span></div>
          <div><strong>Address</strong><span>${escapeHtml(order.address || "Pickup at Devtraco")}</span></div>
          <div><strong>Timestamp</strong><span>${escapeHtml(formatTimestamp(order.timestamp))}</span></div>
        </div>
        <table class="invoice__table">
          <thead>
            <tr>
              <th>Item</th>
              <th>Details</th>
              <th>Qty</th>
              <th>Price</th>
              <th>Line total</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
        <div class="invoice__summary">
          <div><span>Subtotal</span><strong>${formatMoney(order.subtotal || 0)}</strong></div>
          <div><span>Processing fee</span><strong>${formatMoney(order.processingFee || 0)}</strong></div>
          <div><span>Total</span><strong>${formatMoney(order.amountToCharge || 0)}</strong></div>
        </div>
        <p class="invoice__note">Checkout price does not include delivery fees. Delivery is estimated after checkout.</p>
      </div>
    `;
  }

  function saveInvoiceAsPdf() {
    const order = state.lastOrder;
    if (!order) {
      toast("No order available.");
      return;
    }

    const html = buildPrintableDocument(order);
    const popup = window.open("", "_blank", "width=900,height=1100");
    if (!popup) {
      toast("Please allow popups to save or print the invoice.");
      return;
    }

    popup.document.open();
    popup.document.write(html);
    popup.document.close();
    popup.focus();

    window.setTimeout(() => {
      popup.print();
    }, 500);
  }

  function buildPrintableDocument(order) {
    return `
      <!doctype html>
      <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Wrap District Invoice</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 24px; color: #111; }
          h1, h2, h3, p { margin: 0 0 10px; }
          .invoice { max-width: 900px; margin: 0 auto; }
          .invoice__header { padding-bottom: 16px; border-bottom: 2px solid #111; margin-bottom: 16px; }
          .invoice__meta { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 10px 16px; margin-bottom: 16px; }
          .invoice__meta div { padding: 10px 12px; border: 1px solid #ddd; border-radius: 8px; }
          .invoice__meta strong { display: block; font-size: 12px; text-transform: uppercase; margin-bottom: 6px; }
          .invoice__meta span { font-size: 14px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
          th, td { border: 1px solid #ddd; padding: 10px; text-align: left; vertical-align: top; }
          th { background: #f5f5f5; }
          .invoice__summary { margin-left: auto; width: min(360px, 100%); display: grid; gap: 10px; }
          .invoice__summary div { display: flex; justify-content: space-between; padding: 10px 12px; border: 1px solid #ddd; border-radius: 8px; }
          .invoice__note { margin-top: 16px; font-size: 12px; color: #444; }
          @media print {
            body { margin: 0; }
            .invoice { max-width: none; }
          }
        </style>
      </head>
      <body>
        ${buildInvoiceHtml(order)}
      </body>
      </html>
    `;
  }

  function renderHistory() {
    if (!dom.purchaseHistoryList) return;

    if (!state.history.length) {
      dom.purchaseHistoryList.innerHTML = `
        <div class="empty-state">
          <i class="fa-regular fa-clock"></i>
          <strong>No purchases yet</strong>
          <p>Your completed orders will appear here.</p>
        </div>
      `;
      return;
    }

    dom.purchaseHistoryList.innerHTML = state.history
      .map((order, index) => {
        return `
          <article class="history-item">
            <div class="history-item__top">
              <div>
                <strong>${escapeHtml(order.reference)}</strong>
                <p>${escapeHtml(formatTimestamp(order.timestamp))}</p>
              </div>
              <strong>${formatMoney(order.amountToCharge || order.subtotal || 0)}</strong>
            </div>
            <div class="history-item__meta">
              <span>${escapeHtml(order.orderType || "")}</span>
              <span>${escapeHtml(order.address || "Pickup at Devtraco")}</span>
            </div>
            <div class="history-item__actions">
              <button type="button" class="secondary-btn" data-reorder-order="${index}">
                Reorder
              </button>
            </div>
          </article>
        `;
      })
      .join("");
  }

  function handleHistoryListClick(event) {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const button = target.closest("[data-reorder-order]");
    if (!button) return;
    const index = Number(button.dataset.reorderOrder || -1);
    if (Number.isFinite(index) && index >= 0) reorderPastOrder(index);
  }

  function handleCartListClick(event) {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const actionBtn = target.closest("[data-action]");
    if (!actionBtn) return;
    const action = actionBtn.dataset.action;
    const key = actionBtn.dataset.key;
    if (!key) return;

    if (action === "inc") incrementCartItem(key);
    if (action === "dec") decrementCartItem(key);
    if (action === "remove") removeCartItem(key);
  }

  function filterMenu(filter) {
    dom.menuStageFeatures.forEach((item) => {
      const category = item.dataset.menuItem;
      const visible =
        filter === "all" ||
        category === filter ||
        (filter === "rice" && (category === "fried-rice" || category === "loaded-jollof")) ||
        (filter === "fries" && category === "loaded-fries") ||
        (filter === "shawarma" && category === "shawarma") ||
        (filter === "angwamo" && category === "loaded-angwamo") ||
        (filter === "noodles" && category === "noodles");

      item.hidden = !visible;
    });

    dom.menuLineupItems.forEach((item) => {
      const category = item.dataset.menuItem;
      const visible =
        filter === "all" ||
        (filter === "rice" && (category === "fried-rice" || category === "loaded-jollof")) ||
        filter === category ||
        (filter === "shawarma" && category === "shawarma") ||
        (filter === "fries" && category === "loaded-fries") ||
        (filter === "angwamo" && category === "loaded-angwamo") ||
        (filter === "noodles" && category === "noodles");

      item.hidden = !visible;
    });
  }

  function syncMenuDisplay() {
    filterMenu("all");
  }

  function startHeroSlider() {
    stopHeroSlider();
    goToHeroSlide(0);
    state.heroTimer = window.setInterval(() => {
      nextHeroSlide();
    }, 7000);
  }

  function stopHeroSlider() {
    if (state.heroTimer) {
      window.clearInterval(state.heroTimer);
      state.heroTimer = null;
    }
  }

  function goToHeroSlide(index) {
    const slides = qsa(".hero__slide");
    const dots = dom.heroDots;
    if (!slides.length) return;

    state.heroIndex = (index + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("hero__slide--active", slideIndex === state.heroIndex);
      slide.setAttribute("aria-hidden", slideIndex === state.heroIndex ? "false" : "true");
    });

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === state.heroIndex);
      dot.setAttribute("aria-current", dotIndex === state.heroIndex ? "true" : "false");
    });
  }

  function nextHeroSlide() {
    goToHeroSlide(state.heroIndex + 1);
  }

  function prevHeroSlide() {
    goToHeroSlide(state.heroIndex - 1);
  }

  function persistSelections() {
    localStorage.setItem(LS_KEYS.selections, JSON.stringify(state.selections));
  }

  function persistHistory() {
    localStorage.setItem(LS_KEYS.history, JSON.stringify(state.history));
  }

  function persistLastOrder() {
    localStorage.setItem(LS_KEYS.lastOrder, JSON.stringify(state.lastOrder));
  }

  function persistUser() {
    localStorage.setItem(LS_KEYS.user, JSON.stringify(state.user));
  }

  function saveCart() {
    localStorage.setItem(LS_KEYS.cart, JSON.stringify(state.cart));
  }

  function hydrateCartFromStorage() {
    const stored = loadJSON(LS_KEYS.cart, []);
    state.cart = Array.isArray(stored) ? stored : [];
    state.cart = mergeDuplicateCartItems(state.cart);
  }

  function handlePreorderSubmit(event) {
    event.preventDefault();
    const date = dom.preorderDate?.value || "";
    const time = dom.preorderTime?.value || "";
    const notes = dom.preorderNotes?.value.trim() || "";

    state.preorder = { date, time, notes };
    localStorage.setItem(LS_KEYS.preorder, JSON.stringify(state.preorder));
    toast("Preorder saved.");
    closePanel(dom.preorderModal);
  }

  function updateCurrentOrderFields(order) {
    state.lastOrder = order;
    persistLastOrder();
  }

  function renderCurrentProductIfOpen() {
    if (state.currentProductId) renderProductModal(state.currentProductId);
  }

  function toast(message) {
    if (!dom.toastRegion) return;
    const now = Date.now();
    if (now - state.lastToast < 300) return;
    state.lastToast = now;

    const toastEl = document.createElement("div");
    toastEl.className = "toast";
    toastEl.setAttribute("role", "status");
    toastEl.textContent = message;
    dom.toastRegion.appendChild(toastEl);

    window.setTimeout(() => {
      toastEl.classList.add("is-showing");
    }, 10);

    window.setTimeout(() => {
      toastEl.classList.remove("is-showing");
      window.setTimeout(() => {
        toastEl.remove();
      }, 250);
    }, 2800);
  }

  function toastAndFocus(message, fieldId) {
    toast(message);
    const field = byId(fieldId);
    if (field && typeof field.focus === "function") {
      field.focus();
    }
  }

  function updateInlinePriceHint(productId) {
    const feature = document.querySelector(
      `[data-menu-item="${cssEscape(productId)}"]`
    );
    if (!feature) return;
    const priceNode = feature.querySelector(".menu-stage__price");
    if (!priceNode) return;
    const selection = readInlineSelection(productId);
    const price = calculateProductPrice(productId, selection);
    priceNode.textContent = `From ${formatMoney(price)}`;
  }

  function cloneCartForOrder() {
    return state.cart.map((item) => ({
      ...item,
      selection: { ...(item.selection || {}) },
    }));
  }

  function mergeDuplicateCartItems(items) {
    const map = new Map();
    items.forEach((item) => {
      if (!item || !item.key) return;
      const existing = map.get(item.key);
      if (!existing) {
        map.set(item.key, {
          ...item,
          qty: Number(item.qty || 0),
        });
      } else {
        existing.qty += Number(item.qty || 0);
      }
    });

    return [...map.values()].filter((item) => item.qty > 0);
  }

  function getDefaultSelections() {
    return {
      shawarma: {
        size: "Lite",
        protein: "None",
        extras: [],
      },
      "loaded-fries": {
        portion: "Regular",
        toppings: [],
      },
      "fried-rice": {
        protein: "Classic (+Chicken)",
      },
      "loaded-angwamo": {
        tier: "Basic",
      },
    };
  }

  function getDefaultSelectionFor(productId) {
    return structuredCloneSafe(getDefaultSelections()[productId] || {});
  }

  function normalizeSelection(productId, selection) {
    const clean = structuredCloneSafe(selection || {});
    if (productId === "shawarma") {
      clean.size = clean.size || "Lite";
      clean.protein = clean.protein || "None";
      clean.extras = uniqueArray(clean.extras || []);
    } else if (productId === "loaded-fries") {
      clean.portion = clean.portion || "Regular";
      clean.toppings = uniqueArray(clean.toppings || []);
    } else if (productId === "fried-rice") {
      clean.protein = clean.protein || "Classic (+Chicken)";
    } else if (productId === "loaded-angwamo") {
      clean.tier = clean.tier || "Basic";
    }
    return clean;
  }

  function selectionSummary(productId, selection) {
    if (productId === "shawarma") {
      const extras = selection.extras?.length ? ` • ${selection.extras.join(", ")}` : "";
      return `${selection.size} • ${selection.protein}${extras}`;
    }
    if (productId === "loaded-fries") {
      const toppings = selection.toppings?.length
        ? ` • ${selection.toppings.join(", ")}`
        : "";
      return `${selection.portion}${toppings}`;
    }
    if (productId === "fried-rice") {
      return selection.protein || "Classic (+Chicken)";
    }
    if (productId === "loaded-angwamo") {
      return selection.tier || "Basic";
    }
    return "";
  }

  function cartItemKey(productId, selection) {
    const normalized = normalizeSelection(productId, selection);
    return `${productId}:${stableStringify(normalized)}`;
  }

  function isConfigurable(productId) {
    return ["shawarma", "loaded-fries", "fried-rice", "loaded-angwamo"].includes(
      productId
    );
  }

  function modalInputName(productId, groupKey) {
    return `modal-${productId}-${groupKey}`;
  }

  function getCheckedValue(root, selector) {
    const input = root.querySelector(`${selector}:checked`);
    return input instanceof HTMLInputElement ? input.value : "";
  }

  function getCheckedValues(root, selector) {
    return [...root.querySelectorAll(selector)]
      .filter((el) => el instanceof HTMLInputElement && el.checked)
      .map((el) => el.value);
  }

  function getSelectionValue(selection, key) {
    return selection && typeof selection === "object" ? selection[key] : undefined;
  }

  function getSelectionList(selection, key) {
    const value = getSelectionValue(selection, key);
    return Array.isArray(value) ? value : [];
  }

  function byId(id) {
    return document.getElementById(id);
  }

  function qsa(selector, root = document) {
    return [...root.querySelectorAll(selector)];
  }

  function loadJSON(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return fallback;
      return JSON.parse(raw);
    } catch {
      return fallback;
    }
  }

  function persistFieldValue(id, value) {
    if (!id) return;
    if (id === "checkoutName" || id === "checkoutPhone" || id === "checkoutEmail") {
      state.user[id.replace("checkout", "").toLowerCase()] = value;
      persistUser();
    }
    localStorage.setItem(`wrapdistrict-${id}`, value);
  }

  function getPersistedFieldValue(id) {
    return localStorage.getItem(`wrapdistrict-${id}`) || "";
  }

  function generateReference() {
    const now = new Date();
    const stamp = [
      now.getFullYear(),
      pad(now.getMonth() + 1),
      pad(now.getDate()),
      pad(now.getHours()),
      pad(now.getMinutes()),
      pad(now.getSeconds()),
    ].join("");
    const rand = Math.random().toString(36).slice(2, 7).toUpperCase();
    return `WD-${stamp}-${rand}`;
  }

  function formatTimestamp(iso) {
    if (!iso) return "-";
    const date = new Date(iso);
    return new Intl.DateTimeFormat("en-GH", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date);
  }

  function formatMoney(value) {
    return `GHC ${Number(value || 0).toLocaleString("en-GH", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }

  function roundMoney(value) {
    return Math.round((Number(value || 0) + Number.EPSILON) * 100) / 100;
  }

  function pad(n) {
    return String(n).padStart(2, "0");
  }

  function stableStringify(value) {
    if (value === null || typeof value !== "object") return JSON.stringify(value);
    if (Array.isArray(value)) return `[${value.map((v) => stableStringify(v)).join(",")}]`;
    const keys = Object.keys(value).sort();
    return `{${keys
      .map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`)
      .join(",")}}`;
  }

  function uniqueArray(arr) {
    return [...new Set((arr || []).filter(Boolean))];
  }

  function structuredCloneSafe(value) {
    if (typeof structuredClone === "function") {
      try {
        return structuredClone(value);
      } catch {
        return JSON.parse(JSON.stringify(value));
      }
    }
    return JSON.parse(JSON.stringify(value));
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function escapeAttr(value) {
    return escapeHtml(value).replaceAll("`", "&#96;");
  }

  function cssEscape(value) {
    if (window.CSS && typeof window.CSS.escape === "function") {
      return window.CSS.escape(String(value));
    }
    return String(value).replace(/[^a-zA-Z0-9_-]/g, "\\$&");
  }

  function getCurrentAccraDateKey() {
    return new Intl.DateTimeFormat("en-CA", {
      timeZone: "Africa/Accra",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }).format(new Date());
  }

  function isPromoWeek() {
    const today = getCurrentAccraDateKey();
    return today >= PROMO_START && today <= PROMO_END;
  }

  function hasOpenPanels() {
    return [
      dom.cartDrawer,
      dom.checkoutModal,
      dom.historyModal,
      dom.productModal,
      dom.preorderModal,
      dom.entryPromoModal,
      dom.mobileNavDrawer,
      dom.orderConfirmedModal,
    ].some((panel) => panel && panel.classList.contains("is-open"));
  }

  function prefillOrderAfterSuccess(order) {
    updateCurrentOrderFields(order);
    renderOrderConfirmation(order);
  }

  function openOrderConfirmedWith(order) {
    prefillOrderAfterSuccess(order);
    closeAllPanels("orderConfirmedModal");
    dom.orderConfirmedModal?.setAttribute("aria-hidden", "false");
    dom.orderConfirmedModal?.classList.add("is-open");
    showOverlay();
    lockBody();
    setPanel("orderConfirmedModal", document.activeElement);
    focusFirst(dom.orderConfirmedModal);
  }

  function completeOrder(orderPayload) {
    const order = {
      ...orderPayload,
      subtotal: roundMoney(orderPayload.subtotal || 0),
      amountToCharge: roundMoney(orderPayload.amountToCharge || 0),
      processingFee: roundMoney(orderPayload.processingFee || 0),
      items: Array.isArray(orderPayload.items) ? orderPayload.items : [],
    };

    state.lastOrder = order;
    state.history.unshift(order);
    persistLastOrder();
    persistHistory();
    openOrderConfirmedWith(order);
    state.cart = [];
    syncPromos();
    saveCart();
    renderCart();
    updateHeaderTotals();
    closeCheckoutModal();
    closeCartDrawer();
    toast("Order confirmed.");
  }

  function renderCheckoutSummary() {
    if (!dom.checkoutSubtotalPreview || !dom.checkoutTotalPreview) return;
    const subtotal = calculateCartTotal();
    const charge = calculateCheckoutCharge(subtotal);
    const fee = calculateProcessingFee(subtotal);

    dom.checkoutSubtotalPreview.textContent = formatMoney(subtotal);

    ensureCheckoutFeeRow();
    const feeValue = byId("checkoutProcessingFeeValue");
    if (feeValue) feeValue.textContent = formatMoney(fee);

    dom.checkoutTotalPreview.textContent = formatMoney(charge);
  }

  function openPanelById(id, trigger) {
    const panel = byId(id);
    if (!panel) return;
    closeAllPanels(id);
    panel.setAttribute("aria-hidden", "false");
    panel.classList.add("is-open");
    showOverlay();
    lockBody();
    setPanel(id, trigger);
    focusFirst(panel);
  }

})();
