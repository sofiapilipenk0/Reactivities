import { useState, useEffect, type FC } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

interface ActivityFilterProps {
  onFilter: (start: string, end: string) => void;
  onClear: () => void;
}

const ActivityFilter: FC<ActivityFilterProps> = ({ onFilter }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    onFilter(startDate, endDate);
  }, [startDate, endDate, onFilter]);

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      color: 'white',
      height: '40px',
      '& fieldset': { borderColor: '#cfcfcf' },
      '&:hover fieldset': { borderColor: '#cfcfcf' },
      '&.Mui-focused fieldset': { borderColor: '#cfcfcf', borderWidth: '1px' },
    },
    '& input[type="date"]::-webkit-calendar-picker-indicator': {
      filter: 'invert(1)',
      cursor: 'pointer',
    },
  };

  const labelStyles = { color: '#cfcfcf', fontSize: '0.9rem', mr: 1 };

  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={labelStyles}>Start</Typography>
        <TextField
          type="date"
          size="small"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          sx={inputStyles}
        />
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography sx={labelStyles}>End</Typography>
        <TextField
          type="date"
          size="small"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          sx={inputStyles}
        />
      </Box>

      <Button 
        variant="outlined" 
        onClick={() => { 
          setStartDate(''); 
          setEndDate(''); 
        }} 
        sx={{ 
          height: 40, 
          color: 'white', 
          borderColor: '#d8d3d3', 
          textTransform: 'none', 
          px: 2,
          '&:hover': { borderColor: 'white' }
        }}
      >
        Clean
      </Button>
    </Box>
  );
};

export default ActivityFilter;
