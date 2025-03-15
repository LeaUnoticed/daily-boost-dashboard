import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = 3001;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/api/weather', async (req, res) => {
  const { city } = req.query;

  try {
    const response = await axios.get('https://api.weatherapi.com/v1/current.json', {
      params: {
        key: process.env.WEATHER_API_KEY,
        q: city,
        aqi: 'no'
      }
    });

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Error weather.' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend wearther on : http://localhost:${PORT}`);
});
