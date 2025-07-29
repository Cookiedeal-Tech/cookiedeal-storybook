import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import theme from '../src/styles/theme';

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
