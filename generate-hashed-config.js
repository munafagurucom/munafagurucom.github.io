// Script to generate hashed configuration
// Run this script once to generate hashed tokens
// Then copy the output to your config.js

// Import crypto utilities (for Node.js environment)
const crypto = require('crypto');

// Node.js version of crypto utilities
class NodeCryptoUtils {
    static hashToHex(str) {
        return crypto.createHash('sha256').update(str).digest('hex');
    }

    static async createSecureHash(originalToken) {
        try {
            // Round 1: Hash original token
            let currentHash = this.hashToHex(originalToken);
            console.log(`Round 1: ${currentHash}`);
            
            // Round 2: Add salt and hash again
            const salted1 = currentHash + 'PediAndMani.com';
            currentHash = this.hashToHex(salted1);
            console.log(`Round 2: ${currentHash}`);
            
            // Round 3: Add salt and hash again
            const salted2 = currentHash + 'PediAndMani.com';
            currentHash = this.hashToHex(salted2);
            console.log(`Round 3: ${currentHash}`);
            
            // Round 4: Add salt and hash again
            const salted3 = currentHash + 'PediAndMani.com';
            currentHash = this.hashToHex(salted3);
            console.log(`Round 4: ${currentHash}`);
            
            return currentHash;
        } catch (error) {
            console.error('Error creating secure hash:', error);
            throw error;
        }
    }
}

// Your actual tokens
const ORIGINAL_BOT_TOKEN = '8387579721:AAG1w8-sj3YyDoHsXitHngz1ij45YVh27GU';
const ORIGINAL_CHAT_ID = '8144183913';

// Generate hashed tokens
async function generateHashedConfig() {
    try {
        console.log('Generating hashed configuration...\n');
        
        const hashedBotToken = await NodeCryptoUtils.createSecureHash(ORIGINAL_BOT_TOKEN);
        const hashedChatId = await NodeCryptoUtils.createSecureHash(ORIGINAL_CHAT_ID);
        
        console.log('\n=== HASHED CONFIGURATION ===');
        console.log('Copy this to your config.js:\n');
        
        console.log(`const CONFIG = {
    TELEGRAM: {
        BOT_TOKEN: '${hashedBotToken}',
        CHAT_ID: '${hashedChatId}'
    }
};`);
        
        console.log('\n=== ORIGINAL TOKENS (KEEP SECURE) ===');
        console.log('Store these securely for development:');
        console.log(`BOT_TOKEN: '${ORIGINAL_BOT_TOKEN}'`);
        console.log(`CHAT_ID: '${ORIGINAL_CHAT_ID}'`);
        
    } catch (error) {
        console.error('Error generating hashed config:', error);
    }
}

// Run the generation
generateHashedConfig();
