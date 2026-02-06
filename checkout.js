// Checkout Page JavaScript

class CheckoutPage {
    constructor() {
        this.serviceManager = serviceManager;
        this.cartManager = cartManager;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadCartItems();
        this.updateCartSummary();
    }

    setupEventListeners() {
        // Back button
        const backBtn = document.getElementById('backBtn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                window.location.href = 'index.html';
            });
        }

        // Schedule button
        const scheduleBtn = document.getElementById('scheduleBtn');
        if (scheduleBtn) {
            scheduleBtn.addEventListener('click', () => {
                this.proceedToBooking();
            });
        }
    }

    loadCartItems() {
        const cartItemsContainer = document.getElementById('cartItems');
        
        try {
            const cartItems = this.cartManager.getCartItemsWithDetails();
            
            if (cartItems.length === 0) {
                cartItemsContainer.innerHTML = `
                    <div class="empty-cart">
                        <i class="fas fa-shopping-cart"></i>
                        <h3>Your cart is empty</h3>
                        <p>Add some services to get started!</p>
                        <button class="btn btn-primary" onclick="window.location.href='index.html'">
                            <i class="fas fa-arrow-left"></i>
                            Back to Services
                        </button>
                    </div>
                `;
                this.disableScheduleButton();
                return;
            }

            cartItemsContainer.innerHTML = '';
            
            cartItems.forEach(item => {
                const cartItemElement = this.createCartItemElement(item);
                cartItemsContainer.appendChild(cartItemElement);
            });

        } catch (error) {
            console.error('Error loading cart items:', error);
            Utils.showToast('Error loading cart items', 'error');
        }
    }

    createCartItemElement(item) {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.dataset.serviceId = item.serviceId;

        const savings = (item.actualPrice - item.price) * item.quantity;

        cartItem.innerHTML = `
            <div class="cart-item-header">
                <div class="item-info">
                    <h4 class="item-name">${item.name}</h4>
                    <div class="item-duration">
                        <i class="fas fa-clock"></i>
                        <span>${item.duration}</span>
                    </div>
                </div>
                <div class="item-actions">
                    <button class="remove-item-btn" data-service-id="${item.serviceId}">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            
            <div class="cart-item-details">
                <div class="item-tags">
                    ${item.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
                
                <div class="item-pricing">
                    <div class="price-row">
                        <span class="quantity-label">Quantity: ${item.quantity}</span>
                        <div class="price-display">
                            <span class="offer-price">₹${Utils.formatPrice(item.price * item.quantity)}</span>
                            <span class="actual-price">₹${Utils.formatPrice(item.actualPrice * item.quantity)}</span>
                        </div>
                    </div>
                    ${savings > 0 ? `
                        <div class="savings-row">
                            <span class="savings-label">You save:</span>
                            <span class="savings-amount">₹${Utils.formatPrice(savings)}</span>
                        </div>
                    ` : ''}
                </div>
            </div>
            
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="decrease-btn" data-service-id="${item.serviceId}">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="increase-btn" data-service-id="${item.serviceId}">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        `;

        // Add event listeners
        this.attachCartItemEventListeners(cartItem, item);

        return cartItem;
    }

    attachCartItemEventListeners(cartItemElement, item) {
        // Remove item button
        const removeBtn = cartItemElement.querySelector('.remove-item-btn');
        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
                this.removeItem(item.serviceId);
            });
        }

        // Increase quantity button
        const increaseBtn = cartItemElement.querySelector('.increase-btn');
        if (increaseBtn) {
            increaseBtn.addEventListener('click', () => {
                this.updateQuantity(item.serviceId, item.quantity + 1);
            });
        }

        // Decrease quantity button
        const decreaseBtn = cartItemElement.querySelector('.decrease-btn');
        if (decreaseBtn) {
            decreaseBtn.addEventListener('click', () => {
                if (item.quantity > 1) {
                    this.updateQuantity(item.serviceId, item.quantity - 1);
                } else {
                    this.removeItem(item.serviceId);
                }
            });
        }
    }

    removeItem(serviceId) {
        const result = this.cartManager.removeFromCart(serviceId);
        
        if (result.success) {
            Utils.showToast('Service removed from cart', 'info');
            this.loadCartItems();
            this.updateCartSummary();
        } else {
            Utils.showToast(result.error || 'Error removing item', 'error');
        }
    }

    updateQuantity(serviceId, quantity) {
        const result = this.cartManager.updateQuantity(serviceId, quantity);
        
        if (result.success) {
            Utils.showToast('Quantity updated', 'success');
            this.loadCartItems();
            this.updateCartSummary();
        } else {
            Utils.showToast(result.error || 'Error updating quantity', 'error');
        }
    }

    updateCartSummary() {
        const cartSummary = this.cartManager.getCartSummary();
        
        // Update total amount
        const totalAmountElement = document.getElementById('totalAmount');
        if (totalAmountElement) {
            totalAmountElement.textContent = Utils.formatPrice(cartSummary.total);
        }

        // Update schedule button state
        const scheduleBtn = document.getElementById('scheduleBtn');
        if (scheduleBtn) {
            if (cartSummary.canCheckout && cartSummary.itemCount > 0) {
                scheduleBtn.disabled = false;
                scheduleBtn.classList.remove('disabled');
            } else {
                scheduleBtn.disabled = true;
                scheduleBtn.classList.add('disabled');
            }
        }
    }

    disableScheduleButton() {
        const scheduleBtn = document.getElementById('scheduleBtn');
        if (scheduleBtn) {
            scheduleBtn.disabled = true;
            scheduleBtn.classList.add('disabled');
        }
    }

    proceedToBooking() {
        try {
            const validation = this.cartManager.validateCart();
            
            if (!validation.isValid) {
                Utils.showToast(validation.errors.join(', '), 'error');
                return;
            }

            // Save cart data for booking page
            const bookingData = {
                cartItems: this.cartManager.getCartItemsWithDetails(),
                totalAmount: this.cartManager.getCartTotal(),
                timestamp: new Date().toISOString()
            };

            const success = storageManager.saveBookingData(bookingData);
            
            if (success) {
                window.location.href = 'booking.html';
            } else {
                Utils.showToast('Error preparing booking', 'error');
            }

        } catch (error) {
            console.error('Error proceeding to booking:', error);
            Utils.showToast('Error preparing booking', 'error');
        }
    }
}

// Add checkout page specific styles
const checkoutStyles = `
    <style>
        .empty-cart {
            text-align: center;
            padding: 60px 20px;
            color: var(--gray-color);
        }
        
        .empty-cart i {
            font-size: 4rem;
            margin-bottom: 20px;
            opacity: 0.5;
        }
        
        .empty-cart h3 {
            font-size: 1.5rem;
            margin-bottom: 10px;
            color: var(--dark-color);
        }
        
        .empty-cart p {
            margin-bottom: 30px;
        }
        
        .cart-item {
            background: white;
            border-radius: var(--border-radius);
            padding: 25px;
            margin-bottom: 20px;
            box-shadow: var(--box-shadow);
            transition: var(--transition);
        }
        
        .cart-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
        
        .cart-item-header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 15px;
        }
        
        .item-info h4 {
            font-size: 1.3rem;
            font-weight: 600;
            color: var(--dark-color);
            margin-bottom: 8px;
        }
        
        .item-duration {
            display: flex;
            align-items: center;
            gap: 5px;
            color: var(--gray-color);
            font-size: 0.9rem;
        }
        
        .remove-item-btn {
            background: var(--danger-color);
            color: white;
            border: none;
            padding: 8px 12px;
            border-radius: 8px;
            cursor: pointer;
            transition: var(--transition);
        }
        
        .remove-item-btn:hover {
            background: #c82333;
            transform: translateY(-2px);
        }
        
        .cart-item-details {
            margin-bottom: 20px;
        }
        
        .item-tags {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 15px;
        }
        
        .item-tags .tag {
            background: var(--secondary-color);
            color: var(--primary-color);
            padding: 4px 12px;
            border-radius: 15px;
            font-size: 0.8rem;
            font-weight: 500;
        }
        
        .item-pricing {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }
        
        .price-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .quantity-label {
            color: var(--gray-color);
            font-weight: 500;
        }
        
        .price-display {
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .price-display .offer-price {
            font-size: 1.4rem;
            font-weight: 700;
            color: var(--success-color);
        }
        
        .price-display .actual-price {
            font-size: 1.1rem;
            color: var(--danger-color);
            text-decoration: line-through;
            opacity: 0.8;
        }
        
        .savings-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 8px;
            border-top: 1px solid #e9ecef;
        }
        
        .savings-label {
            color: var(--gray-color);
            font-size: 0.9rem;
        }
        
        .savings-amount {
            color: var(--success-color);
            font-weight: 600;
        }
        
        .cart-item-controls {
            display: flex;
            justify-content: center;
        }
        
        .quantity-controls {
            display: flex;
            align-items: center;
            gap: 15px;
            background: var(--light-color);
            padding: 8px;
            border-radius: 25px;
        }
        
        .quantity-controls button {
            background: var(--primary-color);
            color: white;
            border: none;
            width: 35px;
            height: 35px;
            border-radius: 50%;
            cursor: pointer;
            transition: var(--transition);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .quantity-controls button:hover {
            background: #b02a5d;
            transform: translateY(-2px);
        }
        
        .quantity-controls .quantity {
            font-weight: 600;
            color: var(--primary-color);
            min-width: 30px;
            text-align: center;
            font-size: 1.1rem;
        }
        
        .checkout-summary {
            background: white;
            border-radius: var(--border-radius);
            padding: 30px;
            box-shadow: var(--box-shadow);
            margin-bottom: 30px;
        }
        
        .cart-summary-footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid var(--primary-color);
        }
        
        .total-amount h3 {
            font-size: 1.8rem;
            color: var(--primary-color);
            text-align: right;
        }
        
        .total-amount span {
            color: var(--success-color);
            font-weight: 700;
        }
        
        .checkout-actions {
            display: flex;
            gap: 20px;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
        }
        
        .back-btn {
            background: var(--gray-color);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 1.1rem;
            font-weight: 600;
            transition: var(--transition);
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .back-btn:hover {
            background: #5a6268;
            transform: translateY(-2px);
        }
        
        .schedule-btn {
            background: var(--primary-color);
            color: white;
            border: none;
            padding: 15px 30px;
            border-radius: 25px;
            cursor: pointer;
            font-size: 1.1rem;
            font-weight: 600;
            transition: var(--transition);
            display: flex;
            align-items: center;
            gap: 10px;
        }
        
        .schedule-btn:hover:not(:disabled) {
            background: #b02a5d;
            transform: translateY(-2px);
        }
        
        .schedule-btn:disabled {
            background: var(--gray-color);
            cursor: not-allowed;
            opacity: 0.7;
        }
        
        @media (max-width: 768px) {
            .cart-item-header {
                flex-direction: column;
                gap: 15px;
            }
            
            .item-info h4 {
                font-size: 1.2rem;
            }
            
            .price-row {
                flex-direction: column;
                align-items: flex-start;
                gap: 8px;
            }
            
            .checkout-actions {
                flex-direction: column;
                gap: 15px;
            }
            
            .back-btn,
            .schedule-btn {
                width: 100%;
                justify-content: center;
            }
            
            .total-amount h3 {
                text-align: center;
                font-size: 1.6rem;
            }
        }
    </style>
`;

// Initialize checkout page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Add checkout specific styles
    document.head.insertAdjacentHTML('beforeend', checkoutStyles);
    
    // Initialize checkout page
    new CheckoutPage();
});
