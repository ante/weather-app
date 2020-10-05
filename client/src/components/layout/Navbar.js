import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Tooltip,
  IconButton,
  makeStyles,
  useScrollTrigger,
} from '@material-ui/core';
import { FaGithub } from 'react-icons/fa';

const useStyles = makeStyles((theme) => ({
  appBar: {
    flexGrow: 1,
    backgroundColor: 'transparent',
    transition: '0.3s',
  },
  appBarScrolled: {
    backgroundColor: theme.palette.primary.main,
  },
  title: {
    flexGrow: 1,
    fontSize: '1.2rem',
    [theme.breakpoints.up('md')]: {
      fontSize: '2rem',
    },
  },
  link: {
    transition: '0.3s',
    textDecoration: 'none',
    color: 'white',
    '&:hover': {
      textShadow: '0px 2px 10px rgba(0,0,0,0.6)',
    },
  },
}));

const Navbar = () => {
  const classes = useStyles();

  const scrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  return (
    <AppBar
      position='fixed'
      elevation={scrolled ? 1 : 0}
      className={`${classes.appBar} ${scrolled && classes.appBarScrolled}`}
    >
      <Toolbar>
        <Typography className={classes.title}>
          <Link to='/' className={classes.link}>
            FORECAST{' '}
            <span style={{ color: '#2196f3', fontWeight: 'bold' }}>FINDER</span>
          </Link>
        </Typography>
        <Tooltip
          title='View source on github'
          placement='left'
          aria-label='View source on github'
        >
          <IconButton
            href='https://github.com/ante/weather-app'
            target='_blank'
            rel='noopener noreferrer'
          >
            <FaGithub size={32} />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
