// Fetch catches the coords
function getCoords (input) {
    fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + input + '&appid=89719a9ad250bef0b172b9a3a8360716')
    .then(function(response) {
        return response.json();
    })
    .then(function (data) {
        // Push the data below to the object/array
        var lat = data.city.coord.lat
        var long = data.city.coord.lon
        console.log(lat, long)
    })
    
}

// Write function that collects city input from page and validates it - make sure it auto selects and runs no errors


// Passes the selected city into the function
getCoords("sydney");


// Make an object/array that stores the coords

// A FETCH FUNCTION THAT GATHERS THE REQUIRED WEATHER INFORMATION

