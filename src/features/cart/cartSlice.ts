import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../types/product';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  subtotal: number;
  discount: number;
  total: number;
}

// Load cart from localStorage if available
const loadCartFromStorage = (): CartState => {
  const initialState = {
    items: [],
    isOpen: false,
    subtotal: 0,
    discount: 0,
    total: 0
  };

  if (typeof window === 'undefined') {
    return initialState;
  }

  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      return {
        ...parsedCart,
        isOpen: false // Always ensure cart is closed on page load
      };
    }
  } catch (error) {
    console.error('Error loading cart from storage:', error);
  }

  return initialState;
};

const initialState: CartState = loadCartFromStorage();

const calculateTotals = (items: CartItem[]) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  // You can implement different discount rules here
  const discount = subtotal > 1000 ? subtotal * 0.1 : 0; // 10% discount over $1000
  const total = subtotal - discount;
  return { subtotal, discount, total };
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      const totals = calculateTotals(state.items);
      state.subtotal = totals.subtotal;
      state.discount = totals.discount;
      state.total = totals.total;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload);
      const totals = calculateTotals(state.items);
      state.subtotal = totals.subtotal;
      state.discount = totals.discount;
      state.total = totals.total;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const item = state.items.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity = Math.max(0, action.payload.quantity);
        if (item.quantity === 0) {
          state.items = state.items.filter(i => i.id !== action.payload.id);
        }
      }
      const totals = calculateTotals(state.items);
      state.subtotal = totals.subtotal;
      state.discount = totals.discount;
      state.total = totals.total;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    clearCart: (state) => {
      state.items = [];
      state.subtotal = 0;
      state.discount = 0;
      state.total = 0;
      localStorage.setItem('cart', JSON.stringify(state));
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    }
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, toggleCart } = cartSlice.actions;
export default cartSlice.reducer; 