import React, { useState, useEffect, useCallback, type FC } from 'react';
import { DndContext, closestCenter, type DragEndEvent, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable';
import type { ActivityDto, Column } from './types';
import ActivityTableView from './ActivityTableView';
import agent from '../../lib/api/agent';

const ActivityTable: FC<{ columns: readonly Column[] }> = ({ columns: initialColumns }) => {
  const [activities, setActivities] = useState<ActivityDto[]>([]);
  const [totalCount, setTotalCount] = useState(0); 
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0); 
  const [dynamicPageSize, setDynamicPageSize] = useState(0);
  const [selectedActivity, setSelectedActivity] = useState<ActivityDto | null>(null); 
  
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [searchQuery, setSearchQuery] = useState('');

  const loadActivities = useCallback(async (cursor: string | null = null) => {
    if (dynamicPageSize === 0) return; 

    setIsLoading(true);
    try {
      const params = {
        cursor: cursor || undefined,
        pageSize: dynamicPageSize,    
        startDate: dateRange.start || undefined,
        endDate: dateRange.end || undefined,
        filter: searchQuery || undefined,
      };

      const result = await agent.Activities.list(params); 
      
      setActivities(prev => cursor ? [...prev, ...result.items] : result.items);
      setNextCursor(result.nextCursor);
      
      const count = result.totalCount ?? (result as any).TotalCount;
      setTotalCount(count || 0);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
    }
  }, [dateRange, searchQuery, dynamicPageSize]);

  useEffect(() => {
    if (dynamicPageSize > 0) {
      setPage(0);
      setSelectedActivity(null);
      loadActivities(null);
    }
  }, [dateRange.start, dateRange.end, searchQuery, dynamicPageSize, loadActivities]);

  const handlePageChange = (_e: any, newPage: number) => {
    if (newPage !== page) {
      setSelectedActivity(null);
    }

    if (newPage > page && (newPage + 1) * dynamicPageSize > activities.length && nextCursor) {
      loadActivities(nextCursor);
    }
    setPage(newPage);
  };

  const [columnsOrder, setColumnsOrder] = useState<string[]>(initialColumns.map(c => c.id));
  const [drawerWidth, setDrawerWidth] = useState(400);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>(
    initialColumns.reduce((acc, col) => ({ ...acc, [col.id]: col.minWidth || 150 }), {})
  );

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 8 } }));

  const orderedColumns = React.useMemo(() => 
    columnsOrder.map(id => initialColumns.find(col => col.id === id)).filter(Boolean) as Column[],
    [columnsOrder, initialColumns]
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setColumnsOrder(items => {
        const oldIdx = items.indexOf(active.id as string);
        const newIdx = items.indexOf(over.id as string);
        return arrayMove(items, oldIdx, newIdx);
      });
    }
  };

  const handleColumnResize = (columnId: string, startX: number, startWidth: number) => {
    const onMouseMove = (e: MouseEvent) => {
      const newWidth = Math.max(50, startWidth + (e.clientX - startX));
      setColumnWidths(prev => ({ ...prev, [columnId]: newWidth }));
    };
    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const handleDrawerMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = drawerWidth;
    const handleMove = (ev: MouseEvent) => {
      const delta = startX - ev.clientX;
      const newWidth = startWidth + delta;
      if (newWidth > 300 && newWidth < window.innerWidth * 0.7) setDrawerWidth(newWidth);
    };
    const handleUp = () => {
      document.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseup', handleUp);
    };
    document.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseup', handleUp);
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={columnsOrder} strategy={horizontalListSortingStrategy}>
        <ActivityTableView 
          columns={orderedColumns}
          filteredActivities={activities}
          page={page}
          totalCount={totalCount}
          isLoading={isLoading}
          selectedActivity={selectedActivity}
          setSelectedActivity={setSelectedActivity}
          drawerWidth={drawerWidth}
          columnWidths={columnWidths}
          handleColumnResize={handleColumnResize}
          handleDrawerMouseDown={handleDrawerMouseDown}
          setDateRange={setDateRange}
          setSearchQuery={setSearchQuery}
          handleChangePage={handlePageChange}
          setDynamicRowsPerPage={setDynamicPageSize} 
        />
      </SortableContext>
    </DndContext>
  );
};

export default ActivityTable;