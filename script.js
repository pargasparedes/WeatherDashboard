var APIKey = "7ca0e4b9bf54e2497438b921dee74e90";
var city;


$("#submit").click(function(event){
    city = $("#fname").val();
    console.log(city);
    var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";

fetch(queryURL)
.then(function (response) {
    return response.json();
  })
.then(function(data) {

    console.log(data)

    let long = data.coord.lon;
    let lati = data.coord.lat;

    console.log(long);
    console.log(lati);

    // Printing data to current climate
    $(".cityName").text(data.name);
    $(".currentHumidityV").text(Math.round(data.main.humidity) + "%");
    $(".currentWindV").text(Math.round(data.wind.speed) + "mph");

    // Printing current temperature
    $(".currentTemperature").text(Math.round(data.main.temp));
    $(".currentMinMax").text(Math.round(data.main.temp_min) + "/" + Math.round(data.main.temp_max));


    var otherURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lati + "&lon=" + long + "&appid=" + APIKey + "&units=imperial";

    return fetch(otherURL);
  })
.then(function (response) {
    return response.json();
  })
.then(function(data) {
    console.log(data);

    // Printing data to current climate
    $(".currentUVV").text(Math.round(data.current.uvi))
})
.catch(function(error) { 
    console.log('Requestfailed', error) 
  });

  event.preventDefault();
});