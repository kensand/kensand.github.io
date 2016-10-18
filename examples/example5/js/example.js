// Create variables for the welcome message

var date = new Date();
var hour=date.getHours();
var greeting;
if(hour >= 0 && hour < 12){
greeting = 'Good morning ';
}
else if(hour >= 12 && hour < 17){
greeting = 'Good afternoon ';
}
else if(hour >= 17 && hour < 23){
greeting = 'Good evening ';
}
else{
greeting = 'Welcome ';
}

var name = 'Kenny';
var message = ', please check your order:';
// Concatenate the three variables above to create the welcome message
var welcome = greeting + name + message;

// Create variables to hold details about the sign
var sign = 'Home Sweet Home' ;
var tiles = sign.length;
var subTotal = 5 * tiles ;
var shipping = 7;
var grandTotal = subTotal + shipping;

// Get the element that has an id of greeting
var el = document.getElementById('greeting');
// Replace the content of that element with the personalized welcome message
el.textContent = welcome;

// Get the element that has an id of userSign then update its contents
var elSign = document.getElementById('userSign');
elSign.textContent = sign;

// Get the element that has an id of tiles then update its contents
var elTiles = document.getElementById('tiles');
elTiles.textContent = tiles;

// Get the element that has an id of subTotal then update its contents
var elSubTotal = document.getElementById('subTotal');
elSubTotal.textContent = '$' + subTotal;

// Get the element that has an id of shipping then update its contents
var elShipping = document.getElementById('shipping');
elShipping.textContent = '$' + shipping;

// Get the element that has an id of grandTotal then update its contents
var elGrandTotal = document.getElementById('grandTotal');
elGrandTotal.textContent = '$' + grandTotal;
