/* Geolocation instructions from W3 Schools, modified for this project */
var userLocation = document.getElementById("location");

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
        var requestUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' +lon + '&appid=0282671f74388449f4d4c1e0b2dbe75e';
        fetch(requestUrl)
          .then(function (response) {
            return response.json();
          })
          .then(function (data) {
            console.log(data.name)
        });
        userLocation.innerHTML = (data.name);
    }
    

document.onload = getLocation();

