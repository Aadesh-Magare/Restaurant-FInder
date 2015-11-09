var pre = 'https://api.foursquare.com/v2/venues/';
var search = 'search';
var explore = 'explore';
var client = 'AFSAUC4CIGFJUGDH0WV14TVXJI2L5BXTAKY1F0XRGQXBJROU';
var secret = 'KICVGCKXSWCDA1QO1FU2SZEDYEHZ2G5UUSNDJCLGRCJP0M5B';
var ll;
var lg;
var version = '20130815';
var url;

var venues, current;
var locations = [];

function initialize(){
     //home = new google.maps.LatLng(18.9750,72.8258);
        //asign the coordinates of hotels here to home.
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(setCurrentPosition, onError);
    } else {
        element.text('Geolocation is not supported by this browser, please upgrade to a more recent version');
    }
}
function setCurrentPosition(data){
        		current = new google.maps.LatLng(data.coords.latitude, data.coords.longitude);
				ll = data.coords.latitude;
				lg = data.coords.longitude;

        		url = pre + explore + '?client_id=' + client + '&client_secret=' + secret + '&v=' + version + '&ll=' + ll + ',' + lg + '&section=food';

				$.getJSON(url,function(test){
					groups = test.response.groups;
			        $.each(groups,function(i,value){
						items = value.items;
						$.each(items,function(j,item){

			           	venue = item.venue;
						locations.push([venue.name, venue.id, venue.location.lat, venue.location.lng]);
						});
					});      	
					//		console.log(locations[0][2]);
					showpoints();
					//get back to it please
					//$('#venueList').listview('refresh');
				});
}

function onError(UNKNOWN_ERRORor){
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

function showpoints(){
    
    var options = {
        center: current,
       // mapTypeId: google.maps.MapTypeId.HYBRID,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        zoom: 14,
    };
//						console.log(locations);


    var map = new google.maps.Map(document.getElementById("googleMap"), options);

	var markers = new google.maps.Marker({
		      position: current,
		      map: map,
		      animation: google.maps.Animation.DROP,
		      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
		      title: 'Source'
			});
	var geocoder = new google.maps.Geocoder();
	google.maps.event.addListener(markers, 'click', function() {
    	    	    geocoder.geocode({'latLng': current}, function(results, status) {
    	    	    	 if (status == google.maps.GeocoderStatus.OK) {
    	    	      	 if (results[1]) {
    	    	      	 		infowindow.setContent("<strong> Current Location : </strong><p></p>" + results[1].formatted_address);
//					            stepDisplay.setContent(results[1].formatted_address);
 							    //stepDisplay.setContent("<strong>Destination</strong><p>This is the destination</p>");
 						}
    // Open an info window when the marker is clicked on,
    // containing the text of the step.
 //   stepDisplay.setContent("<strong>Current Location</strong><p>You are here Now</p>");
				   		 infowindow.open(map, markers);
				   		}
				   	});
    });



//			var bounds = new google.maps.LatLngBounds();
			var infowindow = new google.maps.InfoWindow();
						//console.log(locations[0][2]);
	//		    console.log(locations[0][2], locations[0][3]);
			for (var i = 0; i < locations.length; i++) {  
				var temp = new google.maps.LatLng(locations[i][2], locations[i][3]);
				
			 	var marker = new google.maps.Marker({
			    	position: temp,
			    	map: map
			    });

//				bounds.extend(marker.position);

		  		// google.maps.event.addListener(marker[i], 'click', function(){
		    //  		 infowindow.setContent("<strong> Hotel</strong>");
		    //  		 infowindow.open(map, marker[i]);
		   	// 		});
		  		// };

		  		google.maps.event.addListener(marker, 'click', (function(marker, i) {
		    		return function() {
					
		    		var link ="<strong>" + locations[i][0] + "</strong><p></p>" + "<a href = " + "venuedetails.html?" + locations[i][1] + ">See Details </a>";


//		     		 infowindow.setContent('<strong>' +locations[i][0]+ '</strong> <a href = one-column.html?'+ locations[i][1] + '> GotoPage</a>');
					infowindow.setContent(link);
		     		 infowindow.open(map, marker);
		   			 }
		  		})(marker, i));
			//now fit the map to the newly inclusive bounds
//			map.fitBounds(bounds);
		};
}