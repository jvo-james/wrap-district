(() => {
  'use strict'

  const STORAGE_KEYS = {
    cart: 'wrapDistrict_cart_v1',
    menuPrefs: 'wrapDistrict_menuPrefs_v1',
    preorder: 'wrapDistrict_preorder_v1',
    history: 'wrapDistrict_history_v1',
    lastOrder: 'wrapDistrict_lastOrder_v1',
    promoClaims: 'wrapDistrict_promoClaims_v1',
    customer: 'wrapDistrict_customer_v1'
  }

  const PAYSTACK_PUBLIC_KEY = 'pk_test_WRAPDISTRICT_PLACEHOLDER'
  const CURRENCY = 'GHS'
  const SHAWARMA_PROMO_START = new Date('2026-04-28T00:00:00')
  const SHAWARMA_PROMO_END = new Date('2026-05-01T23:59:59')
  const LOADED_FRIES_PROMO_START = new Date('2026-04-28T00:00:00')
  const LOADED_FRIES_PROMO_END = new Date('2026-05-01T23:59:59')

  const PRODUCTS = {
    shawarma: {
      id: 'shawarma',
      name: 'Shawarma',
      category: 'shawarma',
      badge: 'Buy 2 -> 1 Free',
      image:
        'https://images.unsplash.com/photo-1606756790138-261d2b21cd75?auto=format&fit=crop&w=1200&q=80',
      basePrice: 45,
      description: 'Choose size, then protein. Clear pricing tiers with rich add-ons.',
      options: [
        {
          id: 'size',
          label: 'Choose size',
          type: 'radio',
          required: true,
          choices: [
            { label: 'Lite', value: 'Lite', price: 45 },
            { label: 'Classic', value: 'Classic', price: 55 },
            { label: 'District Max', value: 'District Max', price: 70 }
          ]
        },
        {
          id: 'protein',
          label: 'Extra protein',
          type: 'radio',
          required: true,
          choices: [
            { label: 'None', value: 'None', price: 0 },
            { label: 'Extra Chicken', value: 'Extra Chicken', price: 8 },
            { label: 'Extra Sausage', value: 'Extra Sausage', price: 4 },
            { label: 'Mixed', value: 'Mixed', price: 12 }
          ]
        },
        {
          id: 'extras',
          label: 'Extras',
          type: 'checkbox',
          required: false,
          choices: [
            { label: 'Extra Sauce', value: 'Extra Sauce', price: 5 },
            { label: 'Extra Cheese', value: 'Extra Cheese', price: 10 }
          ]
        }
      ]
    },

    'loaded-fries': {
      id: 'loaded-fries',
      name: 'Loaded Fries',
      category: 'loaded-fries',
      badge: 'Free Coke',
      image:
        'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=1200&q=80',
      basePrice: 65,
      description: 'Choose portion and add protein, cheese, or sauce.',
      options: [
        {
          id: 'portion',
          label: 'Choose portion',
          type: 'radio',
          required: true,
          choices: [
            { label: 'Regular', value: 'Regular', price: 65 },
            { label: 'Medium', value: 'Medium', price: 75 },
            { label: 'Large', value: 'Large', price: 85 }
          ]
        },
        {
          id: 'toppings',
          label: 'Toppings',
          type: 'checkbox',
          required: false,
          choices: [
            { label: 'Extra Chicken', value: 'Extra Chicken', price: 15 },
            { label: 'Extra Cheese', value: 'Extra Cheese', price: 10 },
            { label: 'Extra Sauce', value: 'Extra Sauce', price: 10 }
          ]
        }
      ]
    },

    'fried-rice': {
      id: 'fried-rice',
      name: 'Fried Rice',
      category: 'rice',
      badge: 'Rice',
      image:
        'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=1200&q=80',
      basePrice: 60,
      description: 'Classic spiced fried rice. Choose your protein.',
      options: [
        {
          id: 'protein',
          label: 'Choose protein',
          type: 'radio',
          required: true,
          choices: [
            { label: 'Chicken', value: 'Chicken', price: 60 },
            { label: 'Beef', value: 'Beef', price: 60 },
            { label: 'Gizzard', value: 'Gizzard', price: 60 }
          ]
        }
      ]
    },

    'loaded-angwamo': {
      id: 'loaded-angwamo',
      name: 'Loaded Angwamo',
      category: 'angwamo',
      badge: 'New price',
      image:
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      basePrice: 60,
      description: 'Tiered value with premium protein choices and upgraded portions.',
      options: [
        {
          id: 'tier',
          label: 'Choose tier',
          type: 'radio',
          required: true,
          choices: [
            { label: 'Basic', value: 'Basic', price: 60, oldPrice: 65 },
            { label: 'Classic', value: 'Classic', price: 70, oldPrice: 75 },
            { label: 'Max', value: 'Max', price: 80, oldPrice: 85, note: '5 proteins' }
          ]
        }
      ]
    },

    'loaded-jollof': {
      id: 'loaded-jollof',
      name: 'Loaded Jollof',
      category: 'rice',
      badge: 'New',
      image:
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80',
      basePrice: 85,
      description: 'Jungle Jumbo Fully Loaded Jollof rice with protein and extras.',
      options: [
        {
          id: 'protein',
          label: 'Choose protein',
          type: 'radio',
          required: false,
          choices: [
            { label: 'Chicken', value: 'Chicken', price: 0 },
            { label: 'Beef', value: 'Beef', price: 0 },
            { label: 'Gizzard', value: 'Gizzard', price: 0 },
            { label: 'Mixed', value: 'Mixed', price: 5 }
          ]
        },
        {
          id: 'extras',
          label: 'Extras',
          type: 'checkbox',
          required: false,
          choices: [
            { label: 'Extra Sauce', value: 'Extra Sauce', price: 5 },
            { label: 'Extra Cheese', value: 'Extra Cheese', price: 10 }
          ]
        }
      ]
    },

    noodles: {
      id: 'noodles',
      name: 'Noodles',
      category: 'specials',
      badge: 'Popular',
      image:
        'https://images.unsplash.com/photo-1559314809-0b0f2c3b0a0a?auto=format&fit=crop&w=1200&q=80',
      basePrice: 50,
      description: 'Assorted proteins available for a quick and satisfying meal.',
      options: [
        {
          id: 'protein',
          label: 'Choose protein',
          type: 'radio',
          required: false,
          choices: [
            { label: 'Chicken', value: 'Chicken', price: 0 },
            { label: 'Beef', value: 'Beef', price: 0 },
            { label: 'Sausage', value: 'Sausage', price: 0 },
            { label: 'Mixed', value: 'Mixed', price: 5 }
          ]
        },
        {
          id: 'extras',
          label: 'Extras',
          type: 'checkbox',
          required: false,
          choices: [
            { label: 'Extra Sauce', value: 'Extra Sauce', price: 5 },
            { label: 'Extra Cheese', value: 'Extra Cheese', price: 10 }
          ]
        }
      ]
    },

    coke: {
      id: 'coke',
      name: 'Coke',
      category: 'promo',
      badge: 'Free',
      image:
        'https://images.unsplash.com/photo-1629203851122-3726ec9f501a?auto=format&fit=crop&w=1200&q=80',
      basePrice: 0,
      description: 'Free Coke added automatically with loaded fries promo.',
      promoOnly: true,
      locked: true
    }
  }

  const state = {
    cart: [],
    history: [],
    selectedHistoryId: null,
    lastOpenProduct: null,
    productQuantity: 1,
    productSelections: {},
    activeSlide: 0,
    filterCategory: 'all',
    searchQuery: '',
    preorder: {},
    focusStack: [],
    sliderTimer: null,
    promoClaims: {
      entry: false
    }
  }

  const els = {}

  function $(selector, root = document) {
    return root.querySelector(selector)
  }

  function $all(selector, root = document) {
    return Array.from(root.querySelectorAll(selector))
  }

  function money(value) {
    const amount = Number.isFinite(value) ? value : 0
    return `${CURRENCY} ${amount.toFixed(2)}`
  }

  function safeParse(key, fallback) {
    try {
      const raw = localStorage.getItem(key)
      return raw ? JSON.parse(raw) : fallback
    } catch {
      return fallback
    }
  }

  function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  function getProduct(id) {
    return PRODUCTS[id] || null
  }

  function capitalize(text) {
    return String(text)
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (m) => m.toUpperCase())
  }

  function formatSelections(selections) {
    const parts = []
    Object.entries(selections || {}).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length) {
        parts.push(`${capitalize(key)}: ${value.join(', ')}`)
      } else if (value) {
        parts.push(`${capitalize(key)}: ${value}`)
      }
    })
    return parts.join(' • ')
  }

  function showToast(message, variant = 'default') {
    let toast = document.getElementById('appToast')
    if (!toast) {
      toast = document.createElement('div')
      toast.id = 'appToast'
      toast.className = 'app-toast'
      toast.setAttribute('role', 'status')
      toast.setAttribute('aria-live', 'polite')
      document.body.appendChild(toast)
    }

    toast.textContent = message
    toast.dataset.variant = variant
    toast.classList.add('app-toast--visible')

    clearTimeout(showToast._t)
    showToast._t = setTimeout(() => {
      toast.classList.remove('app-toast--visible')
    }, 2600)
  }

  function lockScroll(lock) {
    document.documentElement.classList.toggle('is-scroll-locked', lock)
    document.body.classList.toggle('is-scroll-locked', lock)
  }

  function openDrawer(el) {
    if (!el) return
    el.classList.add('is-open')
    el.setAttribute('aria-hidden', 'false')
    lockScroll(true)
  }

  function closeDrawer(el) {
    if (!el) return
    el.classList.remove('is-open')
    el.setAttribute('aria-hidden', 'true')
    if (
      !document.querySelector('.modal.is-open') &&
      !document.querySelector('.cart-drawer.is-open') &&
      !document.querySelector('.mobile-nav.is-open')
    ) {
      lockScroll(false)
    }
  }

  function openModal(modalId) {
    const modal = document.getElementById(modalId)
    if (!modal) return

    state.focusStack.push(document.activeElement)
    modal.classList.add('is-open')
    modal.setAttribute('aria-hidden', 'false')
    lockScroll(true)

    const firstFocusable = modal.querySelector(
      'button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])'
    )
    if (firstFocusable) firstFocusable.focus({ preventScroll: true })
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId)
    if (!modal) return

    modal.classList.remove('is-open')
    modal.setAttribute('aria-hidden', 'true')
    if (
      !document.querySelector('.modal.is-open') &&
      !document.querySelector('.cart-drawer.is-open') &&
      !document.querySelector('.mobile-nav.is-open')
    ) {
      lockScroll(false)
    }

    const previous = state.focusStack.pop()
    if (previous && previous.focus) previous.focus({ preventScroll: true })
  }

  function setActiveFilterButton(category) {
    $all('.menu-pill').forEach((btn) => {
      btn.classList.toggle('menu-pill--active', btn.dataset.filterCategory === category)
    })
  }

  function renderHero() {
    const slides = $all('.hero-slide')
    const dots = $all('.hero-dot')

    slides.forEach((slide, idx) => {
      slide.classList.toggle('hero-slide--active', idx === state.activeSlide)
      slide.setAttribute('aria-hidden', String(idx !== state.activeSlide))
    })

    dots.forEach((dot, idx) => {
      dot.classList.toggle('hero-dot--active', idx === state.activeSlide)
      dot.setAttribute('aria-current', idx === state.activeSlide ? 'true' : 'false')
    })
  }

  function goToSlide(index) {
    const slides = $all('.hero-slide')
    if (!slides.length) return
    state.activeSlide = (index + slides.length) % slides.length
    renderHero()
  }

  function startHeroAutoRotate() {
    clearInterval(state.sliderTimer)
    state.sliderTimer = setInterval(() => goToSlide(state.activeSlide + 1), 6500)
  }

  function filterMenu() {
    const cards = $all('.menu-feature')
    const query = state.searchQuery.trim().toLowerCase()
    const category = state.filterCategory

    cards.forEach((card) => {
      const text = card.textContent.toLowerCase()
      const cardCategory = card.dataset.category || ''
      const matchesCategory =
        category === 'all' ||
        cardCategory.split(' ').includes(category) ||
        cardCategory === category ||
        card.dataset.productId === category
      const matchesQuery = !query || text.includes(query)
      card.style.display = matchesCategory && matchesQuery ? '' : 'none'
    })
  }

  function buildDefaultSelections(productId) {
    const product = getProduct(productId)
    const selections = {}
    if (!product || !product.options) return selections

    product.options.forEach((group) => {
      if (group.type === 'radio' && group.choices.length) {
        selections[group.id] = group.choices[0].value
      } else if (group.type === 'checkbox') {
        selections[group.id] = []
      }
    })

    return selections
  }

  function computeBasePrice(productId, selections) {
    const product = getProduct(productId)
    if (!product) return { price: 0, selectedText: [] }

    let price = 0
    const selectedText = []

    if (!product.options || !product.options.length) {
      price = product.basePrice || 0
      return { price, selectedText }
    }

    product.options.forEach((group) => {
      const value = selections?.[group.id]
      if (group.type === 'radio') {
        const choice = group.choices.find((c) => c.value === value) || group.choices[0]
        if (choice) {
          price += Number(choice.price || 0)
          selectedText.push(choice.label)
        }
      } else if (group.type === 'checkbox') {
        const choices = group.choices.filter((c) => (value || []).includes(c.value))
        choices.forEach((choice) => {
          price += Number(choice.price || 0)
          selectedText.push(choice.label)
        })
      }
    })

    return { price, selectedText }
  }

  function generateItemKey(productId, selections, promoManaged = false, freeTag = '') {
    const payload = JSON.stringify({
      productId,
      selections,
      promoManaged: Boolean(promoManaged),
      freeTag
    })
    return btoa(unescape(encodeURIComponent(payload))).slice(0, 32)
  }

  function buildProductDisplayName(productId, selections) {
    const product = getProduct(productId)
    if (!product) return 'Item'

    const extras = []
    const sel = selections || {}

    Object.entries(sel).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length) {
        extras.push(value.join(', '))
      } else if (value && key !== 'size' && key !== 'portion' && key !== 'tier' && key !== 'protein') {
        extras.push(value)
      }
    })

    const anchor = sel.size || sel.portion || sel.tier || sel.protein
    return extras.length
      ? `${product.name} - ${anchor || ''}${anchor ? ', ' : ''}${extras.join(', ')}`
      : `${product.name}${anchor ? ` - ${anchor}` : ''}`
  }

  function initElementRefs() {
    els.cartDrawer = $('#cartDrawer')
    els.mobileNav = $('#mobileNav')
    els.customerName = $('#customerName')
    els.customerPhone = $('#customerPhone')
    els.customerEmail = $('#customerEmail')
    els.menuSearch = $('#menuSearch')
  }

  function loadState() {
    state.cart = safeParse(STORAGE_KEYS.cart, [])
    state.history = safeParse(STORAGE_KEYS.history, [])
    state.preorder = safeParse(STORAGE_KEYS.preorder, {})
    state.promoClaims = safeParse(STORAGE_KEYS.promoClaims, { entry: false })

    const customer = safeParse(STORAGE_KEYS.customer, {})
    if (customer.name && els.customerName) els.customerName.value = customer.name
    if (customer.phone && els.customerPhone) els.customerPhone.value = customer.phone
    if (customer.email && els.customerEmail) els.customerEmail.value = customer.email

    const menuPrefs = safeParse(STORAGE_KEYS.menuPrefs, {})
    if (typeof menuPrefs.filterCategory === 'string') state.filterCategory = menuPrefs.filterCategory
    if (typeof menuPrefs.searchQuery === 'string') state.searchQuery = menuPrefs.searchQuery

    if (els.menuSearch) els.menuSearch.value = state.searchQuery
    setActiveFilterButton(state.filterCategory)
  }

  function persistCart() {
    save(STORAGE_KEYS.cart, state.cart)
  }

  function persistHistory() {
    save(STORAGE_KEYS.history, state.history)
  }

  function persistPreorder(data) {
    state.preorder = data
    save(STORAGE_KEYS.preorder, data)
  }

  function persistMenuPrefs() {
    save(STORAGE_KEYS.menuPrefs, {
      filterCategory: state.filterCategory,
      searchQuery: state.searchQuery
    })
  }

  function persistPromoClaims() {
    save(STORAGE_KEYS.promoClaims, state.promoClaims)
  }

  function persistCustomer() {
    save(STORAGE_KEYS.customer, {
      name: els.customerName?.value || '',
      phone: els.customerPhone?.value || '',
      email: els.customerEmail?.value || ''
    })
  }

  function getPromoNow() {
    const now = new Date()
    return {
      shawarmaActive: now >= SHAWARMA_PROMO_START && now <= SHAWARMA_PROMO_END,
      friesActive: now >= LOADED_FRIES_PROMO_START && now <= LOADED_FRIES_PROMO_END
    }
  }

  function isCartPromoManaged(item) {
    return Boolean(item && item.promoManaged)
  }

  function addOrMergeCartItem(item) {
    if (!item) return

    const existing = state.cart.find(
      (entry) =>
        entry.productId === item.productId &&
        JSON.stringify(entry.selections || {}) === JSON.stringify(item.selections || {}) &&
        Boolean(entry.promoManaged) === Boolean(item.promoManaged) &&
        Boolean(entry.isFree) === Boolean(item.isFree)
    )

    if (existing) {
      existing.quantity += item.quantity
    } else {
      state.cart.push(item)
    }

    syncPromoItems()
    persistCart()
    renderCart()
    showToast(`${item.name} added to cart`, 'success')
  }

  function buildCartItemFromProduct(productId, quantity, selections = {}, customName = '') {
    const product = getProduct(productId)
    if (!product) return null

    const normalizedSelections = selections || {}
    const { price: unitPrice } = computeBasePrice(productId, normalizedSelections)

    return {
      id: generateItemKey(productId, normalizedSelections, false, customName || product.name),
      productId,
      name: customName || product.name,
      quantity: Math.max(1, Number(quantity || 1)),
      unitPrice,
      selections: JSON.parse(JSON.stringify(normalizedSelections)),
      category: product.category,
      promoManaged: false,
      freeTag: '',
      isFree: false
    }
  }

  function addProductToCart(productId, quantity, selections) {
    const item = buildCartItemFromProduct(productId, quantity, selections)
    addOrMergeCartItem(item)
  }

  function addSimpleProduct(productId) {
    const selections = buildDefaultSelections(productId)
    addProductToCart(productId, 1, selections)
  }

  function syncPromoItems() {
    const promo = getPromoNow()

    state.cart = state.cart.filter((item) => !isCartPromoManaged(item))

    const shawarmaItems = state.cart.filter((item) => item.productId === 'shawarma')
    const shawarmaQty = shawarmaItems.reduce((sum, item) => sum + Number(item.quantity || 0), 0)
    const shawarmaFreeCount = promo.shawarmaActive ? Math.floor(shawarmaQty / 3) : 0

    if (shawarmaFreeCount > 0) {
      const sortedPrices = shawarmaItems
        .flatMap((item) => Array.from({ length: item.quantity }, () => Number(item.unitPrice || 0)))
        .sort((a, b) => a - b)

      const discountUnits = sortedPrices.slice(0, shawarmaFreeCount)
      const freeAmount = discountUnits.reduce((sum, price) => sum + price, 0)

      state.cart.push({
        id: 'promo-shawarma-discount',
        productId: 'shawarma-promo',
        name: 'Shawarma Promo Discount',
        quantity: 1,
        unitPrice: -freeAmount,
        selections: { promo: 'Buy 2 get 1 free' },
        category: 'promo',
        promoManaged: true,
        freeTag: 'shawarma',
        isFree: true
      })
    }

    const loadedFriesQty = state.cart
      .filter((item) => item.productId === 'loaded-fries')
      .reduce((sum, item) => sum + Number(item.quantity || 0), 0)

    if (promo.friesActive && loadedFriesQty > 0) {
      state.cart.push({
        id: 'promo-free-coke',
        productId: 'coke',
        name: 'Free Coke',
        quantity: loadedFriesQty,
        unitPrice: 0,
        selections: { promo: 'Free with loaded fries' },
        category: 'promo',
        promoManaged: true,
        freeTag: 'loaded-fries',
        isFree: true
      })
    }
  }

  function getCartItemsForTotal() {
    return state.cart.filter((item) => !item.promoManaged && item.productId !== 'coke')
  }

  function calcCartSubtotal() {
    return getCartItemsForTotal().reduce(
      (sum, item) => sum + Number(item.unitPrice || 0) * Number(item.quantity || 0),
      0
    )
  }

  function calcPromoDiscount() {
    const promoItem = state.cart.find((item) => item.id === 'promo-shawarma-discount')
    return promoItem ? Math.abs(Number(promoItem.unitPrice || 0)) : 0
  }

  function calcDeliveryFee() {
    return 0
  }

  function calcCartTotal() {
    return Math.max(0, calcCartSubtotal() - calcPromoDiscount() + calcDeliveryFee())
  }

  function renderCart() {
    const itemsEl = $('#cartItems')
    const emptyEl = $('#cartEmptyState')
    const badgeEl = $('#cartBadge')
    const subtotalEl = $('#cartSubtotal')
    const deliveryEl = $('#cartDelivery')
    const discountEl = $('#cartDiscount')
    const totalEl = $('#cartTotal')
    const cSubtotalEl = $('#checkoutSubtotal')
    const cDeliveryEl = $('#checkoutDelivery')
    const cDiscountEl = $('#checkoutDiscount')
    const cTotalEl = $('#checkoutTotal')

    const visibleItems = state.cart.filter((item) => item.productId !== 'shawarma-promo')

    if (badgeEl) {
      const qty = visibleItems
        .filter((item) => !item.promoManaged)
        .reduce((sum, item) => sum + Number(item.quantity || 0), 0)
      badgeEl.textContent = String(qty)
    }

    const subtotal = calcCartSubtotal()
    const discount = calcPromoDiscount()
    const delivery = calcDeliveryFee()
    const total = calcCartTotal()

    if (subtotalEl) subtotalEl.textContent = money(subtotal)
    if (deliveryEl) deliveryEl.textContent = money(delivery)
    if (discountEl) discountEl.textContent = `- ${money(discount)}`
    if (totalEl) totalEl.textContent = money(total)

    if (cSubtotalEl) cSubtotalEl.textContent = money(subtotal)
    if (cDeliveryEl) cDeliveryEl.textContent = money(delivery)
    if (cDiscountEl) cDiscountEl.textContent = `- ${money(discount)}`
    if (cTotalEl) cTotalEl.textContent = money(total)

    if (!itemsEl) return
    itemsEl.innerHTML = ''

    const displayItems = state.cart.filter((item) => item.productId !== 'shawarma-promo')

    if (!displayItems.length) {
      emptyEl?.classList.remove('is-hidden')
      return
    }

    emptyEl?.classList.add('is-hidden')

    displayItems.forEach((item) => {
      const row = document.createElement('article')
      row.className = 'cart-item'
      row.dataset.itemId = item.id

      const selectionText = formatSelections(item.selections)
      const isPromo = Boolean(item.promoManaged || item.isFree || item.unitPrice === 0 || item.productId === 'coke')

      row.innerHTML = `
        <div class="cart-item__main">
          <div class="cart-item__title">
            <h3>${item.name}</h3>
            ${isPromo ? '<span class="cart-item__promo">Promo</span>' : ''}
          </div>
          <p>${selectionText || 'Ready to order'}</p>
          <strong class="cart-item__price">${item.unitPrice < 0 ? '-' : ''}${money(Math.abs(Number(item.unitPrice || 0)))}</strong>
        </div>
        <div class="cart-item__actions">
          <div class="cart-stepper">
            <button type="button" data-cart-minus="${item.id}" aria-label="Decrease quantity">
              <i class="fa-solid fa-minus"></i>
            </button>
            <span>${item.quantity}</span>
            <button type="button" data-cart-plus="${item.id}" aria-label="Increase quantity">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
          <button type="button" class="cart-remove" data-cart-remove="${item.id}" aria-label="Remove item">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      `

      if (isPromo) {
        const minus = $('[data-cart-minus]', row)
        const plus = $('[data-cart-plus]', row)
        const remove = $('[data-cart-remove]', row)

        minus?.setAttribute('disabled', 'disabled')
        plus?.setAttribute('disabled', 'disabled')
        remove?.setAttribute('disabled', 'disabled')
        remove?.classList.add('is-disabled')

        const promoNote = document.createElement('p')
        promoNote.className = 'cart-item__note'
        promoNote.textContent =
          item.productId === 'coke'
            ? 'Free item added automatically with loaded fries.'
            : 'Promo discount applied automatically.'
        row.querySelector('.cart-item__main')?.appendChild(promoNote)
      }

      itemsEl.appendChild(row)
    })
  }

  function changeCartQuantity(itemId, delta) {
    const item = state.cart.find((entry) => entry.id === itemId)
    if (!item || item.promoManaged) return

    item.quantity += delta
    if (item.quantity <= 0) {
      state.cart = state.cart.filter((entry) => entry.id !== itemId)
    }

    syncPromoItems()
    persistCart()
    renderCart()
  }

  function removeCartItem(itemId) {
    const item = state.cart.find((entry) => entry.id === itemId)
    if (!item || item.promoManaged) return

    state.cart = state.cart.filter((entry) => entry.id !== itemId)
    syncPromoItems()
    persistCart()
    renderCart()
    showToast('Item removed', 'default')
  }

  function clearCart() {
    state.cart = []
    persistCart()
    renderCart()
    showToast('Cart cleared', 'default')
  }

  function renderProductModal(productId) {
    const product = getProduct(productId)
    if (!product) return

    state.lastOpenProduct = productId
    state.productQuantity = 1
    state.productSelections = buildDefaultSelections(productId)

    const hero = $('#productModalHero')
    const badge = $('#productModalBadge')
    const title = $('#productModalTitle')
    const description = $('#productModalDescription')
    const groups = $('#productOptionGroups')
    const price = $('#productModalPrice')
    const quantity = $('#productQuantity')

    if (hero) hero.style.backgroundImage = `url('${product.image}')`
    if (badge) badge.textContent = product.badge || 'Featured'
    if (title) title.textContent = product.name
    if (description) description.textContent = product.description || ''
    if (quantity) quantity.value = '1'

    if (groups) {
      groups.innerHTML = ''

      if (product.options && product.options.length) {
        product.options.forEach((group) => {
          const groupEl = document.createElement('div')
          groupEl.className = 'option-group__block'

          const heading = document.createElement('h3')
          heading.textContent = group.label
          groupEl.appendChild(heading)

          if (group.type === 'radio') {
            const wrap = document.createElement('div')
            wrap.className = 'choice-grid choice-grid--radio'

            group.choices.forEach((choice, idx) => {
              const id = `${product.id}-${group.id}-${idx}`
              const label = document.createElement('label')
              label.className = 'choice-pill'
              label.innerHTML = `
                <input type="radio" name="${group.id}" id="${id}" value="${choice.value}">
                <span>
                  <strong>${choice.label}</strong>
                  <small>${choice.oldPrice ? `<s>${money(choice.oldPrice)}</s> ` : ''}${
                    choice.price === 0 ? 'Included' : `+ ${money(choice.price)}`
                  }${choice.note ? ` • ${choice.note}` : ''}</small>
                </span>
              `

              const input = label.querySelector('input')
              input.checked = idx === 0
              input.addEventListener('change', () => {
                state.productSelections[group.id] = choice.value
                updateProductModalPrice()
              })

              wrap.appendChild(label)
            })

            groupEl.appendChild(wrap)
            state.productSelections[group.id] = group.choices[0]?.value
          } else if (group.type === 'checkbox') {
            const wrap = document.createElement('div')
            wrap.className = 'choice-grid choice-grid--check'

            group.choices.forEach((choice, idx) => {
              const id = `${product.id}-${group.id}-${idx}`
              const label = document.createElement('label')
              label.className = 'choice-pill choice-pill--check'
              label.innerHTML = `
                <input type="checkbox" name="${group.id}" id="${id}" value="${choice.value}">
                <span>
                  <strong>${choice.label}</strong>
                  <small>+ ${money(choice.price)}</small>
                </span>
              `

              const input = label.querySelector('input')
              input.addEventListener('change', () => {
                const current = Array.isArray(state.productSelections[group.id])
                  ? state.productSelections[group.id]
                  : []
                if (input.checked) {
                  if (!current.includes(choice.value)) current.push(choice.value)
                } else {
                  state.productSelections[group.id] = current.filter((v) => v !== choice.value)
                }
                state.productSelections[group.id] = Array.isArray(state.productSelections[group.id])
                  ? state.productSelections[group.id]
                  : current
                updateProductModalPrice()
              })

              wrap.appendChild(label)
            })

            groupEl.appendChild(wrap)
            state.productSelections[group.id] = []
          }

          groups.appendChild(groupEl)
        })
      } else {
        groups.innerHTML = '<p class="option-empty">This item is ready to add with no extra choices.</p>'
      }
    }

    updateProductModalPrice()
    openModal('productModal')
  }

  function updateProductModalPrice() {
    const product = getProduct(state.lastOpenProduct)
    if (!product) return

    const qty = Math.max(1, Number($('#productQuantity')?.value || 1))
    const { price } = computeBasePrice(product.id, state.productSelections)
    const total = price * qty

    const priceEl = $('#productModalPrice')
    if (priceEl) priceEl.textContent = money(total)
  }

  function formatOrderType(orderType) {
    return orderType === 'pickup' ? 'Pickup' : 'Delivery'
  }

  function generateReference() {
    const ts = Date.now().toString(36).toUpperCase()
    const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
    return `WD-${ts}-${rand}`
  }

  function summarizeSelectionsForInvoice(item) {
    const text = formatSelections(item.selections)
    return text || 'Standard'
  }

  function createHistoryEntry(order, status = 'paid') {
    return {
      ...order,
      status,
      savedAt: new Date().toISOString()
    }
  }

  function renderOrderDetails(order) {
    const details = $('#orderConfirmedDetails')
    if (!details) return

    const itemsHtml = order.items
      .map(
        (item) => `
          <div class="success-item">
            <strong>${item.name}</strong>
            <span>${item.quantity} x ${money(item.unitPrice)}</span>
            <small>${summarizeSelectionsForInvoice(item)}</small>
          </div>
        `
      )
      .join('')

    details.innerHTML = `
      <div class="success-grid">
        <div><span>Reference</span><strong>${order.reference}</strong></div>
        <div><span>Name</span><strong>${order.name}</strong></div>
        <div><span>Phone</span><strong>${order.phone}</strong></div>
        <div><span>Email</span><strong>${order.email}</strong></div>
        <div><span>Order type</span><strong>${formatOrderType(order.orderType)}</strong></div>
        <div><span>Address</span><strong>${order.address || 'Not provided'}</strong></div>
        <div><span>Timestamp</span><strong>${order.timestamp}</strong></div>
        <div><span>Total</span><strong>${money(order.total)}</strong></div>
      </div>
      <div class="success-items">${itemsHtml}</div>
    `
  }

  function getCurrentCheckoutData() {
    return {
      name: els.customerName?.value?.trim() || '',
      phone: els.customerPhone?.value?.trim() || '',
      email: els.customerEmail?.value?.trim() || '',
      orderType: $('#orderType')?.value || 'delivery',
      address: $('#customerAddress')?.value?.trim() || '',
      preferredDate: $('#preferredDate')?.value || '',
      preferredTime: $('#preferredTime')?.value || '',
      notes: $('#orderNotes')?.value?.trim() || '',
      paymentMethod: $('input[name="paymentMethod"]:checked')?.value || 'paystack'
    }
  }

  function validateCheckoutForm(data) {
    if (!data.name || !data.phone || !data.email) {
      return 'Please complete your name, phone, and email.'
    }
    if (data.orderType === 'delivery' && !data.address) {
      return 'Please add a delivery address.'
    }
    return ''
  }

  function buildInvoiceHTML(order) {
    const items = order.items
      .map(
        (item) => `
          <div class="invoice-item">
            <div>
              <strong>${item.name}</strong>
              <p>${summarizeSelectionsForInvoice(item)}</p>
            </div>
            <div>${item.quantity} x ${money(item.unitPrice)}</div>
          </div>
        `
      )
      .join('')

    return `
      <!doctype html>
      <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Invoice ${order.reference}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 24px; background: #fff; color: #111; }
          .invoice { max-width: 800px; margin: 0 auto; }
          .invoice__header, .invoice__totals, .invoice-item { display: flex; justify-content: space-between; gap: 16px; }
          .invoice__header { border-bottom: 2px solid #111; padding-bottom: 16px; margin-bottom: 20px; }
          .invoice__section { margin-bottom: 20px; }
          .invoice-item { border-bottom: 1px solid #ddd; padding: 10px 0; }
          h1, h2 { margin: 0 0 8px 0; }
          p { margin: 4px 0; }
          .muted { color: #555; }
        </style>
      </head>
      <body>
        <div class="invoice">
          <div class="invoice__header">
            <div>
              <h1>WRAP District</h1>
              <p class="muted">Tema Community 25, Devtraco</p>
            </div>
            <div>
              <p><strong>Reference:</strong> ${order.reference}</p>
              <p><strong>Timestamp:</strong> ${order.timestamp}</p>
            </div>
          </div>

          <div class="invoice__section">
            <h2>Customer details</h2>
            <p><strong>Name:</strong> ${order.name}</p>
            <p><strong>Phone:</strong> ${order.phone}</p>
            <p><strong>Email:</strong> ${order.email}</p>
            <p><strong>Order type:</strong> ${formatOrderType(order.orderType)}</p>
            <p><strong>Address:</strong> ${order.address || 'Not provided'}</p>
            <p><strong>Notes:</strong> ${order.notes || 'None'}</p>
          </div>

          <div class="invoice__section">
            <h2>Items</h2>
            ${items}
          </div>

          <div class="invoice__section invoice__totals">
            <div>
              <p><strong>Subtotal:</strong> ${money(order.subtotal)}</p>
              <p><strong>Delivery:</strong> ${money(order.delivery)}</p>
              <p><strong>Promo discount:</strong> - ${money(order.discount)}</p>
              <p><strong>Total:</strong> ${money(order.total)}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
  }

  function downloadTextFile(filename, text) {
    const blob = new Blob([text], { type: 'text/html;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }

  function openPrintableInvoice(order) {
    const win = window.open('', '_blank', 'noopener,noreferrer,width=900,height=1000')
    if (!win) {
      showToast('Popup blocked. Please allow popups to print the invoice.', 'default')
      return
    }

    win.document.open()
    win.document.write(buildInvoiceHTML(order))
    win.document.close()
    win.focus()

    setTimeout(() => {
      try {
        win.print()
      } catch {}
    }, 500)
  }

  function saveInvoiceAsPdf(order) {
    openPrintableInvoice(order)
  }

  function getSelectedHistoryOrder() {
    if (!state.history.length) return null
    const selected = state.history.find((entry) => entry.reference === state.selectedHistoryId)
    return selected || state.history[0]
  }

  function renderHistoryList() {
    const list = $('#historyList')
    const query = ($('#historySearch')?.value || '').trim().toLowerCase()
    if (!list) return

    const orders = state.history
      .slice()
      .sort((a, b) => new Date(b.savedAt || b.timestamp || 0) - new Date(a.savedAt || a.timestamp || 0))
      .filter((order) => {
        if (!query) return true
        return (
          String(order.reference || '').toLowerCase().includes(query) ||
          String(order.name || '').toLowerCase().includes(query) ||
          String(order.phone || '').toLowerCase().includes(query)
        )
      })

    list.innerHTML = ''

    if (!orders.length) {
      list.innerHTML = '<div class="history-empty">No purchases found.</div>'
      return
    }

    orders.forEach((order) => {
      const item = document.createElement('button')
      item.type = 'button'
      item.className = 'history-item'
      item.dataset.reference = order.reference
      item.innerHTML = `
        <div class="history-item__main">
          <strong>${order.reference}</strong>
          <p>${order.name} • ${order.phone}</p>
          <small>${order.timestamp}</small>
        </div>
        <div class="history-item__meta">
          <span>${money(order.total)}</span>
          <i class="fa-solid fa-chevron-right"></i>
        </div>
      `

      if (order.reference === state.selectedHistoryId) {
        item.classList.add('history-item--active')
      }

      item.addEventListener('click', () => {
        state.selectedHistoryId = order.reference
        renderHistoryList()
        renderOrderDetails(order)
      })

      list.appendChild(item)
    })

    const selected = getSelectedHistoryOrder()
    if (selected) {
      state.selectedHistoryId = selected.reference
      renderOrderDetails(selected)
    }
  }

  function submitCheckout(event) {
    event.preventDefault()

    const data = getCurrentCheckoutData()
    const error = validateCheckoutForm(data)
    if (error) {
      showToast(error, 'error')
      return
    }

    const subtotal = calcCartSubtotal()
    const discount = calcPromoDiscount()
    const delivery = calcDeliveryFee()
    const total = calcCartTotal()
    const reference = generateReference()
    const timestamp = new Date().toLocaleString()

    const order = {
      reference,
      timestamp,
      subtotal,
      discount,
      delivery,
      total,
      ...data,
      items: state.cart
        .filter((item) => !item.promoManaged)
        .map((item) => ({
          ...item,
          selections: JSON.parse(JSON.stringify(item.selections || {}))
        }))
    }

    persistCustomer()
    save(STORAGE_KEYS.lastOrder, order)
    state.history.unshift(createHistoryEntry(order, 'paid'))
    persistHistory()

    const afterPayment = () => {
      renderOrderDetails(order)
      openModal('orderConfirmedModal')
      clearCart()
      closeModal('checkoutModal')
      state.selectedHistoryId = order.reference
      renderHistoryList()
      showToast('Order confirmed', 'success')
    }

    if (data.paymentMethod === 'paystack' && window.PaystackPop && typeof window.PaystackPop.setup === 'function') {
      try {
        const handler = window.PaystackPop.setup({
          key: PAYSTACK_PUBLIC_KEY,
          email: data.email,
          amount: Math.round(total * 100),
          currency: 'GHS',
          ref: reference,
          callback: function () {
            afterPayment()
          },
          onClose: function () {
            showToast('Payment window closed', 'default')
          }
        })
        handler.openIframe()
      } catch (err) {
        console.error(err)
        showToast('Payment could not start. Recording the order locally.', 'default')
        afterPayment()
      }
    } else {
      afterPayment()
    }
  }

  function handleHistoryOpen() {
    if (!state.history.length) {
      showToast('No purchase history yet', 'default')
    }
    openModal('historyModal')
    renderHistoryList()
  }

  function clearHistory() {
    if (!confirm('Clear all purchase history from this browser?')) return
    state.history = []
    state.selectedHistoryId = null
    persistHistory()
    renderHistoryList()
    showToast('History cleared', 'default')
  }

  function downloadSelectedHistory() {
    const order = getSelectedHistoryOrder()
    if (!order) {
      showToast('No purchase available to download', 'default')
      return
    }
    const html = buildInvoiceHTML(order)
    downloadTextFile(`WRAP-District-${order.reference}.html`, html)
    showToast('Download started', 'success')
  }

  function printSelectedHistory() {
    const order = getSelectedHistoryOrder()
    if (!order) {
      showToast('No purchase available to print', 'default')
      return
    }
    openPrintableInvoice(order)
  }

  function openSelectedHistory() {
    const order = getSelectedHistoryOrder()
    if (!order) {
      showToast('No purchase available yet', 'default')
      return
    }
    renderOrderDetails(order)
    openModal('orderConfirmedModal')
  }

  function refreshHistory() {
    state.history = safeParse(STORAGE_KEYS.history, [])
    renderHistoryList()
    showToast('History refreshed', 'success')
  }

  function handlePromoHelper() {
    const promo = getPromoNow()
    const shawarmaQty = state.cart
      .filter((item) => item.productId === 'shawarma')
      .reduce((sum, item) => sum + Number(item.quantity || 0), 0)
    const friesQty = state.cart
      .filter((item) => item.productId === 'loaded-fries')
      .reduce((sum, item) => sum + Number(item.quantity || 0), 0)

    if (promo.shawarmaActive && shawarmaQty >= 3) {
      showToast('Shawarma promo is active. A free item has been applied.', 'success')
      return
    }

    if (promo.friesActive && friesQty > 0) {
      showToast('Loaded fries promo is active. Free Coke is included.', 'success')
      return
    }

    showToast('Add promo items during the deal window to unlock discounts.', 'default')
  }

  function openCart() {
    openDrawer(els.cartDrawer)
  }

  function closeCart() {
    closeDrawer(els.cartDrawer)
  }

  function openMobileNav() {
    openDrawer(els.mobileNav)
  }

  function closeMobileNav() {
    closeDrawer(els.mobileNav)
  }

  function updateProductQtyFromInput() {
    const input = $('#productQuantity')
    if (!input) return
    input.value = String(Math.max(1, Number(input.value || 1)))
    updateProductModalPrice()
  }

  function bindEvents() {
    document.addEventListener('click', (event) => {
      const target = event.target.closest(
        '[data-open-cart], [data-close-cart], [data-open-mobile-nav], [data-close-mobile-nav], [data-close-modal], [data-open-history], [data-open-checkout], [data-open-product], [data-add-simple], [data-scroll-to-menu], [data-hero-prev], [data-hero-next], [data-go-slide], [data-filter-category], [data-stepper-minus], [data-stepper-plus], [data-cart-minus], [data-cart-plus], [data-cart-remove]'
      )
      if (!target) return

      if (target.matches('[data-open-cart]')) {
        openCart()
        return
      }

      if (target.matches('[data-close-cart]')) {
        closeCart()
        return
      }

      if (target.matches('[data-open-mobile-nav]')) {
        openMobileNav()
        return
      }

      if (target.matches('[data-close-mobile-nav]')) {
        closeMobileNav()
        return
      }

      if (target.matches('[data-open-history]')) {
        handleHistoryOpen()
        return
      }

      if (target.matches('[data-open-checkout]')) {
        openCheckout()
        return
      }

      if (target.matches('[data-open-product]')) {
        const id = target.dataset.openProduct
        renderProductModal(id === 'featured' ? 'shawarma' : id)
        return
      }

      if (target.matches('[data-add-simple]')) {
        addSimpleProduct(target.dataset.addSimple)
        return
      }

      if (target.matches('[data-scroll-to-menu]')) {
        const category = target.dataset.scrollToMenu
        if (category && category !== 'all') {
          state.filterCategory = category
          setActiveFilterButton(category)
          filterMenu()
        } else {
          state.filterCategory = 'all'
          setActiveFilterButton('all')
          filterMenu()
        }
        document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        return
      }

      if (target.matches('[data-hero-prev]')) {
        goToSlide(state.activeSlide - 1)
        startHeroAutoRotate()
        return
      }

      if (target.matches('[data-hero-next]')) {
        goToSlide(state.activeSlide + 1)
        startHeroAutoRotate()
        return
      }

      if (target.matches('[data-go-slide]')) {
        goToSlide(Number(target.dataset.goSlide || 0))
        startHeroAutoRotate()
        return
      }

      if (target.matches('[data-filter-category]')) {
        state.filterCategory = target.dataset.filterCategory || 'all'
        setActiveFilterButton(state.filterCategory)
        persistMenuPrefs()
        filterMenu()
        return
      }

      if (target.matches('[data-close-modal]')) {
        closeModal(target.dataset.closeModal)
        return
      }

      if (target.matches('[data-stepper-minus]')) {
        const input = $('#productQuantity')
        if (input) {
          input.value = String(Math.max(1, Number(input.value || 1) - 1))
          updateProductModalPrice()
        }
        return
      }

      if (target.matches('[data-stepper-plus]')) {
        const input = $('#productQuantity')
        if (input) {
          input.value = String(Math.max(1, Number(input.value || 1) + 1))
          updateProductModalPrice()
        }
        return
      }

      if (target.matches('[data-cart-minus]')) {
        changeCartQuantity(target.dataset.cartMinus, -1)
        return
      }

      if (target.matches('[data-cart-plus]')) {
        changeCartQuantity(target.dataset.cartPlus, 1)
        return
      }

      if (target.matches('[data-cart-remove]')) {
        removeCartItem(target.dataset.cartRemove)
      }
    })

    document.addEventListener('submit', (event) => {
      if (event.target && event.target.id === 'productOptionsForm') {
        event.preventDefault()
        const product = getProduct(state.lastOpenProduct)
        if (!product) return

        const qty = Math.max(1, Number($('#productQuantity')?.value || 1))
        const selectionsCopy = JSON.parse(JSON.stringify(state.productSelections || {}))
        const displayName = buildProductDisplayName(product.id, selectionsCopy)
        const item = buildCartItemFromProduct(product.id, qty, selectionsCopy, displayName)
        addOrMergeCartItem(item)
        closeModal('productModal')
        openCart()
      }

      if (event.target && event.target.id === 'preorderForm') {
        event.preventDefault()
        const formData = new FormData(event.target)
        const preorder = Object.fromEntries(formData.entries())
        persistPreorder(preorder)
        closeModal('preorderModal')
        showToast('Preorder saved', 'success')
      }

      if (event.target && event.target.id === 'checkoutForm') {
        submitCheckout(event)
      }
    })

    document.addEventListener('input', (event) => {
      if (event.target && event.target.id === 'menuSearch') {
        state.searchQuery = event.target.value || ''
        persistMenuPrefs()
        filterMenu()
      }

      if (event.target && event.target.id === 'historySearch') {
        renderHistoryList()
      }

      if (event.target && event.target.id === 'productQuantity') {
        updateProductQtyFromInput()
      }

      if (event.target && ['customerName', 'customerPhone', 'customerEmail'].includes(event.target.id)) {
        persistCustomer()
      }
    })

    document.addEventListener('change', (event) => {
      if (event.target && event.target.name === 'paymentMethod') {
        persistCustomer()
      }
    })

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        if (els.cartDrawer?.classList.contains('is-open')) closeCart()
        if (els.mobileNav?.classList.contains('is-open')) closeMobileNav()
        $all('.modal.is-open').forEach((modal) => closeModal(modal.id))
      }
    })

    $('#clearCartBtn')?.addEventListener('click', clearCart)
    $('#promoHelperBtn')?.addEventListener('click', handlePromoHelper)
    $('#historyOpenBtn')?.addEventListener('click', openSelectedHistory)
    $('#historyDownloadBtn')?.addEventListener('click', downloadSelectedHistory)
    $('#historyPrintBtn')?.addEventListener('click', printSelectedHistory)
    $('#historyRefreshBtn')?.addEventListener('click', refreshHistory)
    $('#historyClearBtn')?.addEventListener('click', clearHistory)
    $('#saveInvoicePdfBtn')?.addEventListener('click', () => {
      const order = getSelectedHistoryOrder() || safeParse(STORAGE_KEYS.lastOrder, null)
      if (!order) {
        showToast('No order available yet', 'default')
        return
      }
      saveInvoiceAsPdf(order)
    })

    $('#orderType')?.addEventListener('change', () => {
      const address = $('#customerAddress')
      const isPickup = $('#orderType')?.value === 'pickup'
      if (address) {
        address.placeholder = isPickup
          ? 'Pickup note or preferred collection point'
          : 'Delivery address'
      }
    })

    $('#dontShowPromoAgain')?.addEventListener('change', (e) => {
      state.promoClaims.entry = Boolean(e.target.checked)
      persistPromoClaims()
    })

    ;['customerName', 'customerPhone', 'customerEmail'].forEach((id) => {
      $('#'+id)?.addEventListener('input', persistCustomer)
    })

    window.addEventListener(
      'scroll',
      () => {
        const header = $('#siteHeader')
        if (!header) return
        header.classList.toggle('is-scrolled', window.scrollY > 20)
      },
      { passive: true }
    )

    window.addEventListener('resize', () => {
      filterMenu()
    })
  }

  function openCheckout() {
    if (!getCartItemsForTotal().length) {
      showToast('Your cart is empty', 'default')
      return
    }
    openModal('checkoutModal')
  }

  function initEntryPromo() {
    const hide = state.promoClaims.entry
    const checkbox = $('#dontShowPromoAgain')
    if (checkbox) checkbox.checked = Boolean(hide)
    if (!hide) {
      setTimeout(() => openModal('entryPromoModal'), 350)
    }
  }

  function seedFallbackHistory() {
    if (state.history.length) return
    const sample = safeParse(STORAGE_KEYS.lastOrder, null)
    if (sample) {
      state.history.unshift(createHistoryEntry(sample, 'paid'))
      persistHistory()
    }
  }

  function initPreorderFormDefaults() {
    if (!state.preorder) return

    const name = $('#preorderForm input[name="preorderName"]')
    const phone = $('#preorderForm input[name="preorderPhone"]')
    const date = $('#preorderForm input[name="preorderDate"]')
    const time = $('#preorderForm input[name="preorderTime"]')
    const notes = $('#preorderForm textarea[name="preorderNotes"]')

    if (name) name.value = state.preorder.preorderName || ''
    if (phone) phone.value = state.preorder.preorderPhone || ''
    if (date) date.value = state.preorder.preorderDate || ''
    if (time) time.value = state.preorder.preorderTime || ''
    if (notes) notes.value = state.preorder.preorderNotes || ''
  }

  function initCheckoutDefaults() {
    const last = safeParse(STORAGE_KEYS.lastOrder, null)
    if (!last) return

    if (els.customerName && !els.customerName.value) els.customerName.value = last.name || ''
    if (els.customerPhone && !els.customerPhone.value) els.customerPhone.value = last.phone || ''
    if (els.customerEmail && !els.customerEmail.value) els.customerEmail.value = last.email || ''
    if ($('#customerAddress') && !$('#customerAddress').value) $('#customerAddress').value = last.address || ''
  }

  function main() {
    initElementRefs()
    loadState()
    seedFallbackHistory()
    renderHero()
    filterMenu()
    renderCart()
    renderHistoryList()
    initPreorderFormDefaults()
    initCheckoutDefaults()
    bindEvents()
    syncPromoItems()
    renderCart()
    startHeroAutoRotate()
    initEntryPromo()
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', main)
  } else {
    main()
  }
})()
