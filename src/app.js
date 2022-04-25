function formatDate(timestamp) {
    let date = new Date(timestamp);
    let hours = date.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    let daysWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let day = daysWeek[date.getDay()];

    return `${day} ${hours}:${minutes}`
}


function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
}

//Dinamic add forecast on the form.
function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector('#weather-forecast');
    let forecastHTML = `<div class="row">`;

    forecast.forEach((forecastDay, index) => {
        if (index < 6) {

            forecastHTML += `
                <div class="col-2">
                    <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
                    
                    <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" alt="" width="42" />
                    <div class="weather-forecast-temperatures">
                    <span class="whater-forecast-tempMax"> ${Math.round(forecastDay.temp.max) }°</span>
                    <span class="whater-forecast-tempMim"> ${Math.round(forecastDay.temp.min)}°</span>
                    </div>
            </div>`;
        }
    })

    forecastHTML = forecastHTML + `</div>`
    forecastElement.innerHTML = forecastHTML;

}

function getForecast(coordinates) {
    let apiKey = "a47fcb32fa31c2cf0799e4cfc995447f";
    let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    console.log(apiURL);
    axios.get(apiURL).then(displayForecast);
}

function displayTemperature(response) {
    let countryValue = response.data.name;
    let descriptionValue = response.data.weather[0].description;

    celsiusTemp = Math.round(response.data.main.temp);

    let temperatureValue = Math.round(response.data.main.temp);
    let humidityValue = response.data.main.humidity;
    let windVale = Math.round(response.data.wind.speed);
    let temperatureElement = document.querySelector("#temp");
    let countryElement = document.querySelector("#country");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    let iconElement = document.querySelector("#icon");
    iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

    windElement.innerHTML = `${windVale}km/H`;
    humidityElement.innerHTML = `${humidityValue}%`;
    temperatureElement.innerHTML = temperatureValue;
    countryElement.innerHTML = countryValue;
    descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = descriptionValue;

    //Date
    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);

    getForecast(response.data.coord);
}

//Search Country

function search(city) {
    let apiKey = "a47fcb32fa31c2cf0799e4cfc995447f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayTemperature);
}

function handleCountry(event) {
    event.preventDefault();
    let cityInputElement = document.querySelector("#city-input");
    search(cityInputElement.value);
}

let celsiusTemp = " ";

let formElement = document.querySelector("#search-form");
formElement.addEventListener("submit", handleCountry);

//Convert to fahrenheit

function showFahrenheit(event) {
    event.preventDefault();

    celciusElement.classList.remove("active");
    fahrenheitElement.classList.add("active");
    let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
    let tempElement = document.querySelector("#temp");
    tempElement.innerHTML = Math.round(fahrenheitTemp);
}

function showCelcius(event) {
    event.preventDefault();

    celciusElement.classList.add("active");
    fahrenheitElement.classList.remove("active");
    let tempElement = document.querySelector("#temp");
    tempElement.innerHTML = Math.round(celsiusTemp);
}

let fahrenheitElement = document.querySelector("#fahrenheit");
fahrenheitElement.addEventListener("click", showFahrenheit);

let celciusElement = document.querySelector("#celcius");
celciusElement.addEventListener("click", showCelcius);



search("London");