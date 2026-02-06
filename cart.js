// Shopping Cart Management System

class CartManager {
    constructor() {
        this.storageManager = storageManager;
        this.serviceManager = serviceManager;
        this.listeners = [];
        this.MIN_CHECKOUT_AMOUNT = 999;
    }

    // Add event listener for cart changes
    addEventListener(callback) {
        this.listeners.push(callback);
    }

    // Remove event listener
    removeEventListener(callback) {
        this.listeners = this.listeners.filter(listener => listener !== callback);
    }

    // Notify all listeners of cart changes
    notifyListeners(event, data) {
        this.listeners.forEach(callback => {
            try {
                callback(event, data);
            } catch (error) {
                console.error('Error in cart listener:', error);
            }
        });
    }

    // Add service to cart
    addToCart(serviceId, quantity = 1) {
        try {
            const service = this.serviceManager.getServiceById(serviceId);
            if (!service) {
                throw new Error(`Service with ID ${serviceId} not found`);
            }

            const success = this.storageManager.addToCart(service, quantity);
            if (success) {
                const cart = this.getCart();
                this.notifyListeners('itemAdded', { service, cart });
                return { success: true, cart };
            } else {
                throw new Error('Failed to add service to cart');
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            return { success: false, error: error.message };
        }
    }

    // Remove service from cart
    removeFromCart(serviceId) {
        try {
            const service = this.serviceManager.getServiceById(serviceId);
            const success = this.storageManager.removeFromCart(serviceId);
            
            if (success) {
                const cart = this.getCart();
                this.notifyListeners('itemRemoved', { serviceId, cart });
                return { success: true, cart };
            } else {
                throw new Error('Failed to remove service from cart');
            }
        } catch (error) {
            console.error('Error removing from cart:', error);
            return { success: false, error: error.message };
        }
    }

    // Update service quantity
    updateQuantity(serviceId, quantity) {
        try {
            const success = this.storageManager.updateQuantity(serviceId, quantity);
            
            if (success) {
                const cart = this.getCart();
                this.notifyListeners('quantityUpdated', { serviceId, quantity, cart });
                return { success: true, cart };
            } else {
                throw new Error('Failed to update quantity');
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
            return { success: false, error: error.message };
        }
    }

    // Get current cart
    getCart() {
        return this.storageManager.getCart();
    }

    // Get cart total amount
    getCartTotal() {
        const cart = this.getCart();
        return cart.totalAmount || 0;
    }

    // Get cart item count
    getCartItemCount() {
        return this.storageManager.getCartItemCount();
    }

    // Check if service is in cart
    isServiceInCart(serviceId) {
        return this.storageManager.isServiceInCart(serviceId);
    }

    // Clear entire cart
    clearCart() {
        try {
            const success = this.storageManager.clearCart();
            if (success) {
                this.notifyListeners('cartCleared', {});
                return { success: true };
            } else {
                throw new Error('Failed to clear cart');
            }
        } catch (error) {
            console.error('Error clearing cart:', error);
            return { success: false, error: error.message };
        }
    }

    // Check if checkout is allowed (minimum amount)
    canCheckout() {
        const total = this.getCartTotal();
        return total >= this.MIN_CHECKOUT_AMOUNT;
    }

    // Get cart items with full service details
    getCartItemsWithDetails() {
        const cart = this.getCart();
        const itemsWithDetails = [];

        cart.services.forEach(cartItem => {
            const serviceDetails = this.serviceManager.getServiceById(cartItem.serviceId);
            if (serviceDetails) {
                itemsWithDetails.push({
                    ...cartItem,
                    serviceDetails
                });
            }
        });

        return itemsWithDetails;
    }

    // Calculate savings (difference between actual and offer prices)
    calculateSavings() {
        const cart = this.getCart();
        let totalSavings = 0;

        cart.services.forEach(item => {
            const savings = (item.actualPrice - item.price) * item.quantity;
            totalSavings += savings;
        });

        return totalSavings;
    }

    // Get cart summary for display
    getCartSummary() {
        const cart = this.getCart();
        const itemCount = this.getCartItemCount();
        const total = cart.totalAmount || 0;
        const savings = this.calculateSavings();
        const canCheckout = this.canCheckout();

        return {
            itemCount,
            total,
            savings,
            canCheckout,
            minCheckoutAmount: this.MIN_CHECKOUT_AMOUNT,
            items: cart.services
        };
    }

    // Validate cart before checkout
    validateCart() {
        const cart = this.getCart();
        const errors = [];

        if (!cart.services || cart.services.length === 0) {
            errors.push('Cart is empty');
        }

        if (cart.totalAmount < this.MIN_CHECKOUT_AMOUNT) {
            errors.push(`Minimum order amount is ₹${this.MIN_CHECKOUT_AMOUNT}`);
        }

        // Validate each service still exists
        cart.services.forEach(item => {
            const service = this.serviceManager.getServiceById(item.serviceId);
            if (!service) {
                errors.push(`Service ${item.serviceId} is no longer available`);
            }
        });

        return {
            isValid: errors.length === 0,
            errors
        };
    }

    // Get service quantity in cart
    getServiceQuantity(serviceId) {
        const cart = this.getCart();
        const item = cart.services.find(item => item.serviceId === serviceId);
        return item ? item.quantity : 0;
    }

    // Increment service quantity
    incrementQuantity(serviceId) {
        const currentQuantity = this.getServiceQuantity(serviceId);
        return this.updateQuantity(serviceId, currentQuantity + 1);
    }

    // Decrement service quantity
    decrementQuantity(serviceId) {
        const currentQuantity = this.getServiceQuantity(serviceId);
        if (currentQuantity <= 1) {
            return this.removeFromCart(serviceId);
        } else {
            return this.updateQuantity(serviceId, currentQuantity - 1);
        }
    }

    // Get cart for checkout (with all necessary details)
    getCheckoutCart() {
        const validation = this.validateCart();
        if (!validation.isValid) {
            throw new Error(validation.errors.join(', '));
        }

        return this.getCartItemsWithDetails();
    }
}

// Create global cart manager instance
const cartManager = new CartManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CartManager, cartManager };
}
