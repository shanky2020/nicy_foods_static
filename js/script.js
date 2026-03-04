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
      }, 50);
    } else {
      card.classList.add('hidden');
    }
  });
}

// ===== RENDER PRODUCTS =====

/**
 * Get all images for a product with backward compatibility
 * @param {object} product - Product object
 * @returns {array} Array of image URLs
 */
function getProductImages(product) {
  const imageFolder = (product.imageFolder || '').replace(/\/+$/, '');

  const resolveImagePath = (imagePath) => {
    if (!imagePath) return '';

    // Keep full URLs/data URIs/absolute paths unchanged.
    const isAbsolutePath = /^(https?:)?\/\//i.test(imagePath) || imagePath.startsWith('data:') || imagePath.startsWith('/');
    if (isAbsolutePath) return imagePath;

    // If product has a dedicated folder and image is a filename, prefix it.
    if (imageFolder && !imagePath.includes('/')) {
      return `${imageFolder}/${imagePath}`;
    }

    // Otherwise treat it as a project-relative path.
    return imagePath;
  };

  if (Array.isArray(product.images) && product.images.length > 0) {
    return product.images.map(resolveImagePath).filter(Boolean);
  }
  if (product.image) {
    return [resolveImagePath(product.image)];
  }
  return [];
}

/**
 * Get primary product image
 * @param {object} product - Product object
 * @returns {string} Image URL or empty string
 */
function getPrimaryProductImage(product) {
  const images = getProductImages(product);
  return images[0] || '';
}

/**
 * Create product card HTML
 * @param {object} product - Product object
 * @returns {string} - HTML string for product card
 */
function createProductCard(product) {
  const primaryImage = getPrimaryProductImage(product);
  const detailUrl = `product-detail.html?id=${product.id}`;

  return `
    <a href="${detailUrl}" class="product-card product-card-link" data-category="${product.category}" data-product-id="${product.id}" data-detail-url="${detailUrl}" aria-label="View details for ${product.name}">
      <div class="product-image">
        <img src="${primaryImage}" alt="${product.name}" loading="lazy">
      </div>
      <div class="product-info">
        <span class="product-category">${formatCategory(product.category)}</span>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <p class="product-price">${product.price}</p>
        <span class="btn btn-primary btn-small" style="width: 100%; justify-content: center;">
          View Details
        </span>
      </div>
    </a>
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
async function loadProductDetail() {
  const productId = getProductIdFromURL();
  
  if (!productId) {
    console.error('No product ID provided');
    return;
  }

  // Ensure products are loaded before looking up the detail page id.
  if (!productsDatabase.length) {
    await loadProductsFromJSON();
  }

  const product = productsDatabase.find(p => p.id == productId);
  
  if (!product) {
    console.error(`Product not found for id=${productId}`);
    return;
  }

  // Update page content
  const detailImage = document.querySelector('.product-detail-image img');
  const detailName = document.querySelector('.product-detail-info h1');
  const detailCategory = document.querySelector('.detail-category');
  const detailDescription = document.querySelector('.detail-description');
  const keyFeaturesList = document.querySelector('.key-features-list');
  const ingredientsList = document.querySelector('.ingredients-list');
  const benefitsList = document.querySelector('.benefits-list');
  const detailPrice = document.querySelector('.detail-price');
  const orderButton = document.querySelector('.order-now-btn');
  const questionEmail = document.querySelector('.detail-question-email');
  const packagingInfo = document.querySelector('.packaging-info');
  const deliveryInfo = document.querySelector('.delivery-info');
  const questionsInfo = document.querySelector('.questions-info');
  const detailImageContainer = document.querySelector('.product-detail-image');
  const productImages = getProductImages(product);
  const ingredients = Array.isArray(product.ingredients) ? product.ingredients : [];
  const benefits = Array.isArray(product.benefits) ? product.benefits : [];
  const keyFeatures = Array.isArray(product.keyFeatures) && product.keyFeatures.length > 0
    ? product.keyFeatures
    : benefits.slice(0, 4);
  const keyFeaturesSection = keyFeaturesList ? keyFeaturesList.closest('.detail-section') : null;
  const additionalInfoSection = document.querySelector('.product-additional-info');
  const productContactEmail = product.contactEmail || 'nicyfoods5@gmail.com';

  if (detailImage && productImages.length > 0) {
    detailImage.src = productImages[0];
    detailImage.alt = product.name;
  }
  if (detailName) detailName.textContent = product.name;
  if (detailCategory) detailCategory.textContent = formatCategory(product.category);
  if (detailDescription) detailDescription.textContent = product.fullDescription;
  if (detailPrice) detailPrice.textContent = product.price;

  if (keyFeaturesList) {
    if (keyFeatures.length > 0) {
      keyFeaturesList.innerHTML = keyFeatures
        .map(feature => `<li>${feature}</li>`)
        .join('');
      if (keyFeaturesSection) keyFeaturesSection.style.display = '';
    } else if (keyFeaturesSection) {
      keyFeaturesSection.style.display = 'none';
    }
  }

  if (detailImageContainer && productImages.length > 1) {
    let thumbnails = detailImageContainer.querySelector('.product-thumbnails');
    if (!thumbnails) {
      thumbnails = document.createElement('div');
      thumbnails.className = 'product-thumbnails';
      detailImageContainer.appendChild(thumbnails);
    }

    thumbnails.innerHTML = productImages
      .map((image, index) => `
        <button class="thumbnail-btn ${index === 0 ? 'active' : ''}" type="button" data-image="${image}" aria-label="View image ${index + 1} of ${product.name}">
          <img src="${image}" alt="${product.name} image ${index + 1}" loading="lazy">
        </button>
      `)
      .join('');

    thumbnails.querySelectorAll('.thumbnail-btn').forEach(button => {
      button.addEventListener('click', () => {
        const selectedImage = button.dataset.image;
        if (detailImage && selectedImage) {
          detailImage.src = selectedImage;
        }
        thumbnails.querySelectorAll('.thumbnail-btn').forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
      });
    });
  }

  if (ingredientsList) {
    if (ingredients.length > 0) {
      ingredientsList.innerHTML = ingredients
        .map(ingredient => `<li>${ingredient}</li>`)
        .join('');
      ingredientsList.closest('.detail-section').style.display = '';
    } else {
      ingredientsList.innerHTML = '';
      ingredientsList.closest('.detail-section').style.display = 'none';
    }
  }

  if (benefitsList) {
    if (benefits.length > 0) {
      benefitsList.innerHTML = benefits
        .map(benefit => `<li>${benefit}</li>`)
        .join('');
      benefitsList.closest('.detail-section').style.display = '';
    } else {
      benefitsList.innerHTML = '';
      benefitsList.closest('.detail-section').style.display = 'none';
    }
  }

  if (orderButton) {
    const mailtoLink = `mailto:${productContactEmail}?subject=Order%20Inquiry%20-%20${encodeURIComponent(product.name)}&body=Hi%20NicyFoods,%0A%0AI%20am%20interested%20in%20ordering%20${encodeURIComponent(product.name)}.%0A%0APlease%20provide%20more%20details%20and%20pricing.%0A%0AThank%20you!`;
    orderButton.href = mailtoLink;
  }

  if (questionEmail) {
    questionEmail.href = `mailto:${productContactEmail}`;
    questionEmail.textContent = productContactEmail;
  }

  if (additionalInfoSection) {
    const hasAdditionalInfo = product.packagingInfo || product.deliveryInfo || product.questionsInfo;
    if (!hasAdditionalInfo) {
      additionalInfoSection.style.display = 'none';
    } else {
      additionalInfoSection.style.display = '';
      if (packagingInfo && product.packagingInfo) {
        packagingInfo.innerHTML = `<strong>📦 Packaging:</strong> ${product.packagingInfo}`;
      }
      if (deliveryInfo && product.deliveryInfo) {
        deliveryInfo.innerHTML = `<strong>🚚 Delivery:</strong> ${product.deliveryInfo}`;
      }
      if (questionsInfo && product.questionsInfo) {
        questionsInfo.innerHTML = `<strong>❓ Questions?</strong> ${product.questionsInfo}`;
      }
    }
  }

  const breadcrumbCurrent = document.querySelector('section nav span:last-child');
  if (breadcrumbCurrent) {
    breadcrumbCurrent.textContent = product.name;
  }

  // Update page title
  document.title = `${product.name} - NicyFoods`;
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

  // Load product details on product detail page
  if (document.querySelector('.product-detail-container')) {
    await loadProductDetail();
  }

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
    getProductImages,
    getPrimaryProductImage,
    getProductIdFromURL,
    loadProductDetail,
    initializeProductRendering
  };
}
