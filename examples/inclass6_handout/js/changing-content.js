$(function() {
	$("li:contains('pine')").text("almonds");
	$("li.hot").html(function(){
		return '<em>' + $(this).text() + '</em>';
	});
	$("#one").remove();
});
