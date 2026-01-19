(function () {
    // Reveal-on-scroll behavior (same pattern as other pages)
    const revealElements = document.querySelectorAll('.reveal-on-scroll');

    function revealAll() {
        revealElements.forEach(el => el.classList.add('is-visible'));
    }

    if (revealElements.length) {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        obs.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.15
            });

            revealElements.forEach(el => observer.observe(el));
        } else {
            revealAll();
        }
    }

    // Click to toggle service descriptions
    const serviceCards = document.querySelectorAll('.crew-service-card');
    if (serviceCards.length) {
        serviceCards.forEach(card => {
            card.addEventListener('click', function () {
                const isOpen = card.classList.contains('is-open');
                serviceCards.forEach(c => c.classList.remove('is-open'));
                if (!isOpen) {
                    card.classList.add('is-open');
                }
            });
        });
    }

    // Smooth scroll for hero CTA
    const crewCta = document.querySelector('.crew-hero-cta[href^="#"]');
    if (crewCta && 'scrollIntoView' in document.documentElement) {
        crewCta.addEventListener('click', function (event) {
            const targetId = crewCta.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            event.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
})();
