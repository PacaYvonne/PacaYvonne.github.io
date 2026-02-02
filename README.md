## Component Structure

```
components/
├── article/
│   ├── additional-reading.js    # Additional reading section component (displays related articles)
│   ├── article-registry.js      # Centralized article metadata registry
│   ├── article-footer.js         # Article footer component
│   ├── breadcrumb.js             # Breadcrumb navigation (optional dependency for fold.js)
│   └── fold.js                   # Main article header component (handles title, author, date, breadcrumb, image - all self-contained)
├── ads/
│   └── ad.js                     # Ad component (background image ads)
├── comparison-table/
│   └── comparison-table.js       # Reusable comparison table with brand selector for mobile responsiveness
├── product/
│   ├── product-showcase.js       # Product showcase card
│   ├── product-card.js           # Product card component
│   └── product-reviews.js         # Product reviews component
└── testimonial/
    └── testimonial-carousel.js    # Testimonial carousel component
```

## Usage of product card

- inserts product card as a child element of \#pacagen-spray-showcase
- add appropriate class to element. typically classes are: d-flex justify-content-center align-items-center mb-3, but adjust as needed based on context
- Wrap function call in a DOMContentLoaded event listener to make sure that element exists before attempting to query.
- sample usage below:
```
        document.addEventListener('DOMContentLoaded', function() {
            const pacagenSprayShowcase = createProductShowcase({
                image: 'canshand.png', //filename for image - function automatically routes to correct directory
                alt: 'Cat Allergen Neutralizing Spray', // image alt text
                description: 'Breaks down 98% of cat allergens on contact', // product description
                url: 'https://www.pacagen.com/products/cat-allergen-neutralizing-spray', // target url when clicked
                pageType: 'root' // use "blog" when calling function withing ./blog, else use "root"
            });
            document.getElementById('pacagen-spray-showcase').innerHTML = pacagenSprayShowcase;
        });
```