
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
    const weatherResponse =  await fetch ("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=89719a9ad250bef0b172b9a3a8360716")
    const weatherJson = await weatherResponse.json();
    console.log(weatherJson);
    init();
}


coordsRequest("sydney")

// Initiation of page is run after the fetch requests - put this AT THE END AFTER REQUESTS
function init () {
    console.log("Code starting...")
}