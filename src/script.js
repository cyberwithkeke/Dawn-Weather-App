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
    console.log(response.data.main.temp);
    console.log(response.data.name);
    console.log(response.data.weather[0].description);

    let temperatureElement = document.querySelector("#temp");
    temperatureElement.innerHTML= Math.round(response.data.main.temp);
    let temp = `${temperatureElement}`;

    let cityElement = document.querySelector("#cityName")
    cityElement.innerHTML=(response.data.name);

    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML= (response.data.weather[0].description);

    let humidityElement = document.querySelector("#humidity");
    humidityElement.innerHTML=(response.data.main.humidity);

    let windElement = document.querySelector("#wind");
    windElement.innerHTML=Math.round(response.data.wind.speed);

    let dateElement = document.querySelector("#date");
    dateElement.innerHTML =formatDate(response.data.dt * 1000);


};





let apiKey = "661209a470ee91ce662726bf1f4724cc";
let cityName = "Durban";
let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemp);