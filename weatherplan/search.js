/*var returned;*/

$('#query').keyup(function() {
  var value = $('#query').val();
  var rExp = new RegExp(value, "i");
  $.getJSON("//autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function(data) {
    console.log(data); // test for JSON received
    // Begin building output
      /*returned = data;*/
    var output = '<ol>';
    $.each(data.RESULTS, function(key, val) {
      if (val.name.search(rExp) != -1) {
        output += '<li>';
        output += '<a href="//www.wunderground.com' + val.l + '" title="See results for ' + val.name + '">' + val.name + '</a>';
        output += '</li>';
      }
    }); // end each
    output += '</ol>';
    $("#searchResults").html(output); // send results to the page
  }); // end getJSON
}); // end onkeyup



// Intercept the menu link clicks
$("#searchResults").on("click", "a", function (evt) {
  evt.preventDefault();
  // With the text value get the needed value from the weather.json file
  var jsonCity = $(this).text(); // Franklin, etc...
  console.log(jsonCity);
    /*index = $(this).index("a");
    
    getData(returned.RESULTS[index].zmw)
    
    document.getElementById('searchResults').style.display='none';
*/
    
    
  $.ajax({
    url: "/menu-activity/scripts/weather.json"
    , dataType: "json"
    , success: function (data) {
      console.log(data);
      console.log(data[jsonCity]);
      var name = data[jsonCity].name;
      console.log(name);
      getData(name);
    }
  });
});


// Get weather data from wunderground.com
function getData(input) {
  // Get the data from the wunderground API
  $.ajax({
    url: "//api.wunderground.com/api/a48c6296eee52d74/geolookup/conditions/q/"
    + name + ".json"
    , dataType: "jsonp"
    , success: function (data) {
      console.log(data);
      var location = data.location.city + ', ' + data.location.state;
      var temp_f = data.current_observation.temp_f;
      console.log('Location is: ' + location);
      console.log('Temp is: ' + temp_f);
      $("#cityDisplay").text(location);
      $("title").html(location + " | Weather Center");
      $("#currentTemp").html(Math.round(temp_f) + '°');
      $("#summary").text(toTitleCase(data.current_observation.icon));
      $("#cover").fadeOut(250);
    }
  });
}