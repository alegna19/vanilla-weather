function displayTemperature(response) {
    console.log(response.data);
    let countryValue = response.data.name
    let descriptionValue = response.data.weather[0].description
    let temperatureValue = Math.round(response.data.main.temp)
    let humidityValue = response.data.main.humidity
    let windVale = Math.round(response.data.wind.speed)
    let temperatureElement = document.querySelector("#temp")
    let countryElement = document.querySelector("#country")
    let descriptionElement = document.querySelector("#description")
    let humidityElement = document.querySelector("#humidity")
    let windElement = document.querySelector("#wind")
    windElement.innerHTML = `${windVale}km/H`
    humidityElement.innerHTML = `${humidityValue}%`;
    temperatureElement.innerHTML = temperatureValue;
    countryElement.innerHTML = countryValue;
    descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = descriptionValue;
}
let apiKey = "a47fcb32fa31c2cf0799e4cfc995447f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=London&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);