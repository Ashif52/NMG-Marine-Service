(function () {
    const form = document.getElementById('join-form');
    if (!form) return;

    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const phoneInput = document.getElementById('phone');
    const positionSelect = document.getElementById('position');
    const rankInput = document.getElementById('rank');
    const emailInput = document.getElementById('email');
    const startDayInput = document.getElementById('startDay');
    const startMonthInput = document.getElementById('startMonth');
    const startYearInput = document.getElementById('startYear');
    const linkedinInput = document.getElementById('linkedin');
    const statusEl = document.getElementById('join-status');

    function getErrorElement(input) {
        return form.querySelector(`.error-message[data-error-for="${input.id}"]`);
    }

    function clearErrors() {
        const fields = form.querySelectorAll('.form-field');
        fields.forEach(field => field.classList.remove('has-error'));

        const errors = form.querySelectorAll('.error-message');
        errors.forEach(el => el.textContent = '');

        if (statusEl) {
            statusEl.textContent = '';
            statusEl.classList.remove('success', 'error');
        }
    }

    function setError(input, message) {
        const field = input.closest('.form-field');
        const errorEl = getErrorElement(input);

        if (field) {
            field.classList.add('has-error');
        }
        if (errorEl) {
            errorEl.textContent = message;
        }
    }

    function isValidEmail(value) {
        const trimmed = value.trim();
        if (!trimmed) return false;
        const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return pattern.test(trimmed);
    }

    function isValidPhone(value) {
        const digits = value.replace(/[^0-9]/g, '');
        return digits.length >= 7;
    }

    function isValidUrl(value) {
        const trimmed = value.trim();
        if (!trimmed) return true; // optional
        const pattern = /^(https?:\/\/)[^\s]+$/i;
        return pattern.test(trimmed);
    }

    function isValidDate(day, month, year) {
        const d = parseInt(day, 10);
        const m = parseInt(month, 10);
        const y = parseInt(year, 10);

        if (isNaN(d) || isNaN(m) || isNaN(y)) return false;
        if (d < 1 || d > 31 || m < 1 || m > 12 || y < 1900 || y > 2100) return false;

        const date = new Date(y, m - 1, d);
        return date.getFullYear() === y && date.getMonth() === m - 1 && date.getDate() === d;
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();
        clearErrors();

        let isValid = true;

        if (!firstNameInput.value.trim()) {
            setError(firstNameInput, 'Please enter your first name.');
            isValid = false;
        }

        if (!lastNameInput.value.trim()) {
            setError(lastNameInput, 'Please enter your last name.');
            isValid = false;
        }

        if (!phoneInput.value.trim()) {
            setError(phoneInput, 'Please enter your phone number.');
            isValid = false;
        } else if (!isValidPhone(phoneInput.value)) {
            setError(phoneInput, 'Please enter a valid phone number.');
            isValid = false;
        }

        if (!emailInput.value.trim()) {
            setError(emailInput, 'Please enter your email.');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            setError(emailInput, 'Please enter a valid email address.');
            isValid = false;
        }

        if (!positionSelect.value) {
            setError(positionSelect, 'Please select your position.');
            isValid = false;
        }

        if (!rankInput.value.trim()) {
            setError(rankInput, 'Please enter your rank.');
            isValid = false;
        }

        const dayVal = startDayInput.value.trim();
        const monthVal = startMonthInput.value.trim();
        const yearVal = startYearInput.value.trim();

        if (!dayVal || !monthVal || !yearVal || !isValidDate(dayVal, monthVal, yearVal)) {
            setError(startYearInput, 'Please enter a valid start date (day, month, year).');
            isValid = false;
        }

        if (!isValidUrl(linkedinInput.value)) {
            setError(linkedinInput, 'Please enter a valid LinkedIn URL starting with http or https.');
            isValid = false;
        }

        if (!isValid) {
            if (statusEl) {
                statusEl.textContent = 'Please correct the highlighted fields and try again.';
                statusEl.classList.add('error');
            }
            return;
        }

        if (statusEl) {
            statusEl.textContent = 'Thank you. Our crewing team will review your profile and contact you when a suitable opportunity arises.';
            statusEl.classList.add('success');
        }

        form.reset();
    });

    [firstNameInput, lastNameInput, phoneInput, positionSelect, rankInput, emailInput,
        startDayInput, startMonthInput, startYearInput, linkedinInput].forEach(input => {
        if (!input) return;
        input.addEventListener('input', function () {
            const field = input.closest('.form-field');
            const errorEl = getErrorElement(input);
            if (field) {
                field.classList.remove('has-error');
            }
            if (errorEl) {
                errorEl.textContent = '';
            }
        });
    });
})();

// Scroll reveal animation
(function () {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    
    if (!revealElements.length) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(element => {
        observer.observe(element);
    });
})();
