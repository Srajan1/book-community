import { BrowserRouter as Router, Route } from "react-router-dom";
import { createTheme, ThemeProvider, Typography } from "@mui/material";

import Home from "./pages/home.jsx";
import Login from "./pages/login.jsx";
import Register from "./pages/register.jsx";
import Layout from "./components/drawer.jsx";
import Rooms from "./pages/rooms.jsx";
import { red } from '@mui/material/colors';

const color = red;
const theme = createTheme({
  palette: {
    primary: {      
      main: '#0431E9',            
    },
    secondary: {      
      main: '#5979FC',            
    },        
    contrastThreshold: 3,            
    tonalOffset: 0.2,
  },
  typography: {
    fontFamily: 'Poppins',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    error: {
      color: '#f00'
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>        
          <Layout>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/rooms">
            <Rooms />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
