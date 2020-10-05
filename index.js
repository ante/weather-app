const express = require('express');
const got = require('got');
const path = require('path');
const dateFns = require('date-fns');

// require dotenv package if not in production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();

app.use(express.json({ extended: false }));

// GET request to openweathermap API
const getForecast = (city) => {
  return got(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${process.env.API_KEY}`,
    { responseType: 'json' }
  );
};

// converts date to destinations local time zone
const convertDate = (date, offset) => {
  let newDate = dateFns.addSeconds(new Date(date), offset);
  newDate = dateFns.format(newDate, 'M/d/yyyy h:mm a');
  return newDate;
};

// gets date range for forecast and separates 3-hour forecasts by day
const separateForecast = (list, offset) => {
  const forecast = [];

  list.forEach((day) => {
    // convert to local time zone
    day.dt_txt = convertDate(day.dt_txt, offset);
    const dateText = day.dt_txt.split(' ')[0];
    if (!forecast.some((day) => day.date === dateText)) {
      forecast.push({ date: dateText, weatherIntervals: [] });
    }
    const index = forecast.findIndex((d) => d.date === dateText);
    forecast[index].weatherIntervals.push(day);
  });
  return forecast;
};

app.get('/api/forecast/:city', async (req, res) => {
  try {
    const response = await getForecast(req.params.city);
    response.body.list = separateForecast(
      response.body.list,
      response.body.city.timezone
    );
    res.send(response.body);
  } catch (error) {
    res.status(error.response.statusCode).send(error.response.body);
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
