var pre = 'https://api.foursquare.com/v2/venues/';
var search = 'search';
var explore = 'explore';
var client = 'AFSAUC4CIGFJUGDH0WV14TVXJI2L5BXTAKY1F0XRGQXBJROU';
var secret = 'KICVGCKXSWCDA1QO1FU2SZEDYEHZ2G5UUSNDJCLGRCJP0M5B';
var ll;
var lg;
var version = '20130815';
var url;
var squery;
var venues;
var home;
var flag;
var allvenue = [];
var venuePage;
var query, flag;
var place, radius, price, distance;
var fcontactno, fverified, fcheckins, frating, fopens, fspecials, fprice, fdistance;
// var index = 0;
function initialize(){
	query = window.location.search;
  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setCurrentPosition, onError);
  } 
  else {
    element.text('Geolocation is not supported by this browser, please upgrade to a more recent version');
  }
}

function setCurrentPosition(data){
  ll = data.coords.latitude;
  lg = data.coords.longitude;
  setquery();
}

function setquery(){
  if(query.indexOf("cattt") != -1){
    ////////add substing code here
    query = query.split("=");
    var catId =  query[1];
    // console.log(catId);
   
    rating = false, checkins = false, contactno = false, verified = false, opens = false, specials = false, price = false, distance = false;
    url = "https://api.foursquare.com/v2/venues/search?categoryId="+catId+"&ll="+ll+","+lg+"&oauth_token=MBGZCG4NGOEOLHX452XJ5CUFOEUUSQU3CPF5L4ZZPRSPCTPD&v=20150215&radius=10000&intent=browse";
    $.getJSON(url,function(test){
      venues = test.response.venues;
      $('#venueList').empty();

      $.each(venues,function(i,venue){
        allvenue.push(venue);
        checkfilters(venue);

      });
      toggle();
      $("#status").fadeOut();
      $("#preloader").delay(350).fadeOut("slow");

    });    
  }
  else{
    if(query.indexOf("near") != -1){
      url = pre + explore + '?client_id=' + client + '&client_secret=' + secret + '&v=' + version + '&ll=' + ll + ',' + lg + '&section=food';
      rating = false, checkins = false, contactno = false, verified = false, opens = false, specials = false, price = false, distance = false;
    }
    else if(query.indexOf("back") != -1){

      url = localStorage.getItem("url");
      // console.log(url);
      distance = JSON.parse(localStorage.getItem("distance"));
      rating = JSON.parse(localStorage.getItem("rating"));
      checkins = JSON.parse(localStorage.getItem("checkins"));
      contactno = JSON.parse(localStorage.getItem("contactno"));
      verified = JSON.parse(localStorage.getItem("verified"));
      opens = JSON.parse(localStorage.getItem("opens"));
      specials = JSON.parse(localStorage.getItem("specials"));
      price = JSON.parse(localStorage.getItem("price"));

    }
       else if(query.indexOf("fromsearch") != -1){

      var a = localStorage.getItem("query");
      var b = localStorage.getItem("place");
      var geocoder = new google.maps.Geocoder();     
      geocoder.geocode( { 'address': b}, function(results, status) {
       if (status == google.maps.GeocoderStatus.OK) {
  //          console.log(results[0].geometry.location);
            ll = results[0].geometry.location.k;
            lg = results[0].geometry.location.D;
//            console.log(ll, lg);
        }
      });

      rating = false, checkins = false, contactno = false, verified = false, opens = false, specials = false, price = false, distance = false;
 
      url = pre + explore + '?client_id=' + client + '&client_secret=' + secret + '&v=' + version + '&ll=' + ll + ',' + lg + '&radius=5000' + '&query=' + a; 
      // console.log(url);
    
    }
    else{
      place = localStorage.getItem("place");
      radius = localStorage.getItem("radius");

      if (place == "Current location") {
        url = pre + explore + '?client_id=' + client + '&client_secret=' + secret + '&v=' + version + '&ll=' + ll + ',' + lg + '&radius=' + radius + '&section=food';
      }
      else{
        url = pre + explore + '?client_id=' + client + '&client_secret=' + secret + '&v=' + version + '&near=' + place + '&radius=' + radius + '&limit=50' + '&section=food';
      }
      distance = false;
      rating = JSON.parse(localStorage.getItem("rating"));
      checkins = JSON.parse(localStorage.getItem("checkins"));
      contactno = JSON.parse(localStorage.getItem("contactno"));
      verified = JSON.parse(localStorage.getItem("verified"));
      opens = JSON.parse(localStorage.getItem("opens"));
      specials = JSON.parse(localStorage.getItem("specials"));
      price = JSON.parse(localStorage.getItem("price"));


    }

    btnColor();

    $.getJSON(url,function(test){
      $('#venueList').empty();
      groups = test.response.groups;

      $.each(groups,function(i,value){
        items = value.items;
        $.each(items,function(j,item){
         venue = item.venue;
         allvenue.push(venue);
         checkfilters(venue);
       });
      });

      toggle();
      $("#status").fadeOut();
      $("#preloader").delay(350).fadeOut("slow");
    });
  }
}

function toggle(){

  document.getElementById("bt1").onclick = function test(){ 
    contactno = !contactno;
    btnColor();
    refresh();
  };

  document.getElementById("bt2").onclick = function test(){
   opens = !opens; 
   btnColor();
   refresh();
 };     
 document.getElementById("bt3").onclick = function test(){ 
   distance = !distance;
   btnColor();
   refresh();
 };
 document.getElementById("bt4").onclick = function test(){
   rating = !rating; 
   btnColor();
   refresh();
 };

}

function refresh(){
   
    $('#venueList').empty();
    for(var i = 0; i < allvenue.length; i++){
      checkfilters(allvenue[i]);          
    }

  }

  function checkfilters(venue){
   fcontactno = fverified = fcheckins = frating = fopens = fspecials = fprice = fdistance =false;

   if(rating){
    if (venue.rating != undefined) {
      if(venue.rating < 8.8)
        frating = true;
    };

  }

  if (checkins) {
    if(venue.stats.checkinsCount != undefined){
     if (venue.stats.checkinsCount < 1000)
      fcheckins = true;
  };
}

if(contactno){
  if(jQuery.isEmptyObject(venue.contact))
    fcontactno = true;
}

if(distance){
  if(venue.location.distance != undefined){
    if(venue.location.distance > 3000)
      fdistance = true;
  };
}

if(price){
  if(venue.price != undefined){
    if(venue.price.tier != undefined){
//check price conditions
if(price == "3"){
 if(venue.price.tier != 3)
   fprice = true;
}
else if(price == "2"){
  if(venue.price.tier != 2)
    fprice = true;
}
else if(price == "1"){
  if (venue.price.tier != 1) 
    fprice = true;
}
}

}

}

if(verified){
  if(venue.verified != undefined){

    if(venue.verified == false)
      fverified = true;
  }
}

if(opens){
  if(venue.hours != undefined){
    if(venue.hours.isOpen == false)
      fopens = true;
  }
}

if(specials){
  if(venue.specials.count != undefined){
    if(venue.specials.count == 0)
      fspecials = true;
  }

}

if (!frating && !fcheckins && !fcontactno  && !fverified && !fopens && !fspecials && !fprice && !fdistance){
  $('#venueList').append(generateVenueLink(venue));
  // console.log("printed from filter");
}

}


function generateVenueLink(venue){
 var lirating;
 var licat , lidistance , liprice , lipeoplecount ;
 // console.log("images/foodie/f"+i+"new.jpg")
 var liimagestuff = '<div class="overlay overlay-pattern"></div><img class="responsive-image" src="images/listbg.jpg" alt="img"></div>';
 var liname = '<h1 class="left-text">'+ venue.name + '</h1>';
 if(venue.categories[0].name != undefined){
  licat = '<em class="speach-left blue-bubble">'+venue.categories[0].name+'</em>'
}
else{
  licat = "";
}
if(venue.rating != undefined){

  lirating = '<em class="speach-left green-bubble">'+venue.rating+'</em>';
}
else
{
  lirating = ''; 
}
if(venue.location.distance != undefined){
  lidistance = '<em class="speach-left green-bubble">'+venue.location.distance+' m far</em>'
}
else{
  lidistance = "";
}
if(venue.price != undefined){
  liprice = '<em class="speach-left ">'+venue.price.message+'</em>'
}
else {
  liprice = "";
}
if(venue.stats.usersCount != undefined){
  lipeoplecount = '<em class="speach-left blue-bubble">'+venue.stats.usersCount+' people been here</em>'
}
else {
  lipeoplecount = "";
}

// console.log(index);
return '<li style="background-color:#F8F8F8"><a href = "javascript:void(0)'
+ '"onclick="goToVenueDetailPage(\''
  + venue.id
  + '\')">'
+ '<p class="column-responsive half-bottom"><div class="content-section">'
+liname
+lirating
+liimagestuff

+licat
+lidistance
+liprice
+lipeoplecount

+ '</p></a></li>'
;

}

function goToVenueDetailPage(venueID){
				
				localStorage.setItem("url", url);
				localStorage.setItem("contactno", contactno);
				localStorage.setItem("verified", verified);
				localStorage.setItem("rating", rating);
				localStorage.setItem("opens", opens);
				localStorage.setItem("specials", specials);
				localStorage.setItem("price", price);
				localStorage.setItem("checkins", checkins);	
				localStorage.setItem("distance", distance);				

        window.location.href = "venuedetails.html?" + venueID;

}

function onError(error) {
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

function btnColor(){

  if(contactno ){
    document.getElementById("bt1").className = "button button-blue";
  }
  else{
    document.getElementById("bt1").className = "button button-dark"; 
  }

  if(opens){
    document.getElementById("bt2").className = "button button-blue";
  }
  else{
    document.getElementById("bt2").className = "button button-dark"; 
  }
  if(distance){
    document.getElementById("bt3").className = "button button-blue";

  }
  else{
    document.getElementById("bt3").className = "button button-dark"; 
  }
  if(rating){
    document.getElementById("bt4").className = "button button-blue";
  }
  else{
    document.getElementById("bt4").className = "button button-dark"; 
  }




}