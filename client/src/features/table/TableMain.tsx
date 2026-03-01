import React, { useEffect, useState } from 'react';
import ActivityTable from './ActivityTable';
import { columns } from './columns';
import agent from '../../lib/api/agent';
import type { ActivityDto } from './types';

export default function TableMain() {
  const [activities, setActivities] = useState<ActivityDto[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

useEffect(() => { (agent as any).Activities.list() 
    .then((response: any) => { const activitiesData = response.data ? response.data : response; 
    setActivities(activitiesData); 
    setLoading(false); }) 
    .catch((error: any) => { 
        console.log(error); 
        setLoading(false); }); 
    }, 
    []);

  if (loading) return <div>Loading activities...</div>;

  return (
    <ActivityTable
      columns={columns}
      activities={activities}
      page={page}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
}