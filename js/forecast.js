const key = 'deed18a1508a47a8a57204638221207';
const userData = document.querySelector('.location-form');
const userLocation = document.querySelector('.user-location');
const userCity = document.querySelector('.user-city');
const userCondition = document.querySelector('.user-condition');
const userTemperature = document.querySelector('.user-temperature');
const firstTomorrow = document.querySelector('.first-tomorrow');
const firstTomorrowHigh = document.querySelector('.first-high');
const firstTomorrowLow = document.querySelector('.first-low');
const secondTomorrow = document.querySelector('.second-tomorrow');
const secondTomorrowHigh = document.querySelector('.second-high');
const secondTomorrowLow = document.querySelector('.second-low');

const geoLoc = navigator.geolocation.getCurrentPosition;
console.log(geoLoc);

const timeLord = new Date();
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

console.log();

todayNum = timeLord.getDay();
todayText = days[todayNum];
firstTomorrowText = days[todayNum+1];
secondTomorrowText = days[todayNum+2];

const getCity = async (loc) => {
    const baseUrl = 'https://api.weatherapi.com/v1/forecast.json';
    const query = `?key=${key}&q=${loc}&days=7&aqi=no&alerts=no`;

    const response = await fetch(baseUrl + query);
    const data = await response.json();
    return data;
};

userData.addEventListener('submit', e => {
    e.preventDefault();
    getCity(userLocation.value)
    .then( data => {
        updateWeather(data);
    })
    .catch( err => {
        console.log(err)
    });
    userLocation.blur();
});


const updateWeather = (data) => {
    userCity.textContent = data.location.name;
    userCondition.textContent = data.current.condition.text;
    userTemperature.innerHTML = `${Math.trunc(data.current.temp_f)}<span class="little-degree">&deg;</span>`;

    firstTomorrow.textContent = firstTomorrowText;
    firstTomorrowHigh.textContent = Math.trunc(data.forecast.forecastday[1].day.maxtemp_f);
    firstTomorrowLow.textContent = Math.trunc(data.forecast.forecastday[1].day.mintemp_f);

    secondTomorrow.textContent = secondTomorrowText;
    secondTomorrowHigh.textContent = Math.trunc(data.forecast.forecastday[2].day.maxtemp_f);
    secondTomorrowLow.textContent = Math.trunc(data.forecast.forecastday[2].day.mintemp_f);

    document.querySelector('.forecast-wrapper').classList.remove('hidden');

    console.log(data.forecast.forecastday[2].day.mintemp_f);

    console.log(data);
    console.log(data.forecast.forecastday[1].day.maxtemp_f);
};
