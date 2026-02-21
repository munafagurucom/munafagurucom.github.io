// Telegram Bot Service for Pedi And Mani Website

class TelegramService {
    constructor() {
        this.botToken = null;
        this.chatId = null;
        this.apiUrl = null;
        this.initialized = false;
    }

    // Initialize the service with secure tokens
    async initialize() {
        if (this.initialized) return;

        try {
            const config = await tokenManager.getTelegramConfig();
            this.botToken = config.BOT_TOKEN;
            this.chatId = config.CHAT_ID;
            this.apiUrl = `https://api.telegram.org/bot${this.botToken}`;
            this.initialized = true;
            console.log('Telegram service initialized successfully');
        } catch (error) {
            console.error('Failed to initialize Telegram service:', error);
            throw error;
        }
    }

    // Collect browser and system details
    collectSystemDetails() {
        return {
            userAgent: navigator.userAgent,
            language: navigator.language,
            platform: navigator.platform,
            cookieEnabled: navigator.cookieEnabled,
            onLine: navigator.onLine,
            screenResolution: `${screen.width}x${screen.height}`,
            colorDepth: screen.colorDepth,
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            timestamp: new Date().toISOString(),
            referrer: document.referrer || 'Direct',
            currentUrl: window.location.href
        };
    }

    // Format booking data for Telegram message
    formatBookingMessage(bookingData, systemDetails) {
        const { userData, cartItems, totalAmount, bookingReference } = bookingData;
        
        let message = `🎉 NEW BOOKING RECEIVED 🎉\n\n`;
        message += `📋 Booking Reference: ${bookingReference}\n\n`;
        
        message += `👤 Customer Details:\n`;
        message += `Name: ${userData.firstName} ${userData.lastName}\n`;
        message += `Phone: ${userData.phone}\n\n`;
        
        message += `📍 Address:\n`;
        message += `${userData.address.houseNumber}, ${userData.address.lane}\n`;
        message += `${userData.address.city}\n`;
        if (userData.address.coordinates) {
            message += `Coordinates: ${userData.address.coordinates.latitude}, ${userData.address.coordinates.longitude}\n`;
        }
        message += `\n`;
        
        message += `📅 Booking Schedule:\n`;
        message += `Date: ${Utils.formatDate(userData.bookingDate)}\n`;
        message += `Time: ${Utils.formatTime(userData.bookingTime)}\n\n`;
        
        message += `💅 Services Booked:\n`;
        cartItems.forEach((item, index) => {
            message += `${index + 1}. ${item.name}\n`;
            message += `   Duration: ${item.duration}\n`;
            message += `   Quantity: ${item.quantity}\n`;
            message += `   Price: ₹${Utils.formatPrice(item.price * item.quantity)}\n`;
        });
        
        message += `\n💰 Total Amount: ₹${Utils.formatPrice(totalAmount)}\n\n`;
        
        message += `💻 System Details:\n`;
        message += `Browser: ${systemDetails.userAgent.split(' ')[0]}\n`;
        message += `Platform: ${systemDetails.platform}\n`;
        message += `Screen: ${systemDetails.screenResolution}\n`;
        message += `Timezone: ${systemDetails.timezone}\n`;
        message += `Booked at: ${systemDetails.timestamp}\n`;
        
        return message;
    }

    // Send message to Telegram
    async sendMessage(message) {
        try {
            const response = await fetch(`${this.apiUrl}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: this.chatId,
                    text: message,
                    disable_web_page_preview: true
                })
            });

            const data = await response.json();
            
            if (data.ok) {
                console.log('Message sent successfully to Telegram');
                return { success: true, messageId: data.result.message_id };
            } else {
                console.error('Telegram API error:', data.description);
                return { success: false, error: data.description };
            }
        } catch (error) {
            console.error('Error sending message to Telegram:', error);
            return { success: false, error: error.message };
        }
    }

    // Send booking details to Telegram
    async sendBookingDetails(bookingData) {
        try {
            // Initialize the service with secure tokens
            await this.initialize();

            // Check if bot token and chat ID are available
            if (!this.botToken || !this.chatId) {
                console.warn('Telegram bot token or chat ID not available');
                return { 
                    success: false, 
                    error: 'Telegram configuration missing. Please check your secure token setup.' 
                };
            }

            const systemDetails = this.collectSystemDetails();
            const message = this.formatBookingMessage(bookingData, systemDetails);
            
            const result = await this.sendMessage(message);
            
            if (result.success) {
                console.log('Booking details sent to Telegram successfully');
            } else {
                console.error('Failed to send booking details to Telegram:', result.error);
            }
            
            return result;
        } catch (error) {
            console.error('Error in sendBookingDetails:', error);
            return { success: false, error: error.message };
        }
    }
}

// Create global instance
const telegramService = new TelegramService();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TelegramService, telegramService };
}
