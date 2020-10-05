import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Grid,
  Container,
  Typography,
  CircularProgress,
  makeStyles,
} from '@material-ui/core';
import Day from './Day';
import PackList from './PackList';
import Map from '../map/Map';

import ForecastContext from '../../context/forecastContext';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: '100%',
    color: 'white',
    marginTop: '100px',
    marginBottom: '20px',
  },
  paper: {
    padding: '50px',
  },
  title: {
    textTransform: 'uppercase',
    padding: '0px',
    margin: '0px',
    textAlign: 'center',
    fontSize: '3rem',
    fontWeight: 'bold',
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
      fontSize: '4.5rem',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '5rem',
    },
  },
  timeNotice: {
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
  },
}));

export const Forecast = ({ match }) => {
  const classes = useStyles();
  const forecastContext = useContext(ForecastContext);
  const { searchCities, city, forecast, loading } = forecastContext;

  useEffect(() => {
    searchCities(match.params.city);
  }, []);

  if (loading) {
    return (
      <Container maxWidth='lg' className={classes.root}>
        <CircularProgress color='secondary' />
      </Container>
    );
  }

  if (!city.name) {
    return <Redirect to={'/not-found'} />;
  }

  return (
    <Container maxWidth='lg' className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Typography className={classes.title}>{city.name}</Typography>
        </Grid>
        <Grid item xs={12} md={6} className={classes.timeNotice}>
          <Typography>
            All times/dates are shown in this location's local time zone.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container>
            <Grid item xs={12}>
              <PackList />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Map />
        </Grid>
        {forecast.map((day, i) => (
          <Grid
            key={i}
            item
            xs={12}
            md={6}
            style={{ backgroundColor: 'rgba(255,255,255,0.0' }}
          >
            <Day dayForecast={day} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Forecast;
