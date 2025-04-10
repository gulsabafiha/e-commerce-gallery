'use client';

import { Suspense } from 'react';
import ProductDetails from './ProductDetails';
import { Container, Grid, Skeleton, Stack, Group } from '@mantine/core';

function LoadingSkeleton() {
  return (
    <Container size="xl" py="xl">
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Skeleton height={400} radius="md" />
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Stack>
            <Skeleton height={40} width="70%" radius="md" />
            <Skeleton height={24} width="40%" radius="md" />
            <Skeleton height={100} radius="md" />
            <Group>
              <Skeleton height={36} width={120} radius="md" />
              <Skeleton height={36} width={120} radius="md" />
            </Group>
          </Stack>
        </Grid.Col>
      </Grid>
    </Container>
  );
}

export default function ProductPageContent({ params }: { params: { id: string } }) {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ProductDetails id={params.id} />
    </Suspense>
  );
} 