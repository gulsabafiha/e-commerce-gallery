'use client';

import { useEffect, useState } from 'react';
import { Grid, Container, Title, Group, Loader, Center, Select, Box } from '@mantine/core';
import { ProductCard } from './ProductCard';
import { ProductFilters } from './ProductFilters';
import { Product, FilterState } from '../types/product';

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<FilterState>({
    category: 'All Categories',
    priceRange: { min: 0, max: 2000 },
    showInStock: false,
    sortBy: 'name-asc',
    itemsPerPage: 20
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [...new Set(products.map(product => product.category))];

  const filteredProducts = products
    .filter(product => 
      (filters.category === 'All Categories' || product.category === filters.category) &&
      product.price >= filters.priceRange.min &&
      product.price <= filters.priceRange.max &&
      (!filters.showInStock || product.inStock)
    )
    .sort((a, b) => {
      switch (filters.sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    })
    .slice(0, filters.itemsPerPage);

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  if (loading) {
    return (
      <Center h={400}>
        <Loader size="xl" />
      </Center>
    );
  }

  return (
    <Container size="xl" py="xl">
      <Title order={1} mb="xl">All Products</Title>
      
      <Grid>
        <Grid.Col span={{ base: 12, sm: 3 }}>
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            categories={categories}
          />
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, sm: 9 }}>
          <Group justify="flex-end" mb="md">
            <Group gap="xs">
              <Box>Show:</Box>
              <Select
                value={filters.itemsPerPage.toString()}
                onChange={(value) => handleFilterChange({ itemsPerPage: parseInt(value || '20') })}
                data={['10', '20', '50']}
                styles={{ input: { width: '70px', height: '40px' } }}
              />
            </Group>
            <Group gap="xs">
              <Box>Sort By:</Box>
              <Select
                value={filters.sortBy}
                onChange={(value: any) => handleFilterChange({ sortBy: value })}
                data={[
                  { value: 'name-asc', label: 'Name (A-Z)' },
                  { value: 'name-desc', label: 'Name (Z-A)' },
                  { value: 'price-asc', label: 'Price (Low to High)' },
                  { value: 'price-desc', label: 'Price (High to Low)' }
                ]}
                styles={{ input: { width: '180px', height: '40px' } }}
              />
            </Group>
          </Group>

          <Grid>
            {filteredProducts.map((product) => (
              <Grid.Col key={product.id} span={{ base: 12, sm: 6, md: 4 }}>
                <ProductCard product={product} />
              </Grid.Col>
            ))}
          </Grid>
        </Grid.Col>
      </Grid>
    </Container>
  );
} 