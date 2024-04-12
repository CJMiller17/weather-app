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
const spinner = document.getElementById("spinner");
spinner.style.visibility = "hidden";

let  farhenheit = document.getElementById("farhenheit");
let  celsius = document.getElementById("celsius");
let  weatherObject;
let  locationObject;
let  formatSunrise;
let  formatSunset;
let  degrees;
let  directions;
let  compass;

//Event Listeners
button.addEventListener("click", function (e) {
  e.preventDefault();
  spinner.style.visibility = "visible";
 
//This is the Geolocation API. Called First.
  axios
    .get(
      `http://api.openweathermap.org/geo/1.0/zip?zip=${zipCode.value},US&appid=${apiKey}`
    )
    .then(function (geolocation) {
      //Handles success
      console.log("Geolocation Response: ", geolocation);
      latitude = geolocation.data.lat;
      longitude = geolocation.data.lon;
      locationObject = geolocation;

      location();
    })
    .catch(function (geoError) {
      //Handles error
      console.log("Geolocation error: ", geoError);
      errorMessage.style.visibility = "visible";
      alert("Enter a real zipcode");
      spinner.style.visibility = "hidden";
    })
    .finally(function () {
      //Always executed
    });

      function location() {
        //This is the Weather Object. The latitude and longitude are fed into the URL from the other API call
        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
          )
          .then(function (weather) {
            // handle success
            console.log("Weather Response: ", weather);
            weatherObject = weather;
            //This is a series of functions dependent on API data
            sunriseTime();
            sunsetTime();
            compassRose();
            updatingWeatherInfo();
            //Resets Errors when a success happens afterward
            spinner.style.visibility = "hidden";
            errorMessage.style.visibility = "hidden";
          })
          .catch(function (weatherError) {
            //Handles error
            spinner.style.visibility = "hidden";
            console.log("Weather Error: ", weatherError);
          })
          .finally(function () {
            //Always executed
          });
      }
});

errorMessage.textContent = "**Please enter a valid 5 digit zip code**";
errorMessage.style.color = "red"

function updatingWeatherInfo() {
  //Values Updated via this function. Called inside the success API call
  city.textContent = locationObject.data.name;
  kelvin.textContent = weatherObject.data.main.temp.toFixed(1) + "\u00B0K";
  celsius.textContent = (weatherObject.data.main.temp - 273.15).toFixed(1) + "\u00B0C";
  farhenheit.textContent = ((9 / 5) * (weatherObject.data.main.temp - 273.15) + 32).toFixed(1) + "\u00B0F";
  condition.textContent = weatherObject.data.weather[0].main;
  info.textContent = weatherObject.data.weather[0].description; 
  info.style.textTransform = "capitalize";
  let icon = weatherObject.data.weather[0].icon;
  sunrise.textContent = "Sunrise: " + formatSunrise + " am";
  sunset.textContent = "Sunset: " + formatSunset + " pm";
  humidity.textContent = "Humiditity: " + weatherObject.data.main.humidity + "%";
  windSpeed.textContent = "Wind Speed: " + (weatherObject.data.wind.speed * 2.23694).toFixed(1) + "mph";
  windDirection.textContent = "Wind Direction: " + `${compass}`
  weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${icon}@2x.png`);
};

function sunriseTime() {
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

// function compassRose(windDirection.textContent) {
//   switch 
// }
function compassRose() {
  degrees = weatherObject.data.wind.deg;

  // Define array of directions
 directions = [
    "north",
    "northeast",
    "east",
    "southeast",
    "south",
    "southwest",
    "west",
    "northwest",
  ];

  // Split into the 8 directions
  degrees = (degrees * 8) / 360;

  // round to nearest integer.
  degrees = Math.round(degrees, 0);

  // Ensure it's within 0-7
  degrees = (degrees + 8) % 8;

  console.log(directions[degrees]);
  compass = (directions[degrees]); 
}
/*
I want to create a 
I want someone to be able to input a zipcode into the input field.
  I want that zipcode to be 5 digits long
    if not, I want it to return a specific error message
*/