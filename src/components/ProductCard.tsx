'use client';

import { Card, Image, Text, Badge, Button, Group, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconShoppingCart, IconCheck } from '@tabler/icons-react';
import { Product } from '../types/product';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToCart(product));
    notifications.show({
      title: 'Added to Cart',
      message: `${product.name} has been added to your cart`,
      color: 'green',
      icon: <IconCheck size={16} />,
    });
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
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        cursor: 'pointer',
        transform: isHovered ? 'translateY(-8px)' : 'none',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      styles={{
        root: {
          '&:hover': {
            boxShadow: '0 8px 20px rgba(0, 0, 0, 0.12)',
          }
        }
      }}
    >
      <Card.Section>
        <div style={{ 
          height: '240px', 
          width: '100%', 
          position: 'relative',
          overflow: 'hidden'
        }}>
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
              transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            }}
          />
        </div>
      </Card.Section>

      <Stack gap="xs" mt="md" style={{ flex: 1 }}>
        <div>
          <Text fw={500} size="lg" lineClamp={2} style={{ 
            minHeight: '48px',
            transition: 'color 0.2s ease',
            color: isHovered ? 'var(--mantine-color-green-6)' : undefined
          }}>
            {product.name}
          </Text>
          
          <Text size="sm" c="dimmed" mt="xs" lineClamp={2} style={{ minHeight: '40px' }}>
            {product.description}
          </Text>
        </div>

        <Group justify="space-between" align="center" mt="auto">
          <Text fw={700} size="xl" c="green.6" style={{
            transition: 'transform 0.2s ease',
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
          }}>
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
              style={{
                transition: 'all 0.2s ease',
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              }}
              styles={{
                root: {
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