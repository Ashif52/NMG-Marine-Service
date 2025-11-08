// ============================================
// INITIALIZE ON DOM LOAD
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
    initModals();
    initTestimonialSlider();
    initScrollEffects();
    initFormHandlers();
    initSmoothScroll();
});

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const nav = document.getElementById('nav');
    const navLinks = document.querySelectorAll('.nav-list a');
    
    if (!mobileMenuToggle || !nav) return;
    
    // Toggle mobile menu
    mobileMenuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close menu when clicking nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target) && nav.classList.contains('active')) {
            mobileMenuToggle.classList.remove('active');
            nav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

// ============================================
// MODALS
// ============================================
function initModals() {
    // Get all modals
    const loginModal = document.getElementById('loginModal');
    const signupModal = document.getElementById('signupModal');
    const forgotPasswordModal = document.getElementById('forgotPasswordModal');
    
    // Get all buttons
    const loginBtns = document.querySelectorAll('#loginBtn');
    const applyBtns = document.querySelectorAll('#applyBtn, #footerApplyBtn');
    const showSignupBtn = document.getElementById('showSignup');
    const showLoginBtns = document.querySelectorAll('#showLogin, #backToLogin');
    const forgotPasswordLink = document.getElementById('forgotPasswordLink');
    
    // Get close buttons
    const loginClose = document.getElementById('loginClose');
    const signupClose = document.getElementById('signupClose');
    const forgotClose = document.getElementById('forgotClose');
    
    // Open login modal
    loginBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                openModal(loginModal);
            });
        }
    });
    
    // Open signup modal
    applyBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                openModal(signupModal);
            });
        }
    });
    
    // Switch from login to signup
    if (showSignupBtn) {
        showSignupBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal(loginModal);
            setTimeout(() => openModal(signupModal), 200);
        });
    }
    
    // Switch from signup to login
    showLoginBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                closeModal(signupModal);
                closeModal(forgotPasswordModal);
                setTimeout(() => openModal(loginModal), 200);
            });
        }
    });
    
    // Open forgot password modal
    if (forgotPasswordLink) {
        forgotPasswordLink.addEventListener('click', function(e) {
            e.preventDefault();
            closeModal(loginModal);
            setTimeout(() => openModal(forgotPasswordModal), 200);
        });
    }
    
    // Close modals
    if (loginClose) loginClose.addEventListener('click', () => closeModal(loginModal));
    if (signupClose) signupClose.addEventListener('click', () => closeModal(signupModal));
    if (forgotClose) forgotClose.addEventListener('click', () => closeModal(forgotPasswordModal));
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === loginModal) closeModal(loginModal);
        if (e.target === signupModal) closeModal(signupModal);
        if (e.target === forgotPasswordModal) closeModal(forgotPasswordModal);
    });
    
    // Close modals with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal(loginModal);
            closeModal(signupModal);
            closeModal(forgotPasswordModal);
        }
    });
}

function openModal(modal) {
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal(modal) {
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ============================================
// TESTIMONIAL SLIDER
// ============================================
function initTestimonialSlider() {
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;
    
    if (testimonialItems.length === 0) return;
    
    // Show slide function
    function showSlide(n) {
        // Remove active class from all items and dots
        testimonialItems.forEach(item => item.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Handle wrap around
        if (n >= testimonialItems.length) {
            currentSlide = 0;
        } else if (n < 0) {
            currentSlide = testimonialItems.length - 1;
        } else {
            currentSlide = n;
        }
        
        // Add active class to current item and dot
        testimonialItems[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Next slide function
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            resetInterval();
        });
    });
    
    // Auto-advance slides
    function startInterval() {
        slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    
    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }
    
    // Initialize
    showSlide(0);
    startInterval();
    
    // Pause on hover
    const testimonialSection = document.querySelector('.testimonials-slider');
    if (testimonialSection) {
        testimonialSection.addEventListener('mouseenter', () => clearInterval(slideInterval));
        testimonialSection.addEventListener('mouseleave', () => startInterval());
    }
}

// ============================================
// SCROLL EFFECTS
// ============================================
function initScrollEffects() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', function() {
        // Header shadow on scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Animate elements on scroll
        animateOnScroll();
    });
    
    // Initial check for elements in viewport
    animateOnScroll();
}

function animateOnScroll() {
    const elements = document.querySelectorAll('.stat-item, .service-card, .testimonial-item.active, .info-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        
        // Check if element is in viewport
        if (elementTop < windowHeight - 100 && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// ============================================
// SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#" or "javascript:void(0);"
            if (href === '#' || href.includes('javascript:')) {
                return;
            }
            
            e.preventDefault();
            
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// FORM HANDLERS
// ============================================
function initFormHandlers() {
    // Login form
    const loginForm = document.querySelector('#loginModal .modal-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            
            // Basic validation
            if (email && password) {
                console.log('Login attempt:', { email, password });
                alert('Login functionality would be implemented here.\nEmail: ' + email);
                
                // Reset form
                this.reset();
                
                // Close modal
                closeModal(document.getElementById('loginModal'));
            } else {
                alert('Please fill in all fields.');
            }
        });
    }
    
    // Signup form
    const signupForm = document.querySelector('#signupModal .modal-form');
    if (signupForm) {
        signupForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('signupName').value;
            const email = document.getElementById('signupEmail').value;
            const password = document.getElementById('signupPassword').value;
            const phone = document.getElementById('signupPhone').value;
            const termsAccepted = document.getElementById('termsCheck').checked;
            
            // Validation
            if (!name || !email || !password || !phone) {
                alert('Please fill in all fields.');
                return;
            }
            
            if (!termsAccepted) {
                alert('Please accept the Terms and Conditions.');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            
            // Password strength check
            if (password.length < 6) {
                alert('Password must be at least 6 characters long.');
                return;
            }
            
            console.log('Signup attempt:', { name, email, password, phone });
            alert('Sign up successful!\nWelcome, ' + name + '!\n\nYour application has been submitted.');
            
            // Reset form
            this.reset();
            
            // Close modal
            closeModal(document.getElementById('signupModal'));
        });
    }
    
    // Forgot password form
    const forgotPasswordForm = document.querySelector('#forgotPasswordModal .modal-form');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('forgotEmail').value;
            
            // Basic validation
            if (email) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(email)) {
                    alert('Please enter a valid email address.');
                    return;
                }
                
                console.log('Password reset requested for:', email);
                alert('Password reset link has been sent to:\n' + email);
                
                // Reset form
                this.reset();
                
                // Close modal
                closeModal(document.getElementById('forgotPasswordModal'));
            } else {
                alert('Please enter your email address.');
            }
        });
    }
}

// ============================================
// COUNTER ANIMATION (for stats)
// ============================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString() + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start).toLocaleString() + '+';
        }
    }, 16);
}

// Initialize counter animation when stat section is in viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                if (stat.textContent.includes('120,000')) {
                    animateCounter(stat, 120000);
                }
            });
            observer.disconnect(); // Run only once
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    observer.observe(heroSection);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for scroll events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Add scroll event listener with debounce
window.addEventListener('scroll', debounce(function() {
    // Custom scroll handling can be added here
}, 20));

// ============================================
// GALLERY PLACEHOLDER (if needed)
// ============================================
function initGallery() {
    // Gallery functionality can be added here
    console.log('Gallery initialized');
}

// ============================================
// FAQ ACCORDION (if needed)
// ============================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', function() {
                const isActive = item.classList.contains('active');
                
                // Close all items
                faqItems.forEach(i => i.classList.remove('active'));
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
}

// ============================================
// LOADING ANIMATION
// ============================================
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    console.log('Website fully loaded');
});

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%c🚢 Welcome to AirBorne Recruiting!', 'color: #1e3a8a; font-size: 20px; font-weight: bold;');
console.log('%cPreparing crew for successful careers on luxury cruise ships since 1986', 'color: #3b82f6; font-size: 14px;');

// ============================================
// PERFORMANCE MONITORING
// ============================================
if ('PerformanceObserver' in window) {
    const perfObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
                console.log('LCP:', entry.renderTime || entry.loadTime);
            }
        }
    });
    
    try {
        perfObserver.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
        // LCP not supported
    }
}

// ============================================
// ACCESSIBILITY ENHANCEMENTS
// ============================================
document.addEventListener('keydown', function(e) {
    // Close modals with Escape key (already handled above)
    // Add tab trapping in modals for accessibility
    const activeModal = document.querySelector('.modal.active');
    
    if (activeModal && e.key === 'Tab') {
        const focusableElements = activeModal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                lastElement.focus();
                e.preventDefault();
            }
        } else {
            if (document.activeElement === lastElement) {
                firstElement.focus();
                e.preventDefault();
            }
        }
    }
});

// ============================================
// EXPORT FUNCTIONS (for external use if needed)
// ============================================
window.AirBorne = {
    openModal,
    closeModal,
    showTestimonial: function(index) {
        const dots = document.querySelectorAll('.dot');
        if (dots[index]) {
            dots[index].click();
        }
    }
};
