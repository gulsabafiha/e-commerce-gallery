'use client';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Provider as ReduxProvider } from 'react-redux';
import { store } from '../store/store';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

type ProvidersProps = {
  children: any;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ReduxProvider store={store}>
      <MantineProvider
        theme={{
          primaryColor: 'custom',
          colors: {
            custom: [
              '#e6f7f4',
              '#cceee9',
              '#b3e6de',
              '#99ddd3',
              '#80d5c8',
              '#66ccbd',
              'oklch(50.8% 0.118 165.612)',
              '#33bba7',
              '#19b29c',
              '#00a991'
            ]
          }
        }}
        defaultColorScheme="light"
      >
        <Notifications />
        {children}
      </MantineProvider>
    </ReduxProvider>
  );
} 