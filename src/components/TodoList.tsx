'use client'

import { useState, useMemo } from "react";
import { useTodo } from "@/hooks/useTodo";
import { type Todo } from "@/utils/localStorage";
import { 
  TodoItem,
  AddTodoDialog,
  SearchAndFilter
} from "@/components";
import { 
  Container, 
  Typography, 
  Button, 
  Box,
  CircularProgress,
  Alert,
  Pagination,
  List,
  Paper,
  useTheme,
  useMediaQuery
} from '@mui/material';

const ITEMS_PER_PAGE = 10;

const TodoList = () => {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [page, setPage] = useState(1);
  const { todos, isLoading, error, useAddTodo, deleteTodo, toggleTodo } = useTodo();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleAddTodo = (newTodo: { todo: string }) => {
    useAddTodo.mutate(newTodo);
  };

  const handleDeleteTodo = (todoId: number) => {
    deleteTodo.mutate(todoId);
  };

  const handleToggleTodo = (updatedTodo: Partial<Todo> & { id: number }) => {
    toggleTodo.mutate(updatedTodo);
  };

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    setPage(value);
  };

  const filteredTodos = useMemo(() => {
    return todos.filter((todo: Todo) => {
      const matchesSearch = searchTerm === '' || 
        todo.todo.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = filterStatus === 'all' || 
        (filterStatus === 'completed' && todo.completed) ||
        (filterStatus === 'pending' && !todo.completed);
      
      return matchesSearch && matchesFilter;
    });
  }, [todos, searchTerm, filterStatus]);

  const totalPages = Math.ceil((filteredTodos?.length || 0) / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentTodos = filteredTodos?.slice(startIndex, endIndex) || [];

  if (isLoading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <CircularProgress />
    </Box>
  );
  
  if (error) return (
    <Container maxWidth="md" sx={{ mt: 4, px: 2 }}>
      <Alert severity="error">Error: {error.message}</Alert>
    </Container>
  );

  return (
    <Box
      sx={{
        minHeight: '100vh',
        py: { xs: 2, sm: 3, md: 4 },
        px: { xs: 1, sm: 2 }
      }}
    >
      <Container maxWidth="md" sx={{ px: { xs: 1, sm: 2 } }}>
        <Box 
          display="flex" 
          flexDirection={{ xs: 'column', sm: 'row' }}
          justifyContent="space-between" 
          alignItems={{ xs: 'stretch', sm: 'center' }}
          gap={2}
          mb={4}
          sx={{
            background: 'linear-gradient(90deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.7) 100%)',
            p: { xs: 2, sm: 3 },
            borderRadius: 2,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            fontWeight="bold" 
            color="primary"
            sx={{ 
              fontSize: { xs: '1.5rem', sm: '2rem' },
              textAlign: { xs: 'center', sm: 'left' }
            }}
          >
            Todo List
          </Typography>
          <Button
            variant="contained"
            onClick={() => setIsAddDialogOpen(true)}
            fullWidth={isMobile}
            sx={{
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976D2 30%, #1CB5E0 90%)',
              },
              maxWidth: { xs: '100%', sm: 'auto' }
            }}
          >
            Add Todo
          </Button>
        </Box>

        <SearchAndFilter
          onSearch={setSearchTerm}
          onFilter={setFilterStatus}
        />

        {filteredTodos.length === 0 ? (
          <Paper 
            sx={{ 
              p: { xs: 2, sm: 3 }, 
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}
          >
            <Typography color="text.secondary">
              {searchTerm || filterStatus !== 'all' 
                ? 'No todos match your search criteria'
                : 'No todos yet. Add one to get started!'}
            </Typography>
          </Paper>
        ) : (
          <Paper
            sx={{
              background: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              borderRadius: 2,
              overflow: 'hidden'
            }}
          >
            <List>
              {currentTodos.map((todo: Todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onDelete={handleDeleteTodo}
                  onToggle={handleToggleTodo}
                />
              ))}
            </List>
          </Paper>
        )}

        {totalPages > 1 && (
          <Box 
            display="flex" 
            justifyContent="center" 
            mt={4}
            sx={{
              '& .MuiPagination-ul': {
                flexWrap: 'wrap',
                justifyContent: 'center'
              }
            }}
          >
            <Pagination 
              count={totalPages} 
              page={page} 
              onChange={handlePageChange}
              color="primary"
              showFirstButton={!isMobile}
              showLastButton={!isMobile}
              size={isMobile ? "small" : "medium"}
            />
          </Box>
        )}

        <AddTodoDialog
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          onAdd={handleAddTodo}
        />
      </Container>
    </Box>
  );
};

export default TodoList; 