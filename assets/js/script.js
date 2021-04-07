// Code Below toggles search section
$("#search").on("click", function(){
    $(".search-section").css("display", "block");
})

$(".cross").on("click", function() {
    $(".search-section").css("display", "none");
})

// Gather coordinates
const coordsRequest = async (input) => {
    $(".city").text(input)
    const coordsResponse = await fetch ("https://api.openweathermap.org/data/2.5/forecast?q=" + input + "&appid=89719a9ad250bef0b172b9a3a8360716")
    if(coordsResponse.ok) {
        const json = await coordsResponse.json();
        var latitude = json.city.coord.lat;
        var longitude = json.city.coord.lat;
        weatherConditions(latitude, longitude);
    } else {
        $(".city").text("No Location");
        $(".date").text("Please search a valid location");
        $(".temp").text("");
        $(".icon").css("display", "none");
        $(".weather").text("");
        $(".humidity").text("");
        $(".wind").text("");
        $(".uv").text("");
    }
}

// Gathers weather information
const weatherConditions = async (lat, lon) => {
    const weatherResponse =  await fetch ("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&units=imperial&appid=89719a9ad250bef0b172b9a3a8360716")
    const weatherJson = await weatherResponse.json();
    console.log(weatherJson);
    weatherArray = [];
    tempArray = [];
    windArray = [];
    humidArray = [];
    uvIndex = weatherJson.current.uvi;
    weatherArray[0] = weatherJson.current.weather[0].main;
    weatherArray[1] =  weatherJson.daily[0].weather[0].main;
    weatherArray[2] =  weatherJson.daily[1].weather[0].main;
    weatherArray[3] =  weatherJson.daily[2].weather[0].main;
    weatherArray[4] =  weatherJson.daily[3].weather[0].main;
    weatherArray[5] =  weatherJson.daily[4].weather[0].main;
    tempArray[0] = weatherJson.current.temp;
    tempArray[1] = weatherJson.daily[0].temp.max;
    tempArray[2] = weatherJson.daily[1].temp.max;
    tempArray[3] = weatherJson.daily[2].temp.max;
    tempArray[4] = weatherJson.daily[3].temp.max;
    tempArray[5] = weatherJson.daily[4].temp.max;
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
    init(weatherArray, tempArray, windArray, humidArray, uvIndex);
}

// Runs the search when the search button is clicked
$(".search-button").on("click", function(event) {
    event.preventDefault();
    var inputLocation = $(".search-input").val()
    inputLocation = inputLocation.trim();
    if(inputLocation) {
        coordsRequest(inputLocation);
        $(".search-section").css("display", "none");
    }
})


// Initiation of page is run after the fetch requests - put this AT THE END AFTER REQUESTS
function init (weather, temperatues, winds, humidity, uvIndex) {
    console.log(weather, temperatues, winds, humidity, uvIndex);
    mainPageDisplay(weather, temperatues, winds, humidity, uvIndex);
}

// The functions that displays the main display in the HTML
function mainPageDisplay (weather, temperatues, winds, humidity, uvIndex) {
    $(".weather").text(weather[0])
    $(".icon").attr("src", "./assets/images/weather/"+ weather[0] + ".svg")
    $(".icon").css("display", "block");
    $(".temp").text(Math.round(temperatues[0]) + "°")
    $(".humidity").text(humidity[0] + "%");
    $(".wind").text(winds[0] + " mph")
    $(".uv").text(uvIndex);
}


// TIME DISPLAY
// DEFAULT SYDNEY DISPLAY

// 1. Finish page styling and HTML
// 2. Wrtie the code to append the data to the page just from JS input
// 4. Make storage section function