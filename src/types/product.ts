export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
    inStock: boolean;
}

export interface FilterState {
    category: string;
    priceRange: {
        min: number;
        max: number;
    };
    showInStock: boolean;
    sortBy: 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc';
    itemsPerPage: number;
}