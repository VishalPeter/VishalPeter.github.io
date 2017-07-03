$('#query').keyup(function(){
    // All code will be inside of this block
    var value = $('#query').val();
    var rExp = new RegExp(value, "i");

    $.getJSON("//autocomplete.wunderground.com/aq?query=" + value + "&cb=?", function (data) {
        console.log(data); // test for JSON received
        // Begin building output
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


$("#searchResults").on("click", "a", function (evt) {
    evt.preventDefault();
    // With the text value get the needed value from the weather.json file
    $("#searchResults").fadeOut(250);
    var jsonCity = $(this).text(); // Franklin, etc...
    console.log(jsonCity);
    $.ajax({
        url: "https://api.wunderground.com/api/a238b68c48f12a84/geolookup/q/" + jsonCity + ".json"
        , dataType: "json"
        , success: function (data) {
            console.log(data);
            console.log(data[jsonCity]);
            var zip = data.location.l;
           console.log(zip);
            getData(zip);
        }
    });
});


function getData(input) {
    // Get the data from the wunderground API
    $.ajax({
        url: "//api.wunderground.com/api/a238b68c48f12a84/geolookup/conditions/q/"
        + input + ".json"
        , dataType: "jsonp"
        , success: function (data) {
            var location = data.location.city + ', ' + data.location.state;
            var temp_f = data.current_observation.temp_f;
            var update = data.current_observation.observation_time;
            var wind = data.current_observation.wind_mph
            var precep = data.current_observation.precip_today_in
            var feel = data.current_observation.feelslike_f
            $("#cityDisplay").text(location);
            $("title").html(location + " | Weather Center");
            $("#currentTemp").html(Math.round(temp_f) + '°');
            $("#update").html(update);
            $('#add1').html("Wind MPH:" + ' ' + wind);
            $('#add2').html("The Percepitation today is " + precep);
            $('#add3').html('Today feels like:' + ' ' + Math.round(feel) + '&#176'); $("#summary").text(toTitleCase(data.current_observation.icon));
            $("#cover").fadeOut(250);

        }
    });
}

function toTitleCase(str){
    return str.replace(/\w+/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}