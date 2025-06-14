import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, createTheme } from '@mui/material';
import { ErrorBoundary } from './components';
import TodoList from './pages/TodoList';
import NotFound from './pages/NotFound';
import ErrorTest from './pages/ErrorTest';

// Create a client
const queryClient = new QueryClient();

// Create theme
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

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <ErrorBoundary>
          <Router>
            <Routes>
              <Route path="/" element={<TodoList />} />
              <Route path="/error-test" element={<ErrorTest />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </ErrorBoundary>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
