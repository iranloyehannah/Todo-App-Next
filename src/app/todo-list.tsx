

'use client'

import { useRef } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { ErrorBoundary } from '@/components';
import { AuthProvider, useAuth } from '@/components/AuthProvider';
import TodoList from '@/components/TodoList';
import Login from '@/components/Login'; 

// Theme
const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
  },
});

// Force dynamic rendering
export const dynamic = 'force-dynamic';

function ProtectedApp() {
  const { user } = useAuth();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #BBDEFB 0%, #64B5F6 100%)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {user ? <TodoList /> : <Login />}
    </Box>
  );
}

export default function Home() {
  const queryClientRef = useRef(new QueryClient());

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ErrorBoundary>
          <AuthProvider>
            <ProtectedApp />
          </AuthProvider>
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  );
}