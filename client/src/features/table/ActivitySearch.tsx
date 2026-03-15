import { useState, useEffect, type FC } from 'react';
import { Box, TextField, Button } from '@mui/material';

interface ActivitySearchProps {
  onSearch: (query: string) => void;
}

const ActivitySearch: FC<ActivitySearchProps> = ({ onSearch }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(value);
    }, 500);

    return () => clearTimeout(handler);
  }, [value, onSearch]);

  const handleClear = () => {
    setValue('');
  };

  return (
    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', minWidth: '350px' }}>
      <TextField
        fullWidth
        size="small"
        placeholder="Search"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        sx={{
          '& .MuiOutlinedInput-root': {
            color: 'white',
            height: '40px', 
            '& fieldset': { borderColor: '#c9c9c9' },
            '&:hover fieldset': { borderColor: '#ffffff' },
            '&.Mui-focused fieldset': { borderColor: '#ffffff' },
          },
          '& .MuiInputBase-input::placeholder': { color: '#c9c9c9', opacity: 1 },
        }}
      />
      <Button
        variant="outlined"
        onClick={handleClear}
        sx={{
          height: 40,
          color: 'white',
          borderColor: '#d8d3d3',
          textTransform: 'none',
          px: 2,
          '&:hover': { borderColor: '#ffffff', bgcolor: '#373737db' }
        }}
      >
        Clean
      </Button>
    </Box>
  );
};

export default ActivitySearch;
