'use client';

import { Modal, Text, Button, Group, Stack, Image, NumberInput, ActionIcon, Box } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconTrash, IconX, IconCheck, IconPlus, IconMinus } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { removeFromCart, updateQuantity, clearCart, toggleCart } from '../features/cart/cartSlice';
import { useState } from 'react';

export function CartModal() {
  const dispatch = useDispatch();
  const { items, isOpen, subtotal, discount, total } = useSelector((state: RootState) => state.cart);
  const [loading, setLoading] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

  const handleClose = () => {
    dispatch(toggleCart());
  };

  const handleQuantityChange = (id: string, value: number | string) => {
    const quantity = typeof value === 'string' ? parseInt(value, 10) : value;
    if (isNaN(quantity)) return;

    try {
      if (quantity === 0) {
        dispatch(removeFromCart(id));
        notifications.show({
          title: 'Item Removed',
          message: 'Item has been removed from cart',
          color: 'green',
          icon: <IconCheck size={16} />,
        });
      } else {
        dispatch(updateQuantity({ id, quantity }));
        notifications.show({
          title: 'Cart Updated',
          message: 'Item quantity has been updated',
          color: 'green',
          icon: <IconCheck size={16} />,
        });
      }
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to update quantity',
        color: 'red',
        icon: <IconX size={16} />,
      });
    }
  };

  const handleRemove = (id: string) => {
    try {
      dispatch(removeFromCart(id));
      notifications.show({
        title: 'Item Removed',
        message: 'Item has been removed from cart',
        color: 'green',
        icon: <IconCheck size={16} />,
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to remove item',
        color: 'red',
        icon: <IconX size={16} />,
      });
    }
  };

  const handleClear = () => {
    try {
      dispatch(clearCart());
      notifications.show({
        title: 'Cart Cleared',
        message: 'All items have been removed from cart',
        color: 'green',
        icon: <IconCheck size={16} />,
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to clear cart',
        color: 'red',
        icon: <IconX size={16} />,
      });
    }
  };

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <Modal 
      opened={isOpen} 
      onClose={handleClose}
      title="Shopping Cart"
      size="lg"
    >
      {items.length === 0 ? (
        <Text ta="center" fz="lg" fw={500} c="dimmed">
          Your cart is empty
        </Text>
      ) : (
        <Stack>
          {items.map((item) => (
            <Group key={item.id} wrap="nowrap" justify="space-between" style={{ gap: '8px' }}>
              <Group wrap="nowrap">
                {imageErrors[item.id] ? (
                  <Box
                    w={{ base: 60, sm: 80 }}
                    h={{ base: 60, sm: 80 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f8f9fa',
                      flexShrink: 0
                    }}
                  >
                    <IconX size={24} color="#ced4da" />
                  </Box>
                ) : (
                  <Image
                    src={item.image}
                    alt={item.name}
                    w={{ base: 60, sm: 80 }}
                    h={{ base: 60, sm: 80 }}
                    onError={() => handleImageError(item.id)}
                    style={{ objectFit: 'contain', backgroundColor: '#f8f9fa', flexShrink: 0 }}
                  />
                )}
                <div>
                  <Text size="sm" fw={500}>
                    {item.name}
                  </Text>
                  <Text size="xs" c="dimmed">
                    {item.price.toFixed(2)}₺ each
                  </Text>
                </div>
              </Group>
              <Group wrap="nowrap" gap="xs">
                <Group wrap="nowrap" gap={5}>
                  <ActionIcon
                    size="sm"
                    variant="subtle"
                    color="gray"
                    onClick={() => handleQuantityChange(item.id, Math.max(0, item.quantity - 1))}
                  >
                    <IconMinus size={14} />
                  </ActionIcon>
                  <Text w={30} ta="center">{item.quantity}</Text>
                  <ActionIcon
                    size="sm"
                    variant="subtle"
                    color="gray"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    <IconPlus size={14} />
                  </ActionIcon>
                </Group>
                <ActionIcon
                  color="red"
                  onClick={() => handleRemove(item.id)}
                  variant="subtle"
                >
                  <IconTrash size={16} />
                </ActionIcon>
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
              loading={loading}
            >
              Clear Cart
            </Button>
            <Button
              onClick={() => {
                setLoading(true);
                // Simulate checkout process
                setTimeout(() => {
                  notifications.show({
                    title: 'Order Placed',
                    message: 'Your order has been placed successfully',
                    color: 'green',
                    icon: <IconCheck size={16} />,
                  });
                  dispatch(clearCart());
                  dispatch(toggleCart());
                  setLoading(false);
                }, 2000);
              }}
              loading={loading}
              color="green"
            >
              Checkout
            </Button>
          </Group>
        </Stack>
      )}
    </Modal>
  );
} 