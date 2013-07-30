/* 
* CARRE NOIR BASIQUE ACTION
* V 0.0.1
* Started saturday 06 July 2013 by Robomatix Rebirth
* */
$(function() {
	
//Hide and show stuffs...
$("#gameOver").hide();
$("#score").hide();

// Initializing gameOn variable...
	gameOn = 0;
	
// Initializing the stats and score stuffs
	ns=0;
	gs=0;
	bs=0;
	score=0;
	fns=1;
	fgs=1;
	fbs=3;
	bestNs=0;
	bestGs=0;
	bestBs=0;
	bestScore=0;

var initialize = function() {
	
	// Set some logical variables
	gameOn = 1;
	turn = 1;
	
	// Reinitializing the stats and score stuffs
	ns=0;
	gs=0;
	bs=0;
	score=0;
	
	// Doing some html and CSS stuff
	var ccng = $("#containerCarreNoirGame");
	var ccngPosition = ccng.position();
	var scoreTop=ccngPosition.top+60;// Compensate the border and the margin
	var scoreLeft=ccngPosition.left+440;// Compensate the border and the width + space

	$("#score").show().css({"top" : scoreTop+"px","left" : scoreLeft+"px" }).html("<p>"+ns+" / "+bestNs+" [ Neutral Squares Hits ]</p><p>"+gs+" / "+bestGs+" [ Green Squares Hits ]</p><p>"+bs+" / "+bestBs+" [ Black Squares Hits ]</p><p>"+score+" / "+bestScore+" [ Final Score ]</p>");
	$("#gameOver").hide();
	ccng.append("<div id='container'>");
	cn.addSquare("container", "player", {dim: 40, bgColor: "black", y: 360, x: 120});
	$("#player").css({'z-index': 100});
	cn.addSquare("player", "jauge", {dim: 0, bgColor: "green", y: 20, x: 20});
	
};

// Move the player square with the arrows
	$(document).keydown(function(e) {
		
		if (gameOn === 0) {
			if(e.keyCode === 13){
				cn.startGame(initialize);
			}
		}
		
		if (gameOn === 1) {
			var newPos = cn.x("player");
				switch (e.keyCode) {
					case 37:// Left
					newPos -= 40;
					cn.movePlayerSquare(newPos);
					break;
					case 39:// Right
					newPos += 40;
					cn.movePlayerSquare(newPos);
					break;
				}
		}
	});
});


