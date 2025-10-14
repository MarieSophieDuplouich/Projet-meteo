
//mettre le fetch
function princiPal_func() {
  // fetch( `https://api.open-meteo.com/v1/forecast?latitude=46&longitude=2&daily=weather_code,temperature_2m_max,apparent_temperature_max,temperature_2m_min,apparent_temperature_min,uv_index_clear_sky_max,uv_index_max,sunshine_duration,daylight_duration,sunset,sunrise,showers_sum,rain_sum,snowfall_sum,precipitation_sum,precipitation_hours&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,snowfall,weather_code,pressure_msl,wind_speed_10m,wind_speed_20m,wind_speed_100m,wind_speed_50m,wind_speed_200m,temperature_20m,temperature_50m,temperature_100m,temperature_150m,temperature_200m&models=meteofrance_seamless&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_gusts_10m,wind_speed_10m,wind_direction_10m&timezone=auto`)
       //initialiser affichage viulle toulouse
  fetch("https://geocoding-api.open-meteo.com/v1/search?name=Toulouse&count=10&language=fr&format=json&countryCode=FR")
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

function afficherMeteo_func(lat=46,long = 2) {


  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weather_code,temperature_2m_max,apparent_temperature_max,temperature_2m_min,apparent_temperature_min,uv_index_clear_sky_max,uv_index_max,sunshine_duration,daylight_duration,sunset,sunrise,showers_sum,rain_sum,snowfall_sum,precipitation_sum,precipitation_hours&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,snowfall,weather_code,pressure_msl,wind_speed_10m,wind_speed_20m,wind_speed_100m,wind_speed_50m,wind_speed_200m,temperature_20m,temperature_50m,temperature_100m,temperature_150m,temperature_200m&models=meteofrance_seamless&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_gusts_10m,wind_speed_10m,wind_direction_10m&timezone=auto`)
    .then(response_obj => response_obj.json())
    .then(meteos_arr => {

      const container = document.querySelector(".notretempsaujourdhui");
      const template_meteo = document.querySelector(".template-meteo");
      const meteo_obj = meteos_arr.current;
      const meteo_elem = template_meteo.content.cloneNode(true);
      const img = meteo_elem.querySelectorAll(".svg");

      //le "results" c'est ce qu'il ya dans l'api L’API Open-Meteo Geocoding ne renvoie pas directement un tableau, mais un objet JSON avec une clé results qui contient le tableau.
      //afficher temperature
      meteo_elem.querySelector(".degrecelsius").textContent = meteo_obj.apparent_temperature + "°C";
      // récupérer les svg de mon html avec const img et cacher les svg avec img.Foreach
      img.forEach(svg => svg.style.display = "none");

      // le weather_code et il faut le savoir est le code du temps actuel
      const code = meteo_obj.weather_code
      // let svgIndex = 0;
      let svgIndex = convertWeatherCodeToSvgIndex(code);


      // if (code === 0) svgIndex = 0;               // soleil
      // else if ([1, 2, 3].includes(code)) svgIndex = 1; // nuage
      // else if ([45, 48].includes(code)) svgIndex = 2; // brouillard
      // else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) svgIndex = 3; // pluie
      // else if ([71, 73, 75, 85, 86].includes(code)) svgIndex = 4; // neige
      // else if ([95, 96, 99].includes(code)) svgIndex = 5; // orage
      // else svgIndex = 0; // par défaut soleil

      img[svgIndex].style.display = "block"; // afficher le SVG correspondant

      // console.log(svgIndex);
      // console.log(meteo_elem);
      // console.log(img);
      // ici c'est pour l'ajouter au container
      container.appendChild(meteo_elem);

    });


}
function convertWeatherCodeToSvgIndex(code){

      let svgIndex = 0;
      if (code === 0) svgIndex = 0;               // soleil
      else if ([1, 2, 3].includes(code)) svgIndex = 1; // nuage
      else if ([45, 48].includes(code)) svgIndex = 2; // brouillard
      else if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) svgIndex = 3; // pluie
      else if ([71, 73, 75, 85, 86].includes(code)) svgIndex = 4; // neige
      else if ([95, 96, 99].includes(code)) svgIndex = 5; // orage
      else svgIndex = 0; // par défaut soleil


      return svgIndex;
}
afficherMeteo_func();




//pas de ville sur un point de coordonnées sur la terre

// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,temperature_2m_max,apparent_temperature_max,temperature_2m_min,apparent_temperature_min,uv_index_clear_sky_max,uv_index_max,sunshine_duration,daylight_duration,sunset,sunrise,showers_sum,rain_sum,snowfall_sum,precipitation_sum,precipitation_hours&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,snowfall,weather_code,pressure_msl,wind_speed_10m,wind_speed_20m,wind_speed_100m,wind_speed_50m,wind_speed_200m,temperature_20m,temperature_50m,temperature_100m,temperature_150m,temperature_200m&models=meteofrance_seamless&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_gusts_10m,wind_speed_10m,wind_direction_10m&timezone=Europe%2FBerlin

function oncityWhereweare_func() {
  const status = document.querySelector("#status");
  const mapLink = document.querySelector("#map-link");

  mapLink.href = "";
  mapLink.textContent = "";
  
    if (!navigator.geolocation) {
      status.textContent = "Géolocalisation non supportée par votre navigateur.";
    } else {
      status.textContent = "Chargement…";
      navigator.geolocation.getCurrentPosition(success, error);
    }

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
      // console.log("Réponse de Nominatim :", data);

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
       
      const meteoRes = await fetch(
                `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`

      );

      const meteoData = await meteoRes.json();
      // console.log("Météo : ",meteoData)

      // Mise à jour de l'affichage
      status.textContent = "";
      mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
      mapLink.textContent = `Latitude ${latitude.toFixed(5)}°, Longitude ${longitude.toFixed(5)}°, Ville ${name}`;
    } catch (error) {
      console.error("Erreur lors de la récupération :", error);
      status.textContent = "Erreur lors de la récupération des données.";
    }
  }

  function error() {
    status.textContent = "Impossible de trouver votre position.";
  }

}

oncityWhereweare_func();


document.querySelector("#find-me").addEventListener("click", oncityWhereweare_func);

function nightDaymode_func(lat = 46, long = 2 ) {



  fetch(`https://api.open-meteo.com/v1/forecast?latitude=46&longitude=2&daily=weather_code,temperature_2m_max,apparent_temperature_max,temperature_2m_min,apparent_temperature_min,uv_index_clear_sky_max,uv_index_max,sunshine_duration,daylight_duration,sunset,sunrise,showers_sum,rain_sum,snowfall_sum,precipitation_sum,precipitation_hours&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,snowfall,weather_code,pressure_msl,wind_speed_10m,wind_speed_20m,wind_speed_100m,wind_speed_50m,wind_speed_200m,temperature_20m,temperature_50m,temperature_100m,temperature_150m,temperature_200m&models=meteofrance_seamless&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_gusts_10m,wind_speed_10m,wind_direction_10m&timezone=auto`)
    .then(response_obj => response_obj.json())
    .then(nightDaymodes_arr => {
      //  const currentTime = new Date().getHours();
      const currentTime = nightDaymodes_arr.current.is_day;
      const backgroundTochange = document.querySelector(".notretempsaujourdhui");
      backgroundTochange.classList.remove("day", "night");

      if (currentTime === 1) {
        backgroundTochange.classList.add("day");
       
      }
      else{
         backgroundTochange.classList.add("night");
        
      }

    });
//  dans l'api j'ai ça  "is_day": 1 = jour et 0 = nuit

  //le is_day c'est jour ou nuit https://api.open-meteo.com/v1/forecast?latitude=46&longitude=2&daily=weather_code,temperature_2m_max,apparent_temperature_max,temperature_2m_min,apparent_temperature_min,uv_index_clear_sky_max,uv_index_max,sunshine_duration,daylight_duration,sunset,sunrise,showers_sum,rain_sum,snowfall_sum,precipitation_sum,precipitation_hours&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,snowfall,weather_code,pressure_msl,wind_speed_10m,wind_speed_20m,wind_speed_100m,wind_speed_50m,wind_speed_200m,temperature_20m,temperature_50m,temperature_100m,temperature_150m,temperature_200m&models=meteofrance_seamless&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_gusts_10m,wind_speed_10m,wind_direction_10m&timezone=auto
}

nightDaymode_func();
