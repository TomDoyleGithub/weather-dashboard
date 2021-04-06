
// Gather coordinates
const coordsRequest = async (input) => {
    const coordsResponse = await fetch ("https://api.openweathermap.org/data/2.5/forecast?q=" + input + "&appid=89719a9ad250bef0b172b9a3a8360716")
    const json = await coordsResponse.json();
    var latitude = json.city.coord.lat;
    var longitude = json.city.coord.lat;
    weatherConditions(latitude, longitude);
}

// Gathers weather information
const weatherConditions = async (lat, lon) => {
    const weatherResponse =  await fetch ("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&units=imperial&appid=89719a9ad250bef0b172b9a3a8360716")
    const weatherJson = await weatherResponse.json();
    // console.log(weatherJson);
    forecastArray = [];
    tempArray = [];
    windArray = [];
    humidArray = [];
    uvIndex = weatherJson.current.uvi;
    forecastArray[0] = weatherJson.current.weather[0].id;
    forecastArray[1] =  weatherJson.daily[0].weather[0].id;
    forecastArray[2] =  weatherJson.daily[1].weather[0].id;
    forecastArray[3] =  weatherJson.daily[2].weather[0].id;
    forecastArray[4] =  weatherJson.daily[3].weather[0].id;
    forecastArray[5] =  weatherJson.daily[4].weather[0].id;
    tempArray[0] = weatherJson.current.temp;
    tempArray[1] = weatherJson.daily[0].temp.day;
    tempArray[2] = weatherJson.daily[1].temp.day;
    tempArray[3] = weatherJson.daily[2].temp.day;
    tempArray[4] = weatherJson.daily[3].temp.day;
    tempArray[5] = weatherJson.daily[4].temp.day;
    windArray[0] = weatherJson.current.wind_speed;
    windArray[1] = weatherJson.daily[0].wind_speed;
    windArray[2] = weatherJson.daily[1].wind_speed;
    windArray[3] = weatherJson.daily[2].wind_speed;
    windArray[4] = weatherJson.daily[3].wind_speed;
    windArray[5] = weatherJson.daily[4].wind_speed;
    humidArray[0] = weatherJson.current.humidity;
    humidArray[1] = weatherJson.daily[0].humidity;
    humidArray[2] = weatherJson.daily[1].humidity;
    humidArray[3] = weatherJson.daily[2].humidity;
    humidArray[4] = weatherJson.daily[3].humidity;
    humidArray[5] = weatherJson.daily[4].humidity;
    init(forecastArray, tempArray, windArray, humidArray, uvIndex);
}


coordsRequest("brisbane")

// Initiation of page is run after the fetch requests - put this AT THE END AFTER REQUESTS
function init (forecast, temperatues, winds, humidity, uvIndex) {
    console.log(forecast, temperatues, winds, humidity, uvIndex);
    // Sort this information into objects
}