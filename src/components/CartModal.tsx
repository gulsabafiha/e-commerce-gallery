'use client';

import { Modal, Text, Button, Group, Stack, Image, NumberInput, Badge } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { toggleCart, removeFromCart, updateQuantity, clearCart } from '../features/cart/cartSlice';
import { IconTrash, IconMinus, IconPlus } from '@tabler/icons-react';

export function CartModal() {
  const dispatch = useDispatch();
  const { items, isOpen, subtotal, discount, total } = useSelector((state: RootState) => state.cart);

  const handleClose = () => {
    dispatch(toggleCart());
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleClear = () => {
    dispatch(clearCart());
  };

  return (
    <Modal 
      opened={isOpen} 
      onClose={handleClose}
      title="Shopping Cart"
      size="lg"
    >
      {items.length === 0 ? (
        <Text ta="center" py="xl" c="dimmed">Your cart is empty</Text>
      ) : (
        <Stack>
          {items.map((item) => (
            <Group key={item.id} wrap="nowrap" justify="space-between">
              <Group wrap="nowrap" gap="md">
                <Image
                  src={item.image}
                  alt={item.name}
                  w={80}
                  h={80}
                  style={{ objectFit: 'contain', backgroundColor: '#f8f9fa' }}
                />
                <div style={{ flex: 1, minWidth: 180 }}>
                  <Text size="sm" fw={500} lineClamp={2}>
                    {item.name}
                  </Text>
                  <Text size="sm" c="dimmed" mt={4}>
                    {item.price.toFixed(2)}₺ each
                  </Text>
                </div>
              </Group>
              
              <Group wrap="nowrap" gap="md">
                <Group wrap="nowrap" gap={5}>
                  <Button
                    size="xs"
                    variant="subtle"
                    color="gray"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >
                    <IconMinus size={14} />
                  </Button>
                  <Text w={30} ta="center">{item.quantity}</Text>
                  <Button
                    size="xs"
                    variant="subtle"
                    color="gray"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    <IconPlus size={14} />
                  </Button>
                </Group>
                <Text size="sm" fw={500} w={80} ta="right">
                  {(item.price * item.quantity).toFixed(2)}₺
                </Text>
                <Button
                  variant="subtle"
                  color="red"
                  size="sm"
                  onClick={() => handleRemove(item.id)}
                >
                  <IconTrash size={16} />
                </Button>
              </Group>
            </Group>
          ))}

          <Stack gap="xs" mt="xl">
            <Group justify="space-between">
              <Text size="sm">Subtotal:</Text>
              <Text size="sm">{subtotal.toFixed(2)}₺</Text>
            </Group>
            {discount > 0 && (
              <Group justify="space-between">
                <Text size="sm" c="green">Discount:</Text>
                <Text size="sm" c="green">-{discount.toFixed(2)}₺</Text>
              </Group>
            )}
            <Group justify="space-between">
              <Text fw={500}>Total:</Text>
              <Text fw={500}>{total.toFixed(2)}₺</Text>
            </Group>
          </Stack>

          <Group justify="space-between" mt="xl">
            <Button 
              variant="subtle" 
              color="red" 
              onClick={handleClear}
              leftSection={<IconTrash size={16} />}
            >
              Clear Cart
            </Button>
            <Button color="green">
              Checkout
            </Button>
          </Group>
        </Stack>
      )}
    </Modal>
  );
} 