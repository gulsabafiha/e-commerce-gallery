'use client';

import { MantineProvider } from '@mantine/core';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../store/store';
import '@mantine/core/styles.css';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider store={store}>
      <MantineProvider>
        {children}
      </MantineProvider>
    </ReduxProvider>
  );
} 