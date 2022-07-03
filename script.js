var APIKey = "7ca0e4b9bf54e2497438b921dee74e90";
var city = "Miami";
var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey + "&units=imperial";
fetch(queryURL)
.then(function (response) {
    return response.json();
  })
.then(function (data) {
    console.log(data);
  });