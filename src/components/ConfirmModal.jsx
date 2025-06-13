import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography
} from '@mui/material';

const ConfirmModal = ({ open, onClose, onConfirm, title }) => {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      sx={{
        '& .MuiDialog-paper': {
          background: 'linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)',
          borderRadius: 2,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      <DialogTitle 
        id="confirm-dialog-title"
        sx={{ 
          background: 'linear-gradient(45deg, #FF5252 30%, #FF1744 90%)',
          color: 'white',
          fontWeight: 600,
          py: 2
        }}
      >
        Confirm Delete
      </DialogTitle>
      <DialogContent sx={{ py: 3 }}>
        <Typography 
          id="confirm-dialog-description"
          sx={{
            pt:"20px",
            textAlign: 'center',
            fontWeight: 600,
            fontSize: '1.1rem',
            color: 'text.primary'
          }}
        >
          Are you sure you want to delete "{title}"?
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2, bgcolor: 'rgba(0, 0, 0, 0.02)' }}>
        <Button 
          onClick={onClose} 
          color="primary"
          id="cancel-delete"
          name="cancel-delete"
          aria-label="Cancel deletion"
          sx={{
            color: 'text.secondary',
            borderColor: '#E0E0E0',
            '&:hover': {
              borderColor: '#BDBDBD',
              bgcolor: 'rgba(0, 0, 0, 0.04)'
            }
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={onConfirm} 
          color="error" 
          variant="contained"
          id="confirm-delete"
          name="confirm-delete"
          aria-label="Confirm deletion"
          sx={{
            background: 'linear-gradient(45deg, #FF5252 30%, #FF1744 90%)',
            boxShadow: '0 3px 5px 2px rgba(255, 23, 68, .3)',
            '&:hover': {
              background: 'linear-gradient(45deg, #D32F2F 30%, #D50000 90%)',
            }
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;