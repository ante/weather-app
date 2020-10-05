import React, { useEffect, useContext } from 'react';
import { Grid, Typography, Divider } from '@material-ui/core';
import {
  WiMoonAltFull,
  WiNightPartlyCloudy,
  WiCloud,
  WiCloudy,
  WiShowers,
  WiRain,
  WiThunderstorm,
  WiSnow,
  WiWindy,
} from 'react-icons/wi';

import ForecastContext from '../../context/forecastContext';

const Hourly = ({ weatherInfo }) => {
  const { main, weather, wind, pop, dt_txt } = weatherInfo;

  const forecastContext = useContext(ForecastContext);
  const { addClothing } = forecastContext;

  // get time from date string
  const getTime = (date) => {
    const time = date.split(' ');
    return `${time[1]} ${time[2]}`;
  };

  // return icon based on icon name from openweathermap
  const getIcon = (condition) => {
    switch (condition) {
      case '01d':
      case '01n':
        return <WiMoonAltFull size={32} color='#2196f3' />;
      case '02d':
      case '02n':
        return <WiNightPartlyCloudy size={32} color='#2196f3' />;
      case '03d':
      case '03n':
        return <WiCloud size={32} color='#2196f3' />;
      case '04d':
      case '04n':
        return <WiCloudy size={32} color='#2196f3' />;
      case '09d':
      case '09n':
        return <WiShowers size={32} color='#2196f3' />;
      case '10d':
      case '10n':
        return <WiRain size={32} color='#2196f3' />;
      case '11d':
      case '11n':
        return <WiThunderstorm size={32} color='#2196f3' />;
      case '13d':
      case '13n':
        return <WiSnow size={32} color='#2196f3' />;
      case '50d':
      case '50n':
        return <WiWindy size={32} color='#2196f3' />;
      default:
        return;
    }
  };

  const getClothingList = (temp) => {
    const clothesList = [];
    const clothes = {
      warm: ['Baseball Cap', 'T-Shirt', 'Shorts', 'Sandals'],
      brisk: [
        'Beanie',
        'Jacket',
        'Long-Sleeve T-Shirt',
        'Jeans',
        'Tennis Shoes',
      ],
      cold: [
        'Stocking Cap',
        'Winter Coat',
        'Sweater',
        'Jeans',
        'Long Underwear',
        'Boots',
      ],
    };

    if (temp >= 70) {
      clothesList.push(...clothes.warm);
    } else if (temp >= 50) {
      clothesList.push(...clothes.brisk);
    } else if (temp < 50) {
      clothesList.push(...clothes.cold);
    }

    return clothesList;
  };

  useEffect(() => {
    addClothing(getClothingList(main.temp));
  }, []);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h6'>{getTime(dt_txt)}</Typography>
            <Divider></Divider>
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12}>
              {getIcon(weather[0].icon)}
            </Grid>
            <Grid item xs={12}>
              <Typography variant='subtitle2'>{weather.main}</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant='h5'>{Math.round(main.temp)}&deg;F</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12}>
              <Typography variant='subtitle2'>FEELS LIKE</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>{Math.round(main.feels_like)}&deg;F</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12}>
              <Typography variant='subtitle2'>WIND</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>{Math.round(wind.speed)} MPH</Typography>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid item xs={12}>
              <Typography variant='subtitle2'>PRECIP. %</Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography>{Math.floor(pop * 100)}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Hourly;
