/*
 File: /~ksanders/experiments/javascript/chess/chess.js
 Kenneth Sanders, UMass Lowell Computer Science, kenneth_sanders@student.uml.ed\
u
 Copyright (c) 2016 by Kenneth Sanders. All rights reserved.
 May be freely copied or excerpted for educational purposes with credit to the \
author.
*/

//square object to represent board square in computer process
function square(row, column){
    this.r = row;
    this.c = column;
    this.p = null;
    return this;
}

//piece object to represent the color and tyoe of a piece in a square on the board
function piece(color, type){
    this.color = color;
    this.name = type
    this.img_url = "images/" + color + "" + type + ".png";
    //console.log(this.img_url);
    return this;
}


var board = null;
var selected = null;

//Main game function
function game(black, white){
    board = new Array(8);
    for(var i = 0; i < 8; i++){
	var temp = new Array(8);
	for(var j = 0; j < 8; j++){
	    temp[j] = new square(i,j);
	    temp[j].p = null;
	}
	board[i] = temp;
    }
    //generate pawns for both sides
    for(i = 0; i < 8; i++){
	board[1][i].p = new piece("black", "pawn");
	board[6][i].p = new piece("white", "pawn");
    }

    //generate rest of pieces and place on board
    board[0][0].p = new piece("black","rook");
    board[0][7].p = new piece("black","rook");
    board[0][1].p = new piece("black","knight");
    board[0][6].p = new piece("black","knight");
    board[0][2].p = new piece("black","bishop");
    board[0][5].p = new piece("black","bishop");
    board[0][3].p = new piece("black","queen");
    board[0][4].p = new piece("black","king");
    
    board[7][0].p = new piece("white","rook");
    board[7][7].p = new piece("white","rook");
    board[7][1].p = new piece("white","knight");
    board[7][6].p = new piece("white","knight");
    board[7][2].p = new piece("white","bishop");
    board[7][5].p = new piece("white","bishop");
    board[7][3].p = new piece("white","queen");
    board[7][4].p = new piece("white","king");

    //update the board
    updateHTML(board);
    
}


//process a click on a square
function processClick(id){
    if(board == null){
	return;
    }
    var r = parseInt(id.charAt(0));
    var c = parseInt(id.charAt(1));
    //console.log("got click: " + r + ", " + c);
    if(selected == null && board[r][c].p != null){
	selected = new Array(r,c);
    }
    else if(selected != null && r == selected[0] && c == selected[1]){
	selected = null;
	
	var elem = document.getElementById(r.toString()+c.toString());
	if((r + c) % 2 == 0){
	    elem.style.backgroundColor = "white";
	}
	else{
	    elem.style.backgroundColor = "gray";
	}
	
    }
    else if(selected != null && !(r == selected[0] && c == selected[1])){
	var movelist = getMoveList(board[selected[0]][selected[1]].p, selected[0], selected[1]);
	for(var i = 0; i < movelist.length; i++){
	    if( r == movelist[i][0] && c == movelist[i][1]){
		board[r][c].p = board[selected[0]][selected[1]].p;
		board[selected[0]][selected[1]].p = null;
		selected = null;
		i = movelist.length;
	    }
	}
    }
    updateHTML(board);
}

//updates the html to the current state of the board
function updateHTML(board){
    for(var i = 0; i < 8; i++){
	for(var j = 0; j < 8; j++){
	    var elem = document.getElementById(i.toString()+j.toString());
	    while (elem.firstChild) {
		elem.removeChild(elem.firstChild);
	    }
	    if((i + j) % 2 == 0){
		elem.style.backgroundColor = "white";
            }
            else{
		elem.style.backgroundColor = "gray";
            }

	    //console.log("board[i][j].p = " + board[i][j].p);
	    if(board[i][j].p != null){
		var img = document.createElement("img");
		//console.log(i.toString() + ", " + j.toString() + ": " + board[i][j].p.img_url);
		img.src= board[i][j].p.img_url;
		img.setAttribute("width", "auto");
		img.setAttribute("height","auto");
		//img.setAttribute("object-fit","contain");
		elem.appendChild(img);
	    }
	    //console.log("selected= " +selected);
	    if(selected != null && i == selected[0] && j == selected[1]){
		//console.log("got here");
		elem.style.backgroundColor = "blue";
	    }
	}
    }
    if(selected != null){
	console.log("got selected");
    	var movelist = getMoveList(board[selected[0]][selected[1]].p, selected[0], selected[1]);
	console.log("movelist.length = " + movelist.length);
	console.log(movelist);
	for(var i = 0; i < movelist.length; i++){
	    if(board[movelist[i][0]][movelist[i][1]].p == null){
		document.getElementById(movelist[i][0].toString()+movelist[i][1].toString()).style.backgroundColor = "green";
	    }
	    if(board[movelist[i][0]][movelist[i][1]].p != null && board[movelist[i][0]][movelist[i][1]].p.color != board[selected[0]][selected[1]].p.color){
		document.getElementById(movelist[i][0].toString()+movelist[i][1].toString()).style.backgroundColor = "red";
		console.log("changing color to red");
	    }
	}
    }
    else{
    }
}
	   

//get the possible moves for a piece in a certain position
function getMoveList(piece, r, c){
    var movelist = new Array(0);
    if(piece.name == "pawn"){//TOTO add enpasse
	var dir = 0;
	if(piece.color == "black"){
	    dir = 1;
	}
	else{
	    dir = -1;
	}
	if(r + dir < 8 && r + dir >= 0 && board[r + dir][c].p == null){
	    movelist.push(new Array(r+dir, c));
	}
	if(r + dir < 8 && r + dir >= 0 && c - 1 >= 0 && board[r + dir][c - 1].p != null && board[r + dir][c - 1].p.color != piece.color ){
	    movelist.push(new Array(r+dir, c - 1));
	}
	if(r + dir < 8 && r + dir >= 0 && c + 1 < 8 && board[r + dir][c + 1].p != null && board[r + dir][c + 1].p.color != piece.color){
	    movelist.push(new Array(r+dir, c + 1));
	}
    }/*
    else if(piece.name == "bishop"){
	var i = c * -1;
	while(c + i < 8 && c + i >= 0 
	*/
    return movelist;
}

