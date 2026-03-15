import { type FC, useMemo, useRef, useState, useEffect } from 'react';
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import ActivityDetailsDrawer from './ActivityDetailsDrawer';
import ActivityFilter from './ActivityFilter';
import ActivitySearch from './ActivitySearch';
import type { ActivityDto, Column } from './types';
import SortableHeaderCell from './SortableHeader';

interface ActivityTableViewProps {
  columns: readonly Column[];
  filteredActivities: ActivityDto[];
  page: number;
  totalCount: number;
  selectedActivity: ActivityDto | null;
  drawerWidth: number;
  columnWidths: Record<string, number>;
  isLoading: boolean;
  setSelectedActivity: (a: ActivityDto | null) => void;
  setDateRange: (range: { start: string; end: string }) => void;
  setSearchQuery: (q: string) => void;
  handleChangePage: (e: any, p: number) => void;
  handleColumnResize: (id: string, startX: number, startWidth: number) => void;
  handleDrawerMouseDown: (e: React.MouseEvent) => void;
  setDynamicRowsPerPage: (count: number) => void; 
}

const ROW_HEIGHT = 56;
const HEADER_HEIGHT = 56;
const PAGINATION_HEIGHT = 52;
const DEFAULT_COLUMN_WIDTH = 150;

const ActivityTableView: FC<ActivityTableViewProps> = ({
  columns, filteredActivities, page, totalCount, selectedActivity, drawerWidth, columnWidths, 
  setSelectedActivity, setDateRange, setSearchQuery, handleChangePage, 
  handleColumnResize, handleDrawerMouseDown, setDynamicRowsPerPage
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [localRowsPerPage, setLocalRowsPerPage] = useState(10);

  useEffect(() => {
    const calculateRows = () => {
      if (!containerRef.current) return;
      const parentHeight = containerRef.current.parentElement?.clientHeight || 0;
      const availableHeight = parentHeight - HEADER_HEIGHT - PAGINATION_HEIGHT;

      const count = Math.max(5, Math.floor(availableHeight / ROW_HEIGHT));
      
      setLocalRowsPerPage(count);
      setDynamicRowsPerPage(count); 
    };

    const ro = new ResizeObserver(calculateRows);
    if (containerRef.current) ro.observe(containerRef.current);
    calculateRows();
    
    return () => ro.disconnect();
  }, [setDynamicRowsPerPage]);

  const totalTableWidth = useMemo(() => 
    columns.reduce((acc, col) => acc + (columnWidths[col.id] || DEFAULT_COLUMN_WIDTH), 0), 
    [columnWidths, columns]
  );

  const visibleRows = useMemo(() => {
    const start = page * localRowsPerPage;
    return filteredActivities.slice(start, start + localRowsPerPage);
  }, [filteredActivities, page, localRowsPerPage]);

  return (
    <Box sx={{ 
      display:'flex', 
      flexDirection:'column', 
      gap:2, 
      height:'calc(100vh - 120px)', 
      width: '100%',
      overflow: 'hidden' 
    }}>
      <Box sx={{ display:'flex', gap:2, alignItems:'center', flexShrink:0 }}>
        <ActivityFilter 
            onFilter={(start, end) => setDateRange({ start, end })} 
            onClear={() => setDateRange({ start: '', end: '' })}
        />
        <ActivitySearch onSearch={setSearchQuery}/>
      </Box>
      <Box sx={{ display:'flex', width:'100%', gap:selectedActivity ? 1 : 0, flexGrow:1, overflow:'hidden' }}>
        <Box sx={{ flexGrow:1, display:'flex', flexDirection:'column', minWidth:0, overflow: 'hidden' }}>
          <Paper sx={{ 
            display:'flex', 
            flexDirection:'column', 
            borderRadius:'8px', 
            border:'1px solid #e0e0e0', 
            width:'100%', 
            height:'100%', 
            overflow:'hidden',
            boxShadow: 'none'
          }}>
            
            <TableContainer 
              ref={containerRef} 
              sx={{ 
                flexGrow: 1, 
                overflowY: 'auto', 
                overflowX: 'auto',
                backgroundColor: '#fff',
                position: 'relative'
              }}
            >
              <Table 
                stickyHeader 
                size="small" 
                sx={{ 
                  tableLayout: 'fixed', 
                  width: totalTableWidth,
                  height: 'auto',
                  minHeight: `${(ROW_HEIGHT * 5) + HEADER_HEIGHT}px` 
                }}
              >
                <TableHead>
                  <TableRow sx={{ height: HEADER_HEIGHT }}>
                    {columns.map(column => (
                      <SortableHeaderCell 
                        key={column.id} 
                        column={column} 
                        width={columnWidths[column.id] || DEFAULT_COLUMN_WIDTH} 
                        onResize={handleColumnResize}
                      />
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {visibleRows.map(activity => (
                    <TableRow 
                        hover 
                        key={activity.id} 
                        onClick={() => setSelectedActivity(activity)} 
                        selected={selectedActivity?.id === activity.id} 
                        sx={{ 
                          height: ROW_HEIGHT,
                          maxHeight: ROW_HEIGHT,
                          cursor: 'pointer',
                          '&.Mui-selected': { backgroundColor: '#f5f5f5' }
                        }}
                    >
                      {columns.map(column => (
                        <TableCell 
                          key={column.id} 
                          align={column.align} 
                          sx={{ 
                            width: columnWidths[column.id], 
                            borderRight: '1px solid #f0f0f0', 
                            padding: '4px 12px',
                            height: ROW_HEIGHT,
                            boxSizing: 'border-box'
                          }}
                        >
                          <Box sx={{ display: '-webkit-box', WebkitLineClamp: 1, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {column.id === 'isCancelled'
                              ? <Box sx={{ px: 1, color: 'white', borderRadius: '4px', fontSize: '0.8rem', backgroundColor: activity.isCancelled ? '#d32f2f' : '#2e7d32', display:'inline-block' }}>
                                  {activity.isCancelled ? 'Cancelled' : 'Active'}
                                </Box>
                              : column.format ? column.format(activity[column.id as keyof ActivityDto]) : String(activity[column.id as keyof ActivityDto] ?? '')
                            }
                          </Box>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                  <TableRow style={{ height: 'auto' }}>
                    <TableCell colSpan={columns.length} style={{ border: 0, padding: 0 }} />
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination 
                component="div"
                count={totalCount}
                rowsPerPage={localRowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPageOptions={[]}
                sx={{ 
                  borderTop:'1px solid #e0e0e0', 
                  flexShrink: 0,
                  backgroundColor: '#fff',
                  zIndex: 10
                }}
            />
          </Paper>
        </Box>
        <ActivityDetailsDrawer
          selectedActivity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
          columns={columns}
          drawerWidth={drawerWidth}
          onMouseDown={handleDrawerMouseDown}
        />
      </Box>
    </Box>
  );
};

export default ActivityTableView;
