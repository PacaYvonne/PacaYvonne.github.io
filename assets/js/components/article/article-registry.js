// Article Registry
// Centralized metadata for all articles
// Usage: getArticleMetadata(url)

(function() {
    'use strict';
    
    // Article metadata registry
    // URL is the key, relative to blog/ directory for blog articles
    const articleRegistry = {
        // Blog articles
        'blog/how-dust-allergies-work.html': {
            title: 'How Dust Allergies Work: The Science Behind Dust Allergies',
            image: 'https://cdn.shopify.com/s/files/1/0814/8369/4394/files/Dust_Allergies.png?v=1750456871',
            category: 'Wellness'
        },
        'blog/dust-mite-allergies.html': {
            title: 'Dust Mite Allergies: What You Need To Know',
            image: 'assets/images/seasonal-dust-mite-allergy.png',
            category: 'Wellness'
        },
        'blog/can-allergies-cause-a-cough.html': {
            title: 'Can Allergies Cause a Cough?',
            image: 'assets/images/Allergery_Cough.png',
            category: 'Wellness'
        },
        'blog/how-to-help-allergy-fatigue.html': {
            title: 'How To Help Allergy Fatigue',
            image: 'assets/images/person-sleeping-on-couch.jpg',
            category: 'Wellness'
        },
        'blog/understanding-fel-d-1.html': {
            title: 'Understanding Fel d 1: The Cat Allergen',
            image: 'assets/images/understanding_feld1.png',
            category: 'Wellness'
        },
        'blog/what-are-the-best-cat-breeds-for-allergies.html': {
            title: 'Allergy Free Cats: The Best Cat Breeds For Allergies',
            image: 'assets/images/Siberian-cat-4.jpg',
            category: 'Wellness'
        },
        'blog/worst-cats-for-allergies.html': {
            title: 'The Worst Cats for Allergies',
            image: 'assets/images/Persian-cat-3.jpg',
            category: 'Wellness'
        },
        'blog/best-home-air-purifiers.html': {
            title: 'Best Home Air Purifiers',
            image: 'assets/images/best-air-purifier.png',
            category: 'Home Cleaning'
        },
        'blog/dust-mite-mattress-covers.html': {
            title: 'Dust Mite Mattress Covers: Do They Work?',
            image: 'assets/images/bedsheets.png',
            category: 'Home Cleaning'
        },
        'blog/best-hypoallergenic-dogs.html': {
            title: 'Best Hypoallergenic Dogs',
            image: 'assets/images/schnauzer.jpg',
            category: 'Wellness'
        },
        'blog/how-dog-allergies-work.html': {
            title: 'How Dog Allergies Work: The Science Behind Dog Allergies',
            image: 'assets/images/schnauzer.jpg',
            category: 'Wellness'
        },
        'blog/how-dust-allergies-really-work.html': {
            title: 'How Dust Allergies Really Work, And the Myths You Should Stop Believing',
            image: 'assets/images/adv_dustallergies_mainimg.png',
            category: 'Wellness',
            isOnIndex: true
        },
        'blog/types-of-environmental-allergies.html': {
            title: 'Types of Environmental Allergies and How They Affect You',
            image: 'assets/images/blog_enviro_mainimg.png',
            category: 'Wellness',
            isOnIndex: true
        },
        'blog/dust-mite-allergy-bedding.html': {
            title: 'Dust Mite Allergy Bedding',
            image: 'assets/images/adv_dustallergybedding_mainimg.png',
            category: 'Home Cleaning',
            isOnIndex: true
        },
        'blog/home-decor-less-than-50.html': {
            title: 'The One Home Decor Trick Designers Swear By - And It Costs Less Than $50',
            image: 'assets/images/adv_50_mainimg.png',
            category: 'Home Decor',
            isOnIndex: true
        },
        'blog/how-to-make-any-room-feel-luxe.html': {
            title: 'Small Space, Big Style: How to Make Any Room Feel Luxe',
            image: 'assets/images/adv_luxe_mainimg.png',
            category: 'Home Decor',
            isOnIndex: true
        },
        'blog/3-secrets-interior-designers.html': {
            title: 'Transform Your Space: The 3 Secrets Interior Designers Swear By',
            image: 'assets/images/adv_interior_mainimg.png',
            category: 'Home Decor',
            isOnIndex: true
        },
        // Root level articles
        '11-cheap-habits-cat-owners-with-allergies-say-made-the-biggest-difference.html': {
            title: '\'I Literally Tried Everything\' - 11 Cheap Habits Cat Owners With Allergies Say Made the Biggest Difference',
            image: 'assets/images/11_0.png',
            category: 'Wellness',
            isOnIndex: true
        },
        '5-everyday-changes-helping-cat-owners-with-allergies.html': {
            title: '5 Everyday Changes Helping Cat Owners With Allergies',
            image: 'assets/images/5_0.png',
            category: 'Wellness',
            isOnIndex: true
        },
        '7-surprisingly-easy-habits-that-actually-help-with-dust-allergies.html': {
            title: '7 Surprisingly Easy Habits That Actually Help With Dust Allergies',
            image: 'assets/images/7_0.png',
            category: 'Home Cleaning',
            isOnIndex: true
        },
        'my-review-for-pacagen.html': {
            title: 'My Honest 30-Day Review of Pacagen as a Long-Time Cat Owner with Allergies',
            image: 'assets/images/chh_30days_hero.png',
            category: 'Wellness',
            isOnIndex: true
        },
        '4-products-changed-everything.html': {
            title: 'I Am A Busy Mom Who Hates Cleaning And These 4 Products Changed Everything',
            image: 'assets/images/lis_mom5products_mainimg.png',
            category: 'Home Cleaning',
            isOnIndex: true
        },
        'sleeping-with-1.5-million-dust-mites.html': {
            title: 'The Average Bed Has 1.5 Million Dust Mites. I Found a Home Mist That Changed Our Life',
            image: 'assets/images/adv_helpkids_mainimg.png',
            category: 'Home Cleaning',
            isOnIndex: true
        },
        'secret-to-waking-up-with-perfect-skin.html': {
            title: 'The Secret to Waking Up with Better Skin Might Be Hiding in Your Bedroom',
            image: 'assets/images/adv_girlinbed.png',
            category: 'Wellness',
            isOnIndex: true
        },
        'how-to-clean-a-living-room-in-11-minutes.html': {
            title: 'How to Clean a Living Room in Just 11 Minutes',
            image: 'assets/images/lis_11_main.png',
            category: 'Home Cleaning',
            isOnIndex: true
        },
        'pacagen-home-mist-spray.html': {
            title: 'Pacagen Home Mist Spray: The Science-Backed Way to Refresh Your Air',
            image: 'assets/images/adv_homemist_main.png',
            category: 'Wellness',
            isOnIndex: true
        },
        'zyrtec-vs-dust-allergen-neutralizing-spray.html': {
            title: 'Zyrtec vs. a Functional Febreze: Which One Works Better?',
            image: 'assets/images/lis_vs_main.png',
            category: 'Wellness',
            isOnIndex: true
        },
        'a-fathers-journey.html': {
            title: 'A Father\'s Journey: How I Finally Helped My Son Breathe Again',
            image: 'assets/images/adv_fathers_journey.png',
            category: 'Wellness',
            isOnIndex: true
        },
        'for-my-grandma.html': {
            title: 'A Son\'s Story: How I Helped My Mom Breathe Again in Her Senior Home',
            image: 'assets/images/Grandma.png',
            category: 'Wellness',
            isOnIndex: true
        }
    };
    
    function getArticleMetadata(url) {
        // Normalize URL - remove leading slash
        let normalizedUrl = url.replace(/^\//, '');
        
        // Remove ../ if present (for blog pages referencing other blog pages)
        normalizedUrl = normalizedUrl.replace(/\.\.\//g, '');
        
        // Try exact match first
        if (articleRegistry[normalizedUrl]) {
            return articleRegistry[normalizedUrl];
        }
        
        // Try with blog/ prefix if it doesn't have it
        if (!normalizedUrl.startsWith('blog/')) {
            const withBlogPrefix = 'blog/' + normalizedUrl;
            if (articleRegistry[withBlogPrefix]) {
                return articleRegistry[withBlogPrefix];
            }
        }
        
        // Try without blog/ prefix if it has it
        if (normalizedUrl.startsWith('blog/')) {
            const withoutBlogPrefix = normalizedUrl.replace(/^blog\//, '');
            if (articleRegistry[withoutBlogPrefix]) {
                return articleRegistry[withoutBlogPrefix];
            }
        }
        
        return null;
    }
    
    function getAllArticles() {
        return articleRegistry;
    }
    
    window.getArticleMetadata = getArticleMetadata;
    window.getAllArticles = getAllArticles;
})();
