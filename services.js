// Service Management System
// Add or modify services in this array to update the website

const services = [
    {
        serviceId: "combo_premium",
        name: "Premium Combo Package",
        offerPrice: 2999,
        actualPrice: 3999,
        tags: ["Combo", "Facial", "Pedicure", "Manicure"],
        rating: 4.8,
        duration: "120 mins",
        description: "Complete beauty package with facial, pedicure, and manicure"
    },
    {
        serviceId: "combo_basic",
        name: "Basic Combo Package",
        offerPrice: 1499,
        actualPrice: 1999,
        tags: ["Combo", "Facial", "Cleanup"],
        rating: 4.5,
        duration: "90 mins",
        description: "Essential beauty package with facial and cleanup"
    },
    {
        serviceId: "facial_gold",
        name: "Gold Facial Treatment",
        offerPrice: 1299,
        actualPrice: 1799,
        tags: ["Facial"],
        rating: 4.7,
        duration: "60 mins",
        description: "Luxurious gold facial for glowing skin"
    },
    {
        serviceId: "facial_diamond",
        name: "Diamond Facial Treatment",
        offerPrice: 1599,
        actualPrice: 2299,
        tags: ["Facial"],
        rating: 4.9,
        duration: "75 mins",
        description: "Premium diamond facial for radiant skin"
    },
    {
        serviceId: "facial_fruit",
        name: "Fruit Facial",
        offerPrice: 899,
        actualPrice: 1299,
        tags: ["Facial"],
        rating: 4.4,
        duration: "45 mins",
        description: "Refreshing fruit facial with natural extracts"
    },
    {
        serviceId: "threading_basic",
        name: "Basic Threading",
        offerPrice: 299,
        actualPrice: 399,
        tags: ["Threading"],
        rating: 4.3,
        duration: "15 mins",
        description: "Eyebrow and upper lip threading"
    },
    {
        serviceId: "threading_full",
        name: "Full Face Threading",
        offerPrice: 599,
        actualPrice: 799,
        tags: ["Threading"],
        rating: 4.5,
        duration: "30 mins",
        description: "Complete face threading including chin and sides"
    },
    {
        serviceId: "waxing_full_body",
        name: "Full Body Waxing",
        offerPrice: 2499,
        actualPrice: 3499,
        tags: ["Waxing"],
        rating: 4.6,
        duration: "90 mins",
        description: "Complete body waxing package"
    },
    {
        serviceId: "waxing_half_body",
        name: "Half Body Waxing",
        offerPrice: 1499,
        actualPrice: 1999,
        tags: ["Waxing"],
        rating: 4.4,
        duration: "60 mins",
        description: "Half body waxing (arms and legs)"
    },
    {
        serviceId: "waxing_bikini",
        name: "Bikini Waxing",
        offerPrice: 899,
        actualPrice: 1299,
        tags: ["Waxing"],
        rating: 4.3,
        duration: "30 mins",
        description: "Bikini line waxing"
    },
    {
        serviceId: "cleanup_normal",
        name: "Normal Cleanup",
        offerPrice: 699,
        actualPrice: 999,
        tags: ["Cleanup"],
        rating: 4.2,
        duration: "30 mins",
        description: "Basic face cleanup and toning"
    },
    {
        serviceId: "cleanup_advanced",
        name: "Advanced Cleanup",
        offerPrice: 999,
        actualPrice: 1499,
        tags: ["Cleanup"],
        rating: 4.6,
        duration: "45 mins",
        description: "Deep cleansing with exfoliation"
    },
    {
        serviceId: "pedicure_sp",
        name: "SP Pedicure",
        offerPrice: 899,
        actualPrice: 1299,
        tags: ["Pedicure"],
        rating: 4.5,
        duration: "45 mins",
        description: "Standard pedicure with foot massage"
    },
    {
        serviceId: "pedicure_premium",
        name: "Premium Pedicure",
        offerPrice: 1299,
        actualPrice: 1799,
        tags: ["Pedicure"],
        rating: 4.7,
        duration: "60 mins",
        description: "Luxury pedicure with spa treatment"
    },
    {
        serviceId: "manicure_sp",
        name: "SP Manicure",
        offerPrice: 799,
        actualPrice: 1099,
        tags: ["Manicure"],
        rating: 4.4,
        duration: "30 mins",
        description: "Standard manicure with hand massage"
    },
    {
        serviceId: "manicure_premium",
        name: "Premium Manicure",
        offerPrice: 1199,
        actualPrice: 1699,
        tags: ["Manicure"],
        rating: 4.6,
        duration: "45 mins",
        description: "Luxury manicure with nail art options"
    },
    {
        serviceId: "detan_face",
        name: "Face Detan",
        offerPrice: 799,
        actualPrice: 1099,
        tags: ["Detan"],
        rating: 4.3,
        duration: "30 mins",
        description: "Face detan treatment for sun damage"
    },
    {
        serviceId: "detan_body",
        name: "Body Detan",
        offerPrice: 1499,
        actualPrice: 1999,
        tags: ["Detan"],
        rating: 4.5,
        duration: "60 mins",
        description: "Full body detan treatment"
    },
    {
        serviceId: "hair_color_global",
        name: "Global Hair Color",
        offerPrice: 1999,
        actualPrice: 2999,
        tags: ["Hair Color"],
        rating: 4.6,
        duration: "90 mins",
        description: "Complete hair coloring service"
    },
    {
        serviceId: "hair_color_highlights",
        name: "Hair Highlights",
        offerPrice: 2499,
        actualPrice: 3499,
        tags: ["Hair Color"],
        rating: 4.7,
        duration: "120 mins",
        description: "Professional hair highlights"
    },
    {
        serviceId: "hair_bleach_full",
        name: "Full Hair Bleach",
        offerPrice: 1799,
        actualPrice: 2499,
        tags: ["Hair Bleach"],
        rating: 4.4,
        duration: "75 mins",
        description: "Complete hair bleaching service"
    },
    {
        serviceId: "hair_bleach_streaks",
        name: "Hair Bleach Streaks",
        offerPrice: 1299,
        actualPrice: 1799,
        tags: ["Hair Bleach"],
        rating: 4.3,
        duration: "60 mins",
        description: "Bleach streaks for stylish look"
    },
    {
        serviceId: "massage_head",
        name: "Head Massage",
        offerPrice: 599,
        actualPrice: 899,
        tags: ["Massage"],
        rating: 4.5,
        duration: "30 mins",
        description: "Relaxing head massage with oil"
    },
    {
        serviceId: "massage_neck_shoulder",
        name: "Neck & Shoulder Massage",
        offerPrice: 799,
        actualPrice: 1099,
        tags: ["Massage"],
        rating: 4.6,
        duration: "30 mins",
        description: "Stress-relieving neck and shoulder massage"
    },
    {
        serviceId: "massage_full_body",
        name: "Full Body Massage",
        offerPrice: 1999,
        actualPrice: 2999,
        tags: ["Massage"],
        rating: 4.8,
        duration: "60 mins",
        description: "Complete body relaxation massage"
    },
    {
        serviceId: "cut_file_basic",
        name: "Basic Cut & File",
        offerPrice: 399,
        actualPrice: 599,
        tags: ["Cut & File"],
        rating: 4.2,
        duration: "20 mins",
        description: "Basic nail cutting and filing"
    },
    {
        serviceId: "cut_file_premium",
        name: "Premium Cut & File",
        offerPrice: 699,
        actualPrice: 999,
        tags: ["Cut & File"],
        rating: 4.5,
        duration: "30 mins",
        description: "Premium nail shaping and filing"
    }
];

// Service Management Functions
class ServiceManager {
    constructor() {
        this.services = services;
        this.currentFilter = 'all';
    }

    // Get all services
    getAllServices() {
        return this.services;
    }

    // Get service by ID
    getServiceById(serviceId) {
        return this.services.find(service => service.serviceId === serviceId);
    }

    // Filter services by tag
    filterServicesByTag(tag) {
        if (tag === 'all') {
            return this.services;
        }
        return this.services.filter(service => service.tags.includes(tag));
    }

    // Get all unique tags
    getAllTags() {
        const tags = new Set();
        this.services.forEach(service => {
            service.tags.forEach(tag => tags.add(tag));
        });
        return Array.from(tags);
    }

    // Search services by name
    searchServices(query) {
        const searchTerm = query.toLowerCase();
        return this.services.filter(service => 
            service.name.toLowerCase().includes(searchTerm) ||
            service.description.toLowerCase().includes(searchTerm)
        );
    }

    // Get services in price range
    getServicesInPriceRange(minPrice, maxPrice) {
        return this.services.filter(service => 
            service.offerPrice >= minPrice && service.offerPrice <= maxPrice
        );
    }

    // Sort services by price
    sortServicesByPrice(order = 'asc') {
        return [...this.services].sort((a, b) => {
            return order === 'asc' ? 
                a.offerPrice - b.offerPrice : 
                b.offerPrice - a.offerPrice;
        });
    }

    // Sort services by rating
    sortServicesByRating(order = 'desc') {
        return [...this.services].sort((a, b) => {
            return order === 'desc' ? 
                b.rating - a.rating : 
                a.rating - b.rating;
        });
    }

    // Get featured services (high rating and popular)
    getFeaturedServices() {
        return this.services.filter(service => service.rating >= 4.5);
    }

    // Get services by duration
    getServicesByDuration(maxDuration) {
        return this.services.filter(service => {
            const duration = parseInt(service.duration);
            return duration <= maxDuration;
        });
    }
}

// Create global service manager instance
const serviceManager = new ServiceManager();

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ServiceManager, serviceManager, services };
}
