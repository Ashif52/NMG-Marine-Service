// Contact Page Functionality
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initCTAButtons();
});

function initContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('contactName').value;
        const email = document.getElementById('contactEmail').value;
        const phone = document.getElementById('contactPhone').value;
        const subject = document.getElementById('contactSubject').value;
        const message = document.getElementById('contactMessage').value;
        
        // Basic validation
        if (!name || !email || !phone || !subject || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        console.log('Contact form submitted:', { name, email, phone, subject, message });
        alert('Thank you for contacting us!\n\nYour message has been received. Our team will get back to you shortly.');
        
        // Reset form
        this.reset();
    });
}

function initCTAButtons() {
    const newApplicationBtn = document.getElementById('newApplicationBtn');
    const updateApplicationBtn = document.getElementById('updateApplicationBtn');
    
    newApplicationBtn?.addEventListener('click', function() {
        document.getElementById('signupModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    });
    
    updateApplicationBtn?.addEventListener('click', function() {
        document.getElementById('loginModal').classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}
