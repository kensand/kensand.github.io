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

var b;
var rack;

	

	b = new Board("board");
	var dist = tileDist.slice();
	$("#buttons").append($("<button>").attr("id", "move").append("Submit Move")).append($("<button>").attr("id", "resetRack").append("Reset Move"));
	$("#move").onclick = moveFunc;
	
	console.log("b = ");
	console.log(b);
	$("#resetRack").click(resetRack);



	



	
	var getTile = function(){
		
		var total = 0;
		for(var i = 0; i < dist.length; i++){
			total += dist[i];
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
		return null;
	};

	rack = [];
	//rack.push(new Tile("C"));
	//rack.push(new Tile("D"));
	//$("#rack").append(rack[0].img);
	//$("#rack").append(rack[1].img);
	rack = fillRack(rack, getTile);
	console.log(rack);
	updateRack(rack, "rack");
	
			

	





function moveFunc(){

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
	console.log(b);
	b.setDroppable();
	for(var i = 0; i < rack.length; i++){
		console.log(rack[i]);
		rack[i].img.animate({
			top: "0px",
			left: "0px"
		});//removeAttr("style");
		rack[i].img.draggable("enable");
	}
}

function updateRack(rack, containerName){
	var cont = $("#" + containerName);
	cont.empty();
	//console.log("rack.length = " + rack.length);
	for(var i = 0; i < rack.length; i++){
		//console.log(rack[i].img);
		var tempDiv = $("<div>");
		//tempDiv.droppable({drop:handleDrop});
		tempDiv.append(rack[i].img);
		cont.append(tempDiv);
	}
	return;
}
function fillRack(r, tileFunc){
	//console.log("r = ");
	//console.log(r);
	while(r.length < 7){
		var c = (tileFunc());
		//console.log("c = "  + c);
		if(c == null){
			return r;
		}
		//console.log("r = ");
		//console.log(r);
		r.push(new Tile(c));
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
	this.location = null;
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
	if(this.letters[pos[0]][pos[1]] != null){
		return false;
	}
	else{
		this.letters[pos[0]][pos[1]] = tile;
		$(tile).draggable.draggable('disable');
	}
}

	Board.prototype.setDroppable = function(){
		var squares = this.cont.find(".square");
		console.log(squares);
		for(var i = 0; i < squares.length; i++){
			var id = String($(squares[i]).attr("id"));
			console.log( id);
			var x = id.slice(0, id.indexOf(","));
			var y = id.slice(id.indexOf(","), id.length);
			if(this.letters[x][y] == null){
				$(squares[i]).droppable('enable');
			}
			else{
				$(squares[i]).droppable('disable');
			}
		}
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
		
	}

function handleDrop(event, ui){
	
	ui.draggable.draggable({revert:false});
	ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
	ui.draggable.draggable("disable");
	//console.log(ui.draggable.location);
	ui.draggable.location = $(this).attr("id");
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
function pickedUp(event, ui){
	//console.log(event.target);
	//$(event.target).css("position", "fixed");
	
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
