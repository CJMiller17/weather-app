import axios from "axios";

//API related variables
const apiKey = "eaf1b3669cab94d9c4601d7c3e4160e1";
let latitude = null;
let longitude = null;

//DOM related variables
const button = document.getElementById("button");
const errorMessage = document.getElementById("error");
errorMessage.style.visibility = "hidden";
const city = document.getElementById("display-city");
const condition = document.getElementById("current-condition");
const info = document.getElementById("additional-info");
const kelvin = document.getElementById("kelvin");
const zipCode = document.getElementById("submittingZipcode")
let   farhenheit = document.getElementById("farhenheit");
let   celsius = document.getElementById("celsius");
let   weatherObject;
let   locationObject;

//Event Listeners
button.addEventListener("click", function (e) {
  e.preventDefault();
  // console.log(experiment);

  //this will be the geolocation API
  axios
    .get(
      `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode.value},US&appid=${apiKey}`
    )
    .then(function (geolocation) {
      // handle success
      console.log("Geolocation Response: ", geolocation);
      latitude = geolocation.data.lat;
      longitude = geolocation.data.lon;
      locationObject = geolocation;

      location();
    })
    .catch(function (geoError) {
      // handle error
      console.log("Geolocation error: ", geoError);
      errorMessage.style.visibility = "visible";
      alert("Bruh, Enter a real zipcode");

    })
    .finally(function () {
      // always executed
    });

  function location() {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      )
      .then(function (weather) {
        // handle success
        console.log("Weather Response: ", weather);
        weatherObject = weather;

        updatingWeatherInfo();
        errorMessage.style.visibility = "hidden";
      })
      .catch(function (weatherError) {
        // handle error

        console.log("Weather Error: ", weatherError);
      })
      .finally(function () {
        // always executed
      });
  }
});

errorMessage.textContent = "**Please enter a valid 5 digit zip code**";
errorMessage.style.color = "red"
//While WeatherObject = false, dont do anything;
function updatingWeatherInfo() {
  city.textContent = locationObject.data.name;
  kelvin.textContent = weatherObject.data.main.temp.toFixed(1) + "\u00B0K";
  celsius.textContent = (weatherObject.data.main.temp - 273.15).toFixed(1) + "\u00B0C";
  farhenheit.textContent = ((9 / 5) * (weatherObject.data.main.temp - 273.15) + 32).toFixed(1) + "\u00B0F";
  condition.textContent = weatherObject.data.weather[0].main;
  info.textContent = weatherObject.data.weather[0].description; 
  info.style.textTransform = "capitalize";
};
/*
I want to create a 
I want someone to be able to input a zipcode into the input field.
  I want that zipcode to be 5 digits long
    if not, I want it to return a specific error message
*/
