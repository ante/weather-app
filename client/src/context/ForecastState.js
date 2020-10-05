import React, { useReducer } from 'react';
import axios from 'axios';
import ForecastContext from './forecastContext';
import ForecastReducer from './forecastReducer';

const ForecastState = (props) => {
  const initialState = {
    city: {},
    dateRange: [],
    forecast: [],
    loading: true,
    clothing: [],
  };

  const [state, dispatch] = useReducer(ForecastReducer, initialState);

  const searchCities = async (city) => {
    clearData();
    setLoading();

    try {
      const res = await axios.get(`/api/forecast/${city}`);

      dispatch({
        type: 'search_cities',
        payload: res.data,
        loading: false,
      });
    } catch (error) {
      dispatch({
        type: 'invalid_search',
      });
    }
  };

  const addClothing = (typeOfClothing) =>
    dispatch({ type: 'add_clothing', payload: typeOfClothing });

  const clearData = () => dispatch({ type: 'clear_data' });
  const setLoading = () => dispatch({ type: 'set_loading' });

  return (
    <ForecastContext.Provider
      value={{
        city: state.city,
        forecast: state.forecast,
        loading: state.loading,
        clothing: state.clothing,
        searchCities,
        addClothing,
        setLoading,
      }}
    >
      {props.children}
    </ForecastContext.Provider>
  );
};

export default ForecastState;
