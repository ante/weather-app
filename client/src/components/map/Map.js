import React, { useContext } from 'react';
import GoogleMapReact from 'google-map-react';

import ForecastContext from '../../context/forecastContext';

const Map = () => {
  const forecastContext = useContext(ForecastContext);
  const { city } = forecastContext;

  const location = {
    center: {
      lat: city.coord.lat,
      lng: city.coord.lon,
    },
    zoom: 8,
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBj4jEMaSG-mWbvcPHhGE5PBdE5WmQtUZg' }}
        defaultCenter={location.center}
        defaultZoom={location.zoom}
      />
    </div>
  );
};

export default Map;
