
//mettre le fetch
function essai_func() {
  fetch("https://geocoding-api.open-meteo.com/v1/search?name=toulouse&count=100&language=fr&format=json&countryCode=FR")
    .then(response_obj => response_obj.json())
    .then(positions_arr => {

      const container = document.querySelector(".position-user");
      const template_position = document.querySelector(".template-position");
      //le "results" c'est ce qu'il ya dans l'api L’API Open-Meteo Geocoding ne renvoie pas directement un tableau, mais un objet JSON avec une clé results qui contient le tableau.
      Array.prototype.forEach.call(positions_arr.results, position_obj => {
        // console.log(position_obj.name);
        // console.log(position_obj.latitude);
        // console.log(position_obj.longitude);

        const position_elem = template_position.content.cloneNode(true);
        position_elem.querySelector(".user-name").textContent = position_obj.name;
        position_elem.querySelector(".longitude").textContent = position_obj.longitude;
        position_elem.querySelector(".altitude").textContent = position_obj.latitude;
        // position_elem.querySelector("img").alt = pokemon_obj.name;
        container.appendChild(position_elem);
      });
    });

}

essai_func();


// position gps latitude longitude 
// filtre chercher la ville qu'on veut
// chercher par latitude et longitude

function searchBar_func(e) {

  //   console.log("🔍 Fonction searchBar_func appelée !");
  e.preventDefault?.(); // si c’est un event de submit, ça évite le rechargement
  const items = document.querySelectorAll(".meteo");

  const searchTerm = e.target.value
    .normalize("NFD")               // décompose les lettres accentuées  "Normalization Form Decomposed" Forme de normalisation décomposée 
    .replace(/[\u0300-\u036f]/g, "") // supprime les accents
    .toLowerCase()                  // met tout en minuscules
    .trim();                        // supprime les espaces

  items.forEach(item => {
    const text = item.innerText
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();

    item.style.display = text.includes(searchTerm) ? "" : "none";
  });


}

// Empêche le rechargement du formulaire
document.querySelector(".form").addEventListener("submit", e => e.preventDefault());
document.querySelector(".search").addEventListener("input", searchBar_func);


//pas de ville sur un point de coordonnées sur la terre


// function princiPal_func{

//     afficher image 
//     afficher la ville$
//     afficher les degrés habituellement addvent listenr
// } 


function cityWhereweare_func{

    mettre sa ville ici quand on appuie sur la loop en bas à droite de l'écran
}


function nightDaymode_func() {

  const currentTime = new Date().getHours();
  const backgroundTochange = document.querySelector(".notretempsaujourdhui");
  backgroundTochange.classList.remove("day", "night");

  if (0 <= currentTime && currentTime < 5) {
    backgroundTochange.classList.add("night");
  }
  if (5 <= currentTime && currentTime < 11) {

    backgroundTochange.classList.add("day");
  }
  if (11 <= currentTime && currentTime < 16) {
    backgroundTochange.classList.add("day");
  }
  if (16 <= currentTime && currentTime < 22) {
    backgroundTochange.classList.add("night");
  }
  if (22 <= currentTime && currentTime <= 24) {
    backgroundTochange.classList.add("night");
  }

  console.log(currentTime);
  //  Variable string avant dans if modifier seulement la avraibale strng apres les if c'st la que j'utilise la string pour un code simplifié
}

nightDaymode_func();

//deux liens que j'ai trouvé dans l'api
// Massi github
// https://open-meteo.com/en/docs/historical-forecast-api
//https://open-meteo.com/en/docs/geocoding-api
// https://geocoding-api.open-meteo.com/v1/search?name=paris&count=100&language=fr&format=json&countryCode=FR

//https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_min,apparent_temperature_max,rain_sum,precipitation_sum,snowfall_sum,showers_sum,sunrise,sunset,daylight_duration,uv_index_max,sunshine_duration,uv_index_clear_sky_max,precipitation_probability_max,precipitation_hours,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,vapour_pressure_deficit,et0_fao_evapotranspiration,visibility,evapotranspiration,cloud_cover_high,cloud_cover_mid,cloud_cover_low,cloud_cover,pressure_msl,surface_pressure,weather_code,wind_speed_10m,wind_speed_80m,wind_speed_180m,wind_speed_120m,wind_direction_10m,wind_direction_80m,wind_direction_120m,wind_direction_180m,wind_gusts_10m,temperature_80m,temperature_120m,temperature_180m,soil_moisture_27_to_81cm,soil_moisture_9_to_27cm,soil_moisture_3_to_9cm,soil_moisture_0_to_1cm,soil_temperature_54cm,soil_temperature_18cm,soil_temperature_6cm,soil_temperature_0cm,soil_moisture_1_to_3cm&models=meteofrance_arome_france_hd,meteofrance_arome_france,meteofrance_arpege_world,meteofrance_arpege_europe,meteofrance_seamless&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,snowfall,showers,precipitation,rain,cloud_cover,weather_code,pressure_msl,surface_pressure,wind_gusts_10m,wind_direction_10m,wind_speed_10m