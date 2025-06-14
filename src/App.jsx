import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { theme } from './theme';
import ErrorBoundary from './components/ErrorBoundary';
import TodoList from './pages/TodoList';
import TodoDetails from './pages/TodoDetails';
import ErrorTest from './pages/ErrorTest';
import NotFound from './pages/NotFound';
import './index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
    },
    mutations: {
      useErrorBoundary: true,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary>
          <Box sx={{ 
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #BBDEFB 0%, #64B5F6 100%)'
          }}>
            <Router>
              <Routes>
                <Route path="/" element={<TodoList />} />
                <Route path="/todo/:id" element={<TodoDetails />} />
                <Route path="/error-test" element={<ErrorTest />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
          </Box>
        </ErrorBoundary>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
