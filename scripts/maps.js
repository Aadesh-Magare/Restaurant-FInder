var home, current, map, ll, lg, latt, lang, geocoder;



var query = window.location.search;
if (query.substring(0, 1) == '?'){
    query = query.split("?");
    var name = query[1].replace(/[^A-Za-z]/g, "");
    var lll = query[2].split(",")
    latt = lll[0];
    lang = lll[1];
//    console.log(name, latt, lang);
}

 function displayCurrentPosition(data) {
    var current = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
    var options = {
        center: current,
       // mapTypeId: google.maps.MapTypeId.HYBRID,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 10,
    };
    var map = new google.maps.Map(document.getElementById("googleMap"), options);
    stepDisplay = new google.maps.InfoWindow();
    var markerd = new google.maps.Marker({
    	position: home,
    	map: map,
        animation: google.maps.Animation.DROP,
		title: 'Destination'
    });
    var markers = new google.maps.Marker({
      position: current,
      map: map,
      animation: google.maps.Animation.DROP,
      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
      title: 'Source'
    });

    google.maps.event.addListener(markerd, 'click', function() {

    	    geocoder.geocode({'latLng': home}, function(results, status) {
    	    	    if (status == google.maps.GeocoderStatus.OK) {
    	    	      	 if (results[1]) {
					            stepDisplay.setContent("<strong>" + name + "</strong><p></p>" + results[1].formatted_address);
 							    //stepDisplay.setContent("<strong>Destination</strong><p>This is the destination</p>");
 						}
    // Open an info window when the marker is clicked on,
    // containing the text of the step.
//    stepDisplay.setContent("<strong>Destination</strong><p>This is the destination</p>");
    					stepDisplay.open(map, markerd);
    				}
    		});
    });

    google.maps.event.addListener(markers, 'click', function() {
    	    	    geocoder.geocode({'latLng': current}, function(results, status) {
    	    	    	 if (status == google.maps.GeocoderStatus.OK) {
    	    	      	 if (results[1]) {
    	    	      	 		stepDisplay.setContent("<strong> Current Location : </strong><p></p>" + results[1].formatted_address);
//					            stepDisplay.setContent(results[1].formatted_address);
 							    //stepDisplay.setContent("<strong>Destination</strong><p>This is the destination</p>");
 						}
    // Open an info window when the marker is clicked on,
    // containing the text of the step.
 //   stepDisplay.setContent("<strong>Current Location</strong><p>You are here Now</p>");
				   		 stepDisplay.open(map, markers);
				   		}
				   	});
    });

    var directions = {
        origin: current,
        destination: home,
        travelMode: google.maps.DirectionsTravelMode.DRIVING
    };
    
    display = new google.maps.DirectionsRenderer({ map: map, suppressMarkers: true });
    //////////////////////this is for navigation.
    display.setPanel(document.getElementById("directionsPanel"));

    service = new google.maps.DirectionsService();
    service.route(directions, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            display.setDirections(response);
  
        }
        else
            alert ('failed to get directions');
    });
}

function onError(UNKNOWN_ERRORor) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            element.text('Access to location API denied by user');
            break;
        case error.POSITION_UNAVAILABLE:
            element.text('Unable to determine location');
            break;
        case error.TIMEOUT:
            element.text('Unable to determine location, the request timed out');
            break;
        case error.UNKNOWN_ERROR:
            element.text('An unknown error occurred!');
            break;
    }
}

function initialize(){
//    console.log(query);
	geocoder = new google.maps.Geocoder();
    document.getElementById("bt1").onclick = function test(){ window.location = "http://maps.google.com/maps?daddr=" + latt + "," + lang};
    home = new google.maps.LatLng(latt, lang);
        //asign the coordinates of hotels here to home.
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(displayCurrentPosition, onError);
    } else {
        element.text('Geolocation is not supported by this browser, please upgrade to a more recent version');
    }
}
