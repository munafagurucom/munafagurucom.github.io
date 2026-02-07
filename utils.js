// Utility Functions

class Utils {
    // Format currency
    static formatCurrency(amount) {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    // Format price without currency symbol
    static formatPrice(amount) {
        return amount.toLocaleString('en-IN');
    }

    // Generate star rating HTML
    static generateStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
        
        let starsHTML = '';
        
        // Full stars
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fas fa-star"></i>';
        }
        
        // Half star
        if (hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt"></i>';
        }
        
        // Empty stars
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="far fa-star"></i>';
        }
        
        return starsHTML;
    }

    // Debounce function
    static debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Throttle function
    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    // Show loading overlay
    static showLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.style.display = 'flex';
        }
    }

    // Hide loading overlay
    static hideLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }

    // Show toast notification
    static showToast(message, type = 'info', duration = 3000) {
        // Create toast element if it doesn't exist
        let toast = document.getElementById('toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'toast';
            toast.className = 'toast';
            document.body.appendChild(toast);
        }

        // Set message and type
        toast.textContent = message;
        toast.className = `toast toast-${type}`;
        toast.style.display = 'block';

        // Auto hide after duration
        setTimeout(() => {
            toast.style.display = 'none';
        }, duration);
    }

    // Validate phone number (10 digits)
    static validatePhoneNumber(phone) {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phone);
    }

    // Validate email
    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Validate required field
    static validateRequired(value) {
        return value && value.trim().length > 0;
    }

    // Get current location (GPS)
    static async getCurrentLocation() {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject(new Error('Geolocation is not supported by this browser'));
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        accuracy: position.coords.accuracy
                    });
                },
                (error) => {
                    reject(new Error('Unable to retrieve location: ' + error.message));
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0
                }
            );
        });
    }

    // Get address from coordinates (reverse geocoding)
    static async getAddressFromCoordinates(lat, lng) {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
            const data = await response.json();
            
            if (data && data.address) {
                return {
                    houseNumber: data.address.house_number || '',
                    lane: data.address.road || data.address.street || '',
                    area: data.address.suburb || data.address.neighbourhood || '',
                    city: data.address.city || data.address.town || data.address.village || '',
                    pincode: data.address.postcode || '',
                    fullAddress: data.display_name || ''
                };
            }
            return null;
        } catch (error) {
            console.error('Error getting address from coordinates:', error);
            return null;
        }
    }

    // Generate UPI payment URL with app-specific support
    static generateUPIURL(upiId, amount, message, transactionRef = null, paymentApp = null) {
        const encodedMessage = encodeURIComponent(message);
        const merchantName = 'Pedi%20And%20Mani';
        const currency = 'INR';
        
        // Generate transaction reference if not provided
        const tr = transactionRef || `ORDER${Date.now()}`;
        
        // Base UPI parameters according to NPCI specification
        const baseParams = `pa=${upiId}&pn=${merchantName}&am=${amount}&tr=${tr}&tn=${encodedMessage}&cu=${currency}`;
        
        // App-specific deep link prefixes
        const appPrefixes = {
            'gpay': 'tez://upi/pay',
            'phonepe': 'phonepe://pay',
            'paytm': 'paytmmp://pay',
            'default': 'upi://pay'
        };
        
        const prefix = appPrefixes[paymentApp] || appPrefixes['default'];
        return `${prefix}?${baseParams}`;
    }

    // Generate WhatsApp URL
    static generateWhatsAppURL(phoneNumber, message) {
        const encodedMessage = encodeURIComponent(message);
        return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    }

    // Format date for display
    static formatDate(date) {
        return new Date(date).toLocaleDateString('en-IN', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Format time for display
    static formatTime(time) {
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour > 12 ? hour - 12 : hour;
        return `${displayHour}:${minutes} ${ampm}`;
    }

    // Get minimum date for booking (tomorrow)
    static getMinBookingDate() {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return tomorrow.toISOString().split('T')[0];
    }

    // Get maximum date for booking (30 days from now)
    static getMaxBookingDate() {
        const maxDate = new Date();
        maxDate.setDate(maxDate.getDate() + 30);
        return maxDate.toISOString().split('T')[0];
    }

    // Check if date is valid for booking
    static isValidBookingDate(dateString) {
        const date = new Date(dateString);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const minDate = new Date(today);
        minDate.setDate(minDate.getDate() + 1);
        
        const maxDate = new Date(today);
        maxDate.setDate(maxDate.getDate() + 30);
        
        return date >= minDate && date <= maxDate;
    }

    // Generate booking reference number
    static generateBookingReference() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `PM${timestamp}${random}`;
    }

    // Copy text to clipboard
    static async copyToClipboard(text) {
        try {
            if (navigator.clipboard && window.isSecureContext) {
                await navigator.clipboard.writeText(text);
                return true;
            } else {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = text;
                textArea.style.position = 'fixed';
                textArea.style.left = '-999999px';
                textArea.style.top = '-999999px';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();
                const result = document.execCommand('copy');
                textArea.remove();
                return result;
            }
        } catch (error) {
            console.error('Error copying to clipboard:', error);
            return false;
        }
    }

    // Smooth scroll to element
    static scrollToElement(element, offset = 0) {
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }

    // Check if element is in viewport
    static isElementInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Get URL parameters
    static getUrlParameters() {
        const params = {};
        const urlParams = new URLSearchParams(window.location.search);
        for (const [key, value] of urlParams) {
            params[key] = value;
        }
        return params;
    }

    // Set URL parameter
    static setUrlParameter(key, value) {
        const url = new URL(window.location);
        url.searchParams.set(key, value);
        window.history.replaceState({}, '', url);
    }

    // Remove URL parameter
    static removeUrlParameter(key) {
        const url = new URL(window.location);
        url.searchParams.delete(key);
        window.history.replaceState({}, '', url);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Utils };
}
