// Payment Page JavaScript

class PaymentPage {
    constructor() {
        this.storageManager = storageManager;
        this.UPI_ID = 'test70@okicici';
        this.WHATSAPP_NUMBER = '+917975133457';
        this.init();
    }

    init() {
        this.loadPaymentDetails();
        this.setupEventListeners();
        this.generatePaymentMessage();
    }

    setupEventListeners() {
        // Payment buttons
        const gpayBtn = document.getElementById('gpayBtn');
        const phonepeBtn = document.getElementById('phonepeBtn');
        const paytmBtn = document.getElementById('paytmBtn');

        if (gpayBtn) {
            gpayBtn.addEventListener('click', () => this.handlePayment('gpay'));
        }

        if (phonepeBtn) {
            phonepeBtn.addEventListener('click', () => this.handlePayment('phonepe'));
        }

        if (paytmBtn) {
            paytmBtn.addEventListener('click', () => this.handlePayment('paytm'));
        }
    }

    loadPaymentDetails() {
        try {
            const bookingData = this.storageManager.getBookingData();
            
            if (!bookingData) {
                Utils.showToast('No booking data found', 'error');
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 2000);
                return;
            }

            // Update payment amount
            const paymentAmount = document.getElementById('paymentAmount');
            const upiAmount = document.getElementById('upiAmount');
            
            if (paymentAmount) {
                paymentAmount.textContent = Utils.formatPrice(bookingData.totalAmount);
            }
            
            if (upiAmount) {
                upiAmount.textContent = Utils.formatPrice(bookingData.totalAmount);
            }

            // Load booking summary
            this.loadBookingSummary(bookingData);

            // Store booking data for payment processing
            this.bookingData = bookingData;

        } catch (error) {
            console.error('Error loading payment details:', error);
            Utils.showToast('Error loading payment details', 'error');
        }
    }

    loadBookingSummary(bookingData) {
        const summaryContainer = document.getElementById('bookingSummary');
        
        if (!summaryContainer) return;

        let summaryHTML = '<div class="summary-content-inner">';
        
        // User information
        if (bookingData.userData) {
            const userData = bookingData.userData;
            summaryHTML += `
                <div class="summary-section">
                    <h4>Customer Information</h4>
                    <div class="info-grid">
                        <div class="info-item">
                            <label>Name:</label>
                            <span>${userData.firstName} ${userData.lastName}</span>
                        </div>
                        <div class="info-item">
                            <label>Phone:</label>
                            <span>${userData.phone}</span>
                        </div>
                        <div class="info-item">
                            <label>Address:</label>
                            <span>${userData.address.houseNumber}, ${userData.address.lane}, ${userData.address.city}</span>
                        </div>
                        ${userData.address.coordinates ? `
                            <div class="info-item">
                                <label>Location:</label>
                                <span>GPS: ${userData.address.coordinates.latitude.toFixed(6)}, ${userData.address.coordinates.longitude.toFixed(6)}</span>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `;
        }

        // Booking information
        if (bookingData.userData && bookingData.userData.bookingDate) {
            const userData = bookingData.userData;
            summaryHTML += `
                <div class="summary-section">
                    <h4>Booking Schedule</h4>
                    <div class="info-grid">
                        <div class="info-item">
                            <label>Date:</label>
                            <span>${Utils.formatDate(userData.bookingDate)}</span>
                        </div>
                        <div class="info-item">
                            <label>Time:</label>
                            <span>${Utils.formatTime(userData.bookingTime)}</span>
                        </div>
                        <div class="info-item">
                            <label>Reference:</label>
                            <span>${bookingData.bookingReference || 'N/A'}</span>
                        </div>
                    </div>
                </div>
            `;
        }

        // Services information
        if (bookingData.cartItems && bookingData.cartItems.length > 0) {
            summaryHTML += `
                <div class="summary-section">
                    <h4>Selected Services</h4>
                    <div class="services-list">
            `;
            
            bookingData.cartItems.forEach(item => {
                summaryHTML += `
                    <div class="service-summary-item">
                        <div class="service-info">
                            <h5>${item.name}</h5>
                            <span class="service-duration">Duration: ${item.duration}</span>
                            <span class="service-quantity">Quantity: ${item.quantity}</span>
                        </div>
                        <div class="service-price">
                            <span class="price">₹${Utils.formatPrice(item.price * item.quantity)}</span>
                        </div>
                    </div>
                `;
            });
            
            summaryHTML += `
                    </div>
                </div>
            `;
        }

        // Total amount
        summaryHTML += `
            <div class="summary-section total-section">
                <div class="total-row">
                    <label>Total Amount:</label>
                    <span class="total-price">₹${Utils.formatPrice(bookingData.totalAmount)}</span>
                </div>
            </div>
        `;

        summaryHTML += '</div>';
        summaryContainer.innerHTML = summaryHTML;
    }

    generatePaymentMessage() {
        if (!this.bookingData) return;

        const message = this.createPaymentMessage();
        const messagePreview = document.getElementById('messagePreview');
        
        if (messagePreview) {
            messagePreview.textContent = message;
        }
    }

    createPaymentMessage() {
        if (!this.bookingData) return '';

        const userData = this.bookingData.userData;
        const cartItems = this.bookingData.cartItems;
        
        let message = '';
        
        // Service IDs and details
        cartItems.forEach((item, index) => {
            message += `-${item.serviceId}X${item.quantity}-`;
        });
        
        // Customer details
        if (userData) {
            message += `Q${userData.firstName}Q${userData.lastName}`;
            message += `Q${userData.phone}`;
            
            if (userData.address.coordinates) {
                message += `Q${userData.address.coordinates.latitude.toFixed(6)},${userData.address.coordinates.longitude.toFixed(6)}`;
            }
            
        }
        
        if (this.bookingData.bookingReference) {
            message += `Q${this.bookingData.bookingReference}`;
        }
        
        return message;
    }

    handlePayment(paymentMethod) {
        try {
            Utils.showLoading();
            
            if (!this.bookingData) {
                Utils.showToast('No booking data found', 'error');
                Utils.hideLoading();
                return;
            }

            const amount = this.bookingData.totalAmount;
            const message = this.createPaymentMessage();
            
            // Generate transaction reference ID using booking reference or timestamp
            const transactionRef = this.bookingData.bookingReference || `ORDER${Date.now()}`;
            
            // Generate app-specific UPI URL
            const upiUrl = Utils.generateUPIURL(
                this.UPI_ID, 
                amount, 
                message, 
                transactionRef,
                paymentMethod
            );
            
            // Store payment info for WhatsApp redirect
            this.storageManager.saveUserData({
                paymentMethod,
                amount,
                upiId: this.UPI_ID,
                message,
                transactionRef,
                bookingData: this.bookingData
            });

            // Open app-specific UPI payment
            window.location.href = upiUrl;
            
            // Set up WhatsApp redirect after payment
            setTimeout(() => {
                this.redirectToWhatsApp();
            }, 5000);

        } catch (error) {
            console.error('Error processing payment:', error);
            Utils.showToast('Error processing payment', 'error');
            Utils.hideLoading();
        }
    }

    redirectToWhatsApp() {
        try {
            const userData = this.storageManager.getUserData();
            
            if (!userData || !userData.message) {
                Utils.showToast('Payment information not found', 'error');
                return;
            }

            const whatsappUrl = Utils.generateWhatsAppURL(this.WHATSAPP_NUMBER, userData.message);
            
            // Clear cart and booking data after successful payment
            this.cartManager.clearCart();
            this.storageManager.clearBookingData();
            
            // Redirect to WhatsApp
            window.location.href = whatsappUrl;

        } catch (error) {
            console.error('Error redirecting to WhatsApp:', error);
            Utils.showToast('Error redirecting to WhatsApp', 'error');
        }
    }
}

// Add payment page specific styles
const paymentStyles = `
    <style>
        .payment-amount {
            background: white;
            border-radius: var(--border-radius);
            padding: 30px;
            box-shadow: var(--box-shadow);
            text-align: center;
            margin-bottom: 30px;
        }
        
        .amount-display h3 {
            color: var(--gray-color);
            font-size: 1.2rem;
            margin-bottom: 15px;
        }
        
        .amount {
            font-size: 3rem;
            font-weight: 700;
            color: var(--success-color);
            display: block;
        }
        
        .payment-options {
            background: white;
            border-radius: var(--border-radius);
            padding: 30px;
            box-shadow: var(--box-shadow);
            margin-bottom: 30px;
        }
        
        .payment-options h3 {
            color: var(--primary-color);
            margin-bottom: 25px;
            font-size: 1.4rem;
            text-align: center;
        }
        
        .payment-buttons {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
        }
        
        .payment-btn {
            background: white;
            border: 2px solid #e9ecef;
            border-radius: var(--border-radius);
            padding: 20px;
            cursor: pointer;
            transition: var(--transition);
            display: flex;
            align-items: center;
            gap: 15px;
            text-align: left;
        }
        
        .payment-btn:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        .gpay-btn:hover {
            border-color: #4285f4;
            background: #f8f9fa;
        }
        
        .phonepe-btn:hover {
            border-color: #5b21b6;
            background: #f8f9fa;
        }
        
        .paytm-btn:hover {
            border-color: #0033a0;
            background: #f8f9fa;
        }
        
        .payment-icon {
            width: 50px;
            height: 50px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.5rem;
        }
        
        .gpay-btn .payment-icon {
            background: #e8f0fe;
            color: #4285f4;
        }
        
        .phonepe-btn .payment-icon {
            background: #f3e8ff;
            color: #5b21b6;
        }
        
        .paytm-btn .payment-icon {
            background: #e6f7ff;
            color: #0033a0;
        }
        
        .payment-text {
            flex: 1;
        }
        
        .payment-name {
            display: block;
            font-weight: 600;
            font-size: 1.1rem;
            color: var(--dark-color);
            margin-bottom: 5px;
        }
        
        .payment-desc {
            display: block;
            color: var(--gray-color);
            font-size: 0.9rem;
        }
        
        .payment-details {
            background: white;
            border-radius: var(--border-radius);
            padding: 30px;
            box-shadow: var(--box-shadow);
            margin-bottom: 30px;
        }
        
        .payment-details h3 {
            color: var(--primary-color);
            margin-bottom: 20px;
            font-size: 1.3rem;
        }
        
        .payment-info {
            display: flex;
            flex-direction: column;
            gap: 15px;
        }
        
        .info-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 12px 0;
            border-bottom: 1px solid #e9ecef;
        }
        
        .info-row:last-child {
            border-bottom: none;
        }
        
        .info-row label {
            font-weight: 500;
            color: var(--gray-color);
        }
        
        .info-row span {
            font-weight: 600;
            color: var(--dark-color);
        }
        
        .message-preview {
            background: var(--light-color);
            padding: 15px;
            border-radius: 8px;
            font-size: 0.9rem;
            line-height: 1.5;
            max-height: 200px;
            overflow-y: auto;
            white-space: pre-wrap;
        }
        
        .booking-summary {
            background: white;
            border-radius: var(--border-radius);
            padding: 30px;
            box-shadow: var(--box-shadow);
        }
        
        .booking-summary h3 {
            color: var(--primary-color);
            margin-bottom: 20px;
            font-size: 1.3rem;
        }
        
        .summary-content-inner {
            display: flex;
            flex-direction: column;
            gap: 25px;
        }
        
        .summary-section {
            border-bottom: 1px solid #e9ecef;
            padding-bottom: 20px;
        }
        
        .summary-section:last-child {
            border-bottom: none;
            padding-bottom: 0;
        }
        
        .summary-section h4 {
            color: var(--dark-color);
            font-size: 1.1rem;
            margin-bottom: 15px;
            font-weight: 600;
        }
        
        .info-grid {
            display: grid;
            gap: 10px;
        }
        
        .info-item {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 10px;
        }
        
        .info-item label {
            font-weight: 500;
            color: var(--gray-color);
            min-width: 100px;
        }
        
        .info-item span {
            color: var(--dark-color);
            text-align: right;
            flex: 1;
        }
        
        .services-list {
            display: flex;
            flex-direction: column;
            gap: 12px;
        }
        
        .service-summary-item {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            padding: 12px;
            background: var(--light-color);
            border-radius: 8px;
        }
        
        .service-info h5 {
            font-size: 1rem;
            font-weight: 600;
            color: var(--dark-color);
            margin-bottom: 5px;
        }
        
        .service-duration,
        .service-quantity {
            display: block;
            font-size: 0.85rem;
            color: var(--gray-color);
            margin-bottom: 2px;
        }
        
        .service-price {
            text-align: right;
        }
        
        .service-price .price {
            font-weight: 600;
            color: var(--success-color);
            font-size: 1.1rem;
        }
        
        .total-section {
            background: linear-gradient(135deg, rgba(214, 51, 132, 0.1), rgba(255, 107, 157, 0.1));
            padding: 20px;
            border-radius: 8px;
            margin-top: 10px;
        }
        
        .total-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .total-row label {
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--dark-color);
        }
        
        .total-price {
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--success-color);
        }
        
        @media (max-width: 768px) {
            .amount {
                font-size: 2.5rem;
            }
            
            .payment-buttons {
                grid-template-columns: 1fr;
            }
            
            .payment-btn {
                padding: 15px;
            }
            
            .info-item {
                flex-direction: column;
                gap: 5px;
            }
            
            .info-item label,
            .info-item span {
                text-align: left;
            }
            
            .service-summary-item {
                flex-direction: column;
                gap: 10px;
            }
            
            .service-price {
                text-align: left;
            }
            
            .total-row {
                flex-direction: column;
                gap: 10px;
                text-align: center;
            }
        }
    </style>
`;

// Initialize payment page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add payment specific styles
    document.head.insertAdjacentHTML('beforeend', paymentStyles);
    
    // Initialize payment page
    new PaymentPage();
});
