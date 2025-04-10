'use client';

import { Modal, Text, Button, Group, Stack, Image, NumberInput, Badge, Notification, Box } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { toggleCart, removeFromCart, updateQuantity, clearCart } from '../features/cart/cartSlice';
import { IconTrash, IconMinus, IconPlus, IconX } from '@tabler/icons-react';
import { useState, useCallback } from 'react';
import { notifications } from '@mantine/notifications';

export function CartModal() {
  const dispatch = useDispatch();
  const { items, isOpen, subtotal, discount, total } = useSelector((state: RootState) => state.cart);
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});

  const handleClose = () => {
    dispatch(toggleCart());
  };

  const handleQuantityChange = useCallback(async (id: string, quantity: number) => {
    try {
      setLoading(prev => ({ ...prev, [id]: true }));
      
      if (quantity < 0) {
        throw new Error('Quantity cannot be negative');
      }
      
      dispatch(updateQuantity({ id, quantity }));
      
      if (quantity === 0) {
        notifications.show({
          title: 'Item Removed',
          message: 'Item has been removed from your cart',
          color: 'green'
        });
      }
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: error instanceof Error ? error.message : 'Failed to update quantity',
        color: 'red'
      });
    } finally {
      setLoading(prev => ({ ...prev, [id]: false }));
    }
  }, [dispatch]);

  const handleRemove = useCallback(async (id: string) => {
    try {
      setLoading(prev => ({ ...prev, [id]: true }));
      dispatch(removeFromCart(id));
      notifications.show({
        title: 'Item Removed',
        message: 'Item has been removed from your cart',
        color: 'green'
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to remove item',
        color: 'red'
      });
    } finally {
      setLoading(prev => ({ ...prev, [id]: false }));
    }
  }, [dispatch]);

  const handleClear = useCallback(async () => {
    try {
      dispatch(clearCart());
      notifications.show({
        title: 'Cart Cleared',
        message: 'All items have been removed from your cart',
        color: 'green'
      });
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to clear cart',
        color: 'red'
      });
    }
  }, [dispatch]);

  const handleImageError = (id: string) => {
    setImageErrors(prev => ({ ...prev, [id]: true }));
  };

  return (
    <Modal 
      opened={isOpen} 
      onClose={handleClose}
      title="Shopping Cart"
      size="lg"
      styles={{
        body: {
          paddingTop: '1rem'
        },
        header: {
          marginBottom: 0
        }
      }}
    >
      {items.length === 0 ? (
        <Text ta="center" py="xl" c="dimmed">Your cart is empty</Text>
      ) : (
        <Stack>
          {items.map((item) => (
            <Group key={item.id} wrap="nowrap" justify="space-between" style={{ gap: '8px' }}>
              <Group wrap="nowrap" gap="sm">
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
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Text size="sm" fw={500} lineClamp={2}>
                    {item.name}
                  </Text>
                  <Text size="sm" c="dimmed" mt={4}>
                    {item.price.toFixed(2)}₺ each
                  </Text>
                </div>
              </Group>
              
              <Group wrap="nowrap" gap="xs">
                <Group wrap="nowrap" gap={5}>
                  <Button
                    size="xs"
                    variant="subtle"
                    color="gray"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    loading={loading[item.id]}
                    disabled={loading[item.id]}
                  >
                    <IconMinus size={14} />
                  </Button>
                  <Text w={30} ta="center">{item.quantity}</Text>
                  <Button
                    size="xs"
                    variant="subtle"
                    color="gray"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    loading={loading[item.id]}
                    disabled={loading[item.id]}
                  >
                    <IconPlus size={14} />
                  </Button>
                </Group>
                <Text size="sm" fw={500} w={80} ta="right" display={{ base: 'none', sm: 'block' }}>
                  {(item.price * item.quantity).toFixed(2)}₺
                </Text>
                <Button
                  variant="subtle"
                  color="red"
                  size="xs"
                  onClick={() => handleRemove(item.id)}
                  px={0}
                  loading={loading[item.id]}
                  disabled={loading[item.id]}
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