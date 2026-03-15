import React, { useState } from 'react';
import { Drawer, Box, Typography, IconButton, Stack, Tabs, Tab } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import type { ActivityDto, Column } from './types';
import AttendeeTable from './AttendeeTable';

interface ActivityDetailsDrawerProps {
  selectedActivity: ActivityDto | null;
  onClose: () => void;
  columns: readonly Column[];
  drawerWidth: number;
  onMouseDown: (e: React.MouseEvent) => void;
}

const ActivityDetailsDrawer: React.FC<ActivityDetailsDrawerProps> = ({
  selectedActivity,
  onClose,
  columns,
  drawerWidth,
  onMouseDown,
}) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Drawer
      variant="persistent"
      anchor="right"
      open={Boolean(selectedActivity)}
      sx={{
        width: selectedActivity ? drawerWidth : 0,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          position: 'fixed',
          height: '100%',
          transition: 'none',
          overflowX: 'hidden',
          borderLeft: '1px solid #000000',
        },
      }}
    >
      <Box
        onMouseDown={onMouseDown}
        sx={{
          width: '4px',
          position: 'absolute',
          top: 0,
          left: 0,
          bottom: 0,
          zIndex: 10,
          cursor: 'ew-resize',
          '&:hover': { backgroundColor: '#918b8b' },
        }}
      />

      <Box sx={{ p: 3, width: '100%' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 500 }}>
          </Typography>
        </Box>

<Box sx={{ display: 'flex', alignItems: 'center', borderBottom: 1, borderColor: 'divider', mb: 2 }}>
  <Tabs 
    value={activeTab} 
    onChange={handleTabChange} 
    sx={{flexGrow: 1, '& .MuiTab-root': {color: 'text.secondary', '&.Mui-selected': {color: '#000',
        },
      },
    }}
    TabIndicatorProps={{
      style: { backgroundColor: '#000' }
    }}
  >
    <Tab label="Activity" />
    <Tab label="Attendees" />
  </Tabs>
  <IconButton onClick={onClose} size="small" sx={{ ml: 1 }}>
    <CloseIcon />
  </IconButton>
</Box>

        {selectedActivity && (
          <Box>
            {activeTab === 0 && (
              <Stack spacing={3}>
                {columns.map((column) => (
                  <Box key={column.id}>
                    <Typography 
                      variant="caption" 
                      color="text.secondary" 
                      sx={{ 
                        display: 'block', 
                        fontWeight: 'bold', 
                        textTransform: 'uppercase', 
                        fontSize: '0.7rem',
                        letterSpacing: '0.05rem',
                        mb: 0.5 
                      }}
                    >
                      {column.label}
                    </Typography>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        wordBreak: 'break-word', 
                        lineHeight: 1.4
                      }}
                    >
                      {column.format 
                        ? column.format(selectedActivity[column.id as keyof ActivityDto]) 
                        : String(selectedActivity[column.id as keyof ActivityDto] ?? '—')}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            )}

            {activeTab === 1 && (
              <AttendeeTable attendees={selectedActivity.attendees} />
            )}
            
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default ActivityDetailsDrawer;
