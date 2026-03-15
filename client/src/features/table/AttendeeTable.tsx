import { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Box } from '@mui/material';
import type { FC } from 'react';

interface Attendee {
  displayName: string;
  bio?: string;
  id?: string;
}

const AttendeeTable: FC<{ attendees: Attendee[] }> = ({ attendees }) => {
  const [nameWidth, setNameWidth] = useState(200);

  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = nameWidth;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = Math.max(100, Math.min(600, startWidth + (moveEvent.clientX - startX)));
      setNameWidth(newWidth);
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  return (
    <Box sx={{ mt: 3 }}>
      <TableContainer component={Paper} variant="outlined" sx={{ maxHeight: 350 }}>
        <Table stickyHeader sx={{ tableLayout: 'fixed' }}>
          <TableHead>
            <TableRow>
              <TableCell sx={{ 
                width: nameWidth, 
                position: 'relative', 
                fontWeight: 600, 
                borderRight: '1px solid #e0e0e0',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}>
                Name
                <Box
                  onMouseDown={handleMouseDown}
                  sx={{
                    position: 'absolute',
                    right: -5,
                    top: 0,
                    bottom: 0,
                    width: '10px',
                    cursor: 'col-resize',
                    zIndex: 10,
                    '&:hover': { borderRight: '2px solid #a4a7aa' }
                  }}
                />
              </TableCell>
              
              <TableCell sx={{ fontWeight: 600 }}>Bio</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendees.map((attendee, index) => (
              <TableRow key={attendee.id || index} hover>
                <TableCell sx={{ 
                  borderRight: '1px solid #e0e0e0',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {attendee.displayName}
                </TableCell>
                <TableCell sx={{ 
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {attendee.bio || 'no bio'}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default AttendeeTable;
