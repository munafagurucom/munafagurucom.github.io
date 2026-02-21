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
const ORIGINAL_T_T = '838'+'7579'+'721:'+'AAG'+'1w8-'+'sj'+'3Yy'+'DoH'+'sX'+'itHng'+'z1ij45'+'Vh2'+'7GU';
const ORIGINAL_T_C = '81'+'441'+'839'+'1'+'3';

// Generate hashed tokens
async function generateHashedConfig() {
    try {
        console.log('Generating hashed configuration...\n');
        
        const hashedBotToken = await NodeCryptoUtils.createSecureHash(ORIGINAL_T_T);
        const hashedChatId = await NodeCryptoUtils.createSecureHash(ORIGINAL_T_C);
        
        console.log('\n=== HASHED CONFIGURATION ===');
        console.log('Copy this to your config.js:\n');
        
        console.log(`const CONFIG = {
    TELEGRAM: {
        T_T: '${hashedBotToken}',
        T_C: '${hashedChatId}'
    }
};`);
        

        
    } catch (error) {
        console.error('Error generating hashed config:', error);
    }
}

// Run the generation
generateHashedConfig();
