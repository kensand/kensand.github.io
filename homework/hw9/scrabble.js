/*
 File: kensand.github.io/homework/hw/scrabble.js
 91.461 Assignment 9
 Kenneth Sanders, UMass Lowell Computer Science, kenneth_sanders@student.uml.edu
 Copyright (c) 2016 by Kenneth Sanders. All rights reserved. 
 May be freely copied or excerpted for educational purposes with credit to the author.

*/

//scrabble tile images credit: https://teaching.cs.uml.edu/~heines/91.461/91.461-2015-16f/461-assn/Scrabble_Tiles.html



//constant values needed for scrabble game
const w = "Word";
const l = "Letter";
const boardVals = [
	[[3, w], null, null, [2, l], null, null, null, [3, w], null, null, null, [2,l], null, null, [3,w]],
	[null, [2,w], null, null, null, [3,l] , null, null, null, [3,l], null, null, null, [2,w], null],
	[null, null, [2,w], null, null, null, [2,l], null, [2,l], null, null, null,[2,w], null, null],
	[[2,l], null, null, [2,w], null, null, null,[2,l], null, null, null, [2,w], null, null, [2,l]],
	[null, null, null, null, [2,w], null, null, null, null, null, [2,w], null, null, null, null],
	[null, [3,l], null, null, null, [3,l], null, null, null, [3,l], null, null, null, [3,l], null],
	[null, null, [2,l], null, null, null, [2,l], null, [2,l], null, null, null, [2,l], null, null],
	
	[[3,w], null, null, [2,l] , null, null, null,/*null?*/ [2,w], null, null, null, [2,l], null, null, [3,w]],

	
	[null, null, [2,l], null, null, null, [2,l], null, [2,l], null, null, null, [2,l], null, null],
	[null, [3,l], null, null, null, [3,l], null, null, null, [3,l], null, null, null, [3,l], null],
	[null, null, null, null, [2,w], null, null, null, null, null, [2,w], null, null, null, null],
	[[2,l], null, null, [2,w], null, null, null,[2,l], null, null, null, [2,w], null, null, [2,l]],
	[null, null, [2,w], null, null, null, [2,l], null, [2,l], null, null, null,[2,w], null, null],
	[null, [2,w], null, null, null, [3,l] , null, null, null, [3,l], null, null, null, [2,w], null],
	[[3, w], null, null, [2, l], null, null, null, [3, w], null, null, null, [2,l], null, null, [3,w]]];

const tileDist = [9,2,2,4,12,2,3,2,9,1,1,4,2,6,8,2,1,6,4,6,4,2,2,1,2,1];
const tileVals = [1,3,3,2,1,4,2,4,1,8,5,1,3,1,1,3,10,1,1,1,1,4,4,8,4,10];

//global vars for the board, rack, and game tile distribution
var dist = tileDist.slice();
var b = null;
var rack = null;

//when the document is ready, setup the buttons, create the board, and fill the rack
$(function(){
	totalScore = 0;
	$("#buttons").append($("<button>").attr("id", "moveButton").append("Submit Move")).append($("<button>").attr("id", "resetRack").append("Reset Move")).append($("<button>").attr("id", "resetGame").append("Reset Game"));
	$("#moveButton").click(moveFunc);
	
	//console.log("b = ");
	//console.log(b);
	$("#resetRack").click(resetRack);
	$("#resetGame").click(resetGame);
	b = new Board("board");
	rack = fillRack([]);
	updateRack(rack, "rack");

	
});


function resetGame(){
	$("#board").empty();
	$("#rack").empty();
	clearMessage();
	b = new Board("board");
	rack = fillRack([]);
	updateRack(rack, "rack");
}

//function to score a move given an array of [.square and tile object pairs]
function scoreMove(move){
	var total = 0;
	var wordmult = 1;
	for(var i = 0; i < move.length; i++){
		var id = String(move[i][0].attr("id"));
		//console.log( id);
		var x = parseInt(id.slice(0, id.indexOf(",")));
		var y = parseInt(id.slice(id.indexOf(",") + 1, id.length));
		var val = boardVals[x][y];
		var lMult = 1;
		if(val != null){
			if(val[1] == w){
				wordmult *= val[0];
			}
			if(val[1] == l){
				lMult = val[0];
			}
		}
		var tileVal = tileVals[move[i][1].c.charCodeAt(0) - 65];
		total += (tileVal * lMult);
	}
	return total * wordmult;
};

//function called when the submit move button is clicked
function moveFunc(){
	if(b == null){
		return;
	}
	var move = b.applyMove(badMove);
	
	b.update();
	if( move != false){
		for(var i = 0 ; i < move.length; i++){
			
			rack.splice(rack.indexOf(move[i][1]), 1);
		}
		console.log(rack);
		rack = fillRack(rack);
		updateRack(rack, "rack");
		updateScore(scoreMove(move));
	}
	else{
		resetRackPositions();
	}
	
	

};
//function to update the score elements
var totalScore = 0;
function updateScore(val){
	$("#lastMoveScore").empty();
	$("#lastMoveScore").append($("<p>").append("Score From Last Move: " + val));
	totalScore += val;
	$("#totalScore").empty();
	$("#totalScore").append($("<p>").append("Total Score: " + totalScore));
}

//function to output an error to the message div when there is an error in a move
function badMove(error){
	clearMessage();
	$("#message").append($("<p>").append(error));
	resetRackPositions();
};

//function to clear the message div
function clearMessage(){
	$("#message").empty();
};

//Board class constructor
function Board(containerName){
	this.move = [];
	this.cont = $("#" + containerName);
	this.letters = [];
	this.firstMove = true;
	for(var i = 0; i < boardVals.length; i++){
		var templ = [];
		var tempe = $("<tr>");
		//console.log(boardVals);
		for(var j = 0; j < boardVals[i].length; j++){
			var td = $("<td>");
			var tempd = $("<div>");
			tempd.attr("id", i + "," + j);
			tempd.addClass("square");
			tempd.droppable({
				drop:handleDrop
				//, out: pickedUp
			});
			tempd.data("board", this);
			if(boardVals[i][j] == null){
				tempd.addClass("empty");
			}
			else if(boardVals[i][j][0] == [3]){
				if(boardVals[i][j][1] == w){
					tempd.addClass("tripWord");
					tempd.append("3x Word");
				}
				if(boardVals[i][j][1] == l){
					tempd.addClass("tripLet");
					tempd.append("3x Letter");
				}
			}
			else if(boardVals[i][j][0] == [2]){
				if(boardVals[i][j][1] == w){
					tempd.addClass("dubWord");
					if(i != 7 || j != 7){
						tempd.append("2x Word");
					}
					else{
						var star = $("<img>");
						star.attr("src", "star.png");
						star.css("height", "40px");
						//console.log(tempd);
						tempd.empty();
						tempd.append(star);
					}
				}
				if(boardVals[i][j][1] == l){
					tempd.addClass("dubLet");
					tempd.append("2x Letter");
				}
			}
			td.append(tempd);
			tempe.append(td);
			templ.push(null);
		}
		this.cont.append(tempe);
		this.letters.push(templ);
	  }
};

//function to apply the move stored in the board it is called from
Board.prototype.applyMove = function(failureFunc){
	console.log("this.move = ");
	console.log(this.move);
	if(this.move.length <= 0){
		console.log("got here");
		failureFunc("You have to actually place a new tile on the board.");
		return false;
	}
	var squares = [];

	for(var i = 0; i < this.move.length; i++){
		var id = this.move[i][0].attr("id");
		var x = parseInt(id.slice(0, id.indexOf(",")));
		var y = parseInt(id.slice(id.indexOf(",") + 1, id.length));
		squares.push([x, y]);
	}


	//do move logic checking here
	if(this.firstMove && !isOnStar(squares)){
		failureFunc("A tile must be placed on the star for the first move.");
		return false;
		
	}
	if(!isInRow(squares) && !isInCol(squares)){
		failureFunc("All newly placed tiles must be in either the same row or the same column");
		return false;
	}

	
	//update the letters array
	for(var i = 0; i < this.move.length; i++){
		var id = this.move[i][0].attr("id");
		var x = parseInt(id.slice(0, id.indexOf(",")));
		var y = parseInt(id.slice(id.indexOf(",") + 1, id.length));
		console.log(this.move);
		if(this.letters[x][y] == null){
			this.letters[x][y] = this.move[i][1].img;
			
		}
		else{
			console.error("trying to place tile where there is already a tile");
		}
		//rack.splice(rack.indexOf(this.move[i][1].img), 1);
	}

	
	//call the update function for the new letters
	this.update();
	var oldMove = this.move;
	this.move = [];
	if(this.firstMove){
		this.firstMove = false;
	}
	return oldMove;
}

//function to update the appearence of the board
Board.prototype.update = function(){
	var squares = this.cont.find(".square");
		//console.log(squares);
		for(var i = 0; i < squares.length; i++){
			var id = String($(squares[i]).attr("id"));
			//console.log( id);
			var x = id.slice(0, id.indexOf(","));
			var y = id.slice(id.indexOf(",") + 1, id.length);
			if(this.letters[x][y] != null){
				//console.log($(squares[i]));
				$(squares[i]).empty();
				this.letters[x][y].css("position", "static");
				this.letters[x][y].css("border", "0px");
				$(squares[i]).append(this.letters[x][y].clone());
				$(squares[i]).droppable('disable');
			}
			else{
				$(squares[i]).droppable('enable');
			}
		}
}


//function to handdle the dropping of a draggable into a dropable
function handleDrop(event, ui){
	console.log("ui data = ");
	console.log(ui.draggable);
	console.log(ui.draggable.data("tile"));
	$(this).data("board").move.push([$(this), ui.draggable.data("tile")]);
	ui.draggable.draggable("option", "revert", false);
	ui.draggable.position({ of: $(this), my: 'left top', at: 'left top' } );
	ui.draggable.draggable("disable");
	//console.log($(this).data("board").move);
				     
	
};

//tile object constructor
function Tile(c){
	this.c = c;
	this.img = $("<img>");
	this.img.attr("src", "tiles/Scrabble_Tile_" + c + ".jpg");
	this.img.draggable({
		containment:"#container",//		start: movedTile,
		//stop: returnTile,
		revert:true
	});
	this.img.addClass("tile");
	this.img.data("tile", this);
	//this.location = null;
	//console.log("tile img = ");
	//console.log(this.img);
	return this;
}

//function called when the reset rack button is pressed,
//also clears the message in the message div
function resetRack(){
	//console.log(b);
	clearMessage();
	resetRackPositions();
	
}
//function to reset the positions of any tiles in the rack
function resetRackPositions(){
	b.move = [];
	b.update();
	for(var i = 0; i < rack.length; i++){
		console.log("rack tile = ");
		console.log(rack[i].img.data("tile"));
		rack[i].img.animate({
			top: "0px",
			left: "0px"
		});//removeAttr("style");
		rack[i].img.draggable({
		containment:"#container",//		start: movedTile,
		//stop: returnTile,
		revert:true
	});
		rack[i].img.draggable("enable");

		//dont know why, but aparently jquery requires you refresh this....
		//spent waaaay to much time on this crap
		rack[i].img.data("tile", rack[i]);
	}
	
}

//function to update the appearence of the rack
function updateRack(rack, containerName){
	//rack = fillRack(rack);
	var cont = $("#" + containerName);
	cont.empty();
	for(var i = 0; i < rack.length; i++){
		//console.log(rack[i].img);
		//var tempDiv = $("<div>");
		//tempDiv.droppable({drop:handleDrop});
		rack[i].img.draggable();
		rack[i].img.draggable("option", "containment", "#container");
		rack[i].img.draggable("option", "revert", true);
				      //start: movedTile,
				      //stop: returnTile,
				      
				     //});
		//tempDiv.append(rack[i].img);
		//cont.append(tempDiv);
		rack[i].img.data("tile", rack[i]);
		cont.append(rack[i].img);
	}
	return rack;
}

//function to fill the rack until it has 7 tiles or there are no more tiles in dist
function fillRack(r){
	function getTile(){
		
		var total = 0;
		for(var i = 0; i < dist.length; i++){
			total += dist[i];
		}
		if(total <= 0){
			return null;
		}
		console.log("total = " + total);
		var rand = Math.floor(Math.random() * total);
		console.log("rand = " + rand);
		total = 0;
		for(var i = 0; i < dist.length; i++){
			if(rand < total){
				dist[i]-=1;
				console.log("i = " + i);
				console.log("returning: " + String.fromCharCode(65 + i));
				return String.fromCharCode(65 + i);
				
			}
			total += dist[i];
		}
		return getTile();
		console.error("shouldn't be getting here");
	};

	//for(var i = 0 ; i < r.length; i++){
//		console.log("fillrack datas = ");
	//	console.log(r[i].img.data("tile"));
	//}
	console.log("r = ");
	console.log(r);
	while(r.length < 7){
		if(r.length > 0){
			console.log(r[r.length - 1].c);
		}
		var c = (getTile());
		console.log("c = "  + c);
		if(c == null){
			return r;
		}
		console.log("r = ");
		console.log(r);
		r.push(new Tile(c));
		//console.log("data of new tile = ");
		//console.log(r[r.length - 1].img.data("tile"));
	}
	
	return r.slice();
}


//function to check if all tiles are in the same row
function isInRow(squares){
	if(squares.length <=0){
		return false;
	}
	
	var x = squares[0][0];
	var ret = true;
	for(var i = 0; i < squares.length; i++){
		if(squares[i][0] != x){
			ret = false;
		}
	}
	return ret;
}


//function to check if all tiles are in the same column
function isInCol(squares){
	if(squares.length <=0){
		return false;
	}
	var y = squares[0][1];
	var ret = true;
	for(var i = 0; i < squares.length; i++){
		if(squares[i][1] != y){
			ret = false;
		}
	}
	return ret;
}



//function to check if a tile is on the star.
function isOnStar(squares){
	for(var i = 0; i < squares.length; i++){
		if(squares[i][0] == 7 && squares[i][1] == 7){
			return true;
		}
	}
	for(var i = 0; i < squares.length; i++){
		if(squares[i][0] == 7 && squares[i][1] == 7){
			return true;
		}
	}
	return false;
}
