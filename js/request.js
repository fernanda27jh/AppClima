//Nombre del archivo: request.js
//Pegue la clave que le dieron de la pagina openweather
const key = 'ee101c46250207165296f697ccb5f932'

const requestCity = async (city) => {
    const baseURL = 'https://api.openweathermap.org/data/2.5/weather'
    const query = `?q=${city}&appid=${key}&lang=es`;

    //make fetch call (promise call)
    const response = await fetch(baseURL + query);

    //promise data
    const data = await response.json();
    console.log(data);
    return data;
}