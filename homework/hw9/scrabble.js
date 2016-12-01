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



var tileDist = [9,2,2,4,12,2,3,2,9,1,1,4,2,6,8,2,1,6,4,6,4,2,2,1,2,1];


$(function(){
	

	var b = Board("container");
	var dist = tileDist.slice();
	var getTile = function(){
		var total = 0;
		for(var i = 0; i < dist.length; i++){
			total += dist[i];
		}
		var rand = Math.floor(Math.random * total);
		total = 0;
		for(var i = 0; i < dist.length; i++){
			if(rand < total){
				dist[i]--;
				return String.fromCharCode(65 + i);
			}
			total += dist[i]
		}
		return null;
	}
	
	
			

	

});

function Tile(c){
	this.c = c;
	this.img = $("<img>");
	this.img.attr("src", "tiles/Scrabble_Tile_" + c + ".jpg");
}


function Hand(containerName){
	this.cont = $("#" + containerName);
	this.tiles = [];

}
function Board(containerName){
	this.cont = $("#" + containerName);
	this.letters = [];
	for(var i = 0; i < boardVals.length; i++){
		var templ = [];
		var tempe = $("<tr>");
		//console.log(boardVals);
		for(var j = 0; j < boardVals[i].length; j++){

			var tempd = $("<td>");
			tempd.attr("id", i + "," + j);
			tempd.addClass("square");
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
						
						tempd.append(star);
					}
				}
				if(boardVals[i][j][1] == l){
					tempd.addClass("dubLet");
					tempd.append("2x Letter");
				}
			}
			tempe.append(tempd);
			templ.push(null);
		}
		this.cont.append(tempe);
	}
	$("#7,7").empty();
	var star = $("<img>");
	star.attr("src", "star.png");
	//console.log(star);
	console.log($("#7,7"));
	$("#7,7").append(star);
	this.cont.children()[7].children()[7].append(star);
}
