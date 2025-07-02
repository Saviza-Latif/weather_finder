# Weather Finder
This web uses react, node to check the weather using the city name through external api [OpenWeatherMap](https://openweathermap.org).

# Frontend
 # Tools
- React
- MUI 
 # Details
- History of search : Use (useState) to store all searches and shown on left side of page.
- Form : Take input , on submit (handlesubmit) invoke and the data is fetched from backend 
- Results : The fetched from backend is now displayed on the screen
- Images : Images are displayed according to description (it look the substring in the description like if description is 'broken cloud' only cloud will be match and show image accordingly)

# Backend
  # Tools

  - Node.js
  - express
  - dotenv
  - [OpenWeatherMap](https://openweathermap.org).

  # Details
  - It uses two steps to search weather
      - CityName to Lat,Lon of city : First Api call to fetch the lat and lon of the city
      - Lat/Lon to the weather data : Second Api call to fetch different attributes of weather like temperature, wind speed , description etc

  - Protected Api using .env file 
