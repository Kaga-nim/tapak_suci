// ============================================
// GLOBAL VARIABLES & DATA
// ============================================

const galleryImages = [
    {
        id: 1,
        filename: "1.jpg",
        title: "Latihan Rutin Mingguan",
        description: "Anggota Tapak Suci berlatih teknik dasar Pencak Silat di Gedung Dakwah PDM Tangsel.",
        category: "latihan"
    },
    {
        id: 2,
        filename: "2.jpg",
        title: "Latihan Bang Dodi",
        description: "Latihan Akbar dengan Pondok Pesantren Al-Fatah, Lampung",
        category: "event"
    },
    {
        id: 3,
        filename: "3.jpg",
        title: "Ujian Kenaikan Tingkat",
        description: "Ujian Kenaikan Tingkat (UKT) yang dilaksanakan rutin untuk penilaian kemampuan anggota.",
        category: "event"
    },
    {
        id: 4,
        filename: "4.jpg",
        title: "Latihan Kekuatan dan Stamina",
        description: "Latihan fisik untuk meningkatkan kekuatan, stamina, dan kelincahan anggota.",
        category: "latihan"
    },
    {
        id: 5,
        filename: "5.jpg",
        title: "Prestasi di Kejuaraan Daerah",
        description: "Perolehan medali emas pada kejuaraan Pencak Silat tingkat regional.",
        category: "prestasi"
    },
    {
        id: 6,
        filename: "6.jpg",
        title: "Latihan Teknik Senjata",
        description: "Pengenalan dan latihan teknik dasar menggunakan senjata tradisional silat.",
        category: "latihan"
    },
    {
        id: 7,
        filename: "7.jpg",
        title: "Seminar Bela Diri",
        description: "Seminar tentang filosofi dan aplikasi bela diri dalam kehidupan sehari-hari.",
        category: "event"
    },
    {
        id: 8,
        filename: "8.jpg",
        title: "Prestasi Nasional",
        description: "Penghargaan yang diraih di kejuaraan nasional Pencak Silat Tapak Suci.",
        category: "prestasi"
    },
    {
        id: 9,
        filename: "9.jpg",
        title: "Latihan Kelenturan",
        description: "Latihan kelenturan tubuh untuk mendukung teknik bela diri yang efektif.",
        category: "latihan"
    },
    {
        id: 10,
        filename: "10.jpg",
        title: "Kegiatan Sosial",
        description: "Anggota Tapak Suci berpartisipasi dalam kegiatan sosial kemasyarakatan.",
        category: "event"
    }
];

// ============================================
// GALLERY FUNCTIONS
// ============================================

/**
 * Display images in the gallery
 * @param {Array} images - Array of image objects
 */
function displayGalleryImages(images) {
    const galleryContainer = document.getElementById('imageGallery');
    
    if (!galleryContainer) return;
    
    galleryContainer.innerHTML = '';
    
    if (images.length === 0) {
        galleryContainer.innerHTML = createNoImagesMessage();
        return;
    }
    
    images.forEach(image => {
        const galleryItem = createGalleryItem(image);
        galleryContainer.appendChild(galleryItem);
    });
}

/**
 * Create gallery item HTML element
 * @param {Object} image - Image object
 * @returns {HTMLElement} Gallery item element
 */
function createGalleryItem(image) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item';
    galleryItem.setAttribute('data-category', image.category);
    galleryItem.setAttribute('data-id', image.id);
    
    galleryItem.innerHTML = `
        <div class="gallery-img-container">
            <img src="images/${image.filename}" alt="${image.title}" class="gallery-img" 
                 onerror="this.src='https://via.placeholder.com/400x300/8B0000/ffffff?text=Tapak+Suci+UNPAM'">
            <div class="gallery-overlay"></div>
        </div>
        <div class="gallery-caption">
            <h3>${image.title}</h3>
            <p>${image.description}</p>
            <div class="category-tag">
                <span style="background: ${getCategoryColor(image.category)};">
                    ${getCategoryName(image.category)}
                </span>
            </div>
        </div>
    `;
    
    galleryItem.addEventListener('click', () => openLightbox(image));
    
    return galleryItem;
}

/**
 * Create message for empty gallery
 * @returns {String} HTML string
 */
function createNoImagesMessage() {
    return `
        <div class="empty-gallery" style="grid-column: 1/-1; padding: 40px; text-align: center;">
            <i class="fas fa-image" style="font-size: 4rem; color: var(--text-light); margin-bottom: 20px;"></i>
            <h3>Tidak ada gambar yang ditemukan</h3>
            <p>Silakan pilih kategori lain</p>
        </div>
    `;
}

/**
 * Get category name
 * @param {String} category - Category code
 * @returns {String} Category name
 */
function getCategoryName(category) {
    const categories = {
        'latihan': 'Latihan',
        'event': 'Event',
        'prestasi': 'Prestasi'
    };
    return categories[category] || 'Lainnya';
}

/**
 * Get category color
 * @param {String} category - Category code
 * @returns {String} CSS color
 */
function getCategoryColor(category) {
    const colors = {
        'latihan': '#3498db',
        'event': '#9b59b6',
        'prestasi': '#f39c12'
    };
    return colors[category] || '#7f8c8d';
}

/**
 * Filter gallery by category
 * @param {String} category - Category to filter by
 */
function filterGallery(category) {
    // Update active filter button
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === category);
    });
    
    // Filter and display images
    if (category === 'all') {
        displayGalleryImages(galleryImages);
    } else {
        const filteredImages = galleryImages.filter(image => image.category === category);
        displayGalleryImages(filteredImages);
    }
}

/**
 * Open lightbox with image
 * @param {Object} image - Image object to display
 */
function openLightbox(image) {
    const lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    lightbox.innerHTML = createLightboxHTML(image);
    document.body.appendChild(lightbox);
    
    // Fade in animation
    setTimeout(() => lightbox.style.opacity = '1', 10);
    
    // Add event listeners for closing
    setupLightboxListeners(lightbox);
}

/**
 * Create lightbox HTML content
 * @param {Object} image - Image object
 * @returns {String} HTML string
 */
function createLightboxHTML(image) {
    return `
        <div class="lightbox-content">
            <button id="closeLightbox" aria-label="Tutup lightbox">
                <i class="fas fa-times"></i>
            </button>
            <img src="images/${image.filename}" alt="${image.title}" 
                 onerror="this.src='https://via.placeholder.com/800x600/8B0000/ffffff?text=Tapak+Suci+UNPAM'">
            <div class="lightbox-info">
                <h3>${image.title}</h3>
                <p>${image.description}</p>
            </div>
        </div>
    `;
}

/**
 * Setup lightbox event listeners
 * @param {HTMLElement} lightbox - Lightbox element
 */
function setupLightboxListeners(lightbox) {
    const closeLightbox = () => {
        lightbox.style.opacity = '0';
        setTimeout(() => {
            if (document.body.contains(lightbox)) {
                document.body.removeChild(lightbox);
            }
        }, 300);
    };
    
    // Close on button click
    lightbox.querySelector('#closeLightbox').addEventListener('click', closeLightbox);
    
    // Close on background click
    lightbox.addEventListener('click', (e) => {
        if (e.target.id === 'lightbox') closeLightbox();
    });
    
    // Close on ESC key
    document.addEventListener('keydown', function onEsc(e) {
        if (e.key === 'Escape') {
            closeLightbox();
            document.removeEventListener('keydown', onEsc);
        }
    });
}

// ============================================
// COUNTER ANIMATION
// ============================================

/**
 * Animate counter numbers
 */
function animateCounter() {
    const counters = document.querySelectorAll('.counter-number');
    const speed = 200; // Animation speed
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const count = parseInt(counter.textContent);
        const increment = target / speed;
        
        if (count < target) {
            counter.textContent = Math.ceil(count + increment);
            setTimeout(animateCounter, 1);
        } else {
            counter.textContent = target;
        }
    });
}

// ============================================
// SCROLL ANIMATIONS
// ============================================

/**
 * Check scroll position for animations
 */
function checkScroll() {
    checkSectionVisibility();
    updateBackToTopButton();
    updateActiveNavigation();
}

/**
 * Check if sections are visible in viewport
 */
function checkSectionVisibility() {
    const sections = document.querySelectorAll('.section');
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY || window.pageYOffset;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (scrollY > sectionTop - windowHeight + 100) {
            section.classList.add('visible');
        }
    });
}

/**
 * Update back to top button visibility
 */
function updateBackToTopButton() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    const scrollY = window.scrollY || window.pageYOffset;
    backToTop.classList.toggle('visible', scrollY > 500);
}

/**
 * Update active navigation based on scroll position
 */
function updateActiveNavigation() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollY = window.scrollY || window.pageYOffset;
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentSection}`);
    });
}

// ============================================
// EVENT LISTENERS SETUP
// ============================================

/**
 * Setup smooth scrolling for anchor links
 */
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#' && targetId !== '#!') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                    
                    // Update nav after scrolling
                    setTimeout(updateActiveNavigation, 500);
                }
            }
        });
    });
}

/**
 * Setup filter buttons for gallery
 */
function setupGalleryFilters() {
    document.querySelectorAll('.filter-btn').forEach(button => {
        button.addEventListener('click', function() {
            filterGallery(this.dataset.filter);
        });
    });
}

/**
 * Setup back to top button
 */
function setupBackToTop() {
    const backToTop = document.getElementById('backToTop');
    if (!backToTop) return;
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Setup WhatsApp button hover effect
 */
function setupWhatsAppButton() {
    const waButton = document.getElementById('waButton');
    if (!waButton) return;
    
    waButton.addEventListener('mouseenter', function() {
        this.innerHTML = `<i class="fab fa-whatsapp"></i> Chat Sekarang`;
    });
    
    waButton.addEventListener('mouseleave', function() {
        this.innerHTML = `<i class="fab fa-whatsapp"></i> Daftar via WhatsApp`;
    });
}

/**
 * Setup ripple effect on buttons
 */
function setupRippleEffects() {
    document.querySelectorAll('.cta-button, .filter-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            createRippleEffect(this, e);
        });
    });
}

/**
 * Create ripple effect on button click
 * @param {HTMLElement} button - Button element
 * @param {Event} e - Click event
 */
function createRippleEffect(button, e) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.7);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        width: ${size}px;
        height: ${size}px;
        top: ${y}px;
        left: ${x}px;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Initialize all functionality when DOM is loaded
 */
function initializeApp() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Initialize gallery with all images
    displayGalleryImages(galleryImages);
    
    // Setup all event listeners
    setupSmoothScrolling();
    setupGalleryFilters();
    setupBackToTop();
    setupWhatsAppButton();
    setupRippleEffects();
    
    // Setup Intersection Observer for counter animation
    setupCounterObserver();
    
    // Initial scroll check
    checkScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', checkScroll);
    
    // Add loading animation to images
    setupImageLoading();
    
    // Start typing animation in hero
    startTypingAnimation();
    
    // Preload important images
    preloadImages();
    
    console.log("Website Tapak Suci UNPAM telah dimuat dengan sukses! 🥋");
}

/**
 * Setup Intersection Observer for counter animation
 */
function setupCounterObserver() {
    const counterSection = document.getElementById('counter');
    
    if (!counterSection) return;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter();
                observer.unobserve(counterSection);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(counterSection);
}

/**
 * Setup image loading animations
 */
function setupImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transition = 'opacity 0.5s ease';
        });
        
        img.style.opacity = '0';
    });
}

/**
 * Start typing animation in hero section
 */
function startTypingAnimation() {
    const heroText = document.querySelector('.hero-title');
    if (!heroText) return;
    
    const originalText = heroText.textContent;
    heroText.textContent = '';
    let i = 0;
    
    function typeWriter() {
        if (i < originalText.length) {
            heroText.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    }
    
    setTimeout(typeWriter, 1000);
}

/**
 * Preload important images
 */
function preloadImages() {
    const imagesToPreload = [
        'images/TS.webp',
        'images/TSU.png'
    ];
    
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// ============================================
// WINDOW EVENT LISTENERS
// ============================================

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', initializeApp);

// Optional: Confirm before leaving page
window.addEventListener('beforeunload', function(e) {
    // Uncomment to enable confirmation
    // e.preventDefault();
    // e.returnValue = '';
});