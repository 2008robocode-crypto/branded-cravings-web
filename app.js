/**
 * Branded Cravings - Late Night Hostel Kitchen Application
 * Real-time Menu, Cart, Variant Selector, Dynamic UPI QR, Google Sheets Sync & Kitchen Ops
 */

// --- DEFAULT MENU DATA (From PDF Menu) ---
const INITIAL_MENU = [
  {
    id: "pizza_10",
    name: "10\" Cheese Blast Pizza",
    category: "Pizzas",
    price: 270,
    details: "Cheese blast base, capsicum, onion or classic margherita style.",
    image: "https://lh3.googleusercontent.com/grass-proxy/AIM7gW2t7gjyZEVyyOI7zxxTK4wnrHkNFX1FTK9Gde0aSffHMK67nLcQNWyPe75k-ZHoDRpEyxgbW-06egnuYiKclMwScmk3aZTQvTmYlZS8sBKItDyamkZgqqD1AxFUb535x1-c7fxyccI0XclidU6abUrC4AgFClKllpi68jBH-h4x2iWOPHQVANaewA=w114-h114-n-k-no?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    inStock: true,
    customizable: true,
    variantTitle: "Choose your 10\" Pizza Style",
    variantSubtitle: "Select between Farmers or classic Margherita",
    variants: [
      { name: "Farmers Pizza", desc: "Cheese blast base, fresh crunchy capsicum & onion", isVeg: true },
      { name: "Classic Margherita Pizza", desc: "Cheese blast base loaded with 100% mozzarella cheese", isVeg: true }
    ]
  },
  {
    id: "burger_crispy_veg",
    name: "Crispy Veg Burger",
    category: "Burgers & Bites",
    price: 65,
    details: "Crisp seasoned veg patty, creamy house mayo & fresh toasted buns.",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    inStock: true,
    customizable: false
  },
  {
    id: "midnight_maggi",
    name: "Midnight Masala Maggi",
    category: "Maggi",
    price: 35,
    details: "Classic piping hot 2-minute hostel Maggi with authentic spicy masala.",
    image: "https://images.unsplash.com/photo-1612927601601-6638404737ce?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    inStock: true,
    customizable: true,
    customizableBadge: "Add-on Available",
    variantTitle: "Customize Your Maggi",
    variantSubtitle: "Choose your Maggi style or add-on:",
    variants: [
      { name: "Classic Masala", desc: "Authentic 2-minute hostel recipe with standard masala", isVeg: true, extraPrice: 0 },
      { name: "Double Masala Maggi", desc: "Loaded with extra tastemaker masala & intense spicy flavor", isVeg: true, extraPrice: 10 }
    ]
  },
  {
    id: "regular_7_coke_combo",
    name: "Regular 7\" Pizza + Chilled Coke",
    category: "Combos",
    price: 165,
    details: "Personal 7\" fresh pizza with your chosen topping + chilled Coca-Cola.",
    image: "https://images.unsplash.com/photo-1541745537411-b8046dc6d66c?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    inStock: true,
    customizable: true,
    variantTitle: "Select 7\" Pizza Topping",
    variantSubtitle: "Pick your personal pizza flavor:",
    variants: [
      { name: "Spicy Jalapeño Pizza", desc: "Tangy pickled jalapeños & molten cheese", isVeg: true },
      { name: "Golden Corn Pizza", desc: "Sweet juicy corn kernels & melted mozzarella", isVeg: true },
      { name: "Capsicum Pizza", desc: "Crisp green bell peppers with herb seasoning", isVeg: true },
      { name: "Onion Pizza", desc: "Classic crunchy red onions & rich cheese", isVeg: true },
      { name: "Non-Veg Chicken & Onion Pizza", desc: "Tender seasoned chicken chunks with red onions", isVeg: false }
    ]
  },
  {
    id: "regular_7_choco_lava_combo",
    name: "Regular 7\" Pizza + Choco Lava Cake",
    category: "Combos",
    price: 170,
    details: "Personal 7\" pizza with your favorite topping + gooey molten warm Choco Lava cake.",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    inStock: true,
    customizable: true,
    variantTitle: "Select 7\" Pizza Topping",
    variantSubtitle: "Pick your personal pizza flavor:",
    variants: [
      { name: "Spicy Jalapeño Pizza", desc: "Tangy pickled jalapeños & molten cheese", isVeg: true },
      { name: "Golden Corn Pizza", desc: "Sweet juicy corn kernels & melted mozzarella", isVeg: true },
      { name: "Capsicum Pizza", desc: "Crisp green bell peppers with herb seasoning", isVeg: true },
      { name: "Onion Pizza", desc: "Classic crunchy red onions & rich cheese", isVeg: true },
      { name: "Non-Veg Chicken & Onion Pizza", desc: "Tender seasoned chicken chunks with red onions", isVeg: false }
    ]
  },
  {
    id: "regular_7_solo",
    name: "Regular 7\" Pizza (Solo)",
    category: "Pizzas",
    price: 135,
    details: "Individual 7\" crust pizza baked fresh with mozzarella and your choice of topping.",
    image: "https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=600&q=80",
    isVeg: true,
    inStock: true,
    customizable: true,
    variantTitle: "Select 7\" Pizza Topping",
    variantSubtitle: "Pick your personal pizza flavor:",
    variants: [
      { name: "Spicy Jalapeño Pizza", desc: "Tangy pickled jalapeños & molten cheese", isVeg: true },
      { name: "Golden Corn Pizza", desc: "Sweet juicy corn kernels & melted mozzarella", isVeg: true },
      { name: "Capsicum Pizza", desc: "Crisp green bell peppers with herb seasoning", isVeg: true },
      { name: "Onion Pizza", desc: "Classic crunchy red onions & rich cheese", isVeg: true },
      { name: "Non-Veg Chicken & Onion Pizza", desc: "Tender seasoned chicken chunks with red onions", isVeg: false }
    ]
  }
];

// --- APP CONFIG & STATE ---
const STATE = {
  menu: [],
  cart: {}, // key: { item, variant, qty }
  category: 'all',
  selectedHostel: 'Uniworld Hostel 1',
  selectedSpot: 'Room Delivery',
  paymentMode: 'Pay on Delivery',
  pendingVariantItem: null,
  selectedVariant: null,
  selectedVariantObj: null,
  config: {
    sheetUrl: 'https://script.google.com/macros/s/AKfycbyTpkhbl-BHMvCTi5HzA4Cjos22IKTxsJa57wARRz2ZyIAECdUge6oPepm3SNdBkYkTQw/exec',
    apiKey: 'bc_sec_9f82d17c4e5b', // Authentication token for private backend
    upiId: '7014226233@fam',
    whatsappNum: '917014226233',
    storeOpen: localStorage.getItem('bc_store_open') !== 'false',
    deliveryFee: 0,
    adminPin: '1234'
  },
  orders: JSON.parse(localStorage.getItem('bc_orders') || '[]'),
  stockOverrides: JSON.parse(localStorage.getItem('bc_stock_overrides') || '{}')
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
  initMenu();
  initLucide();
  setupEventListeners();
  updateCartUI();
  updateStoreStatus();
  checkOperatingHours();
  syncWithGoogleSheets();
});

function initLucide() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// --- SOUND NOTIFICATION (Culinary bell chime for incoming orders) ---
function playOrderChime() {
  try {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(587.33, audioCtx.currentTime); // D5
    osc.frequency.exponentialRampToValueAtTime(880.00, audioCtx.currentTime + 0.15); // A5

    gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.8);

    osc.connect(gain);
    gain.connect(audioCtx.destination);

    osc.start();
    osc.stop(audioCtx.currentTime + 0.8);
  } catch (e) {
    console.log("Audio alert not permitted until user interaction");
  }
}

// --- STORE HOURS CHECKER (10 PM to 3 AM) ---
function checkOperatingHours() {
  const now = new Date();
  const hours = now.getHours(); // 0 to 23
  // Open if between 22:00 (10 PM) and 03:00 (3 AM)
  const isNightHours = (hours >= 22 || hours < 3);

  // If manual override isn't explicitly set, default to schedule
  const statusPill = document.getElementById('store-status-pill');
  const statusText = document.getElementById('store-status-text');

  if (STATE.config.storeOpen) {
    statusPill.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold';
    statusText.textContent = isNightHours ? 'Open Now (10 PM - 3 AM)' : 'Open for Orders';
  } else {
    statusPill.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-100 border border-zinc-300 text-zinc-600 text-xs font-semibold';
    statusText.textContent = 'Closed for Tonight';
  }
}

function updateStoreStatus() {
  const pill = document.getElementById('store-status-pill');
  const text = document.getElementById('store-status-text');
  if (STATE.config.storeOpen) {
    pill.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold';
    text.textContent = 'Open Now';
  } else {
    pill.className = 'flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold';
    text.textContent = 'Kitchen Paused';
  }
}

// --- INITIALIZE MENU WITH LOCAL STOCK OVERRIDES ---
function initMenu() {
  STATE.menu = INITIAL_MENU.map(item => {
    // Apply local stock overrides if user toggled in admin
    const isOverridden = STATE.stockOverrides.hasOwnProperty(item.id);
    const inStock = isOverridden ? STATE.stockOverrides[item.id] : item.inStock;
    return { ...item, inStock };
  });

  renderMenu();
}

// --- RENDER MENU ITEMS (Clean rounded rectangular cards) ---
function renderMenu() {
  const container = document.getElementById('menu-grid');
  container.innerHTML = '';

  const filtered = STATE.category === 'all' 
    ? STATE.menu 
    : STATE.menu.filter(m => m.category.toLowerCase().includes(STATE.category.toLowerCase()));

  filtered.forEach(item => {
    const card = document.createElement('div');
    const inStock = item.inStock && STATE.config.storeOpen;
    
    // Check if this item is already in cart
    const cartEntries = Object.entries(STATE.cart).filter(([k, v]) => v.item.id === item.id);
    const totalQtyInCart = cartEntries.reduce((sum, [, v]) => sum + v.qty, 0);

    card.className = `group bg-white rounded-3xl p-4 sm:p-5 border transition-all duration-200 flex flex-col justify-between ${
      inStock 
        ? 'border-zinc-200/90 shadow-card hover:shadow-soft hover:border-craving-200' 
        : 'border-zinc-200 bg-zinc-50/70 opacity-75'
    }`;

    // Veg / Non-Veg Indicator
    const vegBadge = item.isVeg
      ? `<span class="inline-flex items-center justify-center w-4 h-4 border-2 border-emerald-600 rounded p-0.5"><span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span></span>`
      : `<span class="inline-flex items-center justify-center w-4 h-4 border-2 border-rose-700 rounded p-0.5"><span class="w-1.5 h-1.5 rounded-full bg-rose-700"></span></span>`;

    card.innerHTML = `
      <div>
        <!-- Top: Veg Badge & Category Tag -->
        <div class="flex items-center justify-between gap-2 mb-2">
          <div class="flex items-center gap-1.5">
            ${vegBadge}
            <span class="text-[11px] font-bold tracking-wider text-zinc-500 uppercase">${item.category}</span>
          </div>
          ${item.customizable ? `<span class="text-[10px] font-bold bg-orange-50 text-craving-600 px-2 py-0.5 rounded-full border border-orange-200/60">${item.customizableBadge || 'Choice of flavor'}</span>` : ''}
        </div>

        <!-- Image & Title layout -->
        <div class="flex gap-3 sm:gap-4 items-start">
          <div class="flex-1">
            <h4 class="text-base sm:text-lg font-bold text-zinc-900 group-hover:text-craving-600 transition-colors leading-snug">
              ${item.name}
            </h4>
            <div class="text-base font-extrabold text-zinc-900 mt-1">
              ₹${item.price}
            </div>
            <p class="text-xs text-zinc-500 font-normal mt-1 line-clamp-2 leading-relaxed">
              ${item.details}
            </p>
          </div>

          <!-- Product Image with Rounded Corners -->
          <div class="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden bg-zinc-100 flex-shrink-0 shadow-sm">
            <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy">
            ${!inStock ? `
              <div class="absolute inset-0 bg-zinc-900/65 backdrop-blur-[1px] flex items-center justify-center p-1 text-center">
                <span class="text-[11px] font-bold text-white uppercase tracking-wider">Sold Out</span>
              </div>
            ` : ''}
          </div>
        </div>
      </div>

      <!-- Action Button / Quantity Controls -->
      <div class="mt-4 pt-3 border-t border-zinc-100 flex items-center justify-between">
        <div class="text-xs text-zinc-400 font-medium">
          ${inStock ? (item.customizable ? 'Options available' : 'Ready to cook') : 'Unavailable tonight'}
        </div>

        <div>
          ${!inStock ? `
            <button disabled class="px-4 py-2 rounded-xl bg-zinc-200 text-zinc-400 text-xs font-bold cursor-not-allowed">
              Sold Out
            </button>
          ` : (totalQtyInCart > 0 && !item.customizable ? `
            <div class="flex items-center gap-2 bg-craving-50 border border-craving-200 text-craving-700 rounded-xl px-2 py-1 font-bold text-sm">
              <button class="w-7 h-7 rounded-lg bg-white shadow-sm flex items-center justify-center text-zinc-700 hover:bg-zinc-100 active:scale-90 transition-all" onclick="changeItemQty('${item.id}', -1)">-</button>
              <span class="w-6 text-center font-extrabold">${totalQtyInCart}</span>
              <button class="w-7 h-7 rounded-lg bg-craving-500 text-white shadow-sm flex items-center justify-center hover:bg-craving-600 active:scale-90 transition-all" onclick="changeItemQty('${item.id}', 1)">+</button>
            </div>
          ` : `
            <button class="btn-add-item bg-white hover:bg-craving-50 active:scale-95 text-craving-600 hover:text-craving-700 border-2 border-craving-500 hover:border-craving-600 font-extrabold text-xs sm:text-sm px-4 py-2 rounded-xl transition-all shadow-sm flex items-center gap-1.5" onclick="triggerAddItem('${item.id}')">
              <span>ADD</span>
              <span class="text-base leading-none font-bold">+</span>
            </button>
          `)}
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  initLucide();
}

// --- ADD ITEM / CUSTOMIZATION MODAL TRIGGER ---
window.triggerAddItem = function(itemId) {
  const item = STATE.menu.find(m => m.id === itemId);
  if (!item) return;

  if (item.customizable && item.variants && item.variants.length > 0) {
    // Open variant selection modal
    openVariantModal(item);
  } else {
    // Directly add to cart
    addToCart(item, null);
  }
};

function openVariantModal(item) {
  STATE.pendingVariantItem = item;
  STATE.selectedVariantObj = item.variants[0];
  STATE.selectedVariant = item.variants[0].name; // Default select first option

  document.getElementById('variant-modal-title').textContent = item.variantTitle || "Choose Option";
  document.getElementById('variant-modal-subtitle').textContent = item.variantSubtitle || "Select 1 option to complete your order:";
  updateVariantModalPrice();

  const listContainer = document.getElementById('variant-options-list');
  listContainer.innerHTML = '';

  item.variants.forEach((v, idx) => {
    const isSelected = idx === 0;
    const optionCard = document.createElement('label');
    optionCard.className = `cursor-pointer block border-2 rounded-2xl p-3.5 transition-all ${
      isSelected ? 'border-craving-500 bg-craving-50/60' : 'border-zinc-200 bg-white hover:border-zinc-300'
    }`;
    
    const badge = v.isVeg === false
      ? `<span class="inline-flex items-center justify-center w-3.5 h-3.5 border-2 border-rose-700 rounded p-0.5"><span class="w-1.5 h-1.5 rounded-full bg-rose-700"></span></span>`
      : `<span class="inline-flex items-center justify-center w-3.5 h-3.5 border-2 border-emerald-600 rounded p-0.5"><span class="w-1.5 h-1.5 rounded-full bg-emerald-600"></span></span>`;

    const priceTag = (v.extraPrice && v.extraPrice > 0)
      ? `<span class="text-xs font-bold text-craving-600 bg-craving-50 px-2 py-0.5 rounded-full border border-craving-200">+₹${v.extraPrice}</span>`
      : `<span class="text-xs font-bold text-zinc-400">Included</span>`;

    optionCard.innerHTML = `
      <div class="flex items-center justify-between">
        <div class="flex items-start gap-2.5">
          <input type="radio" name="variant_choice" value="${v.name}" ${isSelected ? 'checked' : ''} class="mt-1 text-craving-500 focus:ring-craving-500">
          <div>
            <div class="flex items-center gap-1.5 font-bold text-zinc-900 text-sm">
              ${badge}
              <span>${v.name}</span>
            </div>
            ${v.desc ? `<p class="text-xs text-zinc-500 mt-0.5">${v.desc}</p>` : ''}
          </div>
        </div>
        ${priceTag}
      </div>
    `;

    optionCard.addEventListener('click', () => {
      STATE.selectedVariant = v.name;
      STATE.selectedVariantObj = v;
      updateVariantModalPrice();
      // Update visual selection styles
      document.querySelectorAll('#variant-options-list label').forEach(el => {
        el.className = 'cursor-pointer block border-2 rounded-2xl p-3.5 transition-all border-zinc-200 bg-white hover:border-zinc-300';
      });
      optionCard.className = 'cursor-pointer block border-2 rounded-2xl p-3.5 transition-all border-craving-500 bg-craving-50/60';
    });

    listContainer.appendChild(optionCard);
  });

  const modal = document.getElementById('variant-modal');
  modal.classList.remove('hidden');
}

function updateVariantModalPrice() {
  if (!STATE.pendingVariantItem) return;
  const basePrice = Number(STATE.pendingVariantItem.price) || 0;
  const extra = (STATE.selectedVariantObj && STATE.selectedVariantObj.extraPrice) ? Number(STATE.selectedVariantObj.extraPrice) : 0;
  const priceEl = document.getElementById('variant-modal-price');
  if (priceEl) {
    priceEl.textContent = basePrice + extra;
  }
}

function closeVariantModal() {
  document.getElementById('variant-modal').classList.add('hidden');
  STATE.pendingVariantItem = null;
  STATE.selectedVariant = null;
  STATE.selectedVariantObj = null;
}

// --- CART LOGIC ---
function addToCart(item, variant, extraPrice = 0) {
  const cartKey = variant ? `${item.id}_${variant}` : item.id;
  const unitPrice = (Number(item.price) || 0) + (Number(extraPrice) || 0);
  
  if (STATE.cart[cartKey]) {
    STATE.cart[cartKey].qty += 1;
  } else {
    STATE.cart[cartKey] = {
      item,
      variant,
      extraPrice: Number(extraPrice) || 0,
      price: unitPrice,
      qty: 1
    };
  }

  updateCartUI();
  renderMenu();
}

window.changeItemQty = function(itemId, delta) {
  // Find cart key matching this itemId
  const key = Object.keys(STATE.cart).find(k => STATE.cart[k].item.id === itemId);
  if (!key) return;

  STATE.cart[key].qty += delta;
  if (STATE.cart[key].qty <= 0) {
    delete STATE.cart[key];
  }

  updateCartUI();
  renderMenu();
};

window.modifyCartItem = function(cartKey, delta) {
  if (!STATE.cart[cartKey]) return;

  STATE.cart[cartKey].qty += delta;
  if (STATE.cart[cartKey].qty <= 0) {
    delete STATE.cart[cartKey];
  }

  updateCartUI();
  renderMenu();
  renderCheckoutItems();
};

function getCartTotals() {
  let count = 0;
  let subtotal = 0;

  Object.values(STATE.cart).forEach(entry => {
    const itemPrice = entry.price !== undefined ? entry.price : ((Number(entry.item.price) || 0) + (Number(entry.extraPrice) || 0));
    count += entry.qty;
    subtotal += entry.qty * itemPrice;
  });

  const deliveryFee = STATE.config.deliveryFee || 0;
  const grandTotal = subtotal + deliveryFee;

  return { count, subtotal, deliveryFee, grandTotal };
}

function updateCartUI() {
  const { count, subtotal } = getCartTotals();
  const floatingBar = document.getElementById('floating-cart-bar');
  const countEl = document.getElementById('cart-item-count');
  const totalEl = document.getElementById('cart-total-price');

  if (count > 0) {
    countEl.textContent = count;
    totalEl.textContent = subtotal;
    floatingBar.classList.remove('hidden');
    setTimeout(() => {
      floatingBar.classList.remove('translate-y-32');
    }, 10);
  } else {
    floatingBar.classList.add('translate-y-32');
    setTimeout(() => {
      floatingBar.classList.add('hidden');
    }, 300);
  }
}

// --- CHECKOUT MODAL & ITEMS LIST ---
function openCheckoutModal() {
  const { count } = getCartTotals();
  if (count === 0) return;

  renderCheckoutItems();
  updateCheckoutTotals();

  document.getElementById('checkout-modal').classList.remove('hidden');
  initLucide();
}

function closeCheckoutModal() {
  document.getElementById('checkout-modal').classList.add('hidden');
}

function renderCheckoutItems() {
  const list = document.getElementById('checkout-items-list');
  list.innerHTML = '';

  const entries = Object.entries(STATE.cart);
  document.getElementById('checkout-total-items-badge').textContent = `${entries.length} dish${entries.length > 1 ? 'es' : ''}`;

  entries.forEach(([key, entry]) => {
    const itemPrice = entry.price !== undefined ? entry.price : ((Number(entry.item.price) || 0) + (Number(entry.extraPrice) || 0));
    const itemTotal = entry.qty * itemPrice;
    const row = document.createElement('div');
    row.className = 'py-3 flex items-center justify-between gap-3';

    row.innerHTML = `
      <div class="flex-1">
        <div class="font-bold text-zinc-900 text-sm leading-snug">${entry.item.name}</div>
        ${entry.variant ? `<div class="text-[11px] font-semibold text-craving-600">${entry.variant}</div>` : ''}
        <div class="text-xs text-zinc-400 mt-0.5">₹${itemPrice} each</div>
      </div>

      <div class="flex items-center gap-3">
        <div class="flex items-center gap-1.5 bg-zinc-100 rounded-xl px-2 py-1 text-xs font-bold">
          <button class="w-6 h-6 rounded-lg bg-white shadow-sm flex items-center justify-center text-zinc-700 hover:bg-zinc-200 active:scale-90" onclick="modifyCartItem('${key}', -1)">-</button>
          <span class="w-5 text-center">${entry.qty}</span>
          <button class="w-6 h-6 rounded-lg bg-craving-500 text-white shadow-sm flex items-center justify-center hover:bg-craving-600 active:scale-90" onclick="modifyCartItem('${key}', 1)">+</button>
        </div>
        <div class="w-14 text-right font-extrabold text-sm text-zinc-900">
          ₹${itemTotal}
        </div>
      </div>
    `;

    list.appendChild(row);
  });
}

function updateCheckoutTotals() {
  const { subtotal, deliveryFee, grandTotal } = getCartTotals();
  document.getElementById('bill-subtotal').textContent = subtotal;
  document.getElementById('bill-delivery-fee').textContent = deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`;
  document.getElementById('bill-grand-total').textContent = grandTotal;
  document.getElementById('btn-submit-total').textContent = grandTotal;
}

// --- SUBMIT ORDER & GOOGLE SHEETS SYNC ---
async function submitOrder() {
  // 1. Anti-Bot Honeypot Security Check
  const botField = document.getElementById('input-security-hp');
  if (botField && botField.value) {
    console.warn("Automated bot submission blocked by honeypot");
    return;
  }

  // 2. Client-Side Rate Limiter (45s Cooldown between orders)
  const lastOrderEpoch = Number(localStorage.getItem('bc_last_order_epoch') || 0);
  const nowEpoch = Date.now();
  const cooldownSec = 45;
  if (nowEpoch - lastOrderEpoch < cooldownSec * 1000) {
    const remaining = Math.ceil((cooldownSec * 1000 - (nowEpoch - lastOrderEpoch)) / 1000);
    alert(`⏳ Order Cooldown: Please wait ${remaining}s before submitting another order.`);
    return;
  }

  const nameInput = document.getElementById('input-customer-name');
  const phoneInput = document.getElementById('input-customer-phone');
  const roomInput = document.getElementById('input-room-no');
  const notesInput = document.getElementById('input-custom-notes');

  const customerName = nameInput.value.trim();
  const customerPhone = phoneInput.value.trim();
  const roomSpot = roomInput.value.trim();
  const customNotes = notesInput.value.trim();

  if (!customerName) {
    alert("Please enter your name!");
    nameInput.focus();
    return;
  }
  if (!customerPhone || customerPhone.length < 10) {
    alert("Please enter a valid 10-digit phone / WhatsApp number!");
    phoneInput.focus();
    return;
  }

  const { grandTotal } = getCartTotals();
  const orderId = `BC-${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date();
  const timeFormatted = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Format Items String
  const itemsArray = Object.values(STATE.cart).map(e => {
    return `${e.qty}x ${e.item.name}${e.variant ? ' (' + e.variant + ')' : ''}`;
  });
  const itemsText = itemsArray.join(', ');

  const orderData = {
    orderId,
    timestamp: `${timeFormatted}, ${now.toLocaleDateString()}`,
    customerName,
    customerPhone,
    hostel: STATE.selectedHostel,
    dropSpot: STATE.selectedSpot,
    roomNo: roomSpot || STATE.selectedSpot,
    customNotes: customNotes || "None",
    items: itemsText,
    total: grandTotal,
    paymentMode: "Pay on Delivery",
    utr: "N/A",
    status: "New"
  };

  // Submit button visual feedback
  const submitBtn = document.getElementById('btn-submit-order');
  const originalBtnText = submitBtn.innerHTML;
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span>Sending Order to Kitchen...</span>`;

  // 1. Play audio chime alert for the kitchen!
  playOrderChime();

  // 2. Save order locally in state & localStorage
  STATE.orders.unshift(orderData);
  localStorage.setItem('bc_orders', JSON.stringify(STATE.orders));
  localStorage.setItem('bc_last_order_epoch', String(Date.now())); // Mark cooldown
  updateAdminOrdersFeed();

  // 3. Post to Google Sheets with Authentication & Rate Limit parameters
  if (STATE.config.sheetUrl) {
    try {
      const orderParam = encodeURIComponent(JSON.stringify(orderData));
      const keyParam = encodeURIComponent(STATE.config.apiKey);
      const phoneParam = encodeURIComponent(orderData.customerPhone);

      // Method A: Authenticated GET webhook with phone for server-side rate limit tracking
      fetch(`${STATE.config.sheetUrl}?action=addOrder&apiKey=${keyParam}&phone=${phoneParam}&data=${orderParam}`, {
        mode: 'no-cors'
      }).catch(e => console.warn("GET sync attempt:", e));

      // Method B: Authenticated POST webhook
      fetch(STATE.config.sheetUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ action: 'addOrder', apiKey: STATE.config.apiKey, order: orderData })
      }).catch(e => console.warn("POST sync attempt:", e));

      console.log("Order submitted securely with authentication!");
    } catch (err) {
      console.error("Google Sheet webhook error:", err);
    }
  }

  // 4. Trigger celebration confetti
  if (window.confetti) {
    window.confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });
  }

  // 5. Open Success Modal
  closeCheckoutModal();
  showOrderSuccess(orderData);

  // 6. Reset Cart & Form
  STATE.cart = {};
  updateCartUI();
  renderMenu();
  roomInput.value = '';
  notesInput.value = '';
  submitBtn.disabled = false;
  submitBtn.innerHTML = originalBtnText;
}

// --- ORDER SUCCESS MODAL & PRE-FILLED WHATSAPP PING ---
function showOrderSuccess(order) {
  document.getElementById('success-order-id').textContent = `#${order.orderId}`;
  const destinationDisplay = order.roomNo && order.roomNo !== order.dropSpot
    ? `${order.hostel} • ${order.dropSpot} (${order.roomNo})`
    : `${order.hostel} • ${order.dropSpot}`;
  document.getElementById('success-destination').textContent = destinationDisplay;
  document.getElementById('success-total').textContent = order.total;

  // Generate pre-filled WhatsApp message for seller
  const kitchenWhatsApp = STATE.config.whatsappNum || "919876543210";
  const dropText = order.roomNo && order.roomNo !== order.dropSpot
    ? `${order.dropSpot} (${order.roomNo})`
    : order.dropSpot;

  const whatsappMsg = `🔥 *NEW ORDER - BRANDED CRAVINGS* 🔥\n` +
    `*Order ID:* #${order.orderId}\n` +
    `*Customer:* ${order.customerName} (${order.customerPhone})\n` +
    `*Destination:* ${order.hostel}\n` +
    `*Drop Spot:* ${dropText}\n` +
    (order.customNotes !== "None" ? `*Notes:* ${order.customNotes}\n` : '') +
    `\n*Items Ordered:*\n${order.items.split(', ').map(i => `• ${i}`).join('\n')}\n` +
    `\n*Total Amount:* ₹${order.total}\n` +
    `*Payment Mode:* Pay on Delivery (Cash / UPI)\n`;

  const whatsappLink = `https://wa.me/${kitchenWhatsApp}?text=${encodeURIComponent(whatsappMsg)}`;
  document.getElementById('btn-whatsapp-ping').href = whatsappLink;

  document.getElementById('order-success-modal').classList.remove('hidden');
  initLucide();
}

// --- GOOGLE SHEETS LIVE SYNC ---
async function syncWithGoogleSheets() {
  const syncStatusEl = document.getElementById('sheet-sync-status');
  if (!STATE.config.sheetUrl) {
    if (syncStatusEl) {
      syncStatusEl.innerHTML = `<span class="inline-flex items-center gap-1 text-zinc-400"><i data-lucide="check" class="w-3.5 h-3.5"></i> Standalone Mode</span>`;
      initLucide();
    }
    return;
  }

  try {
    if (syncStatusEl) {
      syncStatusEl.innerHTML = `<span class="inline-flex items-center gap-1 text-amber-500 animate-pulse"><i data-lucide="refresh-cw" class="w-3.5 h-3.5 animate-spin"></i> Syncing Sheet...</span>`;
      initLucide();
    }

    const keyParam = encodeURIComponent(STATE.config.apiKey);
    const response = await fetch(`${STATE.config.sheetUrl}?action=getMenu&apiKey=${keyParam}`);
    const data = await response.json();

    if (data && data.menu && Array.isArray(data.menu)) {
      // Sync menu and stock
      data.menu.forEach(sheetItem => {
        const local = STATE.menu.find(m => m.id === sheetItem.id || m.name.toLowerCase() === sheetItem.name.toLowerCase());
        if (local) {
          if (sheetItem.hasOwnProperty('inStock')) local.inStock = sheetItem.inStock === true || sheetItem.inStock === "TRUE";
          if (sheetItem.price) local.price = Number(sheetItem.price);
        }
      });

      renderMenu();
      if (syncStatusEl) {
        syncStatusEl.innerHTML = `<span class="inline-flex items-center gap-1 text-emerald-600"><i data-lucide="cloud-check" class="w-3.5 h-3.5"></i> Sheet Synced</span>`;
        initLucide();
      }
    }

    // Sync Store Open/Closed status from Config sheet
    if (data && data.config && data.config.STORE_OPEN !== undefined) {
      STATE.config.storeOpen = String(data.config.STORE_OPEN).trim().toUpperCase() === "TRUE";
      updateStoreStatus();
      renderMenu();
    }
  } catch (err) {
    console.warn("Could not fetch live Google Sheet (using local data):", err);
    if (syncStatusEl) {
      syncStatusEl.innerHTML = `<span class="inline-flex items-center gap-1 text-zinc-400"><i data-lucide="wifi-off" class="w-3.5 h-3.5"></i> Local Cache Active</span>`;
      initLucide();
    }
  }
}

// --- ADMIN & KITCHEN DASHBOARD CONTROLS ---
function openAdminModal() {
  renderAdminStockToggles();
  updateAdminOrdersFeed();
  document.getElementById('admin-modal').classList.remove('hidden');
  initLucide();
}

function closeAdminModal() {
  document.getElementById('admin-modal').classList.add('hidden');
}

function renderAdminStockToggles() {
  const container = document.getElementById('admin-stock-items-list');
  container.innerHTML = '';

  STATE.menu.forEach(item => {
    const row = document.createElement('div');
    row.className = 'flex items-center justify-between p-3 rounded-2xl bg-zinc-50 border border-zinc-200/80';

    row.innerHTML = `
      <div class="flex items-center gap-3">
        <img src="${item.image}" class="w-10 h-10 rounded-xl object-cover">
        <div>
          <div class="font-bold text-zinc-900 text-xs">${item.name}</div>
          <div class="text-[11px] text-zinc-500 font-semibold">₹${item.price} • ${item.category}</div>
        </div>
      </div>

      <label class="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" ${item.inStock ? 'checked' : ''} class="sr-only peer" onchange="toggleItemStock('${item.id}', this.checked)">
        <div class="w-11 h-6 bg-zinc-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-craving-500"></div>
        <span class="ml-2 text-xs font-bold ${item.inStock ? 'text-craving-600' : 'text-zinc-400'}">${item.inStock ? 'In Stock' : 'Sold Out'}</span>
      </label>
    `;

    container.appendChild(row);
  });
}

window.toggleItemStock = function(itemId, isChecked) {
  const item = STATE.menu.find(m => m.id === itemId);
  if (item) {
    item.inStock = isChecked;
    STATE.stockOverrides[itemId] = isChecked;
    localStorage.setItem('bc_stock_overrides', JSON.stringify(STATE.stockOverrides));
    renderMenu();
    renderAdminStockToggles();
  }
};

function updateAdminOrdersFeed() {
  const feed = document.getElementById('admin-orders-feed');
  const countBadge = document.getElementById('admin-orders-count');
  countBadge.textContent = STATE.orders.length;

  if (STATE.orders.length === 0) {
    feed.innerHTML = `
      <div class="text-center py-10 text-zinc-400 space-y-2">
        <i data-lucide="inbox" class="w-10 h-10 mx-auto opacity-50"></i>
        <p class="text-xs font-medium">No orders yet tonight. Ready for cravings!</p>
      </div>
    `;
    initLucide();
    return;
  }

  feed.innerHTML = '';
  STATE.orders.forEach(order => {
    const card = document.createElement('div');
    card.className = 'bg-zinc-50 border border-zinc-200 rounded-2xl p-4 space-y-2 text-xs';

    card.innerHTML = `
      <div class="flex items-center justify-between pb-2 border-b border-zinc-200">
        <span class="font-extrabold text-sm font-mono text-craving-600">#${order.orderId}</span>
        <span class="text-zinc-500 font-medium">${order.timestamp}</span>
      </div>
      <div>
        <div class="font-bold text-zinc-900">${order.customerName} • <span class="text-zinc-600">${order.customerPhone}</span></div>
        <div class="text-zinc-600 font-semibold mt-0.5">${order.hostel} | ${order.dropSpot} (${order.roomNo})</div>
        ${order.customNotes !== "None" ? `<div class="text-amber-700 bg-amber-50 p-1.5 rounded-lg border border-amber-200/60 mt-1">Note: ${order.customNotes}</div>` : ''}
      </div>
      <div class="bg-white p-2.5 rounded-xl border border-zinc-100 font-medium text-zinc-800">
        ${order.items}
      </div>
      <div class="flex justify-between items-center pt-1 font-bold">
        <span>Payment: <span class="text-zinc-900 uppercase">${order.paymentMode}</span> ${order.utr !== 'N/A' ? `(UTR: ${order.utr})` : ''}</span>
        <span class="text-sm font-black text-craving-600">₹${order.total}</span>
      </div>
    `;

    feed.appendChild(card);
  });

  initLucide();
}

// --- SECURE KITCHEN ACCESS (PIN PROTECTED) ---
function verifyAndOpenAdmin() {
  const pin = prompt("🔒 Kitchen Staff Access - Enter PIN (Default: 1234):");
  if (pin === (STATE.config.adminPin || "1234")) {
    openAdminModal();
  } else if (pin !== null) {
    alert("Incorrect PIN! Access denied.");
  }
}

// --- EVENT LISTENERS SETUP ---
function setupEventListeners() {
  // Category Pill Clicks
  document.querySelectorAll('#category-pills .cat-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('#category-pills .cat-pill').forEach(b => {
        b.className = 'cat-pill px-4 py-1.5 rounded-xl text-sm font-semibold whitespace-nowrap bg-zinc-100 text-zinc-600 hover:bg-zinc-200 transition-all';
      });
      btn.className = 'cat-pill active px-4 py-1.5 rounded-xl text-sm font-semibold whitespace-nowrap bg-craving-500 text-white shadow-sm transition-all';
      
      STATE.category = btn.getAttribute('data-cat');
      document.getElementById('current-category-title').textContent = btn.textContent.trim();
      renderMenu();
    });
  });

  // Variant Modal Confirm & Close
  document.getElementById('btn-close-variant-modal').addEventListener('click', closeVariantModal);
  document.getElementById('btn-confirm-variant').addEventListener('click', () => {
    if (STATE.pendingVariantItem && STATE.selectedVariant) {
      const extra = (STATE.selectedVariantObj && STATE.selectedVariantObj.extraPrice) ? Number(STATE.selectedVariantObj.extraPrice) : 0;
      addToCart(STATE.pendingVariantItem, STATE.selectedVariant, extra);
      closeVariantModal();
    }
  });

  // Floating Cart Proceed Button
  document.getElementById('btn-proceed-checkout').addEventListener('click', openCheckoutModal);
  document.getElementById('btn-close-checkout').addEventListener('click', closeCheckoutModal);

  // Delivery Hostel Buttons (Ignore disabled)
  document.querySelectorAll('.hostel-btn:not([disabled])').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.hostel-btn:not([disabled])').forEach(b => {
        b.className = 'hostel-btn border border-zinc-200 bg-white text-zinc-700 font-semibold py-2.5 px-3 rounded-xl text-xs sm:text-sm text-center hover:border-zinc-300 transition-all';
      });
      btn.className = 'hostel-btn active border-2 border-craving-500 bg-craving-50 text-craving-700 font-bold py-2.5 px-3 rounded-xl text-xs sm:text-sm text-center transition-all';
      STATE.selectedHostel = btn.getAttribute('data-hostel');
    });
  });

  // Delivery Drop Spot Buttons
  document.querySelectorAll('.spot-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.spot-btn').forEach(b => {
        b.className = 'spot-btn border border-zinc-200 bg-white text-zinc-600 font-medium py-2 px-2 rounded-xl text-xs text-center hover:border-zinc-300 transition-all';
      });
      btn.className = 'spot-btn active border-2 border-craving-500 bg-craving-50 text-craving-700 font-bold py-2 px-2 rounded-xl text-xs text-center transition-all';
      STATE.selectedSpot = btn.getAttribute('data-spot');

      // Dynamically adjust the room/spot input label & placeholder
      const labelText = document.getElementById('label-room-text');
      const roomInput = document.getElementById('input-room-no');
      if (labelText && roomInput) {
        if (STATE.selectedSpot === 'Room Delivery') {
          labelText.textContent = 'Room Number';
          roomInput.placeholder = 'e.g. Room 304 (Optional)';
        } else if (STATE.selectedSpot === 'Rooftop') {
          labelText.textContent = 'Rooftop Spot';
          roomInput.placeholder = 'e.g. Near water tank / table 2 (Optional)';
        } else if (STATE.selectedSpot === 'Common Room / Lobby') {
          labelText.textContent = 'Common Room Area';
          roomInput.placeholder = 'e.g. 1st floor TV area (Optional)';
        } else if (STATE.selectedSpot === 'Main Gate') {
          labelText.textContent = 'Meeting Spot';
          roomInput.placeholder = 'e.g. Near security desk (Optional)';
        }
      }
    });
  });


  // Submit Order Button
  document.getElementById('btn-submit-order').addEventListener('click', submitOrder);
  document.getElementById('btn-close-success').addEventListener('click', () => {
    document.getElementById('order-success-modal').classList.add('hidden');
  });

  // Close Admin Modal
  document.getElementById('btn-close-admin').addEventListener('click', closeAdminModal);

  // Hidden / Protected Kitchen Trigger: Triple-click the logo or use #kitchen URL hash
  let logoClicks = 0;
  let logoTimer = null;
  const brandTitle = document.querySelector('header h1');
  if (brandTitle) {
    brandTitle.style.cursor = 'pointer';
    brandTitle.addEventListener('click', () => {
      logoClicks++;
      clearTimeout(logoTimer);
      logoTimer = setTimeout(() => { logoClicks = 0; }, 800);
      if (logoClicks >= 3) {
        logoClicks = 0;
        verifyAndOpenAdmin();
      }
    });
  }

  // Check URL hash for #kitchen
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#kitchen') {
      window.location.hash = '';
      verifyAndOpenAdmin();
    }
  });
  if (window.location.hash === '#kitchen') {
    window.location.hash = '';
    verifyAndOpenAdmin();
  }

  // Admin Tabs
  document.getElementById('admin-tab-stock-btn').addEventListener('click', (e) => {
    switchAdminTab('stock', e.target);
  });
  document.getElementById('admin-tab-orders-btn').addEventListener('click', (e) => {
    switchAdminTab('orders', e.target);
  });

  // Reset Stock Overrides
  document.getElementById('btn-reset-stock').addEventListener('click', () => {
    STATE.stockOverrides = {};
    localStorage.removeItem('bc_stock_overrides');
    initMenu();
    renderAdminStockToggles();
  });

  // Clear Orders
  document.getElementById('btn-clear-orders').addEventListener('click', () => {
    if (confirm("Are you sure you want to clear the local orders feed?")) {
      STATE.orders = [];
      localStorage.removeItem('bc_orders');
      updateAdminOrdersFeed();
    }
  });
}

function switchAdminTab(tabName, clickedBtn) {
  const tabs = ['stock', 'orders'];
  tabs.forEach(t => {
    const tabEl = document.getElementById(`admin-tab-${t}`);
    const btnEl = document.getElementById(`admin-tab-${t}-btn`);
    if (tabEl) tabEl.classList.add('hidden');
    if (btnEl) btnEl.className = 'py-3 px-4 text-zinc-500 hover:text-zinc-800';
  });

  const activeTab = document.getElementById(`admin-tab-${tabName}`);
  if (activeTab) activeTab.classList.remove('hidden');
  if (clickedBtn) clickedBtn.className = 'py-3 px-4 text-craving-600 border-b-2 border-craving-500 font-bold';
}
