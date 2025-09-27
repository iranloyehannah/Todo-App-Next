import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box
} from '@mui/material';
 
interface AddTodoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (todo: { todo: string }) => void;
}

const AddTodoDialog: React.FC<AddTodoDialogProps> = ({ isOpen, onClose, onAdd }) => {
  const [todoText, setTodoText] = useState('');

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (todoText.trim()) {
      onAdd({ todo: todoText.trim() });
      setTodoText('');
      onClose();
    }
  };

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            background: 'linear-gradient(135deg, #ffffff 0%, #f5f7fa 100%)',
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }
        }
      }}
    >
      <DialogTitle 
        sx={{ 
          background: 'linear-gradient(45deg, #1976D2 30%, #2196F3 90%)',
          color: 'white',
          fontWeight: 600,
          py: 2
        }}
      >
        Add New Todo
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent sx={{ py: 5 }}>
          <Box sx={{ width: '100%' }}>
            <TextField
              id="new-todo"
              name="new-todo"
              autoFocus
              fullWidth
              value={todoText}
              onChange={(e) => setTodoText(e.target.value)}
              placeholder="Enter todo text..."
              variant="outlined"
              size="small"
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: 'rgba(25, 118, 210, 0.2)',
                  },
                  '&:hover fieldset': {
                    borderColor: 'primary.main',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: 'primary.main',
                  },
                },
                '& .MuiInputBase-input': {
                  color: 'text.primary',
                  '&::placeholder': {
                    color: 'text.secondary',
                    opacity: 0.7
                  }
                }
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, py: 2, bgcolor: 'rgba(0, 0, 0, 0.02)' }}>
          <Button 
            onClick={onClose} 
            color="inherit"
            sx={{
              color: 'text.secondary',
              '&:hover': {
                bgcolor: 'rgba(0, 0, 0, 0.04)'
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            disabled={!todoText.trim()}
            sx={{
               background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
               boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
              },
              '&.Mui-disabled': {
                background: 'linear-gradient(45deg, #BBDEFB 30%, #90CAF9 90%)',
                color: 'white'
              }
            }}
          >
            Add Todo
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddTodoDialog; 