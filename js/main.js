import axios from "axios";

let zipCode = "40511";
let countryCode = "US";
let apiKey = "eaf1b3669cab94d9c4601d7c3e4160e1";
let latitude = null;
let longitude = null;
let part = null; 
//this will be the geolocation API

axios
  .get(`http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode},${countryCode}&appid=${apiKey}`)
  .then(function (response) {
    // handle success
      console.log("Geolocation Response: ", response);
      latitude = response.data.lat
      longitude = response.data.lon
 
      function latLon() {
          axios
            .get(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
            )
            .then(function (response) {
              // handle success
              console.log("Weather Response: ", response);
            })
            .catch(function (error) {
              // handle error

              console.log("Weather Error: ", error);
            })
            .finally(function () {
              // always executed
            });

      }
      latLon();
  })
  .catch(function (error) {
    // handle error
    console.log("Geolocation error: ", error);
  })
  .finally(function () {
    // always executed
  });

  https://api.openweathermap.org/data/2.5/weather?zip={zip code},{country code}&appid={API key}

//this will be the weather API



// function axiosSwanson() {
//     axios.get("https://ron-swanson-quotes.herokuapp.com/v2/quotes/1")
//         .then(response => console.log("data: ", response.data))
//         .catch(error => {
//             console.log("error": error)
//     });
// }

// function fetchSwanson() {
//     fetch("https://ron-swanson-quotes.herokuapp.com/v2/quotes/1")
//     .then(response => response.json())
//     .then(data => console.log("data: ", data))
//         .catch(error => {
//         console.log("error: ", error)
//     })
// }

/*

*/
