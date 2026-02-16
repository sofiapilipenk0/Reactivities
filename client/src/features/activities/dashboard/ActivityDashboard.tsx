import { Grid} from "@mui/material";
import ActivityList from "./ActivityList";
import 'react-calendar/dist/Calendar.css'
import ActivityFilters from "./ActivityFilters";

export default function ActivityDashboard() {

  return (
    <Grid container spacing={3}>
        <Grid size={8}>
          <ActivityList />
        </Grid>
        <Grid size={4} color='white'>
         <ActivityFilters/>
        </Grid>
    </Grid>
  )
}
