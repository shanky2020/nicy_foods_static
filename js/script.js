/* =====================================================
   NicyFoods - Vanilla JavaScript
   Modern interactive features and functionality
   ===================================================== */

// ===== PRODUCT DATA DATABASE =====
let productsDatabase = [];

/**
 * Fallback inline products data (for file:// protocol)
 */
const FALLBACK_PRODUCTS = [
  {
    id: 1,
    name: 'Peanut Laddu',
    category: 'traditional',
    description: 'Rich & nutty roasted peanut laddoos with pure ghee',
    price: '₹299',
    image: 'https://images.unsplash.com/photo-1599599810694-b5ac4dd33dfa?w=500&q=80',
    fullDescription: 'Delicious and nutritious peanut laddoos made with roasted peanuts, pure ghee, and natural jaggery. Perfect for snacking and energy boost.',
    ingredients: ['Roasted Peanuts', 'Pure Ghee', 'Natural Jaggery', 'Dry Fruits'],
    benefits: ['High in Protein', 'Energy Boost', 'Aids Digestion', 'Rich in Antioxidants']
  },
  {
    id: 2,
    name: 'Khajur (Dates) Laddu',
    category: 'traditional',
    description: 'Sweet dates and ghee combination, naturally sugary',
    price: '₹329',
    image: 'https://images.unsplash.com/photo-1599599810972-a4c67b3097b1?w=500&q=80',
    fullDescription: 'Premium dates laddoos made with finest quality dates, pure ghee, and a touch of cardamom. No added sugar needed due to natural sweetness of dates.',
    ingredients: ['Premium Dates', 'Pure Ghee', 'Cardamom', 'Dry Fruits'],
    benefits: ['Natural Energy', 'Iron Rich', 'Improves Digestion', 'Glowing Skin']
  },
  {
    id: 3,
    name: 'Tulsi Laddu',
    category: 'herbal',
    description: 'Herbal tulsi-infused laddoos for immunity boost',
    price: '₹349',
    image: 'https://images.unsplash.com/photo-1599599810923-f8d0bc1e88a4?w=500&q=80',
    fullDescription: 'Specially crafted tulsi laddoos with immunity-boosting properties. Made with fresh tulsi leaves, pure ghee, and natural ingredients.',
    ingredients: ['Fresh Tulsi', 'Pure Ghee', 'Natural Jaggery', 'Dry Fruits'],
    benefits: ['Boosts Immunity', 'Relieves Cough', 'Detoxifies Body', 'Anti-inflammatory']
  },
  {
    id: 4,
    name: 'Beet Root Laddu',
    category: 'herbal',
    description: 'Colorful and nutritious beet laddoos, iron-rich',
    price: '₹359',
    image: 'https://images.unsplash.com/photo-1599599810736-a3e6c2839b94?w=500&q=80',
    fullDescription: 'Naturally colored beetroot laddoos packed with iron and antioxidants. Perfect for blood health and overall wellness.',
    ingredients: ['Fresh Beetroot', 'Pure Ghee', 'Natural Jaggery', 'Peanuts'],
    benefits: ['Iron Rich', 'Improves Blood Flow', 'Detoxifies', 'Glowing Skin']
  },
  {
    id: 5,
    name: 'Ashwagandha Laddu',
    category: 'herbal',
    description: 'Stress relief and vitality boosting herbal laddoos',
    price: '₹379',
    image: 'https://images.unsplash.com/photo-1599599810893-a3e6c2839b94?w=500&q=80',
    fullDescription: 'Powerful adaptogenic ashwagandha laddoos formulated to reduce stress, improve sleep, and enhance overall vitality.',
    ingredients: ['Ashwagandha Powder', 'Pure Ghee', 'Natural Jaggery', 'Dry Fruits'],
    benefits: ['Reduces Stress', 'Improves Sleep', 'Boosts Immunity', 'Enhances Energy']
  },
  {
    id: 6,
    name: 'Shatawari Laddu',
    category: 'herbal',
    description: 'Women\'s wellness herbal laddoos, traditionally revered',
    price: '₹369',
    image: 'https://images.unsplash.com/photo-1599599811854-a3e6c2839b94?w=500&q=80',
    fullDescription: 'Traditional Ayurvedic Shatavari laddoos specially formulated for women\'s health, hormonal balance, and overall wellness.',
    ingredients: ['Shatavari Root', 'Pure Ghee', 'Natural Jaggery', 'Dates'],
    benefits: ['Women\'s Health', 'Hormonal Balance', 'Nourishing', 'Reproductive Health']
  },
  {
    id: 7,
    name: 'Moringa Laddu',
    category: 'herbal',
    description: 'Nutrient-packed moringa (drumstick) leaf laddoos',
    price: '₹349',
    image: 'https://images.unsplash.com/photo-1599599813456-a3e6c2839b94?w=500&q=80',
    fullDescription: 'Supercharged moringa laddoos loaded with 92 nutrients. Perfect for daily nutrition and overall wellness.',
    ingredients: ['Moringa Leaf Powder', 'Pure Ghee', 'Natural Jaggery', 'Almonds'],
    benefits: ['Nutrient Dense', 'Energy Booster', 'Improves Digestion', 'Boosts Immunity']
  },
  {
    id: 8,
    name: 'Millet Laddu',
    category: 'millet',
    description: 'Ancient grain millet laddoos, gluten-free nutrition',
    price: '₹319',
    image: 'https://images.unsplash.com/photo-1599599812891-a3e6c2839b94?w=500&q=80',
    fullDescription: 'Wholesome millet-based laddoos made from ancient grains. Naturally gluten-free and packed with essential minerals and fiber.',
    ingredients: ['Roasted Millet', 'Pure Ghee', 'Natural Jaggery', 'Sesame Seeds'],
    benefits: ['Gluten-Free', 'High in Fiber', 'Aids Digestion', 'Sustainable Grain']
  },
  {
    id: 9,
    name: 'Baby Cereal Laddu',
    category: 'baby-friendly',
    description: 'Gentle nutrition for little ones, from 8 months',
    price: '₹289',
    image: 'https://images.unsplash.com/photo-1599599810234-a3e6c2839b94?w=500&q=80',
    fullDescription: 'Carefully crafted laddoos suitable for babies from 8 months. Made with mild cereals, pure ghee, and no allergenic ingredients.',
    ingredients: ['Rice Cereal', 'Moong Dal', 'Pure Ghee', 'Natural Jaggery'],
    benefits: ['Baby Safe', 'Easy to Digest', 'Nutritious', 'No Allergens']
  },
  {
    id: 10,
    name: 'Ragi Laddu',
    category: 'millet',
    description: 'Finger millet laddoos, calcium and iron enriched',
    price: '₹329',
    image: 'https://images.unsplash.com/photo-1599599808123-a3e6c2839b94?w=500&q=80',
    fullDescription: 'Calcium-rich ragi (finger millet) laddoos perfect for bone health and iron content. Ideal for all age groups.',
    ingredients: ['Roasted Ragi', 'Pure Ghee', 'Natural Jaggery', 'Dry Fruits'],
    benefits: ['Calcium Rich', 'Iron Rich', 'Bone Health', 'Energy Dense']
  },
  {
    id: 11,
    name: 'Sesame Til Laddu',
    category: 'traditional',
    description: 'Til-rich laddoos for warmth and wellness',
    price: '₹299',
    image: 'https://images.unsplash.com/photo-1599599805234-a3e6c2839b94?w=500&q=80',
    fullDescription: 'Traditional sesame laddoos loaded with calcium and healthy fats. Perfect for winter wellness.',
    ingredients: ['Roasted Sesame Seeds', 'Pure Ghee', 'Natural Jaggery', 'Almonds'],
    benefits: ['Calcium Rich', 'Healthy Fats', 'Bone Health', 'Warming Properties']
  },
  {
    id: 12,
    name: 'Coconut Laddu',
    category: 'traditional',
    description: 'Tropical coconut laddoos with subtle sweetness',
    price: '₹319',
    image: 'https://images.unsplash.com/photo-1599599812534-a3e6c2839b94?w=500&q=80',
    fullDescription: 'Delightful coconut laddoos made with fresh coconut, pure ghee, and natural jaggery. Aromatic and delicious.',
    ingredients: ['Fresh Coconut', 'Pure Ghee', 'Natural Jaggery', 'Cashews'],
    benefits: ['Cooking Coconut', 'Healthy Fats', 'Good for Skin', 'Energy Booster']
  }
];

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
    console.warn('Could not load JSON file, using fallback data:', error.message);
    // Use fallback data (for file:// protocol or when JSON file is not accessible)
    productsDatabase = FALLBACK_PRODUCTS;
    console.log('Using fallback products data:', productsDatabase.length, 'products');
    return productsDatabase;
  }
}

// ===== DOM ELEMENTS =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const filterButtons = document.querySelectorAll('.filter-btn');
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

// ===== PRODUCT FILTERING =====

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
      }, 10);
    } else {
      card.classList.add('hidden');
    }
  });
}

/**
 * Initialize filter buttons
 */
if (filterButtons.length > 0) {
  filterButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      // Filter products
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
