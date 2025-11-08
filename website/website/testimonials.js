// Testimonials Page Filtering
document.addEventListener('DOMContentLoaded', function() {
    initTestimonialsFilter();
});

function initTestimonialsFilter() {
    const categoryBtns = document.querySelectorAll('.testimonial-category-btn');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    if (categoryBtns.length === 0 || testimonialCards.length === 0) return;
    
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter testimonial cards
            testimonialCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// Apply button handler
document.getElementById('applyBtnCTA')?.addEventListener('click', function() {
    document.getElementById('signupModal').classList.add('active');
    document.body.style.overflow = 'hidden';
});
