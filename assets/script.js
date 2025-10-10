
//mettre le fetch
function essai_func() {
    fetch("https://geocoding-api.open-meteo.com/v1/search?name=paris&count=100&language=fr&format=json&countryCode=FR")
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
  console.log(text);
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


// function cityWhereweare_func{

//     mettre sa ville ici quand on appuie sur la loop en bas à droite de l'écran
// }


// function nightDaymode_func{

//     couleur de fond jour nuit un toggle ? oui

// } 

// navigator.geolocation.watchPosition(async (position) => {
//     const { latitude, longitude } = position.coords;
//     const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
//     const response = await fetch(url);
//     const data = await response.json();
//     console.log('Météo actuelle:', data.current_weather);
// });

//deux liens que j'ai trouvé dans l'api

// https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&daily=weather_code,sunset,sunrise,rain_sum,temperature_2m_max,apparent_temperature_max,temperature_2m_min,daylight_duration,sunshine_duration,precipitation_probability_max,precipitation_hours,precipitation_sum,snowfall_sum,showers_sum,uv_index_clear_sky_max,uv_index_max&hourly=temperature_2m,sunshine_duration,is_day,uv_index_clear_sky,wet_bulb_temperature_2m,total_column_integrated_water_vapour,uv_index&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,surface_pressure,pressure_msl,cloud_cover,weather_code,wind_speed_10m,wind_direction_10m,wind_gusts_10m


// https://geocoding-api.open-meteo.com/v1/search?name=paris&count=100&language=fr&format=json&countryCode=FR