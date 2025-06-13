import { useState } from 'react';
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const SearchAndFilter = ({ onSearch, onFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleSearchChange = (event) => {
    const value = event.target.value;
    //search character by value
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilterStatus(value);
    onFilter(value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2,
        mb: 3,
        p: { xs: 1.5, sm: 2 },
        bgcolor: 'white',
        borderRadius: 2,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
      }}
    >
      <TextField
        id="search-todo"
        name="search-todo"
        label="Search todos"
        variant="outlined"
        size="small"
        value={searchTerm}
        onChange={handleSearchChange}
        fullWidth
        InputProps={{
          startAdornment: <SearchIcon sx={{ color: '#9E9E9E', mr: 1 }} />,
          endAdornment: searchTerm && (
            <InputAdornment position="end">
              <IconButton
                size="small"
                onClick={handleClearSearch}
                edge="end"
                aria-label="Clear search"
              >
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          )
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            bgcolor: '#F5F5F5',
            '& fieldset': {
              borderColor: '#E0E0E0',
            },
            '&:hover fieldset': {
              borderColor: '#BBDEFB',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1976D2',
            },
          },
          '& .MuiInputLabel-root': {
            color: '#757575',
          },
          '& .MuiInputBase-input': {
            color: '#424242',
          }
        }}
      />

      <FormControl 
        size="small" 
        sx={{ 
          minWidth: { xs: '100%', sm: 200 },
          '& .MuiOutlinedInput-root': {
            bgcolor: '#F5F5F5',
          }
        }}
      >
        <InputLabel 
          id="status-filter-label"
          sx={{ color: '#757575' }}
        >
          Status
        </InputLabel>
        <Select
          labelId="status-filter-label"
          id="status-filter"
          name="status-filter"
          value={filterStatus}
          label="Status"
          onChange={handleFilterChange}
          sx={{
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: '#E0E0E0',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#BBDEFB',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#1976D2',
            },
            '& .MuiSelect-select': {
              color: '#424242',
            }
          }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="pending">Pending</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default SearchAndFilter; 