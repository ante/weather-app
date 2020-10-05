import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  makeStyles,
} from '@material-ui/core';

import Search from '../search/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    height: '100vh',
    maxWidth: '600px',
    textAlign: 'center',
    color: 'white',
    [theme.breakpoints.up('md')]: {
      marginLeft: '6rem',
      textAlign: 'left',
    },
    [theme.breakpoints.up('lg')]: {
      maxWidth: '800px',
      marginLeft: '12rem',
    },
  },
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
}));

const CityNotFound = () => {
  const classes = useStyles();

  const heading = 'City not found';
  const text = 'Make sure your spelling is correct and try again.';

  return (
    <Container spacing={4} className={classes.root}>
      <Grid container>
        <Grid item xs={12}>
          <Typography className={classes.headline}>
            <Box component={'span'} fontWeight='fontWeightBold'>
              Page not found
            </Box>
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Link to='/' style={{ textDecoration: 'none' }}>
            <Button variant='contained' color='secondary'>
              Go home
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};

export default CityNotFound;
