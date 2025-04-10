import { NextResponse } from 'next/server';
import type { Product } from '../../../types/product';

const products: Product[] = [
  {
    id: "1",
    name: "iPhone 14 Pro",
    description: "Latest iPhone with dynamic island and powerful A16 chip",
    price: 999.99,
    category: "Mobile",
    image: "/assets/products/iphone.jpg",
    inStock: true
  },
  {
    id: "2",
    name: "MacBook Pro M2",
    description: "Powerful laptop with M2 chip and stunning Retina display",
    price: 1499.99,
    category: "Laptop",
    image: "/assets/products/macbook.jpg",
    inStock: true
  },
  {
    id: "3",
    name: "Samsung Galaxy S23 Ultra",
    description: "Premium Android smartphone with advanced camera system",
    price: 1199.99,
    category: "Mobile",
    image: "/assets/products/galaxy.jpg",
    inStock: true
  },
  {
    id: "4",
    name: "Dell XPS 13",
    description: "Ultra-portable laptop with InfinityEdge display",
    price: 999.99,
    category: "Laptop",
    image: "/assets/products/dell.jpg",
    inStock: false
  },
  {
    id: "5",
    name: "Apple Watch Series 8",
    description: "Advanced health monitoring and fitness tracking",
    price: 399.99,
    category: "Watch",
    image: "/assets/products/watch.jpg",
    inStock: true
  },
  {
    id: "6",
    name: "Samsung Galaxy Watch 5",
    description: "Premium Android smartwatch with health features",
    price: 279.99,
    category: "Watch",
    image: "/assets/products/galaxy-watch.jpg",
    inStock: true
  },
  {
    id: "7",
    name: "Google Pixel 7 Pro",
    description: "Pure Android experience with exceptional camera",
    price: 899.99,
    category: "Mobile",
    image: "/assets/products/pixel.jpg",
    inStock: false
  },
  {
    id: "8",
    name: "Lenovo ThinkPad X1 Carbon",
    description: "Business laptop with premium build quality",
    price: 1299.99,
    category: "Laptop",
    image: "/assets/products/thinkpad.jpg",
    inStock: true
  },
  {
    id: "9",
    name: "Garmin Forerunner 955",
    description: "Advanced GPS sports watch for athletes",
    price: 499.99,
    category: "Watch",
    image: "/assets/products/garmin.jpg",
    inStock: true
  }
];

export async function GET() {
  return NextResponse.json(products);
} 