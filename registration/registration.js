"use strict";
class RegistrationManager {
    constructor() {
        this.form = document.getElementById('registrationForm');
        this.init();
    }
    init() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.addInputValidation();
    }
    addInputValidation() {
        const phoneInput = document.getElementById('phone');
        phoneInput.addEventListener('input', (e) => {
            const target = e.target;
            target.value = target.value.replace(/[^0-9]/g, '');
        });
        const teamSizeInput = document.getElementById('teamSize');
        teamSizeInput.addEventListener('input', (e) => {
            const target = e.target;
            const value = parseInt(target.value);
            if (value < 1)
                target.value = '1';
            if (value > 10)
                target.value = '10';
        });
    }
    validateForm(data) {
        if (!data.event) {
            this.showError('Please select an event');
            return false;
        }
        if (!data.fullName || data.fullName.trim().length < 2) {
            this.showError('Please enter a valid full name');
            return false;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            this.showError('Please enter a valid email address');
            return false;
        }
        if (!data.phone || data.phone.length < 10) {
            this.showError('Please enter a valid phone number');
            return false;
        }
        if (!data.college || data.college.trim().length < 2) {
            this.showError('Please enter your college/university name');
            return false;
        }
        return true;
    }
    showError(message) {
        alert(message);
    }
    showSuccess() {
        var _a;
        let successMsg = document.querySelector('.success-message');
        if (!successMsg) {
            successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            (_a = this.form.parentElement) === null || _a === void 0 ? void 0 : _a.insertBefore(successMsg, this.form);
        }
        successMsg.textContent = '✓ Registration successful! We will contact you soon.';
        successMsg.classList.add('show');
        setTimeout(() => {
            successMsg.classList.remove('show');
        }, 5000);
    }
    handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData(this.form);
        const data = {
            event: formData.get('event'),
            fullName: formData.get('fullName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            college: formData.get('college'),
            teamSize: formData.get('teamSize') ? parseInt(formData.get('teamSize')) : undefined,
            additionalInfo: formData.get('additionalInfo') || undefined,
        };
        if (this.validateForm(data)) {
            this.submitRegistration(data);
        }
    }
    submitRegistration(data) {
        console.log('Registration Data:', data);
        // Store registration data in sessionStorage for payment page
        sessionStorage.setItem('registrationData', JSON.stringify(data));
        // Simulate API call then redirect to payment
        setTimeout(() => {
            window.location.href = '../payment/index.html';
        }, 500);
        // In production, you would send this to your backend first:
        // fetch('/api/register', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(data)
        // })
        // .then(response => response.json())
        // .then(result => {
        //     sessionStorage.setItem('registrationData', JSON.stringify(data));
        //     window.location.href = '../payment/index.html';
        // })
        // .catch(error => {
        //     this.showError('Registration failed. Please try again.');
        // });
    }
}
// Initialize the registration manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RegistrationManager();
});
