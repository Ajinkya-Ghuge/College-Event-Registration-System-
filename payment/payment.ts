interface CardPaymentData {
    cardNumber: string;
    cardholderName: string;
    expiryDate: string;
    cvv: string;
}

interface UPIPaymentData {
    upiId: string;
}

interface NetBankingPaymentData {
    bankSelect: string;
}

type PaymentData = CardPaymentData | UPIPaymentData | NetBankingPaymentData;

interface RegistrationData {
    event: string;
    fullName: string;
    email: string;
    phone: string;
    college: string;
    teamSize?: number;
}

class PaymentManager {
    private cardForm: HTMLFormElement;
    private upiForm: HTMLFormElement;
    private netbankingForm: HTMLFormElement;
    private currentMethod: string = 'card';
    private registrationData: RegistrationData | null = null;

    constructor() {
        this.cardForm = document.getElementById('cardForm') as HTMLFormElement;
        this.upiForm = document.getElementById('upiForm') as HTMLFormElement;
        this.netbankingForm = document.getElementById('netbankingForm') as HTMLFormElement;
        this.init();
    }

    private init(): void {
        this.loadRegistrationData();
        this.setupPaymentMethods();
        this.cardForm.addEventListener('submit', (e) => this.handleSubmit(e));
        this.upiForm.addEventListener('submit', (e) => this.handleSubmit(e));
        this.netbankingForm.addEventListener('submit', (e) => this.handleSubmit(e));
        this.addInputFormatting();
    }

    private loadRegistrationData(): void {
        // Get registration data from sessionStorage
        const data = sessionStorage.getItem('registrationData');
        if (data) {
            this.registrationData = JSON.parse(data);
            this.populateOrderSummary();
        }
    }

    private populateOrderSummary(): void {
        if (!this.registrationData) return;

        const eventNameEl = document.getElementById('eventName');
        const userNameEl = document.getElementById('userName');
        const userCollegeEl = document.getElementById('userCollege');
        const teamSizeEl = document.getElementById('teamSize');

        if (eventNameEl) eventNameEl.textContent = this.registrationData.event || 'Tech Quiz Competition';
        if (userNameEl) userNameEl.textContent = this.registrationData.fullName || '-';
        if (userCollegeEl) userCollegeEl.textContent = this.registrationData.college || '-';
        if (teamSizeEl) teamSizeEl.textContent = this.registrationData.teamSize?.toString() || '-';
    }

    private setupPaymentMethods(): void {
        const buttons = document.querySelectorAll('.payment-method-btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const method = button.getAttribute('data-method');
                if (!method) return;

                // Update active button
                buttons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                // Update active form
                const cardForm = document.getElementById('cardForm');
                const upiForm = document.getElementById('upiForm');
                const netbankingForm = document.getElementById('netbankingForm');

                // Hide all forms
                if (cardForm) cardForm.classList.remove('active');
                if (upiForm) upiForm.classList.remove('active');
                if (netbankingForm) netbankingForm.classList.remove('active');

                // Show selected form
                if (method === 'card' && cardForm) {
                    cardForm.classList.add('active');
                } else if (method === 'upi' && upiForm) {
                    upiForm.classList.add('active');
                } else if (method === 'netbanking' && netbankingForm) {
                    netbankingForm.classList.add('active');
                }

                this.currentMethod = method;
            });
        });
    }

    private addInputFormatting(): void {
        // Card number formatting
        const cardNumberInput = document.getElementById('cardNumber') as HTMLInputElement;
        cardNumberInput.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement;
            let value = target.value.replace(/\s/g, '').replace(/[^0-9]/g, '');
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            target.value = formattedValue;
        });

        // Expiry date formatting
        const expiryInput = document.getElementById('expiryDate') as HTMLInputElement;
        expiryInput.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement;
            let value = target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.slice(0, 2) + '/' + value.slice(2, 4);
            }
            target.value = value;
        });

        // CVV formatting
        const cvvInput = document.getElementById('cvv') as HTMLInputElement;
        cvvInput.addEventListener('input', (e) => {
            const target = e.target as HTMLInputElement;
            target.value = target.value.replace(/[^0-9]/g, '');
        });
    }

    private validatePayment(data: PaymentData, method: string): boolean {
        if (method === 'card') {
            const cardData = data as CardPaymentData;
            
            // Card number validation
            const cardNumber = cardData.cardNumber.replace(/\s/g, '');
            if (cardNumber.length < 13 || cardNumber.length > 19) {
                this.showError('Please enter a valid card number');
                return false;
            }

            // Cardholder name validation
            if (!cardData.cardholderName || cardData.cardholderName.trim().length < 3) {
                this.showError('Please enter a valid cardholder name');
                return false;
            }

            // Expiry date validation
            const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
            if (!expiryRegex.test(cardData.expiryDate)) {
                this.showError('Please enter a valid expiry date (MM/YY)');
                return false;
            }

            // Check if card is expired
            const [month, year] = cardData.expiryDate.split('/');
            const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
            const now = new Date();
            if (expiry < now) {
                this.showError('Card has expired');
                return false;
            }

            // CVV validation
            if (cardData.cvv.length < 3) {
                this.showError('Please enter a valid CVV');
                return false;
            }
        } else if (method === 'upi') {
            const upiData = data as UPIPaymentData;
            
            // UPI ID validation
            const upiRegex = /^[\w.-]+@[\w.-]+$/;
            if (!upiRegex.test(upiData.upiId)) {
                this.showError('Please enter a valid UPI ID (e.g., yourname@upi)');
                return false;
            }
        } else if (method === 'netbanking') {
            const netbankingData = data as NetBankingPaymentData;
            
            // Bank selection validation
            if (!netbankingData.bankSelect) {
                this.showError('Please select a bank');
                return false;
            }
        }

        return true;
    }

    private showError(message: string): void {
        alert(message);
    }

    private showSuccessModal(): void {
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.classList.add('show');
            
            // Clear registration data
            sessionStorage.removeItem('registrationData');
        }
    }

    private handleSubmit(e: Event): void {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        let data: PaymentData;

        if (this.currentMethod === 'card') {
            data = {
                cardNumber: formData.get('cardNumber') as string,
                cardholderName: formData.get('cardholderName') as string,
                expiryDate: formData.get('expiryDate') as string,
                cvv: formData.get('cvv') as string,
            } as CardPaymentData;
        } else if (this.currentMethod === 'upi') {
            data = {
                upiId: formData.get('upiId') as string,
            } as UPIPaymentData;
        } else {
            data = {
                bankSelect: formData.get('bankSelect') as string,
            } as NetBankingPaymentData;
        }

        if (this.validatePayment(data, this.currentMethod)) {
            this.processPayment(data);
        }
    }

    private processPayment(data: PaymentData): void {
        console.log('Processing payment:', {
            method: this.currentMethod,
            data: this.currentMethod === 'card' ? { ...(data as CardPaymentData), cvv: '***' } : data,
            registration: this.registrationData
        });

        // Simulate payment processing
        setTimeout(() => {
            this.showSuccessModal();
        }, 1000);

        // In production, you would send this to your payment gateway:
        // fetch('/api/payment', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         payment: data,
        //         registration: this.registrationData
        //     })
        // })
        // .then(response => response.json())
        // .then(result => {
        //     if (result.success) {
        //         this.showSuccessModal();
        //     } else {
        //         this.showError('Payment failed. Please try again.');
        //     }
        // })
        // .catch(error => {
        //     this.showError('Payment processing error. Please try again.');
        // });
    }
}

// Initialize the payment manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PaymentManager();
});
