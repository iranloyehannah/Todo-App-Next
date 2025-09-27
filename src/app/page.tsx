'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { ErrorBoundary } from '@/components';
import Signup from '@/components/Signup';
import { useState } from 'react';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

export const dynamic = 'force-dynamic'

export default function Home() {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ErrorBoundary>
          <Box sx={{ 
            display: 'flex',
            justifyContent:'center',
            alignItems: 'center',
            flexDirection: 'column',
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #BBDEFB 0%, #64B5F6 100%)'
          }}>
            <Signup />
          </Box>
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
