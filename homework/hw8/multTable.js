/*
 File: kensand.github.io/homework/hw8/multTable.js
 Kenneth Sanders, UMass Lowell Computer Science, kenneth_sanders@student.uml.edu
 Copyright (c) 2016 by Kenneth Sanders. All rights reserved.
 May be freely copied or excerpted for educational purposes with credit to the 
 author.
*//*
   */
var tableNum = 1;
(function($){
	//set onclick for the save table button.
	$("#saveTable").click(function(){
		
		
		if (!($('#multTable').is(':empty'))){

			//clone the table and change id and put it in a div.
			var $tab = $("<div>").append($("#multTable").clone().prop("id", "innerTable" + tableNum));
			//make the div scrollable and set it's Id
			$tab.addClass("scroll");
			$tab.prop("id", "table" + tableNum);
			$tab.css("padding", "0px");
			//append div to tabs container
			$("#tabs").append($tab);

			//create a li for the table with a href inside and a span for the close button
			var $link = $("<li>");
			var $a = $("<a>");
			$a.attr("href", "#table" + tableNum);
			$a.append("Table " + tableNum);
			var $close = $("<span>");
			$close.addClass("ui-icon ui-icon-circle-close ui-closable-tab");
			$a.append($close);
			$link.append($a);
			$("#tabList").append($link);
			
			//refresh tabs and increase tabNumber
			
			$("#tabs").tabs("refresh");
			//if its the first table, go ahead and make that tab active
			if(tableNum == 1){
				$("#tabs").tabs({active: 0});
			}
			tableNum++;
		}
		
			
	});

	//set the onclick for all close buttons now and in the future.
	$("body").on( "click", ".ui-closable-tab", function() {
		//get the tab div id
		var tabId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
		//remove that div
		$( "#" + tabId ).remove();
		//refresh tabs
		$("#tabs").tabs("refresh");
		//check if there are any tabs left, if not, reset the tableNumber to 1 for convenience
		if ($("#tabs").find(".ui-closable-tab").length<1) {
			tableNum = 1;
		}
	});

	//set onclick function for the clear table button
	$("#clearTable").click(function(){
		$("#multTable").empty();
		
	});

	//set the onclick function for the delete all tables button
	$("#deleteTables").click(function(){
		//remove all tab divs
		$("#tabs").children().not("#tabList").remove();
		//empty the tab list
		$("#tabList").empty();
		//reset the tableNum
		tableNum = 1;
		//refresh the tabs
		$("#tabs").tabs("refresh");
	});
	//initialize tabs in the correct div
	$("#tabs").tabs();
	//function for what should happen anytime the slider value changes.
	var xMinSliderFunc = function(){
		//set the input value to what the slider has
		$("#xmin").val($("#xMinSlider").slider("option", "value"));
		//set the min and max for the corresponding max slider
		$("#xMaxSlider").slider("option", "min", parseInt($("#xMinSlider").slider("option", "value")));
		$("#xMaxSlider").slider("option", "max", parseInt($("#xMinSlider").slider("option", "value")) + 100);
		//check if the slider value is out of the new min and max range, and make it so that it is within it.
		if($("#xMaxSlider").slider("option", "value") < parseInt($("#xMinSlider").slider("option", "value"))){
			$("#xMaxSlider").slider("option", "value",  parseInt($("#xMinSlider").slider("option", "value")));
		}
		else if(parseInt($("#xMinSlider").slider("option", "value")) + 100 < $("#xMaxSlider").slider("option", "value")){
			$("#xMaxSlider").slider("option", "value",  parseInt($("#xMinSlider").slider("option", "value"))+ 100);
		}
		//call the submit function
		submit();
	};
	//intialize xmin slider with appropriate onchange/start/slide functions
	$("#xMinSlider").slider({
		start: xMinSliderFunc,
		slide: xMinSliderFunc, 
		change: xMinSliderFunc
	});
	//set xmin slider min and max
	$("#xMinSlider").slider("option", "min", -100);
	$("#xMinSlider").slider("option", "max", 100);

	//function for what should happen anytime the slider value changes.
	var yMinSliderFunc = function(){
		//set the input value to what the slider has
		$("#ymin").val($("#yMinSlider").slider("option", "value"));

		//set the min and max for the corresponding max slider
		$("#yMaxSlider").slider("option", "min", parseInt($("#yMinSlider").slider("option", "value")));
		$("#yMaxSlider").slider("option", "max", parseInt($("#yMinSlider").slider("option", "value")) + 100);
		//check if the slider value is out of the new min and max range, and make it so that it is within it.
		if($("#yMaxSlider").slider("option", "value") < parseInt($("#yMinSlider").slider("option", "value"))){
			$("#yMaxSlider").slider("option", "value",  parseInt($("#yMinSlider").slider("option", "value")));
		}
		else if(parseInt($("#yMinSlider").slider("option", "value")) + 100 < $("#yMaxSlider").slider("option", "value")){
			$("#yMaxSlider").slider("option", "value",  parseInt($("#yMinSlider").slider("option", "value"))+ 100);
		}
		//call the submit function
		submit();
	};
	//intialize ymin slider with appropriate onchange/start/slide functions
	$("#yMinSlider").slider({
		start: yMinSliderFunc,
		slide: yMinSliderFunc, 
		change:yMinSliderFunc
	});
	//set ymin slider min and max vals
	$("#yMinSlider").slider("option", "min", -100);
	$("#yMinSlider").slider("option", "max", 100);



	//intialize xmax slider with appropriate onchange/start/slide functions
	$("#xMaxSlider").slider({
		start: function(){ $("#xmax").val($("#xMaxSlider").slider("option", "value"));
				   submit();
				 },
		slide: function(){ $("#xmax").val($("#xMaxSlider").slider("option", "value"));
				   submit();
				 }, 
		change: function(){ $("#xmax").val($("#xMaxSlider").slider("option", "value"));
				   submit();
				  }});
	//set xmax slider min and max
	$("#xMaxSlider").slider("option", "min", 1);
	$("#xMaxSlider").slider("option", "max", 101);

	//intialize ymax slider with appropriate onchange/start/slide functions
	$("#yMaxSlider").slider({
		start: function(){ $("#ymax").val($("#yMaxSlider").slider("option", "value"));
				   submit();
				 },
		slide: function(){ $("#ymax").val($("#yMaxSlider").slider("option", "value"));
				   submit();
				 }, 
		change: function(){ $("#ymax").val($("#yMaxSlider").slider("option", "value"));
				   submit();
				  }});
	//set ymax slider min and max
	$("#yMaxSlider").slider("option", "min", 1);
	$("#yMaxSlider").slider("option", "max", 101);
	
	//set validator defaults
	jQuery.validator.setDefaults({
		debug: true,
		success: "valid"
	});

	//bind on input functions for the form input to change the slider value whenever the form value changes
	$("#xmin").bind('input', function () {if(!isNaN(parseInt($("#xmin").val()))){ $("#xMinSlider").slider("option", "value", $("#xmin").val()); submit();}});
	$("#ymin").bind('input', function () {if(!isNaN(parseInt($("#ymin").val()))){ $("#yMinSlider").slider("option", "value", $("#ymin").val()); submit();}});
	$("#xmax").bind('input', function () {if(!isNaN(parseInt($("#xmax").val()))){ $("#xMaxSlider").slider("option", "value", $("#xmax").val()); submit();}});
	$("#ymax").bind('input', function () {if(!isNaN(parseInt($("#ymax").val()))){$("#yMaxSlider").slider("option", "value", $("#ymax").val()); submit();}});
	
	
	
	
	//set onsubmit for the form
	$("#multDims").on('submit', function (e) {
		submit();
		
		//stop form submission
		e.preventDefault();
		return false;
	});
	
	//validate form
	$( "#multDims" ).validate({
		errorPlacement: function(error, e) {
			if (e.attr("name") == "xmin" )
				error.insertAfter("#xMinSlider");
			else if (e.attr("name") == "xmax" )
				error.insertAfter("#xMaxSlider");
			else if (e.attr("name") == "ymin" )
				error.insertAfter("#yMinSlider");
			else if (e.attr("name") == "ymax" )
				error.insertAfter("#yMaxSlider");
			else
				error.insertAfter(e);
		},
		rules: {
			xmin: {
				required: true,
				number: true
			},
			xmax: {
				required: true,
				number: true,
				//min value validation
				min: function(element){
					//check if xmin is a number
					if(!isNaN(parseInt($("#xmin").val()))){
						//if so, return parsed xmin
						return parseInt($("#xmin").val());
					}
					else{
						//otherwise return the minimum safe value
						//console.log("Minval = " + Number.MIN_VALUE);
						return Number.MIN_SAFE_INTEGER;
					}
				},
				//max value validation
				max: function(element){
					//check if xmin is a number
					if(!isNaN(parseInt($("#xmin").val()))){
						//if so, return xmin + 100
						return parseInt($("#xmin").val()) + 100;
					}
					//otherwise return the maximum safe integer
					else{
						return Number.MAX_SAFE_INTEGER;
					}
					//return parseInt($("#xmin").val()) + 100;
				}
			},
			ymin: {
				required: true,
				number: true
			},
			ymax: {
				required: true,
				number: true,
				//min value validation
				min: function(element){
					//check if ymin is a number
					if(!isNaN(parseInt($("#ymin").val()))){
						//if so, return ymin
						return parseInt($("#ymin").val());
					}
					else{
						//otherwise return the minimum safe integer
						
						//console.log("Minval = " + Number.MIN_VALUE);
						return Number.MIN_SAFE_INTEGER;
					}
				},
				//min value validation
				max: function(element){
					//check if ymin is a number
					if(!isNaN(parseInt($("#ymin").val()))){
						//if so, return ymin + 100
						return parseInt($("#ymin").val()) + 100;
					}
					else{
						//otherwise return the maximum safe integer
						return Number.MAX_SAFE_INTEGER;
					}
					//return parseInt($("#xmin").val()) + 100;
				}
			}
		}
	});
	submit();
})(jQuery);


/*function to process input values and dynamically add to the empty table*/
function submit(){
    console.log("submitted");
    if(!$("#multDims").valid()){
	return false;
    }
    /*check to make sure there is actually a number in each input*/
    //if(document.getElementById("xmin").value.length == 0){
    //window.alert("Please enter a value for X-min");
	//return false;
    //}
    if(document.getElementById("xmax").value.length == 0){
	window.alert("Please enter a value for X-max");
	return false;
    }
    if(document.getElementById("ymin").value.length == 0){
	window.alert("Please enter a value for Y-min");
	return false;
    }
    if(document.getElementById("ymax").value.length == 0){
	window.alert("Please enter a value for Y-max");
	return false;
    }

    /*get values of each input after bieng parsed as integers (spent way too much time wondering why comparing strings was making things wonky)*/
    var xmin = parseInt(document.getElementById("xmin").value);
    var xmax = parseInt(document.getElementById("xmax").value);
    var ymin = parseInt(document.getElementById("ymin").value);
    var ymax = parseInt(document.getElementById("ymax").value);

    /*find the table, make sure it's empty*/
    var table = document.getElementById("multTable");
    table.style.display="table";
    table.innerHTML = "";

    //debug alert
    //window.alert("xmin = " + xmin + ", xmax = " + xmax + ", xmin > xmax = " + (xmin > xmax));

    /*check for logic of table*/
    if(xmin > xmax){
	window.alert("X-min is greater than X-max");
	return false;
    }
    if(ymin > ymax){
	window.alert("Y-min is greater than Y-max");
	return false;
    }

    //dont allow more than 100 rows or column to prevent freezing on most devices
    if(xmax - xmin > 100){
	window.alert("Table is too large, please enter X-min and X-max with a difference of no more than 100");
	return false;
    }
    if(ymax - ymin > 100){
	window.alert("Table is too large, please enter X-min and X-max with a difference of no more than 100");
	return false;
    }    


    //loop to create rows in table
    for(var i = ymax; i >= ymin; --i){

	//debug alert
	//window.alert("i = " + i);
	
	var row = table.insertRow(0);
	//loop to create cells in each row
	for(var j = xmax; j >= xmin; --j){
	    //create cell in row
	    var cell = row.insertCell(0);
	    //fill cell with product of column and row
	    cell.innerHTML = (i * j);
	}
	//create header cell for each row and insert at beginning
	var cell = row.insertCell(0);
	cell.innerHTML = i;
	//styling so we can differentiate headers
	cell.className = "theader";
    }
    //create top row for headers of each column
    var row = table.insertRow(0);
    for(var j = xmax; j >= xmin; --j){
	var cell = row.insertCell(0);
	cell.innerHTML = j;
	cell.className = "theader";
    }
    //create top left cell with labels for table
    var cell = row.insertCell(0);
    cell.innerHTML = "X*Y";
    cell.className = "theader";
    return false;
}
