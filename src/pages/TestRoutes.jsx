import React from 'react';
import { Box, Typography, Button, Paper, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TestRoutes = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        background: 'linear-gradient(135deg, #BBDEFB 0%, #64B5F6 100%)'
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
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)'
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            mb: 4
          }}
        >
          Test Routes
        </Typography>

        <Stack spacing={2}>
          <Button
            variant="contained"
            onClick={() => navigate('/error-test')}
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
            Test Error Page
          </Button>

          <Button
            variant="contained"
            onClick={() => navigate('/non-existent-page')}
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
            Test 404 Page
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate('/')}
            sx={{ 
              borderColor: 'text.secondary',
              color: 'text.secondary',
              px: 3,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              '&:hover': {
                borderColor: 'text.primary',
                color: 'text.primary',
                backgroundColor: 'rgba(0, 0, 0, 0.04)'
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

export default TestRoutes; 