console.log("helloworld");





//mettre le fetch

// function searchBar_func{
// position gps latitude longitude 

// filtre chercher la ville qu'on veut
// chercher par latitude et longitude
// } pas de ville sur un point de coordonnées sur la terre


// function princiPal_func{

//     afficher image 
//     afficher la ville$
//     afficher les degrés habituellement addvent listenr
// } 


// function cityWhereweare_func{

//     mettre sa ville ici quand on appuie sur la loop en bas à droite de l'écran
// }


// function nightDaymode_func{

//     couleur de fond jour nuit un toggle ? oui

// } 

navigator.geolocation.watchPosition(async (position) => {
    const { latitude, longitude } = position.coords;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
    const response = await fetch(url);
    const data = await response.json();
    console.log('Météo actuelle:', data.current_weather);
});

//deux liens que j'ai trouvé dans l'api

https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,sunset,sunrise,rain_sum,temperature_2m_max,apparent_temperature_max,temperature_2m_min,daylight_duration,sunshine_duration,precipitation_probability_max,precipitation_hours,precipitation_sum,snowfall_sum,showers_sum,uv_index_clear_sky_max,uv_index_max&hourly=temperature_2m,sunshine_duration,is_day,uv_index_clear_sky,wet_bulb_temperature_2m,total_column_integrated_water_vapour,uv_index&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,surface_pressure,pressure_msl,cloud_cover,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m


https://geocoding-api.open-meteo.com/v1/search?name=paris&count=100&language=fr&format=json&countryCode=FR