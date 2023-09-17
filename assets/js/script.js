/* Geolocation instructions from W3 Schools, modified for this project */
var userLocation = document.getElementById("yourLocation");
var todaysDate = dayjs().format('MMMM D, YYYY');
var localWeather = document.getElementById("yourWeather");
var localTemp = document.getElementById("yourTemp");
var needUmbrella = document.getElementById("umbrella");
var weatherIcon = document.getElementById("weatherIcon"); 

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    userLocation.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;
    "<br>Longitude: " + lon;
        var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?q&lat=' + lat + '&lon=' + lon + '&appid=0282671f74388449f4d4c1e0b2dbe75e&units=imperial';
        fetch(requestUrl)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {

            userLocation.innerHTML = data.name;
            console.log(data);
                function displayTemp() {
                localTemp.innerHTML = Math.round(data.main.temp) + '&deg;';
                var iconUrl = 'https://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
                weatherIcon.setAttribute('src', iconUrl);
                }
                displayTemp();
                function umbrella() {
                    if (data.weather[0].main === 'Rain') {
                        needUmbrella.innerHTML = 'bring an umbrella!';
                    }
                    if (data.weather[0].main === 'Drizzle') {
                        needUmbrella.innerHTML = 'bring an umbrella!';
                    }
                    if (data.weather[0].main === 'Thunderstorm') {
                        needUmbrella.innerHTML = 'stay inside!';
                    }
                    if (data.weather[0].main === 'Tornado') {
                        needUmbrella.innerHTML = 'stay inside!';
                    }
                    else {
                        needUmbrella.innerHTML = 'no umbrella needed.';
                    }
                    
                    }
                umbrella();
                function displayWeather() {
                localWeather.innerHTML = data.weather[0].description + '<br/>wind: ' + data.wind.speed + '<br/>humidity: ' + data.main.humidity;
                }
                displayWeather();
        });
        
    }
document.onload = getLocation();

function displayDate() {
    var yourDate = document.getElementById("yourDate");
    
    yourDate.innerHTML = todaysDate;
}
document.onload = displayDate();


