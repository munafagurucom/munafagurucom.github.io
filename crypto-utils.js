// Crypto utilities for secure token handling

class CryptoUtils {
    // Convert string to Uint8Array
    static stringToUint8Array(str) {
        return new TextEncoder().encode(str);
    }

    // Convert Uint8Array to hex string
    static uint8ArrayToHex(bytes) {
        return Array.from(bytes)
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }

    // Convert hex string to Uint8Array
    static hexToUint8Array(hex) {
        const bytes = new Uint8Array(hex.length / 2);
        for (let i = 0; i < hex.length; i += 2) {
            bytes[i / 2] = parseInt(hex.substr(i, 2), 16);
        }
        return bytes;
    }

    // Hash using Web Crypto API (SHA-256)
    static async hash(data) {
        if (typeof data === 'string') {
            data = this.stringToUint8Array(data);
        }
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        return new Uint8Array(hashBuffer);
    }

    // Hash string and convert to hex
    static async hashToHex(str) {
        const hashBytes = await this.hash(str);
        return this.uint8ArrayToHex(hashBytes);
    }

    // Create secure hash with multiple rounds
    static async createSecureHash(originalToken) {
        try {
            // Round 1: Hash original token
            let currentHash = await this.hashToHex(originalToken);
            
            // Round 2: Add salt and hash again
            const salted1 = currentHash + 'PediAndMani.com';
            currentHash = await this.hashToHex(salted1);
            
            // Round 3: Add salt and hash again
            const salted2 = currentHash + 'PediAndMani.com';
            currentHash = await this.hashToHex(salted2);
            
            // Round 4: Add salt and hash again
            const salted3 = currentHash + 'PediAndMani.com';
            currentHash = await this.hashToHex(salted3);
            
            return currentHash;
        } catch (error) {
            console.error('Error creating secure hash:', error);
            throw error;
        }
    }

    // Reverse the secure hash to get original token
    static async getOriginalToken(hashedToken) {
        try {
            // This is a simplified approach for demonstration
            // In a real-world scenario, you would need a different approach
            // since SHA-256 is a one-way function
            
            // For this implementation, we'll store the original token 
            // in sessionStorage during development
            const storedToken = sessionStorage.getItem('originalToken');
            if (storedToken) {
                return storedToken;
            }
            
            throw new Error('Original token not found. This is expected in production.');
        } catch (error) {
            console.error('Error retrieving original token:', error);
            throw error;
        }
    }

    // Store original token temporarily for development
    static storeOriginalToken(token) {
        sessionStorage.setItem('originalToken', token);
    }

    // Clear stored token
    static clearStoredToken() {
        sessionStorage.removeItem('originalToken');
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CryptoUtils };
}
