import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Button,
  Chip,
  CircularProgress,
  Alert
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useTodo } from '../hooks/useTodo';

const TodoDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { todos, isLoading, error } = useTodo();

  if (isLoading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '60vh'
      }}>
        <CircularProgress sx={{ color: 'primary.main' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
        <Alert 
          severity="error" 
          sx={{ 
            mt: 2,
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          Error loading todo: {error.message}
        </Alert>
      </Box>
    );
  }

  const todo = todos.find(t => t.id === parseInt(id));

  if (!todo) {
    return (
      <Box sx={{ maxWidth: 800, mx: 'auto', p: 2 }}>
        <Alert 
          severity="error" 
          sx={{ 
            mt: 2,
            borderRadius: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
          }}
        >
          Todo not found
        </Alert>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ 
            mt: 2,
            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
            color: 'white',
            '&:hover': {
              background: 'linear-gradient(45deg, #1976D2 30%, #00BCD4 90%)',
            }
          }}
        >
          Back to List
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      maxWidth: 800, 
      mx: 'auto', 
      p: 2,
      minHeight: '100vh'
    }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/')}
        sx={{ 
          mb: 2,
          background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
          color: 'white',
          '&:hover': {
            background: 'linear-gradient(45deg, #1976D2 30%, #00BCD4 90%)',
          }
        }}
      >
        Back to List
      </Button>

      <Paper sx={{ 
        p: 4,
        borderRadius: 2,
        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
      }}>
        <Box sx={{ mb: 4 }}>
          <Typography 
            variant="h4" 
            component="h1" 
            gutterBottom
            sx={{
              fontWeight: 600,
              color: 'text.primary',
              mb: 2
            }}
          >
            {todo.todo}
          </Typography>
          <Chip
            label={todo.completed ? "Completed" : "Pending"}
            color={todo.completed ? "success" : "warning"}
            sx={{ 
              mb: 2,
              fontWeight: 600,
              fontSize: '0.9rem',
              height: 32,
              '& .MuiChip-label': {
                px: 2
              }
            }}
          />
        </Box>

        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: 3
        }}>
          <Box sx={{ 
            p: 2,
            borderRadius: 1,
            bgcolor: 'rgba(0,0,0,0.02)'
          }}>
            <Typography 
              variant="subtitle2" 
              color="text.secondary"
              sx={{ mb: 1, fontWeight: 600 }}
            >
              Status
            </Typography>
            <Typography sx={{ fontWeight: 500 }}>
              {todo.completed ? "Completed" : "Pending"}
            </Typography>
          </Box>

          <Box sx={{ 
            p: 2,
            borderRadius: 1,
            bgcolor: 'rgba(0,0,0,0.02)'
          }}>
            <Typography 
              variant="subtitle2" 
              color="text.secondary"
              sx={{ mb: 1, fontWeight: 600 }}
            >
              User
            </Typography>
            <Typography sx={{ fontWeight: 500 }}>
              {todo.userId}
            </Typography>
          </Box>

          <Box sx={{ 
            p: 2,
            borderRadius: 1,
            bgcolor: 'rgba(0,0,0,0.02)'
          }}>
            <Typography 
              variant="subtitle2" 
              color="text.secondary"
              sx={{ mb: 1, fontWeight: 600 }}
            >
              Todo ID
            </Typography>
            <Typography sx={{ fontWeight: 500 }}>
              {todo.id}
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default TodoDetails; 