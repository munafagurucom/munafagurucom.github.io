# Pedi And Mani Home Salon - Website Development Prompt

## Project Overview
Create a dynamic, elegant, and mobile-friendly website for "Pedi And Mani Home Salon" - a women-owned and women-operated home salon service booking platform. The website should be deployed on GitHub Pages and provide a seamless booking experience for customers.

## Technical Requirements
- **Platform**: GitHub Pages compatible (static site)
- **Framework**: Modern HTML5, CSS3, JavaScript (or React/Vue if preferred)
- **Design**: Responsive, elegant, mobile-first approach
- **Storage**: Local storage for cart persistence
- **Navigation**: Single Page Application with smooth transitions

## Core Features Implementation

### 1. Service Management System
Create a configurable services section in the code where developers can easily manage:

```javascript
const services = [
  {
    serviceId: "unique_service_id",
    name: "Service Name",
    offerPrice: 999, // in Indian Rupees
    actualPrice: 1499, // in Indian Rupees
    tags: ["Combo", "Facial", "Threading", "Waxing", "Cleanup", "Pedicure", "Manicure", "Detan", "Hair Color", "Hair Bleach", "Massage", "Cut & File"],
    rating: 4.5,
    duration: "45 mins"
  }
  // Add more services here
];
```

### 2. Home Screen Layout
- Display services filtered by tags: Combo, Facial, Threading, Waxing, Cleanup, Pedicure, Manicure, Detan, Hair Color, Hair Bleach, Massage, Cut & File
- Each service card should show:
  - Service name and duration
  - **Offer price** in green, larger font
  - **Actual price** in red with strikethrough
  - **Add (+)** button in green
  - **Remove (-)** button in grey

### 3. Shopping Cart Functionality
- **Add to Cart**: 
  - Store selected services in local storage
  - Update cart total amount
  - Persist cart data across sessions
- **Remove from Cart**:
  - Remove service from cart and local storage
  - Update cart total accordingly

### 4. Floating Cart Summary (Bottom of Page)
- Left side: Total amount of services in cart
- Right side: "Proceed to Checkout" button
- **Button Logic**:
  - Disabled when total < ₹999
  - Shows "Minimum checkout for cart is Rs.999" when disabled
  - Turns green and enabled when total ≥ ₹999

### 5. Checkout Page
- Display list of selected services
- Show individual prices and total amount
- "Back to Home" button to modify cart
- "Schedule Booking" button

### 6. Schedule Booking Page
Form fields with validation:
- First Name (required)
- Last Name (required)
- House Number (required)
- Lane/Society Name/Street/Area (required)
- City (required)
- Phone Number (required, 10-digit validation)
- **Get Location Button**: Fetches GPS coordinates and populates location fields
- Date of Booking (required, future dates only)
- Time of Booking (required, business hours)
- "Pay and Book" button (disabled until all fields are valid)

### 7. Payment Page
Three payment options:
1. Google Pay button
2. PhonePe button  
3. Paytm button

**Payment Integration**:
- UPI ID: `test@upi`
- Auto-populate payment amount
- Auto-populate message with: service IDs, phone number, GPS coordinates

### 8. WhatsApp Integration
After successful payment:
- Generate WhatsApp chat link for `+917975133457`
- Pre-filled message containing:
  - Service IDs selected
  - Payment transaction details
  - User details (name, address, phone)
  - GPS coordinates
  - Booking schedule (date and time)
- Auto-redirect to WhatsApp with pre-filled message

## Design Specifications

### Color Scheme
- Primary: Elegant feminine colors (soft pinks, purples, or golds)
- Green: #28a745 (for prices and add buttons)
- Red: #dc3545 (for strikethrough prices)
- Grey: #6c757d (for remove buttons)
- White/Light backgrounds for clean look

### Typography
- Elegant, readable fonts
- Larger font sizes for offer prices
- Clear hierarchy for service information

### Mobile Responsiveness
- Mobile-first design approach
- Touch-friendly buttons (minimum 44px touch targets)
- Optimized for various screen sizes
- Smooth scrolling and transitions

### User Experience
- Loading states for async operations
- Error handling for form validation
- Success confirmations for actions
- Intuitive navigation flow

## Technical Implementation Guidelines

### Local Storage Schema
```javascript
// Cart data structure
{
  services: [
    {
      serviceId: "unique_id",
      quantity: 1,
      price: 999
    }
  ],
  totalAmount: 999,
  lastUpdated: "timestamp"
}

// User data structure
{
  firstName: "string",
  lastName: "string", 
  address: {
    houseNumber: "string",
    lane: "string",
    city: "string",
    coordinates: {lat: number, lng: number}
  },
  phone: "string",
  bookingDate: "date",
  bookingTime: "time"
}
```

### Page Structure
1. **index.html** - Home page with services listing
2. **checkout.html** - Checkout page with cart summary
3. **booking.html** - Schedule booking form
4. **payment.html** - Payment options page

### JavaScript Modules
- **cart.js** - Cart management logic
- **services.js** - Service data and filtering
- **booking.js** - Booking form handling
- **payment.js** - Payment integration
- **storage.js** - Local storage management
- **utils.js** - Utility functions

### CSS Organization
- **styles.css** - Main stylesheet
- **responsive.css** - Media queries
- **components.css** - Reusable component styles

## Deployment Instructions
1. Create GitHub repository
2. Enable GitHub Pages in repository settings
3. Deploy to GitHub Pages from main branch
4. Test all functionality on deployed site
5. Optimize for performance and SEO

## Testing Requirements
- Test all cart operations (add/remove)
- Verify local storage persistence
- Test form validation
- Verify payment app deep links
- Test WhatsApp integration
- Cross-browser compatibility testing
- Mobile device testing

## Performance Considerations
- Optimize images for web
- Minimize JavaScript bundle size
- Use efficient CSS animations
- Implement lazy loading if needed
- Ensure fast load times

## Accessibility Requirements
- Semantic HTML5 structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader compatibility
- Sufficient color contrast ratios

## Security Considerations
- Input validation and sanitization
- Secure handling of user data
- HTTPS enforcement on GitHub Pages
- No sensitive data in client-side code

---

**Note**: This website represents a women-owned business, so the design should reflect elegance, professionalism, and trustworthiness while maintaining a warm, welcoming atmosphere that appeals to the target audience of home salon services.
