var place, radius, price;
var rating = false, checkins = false, contactno = false, verified = false, opens = false, specials = false;
var fcontactno, fverified, fcheckins, frating, fopens, fspecials;  

function toggleit(){
	place = "Pune";
	radius = 3000;
	price = 2000;
    document.getElementById("bt1").onclick = function test(){ contactno = !contactno;};
    document.getElementById("bt2").onclick = function test(){ verified = !verified;};
    document.getElementById("bt3").onclick = function test(){ checkins = !checkins;};
    document.getElementById("bt4").onclick = function test(){ rating = !rating;};
    document.getElementById("bt5").onclick = function test(){ opens = !opens;};
    document.getElementById("bt6").onclick = function test(){ specials = !specials;};    
}