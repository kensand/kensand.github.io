var date = new Date();
var hour=date.getHours();
var greeting;
if(hour >= 0 && hour < 12){
greeting = 'Good Morning!';
}
else if(hour >= 12 && hour < 17){
greeting = 'Good Afternoon!';
}
else if(hour >= 17 && hour < 23){
greeting = 'Good Evening!';
}
else{
greeting = 'Welcome!';
}
document.write('<h3>' + greeting + '</h3>');