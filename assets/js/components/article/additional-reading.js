// Additional Reading Component
// Creates a section with related articles in card layout
// Usage: createAdditionalReading({ articleUrls: ['blog/article1.html', 'article2.html'] })

(function() {
    'use strict';
    
    // Auto-detect if we're in blog directory
    function isInBlogDirectory() {
        return window.location.pathname.includes('/blog/');
    }
    
    function resolveImagePath(image) {
        // If already absolute URL or absolute path, return as-is
        if (image.startsWith('http') || image.startsWith('/')) {
            return image;
        }
        
        // If path already includes assets/, use it as-is (just adjust for blog directory)
        if (image.startsWith('assets/')) {
            return isInBlogDirectory() ? '../' + image : image;
        }
        
        // Otherwise, prepend the asset path
        const assetPath = isInBlogDirectory() ? '../assets' : 'assets';
        return `${assetPath}/images/${image}`;
    }
    
    function resolveUrl(url) {
        // If URL is already absolute or starts with http, return as-is
        if (url.startsWith('http') || url.startsWith('/')) {
            return url;
        }
        
        const inBlog = isInBlogDirectory();
        
        // If URL starts with blog/, it's a blog article
        if (url.startsWith('blog/')) {
            if (inBlog) {
                // We're in blog directory, remove blog/ prefix for relative URL
                return url.replace(/^blog\//, '');
            } else {
                // We're in root, keep blog/ prefix
                return url;
            }
        } else {
            // Root-level article
            if (inBlog) {
                // We're in blog directory, need to go up one level
                return '../' + url;
            } else {
                // We're in root, keep as-is
                return url;
            }
        }
    }
    
    function resolveBlogIndexUrl(blogIndexUrl) {
        if (isInBlogDirectory()) {
            // In blog directory, remove blog/ prefix if present
            return blogIndexUrl.replace(/^blog\//, '');
        }
        return blogIndexUrl;
    }
    
    function getCategoryClass(category) {
        const categoryMap = {
            'Wellness': 'bg-success text-white',
            'Health': 'cat-tag--health',
            'Home Decor': 'cat-tag--home-decor',
            'Home Cleaning': 'cat-tag--home-cleaning'
        };
        return categoryMap[category] || 'bg-success text-white';
    }
    
    function createAdditionalReading(config = {}) {
        const {
            articleUrls = [],
            category = null,
            maxArticles = 2,
            title = 'Additional Reading'
        } = config;
        
        // Check if article registry is loaded
        if (typeof getArticleMetadata === 'undefined') {
            console.error('Article registry not loaded. Please include: article-registry.js');
            return '';
        }
        
        let articles = [];
        
        // If category is specified, get articles by category
        if (category && typeof getAllArticles !== 'undefined') {
            const allArticles = getAllArticles();
            // Get current page URL - handle both root and blog pages
            const pathParts = window.location.pathname.split('/').filter(p => p);
            const currentPageFile = pathParts[pathParts.length - 1] || '';
            const inBlog = isInBlogDirectory();
            const currentPageKey = inBlog ? `blog/${currentPageFile}` : currentPageFile;
            
            // First, get articles matching the category
            articles = Object.keys(allArticles)
                .map(url => {
                    const metadata = allArticles[url];
                    // Skip current page - check both with and without blog/ prefix
                    if (url === currentPageKey || 
                        url === currentPageFile || 
                        url.replace('blog/', '') === currentPageFile ||
                        currentPageKey === url.replace('blog/', '')) {
                        return null;
                    }
                    // Filter by category
                    if (metadata.category === category) {
                        return {
                            url: url,
                            ...metadata,
                            isOnIndex: metadata.isOnIndex || false
                        };
                    }
                    return null;
                })
                .filter(article => article !== null);
            
            // Sort articles: index articles first, then others
            // Randomize articles with the same isOnIndex status for variety
            articles.sort((a, b) => {
                if (a.isOnIndex && !b.isOnIndex) return -1;
                if (!a.isOnIndex && b.isOnIndex) return 1;
                // If both have same isOnIndex status, randomize
                return Math.random() - 0.5;
            });
            
            // If we don't have enough articles in the same category, fill with Wellness articles
            if (articles.length < maxArticles) {
                const wellnessArticles = Object.keys(allArticles)
                    .map(url => {
                        const metadata = allArticles[url];
                        // Skip current page and already selected articles
                        if (url === currentPageKey || 
                            url === currentPageFile || 
                            url.replace('blog/', '') === currentPageFile ||
                            currentPageKey === url.replace('blog/', '') ||
                            articles.some(a => a.url === url)) {
                            return null;
                        }
                        if (metadata.category === 'Wellness') {
                            return {
                                url: url,
                                ...metadata,
                                isOnIndex: metadata.isOnIndex || false
                            };
                        }
                        return null;
                    })
                    .filter(article => article !== null);
                
                // Sort wellness articles: index articles first
                // Randomize articles with the same isOnIndex status for variety
                wellnessArticles.sort((a, b) => {
                    if (a.isOnIndex && !b.isOnIndex) return -1;
                    if (!a.isOnIndex && b.isOnIndex) return 1;
                    // If both have same isOnIndex status, randomize
                    return Math.random() - 0.5;
                });
                
                articles = [...articles, ...wellnessArticles].slice(0, maxArticles);
            } else {
                articles = articles.slice(0, maxArticles);
            }
        }
        
        // If articleUrls are provided, use those instead
        if (articleUrls && articleUrls.length > 0) {
            articles = articleUrls
                .map(url => {
                    const metadata = getArticleMetadata(url);
                    if (!metadata) {
                        console.warn(`No metadata found for article: ${url}`);
                        return null;
                    }
                    return {
                        url: url,
                        ...metadata
                    };
                })
                .filter(article => article !== null)
                .slice(0, maxArticles);
        }
        
        if (articles.length === 0) {
            return '';
        }
        
        // Generate article cards
        const articleCards = articles.map(article => {
            const imagePath = resolveImagePath(article.image);
            const articleUrl = resolveUrl(article.url);
            const category = article.category || 'Wellness';
            const categoryClass = getCategoryClass(category);
            
            return `
                <div class="col">
                    <div class="card h-100 border-0" data-category="${category}">
                        <a href="${articleUrl}">
                            <img src="${imagePath}" class="card-img-top" alt="${article.title}">
                        </a>
                        <div class="cat-tag ${categoryClass}">${category}</div>
                        <div class="card-body">
                            <a href="${articleUrl}" class="text-decoration-none text-dark">
                                <p class="card-text">
                                    ${article.title}
                                </p>
                            </a>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        return `
            <div class="additional-reading-section mt-5 pt-4 border-top">
                <h2 class="mb-4">${title}</h2>
                <div class="row row-cols-1 row-cols-md-2 g-3">
                    ${articleCards}
                </div>
            </div>
        `;
    }
    
    function insertAdditionalReading(targetSelector, config) {
        const target = document.querySelector(targetSelector);
        if (target) {
            target.innerHTML = createAdditionalReading(config);
        }
    }
    
    window.createAdditionalReading = createAdditionalReading;
    window.insertAdditionalReading = insertAdditionalReading;
})();
