(function () {
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
            // Fallback for older browsers
            revealAll();
        }
    }

    // Technical services: click to toggle description
    const serviceCards = document.querySelectorAll('.tech-service-card');
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
})();
