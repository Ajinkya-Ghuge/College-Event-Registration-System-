interface RegistrationData {
    event: string;
    fullName: string;
    email: string;
    phone: string;
    college: string;
    teamSize?: number;
    additionalInfo?: string;
}

class RegistrationManager {
    private form: HTMLFormElement;

    constructor() {
        this.form = document.getElementById('registrationForm') as HTMLFormElement;
        this.init();
    }

    private init(): void {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        this.addInputValidation();
    }

    private addInputValidation(): void {
        const phoneInput = document.getElementById('phone') as HTMLInputElement;
        phoneInput.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement;
            target.value = target.value.replace(/[^0-9]/g, '');
        });

        const teamSizeInput = document.getElementById('teamSize') as HTMLInputElement;
        teamSizeInput.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement;
            const value = parseInt(target.value);
            if (value < 1) target.value = '1';
            if (value > 10) target.value = '10';
        });
    }

    private validateForm(data: RegistrationData): boolean {
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

    private showError(message: string): void {
        alert(message);
    }

    private showSuccess(): void {
        let successMsg = document.querySelector('.success-message') as HTMLElement;
        
        if (!successMsg) {
            successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            this.form.parentElement?.insertBefore(successMsg, this.form);
        }

        successMsg.textContent = '✓ Registration successful! We will contact you soon.';
        successMsg.classList.add('show');

        setTimeout(() => {
            successMsg.classList.remove('show');
        }, 5000);
    }

    private handleSubmit(e: Event): void {
        e.preventDefault();

        const formData = new FormData(this.form);
        const data: RegistrationData = {
            event: formData.get('event') as string,
            fullName: formData.get('fullName') as string,
            email: formData.get('email') as string,
            phone: formData.get('phone') as string,
            college: formData.get('college') as string,
            teamSize: formData.get('teamSize') ? parseInt(formData.get('teamSize') as string) : undefined,
            additionalInfo: formData.get('additionalInfo') as string || undefined,
        };

        if (this.validateForm(data)) {
            this.submitRegistration(data);
        }
    }

    private submitRegistration(data: RegistrationData): void {
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
