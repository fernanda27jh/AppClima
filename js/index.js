const searchForm = document.querySelector('.search-location');
const cityValue  = document.querySelector('.search-location input');
const cityName   = document.querySelector('.city-name p');
const cardBody   = document.querySelector('.card-body');

const spitOutCelsius = (kelvin) => {
    celsius = Math.round (kelvin - 273.15);
    return celsius;
}

const isDayTime = (icon) => {
    if (icon.includes('d'))
    {return true}
    else
    {return false}
}

//Agregar Evento que escuche al Formulario
 searchForm.addEventListener ('submit', e => {
    e.preventDefault();
    const citySearched = cityValue.value.trim();
    searchForm.reset();

    requestCity(citySearched)
    .then((data) => {
        updateWeatherApp(data)
    })
    .catch((error) => { console.log(error) });
    
})

updateWeatherApp = (city) => {
    const imageName = city.weather[0].icon;
    const iconSrc = `http://openweathermap.org/img/wn/${imageName}@2x.png`;
    cityName.textContent = city.name;
    cardBody.innerHTML = `
    <div class="card-body">
            <div class="lh-2 row">
                <div class="col-8 text-center temp">
                    <span>${spitOutCelsius(city.main.temp)}&deg;C</span>
            </div>
            <div class="col-4 condition-temp">
                <p class="condition">${city.weather[0].description }</p>
                <p class="maxima">${spitOutCelsius(city.main.temp_max)}&deg;C</p>
                <p class="minima">${spitOutCelsius(city.main.temp_min)}&deg;C</p>
            </div>
            <div class="icon-container card shadow -5 mx-auto">
                <img src="${iconSrc}"alt= "">
            </div>
            <div class="lh-1 px-5 py-4 small">
                <d1 class = "row">
                    <dt class="col-sm-7 text-end"> Sensacion T.</dt>
                    <dd class="col-sm 5">${spitOutCelsius(city.main.feels_like)}&deg;C.</dd>

                    <dt class="col-sm-7 text-end">Velocidad T.</dt>
                    <dd class="col-sm 5">${city.wind.speed} km/h</dd>

                    <dt class="col-sm-7 text-end"> Humedad T.</dt>
                    <dd class="col-sm 5">${city.main.humidity}%</dd>

                    <dt class="col-sm-7 text-end">Presión T.</dt>
                    <dd class="col-sm 5">${city.main.pressure} hPa</dd>

                    <dt class="col-sm-7 text-end"> Nivel del mar T.</dt>
                    <dd class="col-sm 5">${city.main.sea_level} m</dd>

                    <dt class="col-sm-7 text-end"> Visibilidad T.</dt>
                    <dd class="col-sm 5">${city.visibility} m</dd>
                </d1>
            </div>
            </div>
        </div>
    `;
    if (isDayTime(imageName)) {
        timeImage.setAttibrute('src', 'img/day_image.svg');
    } else {
        timeImage.setAttibrute('src', 'img/night_image.svg');
    }
}