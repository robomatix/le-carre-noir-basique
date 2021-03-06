/* 
CARRE NOIR BASIQUE ACTION
V 0.0.1
Started saturday 06 July 2013 by Robomatix Rebirth
V 1.0.0 Beta released on the 03 August 2013
V 1.0.0 Beta2 released on the 08 August 2013
V.1.0.0 Beta3 released on the 14 September 2013
V.1.0.0 released on the 5 October 2013
Licence GNU GPL
* */

// Message page
var gameTitle = 'Le Carré Noir Basique V.1.0.0'
var msgInfoFocusGameOff = 'Click on the square to get the focus if nothing happens when pressing "Enter"';
var msgInfoFocusGameOn = 'Click on the square to get the focus if nothing happens when pressing "<-" or "->"';

//GLOBALS
SQUARE_SIZE = 50;
HOW_MANY_SQUARES_IN_A_ROW = 10;
JAUGE_STEP = 5;
COLOR_BLACK = 'black';
COLOR_GREEN = 'green';
COLOR_NEUTRAL = 'white';
LEVEL_2_END = 88;
LEVEL_3_END = 166;
LEVEL_4_END = 246;
ADDRESS_PAGE = 'http://le-carre-noir.net/le-carre-noir-basique-v-1-0-0/';


	
$(function() {
	
	// Hide some stuff...
	$("#transitionLevel").hide();
	
	// Display some infos
	$("#gameTitle").html(gameTitle);
	$("#infoFocus").html(msgInfoFocusGameOff);

	// Initializing game state variables...
	gameOn = false;
	levelOn = false;
	picturesDisplayed = false;
	
	
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
	gameOn = true;
	turn = 1;
	// Reinitializing the stats and score stuffs
	level = 1
	ns = 0;
	gs = 0;
	bs = 0;
	score = 0;
	
	// Initializing the factors for the difficulty of the initial level ( used in cn.addRowSquare )
	cn.newLevel(1,4,7);
	
	// Doing some html and CSS stuff
	var ccng = $("#containerCarreNoirGame");
	var ccngPosition = ccng.position();
	var scoreTop=ccngPosition.top+60;// Compensate the border and the margin
	var scoreLeft=ccngPosition.left+540;// Compensate the border and the width + space

	$("#transitionLevel").removeClass("red").removeClass("green").hide(); // To avoid random bug link to the class green or red left before during the game // Does it makes an error the firt time ?
	$("#shareScoreButtons").css({ "top" : "-50000000000px" });
	if (typeof (myIntervalTransitionLevel) != 'undefined'){ 
		window.clearInterval(myIntervalTransitionLevel);// To stop the set Interval wich makes the transition of the end when the Game is Over  
	}
	cn.displayScore();
	$("#container").empty(); // To remove the squares of a previous game....
	$("#container").show();
	var x_player_random = Math.floor((Math.random() * 10))*SQUARE_SIZE; // random number between 0 and 9 and the * 40 to randomly determinate the position of the player at the begenning of the game
	cn.addSquare("container", "player", {dim: SQUARE_SIZE, bgColor: COLOR_BLACK, y: (HOW_MANY_SQUARES_IN_A_ROW*SQUARE_SIZE)-SQUARE_SIZE, x: x_player_random});
	cn.addSquare("player", "jauge", {dim: 0, bgColor: COLOR_GREEN, y: SQUARE_SIZE/2, x: SQUARE_SIZE/2});
	$("#player").css({'z-index': 100});
	$("#infoFocus").html(msgInfoFocusGameOn);
	
};

// Do differents actions depending on the game statut when pressing some key on the keyboard
	$(document).keydown(function(e) {
		
					
		if (!gameOn && !levelOn) {// The game hasn't been started
		
			if(e.keyCode === 13){// Enter
				cn.startGame(initialize);
			}	
				 
		}
		
		if (picturesDisplayed) {// The game is displaying a level transition, pictures being displayed
			if(e.keyCode === 13){// Enter	
				$("#transitionLevel").removeClass("red").removeClass("green").hide();// To avoid random bug link to the class green or red left before during the game
				window.clearInterval(myIntervalTransitionLevel);// To stop the set Interval wich makes the transition blinked				
				levelOn = false;
				picturesDisplayed = false;
			}
		}
		
		if (gameOn && !levelOn) {// The game is on !!!
			/* Moves */
			var newPos = cn.x("player");
			switch (e.keyCode) {
				case 37:// Left
				newPos -= SQUARE_SIZE;
				cn.movePlayerSquare(newPos);
				cn.level(turn);
				break;
				case 39:// Right
				newPos += SQUARE_SIZE;
				cn.movePlayerSquare(newPos);
				cn.level(turn);				
				break;
			}
		}		
	});
	
});
