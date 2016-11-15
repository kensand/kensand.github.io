/*
 File: /~ksanders/hw6/multTable.js
 Kenneth Sanders, UMass Lowell Computer Science, kenneth_sanders@student.uml.ed\
u
 Copyright (c) 2016 by Kenneth Sanders. All rights reserved.
 May be freely copied or excerpted for educational purposes with credit to the \
author.
*/
jQuery.validator.setDefaults({
  debug: true,
  success: "valid"
});

$("#multDims").on('submit', function (e) {
   //ajax call here
   submit();
   //stop form submission
    e.preventDefault();
    return false;
});

$( "#multDims" ).validate({
  rules: {
      xmin: {
	  required: true,
	  digits: true
      },
      xmax: {
	  required: true,
	  digits: true
      },
      ymin: {
	  required: true,
	  digits: true
      },
      ymax: {
	  required: true,
	  digits: true
      }
  }//,
  //submitHandler: function(form) {
    // do other things for a valid form
  //  submit();
  //}  
});




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
