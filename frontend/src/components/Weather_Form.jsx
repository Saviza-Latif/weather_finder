import React, { useState } from 'react';
import { TextField, Button, Typography, Paper, Box, CircularProgress, Grid, List, ListItem, ListItemText } from '@mui/material';
import cloudyImage from '../assets/cloudyimage.jpg';
import rainImage from '../assets/rainimage.jpg';
import sunnyImage from '../assets/sunnyimage.jpg';
import windyImage from '../assets/windyimage.jpg';
import clearSkyImage from '../assets/clearskyimage.jpg';
const Weather_Form = () => {
  const [city, setCity] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]); //array for history searches

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch(`http://localhost:3000/api/weather?city=${city}`);
      if (response.status == 404 || response.status == 500) {
        throw new Error('Failed to fetch weather data');
      }
      // the fetch will send data with status , header etc which we do not needed so .json use to filter out
      const data = await response.json();

      setResult(data);
      setHistory(prev => [...prev, data]); // all the previous data we have plus new we added
    } catch (error) {
      console.error('Error in getting from backend:', error);


    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2, bgcolor: 'white', p: 2 }}>
      {/* History Section */}
      <Box sx={{ flex: 3, p: 1 }}>
        <Paper sx={{ p: 2, height: '100%', bgcolor: 'white' }}>
          <Typography variant="h5">History</Typography>
          <List>
            {/* loop to show all recently search weather */}
            {history.map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`${item.city}, ${item.country}`}
                  secondary={`Temp: ${item.temp}C, Windspeed: ${item.windSpeed}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>

      {/* right side of page */}
      <Box sx={{ flex: 7, p: 1 }}>
        <Paper sx={{ p: 2, height: '100%', bgcolor: 'white' }}>
          <Typography variant="h5" sx={{ mb: 2 }}>Enter city name to check weather</Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Here enter city name"
              fullWidth
              value={city}
              onChange={(e) => setCity(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button type="submit" variant="contained" sx={{ width: '70px' }} color="primary" fullWidth disabled={loading}>
              {loading ? <CircularProgress size={24} /> : 'Submit'}
            </Button>
          </form>
        
          {result && (
            <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column',justifyContent:'center',width:'100%', alignItems: 'center', textAlign: 'center' }}>
              <Typography variant="h6">Weather Data:</Typography>
              <Typography>{result.city}, {result.country}</Typography>
              <Typography>Temperature: {result.temp}C</Typography>
              <Typography>Wind Speed: {result.windSpeed}</Typography>
              <Typography>Description: {result.description}</Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2, width: '200px' ,maxWidth: '50%', height: '300px', bgcolor : 'brown' }}>
                {result.description.toLowerCase().includes('cloud') && 
                <img src={cloudyImage} alt="Cloudy" style={{ width: '100%', height: '100%' }} />}
                {result.description.toLowerCase().includes('rain') && 
                <img src={rainImage} alt="Rain" style={{ width: '100%', height: '100%' }} />}
                {result.description.toLowerCase().includes('sunny') && 
                <img src={sunnyImage} alt="Sunny" style={{ width: '100%', height: '100%' }} />}
                {result.description.toLowerCase().includes('wind') && 
                <img src={windyImage} alt="Windy" style={{ width: '100%', height: '100%' }} />}
                {result.description.toLowerCase().includes('clear') && 
                <img src={clearSkyImage} alt="Clear Sky" style={{ width: '100%', height: '100%' }} />}
            </Box>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>

  );
};

export default Weather_Form;
