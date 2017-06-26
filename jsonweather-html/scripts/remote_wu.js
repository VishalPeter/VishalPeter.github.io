// Current Location Scripts
$(function () {

  var status = $('#status');

  (function getGeoLocation() {
    status.text('Getting Location...');
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var long = position.coords.longitude;

        // Call the getData function, send the lat and long
        getData(lat, long);

      });
    } else {
      status.text("Your browser doesn't support Geolocation or it is not enabled!");
    }

  })();

  // Get the data from the wunderground API
  function getData(lat, long){
    $.ajax({
        
        url : "https://api.wunderground.com/api/a48c6296eee52d74/geolookup/conditions/q/" + lat + "," + long + ".json",
  dataType : "jsonp",
  success : function(parsed_json) {
  var location = parsed_json['location']['city'];
  var temp_f = parsed_json['current_observation']['temp_f'];
      var state = parsed_json['location']['state'];
      var summary = parsed_json['current_observation']['weather'];
      var wind = parsed_json['current_observation']['wind_mph'];
      var precipitation = parsed_json['current_observation']['precip_today_in'];
      var visibility = parsed_json['current_observation']['visibility_mi'];
      var update = parsed_json['current_observation']['observation_time'];
  $("#cityDisplay").html(location +  ','  + state );
   $("#currentTemp").html(Math.round(temp_f)+ '&#176'); 
      $("#summary").html(summary);
      $("#add1").html("Wind MPH: " + ' ' + wind);
      $("#add2").html("Precipitation: " + ' ' + precipitation);
      $("#add3").html("Visibility: " + ' ' + visibility);
      $('#update').html(update);
      $("#cover").fadeOut(250);
    }
           });

  }

  // A function for changing a string to TitleCase
  function toTitleCase(str){
    return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
  }
});
