import { render, screen, fireEvent } from '@testing-library/react';
import { CartButton } from './CartButton';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { toggleCart, CartItem } from '../features/cart/cartSlice';
import { Product } from '../types/product';
import '@testing-library/jest-dom';
import { MantineProvider } from '@mantine/core';

type CartState = {
  items: CartItem[];
  isOpen: boolean;
  subtotal: number;
  discount: number;
  total: number;
};

interface MockState {
  cart?: Partial<CartState>;
}

// Create a mock store for testing
const createMockStore = (initialState: MockState = {}) => {
  return configureStore({
    reducer: {
      cart: cartReducer,
    },
    preloadedState: {
      cart: {
        items: [],
        isOpen: false,
        subtotal: 0,
        discount: 0,
        total: 0,
        ...(initialState.cart || {}),
      },
    },
  });
};

// Wrapper component with Redux provider
const renderWithProvider = (component: React.ReactNode, initialState: MockState = {}) => {
  const store = createMockStore(initialState);
  return {
    ...render(
      <MantineProvider>
        <Provider store={store}>{component}</Provider>
      </MantineProvider>
    ),
    store,
  };
};

describe('CartButton', () => {
  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    description: 'Test description',
    price: 100,
    category: 'Test',
    image: '/test.jpg',
    inStock: true
  };

  it('renders without items', () => {
    renderWithProvider(<CartButton />);
    
    const button = screen.getByRole('button', { name: /open cart/i });
    expect(button).toBeInTheDocument();
    
    // Badge should not be visible when there are no items
    const badge = screen.queryByText('0');
    expect(badge).not.toBeInTheDocument();
  });

  it('displays correct item count and total', () => {
    const mockState = {
      cart: {
        items: [
          { ...mockProduct, quantity: 2 },
          { 
            ...mockProduct,
            id: '2',
            name: 'Another Product',
            price: 50,
            quantity: 1
          }
        ],
        total: 250,
      },
    };

    renderWithProvider(<CartButton />, mockState);
    
    // Check if badge shows correct total items (3)
    const badge = screen.getByText('3');
    expect(badge).toBeInTheDocument();
    
    // Check if total price is displayed
    const total = screen.getByText('250.00₺');
    expect(total).toBeInTheDocument();
  });

  it('dispatches toggleCart action when clicked', () => {
    const { store } = renderWithProvider(<CartButton />);
    
    const button = screen.getByRole('button', { name: /open cart/i });
    fireEvent.click(button);
    
    const actions = store.getState().cart.isOpen;
    expect(actions).toBe(true);
  });

  it('handles hover state correctly', () => {
    renderWithProvider(<CartButton />);
    
    const container = screen.getByRole('button', { name: /open cart/i }).parentElement;
    expect(container).toHaveStyle('transition: transform 0.2s ease');
  });
}); 