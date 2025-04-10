'use client';

import { ActionIcon, Badge, Group, Indicator } from '@mantine/core';
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
      <Indicator 
        label={itemCount} 
        size={16} 
        disabled={itemCount === 0}
        color="green"
      >
        <ActionIcon
          variant="light"
          size="lg"
          color="green"
          onClick={handleClick}
          aria-label="Open cart"
        >
          <IconShoppingCart size={20} />
        </ActionIcon>
      </Indicator>
      {total > 0 && (
        <Badge color="green" variant="light">
          {total.toFixed(2)}₺
        </Badge>
      )}
    </Group>
  );
} 