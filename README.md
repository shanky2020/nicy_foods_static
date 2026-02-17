# 🌿 NicyFoods - Premium Handmade Ladoos Website

A modern, mobile-responsive static website for NicyFoods, a healthy handmade ladoo brand established in 2017. Built with pure HTML5, CSS3, and vanilla JavaScript - no frameworks or dependencies required.

## ✨ Features

### 🎨 Design & UI
- **Mobile-First Responsive Design** - Perfect on all devices (320px to 4K+)
- **Premium Green Color Palette** - #2e7d32 primary, #66bb6a accent
- **Smooth Animations** - Fade-in, slide-in, and hover effects
- **Semantic HTML5** - SEO-friendly markup structure
- **Google Fonts Integration** - Poppins font for modern look
- **Sticky Navigation** - Always accessible header with mobile hamburger menu

### 🛍️ Product Features
- **12+ Products** - Traditional, herbal, millet, and baby-friendly varieties
- **Category Filtering** - Real-time filtering with no page reload
- **Product Grid** - Responsive 1-4 column layout based on screen size
- **Hover Effects** - Image zoom and subtle scale animations
- **Product Details** - Ingredients, benefits, pricing, and order buttons

### 📱 Responsive Breakpoints
- **Desktop**: 1200px+ (4-column grid)
- **Tablet**: 768px-1199px (2-column grid)
- **Mobile**: 480px-767px (1-2 column grid)
- **Ultra Mobile**: Below 480px (1-column grid)

### 🔄 Interactivity
- **Hamburger Mobile Menu** - Smooth expand/collapse animation
- **Product Filtering** - Click to filter by category instantly
- **Form Validation** - Contact form with email validation
- **Smooth Scrolling** - Anchor links scroll smoothly
- **Scroll Animations** - Elements animate in as they come into view
- **Scroll Effects** - Header shadow changes on scroll

### 📧 Contact Integration
- **Email Links** - Click to email with pre-filled subject and body
- **Phone Links** - Click to call directly
- **Contact Form** - Collects name, email, phone, and message
- **Google Maps Embed** - Location map of Warje office

### 📊 SEO Optimization
- Meta tags for all pages
- Semantic HTML structure
- Breadcrumb navigation
- Proper heading hierarchy
- Image alt text and lazy loading ready
- Mobile viewport meta tag
- Open Graph tags

## 📁 Project Structure

```
nicy_foods_static/
├── index.html                 # Homepage with featured products
├── about.html                 # Company story, mission, values
├── products.html              # All products with category filtering
├── product-detail.html        # Single product detail page
├── contact.html               # Contact form and information
├── css/
│   └── style.css             # Complete styling (1200+ lines)
├── js/
│   └── script.js             # All interactivity (900+ lines)
└── images/                    # Placeholder for product images
```

## 🚀 Features Breakdown

### Pages

#### 1. **index.html** - Homepage
- Hero banner with CTA
- 4 featured products grid
- Why Choose NicyFoods highlights
- Mission & Vision cards
- Quality promise section
- Footer with complete info

#### 2. **about.html** - About Page
- Company hero section
- Detailed brand story
- Mission & Vision with icons
- 6 core values cards
- Product quality promise
- 4 product range categories
- FAQ section

#### 3. **products.html** - Products Catalog
- Hero section
- 5-category filter: All, Traditional, Herbal, Millet, Baby Friendly
- Responsive product grid (12 products)
- Product cards with images, names, descriptions, prices
- View Details buttons linking to product details
- Product category info section
- Quality assurance highlights

#### 4. **product-detail.html** - Product Details
- Large product image
- Product name, category, description
- Ingredients list with checkmarks
- Health benefits list with checkmarks
- Price display
- Email order button with pre-filled subject
- Phone call button
- Quality promise section
- How to order steps
- Related products showcase
- Customer testimonials

#### 5. **contact.html** - Contact Page
- Contact form (name, email, phone, message)
- Form validation
- Contact details section
- Google Maps embed
- FAQ section with 6 questions
- Bulk order/partnership section
- Why Choose Us highlights

### Styling Features

#### CSS (2500+ lines)
- **CSS Grid & Flexbox** - Modern layout techniques
- **CSS Variables** - Easy color and spacing customization
- **Smooth Transitions** - 0.3s cubic-bezier animations
- **Box Shadows** - Depth and elevation effects
- **Gradient Backgrounds** - Hero sections and buttons
- **Responsive Images** - Object-fit for consistent sizes
- **Custom Scrollbar** - Styled scrollbar to match brand
- **Animation Keyframes** - fadeInUp, fadeIn, slideIn, pulse
- **Utility Classes** - Spacing, text formatting helpers
- **Mobile Breakpoints** - 3 breakpoints (768px, 480px, 360px)

### JavaScript Features

#### script.js (900+ lines)
- **Product Database** - 12 products with full details
- **Dynamic Filtering** - Real-time category filtering
- **Product Rendering** - Create HTML from data dynamically
- **Navigation** - Active link detection, hamburger toggle
- **Form Handling** - Validation, email integration
- **Product Details** - Load product from URL parameters
- **Scroll Animations** - Intersection Observer for fade-in
- **Header Effects** - Scroll-triggered shadow changes
- **Responsive Behavior** - Window resize handling
- **Smooth Scrolling** - Anchor link smooth scroll
- **Performance** - Debounce, lazy loading ready
- **Export Module** - Functions exported for testing

## 🎯 Key Functionality

### 1. Product Filtering
```javascript
// Click filter button → instantly filters products
// No page reload, smooth animations
// Categories: All, Traditional, Herbal, Millet, Baby Friendly
```

### 2. Dynamic Product Loading
```javascript
// Products load from JavaScript database
// URLs like products.html?id=1 load product details
// Email buttons pre-fill with product name
```

### 3. Contact Form
```javascript
// Validates name, email, message
// Opens email client with pre-filled info
// Built-in phone link for direct call
```

### 4. Responsive Navigation
```javascript
// Hamburger menu on mobile (< 768px)
// Auto-close on link click or resize
// Active link highlighting
```

## 🎨 Color Palette

```css
--primary-color: #2e7d32     /* Forest Green */
--light-green: #66bb6a       /* Light Green - Accents */
--dark-green: #1b5e20        /* Dark Green - Hover/Active */
--accent-beige: #f5f1de      /* Warm Beige */
--light-bg: #fafaf9          /* Light Background */
--white: #ffffff             /* White */
--text-dark: #2c3e50         /* Dark Text */
--text-light: #666666        /* Light Gray Text */
--border-color: #e0e0e0      /* Borders */
```

## 📱 Browser Compatibility

- ✅ Chrome/Chromium (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Edge (Latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Setup & Usage

### Option 1: Direct File Opening
1. Open `index.html` in a web browser by double-clicking
2. Navigate using the menu
3. All features work immediately

### Option 2: Local Development Server (Recommended)
```bash
# Using Python (Built-in)
python -m http.server 8000
# Or for Python 2
python -m SimpleHTTPServer 8000

# Using Node.js
npx http-server

# Using Live Server (VS Code)
# Install "Live Server" extension and right-click index.html → Open with Live Server
```
Then visit: `http://localhost:8000`

### Option 3: Deploy to GitHub Pages
```bash
1. Create GitHub repository
2. Upload all files to main branch
3. Go to Settings → Pages
4. Select "Deploy from a branch"
5. Choose "main" branch, save
6. Your site will be live at: https://yourusername.github.io/nicy_foods_static
```

## 📝 Content Features

### Brand Information
- **Company**: NicyFoods
- **Established**: 2017
- **Specialty**: Handmade Ladoos
- **Phone**: +91 8263001410
- **Email**: nkcyfoods5@gmail.com
- **Location**: Warje, Pune

### Products
1. Peanut Laddu (Traditional)
2. Khajur (Dates) Laddu (Traditional)
3. Tulsi Laddu (Herbal)
4. Beet Root Laddu (Herbal)
5. Ashwagandha Laddu (Herbal)
6. Shatavari Laddu (Herbal)
7. Moringa Laddu (Herbal)
8. Millet Laddu (Millet)
9. Baby Cereal Laddu (Baby Friendly)
10. Ragi Laddu (Millet)
11. Sesame Til Laddu (Traditional)
12. Coconut Laddu (Traditional)

## 🎯 SEO Structure

- Title tags for all pages
- Meta descriptions
- Semantic heading hierarchy
- Alt text on images
- Mobile viewport meta tag
- Open Graph tags
- Breadcrumb navigation
- Fast page load (no external dependencies)

## 🚀 Performance

- **No Dependencies** - Pure vanilla JS
- **Minimal CSS** - No framework bloat
- **No CDN Required** - Only Google Fonts (optional)
- **Fast Load Time** - Single CSS/JS file each
- **Lazy Loading Ready** - Image structure supports lazy loading
- **Optimized Images** - Using Unsplash URLs (CDN-hosted)

## 🔐 Form Integration

### Contact Form
- Email: Opens default email client
- Phone: Opens phone dialer
- Pre-filled subject and body
- Form validation before sending

### Product Ordering
- Email button with pre-filled product name
- Phone call link for direct inquiry
- Works on desktop and mobile

## 📄 Code Quality

- **Well-Commented** - Clear comments throughout
- **Semantic HTML** - Proper semantic tags (nav, header, footer, section, article)
- **DRY Principles** - Reusable CSS classes and JS functions
- **Clean Code** - Readable variable/function names
- **Responsive Mobile-First** - Desktop enhancements on top of mobile
- **Accessibility** - Semantic HTML, good color contrast

## 🎓 Learning Resources

This project demonstrates:
- Modern HTML5 semantics
- Advanced CSS Grid & Flexbox
- CSS animations and transitions
- Vanilla JavaScript (no frameworks)
- Responsive design patterns
- Form handling and validation
- URL parameter parsing
- Intersection Observer API
- Event delegation
- Local storage ready

## 🔄 Customization Guide

### Change Colors
Edit CSS variables in `style.css`:
```css
:root {
  --primary-color: #your_color;
  --light-green: #your_accent;
}
```

### Add Products
Edit `productsDatabase` in `script.js`:
```javascript
{
  id: 13,
  name: 'Your Laddu',
  category: 'herbal',
  description: '...',
  price: '₹XXX',
  image: 'image_url',
  fullDescription: '...',
  ingredients: [...],
  benefits: [...]
}
```

### Change Contact Info
Search for specific phone/email in HTML files and replace:
- `+91 8263001410` → your phone
- `nkcyfoods5@gmail.com` → your email
- Address → your address

### Add More Pages
1. Create `new-page.html`
2. Copy header/footer from existing page
3. Add to navigation menu in all pages
4. Update to `style.css` and `script.js` if needed

## 📞 Support

For issues or questions about the website, contact:
- **Phone**: +91 8263001410
- **Email**: nkcyfoods5@gmail.com

## 📄 License

This website template is provided for NicyFoods. All code is original and can be freely modified for your use.

## ✅ Testing Checklist

- [ ] All pages load without errors
- [ ] Navigation works on desktop and mobile
- [ ] Hamburger menu appears on mobile
- [ ] Products filter correctly
- [ ] Product details page loads with correct data
- [ ] Contact form validates inputs
- [ ] Email and phone links work
- [ ] Map loads correctly
- [ ] Responsive design works at all breakpoints
- [ ] Animations are smooth
- [ ] No console errors

---

**Built with ❤️ for NicyFoods - Premium Handmade Ladoos Since 2017**
