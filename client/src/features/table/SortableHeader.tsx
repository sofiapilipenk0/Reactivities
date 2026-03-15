import { type FC } from 'react';
import { TableCell, Box } from '@mui/material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import type { Column } from './types';

interface Props {
  column: Column;
  width: number;
  onResize: (id: string, startX: number, startWidth: number) => void;
}
const SortableHeader: FC<Props> = ({ column, width, onResize }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: column.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    width: width,
    minWidth: width,
    maxWidth: width,
    position: 'relative' as const,
    borderRight: '1px solid #e0e0e0',
    backgroundColor: '#f8f9fa',
    zIndex: isDragging ? 3 : 2,
    boxSizing: 'border-box' as const,
    padding: 0,
    cursor: isDragging ? 'grabbing' : 'grab',
  };

  return (
    <TableCell
      ref={setNodeRef}
      align={column.align}
      sx={style}
    >
      <Box
        {...attributes}
        {...listeners}
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 1.5, 
          height: '100%',
          width: `calc(100% - 8px)`, 
          fontWeight: 700,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {column.label}
      </Box>
      <Box
        onMouseDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onResize(column.id, e.clientX, width);
        }}
        sx={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: 0,
          width: '8px',
          cursor: 'col-resize',
          zIndex: 10,
          '&:hover': { 
            borderRight: '3px solid #1976d2' 
          },
        }}
      />
    </TableCell>
  );
};

export default SortableHeader;
