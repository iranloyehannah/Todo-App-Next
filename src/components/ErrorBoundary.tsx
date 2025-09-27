import { ErrorBoundary } from 'react-error-boundary';
import { Box, Typography, Button, Paper } from '@mui/material';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}


const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh"
      role="alert"
      aria-live="assertive"
      sx={{
        background: 'linear-gradient(135deg, #BBDEFB 0%, #64B5F6 100%)'
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 480 }}>
        <Typography variant="h5" color="error" gutterBottom component="h1">
          Something went wrong.
        </Typography>
        <Typography variant="body1" gutterBottom>
          An unexpected error occurred. Please try again.
        </Typography>
        {process.env.NODE_ENV === 'development' && error && (
          <Box 
            mt={2} 
            sx={{
              p: 2,
              borderRadius: 1,
              bgcolor: 'rgba(0,0,0,0.02)',
              border: '1px solid rgba(0,0,0,0.05)'
            }}
          >
            <Typography 
              variant="subtitle2" 
              component="h2"
              sx={{ 
                mb: 1,
                fontWeight: 600,
                color: 'text.primary'
              }}
            >
              Error details:
            </Typography>
            <Typography 
              variant="body2" 
              color="textSecondary" 
              component="pre" 
              sx={{ 
                whiteSpace: 'pre-wrap',
                fontFamily: 'monospace',
                fontSize: '0.875rem',
                lineHeight: 1.5,
                color: 'error.main',
                p: 1,
                borderRadius: 1,
                bgcolor: 'white'
              }}
            >
              {error.toString()}
            </Typography>
          </Box>
        )}
        <Button 
          variant="contained" 
          color="primary" 
          onClick={resetErrorBoundary} 
          sx={{ mt: 2 }}
          id="retry-button"
          name="retry-button"
          aria-label="Try again"
        >
          Try Again
        </Button>
      </Paper>
    </Box>
  );
};

interface AppErrorBoundaryProps {
  children: React.ReactNode;
}

const AppErrorBoundary: React.FC<AppErrorBoundaryProps> = ({ children }) => {
  return (
    <ErrorBoundary 
      FallbackComponent={ErrorFallback} 
      onReset={() => window.location.reload()}
      onError={(error) => {
        console.error('Error caught by boundary:', error);
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default AppErrorBoundary; 