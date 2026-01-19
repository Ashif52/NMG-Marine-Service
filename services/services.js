(function () {
    const form = document.getElementById('quote-form');
    if (!form) return;

    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const statusEl = document.getElementById('quote-status');

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

        if (!emailInput.value.trim()) {
            setError(emailInput, 'Please enter your email.');
            isValid = false;
        } else if (!isValidEmail(emailInput.value)) {
            setError(emailInput, 'Please enter a valid email address.');
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
            statusEl.textContent = 'Thank you. Our team will contact you shortly with a customized quote.';
            statusEl.classList.add('success');
        }

        form.reset();
    });

    [firstNameInput, lastNameInput, emailInput].forEach(input => {
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
