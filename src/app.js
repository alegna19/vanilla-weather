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
    let daysWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
    let day = daysWeek[date.getDay()];

    return `${day} ${hours}:${minutes}`
}

function displayTemperature(response) {
    let countryValue = response.data.name;
    let descriptionValue = response.data.weather[0].description;
    let temperatureValue = Math.round(response.data.main.temp);
    let humidityValue = response.data.main.humidity;
    let windVale = Math.round(response.data.wind.speed);
    let temperatureElement = document.querySelector("#temp");
    let countryElement = document.querySelector("#country");
    let descriptionElement = document.querySelector("#description");
    let humidityElement = document.querySelector("#humidity");
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = `${windVale}km/H`;
    humidityElement.innerHTML = `${humidityValue}%`;
    temperatureElement.innerHTML = temperatureValue;
    countryElement.innerHTML = countryValue;
    descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = descriptionValue;

    //Date
    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.dt * 1000);
}
let apiKey = "a47fcb32fa31c2cf0799e4cfc995447f";
let city = "Paris"
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);