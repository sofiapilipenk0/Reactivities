import { Box, Container, CssBaseline } from "@mui/material";
import NavBar from "./NavBar";
import { Outlet, ScrollRestoration, useLocation } from "react-router";
import HomePage from "../../features/home/HomePage";

function App() {
  const location = useLocation();
  return (
    <Box sx={{bgcolor: '#000000', minHeight: '100vh'}}>
      <ScrollRestoration />
      <CssBaseline />
      {location.pathname === '/' ? <HomePage /> : (
        <>
          <NavBar />
          <Container maxWidth={false} disableGutters sx={{pt: 14, px: 2}}>
            <Outlet />
          </Container>
        </>
      )}
    </Box>
  );
}

export default App;
