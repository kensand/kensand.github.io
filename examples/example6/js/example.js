// ADD NEW ITEM TO END OF LIST
var one = document.getElementById("one");
var list = one.parentElement;
var newLI = document.createElement("LI");
newLI.appendChild(document.createTextNode("kale"));
list.appendChild(newLI);

		 

// ADD NEW ITEM START OF LIST
newLI = document.createElement("li");
newLI.appendChild(document.createTextNode("cream"));
list.insertBefore(newLI, list.childNodes[0]);
// ADD A CLASS OF COOL TO ALL LIST ITEMS
for(i = 0; i < list.childNodes.length; i++){
    list.childNodes[i].className += " cool";
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
var newP = document.createElement("span");
var page = document.getElementById("page");
var l = 0;
for(i = 0 ; i < list.childNodes.length; i++){
    //console.log(list.childNodes[i].innerHTML);
    if(list.childNodes[i].nodeType === 1){
	l+=1;
    }
}
list.parentElement.childNodes[3].innerHTML += "<span>" + l + "</span>";
