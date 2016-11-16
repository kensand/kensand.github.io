$(function() {
	$("ul").before("<p> Just Updated </p>");
	$("li.hot").prepend("+");
	var temp = document.createElement("li");
	temp.appendChild(document.createTextNode("Soy Sauce"));
	$("#four").after(temp);
});
