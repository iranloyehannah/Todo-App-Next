'use client'

import { useState } from 'react';
import { Box, Typography, Button, Stack, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import ErrorIcon from '@mui/icons-material/Error';

const ErrorTest = () => {
  const [shouldThrow, setShouldThrow] = useState(false);
  const router = useRouter();

  if (shouldThrow) {
    throw new Error('This is a test error!');
  }

  return (
    <Box 
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #BBDEFB 0%, #64B5F6 100%)',
        p: 2
      }}
    >
      <Paper 
        elevation={3} 
        sx={{ 
          p: 4, 
          maxWidth: 480,
          width: '100%',
          textAlign: 'center',
          borderRadius: 2,
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
        }}
      >
        <Box sx={{ mb: 3 }}>
          <ErrorIcon 
            sx={{ 
              fontSize: 48,
              color: 'error.main',
              mb: 2
            }} 
          />
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              mb: 2
            }}
          >
            Error Test Page
          </Typography>
          <Typography 
            variant="body1" 
            sx={{
              color: 'text.secondary',
              mb: 3,
              lineHeight: 1.6
            }}
          >
            Click the button below to trigger an error and test the error boundary.
          </Typography>
        </Box>

        <Stack 
          direction="row" 
          spacing={2} 
          justifyContent="center"
        >
          <Button 
            variant="contained" 
            color="error" 
            onClick={() => setShouldThrow(true)}
            sx={{ 
              background: 'linear-gradient(45deg, #f44336 30%, #ff5252 90%)',
              color: 'white',
              px: 3,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              '&:hover': {
                background: 'linear-gradient(45deg, #d32f2f 30%, #ff1744 90%)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(244, 67, 54, 0.3)'
              },
              transition: 'all 0.2s ease-in-out'
            }}
          >
            Trigger Error
          </Button>
          <Button 
            variant="contained" 
            onClick={() => router.push('/')}
            sx={{ 
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              color: 'white',
              px: 3,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2 30%, #00BCD4 90%)',
                transform: 'translateY(-1px)',
                boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)'
              },
              transition: 'all 0.2s ease-in-out'
            }}
          >
            Back to Home
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ErrorTest; 