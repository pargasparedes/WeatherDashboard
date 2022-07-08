var APIKey = "7ca0e4b9bf54e2497438b921dee74e90";
var city;


$("#submit").click(function(event){
    city = $("#fname").val();
    console.log(city);
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";

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
    $(".currentDate").text(new Date((data.dt) * 1000).toLocaleDateString('en-US', { weekday: "long" }) + ", " + new Date((data.dt) * 1000).toLocaleDateString('en-US', { day: "numeric" }));
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

    // Printing data to forecast day 1
    $(".1date").text(new Date((data.daily[1].dt) * 1000).toLocaleDateString('en-US', { weekday: "long" }) + ", " + new Date((data.daily[1].dt) * 1000).toLocaleDateString('en-US', { day: "numeric" }));
    $(".1temperature").text(Math.round(data.daily[1].temp.day));
    $(".1windV").text(Math.round(data.daily[1].wind_speed) + "mph");
    $(".1humidityV").text(Math.round(data.daily[1].humidity) + "%");

    // Printing data to forecast day 2
    $(".2date").text(new Date((data.daily[2].dt) * 1000).toLocaleDateString('en-US', { weekday: "long" }) + ", " + new Date((data.daily[2].dt) * 1000).toLocaleDateString('en-US', { day: "numeric" }))
    $(".2temperature").text(Math.round(data.daily[2].temp.day));
    $(".2windV").text(Math.round(data.daily[2].wind_speed) + "mph");
    $(".2humidityV").text(Math.round(data.daily[2].humidity) + "%");

    // Printing data to forecast day 3
    $(".3date").text(new Date((data.daily[3].dt) * 1000).toLocaleDateString('en-US', { weekday: "long" }) + ", " + new Date((data.daily[3].dt) * 1000).toLocaleDateString('en-US', { day: "numeric" }))
    $(".3temperature").text(Math.round(data.daily[3].temp.day));
    $(".3windV").text(Math.round(data.daily[3].wind_speed) + "mph");
    $(".3humidityV").text(Math.round(data.daily[3].humidity) + "%");

    // Printing data to forecast day 4
    $(".4date").text(new Date((data.daily[4].dt) * 1000).toLocaleDateString('en-US', { weekday: "long" }) + ", " + new Date((data.daily[4].dt) * 1000).toLocaleDateString('en-US', { day: "numeric" }))
    $(".4temperature").text(Math.round(data.daily[4].temp.day));
    $(".4windV").text(Math.round(data.daily[4].wind_speed) + "mph");
    $(".4humidityV").text(Math.round(data.daily[4].humidity) + "%");

    // Printing data to forecast day 5
    $(".5date").text(new Date((data.daily[5].dt) * 1000).toLocaleDateString('en-US', { weekday: "long" }) + ", " + new Date((data.daily[5].dt) * 1000).toLocaleDateString('en-US', { day: "numeric" }))
    $(".5temperature").text(Math.round(data.daily[5].temp.day));
    $(".5windV").text(Math.round(data.daily[5].wind_speed) + "mph");
    $(".5humidityV").text(Math.round(data.daily[5].humidity) + "%");

})
.catch(function(error) { 
    console.log('Requestfailed', error) 
  });

  event.preventDefault();
});