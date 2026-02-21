// Token Manager for secure token handling

class TokenManager {
    constructor() {
        this.isDevelopment = window.location.hostname === 'localhost' || 
                          window.location.hostname === '127.0.0.1';
        this.originalTokenCache = new Map();
        this.init();
    }

    async init() {
        // Pre-compute original tokens from known values
        await this.precomputeOriginalTokens();
    }

    // Pre-compute original tokens from a known set
    async precomputeOriginalTokens() {
        // Common original tokens that might be used
        const possibleTokens = [
            '1', // Original bot token
            '1', // Original chat ID
            // Add more if needed
        ];

        for (const token of possibleTokens) {
            const hashedToken = await CryptoUtils.createSecureHash(token);
            this.originalTokenCache.set(hashedToken, token);
        }

        console.log('Token cache initialized with', this.originalTokenCache.size, 'entries');
    }

    // Get original token from hashed token
    async getOriginalTokenFromHash(hashedToken) {
        // Check cache first
        if (this.originalTokenCache.has(hashedToken)) {
            return this.originalTokenCache.get(hashedToken);
        }

        // If not in cache, try to find it (this would be slow in production)
        console.warn('Token not found in cache, this might be slow');
        
        // For development, we can try some common tokens
        const commonTokens = [
            '/',
            '/'
        ];

        for (const token of commonTokens) {
            const computedHash = await CryptoUtils.createSecureHash(token);
            if (computedHash === hashedToken) {
                this.originalTokenCache.set(hashedToken, token);
                return token;
            }
        }

        throw new Error('Original token not found for hash: ' + hashedToken.substring(0, 20) + '...');
    }

    // Get original token from storage or hash
    async getOriginalToken(tokenType) {
        try {
            let hashedToken;
            
            if (tokenType === 'botToken') {
                hashedToken = CONFIG.TELEGRAM.BOT_TOKEN;
            } else if (tokenType === 'chatId') {
                hashedToken = CONFIG.TELEGRAM.CHAT_ID;
            } else {
                throw new Error('Invalid token type: ' + tokenType);
            }

            // Get original token from hash
            const originalToken = await this.getOriginalTokenFromHash(hashedToken);
            console.log(`Retrieved ${tokenType}:`, originalToken.substring(0, 10) + '...');
            
            return originalToken;
        } catch (error) {
            console.error('Error getting original token:', error);
            throw error;
        }
    }

    // Get Telegram configuration
    async getTelegramConfig() {
        try {
            const botToken = await this.getOriginalToken('botToken');
            const chatId = await this.getOriginalToken('chatId');

            return {
                BOT_TOKEN: botToken,
                CHAT_ID: chatId
            };
        } catch (error) {
            console.error('Error getting Telegram config:', error);
            throw error;
        }
    }

    // Verify token integrity
    async verifyTokenIntegrity(hashedToken, originalToken) {
        try {
            const computedHash = await CryptoUtils.createSecureHash(originalToken);
            return computedHash === hashedToken;
        } catch (error) {
            console.error('Error verifying token integrity:', error);
            return false;
        }
    }

    // Clear cached tokens
    clearTokens() {
        this.originalTokenCache.clear();
    }
}

// Create global instance
const tokenManager = new TokenManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TokenManager, tokenManager };
}
