let weather;
let el;
let item;

const baseURL =
  "https://api.weatherbit.io/v2.0/forecast/daily?postal_code=ST162RP&days=8&key=8adc9c07736e467cb1e8ef7497ddc0f8";

// FUNCTION CALL TO WEATHER API
function getWeather(cb) {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", baseURL);
  xhr.send();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      cb(JSON.parse(this.responseText));
    }
  };
}

// FUNCTION TO DISPLAY INFORMATION ON PAGE
function writeToDocument() {
  let el = document.getElementById("data");
  el.innerHTML = "";
  getWeather(function (weather) {
    weather = weather.data;

    weather.forEach(function (item) {
      Object.keys(item).forEach(function (key) {});

      if (item.weather.code >= 200 && item.weather.code <= 233) {
        msg = "be careful out there!";
      } else if (item.weather.code >= 300 && item.weather.code <= 522) {
        msg = "you'll need a coat!";
      } else if (item.weather.code >= 600 && item.weather.code <= 623) {
        msg = "wrap up warm!";
      } else if (item.weather.code >= 700 && item.weather.code <= 751) {
        msg = "it may be hard to see today!";
      } else if (item.weather.code == 800) {
        msg = "bring your sunglasses!";
      } else if (item.weather.code >= 801 && item.weather.code <= 803) {
        msg = "you may need sunglasses!";
      } else if (item.weather.code == 804) {
        msg = "bit grey today!";
      } else {
        msg = "Enjoy Your Day";
      }

      let date = item.valid_date.split("-");
      let newDate = date[2] + "-" + date[1] + "-" + date[0];

      el.innerHTML +=
        '<div class="col-12 col-sm-6 col-md-3 weatherbox1"><p class="weather-date">' +
        newDate +
        "</p>" +
        '<p><span class="weather-temp">' +
        item.temp +
        '</span><span class="celsius">&#176 C</span></p>' +
        '<p class="weather-description">' +
        item.weather.description +
        "</p>" +
        '<img src="assets/img/weather_icons/' +
        item.weather.icon +
        '.png" alt="weather_icon">' +
        '<p class="weather-message">' +
        msg +
        "</p>";
    });
  });
}

writeToDocument();
