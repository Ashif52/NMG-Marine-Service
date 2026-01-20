/**
 * BADMA1 - Vessel IT CRM Landing Page
 * Interactive Features & Animations
 */

// ===================================
// HEADER SCROLL EFFECT
// ===================================
const header = document.getElementById('header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Add scrolled class when page is scrolled
  if (scrollTop > 50) {
    header.classList.add('header--scrolled');
  } else {
    header.classList.remove('header--scrolled');
  }

  lastScrollTop = scrollTop;
});

// ===================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const headerHeight = header.offsetHeight;
      const targetPosition = targetElement.offsetTop - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// ===================================
// SCROLL ANIMATIONS
// ===================================
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Optional: unobserve after animation to improve performance
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all scroll-animate elements
document.querySelectorAll('.scroll-animate').forEach(element => {
  observer.observe(element);
});

// ===================================
// FEATURE LIST ITEM STAGGER ANIMATION
// ===================================
document.querySelectorAll('.feature-list').forEach(list => {
  const items = list.querySelectorAll('.feature-list-item');

  items.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'all 0.5s ease';
    item.style.transitionDelay = `${index * 0.1}s`;
  });
});

// Trigger stagger animation when list comes into view
const listObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const items = entry.target.querySelectorAll('.feature-list-item');
      items.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'translateY(0)';
      });
      listObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.feature-list').forEach(list => {
  listObserver.observe(list);
});

// ===================================
// ROLE CARD ANIMATIONS
// ===================================
const roleCards = document.querySelectorAll('.role-card');

roleCards.forEach((card, index) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(30px)';
  card.style.transition = 'all 0.6s ease';
  card.style.transitionDelay = `${index * 0.15}s`;
});

const roleCardsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = entry.target.querySelectorAll('.role-card');
      cards.forEach(card => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
      roleCardsObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

const roleCardsContainer = document.querySelector('.role-cards');
if (roleCardsContainer) {
  roleCardsObserver.observe(roleCardsContainer);
}

// ===================================
// BADGE PULSE ANIMATION
// ===================================
const badges = document.querySelectorAll('.badge');

badges.forEach(badge => {
  badge.addEventListener('mouseenter', () => {
    badge.style.transform = 'scale(1.1)';
    badge.style.transition = 'transform 0.2s ease';
  });

  badge.addEventListener('mouseleave', () => {
    badge.style.transform = 'scale(1)';
  });
});

// ===================================
// IMAGE LAZY LOADING FALLBACK
// ===================================
// Modern browsers support native lazy loading, but add fallback
if ('loading' in HTMLImageElement.prototype) {
  const images = document.querySelectorAll('img[loading="lazy"]');
  images.forEach(img => {
    img.src = img.dataset.src || img.src;
  });
} else {
  // Fallback for older browsers
  const script = document.createElement('script');
  script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
  document.body.appendChild(script);
}

// ===================================
// CTA SECTION PARALLAX EFFECT
// ===================================
const ctaSection = document.querySelector('.cta-section');

if (ctaSection) {
  window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    const ctaPosition = ctaSection.offsetTop;
    const windowHeight = window.innerHeight;

    if (scrollPosition + windowHeight > ctaPosition) {
      const parallaxValue = (scrollPosition + windowHeight - ctaPosition) * 0.1;
      ctaSection.style.backgroundPosition = `center ${parallaxValue}px`;
    }
  });
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Debounce function to limit scroll event frequency
function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function () {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Apply debounce to scroll-heavy functions
window.addEventListener('scroll', debounce(() => {
  // Any heavy scroll operations can go here
}, 10));

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================
// Add keyboard navigation support for interactive elements
const interactiveElements = document.querySelectorAll('.btn, .role-card, .feature-list-item');

interactiveElements.forEach(element => {
  element.setAttribute('tabindex', '0');

  element.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      element.click();
    }
  });
});

// ===================================
// CONSOLE BRANDING
// ===================================
console.log(
  '%c🚢 Badma1 - Vessel IT CRM %c\n' +
  'Built for maritime professionals\n' +
  'Structured digital operations for maritime fleets',
  'color: #2563EB; font-size: 20px; font-weight: bold;',
  'color: #64748B; font-size: 12px;'
);

// ===================================
// ANALYTICS & TRACKING (PLACEHOLDER)
// ===================================
// Track CTA button clicks
const ctaButtons = document.querySelectorAll('.btn-primary');

ctaButtons.forEach(button => {
  button.addEventListener('click', () => {
    // You can integrate Google Analytics, Mixpanel, or other tracking here
    console.log('CTA clicked:', button.textContent);

    // Example: gtag('event', 'cta_click', { button_text: button.textContent });
  });
});

// Track scroll depth
let maxScrollDepth = 0;

window.addEventListener('scroll', debounce(() => {
  const scrollDepth = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;

  if (scrollDepth > maxScrollDepth) {
    maxScrollDepth = scrollDepth;

    // Track milestones
    if (maxScrollDepth > 25 && maxScrollDepth < 30) {
      console.log('Scroll depth: 25%');
    } else if (maxScrollDepth > 50 && maxScrollDepth < 55) {
      console.log('Scroll depth: 50%');
    } else if (maxScrollDepth > 75 && maxScrollDepth < 80) {
      console.log('Scroll depth: 75%');
    } else if (maxScrollDepth > 90) {
      console.log('Scroll depth: 90% (almost complete)');
    }
  }
}, 500));

// ===================================
// PAGE LOAD PERFORMANCE
// ===================================
window.addEventListener('load', () => {
  console.log('✅ Page fully loaded');

  // Optional: Send page load timing to analytics
  if (window.performance) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`📊 Page load time: ${pageLoadTime}ms`);
  }
});

// ===================================
// DEMO REQUEST FORM HANDLING (FUTURE)
// ===================================
// This is a placeholder for future form implementation
document.querySelectorAll('a[href="#demo"]').forEach(link => {
  link.addEventListener('click', (e) => {
    console.log('Demo request initiated');

    // Future: Open modal or redirect to contact form
    // Example: openDemoModal();
  });
});

// ===================================
// VIEWPORT HEIGHT FIX FOR MOBILE
// ===================================
// Fix for mobile browsers where vh units can be problematic
function setVHVariable() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);
}

setVHVariable();
window.addEventListener('resize', debounce(setVHVariable, 100));

// ===================================
// PREFETCH DEMO/CONTACT PAGE
// ===================================
// Optional: Prefetch the demo page for faster navigation
const prefetchLink = document.createElement('link');
prefetchLink.rel = 'prefetch';
prefetchLink.href = '/demo'; // Update with actual demo page URL
// document.head.appendChild(prefetchLink); // Uncomment when demo page exists
