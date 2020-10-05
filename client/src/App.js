import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import Navbar from './components/layout/Navbar';
import Landing from './components/pages/Landing';
import CityNotFound from './components/pages/CityNotFound';
import PageNotFound from './components/pages/PageNotFound';
import Forecast from './components/forecast/Forecast';

import ForecastState from './context/ForecastState';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#303030',
    },
    secondary: {
      main: '#2196f3',
    },
  },
});

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <ForecastState>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route path='/forecast/:city' component={Forecast} />
            <Route path='/not-found' component={CityNotFound} />
            <Route component={PageNotFound} />
          </Switch>
        </Router>
      </ForecastState>
    </MuiThemeProvider>
  );
}

export default App;
