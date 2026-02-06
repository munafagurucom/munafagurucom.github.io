// Booking Page JavaScript

class BookingPage {
    constructor() {
        this.serviceManager = serviceManager;
        this.cartManager = cartManager;
        this.storageManager = storageManager;
        this.formData = {};
        this.locationData = null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadOrderSummary();
        this.setupFormValidation();
        this.setDateLimits();
        this.updatePayButtonState(); // Initial check to ensure button is properly disabled
    }

    setupEventListeners() {
        // Form submission
        const bookingForm = document.getElementById('bookingForm');
        if (bookingForm) {
            bookingForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmit();
            });
        }

        // Get location button
        const getLocationBtn = document.getElementById('getLocationBtn');
        if (getLocationBtn) {
            getLocationBtn.addEventListener('click', () => {
                this.handleGetLocation();
            });
        }

        // Real-time validation
        const requiredFields = ['firstName', 'lastName', 'houseNumber', 'lane', 'city', 'phone', 'bookingDate', 'bookingTime'];
        requiredFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field) {
                field.addEventListener('blur', () => {
                    this.validateField(fieldId);
                    this.updatePayButtonState(); // Check form validity after each field validation
                });
                field.addEventListener('input', () => {
                    this.clearFieldError(fieldId);
                    this.updatePayButtonState(); // Check form validity on input as well
                });
            }
        });

        // Phone number validation
        const phoneField = document.getElementById('phone');
        if (phoneField) {
            phoneField.addEventListener('input', () => this.validatePhoneFormat());
        }
    }

    loadOrderSummary() {
        const orderSummaryContainer = document.getElementById('orderSummary');
        
        try {
            const bookingData = this.storageManager.getBookingData();
            
            if (!bookingData || !bookingData.cartItems || bookingData.cartItems.length === 0) {
                orderSummaryContainer.innerHTML = `
                    <div class="no-items">
                        <p>No items in booking. Please go back and add services.</p>
                        <button class="btn btn-primary" onclick="window.location.href='index.html'">
                            <i class="fas fa-arrow-left"></i>
                            Back to Services
                        </button>
                    </div>
                `;
                this.disablePayButton();
                return;
            }

            let summaryHTML = '<div class="summary-items">';
            
            bookingData.cartItems.forEach(item => {
                summaryHTML += `
                    <div class="summary-item">
                        <div class="item-info">
                            <h5>${item.name}</h5>
                            <div class="item-details">
                                <span class="duration"><i class="fas fa-clock"></i> ${item.duration}</span>
                                <span class="quantity">Qty: ${item.quantity}</span>
                            </div>
                        </div>
                        <div class="item-price">
                            <span class="offer-price">₹${Utils.formatPrice(item.price * item.quantity)}</span>
                            <span class="actual-price">₹${Utils.formatPrice(item.actualPrice * item.quantity)}</span>
                        </div>
                    </div>
                `;
            });
            
            summaryHTML += '</div>';
            
            summaryHTML += `
                <div class="summary-total">
                    <div class="total-row">
                        <span>Total Amount:</span>
                        <span class="total-amount">₹${Utils.formatPrice(bookingData.totalAmount)}</span>
                    </div>
                    <div class="savings-row">
                        <span>Total Savings:</span>
                        <span class="savings-amount">₹${Utils.formatPrice(this.calculateTotalSavings(bookingData.cartItems))}</span>
                    </div>
                </div>
            `;
            
            orderSummaryContainer.innerHTML = summaryHTML;

        } catch (error) {
            console.error('Error loading order summary:', error);
            Utils.showToast('Error loading order summary', 'error');
        }
    }

    calculateTotalSavings(cartItems) {
        return cartItems.reduce((total, item) => {
            return total + ((item.actualPrice - item.price) * item.quantity);
        }, 0);
    }

    setupFormValidation() {
        // Initial validation state
        this.updatePayButtonState();
    }

    setDateLimits() {
        const bookingDateField = document.getElementById('bookingDate');
        if (bookingDateField) {
            bookingDateField.min = Utils.getMinBookingDate();
            bookingDateField.max = Utils.getMaxBookingDate();
        }
    }

    validateField(fieldId) {
        const field = document.getElementById(fieldId);
        const errorElement = document.getElementById(fieldId + 'Error');
        
        if (!field || !errorElement) return false;

        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        switch (fieldId) {
            case 'firstName':
            case 'lastName':
                isValid = Utils.validateRequired(value);
                errorMessage = 'This field is required';
                break;
            
            case 'houseNumber':
            case 'lane':
            case 'city':
                isValid = Utils.validateRequired(value);
                errorMessage = 'This field is required';
                break;
            
            case 'phone':
                isValid = Utils.validatePhoneNumber(value);
                errorMessage = 'Please enter a valid 10-digit phone number';
                break;
            
            case 'bookingDate':
                isValid = Utils.validateRequired(value) && Utils.isValidBookingDate(value);
                if (!Utils.validateRequired(value)) {
                    errorMessage = 'This field is required';
                } else if (!Utils.isValidBookingDate(value)) {
                    errorMessage = 'Please select a valid future date (tomorrow to 30 days from now)';
                }
                break;
            
            case 'bookingTime':
                isValid = Utils.validateRequired(value);
                errorMessage = 'Please select a booking time';
                break;
        }

        if (!isValid) {
            errorElement.textContent = errorMessage;
            field.classList.add('error');
        } else {
            errorElement.textContent = '';
            field.classList.remove('error');
        }

        return isValid;
    }

    clearFieldError(fieldId) {
        const errorElement = document.getElementById(fieldId + 'Error');
        const field = document.getElementById(fieldId);
        
        if (errorElement) {
            errorElement.textContent = '';
        }
        if (field) {
            field.classList.remove('error');
        }
    }

    validatePhoneFormat() {
        const phoneField = document.getElementById('phone');
        if (phoneField) {
            // Only allow numbers
            phoneField.value = phoneField.value.replace(/[^0-9]/g, '');
            
            // Limit to 10 digits
            if (phoneField.value.length > 10) {
                phoneField.value = phoneField.value.slice(0, 10);
            }
        }
    }

    async handleGetLocation() {
        const locationBtn = document.getElementById('getLocationBtn');
        const locationStatus = document.getElementById('locationStatus');
        
        try {
            locationBtn.disabled = true;
            locationBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Getting Location...';
            locationStatus.textContent = '';
            
            const location = await Utils.getCurrentLocation();
            this.locationData = location;
            
            // Get address from coordinates
            const address = await Utils.getAddressFromCoordinates(location.latitude, location.longitude);
            
            if (address) {
                // Fill address fields
                if (address.houseNumber) {
                    document.getElementById('houseNumber').value = address.houseNumber;
                }
                if (address.lane) {
                    document.getElementById('lane').value = address.lane;
                }
                if (address.city) {
                    document.getElementById('city').value = address.city;
                }
                
                locationStatus.textContent = 'Location fetched successfully!';
                locationStatus.style.color = 'var(--success-color)';
                Utils.showToast('Location fetched successfully', 'success');
            } else {
                locationStatus.textContent = 'Could not fetch address details';
                locationStatus.style.color = 'var(--warning-color)';
                Utils.showToast('Could not fetch address details', 'warning');
            }
            
        } catch (error) {
            console.error('Error getting location:', error);
            locationStatus.textContent = 'Error getting location: ' + error.message;
            locationStatus.style.color = 'var(--danger-color)';
            Utils.showToast('Error getting location', 'error');
        } finally {
            locationBtn.disabled = false;
            locationBtn.innerHTML = '<i class="fas fa-map-marker-alt"></i> Get Location';
        }
    }

    validateForm() {
        const requiredFields = ['firstName', 'lastName', 'houseNumber', 'lane', 'city', 'phone', 'bookingDate', 'bookingTime'];
        let isValid = true;
        
        console.log('=== Form Validation Debug ===');
        
        requiredFields.forEach(fieldId => {
            const fieldValid = this.validateField(fieldId);
            console.log(`Field ${fieldId}: ${fieldValid ? '✓' : '✗'}`);
            if (!fieldValid) {
                isValid = false;
            }
        });
        
        console.log(`Overall form valid: ${isValid}`);
        console.log('==============================');
        
        return isValid;
    }

    collectFormData() {
        return {
            firstName: document.getElementById('firstName').value.trim(),
            lastName: document.getElementById('lastName').value.trim(),
            address: {
                houseNumber: document.getElementById('houseNumber').value.trim(),
                lane: document.getElementById('lane').value.trim(),
                city: document.getElementById('city').value.trim(),
                coordinates: this.locationData ? {
                    latitude: this.locationData.latitude,
                    longitude: this.locationData.longitude
                } : null
            },
            phone: document.getElementById('phone').value.trim(),
            bookingDate: document.getElementById('bookingDate').value,
            bookingTime: document.getElementById('bookingTime').value
        };
    }

    updatePayButtonState() {
        const payBtn = document.getElementById('payBtn');
        if (payBtn) {
            const isValid = this.validateForm();
            payBtn.disabled = !isValid;
        }
    }

    disablePayButton() {
        const payBtn = document.getElementById('payBtn');
        if (payBtn) {
            payBtn.disabled = true;
        }
    }

    async handleFormSubmit() {
        try {
            Utils.showLoading();
            
            if (!this.validateForm()) {
                Utils.showToast('Please fill all required fields correctly', 'error');
                Utils.hideLoading();
                return;
            }

            const formData = this.collectFormData();
            const bookingData = this.storageManager.getBookingData();
            
            if (!bookingData) {
                Utils.showToast('Booking data not found', 'error');
                Utils.hideLoading();
                return;
            }

            // Combine user data with booking data
            const completeBookingData = {
                ...bookingData,
                userData: formData,
                bookingReference: Utils.generateBookingReference(),
                timestamp: new Date().toISOString()
            };

            // Save complete booking data
            const success = this.storageManager.saveBookingData(completeBookingData);
            
            if (success) {
                Utils.hideLoading();
                Utils.showToast('Booking details saved successfully', 'success');
                
                // Redirect to payment page
                setTimeout(() => {
                    window.location.href = 'payment.html';
                }, 1000);
            } else {
                Utils.showToast('Error saving booking details', 'error');
                Utils.hideLoading();
            }

        } catch (error) {
            console.error('Error submitting form:', error);
            Utils.showToast('Error submitting booking form', 'error');
            Utils.hideLoading();
        }
    }
}

// Add booking page specific styles
const bookingStyles = `
    <style>
        .no-items {
            text-align: center;
            padding: 40px 20px;
            color: var(--gray-color);
        }
        
        .no-items p {
            margin-bottom: 20px;
        }
        
        .order-summary {
            background: white;
            border-radius: var(--border-radius);
            padding: 25px;
            box-shadow: var(--box-shadow);
        }
        
        .summary-items {
            margin-bottom: 20px;
        }
        
        .summary-item {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding: 15px 0;
            border-bottom: 1px solid #e9ecef;
        }
        
        .summary-item:last-child {
            border-bottom: none;
        }
        
        .item-info h5 {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--dark-color);
            margin-bottom: 8px;
        }
        
        .item-details {
            display: flex;
            gap: 15px;
            font-size: 0.9rem;
            color: var(--gray-color);
        }
        
        .item-details span {
            display: flex;
            align-items: center;
            gap: 5px;
        }
        
        .item-price {
            text-align: right;
        }
        
        .item-price .offer-price {
            display: block;
            font-size: 1.2rem;
            font-weight: 700;
            color: var(--success-color);
        }
        
        .item-price .actual-price {
            display: block;
            font-size: 0.9rem;
            color: var(--danger-color);
            text-decoration: line-through;
            opacity: 0.8;
        }
        
        .summary-total {
            padding-top: 20px;
            border-top: 2px solid var(--primary-color);
        }
        
        .total-row,
        .savings-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 10px;
        }
        
        .total-row {
            font-size: 1.2rem;
            font-weight: 600;
        }
        
        .savings-row {
            font-size: 0.9rem;
            color: var(--gray-color);
        }
        
        .total-amount {
            color: var(--success-color);
            font-weight: 700;
            font-size: 1.4rem;
        }
        
        .savings-amount {
            color: var(--success-color);
            font-weight: 600;
        }
        
        .location-btn {
            background: var(--info-color);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.95rem;
            font-weight: 500;
            transition: var(--transition);
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        .location-btn:hover:not(:disabled) {
            background: #138496;
            transform: translateY(-2px);
        }
        
        .location-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
        }
        
        .location-status {
            margin-top: 10px;
            font-size: 0.9rem;
            font-weight: 500;
        }
        
        .form-actions {
            text-align: center;
            margin-top: 30px;
        }
        
        .pay-btn {
            background: var(--success-color);
            color: white;
            border: none;
            padding: 15px 40px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 1.2rem;
            font-weight: 600;
            transition: var(--transition);
            display: inline-flex;
            align-items: center;
            gap: 10px;
        }
        
        .pay-btn:hover:not(:disabled) {
            background: #218838;
            transform: translateY(-2px);
        }
        
        .pay-btn:disabled {
            background: var(--gray-color);
            cursor: not-allowed;
            opacity: 0.7;
        }
        
        .form-group input.error,
        .form-group select.error {
            border-color: var(--danger-color);
        }
        
        @media (max-width: 768px) {
            .summary-item {
                flex-direction: column;
                gap: 10px;
            }
            
            .item-price {
                text-align: left;
            }
            
            .item-details {
                flex-direction: column;
                gap: 5px;
            }
            
            .total-row,
            .savings-row {
                flex-direction: column;
                gap: 5px;
                text-align: left;
            }
            
            .total-amount {
                font-size: 1.2rem;
            }
        }
    </style>
`;

// Initialize booking page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add booking specific styles
    document.head.insertAdjacentHTML('beforeend', bookingStyles);
    
    // Initialize booking page
    new BookingPage();
});
