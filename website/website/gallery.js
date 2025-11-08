// Gallery Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    initGalleryFilters();
    initLightbox();
});

function initGalleryFilters() {
    const categoryBtns = document.querySelectorAll('.gallery-category-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    if (categoryBtns.length === 0 || galleryItems.length === 0) return;
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (category === 'all' || itemCategory === category) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

function initLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.querySelector('.lightbox-close');
    const lightboxPrev = document.querySelector('.lightbox-prev');
    const lightboxNext = document.querySelector('.lightbox-next');
    let currentIndex = 0;
    let visibleItems = [];
    
    if (!lightbox) return;
    
    // Open lightbox
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            // Get all visible items
            visibleItems = Array.from(galleryItems).filter(item => {
                return window.getComputedStyle(item).display !== 'none';
            });
            
            currentIndex = visibleItems.indexOf(item);
            showLightboxImage(currentIndex);
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    lightboxClose?.addEventListener('click', closeLightbox);
    lightbox?.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Navigation
    lightboxPrev?.addEventListener('click', function(e) {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + visibleItems.length) % visibleItems.length;
        showLightboxImage(currentIndex);
    });
    
    lightboxNext?.addEventListener('click', function(e) {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % visibleItems.length;
        showLightboxImage(currentIndex);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowLeft') {
            lightboxPrev?.click();
        } else if (e.key === 'ArrowRight') {
            lightboxNext?.click();
        }
    });
    
    function showLightboxImage(index) {
        const item = visibleItems[index];
        const caption = item.querySelector('.gallery-caption h4')?.textContent || '';
        const subcaption = item.querySelector('.gallery-caption p')?.textContent || '';
        
        const lightboxCaption = document.querySelector('.lightbox-caption');
        if (lightboxCaption) {
            lightboxCaption.innerHTML = `<h3>${caption}</h3><p>${subcaption}</p>`;
        }
    }
    
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Tab switching (Images/Videos)
const galleryTabs = document.querySelectorAll('.gallery-tab');
galleryTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        galleryTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        const tabType = this.getAttribute('data-tab');
        if (tabType === 'videos') {
            alert('Video gallery feature coming soon!');
        }
    });
});
