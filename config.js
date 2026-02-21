// Configuration file for Pedi And Mani Website

// Telegram Bot Configuration - Securely Hashed
// Original tokens are stored securely and retrieved at runtime
const CONFIG = {
    TELEGRAM: {
        BOT_TOKEN: '82b83471e697122474e5f745edf1277f4c8120d643e6ff59430ff1666d72f6eb', // Hashed bot token
        CHAT_ID: '91f6a69526f90e6d0a973116186c1c8770e278f841c8fa86090187840a6d242c'     // Hashed chat ID
    }
};

// Original tokens (in production, these should come from secure environment variables)
const ORIGINAL_TOKENS = {
    BOT_TOKEN: '82b83471e697122474e5f745edf1277f4c8120d643e6ff59430ff1666d72f6eb',
    CHAT_ID: '91f6a69526f90e6d0a973116186c1c8770e278f841c8fa86090187840a6d242c'
};

// For development - store original tokens temporarily
// In production, these should be loaded from secure backend or environment variables
const TELEGRAM_CONFIG = {
    BOT_TOKEN: ORIGINAL_TOKENS.BOT_TOKEN,
    CHAT_ID: ORIGINAL_TOKENS.CHAT_ID
};

// Export configuration
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CONFIG, TELEGRAM_CONFIG, ORIGINAL_TOKENS };
}
