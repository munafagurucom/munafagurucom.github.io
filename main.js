// Main JavaScript for Home Page

class HomePage {
    constructor() {
        this.serviceManager = serviceManager;
        this.cartManager = cartManager;
        this.currentFilter = 'all';
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadServices();
        this.updateCartDisplay();
        this.setupCartListeners();
    }

    setupEventListeners() {
        // Filter tag buttons
        const filterButtons = document.querySelectorAll('.tag-btn');
        filterButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                this.handleFilterClick(e.target);
            });
        });
    }

    setupCartListeners() {
        // Listen for cart changes
        this.cartManager.addEventListener((event, data) => {
            this.updateCartDisplay();
            this.updateServiceCards();
        });
    }

    handleFilterClick(button) {
        // Update active state
        document.querySelectorAll('.tag-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        button.classList.add('active');

        // Filter services
        const tag = button.dataset.tag;
        this.currentFilter = tag;
        this.loadServices(tag);
    }

    loadServices(filterTag = 'all') {
        const servicesGrid = document.getElementById('servicesGrid');
        
        // Show loading
        Utils.showLoading();

        try {
            // Get filtered services
            const services = filterTag === 'all' ? 
                this.serviceManager.getAllServices() : 
                this.serviceManager.filterServicesByTag(filterTag);

            // Clear existing services
            servicesGrid.innerHTML = '';

            // Add service cards
            services.forEach(service => {
                const serviceCard = this.createServiceCard(service);
                servicesGrid.appendChild(serviceCard);
            });

            // Hide loading
            Utils.hideLoading();

        } catch (error) {
            console.error('Error loading services:', error);
            Utils.showToast('Error loading services', 'error');
            Utils.hideLoading();
        }
    }

    createServiceCard(service) {
        const card = document.createElement('div');
        card.className = 'service-card';
        card.dataset.serviceId = service.serviceId;

        const isInCart = this.cartManager.isServiceInCart(service.serviceId);
        const quantity = this.cartManager.getServiceQuantity(service.serviceId);

        card.innerHTML = `
            <div class="service-header">
                <h3 class="service-name">${service.name}</h3>
                <div class="service-duration">
                    <i class="fas fa-clock"></i>
                    <span>${service.duration}</span>
                </div>
            </div>
            
            <div class="service-rating">
                ${Utils.generateStarRating(service.rating)}
                <span class="rating-text">${service.rating}</span>
            </div>
            
            <div class="service-description">
                <p>${service.description}</p>
            </div>
            
            <div class="service-tags">
                ${service.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
            </div>
            
            <div class="service-pricing">
                <div class="price-section">
                    <span class="offer-price">₹${Utils.formatPrice(service.offerPrice)}</span>
                    <span class="actual-price">₹${Utils.formatPrice(service.actualPrice)}</span>
                </div>
                <div class="price-savings">
                    <span class="savings-text">Save ₹${Utils.formatPrice(service.actualPrice - service.offerPrice)}</span>
                </div>
            </div>
            
            <div class="service-actions">
                ${isInCart ? this.createCartControls(service, quantity) : this.createAddButton(service)}
            </div>
        `;

        // Add event listeners
        this.attachCardEventListeners(card, service);

        return card;
    }

    createAddButton(service) {
        return `
            <button class="add-btn" data-service-id="${service.serviceId}">
                <i class="fas fa-plus"></i>
                Add
            </button>
        `;
    }

    createCartControls(service, quantity) {
        return `
            <div class="cart-controls">
                <button class="remove-btn" data-service-id="${service.serviceId}">
                    <i class="fas fa-minus"></i>
                </button>
                <span class="quantity">${quantity}</span>
                <button class="add-btn" data-service-id="${service.serviceId}">
                    <i class="fas fa-plus"></i>
                </button>
            </div>
        `;
    }

    attachCardEventListeners(card, service) {
        // Add button
        const addBtn = card.querySelector('.add-btn');
        if (addBtn) {
            addBtn.addEventListener('click', () => {
                this.handleAddToCart(service.serviceId);
            });
        }

        // Remove button
        const removeBtn = card.querySelector('.remove-btn');
        if (removeBtn) {
            removeBtn.addEventListener('click', () => {
                this.handleRemoveFromCart(service.serviceId);
            });
        }
    }

    handleAddToCart(serviceId) {
        const result = this.cartManager.addToCart(serviceId);
        
        if (result.success) {
            Utils.showToast('Service added to cart', 'success');
        } else {
            Utils.showToast(result.error || 'Error adding to cart', 'error');
        }
    }

    handleRemoveFromCart(serviceId) {
        const result = this.cartManager.removeFromCart(serviceId);
        
        if (result.success) {
            Utils.showToast('Service removed from cart', 'info');
        } else {
            Utils.showToast(result.error || 'Error removing from cart', 'error');
        }
    }

    updateCartDisplay() {
        const cartSummary = this.cartManager.getCartSummary();
        
        // Update cart total
        const cartTotalElement = document.getElementById('cartTotal');
        if (cartTotalElement) {
            cartTotalElement.textContent = Utils.formatPrice(cartSummary.total);
        }

        // Update checkout button
        const checkoutBtn = document.getElementById('checkoutBtn');
        if (checkoutBtn) {
            if (cartSummary.canCheckout) {
                checkoutBtn.disabled = false;
                checkoutBtn.querySelector('.btn-text').style.display = 'inline';
                checkoutBtn.querySelector('.btn-minimum').style.display = 'none';
            } else {
                checkoutBtn.disabled = true;
                checkoutBtn.querySelector('.btn-text').style.display = 'none';
                checkoutBtn.querySelector('.btn-minimum').style.display = 'inline';
            }
        }
    }

    updateServiceCards() {
        // Update all service cards to reflect cart state
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            const serviceId = card.dataset.serviceId;
            const isInCart = this.cartManager.isServiceInCart(serviceId);
            const quantity = this.cartManager.getServiceQuantity(serviceId);
            
            const service = this.serviceManager.getServiceById(serviceId);
            if (service) {
                const actionsContainer = card.querySelector('.service-actions');
                if (actionsContainer) {
                    actionsContainer.innerHTML = isInCart ? 
                        this.createCartControls(service, quantity) : 
                        this.createAddButton(service);
                    
                    // Re-attach event listeners
                    this.attachCardEventListeners(card, service);
                }
            }
        });
    }
}

// Initialize home page when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HomePage();
});

// Handle checkout button click
document.addEventListener('DOMContentLoaded', () => {
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            const cartSummary = cartManager.getCartSummary();
            if (cartSummary.canCheckout) {
                window.location.href = 'checkout.html';
            } else {
                Utils.showToast(`Minimum checkout amount is ₹${cartSummary.minCheckoutAmount}`, 'warning');
            }
        });
    }
});
