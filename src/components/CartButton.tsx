'use client';

import { ActionIcon, Badge, Group, Box, Text } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { toggleCart } from '../features/cart/cartSlice';

export function CartButton() {
  const dispatch = useDispatch();
  const { items, total } = useSelector((state: RootState) => state.cart);
  
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleClick = () => {
    dispatch(toggleCart());
  };

  return (
    <Group gap={8}>
      <Box
        style={{
          position: 'relative',
          cursor: 'pointer',
          transition: 'transform 0.2s ease',
          ':hover': {
            transform: 'scale(1.05)'
          }
        }}
        onClick={handleClick}
      >
        <ActionIcon
          variant="filled"
          size="xl"
          color="green"
          aria-label="Open cart"
          style={{
            borderRadius: '12px',
            padding: '12px',
          }}
        >
          <IconShoppingCart size={24} />
        </ActionIcon>
        {itemCount > 0 && (
          <Badge
            size="sm"
            variant="filled"
            color="green"
            style={{
              position: 'absolute',
              top: -8,
              right: -8,
              padding: '0 6px',
              minWidth: '20px',
              height: '20px',
              borderRadius: '10px',
            }}
          >
            {itemCount}
          </Badge>
        )}
        {total > 0 && (
          <Text 
            size="sm" 
            c="green" 
            fw={500}
            style={{
              position: 'absolute',
              bottom: -20,
              left: '50%',
              transform: 'translateX(-50%)',
              whiteSpace: 'nowrap',
              fontSize: '0.75rem',
              backgroundColor: 'white',
              padding: '2px 6px',
              borderRadius: '4px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}
          >
            {total.toFixed(2)}₺
          </Text>
        )}
      </Box>
    </Group>
  );
} 