'use client';

import { Select, RangeSlider, Switch, Stack, Text, Box, Group, NumberInput } from '@mantine/core';
import { FilterState } from '../types/product';

interface ProductFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: Partial<FilterState>) => void;
  categories: string[];
}

export function ProductFilters({ filters, onFilterChange, categories }: ProductFiltersProps) {
  return (
    <Stack gap="lg">
      <Box>
        <Text size="sm" mb="xs">Category</Text>
        <Select
          placeholder="All Categories"
          data={['All Categories', ...categories]}
          value={filters.category}
          onChange={(value) => onFilterChange({ category: value || 'All Categories' })}
          styles={{ input: { height: '40px' } }}
        />
      </Box>

      <Box>
        <Text size="sm" mb="xs">Price Range</Text>
        <Group gap="sm" mb="xs">
          <NumberInput
            value={filters.priceRange.min}
            onChange={(value) => {
              const newMin = typeof value === 'number' ? value : 0;
              onFilterChange({ 
                priceRange: { ...filters.priceRange, min: Math.min(newMin, filters.priceRange.max) }
              });
            }}
            min={0}
            max={filters.priceRange.max}
            styles={{ input: { width: '100px' } }}
          />
          <NumberInput
            value={filters.priceRange.max}
            onChange={(value) => {
              const newMax = typeof value === 'number' ? value : 2000;
              onFilterChange({ 
                priceRange: { ...filters.priceRange, max: Math.max(newMax, filters.priceRange.min) }
              });
            }}
            min={filters.priceRange.min}
            max={2000}
            styles={{ input: { width: '100px' } }}
          />
        </Group>
        <RangeSlider
          min={0}
          max={2000}
          minRange={0}
          value={[filters.priceRange.min, filters.priceRange.max]}
          onChange={([min, max]) => onFilterChange({ priceRange: { min, max } })}
          color="green"
          styles={{
            root: { marginTop: 10 },
            track: { backgroundColor: '#dee2e6' }
          }}
        />
        <Text size="xs" c="dimmed" mt="xs">
          $0 - $2000
        </Text>
      </Box>

      <Box>
        <Switch
          label="Show Only In Stock"
          checked={filters.showInStock}
          onChange={(event) => onFilterChange({ showInStock: event.currentTarget.checked })}
          color="green"
          styles={{ label: { fontSize: '14px' } }}
        />
      </Box>
    </Stack>
  );
} 