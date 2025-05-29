const errorDiv = document.getElementById('error');
const input = document.getElementById('input');
const searchBtn = document.getElementById('search-btn');

// Elements to update
const locationTxt = document.getElementById('location');
const dateTxt = document.getElementById('date');
const tempTxt = document.getElementById('temp');
const conditionTxt = document.getElementById('condition');
const humidValue = document.getElementById('humid-value');
const windValue = document.getElementById('wind-value');
const weatherIcon = document.querySelector('.weather-icon img');
const forecastDiv = document.querySelector('.forecast');

const apiKey = 'b980786ee253af30e072c9ef6ef3014f';

searchBtn.addEventListener('click', () => {
    const city = input.value.trim();
    if (city) {
        getWeather(city);
        input.value = '';
    }
});

function getWeather(city) {
    errorDiv.textContent = '';
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => {
            if (data.cod !== 200) {
                errorDiv.textContent = data.message;
                return;
            }
            updateCurrentWeather(data);
            getForecast(city);
        })
        .catch(() => {
            errorDiv.textContent = 'Error fetching weather data.';
        });
}

function updateCurrentWeather(data) {
    locationTxt.textContent = data.name;
    const now = new Date();
    dateTxt.textContent = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    tempTxt.textContent = `${Math.round(data.main.temp)}°C`;
    conditionTxt.textContent = data.weather[0].main;
    humidValue.textContent = `${data.main.humidity}%`;
    windValue.textContent = `${data.wind.speed}m/s`;
    // Use OpenWeatherMap icon
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;
    weatherIcon.alt = data.weather[0].description;
}

function getForecast(city) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`)
        .then(res => res.json())
        .then(data => {
            if (data.cod !== "200") {
                errorDiv.textContent = data.message;
                return;
            }
            updateForecast(data);
        })
        .catch(() => {
            errorDiv.textContent = 'Error fetching forecast data.';
        });
}

function updateForecast(data) {
    // Show 4 forecast items, one per day (skip today)
    const forecasts = [];
    const today = new Date().getDate();
    for (let item of data.list) {
        const date = new Date(item.dt_txt);
        if (date.getDate() !== today && date.getHours() === 12) {
            forecasts.push(item);
            if (forecasts.length === 4) break;
        }
    }
    forecastDiv.innerHTML = '';
    forecasts.forEach(forecast => {
        const date = new Date(forecast.dt_txt);
        const dayMonth = `${date.getDate()}/${date.getMonth() + 1}`;
        const temp = `${Math.round(forecast.main.temp)}°C`;
        const icon = `https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`;
        forecastDiv.innerHTML += `
            <div class="forecast-item">
                <h5 class="forecast-date">${dayMonth}</h5>
                <img src="${icon}" class="forecast-item-img" alt="${forecast.weather[0].description}">
                <h5 class="forecast-temp">${temp}</h5>
            </div>
            `;
    });
}

