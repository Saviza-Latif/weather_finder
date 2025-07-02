const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
const apiKey = process.env.OPENWEATHER_API_KEY;
app.get('/api/weather', async (req, res) => {
    const cityName = req.query.city;
    if (!cityName) return res.status(400).json({ error: "City name required" });
    try {
        const geoRes = await axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`);
        if (geoRes.data.length === 0) {
            console.error("City not found");
            return res.status(404).json({ error: "City not found" });
        }

        const { lat, lon, name, country } = geoRes.data[0];
        const weatherRes = await axios.get(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`);


        const weather = weatherRes.data;
        res.json({
            city: name,
            country: country,
            temp: weather.main.temp,
            description: weather.weather[0].description,
            windSpeed: weather.wind.speed
        });

    } catch (err) {
        res.status(500).json({ error: "Error fetching weather data" });
    }
});


