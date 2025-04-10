# E-commerce Gallery

A modern, responsive e-commerce product gallery built with Next.js, Redux Toolkit, and Mantine UI.

## Features Implemented

- 🛍️ **Product Gallery**
  - Responsive grid layout
  - Product cards with hover effects
  - Image optimization and fallback handling
  - Category filtering
  - Price range filtering
  - Sort by name and price
  - Items per page selection

- 🛒 **Shopping Cart**
  - Real-time cart updates
  - Quantity adjustment
  - Remove items
  - Automatic total calculation
  - Bulk clear cart
  - Persistent cart state (localStorage)
  - Mobile-responsive design
  - Automatic discount application (10% off over 1000₺)

- 🎨 **UI/UX**
  - Modern, clean design
  - Responsive layout for all screen sizes
  - Loading states and error handling
  - User feedback notifications
  - Smooth animations and transitions
  - Accessible components (ARIA labels)

## Setup Instructions

1. **Prerequisites**
   ```bash
   Node.js >= 18.0.0
   npm >= 9.0.0
   ```

2. **Installation**
   ```bash
   # Clone the repository
   git clone <repository-url>
   cd ecommerce-gallery

   # Install dependencies
   npm install
   ```

3. **Development**
   ```bash
   # Start development server
   npm run dev

   # Run tests
   npm test

   # Run tests in watch mode
   npm run test:watch
   ```

4. **Production**
   ```bash
   # Build for production
   npm run build

   # Start production server
   npm start
   ```

## Technical Decisions and Reasoning

### Architecture
- **Next.js**: Chosen for its built-in performance optimizations, server-side rendering capabilities, and excellent developer experience.
- **Redux Toolkit**: Used for state management due to its predictable state updates and built-in support for immutable updates.
- **Mantine UI**: Selected for its modern design, excellent TypeScript support, and comprehensive component library.

### Testing Strategy
- **Jest + React Testing Library**: Focused on testing user interactions and behavior rather than implementation details.
- **Custom test utilities**: Created reusable test utilities for Redux and Mantine provider wrapping.
- **Comprehensive test coverage**: Including component rendering, state management, and user interactions.

### State Management
- Cart state persisted in localStorage for better user experience
- Automatic total and discount calculations
- Optimistic updates for better perceived performance
- Type-safe actions and state with TypeScript

### Performance Optimizations
- Lazy loading of images
- Debounced search and filter operations
- Memoized selectors for Redux state
- Optimized re-renders using React.memo and useMemo
- Client-side pagination for better performance with large datasets

## Assumptions Made

1. **Product Data**
   - Products have unique IDs
   - All products have valid images
   - Prices are in Turkish Lira (₺)
   - Stock status is binary (in stock/out of stock)

2. **User Behavior**
   - Single session shopping (no user accounts)
   - Local storage is available and enabled
   - Modern browser support (ES6+)

3. **Business Rules**
   - 10% discount applied on orders over 1000₺
   - No maximum quantity limits
   - No shipping calculation
   - Prices include VAT

## Future Improvements

1. **Features**
   - User authentication and accounts
   - Wishlist functionality
   - Advanced filtering (tags, attributes)
   - Product reviews and ratings
   - Recently viewed products
   - Related products suggestions

2. **Technical**
   - Server-side pagination
   - Image optimization service
   - API rate limiting
   - Error boundary implementation
   - Performance monitoring
   - E2E tests with Cypress
   - Storybook for component documentation
   - Internationalization support

3. **UX Improvements**
   - Advanced search with autocomplete
   - Filter combinations (AND/OR logic)
   - Price range input fields
   - Drag and drop cart reordering
   - Save cart for later
   - Share cart functionality

4. **Business Features**
   - Multiple currency support
   - Dynamic discount rules
   - Inventory tracking
   - Bundle products
   - Gift cards
   - Coupon system

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

