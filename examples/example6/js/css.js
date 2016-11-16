$(function() {
    var backgroundColor = $("#one").css( "background-color" );
    $("#page").append("<p>"+backgroundColor+"</p>");
    $("#page ul li").each(function(){
	$(this).css({"background-color" : "#c5a996", "border" : "white 1px solid", "color": "black", "text-shadow":"none", "font" : "Georgia"});
    });
});
