import { Button, Grid} from "@mui/material";
import ActivityList from "./ActivityList";
import 'react-calendar/dist/Calendar.css'
import ActivityFilters from "./ActivityFilters";
import { useActivities } from "../../../lib/hooks/useActivities";

export default function ActivityDashboard() {
  const {isFetchingNextPage, fetchNextPage, hasNextPage} = useActivities();
  return (
    <Grid container spacing={3}>
        <Grid size={8}>
          <ActivityList />
          <Button
          onClick={() => fetchNextPage()}
          sx={{my: 2, float: 'right'}}
          variant="contained"
          disabled={!hasNextPage || isFetchingNextPage}>
            Load more
          </Button>
        </Grid>
        <Grid size={4} color='white'
        sx={{position: 'sticky', top: 80, alignSelf: 'flex-start'}}
        >
         <ActivityFilters/>
        </Grid>
    </Grid>
  )
}
