let res;
let forecast;
let searchInput = document.querySelector("#searchInput");
const daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

showDetails();

function showDetails(term) {
  if (!term) {
    navigator.geolocation.getCurrentPosition(function (position) {
      let latitude = position.coords.latitude;
      let longitude = position.coords.longitude;

      fetchWithLatitudeAndLongtiude(latitude, longitude);
    });
  } else {
    fetchWithCityName(term);
  }
}

function fetchWithLatitudeAndLongtiude(latitude, longitude) {
  let req = new XMLHttpRequest();
  req.open(
    "GET",
    `https://api.weatherapi.com/v1/forecast.json?key=40d450df4d2146059ac160341240701&q=${latitude},${longitude}&days=3`
  );

  req.send();

  req.addEventListener("loadend", function () {
    if (req.status >= 200 && req.status < 300) {
      res = JSON.parse(req.response);
      forecast = res.forecast.forecastday;
      displayForecast();
    }
  });
}

function fetchWithCityName(city) {
  let req = new XMLHttpRequest();

  req.open(
    "GET",
    `https://api.weatherapi.com/v1/forecast.json?key=40d450df4d2146059ac160341240701&q=${city}&days=3`
  );

  req.send();

  req.addEventListener("loadend", function () {
    if (req.status >= 200 && req.status < 300) {
      res = JSON.parse(req.response);
      forecast = res.forecast.forecastday;
      displayForecast();
    }
  });
}

searchInput.addEventListener("keyup", function (e) {
  showDetails(e.target.value);
});

function displayForecast() {
  // First Column
  document.querySelectorAll(".day")[0].innerHTML =
    daysOfWeek[new Date().getDay()];
  document.querySelector(".city").innerHTML = res.location.name;
  document.querySelector(".num").innerHTML = forecast[0].day.avgtemp_c;
  document.querySelector(".date").innerHTML = forecast[0].date;
  document
    .querySelectorAll(".home img")[0]
    .setAttribute("src", `https:${forecast[0].day.condition.icon}`);
  document.querySelectorAll(".describtion")[0].innerHTML =
    forecast[0].day.condition.text;
  document.querySelector(".rain").innerHTML =
    forecast[0].day.daily_chance_of_rain;
  document.querySelector(".wind").innerHTML = forecast[0].day.maxwind_kph;
  document.querySelector(".humidity").innerHTML = forecast[0].day.avghumidity;
  // Second Column
  document.querySelectorAll(".day")[1].innerHTML =
    daysOfWeek[new Date().getDay() + 1];
  document
    .querySelectorAll(".home img")[1]
    .setAttribute("src", `https:${forecast[1].day.condition.icon}`);
  document.querySelectorAll(".fo2")[0].innerHTML = forecast[1].day.maxtemp_c;
  document.querySelectorAll(".t7t")[0].innerHTML = forecast[1].day.mintemp_c;
  document.querySelectorAll(".describtion")[1].innerHTML =
    forecast[1].day.condition.text;
  // Third Column
  document.querySelectorAll(".day")[2].innerHTML =
    daysOfWeek[new Date().getDay() + 2];
  document
    .querySelectorAll(".home img")[2]
    .setAttribute("src", `https:${forecast[2].day.condition.icon}`);
  document.querySelectorAll(".fo2")[1].innerHTML = forecast[2].day.maxtemp_c;
  document.querySelectorAll(".t7t")[1].innerHTML = forecast[2].day.mintemp_c;
  document.querySelectorAll(".describtion")[2].innerHTML =
    forecast[2].day.condition.text;
}
// console.log(document.querySelectorAll("img")[0]);
