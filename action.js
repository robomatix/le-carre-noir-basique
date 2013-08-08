/* 
CARRE NOIR BASIQUE ACTION
V 0.0.1
Started saturday 06 July 2013 by Robomatix Rebirth
V 1.0.0 Beta released on the 03 August 2013
V 1.0.0 Beta2 released on the 08 August 2013
Licence GNU GPL
* */
$(function() {
	
	//Hide some stuff...
	$("#transitionLevel").hide();

	// Initializing gameOn variable...
	gameOn = 0;
	
	
	// Initializing the stats and score stuffs
	level = 1
	ns = 0;
	gs = 0;
	bs = 0;
	score = 0;
	fns = 1;
	fgs = 1;
	fbs = 3;
	bestLevel = 0;
	bestNs = 0;
	bestGs = 0;
	bestBs = 0;
	bestScore = 0;

var initialize = function() {
	
	// Set some logical variables
	gameOn = 1;
	turn = 1;
	// Reinitializing the stats and score stuffs
	level = 1
	ns = 0;
	gs = 0;
	bs = 0;
	score = 0;
	
	// Initializing the factors for the difficulty of the initial level ( used in cn.addRowSquare )
	greenfactor = 5;
	whiteFactor1 = 4;
	whiteFactor2 = 8;
	blackFactor = 7;
	
	// Doing some html and CSS stuff
	var ccng = $("#containerCarreNoirGame");
	var ccngPosition = ccng.position();
	var scoreTop=ccngPosition.top+60;// Compensate the border and the margin
	var scoreLeft=ccngPosition.left+540;// Compensate the border and the width + space

	$("#transitionLevel").hide(); // Does it makes an error the firt time ?
	$("#restartShareButton").css({ "top" : "-50000000000px" , "margin" : "0 auto" });
	if (typeof (myIntervalTransitionLevel) != 'undefined'){ 
		window.clearInterval(myIntervalTransitionLevel);// To stop the set Interval wich makes the transition of the end when the Game is Over  
	}
	cn.displayScore();
	ccng.append("<div id='container'>");
	var x_player_random = Math.floor((Math.random() * 10))*50; // random number between 0 and 9 and the * 40 to randomly determinate the position of the player at the begenning of the game
	cn.addSquare("container", "player", {dim: 50, bgColor: "black", y: 450, x: x_player_random});
	$("#player").css({'z-index': 100});
	cn.addSquare("player", "jauge", {dim: 0, bgColor: "green", y: 25, x: 25});
	
};

// Do differents actions depending on the game statut when pressing some key on the keyboard
	$(document).keydown(function(e) {
					
		if (gameOn === 0) {// The game hasn't been started
		
			if(e.keyCode === 13){// Enter
				cn.startGame(initialize);
			}	
				 
		}
		
		if (gameOn === 3) {// The game is displaying a level transition
			if(e.keyCode === 13){// Enter	
				$("#transitionLevel").hide();
				window.clearInterval(myIntervalTransitionLevel);// To stop the set Interval wich makes the transition blinked
				cn.addSquare("player", "jauge", {dim: 0, bgColor: "green", y: 25, x: 25});
				gameOn=1;
			}
		}
		
		if (gameOn === 1) {// The game is on !!!
			/* Moves */
			var newPos = cn.x("player");
			switch (e.keyCode) {
				case 37:// Left
				newPos -= 50;
				cn.movePlayerSquare(newPos);
				cn.level(turn);
				break;
				case 39:// Right
				newPos += 50;
				cn.movePlayerSquare(newPos);
				cn.level(turn);				
				break;
			}
		}		
	});
	
});
