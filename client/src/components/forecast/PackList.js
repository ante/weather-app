import React, { useState, useContext } from 'react';
import {
  Grid,
  Typography,
  Paper,
  Collapse,
  IconButton,
  Divider,
  makeStyles,
} from '@material-ui/core';
import { MdExpandMore, MdExpandLess } from 'react-icons/md';

import ForecastContext from '../../context/forecastContext';

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: 'center',
  },
  paper: {
    padding: '10px',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
}));

const PackList = () => {
  const classes = useStyles();

  const forecastContext = useContext(ForecastContext);
  const { clothing } = forecastContext;

  const [expanded, setExpanded] = useState(false);

  // get unique values of clothing
  const uniqueClothing = clothing
    .filter((value, i, ar) => ar.indexOf(value) === i)
    .sort();

  const handleClick = () => {
    setExpanded((expanded) => !expanded);
  };

  return (
    <Grid item xs={12} className={classes.root}>
      <Paper className={classes.paper}>
        <Grid item xs={12}>
          <Typography variant='h4' gutterBottom>
            YOU SHOULD PACK...
          </Typography>
          <Divider />
        </Grid>
        <Collapse in={expanded}>
          <Grid item xs={12}>
            {uniqueClothing.map((item, i) => (
              <Grid
                item
                xs={12}
                key={i}
                style={{ textAlign: 'center', padding: '5px' }}
              >
                <Typography>{item}</Typography>
              </Grid>
            ))}
          </Grid>
        </Collapse>
        <IconButton onClick={handleClick}>
          {expanded ? (
            <MdExpandLess size={32} color='white' />
          ) : (
            <MdExpandMore size={32} color='white' />
          )}
        </IconButton>
      </Paper>
    </Grid>
  );
};

export default PackList;
