var APIKey = "7ca0e4b9bf54e2497438b921dee74e90";
var city, count = localStorage.getItem("count");
var arrHistory = [];

view_city();

$(".search-icon").click(function(event){

  if($(".search-wrapper").hasClass("active") && $(".search-input").val() != ""){
    document.getElementById("main").style.display = 'block';
    document.getElementById("citySearchContainer").style.display = 'none';
    city = $(".search-input").val();
    save();
    
    count += 1;
    localStorage.setItem("count", count);
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

    // Printing current temperature and icon
    $(".currentTemperature").text(Math.round(data.main.temp));
    $(".currentMinMax").text(Math.round(data.main.temp_min) + "/" + Math.round(data.main.temp_max));
    document.querySelector(".currIcon").src =
      "https://openweathermap.org/img/wn/" + data.weather[0].icon + ".png";


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
      if (Math.round(data.current.uvi) < 3){
      document.querySelector(".currentUVV").classList.add("low");
    } else if (2 < Math.round(data.current.uvi) && Math.round(data.current.uvi) < 6){
      document.querySelector(".currentUVV").classList.add("medium");
    } else {
      document.querySelector(".currentUVV").classList.add("high");
    };

    // Printing data to forecast day 1
    $(".1date").text(new Date((data.daily[1].dt) * 1000).toLocaleDateString('en-US', { weekday: "long" }) + ", " + new Date((data.daily[1].dt) * 1000).toLocaleDateString('en-US', { day: "numeric" }));
    $(".1temperature").text(Math.round(data.daily[1].temp.day));
    document.querySelector(".Oneicon").src =
      "https://openweathermap.org/img/wn/" + data.daily[1].weather[0].icon + ".png";
    $(".1windV").text(Math.round(data.daily[1].wind_speed) + "mph");
    $(".1humidityV").text(Math.round(data.daily[1].humidity) + "%");

    // Printing data to forecast day 2
    $(".2date").text(new Date((data.daily[2].dt) * 1000).toLocaleDateString('en-US', { weekday: "long" }) + ", " + new Date((data.daily[2].dt) * 1000).toLocaleDateString('en-US', { day: "numeric" }))
    $(".2temperature").text(Math.round(data.daily[2].temp.day));
    document.querySelector(".Twoicon").src =
      "https://openweathermap.org/img/wn/" + data.daily[2].weather[0].icon + ".png";
    $(".2windV").text(Math.round(data.daily[2].wind_speed) + "mph");
    $(".2humidityV").text(Math.round(data.daily[2].humidity) + "%");

    // Printing data to forecast day 3
    $(".3date").text(new Date((data.daily[3].dt) * 1000).toLocaleDateString('en-US', { weekday: "long" }) + ", " + new Date((data.daily[3].dt) * 1000).toLocaleDateString('en-US', { day: "numeric" }))
    $(".3temperature").text(Math.round(data.daily[3].temp.day));
    document.querySelector(".Threeicon").src =
      "https://openweathermap.org/img/wn/" + data.daily[3].weather[0].icon + ".png";
    $(".3windV").text(Math.round(data.daily[3].wind_speed) + "mph");
    $(".3humidityV").text(Math.round(data.daily[3].humidity) + "%");

    // Printing data to forecast day 4
    $(".4date").text(new Date((data.daily[4].dt) * 1000).toLocaleDateString('en-US', { weekday: "long" }) + ", " + new Date((data.daily[4].dt) * 1000).toLocaleDateString('en-US', { day: "numeric" }))
    $(".4temperature").text(Math.round(data.daily[4].temp.day));
    document.querySelector(".Fouricon").src =
      "https://openweathermap.org/img/wn/" + data.daily[4].weather[0].icon + ".png";
    $(".4windV").text(Math.round(data.daily[4].wind_speed) + "mph");
    $(".4humidityV").text(Math.round(data.daily[4].humidity) + "%");

    // Printing data to forecast day 5
    $(".5date").text(new Date((data.daily[5].dt) * 1000).toLocaleDateString('en-US', { weekday: "long" }) + ", " + new Date((data.daily[5].dt) * 1000).toLocaleDateString('en-US', { day: "numeric" }))
    $(".5temperature").text(Math.round(data.daily[5].temp.day));
    document.querySelector(".Fiveicon").src =
      "https://openweathermap.org/img/wn/" + data.daily[5].weather[0].icon + ".png";
    $(".5windV").text(Math.round(data.daily[5].wind_speed) + "mph");
    $(".5humidityV").text(Math.round(data.daily[5].humidity) + "%");

})
.catch(function(error) { 
    console.log('Requestfailed', error) 
  });

  event.preventDefault();
}
});





$(".search-icon, .close").click(function(event){
  if(!$(".search-wrapper").hasClass('active')){
    $(".search-wrapper").addClass('active');
    document.getElementById("history").style.visibility = "visible";
    event.preventDefault();
  }
  else if($(".search-wrapper").hasClass('active')){
    $(".search-wrapper").removeClass('active');
    document.getElementById("history").style.visibility = "hidden";
    
      // clear input
      $(".search-wrapper").find('.search-input').val('');
  }
});

function save() {
  if (localStorage.getItem('data') == null){
    console.log("sup")
    localStorage.setItem('data', '[]');
  }

  var old_data = JSON.parse(localStorage.getItem('data'));
  old_data.unshift(city);

  localStorage.setItem('data', JSON.stringify(old_data));
}

function view_city(){
  if(localStorage.getItem('data') != null){
    var ciudad = JSON.parse(localStorage.getItem("data"));
    for (let i = 0; i < ciudad.length; i++){
      if (i < 4){
        $(".srch").append("<p>" + ciudad[i] + "</p>").find("p").addClass("col");
      }
    }
  }
};