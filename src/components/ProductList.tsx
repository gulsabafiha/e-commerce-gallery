'use client';

import { useEffect, useState } from 'react';
import { Grid, Container, Title, Group, Loader, Center, Select, Box, TextInput, Transition, Text, Stack } from '@mantine/core';
import type { MantineStyleProp } from '@mantine/core';
import { IconSearch, IconMoodSad } from '@tabler/icons-react';
import { ProductCard } from './ProductCard';
import { ProductFilters } from './ProductFilters';
import { Product, FilterState } from '../types/product';
import { useRouter } from 'next/navigation';

export function ProductList() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
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
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]); // Set empty array on error
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
      (!filters.showInStock || product.inStock) &&
      (searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()))
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

  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`);
  };

  const handleSortChange = (value: string | null) => {
    if (value && (value === 'name-asc' || value === 'name-desc' || value === 'price-asc' || value === 'price-desc')) {
      handleFilterChange({ sortBy: value });
    }
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
          <TextInput
            placeholder="Search products..."
            leftSection={<IconSearch size={16} />}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            mb="xl"
            styles={{
              root: { width: '100%' }
            }}
          />
          
          <ProductFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            categories={categories}
          />
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, sm: 9 }}>
          <Group justify="flex-end" mb="xl">
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
                onChange={handleSortChange}
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

          <Transition mounted={!loading} transition="fade" duration={400}>
            {(styles: Record<string, any>) => (
              <>
                {filteredProducts.length > 0 ? (
                  <Grid style={styles} gutter="lg">
                    {filteredProducts.map((product) => (
                      <Grid.Col 
                        key={product.id} 
                        span={{ base: 12, sm: 6, md: 4 }}
                        style={{
                          transition: 'transform 0.3s ease, opacity 0.3s ease',
                          transform: 'translateY(0)',
                          opacity: 1
                        }}
                      >
                        <div onClick={() => handleProductClick(product.id)}>
                          <ProductCard product={product} />
                        </div>
                      </Grid.Col>
                    ))}
                  </Grid>
                ) : (
                  <Transition
                    mounted={true}
                    transition="fade"
                    duration={400}
                  >
                    {(noResultsStyles: Record<string, any>) => (
                      <Center py={50} style={{ ...styles, ...noResultsStyles }}>
                        <Stack align="center" gap="md">
                          <IconMoodSad size={48} color="var(--mantine-color-gray-5)" />
                          <Text size="xl" c="dimmed" ta="center">
                            No products found
                            {searchQuery && (
                              <>
                                <br />
                                <Text size="sm" mt={4}>
                                  Try adjusting your search or filters
                                </Text>
                              </>
                            )}
                          </Text>
                        </Stack>
                      </Center>
                    )}
                  </Transition>
                )}
              </>
            )}
          </Transition>
        </Grid.Col>
      </Grid>
    </Container>
  );
} 