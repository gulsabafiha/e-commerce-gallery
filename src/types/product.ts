export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    discount?: number;
    category: string;
    image: string;
    inStock: boolean;
    
  }