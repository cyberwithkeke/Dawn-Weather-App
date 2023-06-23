//calculating date using timestap in the function
    function formatDate(timestap){
    let date = new Date(timestap);

    //adding zero in hours from 5:45 - 05:45
    let hours = date.getHours();
    if (hours < 10) {
    hours = `0${hours}`;
  }
 
    //adding zero in minutes from 15:1- 15:01
    let minutes = date.getMinutes();
     if (minutes < 10) {
    minutes = `0${minutes}`;
  }

    let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
    let day = days[date.getDay()];
    return `${day} ${hours}:${minutes}`;
}


//calling out the displayTemp function, so it can be defined when called by apiUrl
//display realtime temp,date and time on app and city
function displayTemp(response){
    console.log(response.data);
    console.log(response.data.temperature.current);
    console.log(response.data.city);
    console.log(response.data.condition.description);


    celsiusTemperature = response.data.temperature.current;
    let temperatureElement = document.querySelector("#temp");
    temperatureElement.innerHTML= Math.round(celsiusTemperature);
    let temp = `${temperatureElement}`;

    let cityElement = document.querySelector("#cityName")
    cityElement.innerHTML=(response.data.city);

    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML= (response.data.condition.description);

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML=(response.data.temperature.humidity);

    let windElement = document.querySelector("#wind");
    windElement.innerHTML=Math.round(response.data.wind.speed);

    let dateElement = document.querySelector("#date");
    dateElement.innerHTML =formatDate(response.data.time * 1000);

    //adding real time icon of weather description
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute ("src",`http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`); 

    //changing alt to real time description of the icon in js
    iconElement.setAttribute ("alt", response.data.condition.description);

    //used on getForecast function
    getForecast(response.data.coordinates);
}


//A function that calls API and display real time days of the week weather forecast.
function getForecast(coords){
  console.log(coords);

  let apiKey = "20601501f5f30dff45eo3e04tfa40ddb";
  let apiUrl =`https://api.shecodes.io/weather/v1/forecast?lat=${coords.latitude}&lon=${coords.longitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherForecast);
}


//function to format numerical days from API to etc MON,TUE
function formatDay(timestap){
  let date = new Date(timestap * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed","Thu","Fri", "Sat"];

  return days[day];
};

//A function to multiple days of the week of forecast from 1 day HTML using Javas
function displayWeatherForecast(response) {
  console.log(response.data.daily);
let weatherForecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");

  //injecting html code
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];

  let forecastHTML = `<div class="row">`;
  weatherForecast.forEach(function(forecastDay, index) 
                        {
    if (index < 6) {
  forecastHTML = forecastHTML +
                      `
                        <div class="col-2 forecastDay" >
                            <div class="forecast-date">
                                ${formatDay(forecastDay.time)}
                            </div>
                        
                            <img 
                            src ="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" 
                            alt="" 
                            width="42" 
                            /> 
                            <div class="forecast-temp">
                            <span class="max">${Math.round(forecastDay.temperature.maximum)}°</span> <span class="min">${Math.round(forecastDay.temperature.minimum)}°</span>
                            </div>
                          </div>
                        `;
                      }
                      
                        });
    forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
 
}


//a fucntion that display the realtime searched city on web app
function search (cityName){
let apiKey = "20601501f5f30dff45eo3e04tfa40ddb";
let apiUrl =`https://api.shecodes.io/weather/v1/current?query=${cityName}&key=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemp);
}


//a function that will prevent automated pop up.
function handleSearch(event){
event.preventDefault();
let cityInputElement = document.querySelector("#city-input");
search(cityInputElement.value); // the city searched can appear on the page when searched on the page
console.log(cityInputElement.value);
}


//a function for fahrenheit convertion
function displayFahTemperature(event){
    event.preventDefault();
    fahLink.classList.add("active");
    //remove the active class of celsius link to fah when clicked
    celsiusLink.classList.remove("active");
    let fahTemperature = (celsiusTemperature * 9) / 5 + 32;
    let temperatureElement = document.querySelector("#temp");
    temperatureElement.innerHTML = Math.round(fahTemperature);
    
}


// a function for celsius convertion
function displayCelsiusTemperature(event){
    event.preventDefault();
    fahLink.classList.remove("active");
    celsiusLink.classList.add("active");
    let temperatureElement = document.querySelector("#temp");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);
}


let celsiusTemperature = null;


//linking the form to javas
let form = document.querySelector("#search-form");
form.addEventListener("submit",handleSearch);


//converting celsius into fahrenheit °C -°F
let fahLink = document.querySelector("#fah-link");
fahLink.addEventListener("click", displayFahTemperature);

//converting fahrenheit back to celsius °F -°C
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);


search("Pretoria");
