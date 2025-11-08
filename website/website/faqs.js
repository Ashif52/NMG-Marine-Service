// FAQs Accordion Functionality
document.addEventListener('DOMContentLoaded', function() {
    initFAQAccordion();
});

function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    if (faqItems.length === 0) return;
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all items in the same section
                const parentSection = item.closest('.faq-accordion');
                const siblingsItems = parentSection.querySelectorAll('.faq-item');
                siblingsItems.forEach(sibling => {
                    sibling.classList.remove('active');
                    const icon = sibling.querySelector('.faq-icon');
                    if (icon) icon.textContent = '+';
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                    const icon = question.querySelector('.faq-icon');
                    if (icon) icon.textContent = '−';
                }
            });
        }
    });
}

// Search functionality (optional enhancement)
function initFAQSearch() {
    const searchInput = document.getElementById('faqSearch');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question h4').textContent.toLowerCase();
            const answer = item.querySelector('.faq-answer p').textContent.toLowerCase();
            
            if (question.includes(searchTerm) || answer.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
}
