/* =====================================================
   NicyFoods - Vanilla JavaScript
   Modern interactive features and functionality
   ===================================================== */

// ===== PRODUCT DATA DATABASE =====
let productsDatabase = [];


/**
 * Fetch products from JSON file with fallback
 * @returns {Promise} - Resolves when products are loaded
 */
async function loadProductsFromJSON() {
  try {
    const response = await fetch('data/products.json');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    productsDatabase = data.products;
    console.log('Products loaded successfully from JSON file:', productsDatabase.length, 'products');
    return productsDatabase;
  } catch (error) {
    console.warn('Could not load JSON file, no products will be shown:', error.message);
    productsDatabase = [];
    return productsDatabase;
  }
}

// ===== DOM ELEMENTS =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const filterSection = document.getElementById('filter-section');
let filterButtons = [];
const productsGrid = document.querySelector('.products-grid');
const featuredGrid = document.querySelector('.featured-grid');
const contactForm = document.getElementById('contactForm');

// ===== NAVIGATION FUNCTIONALITY =====

/**
 * Toggle mobile hamburger menu
 */
if (hamburger) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('show');
  });
}

/**
 * Close menu when nav link is clicked
 */
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    // Don't close menu if it's a hash link on same page
    if (window.location.pathname === new URL(link.href).pathname) {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
    
    if (hamburger && hamburger.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('show');
    }
  });
});

/**
 * Set active nav link based on current page
 */
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach(link => {
    const href = link.getAttribute('href').split('/').pop() || 'index.html';
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// Call on page load
document.addEventListener('DOMContentLoaded', () => {
  setActiveNavLink();
});


// ===== DYNAMIC CATEGORY FILTER BUTTONS =====
/**
 * Get unique categories from products database
 * @returns {Array} Array of unique category keys
 */
function getUniqueCategories(products) {
  const categories = products.map(p => p.category);
  return Array.from(new Set(categories));
}

/**
 * Create filter buttons dynamically
 */
function renderFilterButtons() {
  if (!filterSection) return;
  // Always show 'All Products' first
  let html = '<button class="filter-btn" data-filter="all">All Products</button>';
  const categories = getUniqueCategories(productsDatabase);
  categories.forEach(cat => {
    html += `<button class="filter-btn" data-filter="${cat}">${formatCategory(cat)}</button>`;
  });
  filterSection.innerHTML = html;
  filterButtons = filterSection.querySelectorAll('.filter-btn');
  // Set 'All Products' as active by default
  if (filterButtons.length > 0) {
    filterButtons[0].classList.add('active');
  }
  // Re-initialize filter button events
  initFilterButtons();
}

/**
 * Initialize filter button click events
 */
function initFilterButtons() {
  if (!filterButtons.length) return;
  filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      const category = button.dataset.filter;
      filterProducts(category);
    });
  });
  // Set first button as active by default
  if (filterButtons[0]) {
    filterButtons[0].classList.add('active');
    filterProducts('all');
  }
}

/**
 * Render products based on category filter
 * @param {string} category - Category to filter by ('all' shows all products)
 */
function filterProducts(category) {
  if (!productsGrid) return;

  const productCards = productsGrid.querySelectorAll('.product-card');
  
  productCards.forEach(card => {
    const productCategory = card.dataset.category;
    
    if (category === 'all' || productCategory === category) {
      card.classList.remove('hidden');
      // Trigger animation
      setTimeout(() => {
        card.style.animation = 'fadeInUp 0.6s ease-out';
      // (Removed static filter button initialization)
      filterProducts(category);
    });
  }
});

  // Set first button as active by default
  if (filterButtons[0]) {
    filterButtons[0].classList.add('active');
    filterProducts('all');
  }
}

// ===== RENDER PRODUCTS =====

/**
 * Create product card HTML
 * @param {object} product - Product object
 * @returns {string} - HTML string for product card
 */
function createProductCard(product) {
  return `
    <div class="product-card" data-category="${product.category}" data-product-id="${product.id}">
      <div class="product-image">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
      </div>
      <div class="product-info">
        <span class="product-category">${formatCategory(product.category)}</span>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <p class="product-price">${product.price}</p>
        <a href="product-detail.html?id=${product.id}" class="btn btn-primary btn-small" style="width: 100%; justify-content: center;">
          View Details
        </a>
      </div>
    </div>
  `;
}

/**
 * Format category name for display
 * @param {string} category - Category key
 * @returns {string} - Formatted category name
 */
function formatCategory(category) {
  const categoryMap = {
    'traditional': 'Traditional',
    'herbal': 'Herbal',
    'millet': 'Millet',
    'baby-friendly': 'Baby Friendly'
  };
  return categoryMap[category] || category;
}

/**
 * Render products in grid
 * @param {array} products - Array of products to render
 * @param {element} container - Container element
 */
function renderProducts(products, container) {
  if (!container) return;
  
  container.innerHTML = products.map(product => createProductCard(product)).join('');
}

/**
 * Initialize product rendering
 */
function initializeProductRendering() {
  // Load featured products on homepage
  if (featuredGrid) {
    const featuredProducts = productsDatabase.slice(0, 4);
    renderProducts(featuredProducts, featuredGrid);
  }

  // Load all products on products page
  if (productsGrid) {
    renderProducts(productsDatabase, productsGrid);
  }

  // Render dynamic filter buttons (after productsDatabase is loaded)
  renderFilterButtons();
}

// ===== PRODUCT DETAIL PAGE =====

/**
 * Get product ID from URL parameters
 * @returns {string|null} - Product ID or null
 */
function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

/**
 * Load and display product details
 */
function loadProductDetail() {
  const productId = getProductIdFromURL();
  
  if (!productId) {
    console.error('No product ID provided');
    return;
  }

  const product = productsDatabase.find(p => p.id == productId);
  
  if (!product) {
    console.error('Product not found');
    return;
  }

  // Update page content
  const detailImage = document.querySelector('.product-detail-image img');
  const detailName = document.querySelector('.product-detail-info h1');
  const detailCategory = document.querySelector('.detail-category');
  const detailDescription = document.querySelector('.detail-description');
  const ingredientsList = document.querySelector('.ingredients-list');
  const benefitsList = document.querySelector('.benefits-list');
  const detailPrice = document.querySelector('.detail-price');
  const orderButton = document.querySelector('.order-now-btn');

  if (detailImage) detailImage.src = product.image;
  if (detailName) detailName.textContent = product.name;
  if (detailCategory) detailCategory.textContent = formatCategory(product.category);
  if (detailDescription) detailDescription.textContent = product.fullDescription;
  if (detailPrice) detailPrice.textContent = product.price;

  if (ingredientsList) {
    ingredientsList.innerHTML = product.ingredients
      .map(ingredient => `<li>${ingredient}</li>`)
      .join('');
  }

  if (benefitsList) {
    benefitsList.innerHTML = product.benefits
      .map(benefit => `<li>${benefit}</li>`)
      .join('');
  }

  if (orderButton) {
    const mailtoLink = `mailto:nkcyfoods5@gmail.com?subject=Order%20Inquiry%20-%20${encodeURIComponent(product.name)}&body=Hi%20NicyFoods,%0A%0AI%20am%20interested%20in%20ordering%20${encodeURIComponent(product.name)}.%0A%0APlease%20provide%20more%20details%20and%20pricing.%0A%0AThank%20you!`;
    orderButton.href = mailtoLink;
  }

  // Update page title
  document.title = `${product.name} - NicyFoods`;
}

// Load product details on page load
if (document.querySelector('.product-detail-container')) {
  document.addEventListener('DOMContentLoaded', loadProductDetail);
}

// ===== CONTACT FORM FUNCTIONALITY =====

/**
 * Handle contact form submission
 */
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();

    // Basic validation
    if (!name || !email || !message) {
      alert('Please fill in all required fields');
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }

    // Build mailto link
    const subject = `Contact Form - ${name}`;
    const body = `Name: ${name}%0AEmail: ${email}%0APhone: ${phone}%0A%0AMessage:%0A${message}`;
    const mailtoLink = `mailto:nkcyfoods5@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;

    // Open email client
    window.location.href = mailtoLink;

    // Show success message
    alert('Thank you for reaching out! Your email client will open to send your message.');
    
    // Reset form
    contactForm.reset();
  });
}

// ===== SCROLL ANIMATIONS =====

/**
 * Add scroll animation to elements
 */
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  // Observe all product cards
  document.querySelectorAll('.product-card').forEach(card => {
    observer.observe(card);
  });

  // Observe highlight cards
  document.querySelectorAll('.highlight-card').forEach(card => {
    observer.observe(card);
  });

  // Observe value cards
  document.querySelectorAll('.value-card').forEach(card => {
    observer.observe(card);
  });
}

document.addEventListener('DOMContentLoaded', initScrollAnimations);

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====

/**
 * Handle smooth scrolling for anchor links
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    if (href === '#') return;
    
    e.preventDefault();
    
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== UTILITY FUNCTIONS =====

/**
 * Debounce function for performance
 * @param {function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Check if element is in viewport
 * @param {element} element - Element to check
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// ===== INITIALIZATION =====

/**
 * Initialize on DOMContentLoaded
 */
document.addEventListener('DOMContentLoaded', async () => {
  // Load products from JSON first
  await loadProductsFromJSON();

  // Set active nav link
  setActiveNavLink();

  // Initialize product rendering
  initializeProductRendering();

  // Initialize scroll animations
  initScrollAnimations();

  // Set initial filter
  if (filterButtons[0]) {
    filterButtons[0].classList.add('active');
    filterProducts('all');
  }

  // Log successful initialization
  console.log('NicyFoods website initialized successfully!');
});

// ===== PERFORMANCE: LAZY LOADING =====

/**
 * Initialize lazy loading for images
 */
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => imageObserver.observe(img));
}

// ===== RESPONSIVE BEHAVIOR =====

/**
 * Handle window resize events
 */
const handleResize = debounce(() => {
  // Close mobile menu on resize to desktop
  if (window.innerWidth > 768) {
    if (hamburger) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('show');
    }
  }
}, 250);

window.addEventListener('resize', handleResize);

// ===== HEADER SCROLL EFFECT =====

/**
 * Add subtle shadow to header on scroll
 */
let lastScrollTop = 0;
window.addEventListener('scroll', debounce(() => {
  const header = document.querySelector('header');
  if (!header) return;

  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  if (scrollTop > 0) {
    header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
  }
  
  lastScrollTop = scrollTop;
}, 100));

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    loadProductsFromJSON,
    productsDatabase,
    filterProducts,
    createProductCard,
    formatCategory,
    getProductIdFromURL,
    loadProductDetail,
    initializeProductRendering
  };
}
