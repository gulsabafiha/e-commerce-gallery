'use client';

import { Providers } from './providers';
import { CartModal } from '../components/CartModal';
import { CartButton } from '../components/CartButton';
import { AppShell, Container, Group } from '@mantine/core';

export function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      <AppShell
        header={{ height: 60 }}
        padding="md"
      >
        <AppShell.Header>
          <Container size="xl" h="100%">
            <Group justify="space-between" h="100%">
              <Group>
                <h1 style={{ margin: 0, fontSize: '1.5rem' }}>E-commerce Gallery</h1>
              </Group>
              <CartButton />
            </Group>
          </Container>
        </AppShell.Header>

        <AppShell.Main>
          {children}
        </AppShell.Main>
      </AppShell>
      <CartModal />
    </Providers>
  );
} 