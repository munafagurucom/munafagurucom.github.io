// Local Storage Management System

class StorageManager {
    constructor() {
        this.CART_KEY = 'pediManiCart';
        this.USER_DATA_KEY = 'pediManiUserData';
        this.BOOKING_DATA_KEY = 'pediManiBookingData';
    }

    // Cart Storage Methods
    getCart() {
        try {
            const cartData = localStorage.getItem(this.CART_KEY);
            return cartData ? JSON.parse(cartData) : { services: [], totalAmount: 0, lastUpdated: null };
        } catch (error) {
            console.error('Error reading cart from storage:', error);
            return { services: [], totalAmount: 0, lastUpdated: null };
        }
    }

    saveCart(cartData) {
        try {
            const dataToSave = {
                ...cartData,
                lastUpdated: new Date().toISOString()
            };
            localStorage.setItem(this.CART_KEY, JSON.stringify(dataToSave));
            return true;
        } catch (error) {
            console.error('Error saving cart to storage:', error);
            return false;
        }
    }

    addToCart(service, quantity = 1) {
        try {
            const cart = this.getCart();
            const existingServiceIndex = cart.services.findIndex(item => item.serviceId === service.serviceId);
            
            if (existingServiceIndex !== -1) {
                // Update existing service quantity
                cart.services[existingServiceIndex].quantity += quantity;
            } else {
                // Add new service to cart
                cart.services.push({
                    serviceId: service.serviceId,
                    name: service.name,
                    price: service.offerPrice,
                    actualPrice: service.actualPrice,
                    duration: service.duration,
                    quantity: quantity,
                    tags: service.tags
                });
            }
            
            // Recalculate total
            cart.totalAmount = cart.services.reduce((total, item) => total + (item.price * item.quantity), 0);
            
            return this.saveCart(cart);
        } catch (error) {
            console.error('Error adding to cart:', error);
            return false;
        }
    }

    removeFromCart(serviceId) {
        try {
            const cart = this.getCart();
            cart.services = cart.services.filter(item => item.serviceId !== serviceId);
            
            // Recalculate total
            cart.totalAmount = cart.services.reduce((total, item) => total + (item.price * item.quantity), 0);
            
            return this.saveCart(cart);
        } catch (error) {
            console.error('Error removing from cart:', error);
            return false;
        }
    }

    updateQuantity(serviceId, quantity) {
        try {
            const cart = this.getCart();
            const serviceIndex = cart.services.findIndex(item => item.serviceId === serviceId);
            
            if (serviceIndex !== -1) {
                if (quantity <= 0) {
                    cart.services.splice(serviceIndex, 1);
                } else {
                    cart.services[serviceIndex].quantity = quantity;
                }
                
                // Recalculate total
                cart.totalAmount = cart.services.reduce((total, item) => total + (item.price * item.quantity), 0);
                
                return this.saveCart(cart);
            }
            return false;
        } catch (error) {
            console.error('Error updating quantity:', error);
            return false;
        }
    }

    clearCart() {
        try {
            localStorage.removeItem(this.CART_KEY);
            return true;
        } catch (error) {
            console.error('Error clearing cart:', error);
            return false;
        }
    }

    getCartItemCount() {
        const cart = this.getCart();
        return cart.services.reduce((count, item) => count + item.quantity, 0);
    }

    isServiceInCart(serviceId) {
        const cart = this.getCart();
        return cart.services.some(item => item.serviceId === serviceId);
    }

    // User Data Storage Methods
    saveUserData(userData) {
        try {
            localStorage.setItem(this.USER_DATA_KEY, JSON.stringify(userData));
            return true;
        } catch (error) {
            console.error('Error saving user data:', error);
            return false;
        }
    }

    getUserData() {
        try {
            const userData = localStorage.getItem(this.USER_DATA_KEY);
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error('Error reading user data:', error);
            return null;
        }
    }

    clearUserData() {
        try {
            localStorage.removeItem(this.USER_DATA_KEY);
            return true;
        } catch (error) {
            console.error('Error clearing user data:', error);
            return false;
        }
    }

    // Booking Data Storage Methods
    saveBookingData(bookingData) {
        try {
            const dataToSave = {
                ...bookingData,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem(this.BOOKING_DATA_KEY, JSON.stringify(dataToSave));
            return true;
        } catch (error) {
            console.error('Error saving booking data:', error);
            return false;
        }
    }

    getBookingData() {
        try {
            const bookingData = localStorage.getItem(this.BOOKING_DATA_KEY);
            return bookingData ? JSON.parse(bookingData) : null;
        } catch (error) {
            console.error('Error reading booking data:', error);
            return null;
        }
    }

    clearBookingData() {
        try {
            localStorage.removeItem(this.BOOKING_DATA_KEY);
            return true;
        } catch (error) {
            console.error('Error clearing booking data:', error);
            return false;
        }
    }

    // Utility Methods
    clearAllData() {
        try {
            this.clearCart();
            this.clearUserData();
            this.clearBookingData();
            return true;
        } catch (error) {
            console.error('Error clearing all data:', error);
            return false;
        }
    }

    getStorageSize() {
        try {
            let totalSize = 0;
            for (let key in localStorage) {
                if (localStorage.hasOwnProperty(key)) {
                    totalSize += localStorage[key].length + key.length;
                }
            }
            return totalSize;
        } catch (error) {
            console.error('Error calculating storage size:', error);
            return 0;
        }
    }

    isLocalStorageAvailable() {
        try {
            const test = '__test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch (error) {
            console.error('Local storage not available:', error);
            return false;
        }
    }
}

// Create global storage manager instance
const storageManager = new StorageManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { StorageManager, storageManager };
}
