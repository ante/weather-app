import React from 'react';
import {
  Grid,
  Typography,
  Paper,
  Divider,
  makeStyles,
} from '@material-ui/core';
import Hourly from './Hourly';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
    height: '100%',
  },
  paper: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: '20px',
  },
}));

const Day = ({ dayForecast }) => {
  const classes = useStyles();

  return (
    <Grid container className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={5}>
          <Grid item xs={12}>
            <Typography variant='h4' gutterBottom>
              {dayForecast.date}
            </Typography>
            <Divider />
          </Grid>
          {dayForecast.weatherIntervals.map((interval, i) => (
            <Grid item xs={4} md={3} key={i}>
              <Hourly weatherInfo={interval} />
            </Grid>
          ))}
        </Grid>
      </Paper>
    </Grid>
  );
};

export default Day;
