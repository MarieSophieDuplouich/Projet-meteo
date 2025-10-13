
//mettre le fetch
function princiPal_func() {
  fetch("https://geocoding-api.open-meteo.com/v1/search?name=toulouse&count=100&language=fr&format=json&countryCode=FR")
    .then(response_obj => response_obj.json())
    .then(positions_arr => {

      const container = document.querySelector(".position-user");
      const template_position = document.querySelector(".template-position");
      //le "results" c'est ce qu'il ya dans l'api L’API Open-Meteo Geocoding ne renvoie pas directement un tableau, mais un objet JSON avec une clé results qui contient le tableau.
      Array.prototype.forEach.call(positions_arr.results, position_obj => {

        const position_elem = template_position.content.cloneNode(true);
        position_elem.querySelector(".user-name").textContent = position_obj.name;
        position_elem.querySelector(".longitude").textContent = position_obj.longitude;
        position_elem.querySelector(".altitude").textContent = position_obj.latitude;
        // position_elem.querySelector("img").alt = pokemon_obj.name;
        container.appendChild(position_elem);
      });
    });

}

princiPal_func();


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



function cityWhereweare_func() {
  const status = document.querySelector("#status");
  const mapLink = document.querySelector("#map-link");

  mapLink.href = "";
  mapLink.textContent = "";

  async function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    status.textContent = "Récupération du nom de la ville…";

    try {
      // Requête principale vers Nominatim pour obtenir les infos d’adresse
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2&accept-language=fr`
      );
      const data = await res.json();
      console.log("Réponse de Nominatim :", data);

      // Extraction du nom de la ville
      let name =
        data?.address?.city ||
        data?.address?.town ||
        data?.address?.village ||
        "";

      // Si rien trouvé, on tente une recherche alternative
      if (!name) {
        const searchRes = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${latitude},${longitude}&format=jsonv2&accept-language=fr`
        );
        const searchData = await searchRes.json();
        name = searchData?.[0]?.display_name?.split(",")[0] || "Ville inconnue";
      }

      // Mise à jour de l'affichage
      status.textContent = "";
      mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      mapLink.textContent = `Latitude: ${latitude.toFixed(5)}°, Longitude: ${longitude.toFixed(5)}°, Ville: ${name}`;
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
      status.textContent = "Erreur lors de la récupération des données.";
    }
  }

  function error() {
    status.textContent = "Impossible de trouver votre position.";
  }

  if (!navigator.geolocation) {
    status.textContent = "Géolocalisation non supportée par votre navigateur.";
  } else {
    status.textContent = "Chargement…";
    navigator.geolocation.getCurrentPosition(success, error);
  }

}

cityWhereweare_func();


document.querySelector("#find-me").addEventListener("click", cityWhereweare_func);

function nightDaymode_func() {

  const currentTime = new Date().getHours();
  const backgroundTochange = document.querySelector(".notretempsaujourdhui");
  backgroundTochange.classList.remove("day", "night");

  if (0 <= currentTime && currentTime < 5) {
    backgroundTochange.classList.add("night");
  }
  if (5 <= currentTime && currentTime < 16) {

    backgroundTochange.classList.add("day");
  }
  
  if (16 <= currentTime && currentTime <= 24) {
    backgroundTochange.classList.add("night");
  }

  // console.log(currentTime);
  //  Variable string avant dans if modifier seulement la avraibale strng apres les if c'st la que j'utilise la string pour un code simplifié
}

nightDaymode_func();

//deux liens que j'ai trouvé dans l'api
// Massi github
// https://open-meteo.com/en/docs/historical-forecast-api
//https://open-meteo.com/en/docs/geocoding-api
// https://geocoding-api.open-meteo.com/v1/search?name=paris&count=100&language=fr&format=json&countryCode=FR

//https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,temperature_2m_max,temperature_2m_min,apparent_temperature_min,apparent_temperature_max,rain_sum,precipitation_sum,snowfall_sum,showers_sum,sunrise,sunset,daylight_duration,uv_index_max,sunshine_duration,uv_index_clear_sky_max,precipitation_probability_max,precipitation_hours,wind_speed_10m_max,wind_gusts_10m_max,wind_direction_10m_dominant,shortwave_radiation_sum,et0_fao_evapotranspiration&hourly=temperature_2m,relative_humidity_2m,dew_point_2m,apparent_temperature,precipitation_probability,precipitation,rain,showers,snowfall,snow_depth,vapour_pressure_deficit,et0_fao_evapotranspiration,visibility,evapotranspiration,cloud_cover_high,cloud_cover_mid,cloud_cover_low,cloud_cover,pressure_msl,surface_pressure,weather_code,wind_speed_10m,wind_speed_80m,wind_speed_180m,wind_speed_120m,wind_direction_10m,wind_direction_80m,wind_direction_120m,wind_direction_180m,wind_gusts_10m,temperature_80m,temperature_120m,temperature_180m,soil_moisture_27_to_81cm,soil_moisture_9_to_27cm,soil_moisture_3_to_9cm,soil_moisture_0_to_1cm,soil_temperature_54cm,soil_temperature_18cm,soil_temperature_6cm,soil_temperature_0cm,soil_moisture_1_to_3cm&models=meteofrance_arome_france_hd,meteofrance_arome_france,meteofrance_arpege_world,meteofrance_arpege_europe,meteofrance_seamless&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,snowfall,showers,precipitation,rain,cloud_cover,weather_code,pressure_msl,surface_pressure,wind_gusts_10m,wind_direction_10m,wind_speed_10m