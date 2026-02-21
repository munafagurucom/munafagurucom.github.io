# Pedi And Mani Home Salon Website

A modern, elegant, and mobile-friendly website for "Pedi And Mani Home Salon" - a women-owned and women-operated home salon service booking platform.

## 🌟 Features

- **Service Management**: Easily configurable services with pricing, tags, and ratings
- **Shopping Cart**: Add/remove services with local storage persistence
- **Smart Filtering**: Filter services by categories (Combo, Facial, Threading, Waxing, etc.)
- **Booking System**: Complete booking flow with form validation
- **Payment Integration**: UPI payment support with Google Pay, PhonePe, and Paytm
- **WhatsApp Integration**: Automatic WhatsApp redirect after payment
- **Location Services**: GPS location fetching for address
- **Responsive Design**: Mobile-first approach with elegant UI
- **Women-Owned Business**: Special badges and feminine design theme

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with CSS Variables, Flexbox, Grid
- **Fonts**: Google Fonts (Poppins)
- **Icons**: Font Awesome
- **Storage**: Local Storage for cart persistence
- **Deployment**: GitHub Pages (static site)

## 📁 Project Structure

```
webui/
├── index.html              # Home page with services listing
├── checkout.html           # Checkout page with cart summary
├── booking.html            # Schedule booking form
├── payment.html            # Payment options page
├── styles.css              # Main stylesheet
├── responsive.css          # Media queries and responsive design
├── services.js             # Service management system
├── storage.js              # Local storage management
├── cart.js                 # Shopping cart functionality
├── utils.js                # Utility functions
├── main.js                 # Home page JavaScript
├── checkout.js             # Checkout page JavaScript
├── booking.js              # Booking page JavaScript
├── payment.js              # Payment page JavaScript
└── README.md               # This file
```

## 🚀 Getting Started

### Local Development

1. Clone the repository
2. Open `index.html` in your web browser
3. No build process required - it's a static site!

### Deployment to GitHub Pages

1. Push the code to a GitHub repository
2. Go to repository Settings > Pages
3. Select source as "Deploy from a branch"
4. Choose main branch and root folder
5. Save and wait for deployment

## ⚙️ Configuration

### Adding/Modifying Services

Edit the `services` array in `services.js`:

```javascript
const services = [
    {
        serviceId: "unique_service_id",
        name: "Service Name",
        offerPrice: 999, // in Indian Rupees
        actualPrice: 1499, // in Indian Rupees
        tags: ["Combo", "Facial", "Threading"],
        rating: 4.5,
        duration: "45 mins",
        description: "Service description"
    }
    // Add more services here
];
```

### Payment Configuration

Update payment details in `payment.js`:

```javascript
this.UPI_ID = 'test70@okicici'; // Your UPI ID
this.WHATSAPP_NUMBER = '+917975133457'; // Your WhatsApp number
```

### Business Information

Update business details in HTML files:
- Company name in headers
- Contact information
- Business hours in booking form

## 🎨 Design Features

### Color Scheme
- Primary: Elegant feminine colors (soft pinks, purples)
- Green: #28a745 (prices and add buttons)
- Red: #dc3545 (strikethrough prices)
- Grey: #6c757d (remove buttons)

### Responsive Breakpoints
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: 576px - 767px
- Small Mobile: 575px-

### Accessibility
- Semantic HTML5 structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast ratios

## 📱 Mobile Features

- Touch-friendly buttons (44px minimum)
- Optimized for various screen sizes
- Smooth scrolling and transitions
- Mobile-first design approach
- Gesture support for interactions

## 🔧 Customization

### Adding New Service Categories

1. Add new tag to services in `services.js`
2. Update filter buttons in `index.html`
3. Add styling for new tags if needed

### Modifying Payment Methods

1. Update payment buttons in `payment.html`
2. Add new payment method handlers in `payment.js`
3. Style new payment buttons in `payment.js`

### Changing Theme Colors

Update CSS variables in `styles.css`:

```css
:root {
    --primary-color: #d63384;
    --secondary-color: #f8b4d9;
    --accent-color: #ff6b9d;
    /* Add more color variables */
}
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Service filtering by tags
- [ ] Add/remove services from cart
- [ ] Cart persistence across page refresh
- [ ] Form validation on booking page
- [ ] Location fetching functionality
- [ ] Payment app deep links
- [ ] WhatsApp integration
- [ ] Responsive design on various devices
- [ ] Cross-browser compatibility

### Automated Testing

The project is structured to allow for easy addition of automated testing:
- Unit tests for utility functions
- Integration tests for cart functionality
- E2E tests for complete booking flow

## 🚀 Performance Optimization

- Optimized images and assets
- Minimal JavaScript bundle size
- Efficient CSS animations
- Lazy loading for images (if added)
- Fast load times with static hosting

## 🔒 Security Considerations

- Input validation and sanitization
- Secure handling of user data
- HTTPS enforcement on GitHub Pages
- No sensitive data in client-side code
- XSS prevention

## 📞 Support

For support or questions:
- Phone: +91 7975133457
- WhatsApp: +91 7975133457

## 📄 License

This project is proprietary to Pedi And Mani Home Salon.

## 🌟 Acknowledgments

- Women-owned business initiative
- Modern web development practices
- Open source libraries and frameworks
- GitHub Pages for hosting

---

**Made with ❤️ for Pedi And Mani Home Salon**
