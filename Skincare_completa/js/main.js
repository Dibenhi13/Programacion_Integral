
// ==========================================
// BLOOM SKIN — PÁGINA INTERACTIVA
// ==========================================

// 1. CATÁLOGO DE PRODUCTOS

const products = [
  {
    id: 'cleanser',
    name: 'Bloom Cleanser',
    category: 'limpieza',
    type: 'LIMPIEZA · 150 ML',
    description: 'Gel limpiador de uso diario.',
    price: 289,
    image: 'assets/product-cleanser.svg',
    tone: 'peach',
    label: 'PASO 01'
  },
  {
    id: 'drops',
    name: 'Dew Drops',
    category: 'serum',
    type: 'SÉRUM · 30 ML',
    description: 'Textura ligera de inspiración hidratante.',
    price: 349,
    image: 'assets/product-serum.svg',
    tone: 'lilac',
    label: 'BESTSELLER'
  },
  {
    id: 'petal',
    name: 'Petal Cream',
    category: 'hidratacion',
    type: 'CREMA · 50 ML',
    description: 'Una pausa suave al final de tu ritual.',
    price: 329,
    image: 'assets/product-cream.svg',
    tone: 'sage',
    label: 'PASO 03'
  },
  {
    id: 'soft',
    name: 'Soft Reset',
    category: 'limpieza',
    type: 'LIMPIEZA · 150 ML',
    description: 'Limpiador ligero para empezar de cero.',
    price: 279,
    image: 'assets/product-soft.png',
    tone: 'sand',
    label: 'NUEVO'
  },
  {
    id: 'night',
    name: 'Night Bloom',
    category: 'serum',
    type: 'SÉRUM · 30 ML',
    description: 'Un detalle especial para la rutina de noche.',
    price: 389,
    image: 'assets/product-night.png',
    tone: 'pink',
    label: 'NIGHT RITUAL'
  },
  {
    id: 'cloud',
    name: 'Cloud Gel',
    category: 'hidratacion',
    type: 'GEL CREMA · 50 ML',
    description: 'Hidratación con sensación de ligereza.',
    price: 319,
    image: 'assets/product-cloud.png',
    tone: 'mint',
    label: 'LIGHT FEEL'
  }
];

// Funciones auxiliares
const $ = (selector) => document.querySelector(selector);

const money = (amount) =>
  '$' + amount.toLocaleString('es-MX') + ' MXN';

const productById = (id) =>
  products.find((product) => product.id === id);

const grid = $('#products-grid');
const filters = document.querySelectorAll('.filter');


// ==========================================
// 2. MOSTRAR PRODUCTOS Y FILTRAR
// ==========================================

function renderProducts(filter = 'todos') {

  const selected = products.filter(product =>
    filter === 'todos' || product.category === filter
  );

  grid.innerHTML = selected.map(product => `
    <article class="product-card">

      <div class="product-img-wrap" data-tone="${product.tone}">
        <span class="product-tag">${product.label}</span>

        <img
          src="${product.image}"
          alt="Ilustración de ${product.name}"
          loading="lazy"
          width="420"
          height="440"
        />
      </div>

      <div class="product-info">
        <div>
          <p class="category">${product.type}</p>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
        </div>

        <div class="product-price">
          ${money(product.price)}
        </div>
      </div>

      <button
        type="button"
        class="add-button"
        data-add="${product.id}"
        aria-label="Agregar ${product.name} a mi bolsa"
      >
        Agregar a mi bolsa +
      </button>

    </article>
  `).join('');
}

// Eventos de filtros
filters.forEach(button => {

  button.addEventListener('click', () => {

    filters.forEach(item => {
      item.classList.remove('active');
      item.setAttribute('aria-pressed', 'false');
    });

    button.classList.add('active');
    button.setAttribute('aria-pressed', 'true');

    renderProducts(button.dataset.filter);

  });

});

// Mostrar todos al cargar
renderProducts();


// ==========================================
// 3. CARRITO DE COMPRAS
// ==========================================

const STORAGE_KEY = 'bloomSkinDemoCart';

let cart = {};

// Recuperar bolsa guardada
try {

  const saved = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || '{}'
  );

  if (
    saved &&
    typeof saved === 'object' &&
    !Array.isArray(saved)
  ) {

    for (const [id, count] of Object.entries(saved)) {

      if (
        productById(id) &&
        Number.isInteger(count) &&
        count > 0 &&
        count <= 99
      ) {
        cart[id] = count;
      }

    }
  }

} catch (_) {
  cart = {};
}

// Guardar bolsa en navegador
function saveCart() {
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(cart)
    );
  } catch (_) {}
}

// Notificaciones
const toast = $('#toast');
let toastTimer;

function showToast(message) {

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 2600);

}

// Agregar productos
function addToCart(id, quantity = 1) {

  const product = productById(id);

  if (!product) return;

  cart[id] = Math.min(
    99,
    (cart[id] || 0) + quantity
  );

  saveCart();
  renderCart();

  showToast(product.name + ' se agregó a tu bolsa ✳');
}

// Cantidad total
function cartCount() {

  return Object.values(cart).reduce(
    (sum, qty) => sum + qty,
    0
  );

}

// Mostrar el contenido de la bolsa
function renderCart() {

  const entries = Object.entries(cart).filter(
    ([id, quantity]) =>
      productById(id) && quantity > 0
  );

  $('#bag-count').textContent = cartCount();

  $('#drawer-count').textContent =
    '(' + cartCount() + ')';

  const subtotal = entries.reduce(
    (sum, [id, qty]) =>
      sum + productById(id).price * qty,
    0
  );

  $('#cart-subtotal').textContent = money(subtotal);

  $('#cart-items').innerHTML = entries.length

    ? entries.map(([id, qty]) => {

      const product = productById(id);

      return `
        <div class="cart-item">

          <img src="${product.image}" alt=""
            width="74" height="78" />

          <div>
            <h3>${product.name}</h3>
            <p>${money(product.price)}</p>

            <button class="remove-item"
              data-action="remove"
              data-id="${id}"
              type="button">
              Eliminar
            </button>
          </div>

          <div class="quantity-controls">

            <button type="button"
              data-action="minus"
              data-id="${id}"
              aria-label="Restar uno de ${product.name}">
              −
            </button>

            <span>${qty}</span>

            <button type="button"
              data-action="plus"
              data-id="${id}"
              aria-label="Sumar uno de ${product.name}">
              +
            </button>

          </div>

        </div>
      `;

    }).join('')

    : '<p class="cart-empty">Tu bolsa está vacía. Explora la colección y añade tus favoritos. ♡</p>';

  $('#clear-cart').disabled = entries.length === 0;

}

// Mostrar bolsa inicial
renderCart();

// Agregar productos desde catálogo
grid.addEventListener('click', (event) => {

  const button = event.target.closest('[data-add]');

  if (button) {
    addToCart(button.dataset.add);
  }

});

// Modificar productos de la bolsa
$('#cart-items').addEventListener('click', event => {

  const button = event.target.closest('[data-action]');

  if (!button) return;

  const { id, action } = button.dataset;

  if (action === 'remove') {
    delete cart[id];
  }

  if (action === 'minus') {

    cart[id]--;

    if (cart[id] <= 0) {
      delete cart[id];
    }

  }

  if (action === 'plus') {
    cart[id] = Math.min(99, cart[id] + 1);
  }

  saveCart();
  renderCart();

});

// Vaciar carrito
$('#clear-cart').addEventListener('click', () => {

  cart = {};

  saveCart();
  renderCart();

  showToast('Bolsa vaciada');

});


// ==========================================
// 4. ABRIR Y CERRAR EL CARRITO
// ==========================================

const drawer = $('#cart-drawer');
const backdrop = $('#drawer-backdrop');

let previousFocus;

function openCart() {

  previousFocus = document.activeElement;

  drawer.hidden = false;
  backdrop.hidden = false;

  document.body.classList.add('drawer-open');

  $('#bag-close').focus();

}

function closeCart() {

  drawer.hidden = true;
  backdrop.hidden = true;

  document.body.classList.remove('drawer-open');

  previousFocus?.focus();

}

// Eventos
$('#bag-open').addEventListener('click', openCart);
$('#bag-close').addEventListener('click', closeCart);

backdrop.addEventListener('click', closeCart);

// Cerrar con Escape y mantener navegación con Tab
document.addEventListener('keydown', (event) => {

  if (drawer.hidden) return;

  if (event.key === 'Escape') {
    closeCart();
  }

  if (event.key === 'Tab') {

    const focusables = [
      ...drawer.querySelectorAll(
        'button:not(:disabled),a[href],input:not(:disabled)'
      )
    ];

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (
      event.shiftKey &&
      document.activeElement === first
    ) {
      event.preventDefault();
      last.focus();
    }

    else if (
      !event.shiftKey &&
      document.activeElement === last
    ) {
      event.preventDefault();
      first.focus();
    }

  }

});


// ==========================================
// 5. CUESTIONARIO FIND YOUR GLOW
// ==========================================

const steps = [
  ...document.querySelectorAll('.quiz-step')
];

const stepNames = [
  'piel',
  'objetivo',
  'pasos'
];

let currentStep = 0;
let recommendedIds = [];

// Actualizar pregunta
function updateStep() {

  steps.forEach((step, index) => {
    step.hidden = index !== currentStep;
  });

  $('#quiz-counter').textContent =
    `PREGUNTA 0${currentStep + 1} DE 03`;

  $('#progress-fill').style.width =
    ((currentStep + 1) / steps.length * 100) + '%';

  $('#quiz-back').hidden = currentStep === 0;

  $('#quiz-next').innerHTML = currentStep === 2
    ? 'Ver mi rutina <span aria-hidden="true">✳</span>'
    : 'Siguiente <span aria-hidden="true">→</span>';

  $('#quiz-error').textContent = '';

}

// Siguiente pregunta
$('#quiz-next').addEventListener('click', () => {

  const fieldName = stepNames[currentStep];

  const answer = document.querySelector(
    `input[name="${fieldName}"]:checked`
  );

  if (!answer) {

    $('#quiz-error').textContent =
      'Selecciona una opción para continuar.';

    return;

  }

  if (currentStep < steps.length - 1) {

    currentStep++;
    updateStep();

  } else {

    showRoutine();

  }

});

// Pregunta anterior
$('#quiz-back').addEventListener('click', () => {

  if (currentStep > 0) {
    currentStep--;
    updateStep();
  }

});

// Limpiar mensaje de error al elegir una respuesta
document.querySelectorAll('.answer input').forEach(input => {

  input.addEventListener('change', () => {
    $('#quiz-error').textContent = '';
  });

});


// ==========================================
// 6. GENERAR RUTINA PERSONALIZADA
// ==========================================

function showRoutine() {

  const skin = document.querySelector(
    'input[name="piel"]:checked'
  ).value;

  const goal = document.querySelector(
    'input[name="objetivo"]:checked'
  ).value;

  const stepsCount = Number(
    document.querySelector(
      'input[name="pasos"]:checked'
    ).value
  );

  // Elegir limpiador
  const cleanser =
    skin === 'grasa' || skin === 'mixta'
      ? 'soft'
      : 'cleanser';

  // Elegir hidratante
  const moisturizer =
    skin === 'grasa' ||
    skin === 'mixta' ||
    goal === 'frescura'
      ? 'cloud'
      : 'petal';

  // Elegir sérum
  const serum =
    goal === 'suavidad' && skin !== 'sensible'
      ? 'night'
      : 'drops';

  // Construir rutina
  recommendedIds = stepsCount === 2
    ? [cleanser, moisturizer]
    : [cleanser, serum, moisturizer];

  const skinLabels = {
    seca: 'seca',
    mixta: 'mixta',
    grasa: 'grasa',
    sensible: 'sensible'
  };

  $('#result-title').textContent =
    'Tu ritual para florecer ✳';

  $('#result-description').textContent =
    `Según tus preferencias de piel ${skinLabels[skin]}, seleccionamos ${stepsCount} pasos de nuestro catálogo ficticio. Úsalos como inspiración, no como indicación médica.`;

  // Mostrar los productos seleccionados
  $('#routine-products').innerHTML =
    recommendedIds.map((id, index) => {

      const item = productById(id);

      return `
        <div class="routine-item">

          <img src="${item.image}" alt="" />

          <div>
            <strong>
              0${index + 1} · ${item.name}
            </strong>

            <span>
              ${item.description} · ${money(item.price)}
            </span>
          </div>

        </div>
      `;

    }).join('');

  // Ocultar preguntas y mostrar resultado
  $('#quiz-questions').hidden = true;
  $('#quiz-result').hidden = false;

  $('#result-title').setAttribute('tabindex', '-1');
  $('#result-title').focus();

}


// ==========================================
// 7. AGREGAR RUTINA AL CARRITO
// ==========================================

$('#add-routine').addEventListener('click', () => {

  recommendedIds.forEach(id => {

    cart[id] = Math.min(
      99,
      (cart[id] || 0) + 1
    );

  });

  saveCart();
  renderCart();
  openCart();

});

// Reiniciar cuestionario
$('#quiz-reset').addEventListener('click', () => {

  document.querySelectorAll(
    '.quiz-step input:checked'
  ).forEach(input => {
    input.checked = false;
  });

  currentStep = 0;
  recommendedIds = [];

  $('#quiz-questions').hidden = false;
  $('#quiz-result').hidden = true;

  updateStep();

});

// Mostrar primera pregunta
updateStep();


// ==========================================
// 8. MENÚ MÓVIL
// ==========================================

const menuButton = $('#menu-button');

menuButton.addEventListener('click', () => {

  const opened = $('#nav').classList.toggle('open');

  menuButton.setAttribute(
    'aria-expanded',
    String(opened)
  );

  menuButton.setAttribute(
    'aria-label',
    opened ? 'Cerrar menú' : 'Abrir menú'
  );

});

// Cerrar menú cuando se selecciona un enlace
$('#nav').querySelectorAll('a').forEach(link => {

  link.addEventListener('click', () => {

    $('#nav').classList.remove('open');

    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menú');

  });

});


// ==========================================
// 9. FORMULARIO NEWSLETTER
// ==========================================

$('#newsletter-form').addEventListener('submit', event => {

  event.preventDefault();

  if (!event.target.checkValidity()) {
    event.target.reportValidity();
    return;
  }

  $('#newsletter-message').textContent =
    '¡Gracias! Esta es una demostración, por lo que tu correo no fue registrado.';

  event.target.reset();

});


// ==========================================
// 10. AÑO AUTOMÁTICO
// ==========================================

$('#year').textContent = new Date().getFullYear();


// ==========================================
// 11. ANIMACIONES GSAP
// ==========================================

// El sitio también funciona si GSAP no está disponible.

if (
  window.gsap &&
  window.ScrollTrigger &&
  !matchMedia('(prefers-reduced-motion: reduce)').matches
) {

  gsap.registerPlugin(ScrollTrigger);

  document.querySelectorAll('.reveal').forEach(element => {

    gsap.from(element, {
      opacity: 0,
      y: 28,
      duration: .8,
      ease: 'power2.out',

      scrollTrigger: {
        trigger: element,
        start: 'top 92%',
        once: true
      }

    });

  });

}
