function isNumberKey(evt){
    var charCode = (evt.which) ? evt.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)){
        return false;
    }
    return true;
}

function submit(){
    var xmin = document.getElementById("xmin").value;
    var xmax = document.getElementById("xmax").value;
    var ymin = document.getElementById("ymin").value;
    var ymax = document.getElementById("ymax").value;

    var table = document.getElementById("multTable");
    table.style.display="table";
    table.innerHTML = "";
    
    if( xmin > xmax){
	window.alert("X-min is greater than X-max")
	return false;
    }
    if(ymin > ymax){
	window.alert("Y-min is greater than Y-max")
	return false;
    }

        
    
    for(var i = ymax; i >= ymin; i--){
	//window.alert("i = " + i);
	var row = table.insertRow(0);
	for(var j = xmax; j >= xmin; j--){
	    var cell = row.insertCell(0);
	    cell.innerHTML = (i * j);
	}
	var cell = row.insertCell(0);
	cell.innerHTML = i;
    }
    var row = table.insertRow(0);
    for(var j = xmax; j >= xmin; j--){
	var cell = row.insertCell(0);
	cell.innerHTML = j;
    }
    var cell = row.insertCell(0);
    cell.innerHTML = "y\\x";
    return false;
}
