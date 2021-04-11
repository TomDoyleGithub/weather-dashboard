// Code Below toggles search section
$("#search").on("click", function(){
    $(".search-section").css("display", "block");
})

$("#hamburger").on("click", function(){
    $(".save-section").css("display", "block");
})

$(".cross").on("click", function() {
    $(".search-section").css("display", "none");
    $(".save-section").css("display", "none");
})



// Gather coordinates
const coordsRequest = async (input) => {
    $(".city").text(input)
    const coordsResponse = await fetch ("https://api.openweathermap.org/data/2.5/forecast?q=" + input + "&appid=89719a9ad250bef0b172b9a3a8360716")
    if(coordsResponse.ok) {
        const json = await coordsResponse.json();
        var latitude = json.city.coord.lat;
        var longitude = json.city.coord.lon;
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
        $(".carousel-container").css("display", "none");
    }
}

// Gathers weather information
const weatherConditions = async (lat, lon) => {
    const weatherResponse =  await fetch ("https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=metric&units=imperial&appid=89719a9ad250bef0b172b9a3a8360716")
    const weatherJson = await weatherResponse.json();
    // console.log(weatherJson);
    weatherArray = [];
    tempArray = [];
    windArray = [];
    humidArray = [];
    uvIndex = weatherJson.current.uvi;
    var offset = weatherJson.timezone_offset;
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
    init(weatherArray, tempArray, windArray, humidArray, uvIndex, offset);
}

coordsRequest("Sydney");
// Runs the search when the search button is clicked
$(".search-button").on("click", function(event) {
    event.preventDefault();
    var inputLocation = $(".search-input").val()
    inputLocation = inputLocation.trim();
    if(inputLocation) {
        coordsRequest(inputLocation);
        historyAdd(inputLocation);
        $(".search-section").css("display", "none");
    }
})

var hisArr = [];
var locArr = [];

function historyAdd(input) {
    hisArr.push(input);
    localStorage.setItem("places", hisArr);
    $(".location-list").text("")
};

// Initiation of page is run after the fetch requests - put this AT THE END AFTER REQUESTS
function init (weather, temperatues, winds, humidity, uvIndex, offset) {
    $(".carousel-container").css("display", "block");
    var locPlaces = localStorage.getItem("places");
    locArr = locPlaces.split(",");
    locArr.forEach(function(location) {
        $(".location-list").append("<section class='loca'>" + location + "</section>");
    });
    // console.log(weather, temperatues, winds, humidity, uvIndex);
    timeDisplay(offset);
    mainPageDisplay(weather, temperatues, winds, humidity, uvIndex);
    dayOneDisplay(weather, temperatues, winds, humidity);
    dayTwoDisplay(weather, temperatues, winds, humidity);
    dayThreeDisplay(weather, temperatues, winds, humidity);
    dayFourDisplay(weather, temperatues, winds, humidity);
    dayFiveDisplay(weather, temperatues, winds, humidity);
}


function timeDisplay (offset) {
    d = new Date()
    localTime = d.getTime()
    localOffset = d.getTimezoneOffset() * 60000
    utc = localTime + localOffset
    var time = utc + (1000 * offset)
    nd = new Date(time) + '';
    splitDate = nd.split(" ");
    finalDate = splitDate.slice(0, 4);
    stringDate = finalDate.join(" ")
    $(".date").text(stringDate)
   
    var firstDay = moment(stringDate).add(1, 'd')._d;
    firstDayDate = moment(firstDay).format("dddd");
    var secondDay = moment(stringDate).add(2, 'd')._d;
    secondDayDate = moment(secondDay).format("dddd");
    var thirdDay = moment(stringDate).add(3, 'd')._d;
    thirdDayDate = moment(thirdDay).format("dddd");
    var fourthDay = moment(stringDate).add(4, 'd')._d;
    fourthDayDate = moment(fourthDay).format("dddd");
    var fifthDay = moment(stringDate).add(5, 'd')._d;
    fifthDayDate = moment(fifthDay).format("dddd");
    $(".header-one").text(firstDayDate);
    $(".header-two").text(secondDayDate);
    $(".header-three").text(thirdDayDate);
    $(".header-four").text(fourthDayDate);
    $(".header-five").text(fifthDayDate);
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
    if (uvIndex >= 0 && uvIndex < 3) {
        $(".uv").css("color", "green");
    } else if (uvIndex >= 3 && uvIndex < 6) {
        $(".uv").css("color", "orange");
    } else {
        $(".uv").css("color", "red");
    }
}

function dayOneDisplay (weather, temperatues, winds, humidity) {
    $(".day-one-icon").attr("src", "./assets/images/weather/"+ weather[1] + ".svg") 
    $(".temp-one").text(Math.round(temperatues[1]) + "°")
    $(".humid-one").text(humidity[1] + "%");
    $(".wind-one").text(winds[1])
}

function dayTwoDisplay (weather, temperatues, winds, humidity) {
    $(".day-two-icon").attr("src", "./assets/images/weather/"+ weather[2] + ".svg") 
    $(".temp-two").text(Math.round(temperatues[2]) + "°")
    $(".humid-two").text(humidity[2] + "%");
    $(".wind-two").text(winds[2])
}

function dayThreeDisplay (weather, temperatues, winds, humidity) {
    $(".day-three-icon").attr("src", "./assets/images/weather/"+ weather[3] + ".svg") 
    $(".temp-three").text(Math.round(temperatues[3]) + "°")
    $(".humid-three").text(humidity[3] + "%");
    $(".wind-three").text(winds[3])
}

function dayFourDisplay (weather, temperatues, winds, humidity) {
    $(".day-four-icon").attr("src", "./assets/images/weather/"+ weather[4] + ".svg")
    $(".temp-four").text(Math.round(temperatues[4]) + "°")
    $(".humid-four").text(humidity[4] + "%");
    $(".wind-four").text(winds[4])
}

function dayFiveDisplay (weather, temperatues, winds, humidity) {
    $(".day-five-icon").attr("src", "./assets/images/weather/"+ weather[5] + ".svg") 
    $(".temp-five").text(Math.round(temperatues[5]) + "°")
    $(".humid-five").text(humidity[5] + "%");
    $(".wind-five").text(winds[5])
}


// STORAGE FUNCTIONING AND PAGE
// ADD COMMENTS
// DO README
