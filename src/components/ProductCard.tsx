'use client';

import { Card, Image, Text, Badge, Button, Group, Stack } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { Product } from '../types/product';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <Card 
      shadow="sm" 
      padding="lg" 
      radius="md" 
      withBorder 
      style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        height: '100%',
        transition: 'all 0.2s ease-in-out',
        cursor: 'pointer'
      }}
      styles={{
        root: {
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
          },
          '&:active': {
            transform: 'translateY(-2px)',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          }
        }
      }}
    >
      <Card.Section>
        <div style={{ height: '240px', width: '100%', position: 'relative' }}>
          <Image
            src={product.image}
            alt={product.name}
            fallbackSrc="/images/placeholder.jpg"
            style={{ 
              objectFit: 'contain',
              backgroundColor: '#f8f9fa',
              padding: '20px',
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              transition: 'transform 0.2s ease-in-out'
            }}
          />
        </div>
      </Card.Section>

      <Stack gap="xs" mt="md" style={{ flex: 1 }}>
        <div>
          <Text fw={500} size="lg" lineClamp={2} style={{ minHeight: '48px' }}>
            {product.name}
          </Text>
          
          <Text size="sm" c="dimmed" mt="xs" lineClamp={2} style={{ minHeight: '40px' }}>
            {product.description}
          </Text>
        </div>

        <Group justify="space-between" align="center" mt="auto">
          <Text fw={700} size="xl" c="green.6">
            {product.price.toFixed(2)}₺
          </Text>
          {!product.inStock ? (
            <Badge color="red" variant="light" size="lg">
              OUT OF STOCK
            </Badge>
          ) : (
            <Button 
              variant="filled"
              onClick={handleAddToCart}
              color="green"
              radius="md"
              size="sm"
              leftSection={<IconShoppingCart size={16} />}
              styles={{
                root: {
                  transition: 'all 0.2s ease',
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
          )}
        </Group>
      </Stack>
    </Card>
  );
} 