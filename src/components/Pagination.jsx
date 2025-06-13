import { Button, Box, Typography } from '@mui/material';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <nav aria-label="pagination" style={{ marginTop: '2rem' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
          bgcolor: 'white',
          p: 2,
          borderRadius: 2,
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
        }}
      >
        <Button
          variant="contained"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          sx={{
            fontWeight: 600,
            textTransform: 'none',
            bgcolor: '#E3F2FD',
            color: '#1976D2',
            '&:hover': {
              bgcolor: '#BBDEFB',
              color: '#1565C0'
            },
            '&.Mui-disabled': {
              bgcolor: '#F5F5F5',
              color: '#9E9E9E'
            }
          }}
        >
          Previous
        </Button>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            bgcolor: '#F5F5F5',
            px: 3,
            py: 1.5,
            borderRadius: 1,
            border: '1px solid #E0E0E0'
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: 600,
              color: '#424242',
              letterSpacing: '0.5px'
            }}
          >
            Page {currentPage} of {totalPages}
          </Typography>
        </Box>

        <Button
          variant="contained"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          sx={{
            fontWeight: 600,
            textTransform: 'none',
            bgcolor: '#E3F2FD',
            color: '#1976D2',
            '&:hover': {
              bgcolor: '#BBDEFB',
              color: '#1565C0'
            },
            '&.Mui-disabled': {
              bgcolor: '#F5F5F5',
              color: '#9E9E9E'
            }
          }}
        >
          Next
        </Button>
      </Box>
    </nav>
  );
};

export default Pagination;