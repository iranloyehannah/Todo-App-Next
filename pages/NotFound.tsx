'use client'

import { Box, Typography, Button, Paper } from '@mui/material';
import { useRouter } from 'next/navigation';
import SearchOffIcon from '@mui/icons-material/SearchOff';


const NotFound = () => {
  const router = useRouter();

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
        <Box sx={{ mb: 3 }}>
          <SearchOffIcon 
            sx={{ 
              fontSize: 80, 
              color: 'text.secondary', 
              mb: 2,
              opacity: 0.8
            }} 
          />
          <Typography 
            variant="h4" 
            gutterBottom
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              mb: 2,
              letterSpacing: '-0.5px'
            }}
          >
            Page Not Found
          </Typography>
          <Typography 
            color="text.secondary"
            sx={{
              fontSize: '1.1rem',
              lineHeight: 1.6,
              mb: 3
            }}
          >
            The page you&apos;re looking for doesn&apos;t exist
          </Typography>
        </Box>

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
      </Paper>
    </Box>
  );
};

export default NotFound; 