const API_KEY = 'f387c41b5f1be60f324f6dde6a4cc654'; //http://api.openweathermap.org/data/2.5/weather?q=London&appid=f387c41b5f1be60f324f6dde6a4cc654
const URL = 'http://api.openweathermap.org/data/2.5/weather'

const button = document.getElementById("sendButton");
const main = document.getElementById("main");
const result = document.getElementById("result");
const searchCity = document.getElementById("searchCity");
var weather = document.getElementById("weather");


if(localStorage.getItem("lastCity") != null) {
  SetCityInfo(JSON.parse(localStorage.getItem("lastCity")));
}

button.addEventListener("click", ()=>{
    search(searchCity.value);
});

function search(city) {
  const fetchPromise = fetch(`${URL}?q=${city}&appid=${API_KEY}&units=metric`);

  fetchPromise.then(response => {
    return response.json();
  }).then(result => {
    console.log('data',  JSON.stringify(result));
    if(result.cod != undefined || result.cod != "400") {
      throw new Error;
    } else {
      SetCityInfo(result);
    }
  }).catch(err =>{
    console.log('Ohhh fallo!: ', err);
    if(localStorage.getItem("lastCity") == null) {
      var divInfo = document.getElementById("divInfo");
      divInfo.style.display = "none";
    }    

    var searchError = document.getElementById("searchError");
    searchError.style.display = "flex";  
  });
}

function SetCityInfo(info) {

  var divInfo = document.getElementById("divInfo");
    var searchError = document.getElementById("searchError");
    var city = document.getElementById("city");
  var map = document.getElementById("map");
  var temp = document.getElementById("current_temp");
  var temp_max = document.getElementById("max_temp");
  var temp_min = document.getElementById("min_temp");
  var feels_like = document.getElementById("feels_like");
  var pressure = document.getElementById("pressure");
  var humidity = document.getElementById("humidity");
  var wind = document.getElementById("wind");
  var weather_img = document.getElementById("weather_img");


  city.textContent = info.name;
  // map.src = "https://www.google.com/maps/embed/v1/place?key=AIzaSyDqTrRpqrwq_PpxfNY_huUoE1olW1jAK5Q&center="+info.coord.lat+","+info.coord.lon+"&q=";
  map.src = "https://www.google.com/maps/embed/v1/view?key=AIzaSyDqTrRpqrwq_PpxfNY_huUoE1olW1jAK5Q&zoom=14&center="+info.coord.lat+","+info.coord.lon;
  weather.value = info.weather[0].main;
  temp.textContent = info.main.temp+"ºC";
  temp_max.textContent = "Max: "+info.main.temp_max+"ºC";
  temp_min.textContent = "Min: "+info.main.temp_min+"ºC";
  feels_like.textContent = "ST: "+info.main.feels_like+"ºC";
  pressure.textContent = "Pres: "+info.main.pressure+" hPa";
  humidity.textContent = "Hum: "+info.main.humidity+"%";
  wind.textContent = "V: "+info.wind.speed+" KM/h";

  SetWeatherTheme(weather);

  divInfo.style.display = "flex";
  searchError.style.display = "none";

  localStorage.setItem("lastCity", JSON.stringify(info));
}

function SetWeatherTheme(weather) {
  var body = document.getElementsByTagName("body")[0];
  var headers = document.getElementsByClassName("header");
  var info = document.getElementById("info");

  
  
  if (weather.value.toLowerCase().indexOf("clear") > -1) {
    weather_img.src = "images/sunny.png";
    body.style.backgroundImage = "url('images/soleado-background.jpg')";
    info.style.backgroundColor = "#8280d6";
    for (let index = 0; index < headers.length; index++) {
      headers[index].style.backgroundColor = "#8280d6";
    }
  }

  if (weather.value.toLowerCase().indexOf("rain") > -1) {
    weather_img.src = "images/light-rain.png";
    body.style.backgroundImage = "url('images/lluvia-background.jpg')";
    info.style.backgroundColor = "#764695";
    for (let index = 0; index < headers.length; index++) {
      headers[index].style.backgroundColor = "#764695";
    }

  }

  if (weather.value.toLowerCase().indexOf("cloud") > -1) {
    weather_img.src = "images/sunny-Interval.png";
    body.style.backgroundImage = "url('images/cloud-background.jpg')";
    info.style.backgroundColor = "#818181";
    for (let index = 0; index < headers.length; index++) {
      headers[index].style.backgroundColor = "#818181";
    }
  }

  if (weather.value.toLowerCase().indexOf("snow") > -1) {
    weather_img.src = "images/snow.png";
    body.style.backgroundImage = "url('images/snow-background.jpg')";
    info.style.backgroundColor = "#71355b";
    for (let index = 0; index < headers.length; index++) {
      headers[index].style.backgroundColor = "#71355b";
    }
  }
}
