$(function(){
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
var b;
	var rack;
	var move = [];

	

	b = new Board("board");
	var dist = tileDist.slice();
	$("#buttons").append($("<button>").attr("id", "moveButton").append("Submit Move")).append($("<button>").attr("id", "resetRack").append("Reset Move"));
	$("#moveButton").click(moveFunc);
	
	//console.log("b = ");
	//console.log(b);
	$("#resetRack").click(resetRack);



	



	
	var getTile = function(){
		
		var total = 0;
		for(var i = 0; i < dist.length; i++){
			total += dist[i];
		}
		if(total <= 0){
			return null
		}
		//console.log("total = " + total);
		var rand = Math.floor(Math.random() * total);
		//console.log("rand = " + rand);
		total = 0;
		for(var i = 0; i < dist.length; i++){
			if(rand < total){
				dist[i]-=1;
				//console.log("i = " + i);
				//console.log("returning: " + String.fromCharCode(65 + i));
				return String.fromCharCode(65 + i);
				
			}
			total += dist[i];
		}
		console.error("shouldn't be getting here");
	};

	rack = [];
	//rack.push(new Tile("C"));
	//rack.push(new Tile("D"));
	//$("#rack").append(rack[0].img);
	//$("#rack").append(rack[1].img);
	rack = fillRack(rack, getTile);
	//console.log(rack);
	updateRack(rack, "rack");
	
			

	





	function moveFunc(){
		//console.log("got movefunc call");
		//console.log(move);
		//checkMove
		
		
		
		squares = [];
		for(var i = 0; i < move.length; i++){
			//console.log(move[i][0].id);
			var id = move[i][0].id;
			var x = parseInt(id.slice(0, id.indexOf(",")));
			var y = parseInt(id.slice(id.indexOf(",") + 1, id.length));
			squares.push([x, y]);
			
			//rack.splice(rack.indexOf(move[i][1]), 1);
		}
		//console.log(squares);
		if(move.length <= 0){
			badMove("You have to actually place a tile on the board.");
			return;
		}
		if(b.firstmove && !isOnStar(squares)){
		
		
		}
		if(!isInRow(squares) && !isInCol(squares)){
			badMove("All placed tiles must be in either the same row or the same column");
			return;
		}


		//accepts move,

		
	
		
		for(var i = 0; i < move.length; i++){
			console.log(rack.indexOf(move[i][1]));
			//console.log(move);
			//console.log(move[i][1]);
			//console.log(rack);
			var x = parseInt(id.slice(0, id.indexOf(",")));
			var y = parseInt(id.slice(id.indexOf(",") + 1, id.length));
			if(!b.placeTile(move[i][1], [x,y])){
				console.error("cannot place tile");
			}
			rack.splice(rack.indexOf(move[i][1]), 1);
		}
		move = [];
		rack = fillRack(rack, getTile);
		//console.log(rack);
		updateRack(rack, "rack");
		b.setDroppable();
		b.updateBoard();
		clearMessage();
		

	}

	function badMove(error){
		clearMessage();
		$("#message").append($("<p>").append(error));
		resetRackPositions();
	}
	function clearMessage(){
		$("#message").empty();
	}
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
	


function tileProm(Dist){
	return function(){
		
		var total = 0;
		for(var i = 0; i < Dist.length; i++){
			total += Dist[i];
		}
		//console.log("total = " + total);
		var rand = Math.floor(Math.random() * total);
		//console.log("rand = " + rand);
		total = 0;
		for(var i = 0; i < Dist.length; i++){
			if(rand < total){
				Dist[i]-=1;
				//console.log("i = " + i);
				//console.log("returning: " + String.fromCharCode(65 + i));
				return String.fromCharCode(65 + i);
				
			}
			total += Dist[i];
		}
		return null;
	};
}

function resetRack(){
	//console.log(b);
	clearMessage();
	resetRackPositions();
	
}
function resetRackPositions(){
	b.setDroppable();
	for(var i = 0; i < rack.length; i++){
		//console.log(rack[i]);
		rack[i].img.animate({
			top: "0px",
			left: "0px"
		});//removeAttr("style");
		rack[i].img.draggable("enable");
	}
	move = [];
}

function updateRack(rack, containerName){
	var cont = $("#" + containerName);
	cont.empty();
	//console.log(cont);
	//console.log("rack.length = " + rack.length);
	for(var i = 0; i < rack.length; i++){
		//console.log(rack[i].img);
		var tempDiv = $("<div>");
		//tempDiv.droppable({drop:handleDrop});
		rack[i].img.draggable({containment:"#container",
				      start: movedTile,
				      //stop: returnTile,
				      revert:true
				     });
		tempDiv.append(rack[i].img);
		cont.append(tempDiv);
	}
	return;
}
function fillRack(r, tileFunc){
	console.log("r = ");
	//console.log(r);
	while(r.length < 7){
		if(r.length > 0){
			console.log(r[r.length - 1].c);
		}
		var c = (tileFunc());
		//console.log("c = "  + c);
		if(c == null){
			return r;
		}
		//console.log("r = ");
		//console.log(r);
		r.push(new Tile(c));
		console.log("data of new tile = ");
		console.log(r[r.length - 1].img.data("tile"));
	}
	
	return r.slice();
}

function Tile(c){
	this.c = c;
	this.img = $("<img>");
	this.img.attr("src", "tiles/Scrabble_Tile_" + c + ".jpg");
	this.img.draggable({
		containment:"#container",
		start: movedTile,
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


function Hand(containerName){
	this.cont = $("#" + containerName);
	this.tiles = [];

}
function Board(containerName){
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
				drop:handleDrop,
				out: pickedUp
			});
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
}
	Board.prototype.placeTile = function (tile, pos){
		if(this.letters[pos[0]][pos[1]] == null){
			this.letters[pos[0]][pos[1]] = new Tile(tile.c);
		}
		else{
			//console.log("storing tile");
			return false;
			
		}
		return true;
	}

	Board.prototype.setDroppable = function(){
		var squares = this.cont.find(".square");
		//console.log(squares);
		for(var i = 0; i < squares.length; i++){
			var id = String($(squares[i]).attr("id"));
			//console.log( id);
			var x = id.slice(0, id.indexOf(","));
			var y = id.slice(id.indexOf(","), id.length);
			if(this.letters[x][y] == null){
				$(squares[i]).droppable('enable');
			}
			else{
				$(squares[i]).droppable('disable');
			}
		}
	}
	Board.prototype.updateBoard = function(){

		var squares = this.cont.find(".square");
		//console.log(squares);
		for(var i = 0; i < squares.length; i++){
			var id = String($(squares[i]).attr("id"));
			//console.log( id);
			var x = id.slice(0, id.indexOf(","));
			var y = id.slice(id.indexOf(",") + 1, id.length);
			//console.log("letters["+x+"][" + y + "] = ");
			//console.log(this.letters[x][y]);
			if(this.letters[x][y] != null){
				//console.log($(squares[i]));
				$(squares[i]).empty();
				this.letters[x][y].img.css("position", "static");
				this.letters[x][y].img.css("border", "0px");
				$(squares[i]).append(this.letters[x][y].img);
				$(squares[i]).droppable('disable');
			}
		}
	}

	/*	
		for(var i= 0; i < this.letters.length; i++){
			for(var j = 0; j < this.letters[i].length; j++){
				console.log("letters["+i+"][" + j + "] = ");
				console.log(this.letters[i][j]);
				if(this.letters[i][j] != null){
					console.log($("#"+i+","+j));
					$("#"+i+","+j).empty();
					$("#"+i+","+j).append(this.letters[i][j].img);
				}
			}
		}
		
	}*/
		/*
	for(var i = 0; i < this.letters.length; i++){
			if(this.letters[i][j] == null){
				console.log("#" + i.toString() + "," + j.toString());
				$("" + i.toString() + "," + j.toString()).droppable('enable');
				$("" + i.toString() + "," + j.toString()).css("background-color", "green")
				/*
				$("#" + i + "," + j).droppable({drop:handleDrop,
								out: pickedUp });
				.droppable( "option", "disabled", false );
				console.log("got here, i = " + i + ", j = " + j);
				console.log($("#" + i + "," + j));
			}
			else{	
				$("#" + i + "," + j).droppable("disable");
			}
		}
	}*/
		
	

function handleDrop(event, ui){
	
	ui.draggable.draggable({revert:false});
	ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
	ui.draggable.draggable("disable");
	move.push([this, new Tile(ui.draggable.data("tile").c)]);
	console.log(ui.draggable);
	console.log(ui.draggable.data("tile"));
	//ui.draggable.location = $(this).attr("id");
	//console.log(ui.draggable.location);
	$(this).droppable('disable');
	//$(this).droppable('disable');*/
	/*if($(this).find(".ui-draggable").length == 0){
		
		$(this).parent().append($(ui.draggable));

		console.log($(this));
		$(ui).parent().remove($(ui.draggable));
		$(this).css("position", "absolute");
	}
	else{
		ui.draggable.position(oldPos);
	}*/
}
	var oldPos = null;
	var currTile = null;
function pickedUp(event, ui){
	//console.log(event.target);
	//$(event.target).css("position", "fixed");
	//currTile = 
	
}
function movedTile(event, ui){
	$(this).draggable({revert:true});
	oldPos = $(this).position();
	//console.log("got new position");
}

//function returnTile(event, ui){
//	$(this).position(oldPos);
//	oldPos = null;
//}
});
