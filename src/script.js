//note to self, the things in the "#" link back to the id="" in the html file

function refreshWeather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let timeElement = document.querySelector("#time");
    let date = new Date(response.data.time * 1000);
    let iconElement = document.querySelector("#icon");


    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML = formatDate(date);
    descriptionElement.innerHTML = response.data.condition.description;
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windElement.innerHTML = `${response.data.wind.speed} km/h`;
    temperatureElement.innerHTML = Math.round(temperature);
    iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon" />`;

    getForecast(response.data.city);

}

function formatDate(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[date.getDay()];

    // this ensures that if the minutes in the hour are less than 10, then a 0 is printed before the digit
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${day} ${hours}:${minutes}`;
}

function searchCity(city) {
    //make api call and update the user interface
    let apiKey = "47f014eetbd5705bef2eaf6f053ao8dd"
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios.get(apiUrl).then(refreshWeather);
}

function handleSearchSubmit(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");

    searchCity(searchInput.value);
}

//function for the days in the forecast
function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return days[date.getDay()];
}

//get API data for the forecast loop
function getForecast(city) {
    let apiKey = "47f014eetbd5705bef2eaf6f053ao8dd";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`
    axios(apiUrl).then(displayForecast);
}

//loop function for the 5-day forecast
function displayForecast(response) {
    console.log(response.data);
    let forecastHtml = "";

    response.data.daily.forEach(function (day, index) {
        //the loop will stop after 5 days
        if (index < 5) {
            forecastHtml = forecastHtml + `
        <div class="weather-forcast-day">
                            <div class="weather-forecast-date">${formatDay(day.time)}</div>
                    
                            <img src="${day.condition.icon_url}" class="weather-forecast-icon" />
                            <div class="weather-forecast-temperatures">
                                <div class="weather-forecast-temperature"><strong>${Math.round(day.temperature.maximum)}°C</strong></div>
                                <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°C</div>
                            </div>
                        </div>`;
        }
    });
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris")
displayForecast();


