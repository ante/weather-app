import React from 'react';
import { Container, makeStyles } from '@material-ui/core';

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
}));

const CityNotFound = () => {
  const classes = useStyles();

  const heading = 'City not found';
  const text = 'Make sure your spelling is correct and try again.';

  return (
    <Container spacing={4} className={classes.root}>
      <Search heading={heading} text={text} />
    </Container>
  );
};

export default CityNotFound;
