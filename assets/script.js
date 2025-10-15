async function chercherVille_func(){
 const ville = document.querySelector(".search").value.trim();

  if (!ville) {
     return "Entre un nom de ville !"; 

  }

  try {
    // Requête vers l’API de géocodage Open-Meteo
    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${ville}&count=1&language=fr&format=json`
    );

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
    
      return "Ville non trouvée";
    }

    const { latitude, longitude, name, country } = data.results[0];
    console.log(` Ville trouvée : ${name}, ${country}`);
    console.log(` Coordonnées : ${latitude}, ${longitude}`);

    // Appeler la météo pour cette ville
    afficherMeteo_func(latitude, longitude,name);
    nightDaymode_func(latitude, longitude);

  } catch (error) {
    console.error("Erreur lors de la recherche :", error);
    return " Erreur lors de la recherche de la ville.";
  }

}


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



function afficherMeteo_func(lat,long) {


  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weather_code,temperature_2m_max,apparent_temperature_max,temperature_2m_min,apparent_temperature_min,uv_index_clear_sky_max,uv_index_max,sunshine_duration,daylight_duration,sunset,sunrise,showers_sum,rain_sum,snowfall_sum,precipitation_sum,precipitation_hours&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,snowfall,weather_code,pressure_msl,wind_speed_10m,wind_speed_20m,wind_speed_100m,wind_speed_50m,wind_speed_200m,temperature_20m,temperature_50m,temperature_100m,temperature_150m,temperature_200m&models=meteofrance_seamless&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_gusts_10m,wind_speed_10m,wind_direction_10m&timezone=auto`)
    .then(response_obj => response_obj.json())
    .then(meteos_arr => {
           // let svgIndex = 0;
      let svgIndex = convertWeatherCodeToSvgIndex(code);
           // récupérer les svg de mon html avec const img et cacher les svg avec img.Foreach
      img.forEach(svg => svg.style.display = "none");


     
      const container = document.querySelector(".notretempsaujourdhui");
      container.innerHTML = "";

      const template_meteo = document.querySelector(".template-meteo");
      const meteo_obj = meteos_arr.current_weather;
      const meteo_elem = template_meteo.content.cloneNode(true);
      const img = meteo_elem.querySelectorAll(".svg");
      console.log(img); // Devrait montrer NodeList de tes SVG
        img[svgIndex].style.display = "block"; // afficher le SVG correspondant
      //le "results" c'est ce qu'il ya dans l'api L’API Open-Meteo Geocoding ne renvoie pas directement un tableau, mais un objet JSON avec une clé results qui contient le tableau.
      //afficher temperature
      meteo_elem.querySelector(".degrecelsius").textContent = meteo_obj.apparent_temperature + "°C";
 
      // le weather_code et il faut le savoir est le code du temps actuel
      const code = meteo_obj.weather_code
  


      container.appendChild(meteo_elem);

    });


}







function convertWeatherCodeToSvgIndex(code) {
  if (code === 0) return 0;
  if ([1, 2, 3].includes(code)) return 1;
  if ([45, 48].includes(code)) return 2;
  if ([51, 53, 55, 61, 63, 65, 80, 81, 82].includes(code)) return 3;
  if ([71, 73, 75, 85, 86].includes(code)) return 4;
  if ([95, 96, 99].includes(code)) return 5;
  return 0;
}


function oncityWhereweare_func() {
  const status = document.querySelector("#status");
  const mapLink = document.querySelector("#map-link");

  status.textContent = "";
  mapLink.textContent = "";

  if (!navigator.geolocation) {
    status.textContent = "Géolocalisation non supportée.";
    return;
  }

  navigator.geolocation.getCurrentPosition(success, () => {
    status.textContent = "Impossible de trouver votre position.";
  });

  async function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=jsonv2&accept-language=fr`);
    const data = await res.json();

    const city = data.address.city || data.address.town || data.address.village || "Ville inconnue";

    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = `Altitude ${latitude.toFixed(2)}°, Longitude ${longitude.toFixed(2)}°, Ville ${city}`;
    
        // afficher nom ville
       document.querySelector(".ville-nom").textContent = city;
    // Mettre à jour la météo selon la vraie position !
    afficherMeteo_func(latitude, longitude);
    nightDaymode_func(latitude, longitude);
  }
}


function nightDaymode_func(lat , long ) {



  fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&daily=weather_code,temperature_2m_max,apparent_temperature_max,temperature_2m_min,apparent_temperature_min,uv_index_clear_sky_max,uv_index_max,sunshine_duration,daylight_duration,sunset,sunrise,showers_sum,rain_sum,snowfall_sum,precipitation_sum,precipitation_hours&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,snowfall,weather_code,pressure_msl,wind_speed_10m,wind_speed_20m,wind_speed_100m,wind_speed_50m,wind_speed_200m,temperature_20m,temperature_50m,temperature_100m,temperature_150m,temperature_200m&models=meteofrance_seamless&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_gusts_10m,wind_speed_10m,wind_direction_10m&timezone=auto`)
    .then(response_obj => response_obj.json())
    .then(nightDaymodes_arr => {
      //  const currentTime = new Date().getHours();
      const currentTime = nightDaymodes_arr.current.is_day;
      const backgroundTochange = document.querySelector(".notretempsaujourdhui");
      backgroundTochange.classList.remove("body", "night");

      if (currentTime === 1) {
        backgroundTochange.classList.add("body");

      }
      else {
        backgroundTochange.classList.add("night");

      }

    });
  //  dans l'api j'ai ça  "is_day": 1 = jour et 0 = nuit

  //le is_day c'est jour ou nuit https://api.open-meteo.com/v1/forecast?latitude=46&longitude=2&daily=weather_code,temperature_2m_max,apparent_temperature_max,temperature_2m_min,apparent_temperature_min,uv_index_clear_sky_max,uv_index_max,sunshine_duration,daylight_duration,sunset,sunrise,showers_sum,rain_sum,snowfall_sum,precipitation_sum,precipitation_hours&hourly=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,snowfall,weather_code,pressure_msl,wind_speed_10m,wind_speed_20m,wind_speed_100m,wind_speed_50m,wind_speed_200m,temperature_20m,temperature_50m,temperature_100m,temperature_150m,temperature_200m&models=meteofrance_seamless&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_gusts_10m,wind_speed_10m,wind_direction_10m&timezone=auto

}




//mettre le fetch
function maiN_func(lat,long) {
    console.log("Initialisation avec :", lat, long);
  //initialiser affichage ville toulouse
  fetch("https://geocoding-api.open-meteo.com/v1/search?name=Toulouse&count=10&language=fr&format=json&countryCode=FR")
    .then(response_obj => response_obj.json())
    .then(positions_arr => {

      const container = document.querySelector(".position-user");
      const template_position = document.querySelector(".template-position");
      container.innerHTML = ""; 
      //le "results" c'est ce qu'il ya dans l'api L’API Open-Meteo Geocoding ne renvoie pas directement un tableau, mais un objet JSON avec une clé results qui contient le tableau.
      Array.prototype.forEach.call(positions_arr.results, position_obj => {

        const position_elem = template_position.content.cloneNode(true);
        position_elem.querySelector(".user-name").textContent = position_obj.name;
        position_elem.querySelector(".longitude").textContent = position_obj.longitude;
        position_elem.querySelector(".altitude").textContent = position_obj.latitude;
        container.appendChild(position_elem);
      });
    });

//afficher Météo  
afficherMeteo_func();

//afficher svg en fonction du temps actuel
 convertWeatherCodeToSvgIndex();

//Afficher notre "chezmoi"
 oncityWhereweare_func();

 //Night Day mode Dark day mode 
 nightDaymode_func();


document.querySelector("#find-me").addEventListener("click", oncityWhereweare_func);

// chercher ville par l'utilisateur
chercherVille_func();

//jemets quoi commefonction entreparenthèse pourque la search bar marche ?
document.querySelector(".button").addEventListener("click", chercherVille_func);

// Empêche le rechargement du formulaire la recherche
document.querySelector(".form").addEventListener("submit", e => e.preventDefault());
document.querySelector(".search").addEventListener("input", searchBar_func);
}



maiN_func();