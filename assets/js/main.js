// Main JavaScript file for Clean Home Hacks

function ensureChhFonts() {
    if (document.querySelector('link[data-chh-fonts]')) {
        return;
    }
    const gPre = document.createElement('link');
    gPre.rel = 'preconnect';
    gPre.href = 'https://fonts.googleapis.com';
    const gsPre = document.createElement('link');
    gsPre.rel = 'preconnect';
    gsPre.href = 'https://fonts.gstatic.com';
    gsPre.crossOrigin = 'anonymous';
    const fonts = document.createElement('link');
    fonts.rel = 'stylesheet';
    fonts.href =
        'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=Noto+Serif:ital,wght@0,100..900;1,100..900&display=swap';
    fonts.setAttribute('data-chh-fonts', '1');
    document.head.appendChild(gPre);
    document.head.appendChild(gsPre);
    document.head.appendChild(fonts);
}

// Head Component - Insert favicon and stylesheets
function insertHeadElements(pageType = 'root') {
    // Check if head elements already exist to prevent duplicates
    if (document.querySelector('link[rel="icon"]')) {
        return; // Already inserted
    }
    
    // Determine the correct path based on page type
    const assetPath = pageType === 'blog' ? '../assets' : 'assets';
    
    // Create the head elements
    const headElements = `
        <!-- Favicon -->
        <link rel="icon" type="image/x-icon" href="${assetPath}/images/favicon.ico">
        <link rel="icon" type="image/png" sizes="16x16" href="${assetPath}/images/favicon-16x16.png">
        <link rel="icon" type="image/png" sizes="32x32" href="${assetPath}/images/favicon-32x32.png">
        <link rel="apple-touch-icon" sizes="180x180" href="${assetPath}/images/apple-touch-icon.png">
        <link rel="manifest" href="${assetPath}/images/site.webmanifest">

        <!-- Additional Meta Tags -->
        <meta name="theme-color" content="#2d6f66">
        <meta name="msapplication-TileColor" content="#2d6f66">
    `;
    
    // Insert the elements into the head
    document.head.insertAdjacentHTML('beforeend', headElements);

    ensureChhFonts();

    if (!document.querySelector('link[href*="bootstrap-icons"]')) {
        const icons = document.createElement('link');
        icons.rel = 'stylesheet';
        icons.href = 'https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css';
        document.head.appendChild(icons);
    }

    // Load stylesheets with proper loading detection
    loadStylesheets(assetPath);
}

// Load stylesheets and show content when ready
function loadStylesheets(assetPath) {
    let stylesheetsLoaded = 0;
    const totalStylesheets = 2;
    let contentShown = false;
    
    function showContent() {
        if (!contentShown) {
            contentShown = true;
            document.body.style.visibility = 'visible';
            document.body.style.opacity = '1';
        }
    }
    
    function onStylesheetLoad() {
        stylesheetsLoaded++;
        if (stylesheetsLoaded === totalStylesheets) {
            // All stylesheets loaded, show the content
            showContent();
        }
    }
    
    // Fallback: Show content after 2 seconds even if CSS doesn't load
    setTimeout(showContent, 2000);
    
    // Load main stylesheet
    const mainCSS = document.createElement('link');
    mainCSS.rel = 'stylesheet';
    mainCSS.href = `${assetPath}/css/style.css`;
    mainCSS.onload = onStylesheetLoad;
    mainCSS.onerror = onStylesheetLoad; // Show content even if CSS fails
    document.head.appendChild(mainCSS);
    
    // Load Bootstrap CSS
    const bootstrapCSS = document.createElement('link');
    bootstrapCSS.rel = 'stylesheet';
    bootstrapCSS.href = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css';
    bootstrapCSS.integrity = 'sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr';
    bootstrapCSS.crossOrigin = 'anonymous';
    bootstrapCSS.onload = onStylesheetLoad;
    bootstrapCSS.onerror = onStylesheetLoad; // Show content even if CSS fails
    document.head.appendChild(bootstrapCSS);
}

// Navigation Component - Insert navigation HTML
function insertNavigation(pageType = 'root', currentPage = '') {
    // Determine the correct paths based on page type
    const homePath = pageType === 'blog' ? '../index.html' : 'index.html';
    const logoPath = pageType === 'blog' ? '../assets/images/logo.png' : 'assets/images/logo.png';
    const blogPath = pageType === 'blog' ? 'index.html' : 'blog/index.html';
    const qWellness = `?category=${encodeURIComponent('Wellness')}`;
    const qDecor = `?category=${encodeURIComponent('Home Decor')}`;
    const qCleaning = `?category=${encodeURIComponent('Home Cleaning')}`;

    /** Path from site root, e.g. blog/foo.html or bar.html */
    function articleHref(pathFromSiteRoot) {
        if (pageType === 'blog') {
            if (pathFromSiteRoot.startsWith('blog/')) {
                return pathFromSiteRoot.slice(5);
            }
            return '../' + pathFromSiteRoot;
        }
        return pathFromSiteRoot;
    }

    const trending = [
        {
            href: articleHref('11-cheap-habits-cat-owners-with-allergies-say-made-the-biggest-difference.html'),
            title: "'I Literally Tried Everything' — 11 Cheap Habits Cat Owners With Allergies Say Made the Biggest Difference"
        },
        {
            href: articleHref('blog/home-decor-less-than-50.html'),
            title: 'The One Home Decor Trick Designers Swear By — And It Costs Less Than $50'
        },
        {
            href: articleHref('4-products-changed-everything.html'),
            title: 'I Am A Busy Mom Who Hates Cleaning And These 4 Products Changed Everything'
        },
        {
            href: articleHref('5-everyday-changes-helping-cat-owners-with-allergies.html'),
            title: '5 Everyday Changes Helping Cat Owners With Allergies'
        },
        {
            href: articleHref('blog/how-to-make-any-room-feel-luxe.html'),
            title: 'Small Space, Big Style: How to Make Any Room Feel Luxe'
        }
    ];

    const trendingListHtml = trending
        .map(
            (item) => `
                        <li class="site-search-sidebar__trending-item">
                            <a href="${item.href}" class="site-search-sidebar__trending-link">${item.title}</a>
                        </li>`
        )
        .join('');

    const navigationHTML = `
        <header class="site-header">
            <div class="site-header__inner">
                <div class="site-header__left">
                    <details class="site-header__read">
                        <summary class="site-header__read-summary">
                            Read <i class="bi bi-chevron-down site-header__read-chevron" aria-hidden="true"></i>
                        </summary>
                        <ul class="site-header__read-menu" role="list">
                            <li><a href="${blogPath}">All articles</a></li>
                            <li><a href="${blogPath}${qCleaning}">Home Cleaning</a></li>
                            <li><a href="${blogPath}${qWellness}">Wellness</a></li>
                            <li><a href="${blogPath}${qDecor}">Home Decor</a></li>
                        </ul>
                    </details>
                </div>
                <div class="site-header__brand">
                    <a href="${homePath}">
                        <img src="${logoPath}" alt="Clean Home Hacks">
                    </a>
                </div>
                <div class="site-header__right">
                    <button type="button" class="site-header__search-btn" aria-haspopup="dialog" aria-controls="siteSearchPanel" aria-expanded="false" aria-label="Search the blog">
                        <i class="bi bi-search" aria-hidden="true"></i>
                    </button>
                </div>
            </div>
        </header>
        <div class="site-search-panel" id="siteSearchPanel" aria-hidden="true">
            <div class="site-search-panel__backdrop" id="siteSearchBackdrop" tabindex="-1"></div>
            <aside class="site-search-sidebar" role="dialog" aria-modal="true" aria-labelledby="siteSearchSidebarTitle">
                <div class="site-search-sidebar__inner">
                    <div class="site-search-sidebar__head">
                        <h2 id="siteSearchSidebarTitle" class="site-search-sidebar__title">Search the blog</h2>
                        <button type="button" class="site-search-sidebar__close" id="siteSearchCloseBtn" aria-label="Close search">
                            <i class="bi bi-x-lg" aria-hidden="true"></i>
                        </button>
                    </div>
                    <form class="site-search-sidebar__form" id="siteSearchForm" action="#" method="get">
                        <label class="site-search-visually-hidden" for="siteSearchInput">Search blog articles and categories</label>
                        <div class="site-search-sidebar__field">
                            <input type="search" id="siteSearchInput" class="site-search-sidebar__input" name="q" placeholder="Search articles, topics, or categories…" autocomplete="off">
                            <button type="submit" class="site-search-sidebar__submit">Search</button>
                        </div>
                    </form>
                    <div id="siteSearchBrowseWrap">
                        <div id="siteSearchCategoriesBlock" class="site-search-sidebar__categories-wrap">
                            <p class="site-search-sidebar__trending-label">Browse by category</p>
                            <ul class="site-search-sidebar__trending site-search-sidebar__categories" role="list">
                                <li class="site-search-sidebar__trending-item">
                                    <a href="${blogPath}${qCleaning}" class="site-search-sidebar__trending-link site-search-sidebar__trending-link--category">Home Cleaning</a>
                                </li>
                                <li class="site-search-sidebar__trending-item">
                                    <a href="${blogPath}${qWellness}" class="site-search-sidebar__trending-link site-search-sidebar__trending-link--category">Wellness</a>
                                </li>
                                <li class="site-search-sidebar__trending-item">
                                    <a href="${blogPath}${qDecor}" class="site-search-sidebar__trending-link site-search-sidebar__trending-link--category">Home Decor</a>
                                </li>
                            </ul>
                        </div>
                        <div id="siteSearchTrendingBlock">
                            <p class="site-search-sidebar__trending-label">Trending on the blog</p>
                            <ul class="site-search-sidebar__trending" id="siteSearchTrendingList" role="list">
                                ${trendingListHtml}
                            </ul>
                        </div>
                    </div>
                    <div id="siteSearchResultsBlock" class="site-search-sidebar__results-block" hidden>
                        <div id="siteSearchCategoryResultsSection" class="site-search-sidebar__results-section" hidden>
                            <p class="site-search-sidebar__trending-label" id="siteSearchCategoryResultsHeading">Matching categories</p>
                            <ul class="site-search-sidebar__trending site-search-sidebar__results-list" id="siteSearchCategoryResultsList" role="list"></ul>
                        </div>
                        <div id="siteSearchArticleResultsSection" class="site-search-sidebar__results-section" hidden>
                            <p class="site-search-sidebar__trending-label" id="siteSearchResultsHeading">Matching articles</p>
                            <ul class="site-search-sidebar__trending site-search-sidebar__results-list" id="siteSearchResultsList" role="list"></ul>
                        </div>
                        <p id="siteSearchNoResults" class="site-search-sidebar__no-results" hidden>No articles or categories match that search. Try different words.</p>
                    </div>
                </div>
            </aside>
        </div>
    `;

    document.body.insertAdjacentHTML('afterbegin', navigationHTML);
}


// Footer Component - Insert footer HTML
function insertFooter(pageType = 'root') {
    const privacyPath = pageType === 'blog' ? '../privacy-policy.html' : 'privacy-policy.html';
    const termsPath = pageType === 'blog' ? '../terms-of-service.html' : 'terms-of-service.html';
    const blogPath = pageType === 'blog' ? 'index.html' : 'blog/index.html';
    const qWellness = `?category=${encodeURIComponent('Wellness')}`;
    const qDecor = `?category=${encodeURIComponent('Home Decor')}`;
    const qCleaning = `?category=${encodeURIComponent('Home Cleaning')}`;

    const footerHTML = `
        <footer class="site-footer">
            <div class="site-footer__main">
                <div class="container">
                    <div class="row g-4 g-lg-5 site-footer__grid">
                        <div class="col-12 col-md-4 site-footer__col site-footer__col--social">
                            <h2 class="site-footer__heading site-footer__heading--serif">Stay in touch</h2>
                            <p class="site-footer__lede">Tips for a cleaner, calmer home.</p>
                            <div class="site-footer__social">
                                <a href="https://www.instagram.com/" class="site-footer__social-link" target="_blank" rel="noopener noreferrer" aria-label="Clean Home Hacks on Instagram">
                                    <i class="bi bi-instagram" aria-hidden="true"></i>
                                </a>
                                <a href="https://www.facebook.com/" class="site-footer__social-link" target="_blank" rel="noopener noreferrer" aria-label="Clean Home Hacks on Facebook">
                                    <i class="bi bi-facebook" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                        <div class="col-12 col-md-4 site-footer__col site-footer__col--nav">
                            <nav class="site-footer__nav-wrap" aria-label="Footer">
                                <ul class="site-footer__nav" role="list">
                                    <li><a href="${blogPath}">All articles</a></li>
                                    <li><a href="${blogPath}${qCleaning}">Home Cleaning</a></li>
                                    <li><a href="${blogPath}${qWellness}">Wellness</a></li>
                                    <li><a href="${blogPath}${qDecor}">Home Decor</a></li>
                                </ul>
                            </nav>
                        </div>
                        <div class="col-12 col-md-4 site-footer__col site-footer__col--newsletter">
                            <h2 class="site-footer__heading site-footer__newsletter-title">
                                <span class="site-footer__newsletter-title-part">Subscribe to our</span>
                                <span class="site-footer__newsletter-title-accent">newsletter</span>
                            </h2>
                            <form class="site-footer__newsletter" id="siteFooterNewsletter" action="#" method="post" novalidate>
                                <label class="site-footer__visually-hidden" for="siteFooterNewsletterEmail">Email for newsletter</label>
                                <div class="site-footer__newsletter-field">
                                    <input type="email" id="siteFooterNewsletterEmail" name="email" class="site-footer__newsletter-input" placeholder="your@email.com" autocomplete="email" inputmode="email">
                                    <button type="submit" class="site-footer__newsletter-submit" aria-label="Subscribe to newsletter">
                                        <i class="bi bi-arrow-right" aria-hidden="true"></i>
                                    </button>
                                </div>
                                <p class="site-footer__newsletter-disclaimer">
                                    By signing up, you agree to receive emails from Clean Home Hacks. See our
                                    <a href="${termsPath}">Terms of Service</a> and <a href="${privacyPath}">Privacy Policy</a>.
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="site-footer__bar">
                <div class="container">
                    <p class="site-footer__bar-inner">
                        <span class="site-footer__bar-copy">&copy; 2026 Clean Home Hacks. All rights reserved.</span>
                        <span class="site-footer__bar-sep" aria-hidden="true">|</span>
                        <a href="${termsPath}">Terms of Service</a>
                        <span class="site-footer__bar-sep" aria-hidden="true">·</span>
                        <a href="${privacyPath}">Privacy Policy</a>
                    </p>
                </div>
            </div>
        </footer>
    `;

    document.body.insertAdjacentHTML('beforeend', footerHTML);
}

//Quote Component - Reusbale testimonial block
function createQuoteComponent({ testimonial, author}) {
    return `
        
        <div class="quote-card p-3 my-3 border rounded-4">
            <p class="quote-text fs-5 fst-italic m-2 text-left">“${testimonial}”</p>
            <p class="quote-author fw-semibold mb-1" style="text-align: right; margin-right: 40px;">– ${author}</p>
        </div>
    
    `;
}

// Image Component - Reusable image + caption block
function createImageComponent({ src, alt, caption }) {
    // Adjust image path if needed (for blog pages, etc.)
   
    
    return `
      <div class="d-flex flex-column align-items-center my-4">
        <img 
          src="assets/images/${src}" 
          alt="${alt}" 
          class="rounded-2 mb-2 img-fluid"
          style="width: 100%; height: auto;"
        >
        <p class="text-muted text-center small">${caption}</p>
      </div>
    `;
  }


// Load components immediately when script loads (before DOM ready)
(function() {
    // Check if we're in a blog subdirectory
    const isInBlog = window.location.pathname.includes('/blog/');
    const pageType = isInBlog ? 'blog' : 'root';
    
    // Determine current page for active state
    let currentPage = '';
    if (window.location.pathname.includes('/blog/')) {
        currentPage = 'blog';
    } else if (window.location.pathname.includes('quiz.html')) {
        currentPage = 'quiz';
    }
    
    // Fonts even when insertHeadElements bails (e.g. favicon already in HTML)
    ensureChhFonts();

    // Insert head elements immediately
    insertHeadElements(pageType);
    
    // Insert navigation and footer when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function() {
            if (!document.querySelector('header.site-header')) {
                insertNavigation(pageType, currentPage);
            }
            if (!document.querySelector('footer')) {
                insertFooter(pageType);
            }
        });
    } else {
        // DOM already loaded
        if (!document.querySelector('header.site-header')) {
            insertNavigation(pageType, currentPage);
        }
        if (!document.querySelector('footer')) {
            insertFooter(pageType);
        }
    }
})();

// Wait for DOM to be fully loaded for additional functionality
document.addEventListener('DOMContentLoaded', function () {
  // Smooth scrolling for internal links
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Home page category filter
  const filterBar = document.querySelector('.category-filter');
  if (filterBar) {
    const filterButtons = filterBar.querySelectorAll('button[data-filter]');
    const cards = document.querySelectorAll('.row .card[data-category]');

    filterBar.addEventListener('click', (e) => {
      const btn = e.target.closest('button[data-filter]');
      if (!btn) return;

      const filter = btn.getAttribute('data-filter');

      // Active state
      filterButtons.forEach(b => {
        b.classList.toggle('is-active', b === btn);
      });

      // Show/hide cards
      cards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const show = filter === 'all' || cat === filter;
        const col = card.parentElement; // .col wrapper
        if (col) {
          col.style.display = show ? '' : 'none';
        }
      });
    });
  }

  // Header search sidebar — in-page blog article filter (article registry)
  const searchBtn = document.querySelector('.site-header__search-btn');
  const searchPanel = document.getElementById('siteSearchPanel');
  const searchBackdrop = document.getElementById('siteSearchBackdrop');
  const searchForm = document.getElementById('siteSearchForm');
  const searchInput = document.getElementById('siteSearchInput');
  const searchCloseBtn = document.getElementById('siteSearchCloseBtn');
  if (searchBtn && searchPanel && searchForm && searchInput) {
    const browseWrap = document.getElementById('siteSearchBrowseWrap');
    const resultsBlock = document.getElementById('siteSearchResultsBlock');
    const resultsList = document.getElementById('siteSearchResultsList');
    const categoryResultsSection = document.getElementById('siteSearchCategoryResultsSection');
    const categoryResultsList = document.getElementById('siteSearchCategoryResultsList');
    const categoryResultsHeading = document.getElementById('siteSearchCategoryResultsHeading');
    const articleResultsSection = document.getElementById('siteSearchArticleResultsSection');
    const noResultsEl = document.getElementById('siteSearchNoResults');
    const resultsHeading = document.getElementById('siteSearchResultsHeading');

    function chhResolveArticleHref(pathFromSiteRoot) {
      const isInBlog = window.location.pathname.includes('/blog/');
      if (isInBlog) {
        if (pathFromSiteRoot.startsWith('blog/')) {
          return pathFromSiteRoot.slice(5);
        }
        return '../' + pathFromSiteRoot;
      }
      return pathFromSiteRoot;
    }

    const chhRegistryLoadCallbacks = [];
    function chhDrainRegistryCallbacks() {
      const cbs = chhRegistryLoadCallbacks.splice(0);
      cbs.forEach(function (cb) {
        cb();
      });
    }
    function loadArticleRegistryScript(done) {
      if (typeof getAllArticles === 'function') {
        done();
        return;
      }
      chhRegistryLoadCallbacks.push(done);
      const existing = document.querySelector('script[data-chh-article-registry]');
      if (existing && existing.getAttribute('data-chh-registry-loaded')) {
        chhDrainRegistryCallbacks();
        return;
      }
      if (existing) {
        return;
      }
      const isInBlog = window.location.pathname.includes('/blog/');
      const assetPath = isInBlog ? '../assets' : 'assets';
      const s = document.createElement('script');
      s.src = assetPath + '/js/components/article/article-registry.js';
      s.setAttribute('data-chh-article-registry', '1');
      s.onload = function () {
        s.setAttribute('data-chh-registry-loaded', '1');
        chhDrainRegistryCallbacks();
      };
      s.onerror = function () {
        s.setAttribute('data-chh-registry-loaded', '1');
        chhDrainRegistryCallbacks();
      };
      document.head.appendChild(s);
    }

    let searchIndexCache = null;
    function buildSearchIndex() {
      if (searchIndexCache) return searchIndexCache;
      if (typeof getAllArticles !== 'function') {
        searchIndexCache = [];
        return searchIndexCache;
      }
      const registry = getAllArticles();
      const out = [];
      Object.keys(registry).forEach(function (path) {
        const meta = registry[path];
        const title = (meta && meta.title) || '';
        const cat = (meta && meta.category) || '';
        const href = chhResolveArticleHref(path);
        const slugWords = path
          .replace(/^blog\//, '')
          .replace(/\.html$/, '')
          .replace(/[-_/]/g, ' ');
        const haystack = (title + ' ' + cat + ' ' + slugWords)
          .toLowerCase()
          .replace(/['\u2018\u2019]/g, '');
        out.push({ href: href, title: title, haystack: haystack });
      });
      searchIndexCache = out;
      return out;
    }

    function normalizeQuery(q) {
      return q
        .toLowerCase()
        .replace(/['\u2018\u2019]/g, '')
        .replace(/[^\w\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    }

    function tokenize(q) {
      return normalizeQuery(q)
        .split(/\s+/)
        .filter(function (w) {
          return w.length > 0;
        });
    }

    function blogIndexHrefForSearch() {
      const isInBlog = window.location.pathname.includes('/blog/');
      return isInBlog ? 'index.html' : 'blog/index.html';
    }

    function categorySearchEntries() {
      const base = blogIndexHrefForSearch();
      return [
        {
          name: 'Home Cleaning',
          haystack:
            'home cleaning clean housekeeping house laundry kitchen vacuum dust wipe mop routine products busy mom'
        },
        {
          name: 'Wellness',
          haystack:
            'wellness home health allergy allergies breathing sleep senior dust air purifier cat dog pet sinus respiratory'
        },
        {
          name: 'Home Decor',
          haystack:
            'home decor decor design interior styling room luxe furniture lighting layout small space designers'
        }
      ].map(function (c) {
        return {
          title: c.name,
          href: base + '?category=' + encodeURIComponent(c.name),
          haystack: c.haystack.toLowerCase()
        };
      });
    }

    function matchCategories(tokens) {
      if (!tokens.length) return [];
      const out = [];
      categorySearchEntries().forEach(function (entry) {
        const ok = tokens.every(function (t) {
          return entry.haystack.indexOf(t) !== -1;
        });
        if (ok) out.push(entry);
      });
      return out;
    }

    function runBlogSearch(query) {
      const tokens = tokenize(query);
      const index = buildSearchIndex();
      if (!tokens.length) {
        return null;
      }
      const scored = [];
      index.forEach(function (entry) {
        const ok = tokens.every(function (t) {
          return entry.haystack.indexOf(t) !== -1;
        });
        if (!ok) return;
        let score = 0;
        const titleLower = entry.title.toLowerCase();
        tokens.forEach(function (t) {
          if (titleLower.indexOf(t) !== -1) score += 5;
          else score += 1;
        });
        scored.push({ entry: entry, score: score });
      });
      scored.sort(function (a, b) {
        if (b.score !== a.score) return b.score - a.score;
        return a.entry.title.localeCompare(b.entry.title);
      });
      return scored.map(function (s) {
        return s.entry;
      });
    }

    function renderCategoryResultList(matches) {
      if (!categoryResultsList) return;
      categoryResultsList.innerHTML = '';
      matches.forEach(function (entry) {
        const li = document.createElement('li');
        li.className = 'site-search-sidebar__trending-item';
        const a = document.createElement('a');
        a.href = entry.href;
        a.className = 'site-search-sidebar__trending-link site-search-sidebar__trending-link--category';
        a.textContent = entry.title;
        li.appendChild(a);
        categoryResultsList.appendChild(li);
      });
      categoryResultsList.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeSearchSidebar);
      });
    }

    function renderArticleResultList(matches) {
      if (!resultsList) return;
      resultsList.innerHTML = '';
      matches.forEach(function (entry) {
        const li = document.createElement('li');
        li.className = 'site-search-sidebar__trending-item';
        const a = document.createElement('a');
        a.href = entry.href;
        a.className = 'site-search-sidebar__trending-link';
        a.textContent = entry.title;
        li.appendChild(a);
        resultsList.appendChild(li);
      });
      resultsList.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', closeSearchSidebar);
      });
    }

    function updateSearchUI() {
      const q = searchInput.value.trim();
      if (!resultsBlock || !browseWrap) return;

      if (!q) {
        browseWrap.hidden = false;
        resultsBlock.hidden = true;
        if (noResultsEl) noResultsEl.hidden = true;
        if (categoryResultsSection) categoryResultsSection.hidden = true;
        if (articleResultsSection) articleResultsSection.hidden = true;
        return;
      }

      const tokens = tokenize(q);
      const catMatches = matchCategories(tokens);
      const articleMatches = runBlogSearch(q) || [];

      browseWrap.hidden = true;
      resultsBlock.hidden = false;

      const hasCats = catMatches.length > 0;
      const hasArts = articleMatches.length > 0;

      if (!hasCats && !hasArts) {
        if (categoryResultsList) categoryResultsList.innerHTML = '';
        if (resultsList) resultsList.innerHTML = '';
        if (categoryResultsSection) categoryResultsSection.hidden = true;
        if (articleResultsSection) articleResultsSection.hidden = true;
        if (noResultsEl) noResultsEl.hidden = false;
        if (resultsHeading) resultsHeading.textContent = 'Matching articles';
        if (categoryResultsHeading) categoryResultsHeading.textContent = 'Matching categories';
        return;
      }

      if (noResultsEl) noResultsEl.hidden = true;

      if (hasCats) {
        if (categoryResultsHeading) {
          categoryResultsHeading.textContent =
            catMatches.length === 1
              ? 'Matching category'
              : 'Matching categories (' + catMatches.length + ')';
        }
        renderCategoryResultList(catMatches);
        if (categoryResultsSection) categoryResultsSection.hidden = false;
      } else {
        if (categoryResultsList) categoryResultsList.innerHTML = '';
        if (categoryResultsSection) categoryResultsSection.hidden = true;
      }

      if (hasArts) {
        if (resultsHeading) {
          resultsHeading.textContent =
            articleMatches.length === 1
              ? 'Matching article'
              : 'Matching articles (' + articleMatches.length + ')';
        }
        renderArticleResultList(articleMatches);
        if (articleResultsSection) articleResultsSection.hidden = false;
      } else {
        if (resultsList) resultsList.innerHTML = '';
        if (articleResultsSection) articleResultsSection.hidden = true;
      }
    }

    let debounceTimer = null;
    function scheduleSearch() {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(updateSearchUI, 120);
    }

    function openSearchSidebar() {
      searchPanel.classList.add('is-open');
      searchPanel.setAttribute('aria-hidden', 'false');
      searchBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      loadArticleRegistryScript(function () {
        buildSearchIndex();
        setTimeout(function () {
          searchInput.focus();
        }, 50);
      });
    }

    function closeSearchSidebar() {
      searchPanel.classList.remove('is-open');
      searchPanel.setAttribute('aria-hidden', 'true');
      searchBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      searchInput.value = '';
      if (browseWrap) browseWrap.hidden = false;
      if (resultsBlock) resultsBlock.hidden = true;
      if (resultsList) resultsList.innerHTML = '';
      if (categoryResultsList) categoryResultsList.innerHTML = '';
      if (categoryResultsSection) categoryResultsSection.hidden = true;
      if (articleResultsSection) articleResultsSection.hidden = true;
      if (noResultsEl) noResultsEl.hidden = true;
      clearTimeout(debounceTimer);
    }

    searchBtn.addEventListener('click', function () {
      if (searchPanel.classList.contains('is-open')) {
        closeSearchSidebar();
      } else {
        openSearchSidebar();
      }
    });
    if (searchBackdrop) {
      searchBackdrop.addEventListener('click', closeSearchSidebar);
    }
    if (searchCloseBtn) {
      searchCloseBtn.addEventListener('click', closeSearchSidebar);
    }
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && searchPanel.classList.contains('is-open')) {
        closeSearchSidebar();
      }
    });

    loadArticleRegistryScript(function () {
      buildSearchIndex();
    });

    searchForm.addEventListener('submit', function (e) {
      e.preventDefault();
      updateSearchUI();
    });

    searchInput.addEventListener('input', scheduleSearch);

    searchPanel.querySelectorAll('.site-search-sidebar__trending-link').forEach(function (link) {
      link.addEventListener('click', closeSearchSidebar);
    });
  }


  // Blog index: filter from ?category= in URL (header Read menu)
  const categoryParam = new URLSearchParams(window.location.search).get('category');
  const pathname = window.location.pathname;
  const isBlogIndexListing =
    /\/blog\/(index\.html)?$/.test(pathname) || /\/blog\/?$/.test(pathname);

  if (categoryParam && isBlogIndexListing) {
    const blogSections = document.querySelectorAll('.blog-category-section[data-blog-category]');
    if (blogSections.length) {
      document.body.classList.add('blog-category-filter-active');
      let visibleCount = 0;
      blogSections.forEach(function (section) {
        const match = section.getAttribute('data-blog-category') === categoryParam;
        section.hidden = !match;
        if (match) visibleCount++;
      });
      const heroH1 = document.querySelector('.hero-section h1');
      if (heroH1) {
        heroH1.textContent = categoryParam;
        const heroCatClass = {
          Wellness: 'hero-section__category-title--wellness',
          'Home Cleaning': 'hero-section__category-title--home-cleaning',
          'Home Decor': 'hero-section__category-title--home-decor'
        }[categoryParam];
        if (heroCatClass) {
          heroH1.classList.add('hero-section__category-title', heroCatClass);
        }
      }
      const heroP = document.querySelector('.hero-section .hero-copy p');
      if (heroP) heroP.hidden = true;
      document.title = categoryParam + ' | Clean Home Hacks';
      const emptyEl = document.getElementById('blog-category-empty-state');
      if (emptyEl) emptyEl.hidden = visibleCount > 0;

      // Category hero: title + testimonial stacked (left) | decorative image (right)
      const CATEGORY_HERO_IMG = {
        Wellness: {
          src: '../assets/images/person-sleeping-on-couch.jpg',
          alt: 'Person relaxing at home on the couch'
        },
        'Home Cleaning': {
          src: '../assets/images/best-air-purifier.png',
          alt: 'Air purifier in a bright living room'
        },
        'Home Decor': {
          src: '../assets/images/adv_luxe_mainimg.png',
          alt: 'Stylish small room interior'
        }
      };

      const visibleSection = document.querySelector(
        '.blog-category-section[data-blog-category]:not([hidden])'
      );
      const testimonial =
        visibleSection && visibleSection.querySelector('.blog-category-testimonial');
      const heroSection = document.querySelector('.hero-section--home');
      const heroRow = heroSection && heroSection.querySelector('.row');
      const heroCopy = heroRow && heroRow.querySelector('.hero-copy');

      if (testimonial && heroRow && heroCopy && visibleCount > 0) {
        const imgMeta = CATEGORY_HERO_IMG[categoryParam] || {
          src: '../assets/images/chh-hero.jpg',
          alt: 'Bright living room being tidied'
        };

        const visualCol = document.createElement('div');
        visualCol.className = 'col-12 col-lg-6 hero-category-visual';
        const imgEl = document.createElement('img');
        imgEl.src = imgMeta.src;
        imgEl.alt = imgMeta.alt;
        imgEl.className = 'img-fluid rounded-4 hero-category-visual__img';
        imgEl.decoding = 'async';
        visualCol.appendChild(imgEl);

        heroCopy.classList.remove('col-md-6', 'col-lg-3', 'col-lg-6', 'col-12');

        const leftCol = document.createElement('div');
        leftCol.className = 'col-12 col-lg-6 hero-category-left';
        leftCol.appendChild(heroCopy);
        if (testimonial.querySelector('.blog-category-testimonial__quote')) {
          leftCol.appendChild(testimonial);
        }

        while (heroRow.firstChild) {
          heroRow.removeChild(heroRow.firstChild);
        }
        heroRow.appendChild(leftCol);
        heroRow.appendChild(visualCol);

        heroSection.classList.add('hero-section--home--category-split');

        const intro = visibleSection.querySelector('.blog-category-section__intro');
        if (intro) intro.hidden = true;
      }
    } else {
      document.querySelectorAll('.row .card[data-category]').forEach(function (card) {
        const col = card.closest('.col');
        if (!col) return;
        if (card.getAttribute('data-category') !== categoryParam) {
          col.style.display = 'none';
        }
      });
    }
  } else if (categoryParam && /\/blog\//.test(pathname)) {
    document.querySelectorAll('.row .card[data-category]').forEach(function (card) {
      const col = card.closest('.col');
      if (!col) return;
      if (card.getAttribute('data-category') !== categoryParam) {
        col.style.display = 'none';
      }
    });
  }

  // Article pages (blog + root): inject comments under "Additional Reading" when that slot exists
  (function injectCommentsUnderAdditionalReading() {
      const TARGET_ID = 'additional-reading-section';
      const INSERTED_ATTR = 'data-chh-comments-inserted';

      function hashString(str) {
        // Deterministic, small hash for stable placeholder selection
        let hash = 0;
        for (let i = 0; i < str.length; i++) {
          hash = (hash * 31 + str.charCodeAt(i)) | 0;
        }
        return Math.abs(hash);
      }

      function pickUnique(arr, seed, count) {
        if (!arr || !arr.length) return [];
        const n = Math.min(count, arr.length);
        const start = seed % arr.length;
        const out = [];
        for (let i = 0; i < n; i++) {
          out.push(arr[(start + i) % arr.length]);
        }
        return out;
      }

      const avatars = [
        'https://i.pravatar.cc/96?img=12',
        'https://i.pravatar.cc/96?img=18',
        'https://i.pravatar.cc/96?img=25',
        'https://i.pravatar.cc/96?img=31',
        'https://i.pravatar.cc/96?img=38',
        'https://i.pravatar.cc/96?img=44',
        'https://i.pravatar.cc/96?img=52',
        'https://i.pravatar.cc/96?img=15',
        'https://i.pravatar.cc/96?img=21',
        'https://i.pravatar.cc/96?img=33',
        'https://i.pravatar.cc/96?img=41',
        'https://i.pravatar.cc/96?img=56'
      ];

      function inferCommentTopicKey(pathname) {
        const p = (pathname || '').toLowerCase();
        if (
          /decor|interior|design|luxe|room|studio|apartment|home-decor|adv_/.test(p) ||
          /how-to-make-any-room|3-secrets-interior|home-decor/.test(p)
        ) {
          return 'decor';
        }
        if (
          /clean|vacuum|living-room|minutes|spray|purifier|mattress|bedding|dust-mite|mite|laundry|kitchen|wipe|mop/.test(p) ||
          /4-products|11-minutes|pacagen-home-mist|pacagen|zyrtec/.test(p)
        ) {
          return 'cleaning';
        }
        if (/dog|pup|canine/.test(p)) return 'dogs';
        if (/cat|fel|kitten|feline|egg-powder|liveclear/.test(p)) return 'cats';
        if (/dust|allerg|hay|pollen|sinus|cough|fatigue|mattress|bedding|air/.test(p)) return 'wellness';
        return 'general';
      }

      function threadPoolsForTopic(topicKey) {
        const editorReply = {
          author: 'CleanHomeHacks',
          meta: '1 day ago · Editor',
          body: 'Totally hear you—small upgrades stack faster than “perfect routines.” Pick one habit and repeat it for a week.'
        };

        const pools = {
          decor: [
            {
              author: 'nina.d',
              meta: '3 days ago · Brooklyn',
              body:
                'I’m bookmarking the lighting + layout tips—our tiny living room finally feels intentional instead of “random furniture.”',
              replies: [editorReply]
            },
            {
              author: 'rico.m',
              meta: '1 week ago · SF',
              body:
                'The “one focal point” idea saved me. I stopped buying decor I liked individually and actually planned the wall first.',
              replies: []
            },
            {
              author: 'samira.p',
              meta: '6 days ago · Miami',
              body:
                'Question: for renters, what’s the best low-commitment swap that still reads “designed”? Peel-and-stick or textiles?',
              replies: [
                {
                  author: 'leah.v',
                  meta: '5 days ago · Reader',
                  body: 'Textiles first—rug + curtains change the vibe fast. Then peel-and-stick if you still want more punch.'
                }
              ]
            },
            {
              author: 'chris.l',
              meta: '10 days ago · Seattle',
              body:
                'I tried the “less than $50” mindset and stopped impulse-buying decor. My space looks calmer with fewer, better pieces.',
              replies: []
            },
            {
              author: 'ivy.q',
              meta: '2 weeks ago · Austin',
              body:
                'This helped me stop chasing trends. I picked a palette and suddenly shopping got way easier.',
              replies: []
            },
            {
              author: 'noah.t',
              meta: '12 days ago · Denver',
              body:
                'I’m a maximalist at heart but my apartment was chaos. The “one hero moment per room” rule finally clicked.',
              replies: []
            }
          ],
          cleaning: [
            {
              author: 'mel_ cleans',
              meta: '2 days ago · Ohio',
              body:
                'The “reset, not deep clean” framing is what I needed. I can keep surfaces sane even when I’m slammed at work.',
              replies: [editorReply]
            },
            {
              author: 'andre.g',
              meta: '5 days ago · NJ',
              body:
                'Air purifier + weekly bedding wash was the combo that actually moved the needle for dust in our bedroom.',
              replies: []
            },
            {
              author: 'patty_w',
              meta: '1 week ago · GA',
              body:
                'I started doing a 10-minute nightly tidy instead of marathon weekends. My stress level dropped a lot.',
              replies: []
            },
            {
              author: 'luis.r',
              meta: '9 days ago · TX',
              body:
                'Does anyone else get overwhelmed by “clean the whole house”? I like the idea of one zone per day.',
              replies: [
                {
                  author: 'dana.k',
                  meta: '8 days ago · Reader',
                  body: 'Yes—zone cleaning is the only way I stay consistent with kids + pets.'
                }
              ]
            },
            {
              author: 'helen.j',
              meta: '11 days ago · IL',
              body:
                'Vacuuming slower (actually overlapping passes) sounds silly but it helped more than vacuuming twice as often.',
              replies: []
            },
            {
              author: 'marcus.t',
              meta: '13 days ago · FL',
              body:
                'Kitchen reset: I wipe counters + load dishwasher every night. Mornings feel less chaotic.',
              replies: []
            }
          ],
          cats: [
            {
              author: 'catdad_mike',
              meta: '3 days ago · WA',
              body:
                'Fel d 1 finally made sense to me—why wiping surfaces helped even when I couldn’t see “dander.”',
              replies: [editorReply]
            },
            {
              author: 'priya.k',
              meta: '6 days ago · TX',
              body:
                'We’re trying the “brush the cat + wash hands” habit before couch time. Small, but it reduced evening sneezes.',
              replies: []
            },
            {
              author: 'zoey.b',
              meta: '1 week ago · OR',
              body:
                'I’m allergic and I still wanted the cat on the bed sometimes. Dedicated throw blanket + weekly wash helped.',
              replies: []
            },
            {
              author: 'eli.n',
              meta: '8 days ago · NY',
              body:
                'Has anyone tried limiting the cat from the bedroom vs keeping the door open? Tradeoffs?',
              replies: [
                {
                  author: 'sam_c',
                  meta: '7 days ago · Reader',
                  body: 'Bedroom boundary was the biggest win for sleep—but we compensated with extra playtime elsewhere.'
                }
              ]
            },
            {
              author: 'hana.m',
              meta: '12 days ago · CA',
              body:
                'I didn’t realize grooming spreads allergens. Changing where we brush the cat helped a ton.',
              replies: []
            },
            {
              author: 'oliver.p',
              meta: '14 days ago · MA',
              body:
                'The litter box location tip was underrated for us—less tracked dust near the couch.',
              replies: []
            }
          ],
          dogs: [
            {
              author: 'walkswithjax',
              meta: '4 days ago · CO',
              body:
                'Dog allergy talk is usually vague—this helped me understand saliva vs dander and what actually gets stirred up at home.',
              replies: [editorReply]
            },
            {
              author: 'mia.s',
              meta: '9 days ago · AZ',
              body:
                'We added a “paws + face wipe” routine after walks. Sounds extra, but it cut down on itchy eyes.',
              replies: []
            },
            {
              author: 'greg.h',
              meta: '11 days ago · MN',
              body:
                'Bathing schedule is tricky—too often dries skin, too rarely leaves allergens. I’m still experimenting.',
              replies: []
            },
            {
              author: 'tara.l',
              meta: '2 weeks ago · WI',
              body:
                'HEPA in the main hangout room + keeping the dog off one chair made a bigger difference than I expected.',
              replies: []
            }
          ],
          wellness: [
            {
              author: 'jordan.k',
              meta: '5 days ago · Seattle',
              body:
                'The “why symptoms spike at night” part hit home. We changed pillow encasements + airflow and mornings feel clearer.',
              replies: [editorReply]
            },
            {
              author: 'maria_c',
              meta: '2 days ago · Chicago',
              body:
                'I finally stopped blaming “random colds.” Tracking symptoms against cleaning days made patterns obvious.',
              replies: []
            },
            {
              author: 'aline.s',
              meta: '1 week ago · Austin',
              body:
                'Humidity + dust is my villain combo. I’m testing lower humidity at night—early signs are promising.',
              replies: []
            },
            {
              author: 'kevinm',
              meta: '2 weeks ago · New York',
              body:
                'This is the first article that didn’t shame me for not being a “perfect” cleaner. Practical beats ideal.',
              replies: []
            },
            {
              author: 'yasmin.f',
              meta: '10 days ago · NC',
              body:
                'Cough vs post-nasal drip vs asthma is confusing. I’m bringing this to my next appointment as talking points.',
              replies: []
            },
            {
              author: 'ben.r',
              meta: '13 days ago · UT',
              body:
                'I liked the plain-language breakdown. It helped me prioritize: bedroom first, then living room.',
              replies: []
            }
          ],
          general: [
            {
              author: 'maria_c',
              meta: '2 days ago · Chicago',
              body:
                'I appreciate how realistic this is. I picked two ideas from the article and actually kept them past week one.',
              replies: [editorReply]
            },
            {
              author: 'jordan.k',
              meta: '5 days ago · Seattle',
              body:
                'Question: what’s the best “first domino” if you can only change one thing this weekend?',
              replies: [
                {
                  author: 'tanya_r',
                  meta: '4 days ago · Reader',
                  body: 'For us it was bedding + pillow covers. Fast win, noticeable mornings.'
                }
              ]
            },
            {
              author: 'aline.s',
              meta: '1 week ago · Austin',
              body:
                'Shared this with my partner—finally a cleaning/advice article that doesn’t feel like guilt-tripping.',
              replies: []
            },
            {
              author: 'kevinm',
              meta: '2 weeks ago · New York',
              body:
                'I bookmarked this for later, then ended up doing one tip the same day. That’s rare for me.',
              replies: []
            },
            {
              author: 'nina.d',
              meta: '9 days ago · Brooklyn',
              body:
                'Love the “explain why, then what to do” structure. Makes it easier to remember the takeaway.',
              replies: []
            },
            {
              author: 'rico.m',
              meta: '11 days ago · SF',
              body:
                'Would love a printable checklist version—but even without it, this was actionable.',
              replies: []
            }
          ]
        };

        return pools[topicKey] || pools.general;
      }

      function renderCommentThread(thread, idx, seed, topicKey) {
        const avatarUrl = avatars[(seed + idx) % avatars.length];
        const stableId = String(hashString(`${topicKey}|${thread.author || ''}|${thread.body || ''}`));
        const threadId = `${topicKey}-${stableId}`;
        const baseLikes = 3 + ((seed + idx) % 19);
        const replyHtml = (thread.replies || [])
          .map(function (reply, rIdx) {
            const replyAvatar = avatars[(seed + idx + rIdx + 2) % avatars.length];
            return `
              <div class="chh-comment chh-comment--reply">
                <img class="chh-comment__avatar" src="${replyAvatar}" alt="" width="36" height="36" loading="lazy" decoding="async">
                <div class="chh-comment__content">
                  <div class="chh-comment__head">
                    <span class="chh-comment__author">${reply.author}</span>
                    <span class="chh-comment__meta">${reply.meta}</span>
                  </div>
                  <p class="chh-comment__text">${reply.body}</p>
                </div>
              </div>
            `;
          })
          .join('');

        return `
          <div class="chh-comment-thread">
            <div class="chh-comment">
              <img class="chh-comment__avatar" src="${avatarUrl}" alt="" width="40" height="40" loading="lazy" decoding="async">
              <div class="chh-comment__content">
                <div class="chh-comment__head">
                  <span class="chh-comment__author">${thread.author}</span>
                  <span class="chh-comment__meta">${thread.meta}</span>
                </div>
                <p class="chh-comment__text">${thread.body}</p>
                <div class="chh-comment__actions">
                  <button type="button" class="chh-comment__btn" disabled>Reply</button>
                  <button
                    type="button"
                    class="chh-comment__btn chh-comment__btn--like"
                    data-like-id="${threadId}"
                    data-like-base="${baseLikes}"
                    aria-pressed="false"
                  >
                    Like <span class="chh-comment__like-count" aria-label="Likes">${baseLikes}</span>
                  </button>
                </div>
              </div>
            </div>
            ${replyHtml ? `<div class="chh-comment-replies">${replyHtml}</div>` : ''}
          </div>
        `;
      }

      function renderSection(seed) {
        const topicKey = inferCommentTopicKey(window.location.pathname);
        const pool = threadPoolsForTopic(topicKey);
        const chosen = pickUnique(pool, seed, 3);
        const list = chosen
          .map(function (t, idx) {
            return renderCommentThread(t, idx, seed, topicKey);
          })
          .join('');

        return `
          <section class="chh-comments" aria-label="Comments">
            <header class="chh-comments__head">
              <h2 class="chh-comments__title">Comments</h2>
            </header>

            <form class="chh-comments__composer" aria-label="Add a comment">
              <div class="chh-comments__composer-profile">
                <div class="chh-comments__avatar-picker">
                  <input type="file" id="chhCommentAvatar" class="chh-comments__input-file" accept="image/jpeg,image/png,image/webp,image/gif" />
                  <label for="chhCommentAvatar" class="chh-comments__avatar-preview-btn">
                    <span class="chh-comments__avatar-preview-wrap" aria-hidden="true">
                      <img id="chhCommentAvatarPreview" class="chh-comments__avatar-preview-img" width="48" height="48" alt="" hidden />
                      <span id="chhCommentAvatarPlaceholder" class="chh-comments__avatar-placeholder">+</span>
                    </span>
                    <span class="chh-comments__avatar-hint">Photo</span>
                  </label>
                  <button type="button" id="chhCommentAvatarClear" class="chh-comments__avatar-clear" hidden>Remove</button>
                </div>
                <div class="chh-comments__name-field">
                  <label class="chh-comments__label" for="chhCommentName">Display name</label>
                  <input type="text" id="chhCommentName" class="chh-comments__input chh-comments__input--name" maxlength="60" placeholder="e.g. Jordan K." autocomplete="name" required />
                </div>
              </div>
              <label class="chh-comments__label" for="chhCommentInput">Your comment</label>
              <textarea id="chhCommentInput" class="chh-comments__input" rows="3" placeholder="Write a comment..." maxlength="800" required></textarea>
              <div class="chh-comments__composer-actions">
                <button type="submit" class="chh-comments__submit">Post</button>
              </div>
            </form>

            <div class="chh-comments__list">
              ${list}
            </div>
          </section>
        `;
      }

      const maxTries = 30;

      function tryInsert(attempt) {
        const target = document.getElementById(TARGET_ID);
        if (!target) return;
        if (target.getAttribute(INSERTED_ATTR) === '1') return;

        // Wait until Additional Reading has actually rendered (many pages populate this async)
        const hasReading = String(target.innerHTML || '').trim().length > 0;
        if (!hasReading && attempt < maxTries) {
          return;
        }

        const seed = hashString(window.location.pathname);
        target.insertAdjacentHTML('afterend', renderSection(seed));
        wireLikeButtons(seed);
        wireCommentComposer(seed);
        target.setAttribute(INSERTED_ATTR, '1');
      }

      function wireLikeButtons(seed) {
        const scope = document.querySelector('.chh-comments');
        if (!scope) return;

        const storageKey = `chh:likes:${window.location.pathname}`;
        let saved = {};
        try {
          saved = JSON.parse(localStorage.getItem(storageKey) || '{}') || {};
        } catch (e) {
          saved = {};
        }

        function persist() {
          try {
            localStorage.setItem(storageKey, JSON.stringify(saved));
          } catch (e) {
            // ignore storage failures
          }
        }

        function getCount(btn) {
          const base = Number(btn.getAttribute('data-like-base') || '0');
          const id = btn.getAttribute('data-like-id') || '';
          const delta = Number(saved[id] || 0);
          return base + delta;
        }

        scope.querySelectorAll('.chh-comment__btn--like').forEach(function (btn) {
          const id = btn.getAttribute('data-like-id') || '';
          const liked = saved[`${id}:liked`] === true;
          btn.setAttribute('aria-pressed', liked ? 'true' : 'false');
          btn.classList.toggle('is-liked', liked);

          const countEl = btn.querySelector('.chh-comment__like-count');
          if (countEl) countEl.textContent = String(getCount(btn));

          btn.addEventListener('click', function () {
            const currentlyLiked = btn.getAttribute('aria-pressed') === 'true';
            const nextLiked = !currentlyLiked;
            btn.setAttribute('aria-pressed', nextLiked ? 'true' : 'false');
            btn.classList.toggle('is-liked', nextLiked);

            // Toggle-like: +1 on like, -1 on unlike (floor at 0 delta)
            const deltaKey = id;
            const likedKey = `${id}:liked`;

            const curDelta = Number(saved[deltaKey] || 0);
            const nextDelta = nextLiked ? curDelta + 1 : Math.max(0, curDelta - 1);
            saved[deltaKey] = nextDelta;
            saved[likedKey] = nextLiked;
            persist();

            const countEl2 = btn.querySelector('.chh-comment__like-count');
            if (countEl2) countEl2.textContent = String(getCount(btn));
          });
        });
      }

      function wireCommentComposer(seed) {
        const scope = document.querySelector('.chh-comments');
        if (!scope) return;

        const storageKey = `chh:comments:${window.location.pathname}`;
        const profileKey = 'chh:comment-profile';
        const MAX_AVATAR_BYTES = 180000;
        let savedComments = [];
        try {
          savedComments = JSON.parse(localStorage.getItem(storageKey) || '[]') || [];
        } catch (e) {
          savedComments = [];
        }

        function persist() {
          try {
            localStorage.setItem(storageKey, JSON.stringify(savedComments));
          } catch (e) {
            // ignore storage failures
          }
        }

        function persistProfile(profile) {
          try {
            localStorage.setItem(profileKey, JSON.stringify(profile));
          } catch (e) {
            // ignore
          }
        }

        function loadProfile() {
          try {
            return JSON.parse(localStorage.getItem(profileKey) || 'null') || null;
          } catch (e) {
            return null;
          }
        }

        function escapeHtml(s) {
          return String(s)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\"/g, '&quot;')
            .replace(/'/g, '&#39;');
        }

        function avatarSrcAttr(url) {
          const s = String(url || '');
          if (/^data:image\/(jpeg|png|webp|gif);base64,/i.test(s) && s.length < 600000) {
            return s.replace(/"/g, '&quot;');
          }
          if (/^https:\/\//i.test(s)) return escapeHtml(s);
          return escapeHtml(s);
        }

        function formatTime(ts) {
          try {
            const d = new Date(ts);
            const now = new Date();
            const diffMs = Math.max(0, now - d);
            const mins = Math.floor(diffMs / 60000);
            if (mins < 1) return 'just now';
            if (mins < 60) return `${mins} min ago`;
            const hours = Math.floor(mins / 60);
            if (hours < 24) return `${hours} hr${hours === 1 ? '' : 's'} ago`;
            const days = Math.floor(hours / 24);
            return `${days} day${days === 1 ? '' : 's'} ago`;
          } catch (e) {
            return 'just now';
          }
        }

        function avatarForSavedComment(c, idx) {
          const custom = c && c.avatarUrl && String(c.avatarUrl).indexOf('data:') === 0;
          if (custom) return c.avatarUrl;
          return avatars[(seed + 10 + idx + hashString(String(c.author || ''))) % avatars.length];
        }

        function renderSavedComment(c, idx) {
          const avatarUrl = avatarForSavedComment(c, idx);
          const baseLikes = 0;
          const threadId = `u-${c.ts || 0}-${idx}`;
          return `
            <div class="chh-comment-thread chh-comment-thread--user">
              <div class="chh-comment">
                <img class="chh-comment__avatar" src="${avatarSrcAttr(avatarUrl)}" alt="" width="40" height="40" loading="lazy" decoding="async">
                <div class="chh-comment__content">
                  <div class="chh-comment__head">
                    <span class="chh-comment__author">${escapeHtml(c.author || 'Guest')}</span>
                    <span class="chh-comment__meta">${escapeHtml(formatTime(c.ts))} · You</span>
                  </div>
                  <p class="chh-comment__text">${escapeHtml(c.body || '')}</p>
                  <div class="chh-comment__actions">
                    <button type="button" class="chh-comment__btn" disabled>Reply</button>
                    <button
                      type="button"
                      class="chh-comment__btn chh-comment__btn--like"
                      data-like-id="${threadId}"
                      data-like-base="${baseLikes}"
                      aria-pressed="false"
                    >
                      Like <span class="chh-comment__like-count" aria-label="Likes">${baseLikes}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          `;
        }

        function injectSavedComments() {
          const list = scope.querySelector('.chh-comments__list');
          if (!list) return;
          // newest first
          const sorted = savedComments.slice().sort((a, b) => (b.ts || 0) - (a.ts || 0));
          const html = sorted.map(function (c, idx) {
            return renderSavedComment(c, idx);
          }).join('');
          if (!html) return;
          list.insertAdjacentHTML('afterbegin', html);
          // re-wire likes now that we added new like buttons
          wireLikeButtons(seed);
        }

        injectSavedComments();

        const form = scope.querySelector('.chh-comments__composer');
        const input = scope.querySelector('#chhCommentInput');
        const nameInput = scope.querySelector('#chhCommentName');
        const fileInput = scope.querySelector('#chhCommentAvatar');
        const previewImg = scope.querySelector('#chhCommentAvatarPreview');
        const placeholderEl = scope.querySelector('#chhCommentAvatarPlaceholder');
        const clearBtn = scope.querySelector('#chhCommentAvatarClear');
        const submit = scope.querySelector('.chh-comments__submit');
        if (!form || !input || !nameInput || !submit) return;

        let pendingAvatarDataUrl = null;

        function setAvatarPreview(dataUrl) {
          pendingAvatarDataUrl = dataUrl;
          if (!previewImg || !placeholderEl || !clearBtn) return;
          if (dataUrl) {
            previewImg.src = dataUrl;
            previewImg.hidden = false;
            placeholderEl.hidden = true;
            clearBtn.hidden = false;
          } else {
            previewImg.removeAttribute('src');
            previewImg.hidden = true;
            placeholderEl.hidden = false;
            clearBtn.hidden = true;
          }
        }

        function compressImageToJpeg(file, maxEdge, quality, done) {
          const reader = new FileReader();
          reader.onload = function () {
            const img = new Image();
            img.onload = function () {
              let w = img.naturalWidth || img.width;
              let h = img.naturalHeight || img.height;
              const scale = Math.min(1, maxEdge / Math.max(w, h, 1));
              w = Math.max(1, Math.round(w * scale));
              h = Math.max(1, Math.round(h * scale));
              const canvas = document.createElement('canvas');
              canvas.width = w;
              canvas.height = h;
              const ctx = canvas.getContext('2d');
              if (!ctx) {
                done(null);
                return;
              }
              ctx.drawImage(img, 0, 0, w, h);
              let out = null;
              let q = quality;
              for (let step = 0; step < 6; step++) {
                try {
                  out = canvas.toDataURL('image/jpeg', q);
                } catch (e) {
                  out = null;
                  break;
                }
                if (!out || out.length <= MAX_AVATAR_BYTES) break;
                q *= 0.75;
              }
              done(out && out.length <= MAX_AVATAR_BYTES ? out : null);
            };
            img.onerror = function () {
              done(null);
            };
            img.src = reader.result;
          };
          reader.onerror = function () {
            done(null);
          };
          reader.readAsDataURL(file);
        }

        const prof = loadProfile();
        if (prof && prof.name) nameInput.value = prof.name;
        if (prof && prof.avatarUrl && String(prof.avatarUrl).indexOf('data:') === 0) {
          setAvatarPreview(prof.avatarUrl);
        }

        if (fileInput) {
          fileInput.addEventListener('change', function () {
            const file = fileInput.files && fileInput.files[0];
            if (!file || !file.type || file.type.indexOf('image/') !== 0) return;
            compressImageToJpeg(file, 128, 0.82, function (dataUrl) {
              if (!dataUrl) {
                fileInput.value = '';
                return;
              }
              setAvatarPreview(dataUrl);
            });
          });
        }

        if (clearBtn) {
          clearBtn.addEventListener('click', function () {
            if (fileInput) fileInput.value = '';
            setAvatarPreview(null);
          });
        }

        function sync() {
          const val = String(input.value || '').trim();
          const name = String(nameInput.value || '').trim();
          submit.disabled = val.length < 2 || name.length < 1;
        }

        sync();
        input.addEventListener('input', sync);
        nameInput.addEventListener('input', sync);

        form.addEventListener('submit', function (e) {
          e.preventDefault();
          const val = String(input.value || '').trim();
          const author = String(nameInput.value || '').trim();
          if (val.length < 2 || author.length < 1) return;

          const avatarUrl = pendingAvatarDataUrl || null;
          const entry = {
            author: author,
            body: val,
            ts: Date.now()
          };
          if (avatarUrl) entry.avatarUrl = avatarUrl;

          savedComments.push(entry);
          persist();
          persistProfile({ name: author, avatarUrl: avatarUrl || undefined });
          input.value = '';
          sync();

          const list = scope.querySelector('.chh-comments__list');
          if (list) {
            const sorted = savedComments.slice().sort((a, b) => (b.ts || 0) - (a.ts || 0));
            const idx = sorted.findIndex(function (x) {
              return x.ts === entry.ts && x.body === entry.body && x.author === entry.author;
            });
            list.insertAdjacentHTML('afterbegin', renderSavedComment(entry, Math.max(0, idx)));
            wireLikeButtons(seed);
          }
        });
      }

      // Additional reading is injected on each page with a small retry loop;
      // we do the same to reliably place comments right below it.
      let tries = 0;
      const timer = setInterval(function () {
        tries++;
        tryInsert(tries);
        const inserted = document.getElementById(TARGET_ID)?.getAttribute(INSERTED_ATTR) === '1';
        if (inserted || tries >= maxTries) {
          clearInterval(timer);
        }
      }, 100);
      tryInsert(0);
    })();

  // Footer newsletter (static site — wire to your provider later)
  const footerNewsletter = document.getElementById('siteFooterNewsletter');
  if (footerNewsletter) {
    footerNewsletter.addEventListener('submit', function (e) {
      e.preventDefault();
    });
  }
});