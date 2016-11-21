/*
 File: kensand.github.io/homework/hw7/multTable.js
 Kenneth Sanders, UMass Lowell Computer Science, kenneth_sanders@student.uml.ed\
u
 Copyright (c) 2016 by Kenneth Sanders. All rights reserved.
 May be freely copied or excerpted for educational purposes with credit to the \
author.
*//*
   */
(function($){


	$("#xMinSlider").slider({
		start: function(){ $("#xmin").val($("#xMinSlider").slider("option", "value"));
				   $("#xMaxSlider").slider("option", "min", parseInt($("#xMinSlider").slider("option", "value")));
				    $("#xMaxSlider").slider("option", "max", parseInt($("#xMinSlider").slider("option", "value")) + 1000);
				   },
		slide: function(){ $("#xmin").val($("#xMinSlider").slider("option", "value"));
				   $("#xMaxSlider").slider("option", "min", parseInt($("#xMinSlider").slider("option", "value")));
				    $("#xMaxSlider").slider("option", "max", parseInt($("#xMinSlider").slider("option", "value")) + 1000);
				   }, 
		change: function(){ $("#xmin").val($("#xMinSlider").slider("option", "value"));
				    $("#xMaxSlider").slider("option", "min", parseInt($("#xMinSlider").slider("option", "value")));
				    $("#xMaxSlider").slider("option", "max", parseInt($("#xMinSlider").slider("option", "value")) + 1000);
				  }});
	$("#xMinSlider").slider("option", "min", -1000);
	$("#xMinSlider").slider("option", "max", 1000);
	$("#yMinSlider").slider({
		start: function(){ $("#ymin").val($("#yMinSlider").slider("option", "value"));
				   $("#yMaxSlider").slider("option", "min", parseInt($("#yMinSlider").slider("option", "value")));
				    $("#yMaxSlider").slider("option", "max", parseInt($("#yMinSlider").slider("option", "value")) + 1000);
				   },
		slide: function(){ $("#ymin").val($("#yMinSlider").slider("option", "value"));
				   }, 
		change: function(){ $("#ymin").val($("#yMinSlider").slider("option", "value"));
				  }});
		$("#yMinSlider").slider("option", "min", -1000);
	$("#yMinSlider").slider("option", "max", 1000);
	
 $("#xMaxSlider").slider({
	 start: function(){ $("#xmax").val($("#xMaxSlider").slider("option", "value"));
				   },
	 slide: function(){ $("#xmax").val($("#xMaxSlider").slider("option", "value"));
			  }, 
	 change: function(){ $("#xmax").val($("#xMaxSlider").slider("option", "value"));
			   }}); 
	$("#yMaxSlider").slider({
		start: function(){ $("#ymax").val($("#yMaxSlider").slider("option", "value"));
				   },
		slide: function(){ $("#ymax").val($("#yMaxSlider").slider("option", "value"));
				   }, 
		change: function(){ $("#ymax").val($("#yMaxSlider").slider("option", "value"));
				  }}); 
//set validator defaults
	jQuery.validator.setDefaults({
		debug: true,
		success: "valid"
	});
	$("#xmin").bind('input', function () { $("#xMinSlider").slider("option", "value", $("#xmin").val())});
	$("#ymin").bind('input', function () { $("#yMinSlider").slider("option", "value", $("#ymin").val())});
	$("#xmax").bind('input', function () { $("#xMaxSlider").slider("option", "value", $("#xmax").val())});
	$("#ymax").bind('input', function () { $("#yMaxSlider").slider("option", "value", $("#ymax").val())});
	
	
	
	
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
						//if so, return xmin + 1000
						return parseInt($("#xmin").val()) + 1000;
					}
					//otherwise return the maximum safe integer
					else{
						return Number.MAX_SAFE_INTEGER;
					}
					//return parseInt($("#xmin").val()) + 1000;
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
						//if so, return ymin + 1000
						return parseInt($("#ymin").val()) + 1000;
					}
					else{
						//otherwise return the maximum safe integer
						return Number.MAX_SAFE_INTEGER;
					}
					//return parseInt($("#xmin").val()) + 1000;
				}
			}
		}
	});
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

    //dont allow more than 1000 rows or column to prevent freezing on most devices
    if(xmax - xmin > 1000){
	window.alert("Table is too large, please enter X-min and X-max with a difference of no more than 1000");
	return false;
    }
    if(ymax - ymin > 1000){
	window.alert("Table is too large, please enter X-min and X-max with a difference of no more than 1000");
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
