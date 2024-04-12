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
const zipCode = document.getElementById("submittingZipcode");
const weatherIcon = document.querySelector("img");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const windDirection = document.getElementById("wind-direction");  
let   farhenheit = document.getElementById("farhenheit");
let   celsius = document.getElementById("celsius");
let   weatherObject;
let   locationObject;
let   formatSunrise;
let formatSunset;

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

        sunriseTime();
        sunsetTime();
        setTimeout(updatingWeatherInfo, 50);
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

function updatingWeatherInfo() {
  city.textContent = locationObject.data.name;
  kelvin.textContent = weatherObject.data.main.temp.toFixed(1) + "\u00B0K";
  celsius.textContent = (weatherObject.data.main.temp - 273.15).toFixed(1) + "\u00B0C";
  farhenheit.textContent = ((9 / 5) * (weatherObject.data.main.temp - 273.15) + 32).toFixed(1) + "\u00B0F";
  condition.textContent = weatherObject.data.weather[0].main;
  info.textContent = weatherObject.data.weather[0].description; 
  info.style.textTransform = "capitalize";
  let icon = weatherObject.data.weather[0].icon;
  sunrise.textContent = "Sunrise: " + formatSunrise;
  sunset.textContent = "Sunset: " + formatSunset;
  humidity.textContent = "Humiditity: " + weatherObject.data.main.humidity + "%";
  windSpeed.textContent = "Wind Speed: " + (weatherObject.data.wind.speed * 2.23694).toFixed(1) + "mph";
  windDirection.textContent = "Wind Direction: " + weatherObject.data.wind.deg + "\u00B0";
  weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${icon}@2x.png`);
};
/*
I want to create a 
I want someone to be able to input a zipcode into the input field.
  I want that zipcode to be 5 digits long
    if not, I want it to return a specific error message
*/function sunriseTime() {
  let unixTimestamp = weatherObject.data.sys.sunrise;
  let dateObj = new Date(unixTimestamp * 1000);
  let riseTime = dateObj.toTimeString();
  formatSunrise = riseTime.substring(0,5)
  console.log("sunrise: ", riseTime);
  console.log(formatSunrise);
}

function sunsetTime() {
  let unixTimestamp = weatherObject.data.sys.sunset;
  let dateObj = new Date(unixTimestamp * 1000);
  let setTime = dateObj.toTimeString();
  formatSunset = setTime.substring(0, 5);
  console.log("sunset: ", setTime);
  console.log(formatSunset);
}
