// import { useUpdateTodo, useToggleTodo } from "../hooks/useTodo";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ListItem,
  Checkbox,
  Typography,
  IconButton,
  Box,
  Chip,
  useMediaQuery,
  useTheme
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import ConfirmModal from './ConfirmModal';

const TodoItem = ({ todo, onDelete, onToggle }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.todo);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleSave = () => {
    if (editedTitle.trim() === "") return;
    // Only update the title, preserve the completion status
    onToggle({ ...todo, todo: editedTitle });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedTitle(todo.todo);
  };

  const handleTitleClick = () => {
    navigate(`/todo/${todo.id}`);
  };

  const handleToggle = () => {
    // Only toggle completion status
    onToggle({ ...todo, completed: !todo.completed });
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(todo.id);
    setShowDeleteModal(false);
  };

  return (
    <>
      <ListItem
        sx={{
          display: 'flex',
          alignItems: isMobile ? 'flex-start' : 'center',
          gap: 2,
          py: isMobile ? 2 : 1.5,
          px: 2,
          borderBottom: '1px solid',
          borderColor: 'divider',
          transition: 'all 0.2s ease-in-out',
          '&:hover': { 
            bgcolor: 'rgba(25, 118, 210, 0.04)',
            transform: 'translateX(4px)'
          },
          '&:last-child': {
            borderBottom: 'none'
          }
        }}
      >
        {isEditing ? (
          <>
            <input
              id={`edit-todo-${todo.id}`}
              name={`edit-todo-${todo.id}`}
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              autoFocus
              style={{
                flex: 1,
                padding: '8px',
                fontSize: '1rem',
                border: '1px solid #ccc',
                borderRadius: '4px',
                outline: 'none',
                backgroundColor: 'rgba(255, 255, 255, 0.9)'
              }}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
            <IconButton onClick={handleSave} color="primary">
              <SaveIcon />
            </IconButton>
            <IconButton onClick={handleCancel} color="inherit">
              <CancelIcon />
            </IconButton>
          </>
        ) : (
          <>
            <Checkbox
              checked={todo.completed}
              onChange={handleToggle}
              color="primary"
              sx={{
                mt: isMobile ? 0.5 : 0,
                '&.Mui-checked': {
                  color: 'primary.main'
                }
              }}
            />
            <Box sx={{ 
              flexGrow: 1,
              display: 'flex',
              flexDirection: isMobile ? 'column' : 'row',
              alignItems: isMobile ? 'flex-start' : 'center',
              gap: isMobile ? 1.5 : 2,
              minWidth: 0,
              width: '100%'
            }}>
              <Box sx={{ 
                display: 'flex',
                flexDirection: 'column',
                gap: 1,
                width: '100%'
              }}>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: '100%',
                  gap: 1
                }}>
                  <Typography
                    onClick={handleTitleClick}
                    sx={{
                      cursor: 'pointer',
                      textDecoration: todo.completed ? 'line-through' : 'none',
                      color: todo.completed ? 'text.secondary' : 'text.primary',
                      transition: 'color 0.2s ease-in-out',
                      '&:hover': { 
                        color: 'primary.main',
                        textDecoration: 'none'
                      },
                      wordBreak: 'break-word',
                      flex: 1,
                      fontSize: isMobile ? '1rem' : 'inherit',
                      pr: 1,
                      display: 'flex',
                      alignItems: 'center',
                      minHeight: '40px'
                    }}
                  >
                    {todo.todo}
                  </Typography>
                  <Box sx={{ 
                    display: 'flex', 
                    alignItems: 'center',
                    gap: 1,
                    flexShrink: 0
                  }}>
                    {!isMobile && (
                      <Chip
                        label={todo.completed ? "Complete" : "Pending"}
                        color={todo.completed ? "success" : "warning"}
                        size="medium"
                        sx={{
                          fontWeight: 500,
                          '&.MuiChip-colorSuccess': {
                            bgcolor: 'rgba(46, 125, 50, 0.1)',
                            color: 'success.main'
                          },
                          '&.MuiChip-colorWarning': {
                            bgcolor: 'rgba(237, 108, 2, 0.1)',
                            color: 'warning.main'
                          }
                        }}
                      />
                    )}
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                      <IconButton 
                        onClick={() => setIsEditing(true)} 
                        color="primary"
                        size={isMobile ? "small" : "medium"}
                        sx={{
                          '&:hover': {
                            bgcolor: 'rgba(25, 118, 210, 0.08)'
                          }
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton 
                        onClick={handleDeleteClick} 
                        color="error"
                        size={isMobile ? "small" : "medium"}
                        sx={{
                          '&:hover': {
                            bgcolor: 'rgba(211, 47, 47, 0.08)'
                          }
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </Box>
                {isMobile && (
                  <Chip
                    label={todo.completed ? "Complete" : "Pending"}
                    color={todo.completed ? "success" : "warning"}
                    size="small"
                    sx={{
                      alignSelf: 'flex-start',
                      fontWeight: 500,
                      '&.MuiChip-colorSuccess': {
                        bgcolor: 'rgba(46, 125, 50, 0.1)',
                        color: 'success.main'
                      },
                      '&.MuiChip-colorWarning': {
                        bgcolor: 'rgba(237, 108, 2, 0.1)',
                        color: 'warning.main'
                      }
                    }}
                  />
                )}
              </Box>
            </Box>
          </>
        )}
      </ListItem>

      <ConfirmModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title={todo.todo}
      />
    </>
  );
};

export default TodoItem;
