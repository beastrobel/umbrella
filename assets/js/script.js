var userLocation = document.getElementById("yourLocation");
var todaysDate = dayjs().format('MMMM D, YYYY');
var localWeather = document.getElementById("yourWeather");
var localTemp = document.getElementById("yourTemp");
var needUmbrella = document.getElementById("umbrella");
var weatherIcon = document.getElementById("weatherIcon"); 
var searchButton = document.getElementById("searchButton");

/* Geolocation instructions from W3 Schools, modified for this project */
function getLocation() { 
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    userLocation.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
    var lat = position.coords.latitude;
    var lon = position.coords.longitude; "<br>Longitude: " + lon;
        
        /* Fetch daily forecast */
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
                /* App reminds you to bring umbrella on rainy days */
                function umbrella() {
                    if (data.weather[0].main === 'Rain' || data.weather[0].main === 'Drizzle') {
                        needUmbrella.innerHTML = 'bring an umbrella!';
                    }
                    else if (data.weather[0].main === 'Thunderstorm' || data.weather[0].main === 'Tornado') {
                        needUmbrella.innerHTML = 'severe weather: stay inside!';
                    }
                    else {
                        needUmbrella.innerHTML = 'no umbrella needed.';
                    }
                    }
                umbrella();
                /* Displays weather details */
                function displayWeather() {
                localWeather.innerHTML = data.weather[0].description + '<br/>wind: ' + data.wind.speed + ' mph' + '<br/>humidity: ' + data.main.humidity + '%';
                }
                displayWeather();
        });
 
        /* Fetch 5-Day forecast */
        requestUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=0282671f74388449f4d4c1e0b2dbe75e&units=imperial';
        fetch(requestUrl)
            .then(function (response) {
            return response.json();
        })
        .then(function (data) {
        console.log(data);

             /* Displays data for 5-Day forecast */
            function displayFiveDays() {
            for (let i=0; i<5; i++){
                let x = dayjs();
                let weekDay = x.add(i+1, 'day').format('dddd');
                var weekDayLabel = document.getElementById("day-"+(i+1));
                weekDayLabel.children[0].innerHTML = weekDay;
                let weekIcon = 'https://openweathermap.org/img/wn/' + data.list[i*8+3].weather[0].icon + '@2x.png';
                weekDayLabel.children[1].setAttribute('src', weekIcon);
                weekDayLabel.children[2].innerHTML = Math.round(data.list[i*8+3].main.temp) + '&deg;'; 
                weekDayLabel.children[3].innerHTML = data.list[i*8+3].weather[0].description + '<br/>wind: ' + data.list[i*8+3].wind.speed + ' mph' + '<br/>humidity: ' + data.list[i*8+3].main.humidity + '%';  
                
                }
            }
            displayFiveDays();
        });
        
    }
    getLocation();

    /* Search button */
    var form = $('#location-search');
    var locationInput = $('#searchBar');
    var locationList = $('#favLocation');
    
    var printLocations = function (name) {
      var listEl = $('<a>');
      var listDetail = name;
      listEl.addClass('list-group-item list-group-item-action').text(listDetail);
      listEl.appendTo(locationList);
    };
    
    var handleFormSubmit = function (event) {
      event.preventDefault();
      var location = locationInput.val();
      printLocations(location);
      /*Add to local storage */
      localStorage.setItem('location', location);
          /* Displays searched location's daily weather */
          fetch ('https://api.openweathermap.org/data/2.5/weather?q=' + location + '&appid=0282671f74388449f4d4c1e0b2dbe75e&units=imperial')
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
                /* App reminds you to bring umbrella on rainy days */
                function umbrella() {
                    if (data.weather[0].main === 'Rain' || data.weather[0].main === 'Drizzle') {
                        needUmbrella.innerHTML = 'bring an umbrella!';
                    }
                    else if (data.weather[0].main === 'Thunderstorm' || data.weather[0].main === 'Tornado') {
                        needUmbrella.innerHTML = 'severe weather: stay inside!';
                    }
                    else {
                        needUmbrella.innerHTML = 'no umbrella needed.';
                    }
                    }
                umbrella();
                /* Displays weather details */
                function displayWeather() {
                localWeather.innerHTML = data.weather[0].description + '<br/>wind: ' + data.wind.speed + ' mph' + '<br/>humidity: ' + data.main.humidity + '%';
                }
                displayWeather();
            });
             /* Displays searched locations's 5-Day forecast */
             fetch ('https://api.openweathermap.org/data/2.5/forecast?q=' + location + '&appid=0282671f74388449f4d4c1e0b2dbe75e&units=imperial')
            .then(function (response) {
            return response.json();
        })
        .then(function (data) {
        console.log(data);

             /* Displays data for 5-Day forecast */
            function displayFiveDays() {
            for (let i=0; i<5; i++){
                let x = dayjs();
                let weekDay = x.add(i+1, 'day').format('dddd');
                var weekDayLabel = document.getElementById("day-"+(i+1));
                weekDayLabel.children[0].innerHTML = weekDay;
                let weekIcon = 'https://openweathermap.org/img/wn/' + data.list[i*8+3].weather[0].icon + '@2x.png';
                weekDayLabel.children[1].setAttribute('src', weekIcon);
                weekDayLabel.children[2].innerHTML = Math.round(data.list[i*8+3].main.temp) + '&deg;'; 
                weekDayLabel.children[3].innerHTML = data.list[i*8+3].weather[0].description + '<br/>wind: ' + data.list[i*8+3].wind.speed + ' mph' + '<br/>humidity: ' + data.list[i*8+3].main.humidity + '%';  
                
                }
            }
            displayFiveDays();
        });
        
      locationInput.val('');
    };
    
    form.on('submit', handleFormSubmit);



/* Displays today's date */
function displayDate() {
    var yourDate = document.getElementById("yourDate");
    yourDate.innerHTML = todaysDate;
}
displayDate();


