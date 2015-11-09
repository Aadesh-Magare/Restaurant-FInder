//SO YOU HAVE TO GENERATE THE URL LINK HERE 
// SO BREAK IT FIRST AND THEN GETTING THE ID FROM PREVIOUS PAGE 
// MAKE IT AGAIN
var latt, lang;
var query = window.location.search;
if (query.substring(0, 1) == '?') {
	query = query.substring(1);
}

var fixedPart = 'https://api.foursquare.com/v2/venues/';
var gotVenueID = query;
var auth = '?oauth_token=MBGZCG4NGOEOLHX452XJ5CUFOEUUSQU3CPF5L4ZZPRSPCTPD&v=20150211';
var url = fixedPart + query + auth;
//var url = 'https://api.foursquare.com/v2/venues/4b9b583cf964a520aa0136e3?oauth_token=MBGZCG4NGOEOLHX452XJ5CUFOEUUSQU3CPF5L4ZZPRSPCTPD&v=20150211';
var venue , restaurantName,contact,address,checkins,usersCount,priceMessage,likesCount, link;
var rating = "";
var categories = [];
var tags = [];
var maxlenght =  4 ;

function sendmail(){

		var addresses = "";//between the speech mark goes the receptient. Seperate addresses with a ;
		var body = "Hello, I have just checked out this restaurant " + restaurantName + ". It is really nice you must try it once.";//write the message text between the speech marks or put a variable in the place of the speech marks
		var subject = "Try out this awesome restaurant :" + restaurantName; //between the speech marks goes the subject of the message
		var href = "mailto:" + addresses + "?"
		+ "subject=" + subject + "&"
		+ "body=" + body;
		var wndMail;
		wndMail = window.open(href, "_blank", "scrollbars=yes,resizable=yes,width=10,height=10");
		if(wndMail)
		{
			wndMail.close();    
		}
	}

	$.getJSON(url,function(test){
		venue = test.response.venue;
		likesCount = venue.likes.count;
	// console.log(venue.tips.count);
	// console.log(venue.tips.groups[3].name);
	// console.log(venue.tips.groups[3].items.length);
	
	// if(venue.tips.groups[3].items != undefined){
	// 	var currLength = venue.tips.groups[3].items.length;
	// }
	// console.log("curr is "+currLength);
	// if( currLength < maxlenght){
	// 	maxlenght = currLength;
	// }else{
	// 	maxlenght = 4;
	// }
	// console.log(venue.tips.groups[3].items[0].user.firstName);
	// console.log("max is "+maxlenght);
	// for(i = 0 ; i < maxlenght ; i++){
	// 		console.log(venue.tips.groups[3].items[i].text);
	// 		console.log(venue.tips.groups[3].items[i].user.firstName);
	// 		console.log(venue.tips.groups[3].items[i].user.lastName);
	// }
	// console.log(venue.id);
	// console.log(venue.name);
	restaurantName = venue.name;
	// console.log(restaurantName);
	contact =  venue.contact.phone;
	//console.log(venue.location.formattedAddress);
	latt = venue.location.lat;
	lang = venue.location.lng;

	link = "https://www.facebook.com/sharer/sharer.php?u=" + venue.canonicalUrl;
	linktw = "https://twitter.com/share?url=" + venue.canonicalUrl;
	address = "";
	if(venue.location.formattedAddress != undefined){
		for(i = 0 ; i < venue.location.formattedAddress.length; i++){
			address += venue.location.formattedAddress[i] + ','
		}
	}
	// console.log(address);

	for(i = 0 ; i < venue.categories.length	;i++){
		categories[i] = 	venue.categories[i].name ;
	}
	checkins = venue.stats.checkinsCount;
	usersCount = venue.stats.usersCount;
	// priceMessage = venue.price.message;
	likesCount =venue.likes.count;
	rating += venue.rating;
	// console.log(rating);
 	//menu ahe thithe..
 	//JUST GIVE A LINK TO IT
 	//include just tips they are awesome reviews
 	for(i = 0 ; i < venue.tags.length; i++){
 		tags[i] = venue.tags[i];
 	}
 	// console.log(venue.photos.groups[0].count);
 	// console.log(venue.photos.groups[0].items[0].prefix);
 	// console.log(venue.photos.groups[0].items[0].suffix);
 	// console.log(venue.photos.groups[0].items[0].width);	
 	// console.log(venue.photos.groups[0].items[0].height);
 	// console.log(venue.hours.status);
 	nowChangeStuff();
 });

function nowChangeStuff(){
	$("#status").fadeOut();
	$("#preloader").delay(350).fadeOut("slow");	
//	console.log(address);
	if(venue.canonicalUrl != undefined){
	document.getElementById("canonical").href = venue.canonicalUrl;
	}

if(likesCount != undefined){
	document.getElementById("tagLine").innerHTML = likesCount + " people like " + restaurantName;
}
if(restaurantName!= undefined){
	document.getElementById("restaurantName").innerHTML = restaurantName;
}else{
	document.getElementById("restaurantName").innerHTML = "Something went Wrong";
}
if (rating!= null) {
	document.getElementById("ratingID").innerHTML = rating+"/10";

}else{
	document.getElementById("ratingID").innerHTML = "N.A";

}
if (usersCount != undefined) {
	document.getElementById("userCountID").innerHTML = usersCount + " people have been here";
}else{
	document.getElementById("userCountID").innerHTML = "people count not Available";
}
if (address != null) {
	document.getElementById("addressID").innerHTML = address ;
}else{
	document.getElementById("addressID").innerHTML = "FormattedAddress not Available but you can get Directions" ;
}
if (categories!= null) {
	for(i = 0 ; i < categories.length; i++){
	//		console.log(categories[i]);
	$('#submenuID').append("<a>"+categories[i]+"</a>");
}
}else{
	$('#submenuID').append("<a>"+"No categories Available"+"</a>");
}
if(rating != undefined){
	if(rating > 8){
		document.getElementById("ratingTag").innerHTML = "People love it";
	}
	else {
		document.getElementById("ratingTag").innerHTML = "People like it";
	}
}

if (tags != undefined) {
	for(i = 0 ; i < tags.length; i++){
		// console.log(categories[i]);
		$('#submenu2ID').append("<a>"+tags[i]+"</a>");
	}

}else{
	$('#submenu2ID').append("<a>"+"No tags Available"+"</a>");	
}
if(contact != undefined){
	document.getElementById("phoneNumber").innerHTML = '<a href=tel:+'+contact+'><em></em><strong >Call us:</strong>'+contact+ '</a>';
}else{
	document.getElementById("phoneNumber").innerHTML = '<a ><em></em><strong >Call us:</strong> Not Available</a>';
}

// BEWLOW IS THE LAST IMAGES
// console.log(venue.photos.groups[0].count);
// console.log(venue.photos.groups[0].items[0].prefix);
// console.log(venue.photos.groups[0].items[0].suffix);
// console.log(venue.photos.groups[0].items[0].width);	
// console.log(venue.photos.groups[0].items[0].height);
var tempo = restaurantName.replace(/\s+/g, '');

document.getElementById("directions").onclick = function gotonew(){ window.location = "map.html?"+ tempo + '?'+ latt + ',' + lang;};



document.getElementById("fbbt").onclick = function gotofb(){ 
	window.open(link, "_blank", "scrollbars=yes,resizable=yes,width=10,height=10");
	// if(smail)
	// {
	// 	smail.close();    
	// }

};

document.getElementById("twbt").onclick = function gototw(){ 
	window.open(linktw, "_blank", "scrollbars=yes,resizable=yes,width=10,height=10");
	// if(smail)
	// {
	// 	smail.close();    
	// }

};
// https://twitter.com/share?url=<yoururl> 


////////////////////////open this in a window inside the current one////////////////////////////////
if(contact != undefined){
	// new QRCode(document.getElementById("qrcode"), contact.toString());
}
if(venue.photos.groups != undefined ){
	if(venue.photos.groups.length != 0){

		var imagesCount = venue.photos.groups[0].items.length;
		for(i = 0 ; i < imagesCount ; i++){
			thubnail =  venue.photos.groups[0].items[i].prefix + "100x100" + venue.photos.groups[0].items[i].suffix;
			bigImage = venue.photos.groups[0].items[i].prefix + venue.photos.groups[0].items[i].width +"x"+ 
			venue.photos.groups[0].items[i].height + venue.photos.groups[0].items[i].suffix;

			$('#images').append("<li><a class='swipebox' href="+bigImage+" title='An awesome gallery!''><img src="+thubnail+" alt='img' /></a></li>");
		}

		// console.log("test works");
		if(venue.photos.groups[0].items.length > 1){
			var headImageurl = venue.photos.groups[0].items[1].prefix + "300x100" + venue.photos.groups[0].items[1].suffix;
			document.getElementById("resHeaderImage").src = headImageurl;
			var headingurl =  venue.photos.groups[0].items[0].prefix + "200x100" + venue.photos.groups[0].items[0].suffix;
			document.getElementById("resImgHead").src = headingurl;

		}
		else if (venue.photos.groups[0].items.length == 1){

			var headImageurl = venue.photos.groups[0].items[0].prefix + "300x100" + venue.photos.groups[0].items[0].suffix;
			document.getElementById("resHeaderImage").src = headImageurl;
			var headingurl =  venue.photos.groups[0].items[0].prefix + "200x100" + venue.photos.groups[0].items[0].suffix;
			document.getElementById("resImgHead").src = headingurl;

		}
		
		

	}
}



// 	thubnail = "http://irs0.4sqi.net/img/general/50x50/1251576_xLw3LLHXOdI_9phXHMeAmxaHFipyY0atPd3RT6pSUZE.jpg";
// bigImage = "http://irs0.4sqi.net/img/general/300x300/1251576_xLw3LLHXOdI_9phXHMeAmxaHFipyY0atPd3RT6pSUZE.jpg";
// $('#images').append("<li><a class='swipebox' href="+bigImage+" title='An awesome gallery!''><img src="+thubnail+" alt='img' /></a></li>");
// $("#images").append('<li><a class="swipebox" href="https://irs0.4sqi.net/img/general/500x500/1251576_xLw3LLHXOdI_9phXHMeAmxaHFipyY0atPd3RT6pSUZE.jpg" title="An awesome gallery!"><img src="https://irs0.4sqi.net/img/general/500x500/1251576_xLw3LLHXOdI_9phXHMeAmxaHFipyY0atPd3RT6pSUZE.jpg" alt="img" /></a></li>'
// 	+'<li><a class="swipebox" href="https://irs0.4sqi.net/img/general/500x500/1251576_xLw3LLHXOdI_9phXHMeAmxaHFipyY0atPd3RT6pSUZE.jpg" title="An awesome gallery!"><img src="https://irs0.4sqi.net/img/general/500x500/1251576_xLw3LLHXOdI_9phXHMeAmxaHFipyY0atPd3RT6pSUZE.jpg" alt="img" /></a></li>'
// 	+   '<li><a class="swipebox" href="https://irs0.4sqi.net/img/general/500x500/1251576_xLw3LLHXOdI_9phXHMeAmxaHFipyY0atPd3RT6pSUZE.jpg" title="An awesome gallery!"><img src="https://irs0.4sqi.net/img/general/500x500/1251576_xLw3LLHXOdI_9phXHMeAmxaHFipyY0atPd3RT6pSUZE.jpg" alt="img" /></a></li>');
// LETS FUCK MAN IN THE MIDDLE AND DO SOME JUGAAD
// FIRST CHECK NUMBER OF IMAGES AND THEN APPEND THOSE MANY LI ELEMNTS TO THE LIST 
// AND THEN DO getElementById STUFF LIKE A PRO
// for(i = 0 ; i < imagesCount ; i++){
// 	$('#images').append('<li><a id = "bigImg'+i+'" class="swipebox" href="" title="An awesome gallery!"><img id = "thumb'+i+'Id" src="" alt="img" /></a></li>');
// }
// var bigImgId , thumbid;
// for(i = 0 ; i < imagesCount;i++){
// 	bigImgId = "bigImg"+i;
// 	thumbId =  "thumb"+i+"Id";
// 	document.getElementById(bigImgId).href="https://irs0.4sqi.net/img/general/300x300/1251576_xLw3LLHXOdI_9phXHMeAmxaHFipyY0atPd3RT6pSUZE.jpg";
// 	document.getElementById(thumbId).src = "https://irs0.4sqi.net/img/general/300x300/1251576_xLw3LLHXOdI_9phXHMeAmxaHFipyY0atPd3RT6pSUZE.jpg";
// }
// document.getElementById("test1").href = "https://irs0.4sqi.net/img/general/300x300/1251576_xLw3LLHXOdI_9phXHMeAmxaHFipyY0atPd3RT6pSUZE.jpg";
// document.getElementById("thumbId").src = "https://irs0.4sqi.net/img/general/300x300/1251576_xLw3LLHXOdI_9phXHMeAmxaHFipyY0atPd3RT6pSUZE.jpg";


var noTips = false;

if(venue.tips!= undefined){
	if(venue.tips.groups != undefined){
		var len = venue.tips.groups.length - 1;
		if(venue.tips.groups[len] != undefined){
			// console.log(venue.tips.groups[len].items.length);
			var itemsLen = venue.tips.groups[len].items.length;
			var titleStyle ="speach-right-title";
			var side = "right";
			var bubble = "blue-bubble";
			var textStyle = side + bubble;
 			for(i = 0 ; i < itemsLen; i++ ){
					if(titleStyle == "speach-right-title"){
						titleStyle = "speach-left-title";
					}else{
						titleStyle = "speach-right-title";
					}
					
					if(bubble == "blue-bubble"){
						bubble = " ";
					}else if(bubble == " "){
						bubble = "green-bubble";
					}else if(bubble == "green-bubble"){
						bubble = "blue-bubble"
					}

					if(side == "right"){
						side = "left";
					}else{
						side = "right";
					}

					textStyle = "speach-"+side+" " +bubble;
					// console.log(textStyle);
				$('#delete').append(   '<em id ="name1" class ="'+titleStyle+'">'
					+ venue.tips.groups[len].items[i].user.firstName +" "+ venue.tips.groups[len].items[i].user.lastName 
					+" "+'says' 
					+'</em>'
					+'<p id="name1tip" class="'+textStyle+'">'
					+ venue.tips.groups[len].items[i].text 
					+'</p>' 
					+'<div class="clear"></div>');
			}
		}else{
			noTips = true;
		}

	}else {
		noTips = true;
	}

}else{
	noTips = true;
} 
if(noTips == true){
	var el = document.getElementById("delete");
	el.parentNode.removeChild( el );
}
}