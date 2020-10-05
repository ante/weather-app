import React, { useState, useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import {
  Grid,
  Typography,
  Box,
  Button,
  TextField,
  makeStyles,
} from '@material-ui/core';

import ForecastContext from '../../context/forecastContext';

const useStyles = makeStyles((theme) => ({
  headline: {
    textTransform: 'uppercase',
    fontSize: '2.5rem',
    [theme.breakpoints.up('md')]: {
      fontSize: '4.5rem',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '5rem',
    },
    lineHeight: 1,
    marginBottom: '40px',
  },
  search: {
    width: '60%',
    margin: '10px 0 20px',
  },
}));

export const Search = ({ heading, text }) => {
  const classes = useStyles();

  const forecastContext = useContext(ForecastContext);
  const { setLoading } = forecastContext;

  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(false);
  const [submit, setSubmit] = useState(false);

  const handleTextChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm !== '') {
      setSubmit(true);
    } else {
      setError(true);
    }
  };

  useEffect(setLoading, []);

  if (submit) {
    return <Redirect to={`/forecast/${searchTerm}`} />;
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography className={classes.headline}>
          <Box component={'span'} fontWeight='fontWeightBold'>
            {heading}
          </Box>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant='body1'>{text}</Typography>
      </Grid>
      <Grid item xs={12}>
        <form onSubmit={handleSearch}>
          <TextField
            error={error}
            id='city-search'
            label='Your destination'
            color='secondary'
            style={{}}
            onChange={handleTextChange}
            className={classes.search}
          />
          <Grid item xs={12}>
            <Button
              variant='contained'
              color='secondary'
              onClick={handleSearch}
            >
              Get forecast
            </Button>
          </Grid>
        </form>
      </Grid>
    </Grid>
  );
};

export default Search;
