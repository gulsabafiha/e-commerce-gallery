'use client';

import { useEffect, useState } from 'react';
import { Container, Grid, Image, Text, Group, Button, Badge, Paper, Title, Stack } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import type { Product } from '../types/product';
import { useRouter } from 'next/navigation';

export default function ProductDetails({ id }: { id: string }) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const products = await response.json();
        const foundProduct = products.find((p: Product) => p.id === id);
        if (foundProduct) {
          setProduct(foundProduct);
        } else {
          router.push('/');
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        router.push('/');
      }
    };

    fetchProduct();
  }, [id, router]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
    }
  };

  if (!product) {
    return null;
  }

  return (
    <Container size="xl" py="xl">
      <Paper shadow="xs" p="xl" radius="md">
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image
              src={product.image}
              alt={product.name}
              style={{ 
                width: '100%',
                height: 400,
                objectFit: 'contain',
                backgroundColor: '#f8f9fa'
              }}
              fallbackSrc="/images/placeholder.jpg"
            />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Stack gap="md">
              <div>
                <Title order={1}>{product.name}</Title>
                <Group gap="xs" mt="xs">
                  <Badge color="blue">{product.category}</Badge>
                  {product.inStock ? (
                    <Badge color="green">In Stock</Badge>
                  ) : (
                    <Badge color="red">Out of Stock</Badge>
                  )}
                </Group>
              </div>

              <Text size="xl" fw={700} c="green.6">
                {product.price.toFixed(2)}₺
              </Text>

              <Text size="md" c="dimmed">
                {product.description}
              </Text>

              <Group mt="xl">
                <Button
                  size="lg"
                  color="green"
                  leftSection={<IconShoppingCart size={20} />}
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  style={{
                    transition: 'transform 0.2s ease',
                  }}
                  styles={{
                    root: {
                      '&:hover': {
                        transform: 'scale(1.05)',
                      },
                      '&:active': {
                        transform: 'scale(0.95)',
                      }
                    }
                  }}
                >
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="light"
                  onClick={() => router.push('/')}
                >
                  Back to Products
                </Button>
              </Group>
            </Stack>
          </Grid.Col>
        </Grid>
      </Paper>
    </Container>
  );
} 