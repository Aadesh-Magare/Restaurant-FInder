var foodie = [
{
	"category": "Food",
	"info": "All kinds of food that you will love",
	"id": "4d4b7105d754a06374d81259"
},
{
	"category": "Cafeteria",
	"info": "Get some snacs at Cafeteria",
	"id": "4bf58dd8d48988d128941735"
},
{
	"category": "Café",
	"info": "Time to have some hot beverages and more",
	"id": "4bf58dd8d48988d16d941735"
},
{
	"category": "Coffee Shop",
	"info": "Special Coffee shops nearby",
	"id": "4bf58dd8d48988d1e0931735"
},
{
	"category": "Diner",
	"info": "Where will you dine tonight",
	"id": "4bf58dd8d48988d147941735"
},
{
	"category": "Donut Shop",
	"info": "Time for some sweet Donuts",
	"id": "4bf58dd8d48988d148941735"
},
{
	"category": "Bakery",
	"info": "What about some bread and cakes",
	"id": "4bf58dd8d48988d16a941735"
},
{
	"category": "Breakfast Spot",
	"info": "Feel like having some Breakfast?",
	"id": "4bf58dd8d48988d143941735"
},
{
	"category": "Ice Cream Shop",
	"info": "Because we all love Ice Cream ",
	"id": "4bf58dd8d48988d1c9941735"
},
{
	"category": "Indian Restaurant",
	"info": "Time for some proper Indian food",
	"id": "4bf58dd8d48988d10f941735"
},
{
	"category": "Chaat Place",
	"info": "Where can I get some spicy Chaat",
	"id": "54135bf5e4b08f3d2429dfe2"
},
{
	"category": "Dhaba",
	"info": "Daisy food is all we want",
	"id": "54135bf5e4b08f3d2429dfe1"
},
{
	"category": "Juice Bar",
	"info": "Get some healty Juice here",
	"id": "4bf58dd8d48988d112941735"
},
{
	"category": "North Indian Restaurant",
	"info": "Spicy North Indian food is here",
	"id": "54135bf5e4b08f3d2429dfdd"
},
{
	"category": "Pizza Place",
	"info": "B'Coz we all love Pizza",
	"id": "4bf58dd8d48988d1ca941735"
},
{
	"category": "Restaurant",
	"info": "Good Restaurants nearby",
	"id": "4bf58dd8d48988d1c4941735"
},
{
	"category": "Soup Place",
	"info": "Great for Soup-lovers",
	"id": "4bf58dd8d48988d1dd931735"
},
{
	"category": "Vegetarian / Vegan Restaurant",
	"info": "In case you are pure veg",
	"id": "4bf58dd8d48988d1d3941735"
},
{
	"category": "Airport Food Court",
	"info": "Usefull for people who travel a lot",
	"id": "4bf58dd8d48988d1ef931735"
},
{
	"category": "Hotel",
	"info": "What to have a stay tonight",
	"id": "4bf58dd8d48988d1fa931735"
}
];

logit(foodie);
function logit(arr){
	for(i = 0 ; i < 20 ; i++){
		var head = "f"+i
		console.log(head);
		document.getElementById(head).innerHTML = foodie[i].category;
		var x = document.getElementById("link"+i);
		x.href= "nearby.html"+"?cattt="+foodie[i].id;
		console.log(x.href);

		var z = "images/foodie/"+"f"+i+"new.jpg";
		console.log(z);
		document.getElementById("img"+i).src = z;
		document.getElementById("info"+i).innerHTML = foodie[i].info;
	}

};
