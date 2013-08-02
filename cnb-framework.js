/* 
 * CARRE NOIR BASIQUE FRAMEWORK
 * V 0.0.1
 * Started saturday 06 July 2013 by Robomatix Rebirth
 * */
cn = {};

cn.initialize = function(options) {
    $.extend(cn, options);
};

/**
 * Square Object.
 **/
cn.square = function(options) {
	
    var defaultValues = {// Useless ????
        bgColor: "#F00",
        dim: 40
    };
    $.extend(this, defaultValues, options);

};

/**
 * This function adds a square the div defined by the first argument
 **/
cn.squareFragment = $("<div style='position: absolute'></div>");
cn.addSquare = function(parentId, divId, options) {
	
    var options = $.extend({
        x: 0,
        y: 0,
        dim: 40,
        bgColor: "#ffe"
    }, options);
    $("#" + parentId).append(cn.squareFragment.clone().css({
        left: options.x,
        top: options.y,
        width: options.dim,
        height: options.dim,
        backgroundColor: options.bgColor
    }).attr("id", divId).data("cn", options));
    
};
/**
 * This function adds a row of squares at the top
 **/
cn.addRowSquare = function() {
	
    for (var i = 0; i < 10; i++) {
        var x = i * 40;
        // This determinate black,green or neutral square
        var bgn_random = Math.floor((Math.random() * 10) + 1); // random number between 1 and 10
        if (bgn_random > 0 && bgn_random < greenfactor) {// if random number > 7 -> black square otherwise green or neutral (white)F
            bgn = "green";
        } else if (bgn_random > whiteFactor1 && bgn_random < whiteFactor2) {
            bgn = "white";
        } else if (bgn_random > blackFactor) {
            bgn = "black";
        }
        cn.addSquare("container", "square-" + turn + "-" + i, {dim: 40, bgColor: bgn, y: 0, x: x});
    }
    
};
/**
 * This function :
 * Moves a row of squares towards the bottom
 * Test the collision of computer square against the player suare
 * Remove the bottom line of computer squares
 **/
cn.moveRowSquare = function(turn) {
	
    i = 1;
    
    if (turn > 11) {
        i = turn - 10;
    }

    for (var i = i; i < turn; i++) {
        for (var ii = 0; ii < 10; ii++) {
            var square = "square-" + i + "-" + ii;
            var newPosSquare = cn.y(square);
            newPosSquare += 40;
            cn.y(square, newPosSquare);
            cn.testCollisionPlayer(square, newPosSquare);// Test collision between a square and the square of the player
			cn.removeSquare(square, newPosSquare);// remove Squares  at the bottom line       
		}
	}
	
};
/**
 * This function removes the line of squares below the player square
 **/
cn.removeSquare = function(divId, y) {
    if (y === 400) {
        $("#" + divId).remove();
    }

};
/**
 * This function test The collision with the square of the player
 **/
cn.testCollisionPlayer = function(divId, y) {
	
    if (y === 360) {
        xPosSquare = cn.x(divId);
        xPosPlayer = cn.x('player');
        if (xPosSquare === xPosPlayer) {
            var typeSquare = $("#" + divId).data("cn").bgColor;
            cn.squareCollisionPlayer(typeSquare);
        }
    }

};
/**
 * This function makes the action after a collision with a square according to the type of the square
 **/
cn.squareCollisionPlayer = function(typeSquare) {
	
    dim = $("#jauge").data("cn").dim;
    
    /* Game ends or Continues ? */
    if (dim === 36) {// Game ends when the dim of the jauge checked is 36px, just before reaching the fatal 40px
        gameOn = 0;
        $("#container").remove();
        $("#gameOver").show();
    } else { // Game continues... Next turn
        switch (typeSquare) {
            case 'green':
                if (dim < 36) {
                    dim += 4;// Increase the size of the jauge
                    gs++;
                }
                break;
            case 'black':
                if (dim >= 0) {
                    dim -= 4;// Decrease the size of the jauge
                    bs++;
                }
                break;
           case 'white':
                    ns++;
                break;
        }
        // Calculing the score
        score = (ns*fns)-(gs*fns)+(bs*fns)+turn-10;
        
        // Handling the best stats and score
        if(level > bestLevel){
			bestLevel = level;
		}
        if(ns > bestNs){
			bestNs = ns;
		}
		if(gs > bestGs){
			bestGs = gs;
		}
		if(bs > bestBs){
			bestBs = bs;// This not really the best, this is the most in fact...
		}
		if(score > bestScore){
			bestScore = score;
		}
		
        // Handle the best stats and score
        $("#score").html("<p>"+level+" / "+bestLevel+" [ Level started ]</p><p>"+ns+" / "+bestNs+" [ Neutral Squares Hits ]</p><p>"+gs+" / "+bestGs+" [ Green Squares Hits ]</p><p>"+bs+" / "+bestBs+" [ Black Squares Hits ]</p><p>"+score+" / "+bestScore+" [ Final Score ]</p>");
        $("#jauge").remove();// Jauge is remove before being putting it back with his new datas...
        cn.addSquare("player", "jauge", {dim: dim, bgColor: "green", y: 20 - (dim / 2), x: 20 - (dim / 2)});
    }

};
/**
 * This function sets or returns the position along the x-axis.
 **/
cn.x = function(divId, position) {
	
    if (position) {
        if (position === "zero") {// Hack to avoid 0 that doesn't seem to work...
            position = 0;
        }
        $("#" + divId).css("left", position);
        $("#" + divId).data("cn").x = position;
    } else {
        return $("#" + divId).data("cn").x;
    }
    
};
/**
 * This function sets or returns the position along the y-axis.
 **/
cn.y = function(divId, position) {
	
    if (position) {
        $("#" + divId).css("top", position);
        $("#" + divId).data("cn").y = position;
    } else {
        return $("#" + divId).data("cn").y;
    }
    
};
/**
 * This function moves the player square
 **/
cn.movePlayerSquare = function(newPos) {
    if (newPos > -40 && newPos < 400) {// Test to avoid to get out of the game container
        if (newPos === 0) {// Hack to avoid 0 that doesn't seem to work...
            newPos = "zero";
        }
        cn.x("player", newPos);
    }
    if (turn > 1) {
        cn.moveRowSquare(turn);
    }
    cn.addRowSquare(turn);
    turn++;
};
/**
 * This function Checks and determines levels changes
 **/
cn.level = function(turn){
	
	switch (turn) {
		case 20:// Level 2
			level = 2;// Assign the value of level to display it on the side of the #containerCarreNoirGame and use it to determinate the newLevel
			cn.newLevel(level);
		break;
		case 40:// Level 3
			level = 3;
			cn.newLevel(level);
		break;
	}
}
/**
 * This function sets the parameters of a level
 **/
cn.newLevel = function(level) {
	
	switch(level){// todo later : instead of a switch, put the parameters directly in the parameters of the fonction => more flexible
		case 2:
			greenfactor = 7;
			whiteFactor1 = 6;
			whiteFactor2 = 10;
			blackFactor = 9;
		break;
		case 3:
			greenfactor = 8;
			whiteFactor1 = 7;
			whiteFactor2 = 10;
			blackFactor = 9;
		break;
		}
		
	$("#jauge").remove();// Jauge is remove before being putting it back with his new datas in action.js...
	
	cn.levelTransition(level);// Calls the transition level

	gameOn=3;// The game is now displaying a level transition
	
}
/**
 * This function display the level transition
 **/
cn.levelTransition = function(level) {
	$("#transitionLevel").html('Level TTTTTTTT : '+level).show();
}
/**
 * Start the game
 **/
cn.startGame = function(endCallback) {
    endCallback();
};
