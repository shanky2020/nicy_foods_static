# NicyFoods Products Management Guide

## Overview
Product data is now maintained in a JSON file (`data/products.json`) instead of being hardcoded in JavaScript. This allows you to easily add, edit, or delete products without touching any code.

## File Location
- **File**: `data/products.json`
- **Format**: JavaScript Object Notation (JSON)

## Product Data Structure

Each product object contains the following fields:

```json
{
  "id": 1,
  "name": "Product Name",
  "category": "traditional",
  "description": "Short description (displayed on product grid)",
  "price": "₹299",
  "image": "https://images.unsplash.com/photo-...",
  "fullDescription": "Long detailed description (displayed on product detail page)",
  "ingredients": [
    "Ingredient 1",
    "Ingredient 2",
    "Ingredient 3"
  ],
  "benefits": [
    "Benefit 1",
    "Benefit 2",
    "Benefit 3"
  ]
}
```

## Field Descriptions

| Field | Type | Description | Example |
|-------|------|-------------|---------|
| `id` | Number | Unique identifier for product | `1`, `2`, `3` |
| `name` | String | Product name | `"Peanut Laddu"` |
| `category` | String | Product category | `"traditional"`, `"herbal"`, `"millet"`, `"baby-friendly"` |
| `description` | String | Short description for product grid | `"Rich & nutty roasted peanut laddoos with pure ghee"` |
| `price` | String | Price with rupee symbol | `"₹299"` |
| `image` | String | Product image URL (use external URLs or local path) | `"https://..."` or `"images/product.jpg"` |
| `fullDescription` | String | Detailed description for product detail page | `"Delicious and nutritious peanut laddoos made with..."` |
| `ingredients` | Array | List of ingredients | `["Roasted Peanuts", "Pure Ghee", ...]` |
| `benefits` | Array | List of health benefits | `["High in Protein", "Energy Boost", ...]` |

## Categories Available

- `traditional` - Traditional laddoos (Peanut, Dates, Sesame, Coconut)
- `herbal` - Herbal laddoos (Tulsi, Ashwagandha, Moringa, etc.)
- `millet` - Millet-based laddoos (Millet, Ragi)
- `baby-friendly` - Baby-safe products

## How to Add a New Product

1. Open `data/products.json`
2. Find the last product in the array
3. Add a comma after the last product's closing brace `}`
4. Add a new product object with all required fields
5. Make sure to use a **unique ID** (higher than existing IDs)
6. Save the file

### Example: Adding a New Hibiscus Laddu

```json
{
  "id": 13,
  "name": "Hibiscus Laddu",
  "category": "herbal",
  "description": "Antioxidant-rich hibiscus laddoos for vitality",
  "price": "₹359",
  "image": "https://images.unsplash.com/photo-...",
  "fullDescription": "Delightful hibiscus laddoos packed with antioxidants and vitamin C for enhanced immunity.",
  "ingredients": [
    "Dried Hibiscus Petals",
    "Pure Ghee",
    "Natural Jaggery",
    "Dry Fruits"
  ],
  "benefits": [
    "Rich in Antioxidants",
    "Vitamin C Boost",
    "Heart Health",
    "Energy Enhancement"
  ]
}
```

## How to Edit a Product

1. Open `data/products.json`
2. Find the product by its `id`
3. Update any fields (avoid changing the `id`)
4. Save the file
5. Refresh your browser to see changes

### Example: Changing Price

Before:
```json
"price": "₹299"
```

After:
```json
"price": "₹319"
```

## How to Delete a Product

1. Open `data/products.json`
2. Find the product you want to delete
3. Delete the entire product object `{ ... }`
4. If it's not the last product, remove the trailing comma from the previous product
5. Save the file
6. Refresh your browser

## Important Notes

⚠️ **JSON Validation Tips:**
- All field values must be enclosed in **double quotes** (")
- Arrays use **square brackets** [ ]
- Objects use **curly braces** { }
- Always include a **comma** after each object/field EXCEPT the last one
- Product IDs must be **unique**

## Validation

You can validate your JSON using online tools:
- https://jsonlint.com/
- https://www.jsonchecker.com/

## Image URLs

### Using External URLs (Recommended for development)
```json
"image": "https://images.unsplash.com/photo-1599599810694-b5ac4dd33dfa?w=500&q=80"
```

### Using Local Images (Place in `images/` folder)
```json
"image": "images/product-name.jpg"
```

## Common Issues & Troubleshooting

### Products not loading?
1. Check browser console for errors (F12 → Console)
2. Verify JSON syntax using jsonlint.com
3. Ensure `data/products.json` file exists
4. Check file path in script: `data/products.json`

### Products show but not filtering?
- Verify category names match the categories:
  - `traditional`
  - `herbal`
  - `millet`
  - `baby-friendly`

### Special Characters in JSON?
Use **escape sequences**:
- Apostrophe: `\'` or just use `"` for strings
- Quotes within strings: `\"`
- Newlines: `\n`

Example:
```json
"fullDescription": "Women's wellness herbal laddoos for optimal health"
```

## How the System Works

1. **On Page Load**: JavaScript calls `loadProductsFromJSON()`
2. **JSON Fetch**: Products are fetched from `data/products.json`
3. **Data Storage**: Products stored in `productsDatabase` array
4. **Rendering**: Products are dynamically rendered on:
   - Homepage: First 4 products as featured
   - Products Page: All products with category filters
   - Product Detail Page: Individual product info

## Next Steps

- **Add custom product images**: Replace image URLs with local files in `images/` folder
- **Add more categories**: Update category filter in HTML and CSS
- **Bulk operations**: Use JSON editors for faster bulk updates

---

**Note**: Always backup your JSON file before making large changes!
