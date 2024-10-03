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
//get API data for the forecast loop
function getForecast(city) {
    let apiKey = "47f014eetbd5705bef2eaf6f053ao8dd";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`
    axios(apiUrl).then(displayForecast);
}



//loop function for the 5-day forecast
function displayForecast(response) {
    console.log(response.data);
    let days = ["Fri", "Sat", "Sun", "Mon", "Tues"]
    let forecastHtml = "";

    days.forEach(function (day) {
        forecastHtml = forecastHtml + `
        <div class="weather-forcast-day">
                            <div class="weather-forecast-date">${day}</div>
                            <div class="weather-forecast-icon">☀️</div>
                            <div class="weather-forecast-temperatures">
                                <div class="weather-forecast-temperature"><strong>20°C</strong></div>
                                <div class="weather-forecast-temperature">10°C</div>
                            </div>
                        </div>`;
    });
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHtml;
}


let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

searchCity("Paris")
displayForecast();


