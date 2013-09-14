/* 
CARRE NOIR BASIQUE FRAMEWORK
V 0.0.1
Started saturday 06 July 2013 by Robomatix Rebirth
V 1.0.0 Beta released on the 03 August 2013
V 1.0.0 Beta2 released on the 08 August 2013
Licence GNU GPL
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
        dim: SQUARE_SIZE
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
        dim: SQUARE_SIZE,
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
        var x = i * SQUARE_SIZE;
        // This determinate black,green or neutral square
        var bgn_random = Math.floor((Math.random() * 10) + 1); // random number between 1 and 10
        if (bgn_random > 0 && bgn_random < greenfactor) {// if random number > 7 -> black square otherwise green or neutral (white)
            bgn = COLOR_GREEN;
        } else if (bgn_random > whiteFactor1 && bgn_random < whiteFactor2) {
            bgn = COLOR_NEUTRAL;
        } else if (bgn_random > blackFactor) {
            bgn = COLOR_BLACK;
        }
        cn.addSquare("container", "square-" + turn + "-" + i, {dim: 50, bgColor: bgn, y: 0, x: x});
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
            newPosSquare += SQUARE_SIZE;
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
    if (y === 500) {
        $("#" + divId).remove();
    }

};
/**
 * This function test The collision with the square of the player
 **/
cn.testCollisionPlayer = function(divId, y) {
	
    if (y === 450) {
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
	
	// Determinate the previous dim
    dim = $("#jauge").data("cn").dim;
    
    // Determinate this turn dim
	switch (typeSquare) {
	case COLOR_GREEN:
		if (dim < SQUARE_SIZE) {
			dim += 5;// Increase the size of the jauge
			gs++;
		}
		break;
	case COLOR_BLACK:
		if (dim > 0) {
			dim -= 5;// Decrease the size of the jauge
			bs++;
		}
		break;
   case COLOR_NEUTRAL:
			ns++;
		break;
}
    
    /* Game ends or Continues ? */
    if (dim === SQUARE_SIZE) {// Game ends when the dim of the jauge checked is the same size as the player square
    
		$("#container").remove();
        gameOn = false;
        cn.levelTransition('end');// Calls the transition level for the end when the Game is Over
        
    } else { // Game continues... Next turn
            
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
        cn.displayScore();
        $("#jauge").remove();// Jauge is remove before being putting it back with his new datas...
        cn.addSquare("player", "jauge", {dim: dim, bgColor: COLOR_GREEN, y: (SQUARE_SIZE/2) - (dim / 2), x: (SQUARE_SIZE/2) - (dim / 2)});
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
    if (newPos > -SQUARE_SIZE && newPos < 500) {// Test to avoid to get out of the game container
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
		case 80:// Level 2
			level = 2;// Assign the value of level to display it on the side of the #containerCarreNoirGame and use it to determinate the newLevel
			cn.newLevel(level);
		break;
		case 180:// Level 3
			level = 3;
			cn.newLevel(level);
		break;
	}
};
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

	levelOn = true;// The game is now displaying a level transition
	
};
/**
 * This function display the level transition
 **/
cn.levelTransition = function(level) {
	
	$("#transitionLevel").html('<p id="exclamation">!</p>').show();
	myIntervalTransitionLevel = window.setInterval(cn.levelTransitionAnimation,520);// Stopped in action.js if (levelOn)
	
	// Initializing some logical variables
	timesExcamationBlinked = false;
	greenPictureLoaded = false;
	normalPictureLoaded = false;
	picturesDisplayed = false;
	
	// Randomly choose 1 'image' according to the level ( in fact 2 images, 1 in a green version and 1 a normal version )
	picture_random = Math.floor((Math.random() * 5) + 1); // random number between 1 and 5
	greenPicture = 'images/level'+level+'/'+picture_random+'g.jpg';
	normalPicture = 'images/level'+level+'/'+picture_random+'n.jpg';
	greenPictureDisplay = '<img src="'+greenPicture+'" id="greenPicture"/>';
	normalPictureDisplay = '<img src="'+normalPicture+'" id="normalPicture"/>';
	
	
	// Load the randomly chosen pictures
	$('#transitionLevel').load(greenPictureDisplay, function() {
		greenPictureLoaded = true;	
	});
	$('#transitionLevel').load(normalPictureDisplay, function() {
		normalPictureLoaded = true;					
	});
	
};
/**
 * This function handle the level animation
 **/
cn.levelTransitionAnimation = function() {	

	// Display some stuff while loading the pictures
	if( !greenPictureLoaded || !normalPictureLoaded || timesExcamationBlinked < 3){
		
		timesExcamationBlinked++;
		
		if($('#transitionLevel').hasClass('black') === true){
			$("#transitionLevel").removeClass("black");
		}else{
			$("#transitionLevel").addClass("black");
		}
		
	}else{// The pictures are loaded and the text blinked twice at least
		
		if( !picturesDisplayed ){// Displaying the pictures
		
			var messageTransition = '<p id="levelReached">Go to Level '+level+' >>> Press Enter</p>';
			if( !gameOn) {// If the Game is Over
			
				messageTransition = '<p id="levelReached">GAME OVER</p><p id="restart">To ReStart >> Click on the picture >> Press Enter</p>';
				
				$("#shareScoreButtons").css({ "top" : "510" }); // Share Score
				
				adressPage = 'http://le-carre-noir.net/lcnb-v-1-0-0-beta/';
				// Tumblr stuff ( needs some js stuff on the index page before </body> and a button )				
				tumblr_photo_source = adressPage+'images/levelend/'+picture_random+'n.jpg';
				tumblr_photo_caption = score + ' is my score on Le Carré Noir Basique V 1.0.0 beta ! Click on the picture to play to this fucking game !!!';					
				tumblrButtonHref = 'http://www.tumblr.com/share/photo?source=' + encodeURIComponent(tumblr_photo_source) + '&caption=' + encodeURIComponent(tumblr_photo_caption) + '&click_thru=' + encodeURIComponent(adressPage);	
				$("a.tumblrButton").prop("href", tumblrButtonHref);
				
				// Twitter stuff ( needs some js stuff below below and a button on the index page )
				$(".twitter-share-button").attr("data-text" , score + ' is my score on Le Carré Noir Basique V 1.0.0 beta ! ');
				!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+'://platform.twitter.com/widgets.js';fjs.parentNode.insertBefore(js,fjs);}}(document, 'script', 'twitter-wjs');
				
			}
			
			$('#transitionLevel').html(messageTransition+greenPictureDisplay+normalPictureDisplay);
			
			picturesDisplayed = true;
		}
		
		if(picturesDisplayed){// blink effect on the pictures
			$("#greenPicture").fadeOut(120).delay(140).fadeIn(120).delay(140);// hiding and showing green picture for a blinky effect ( I use fadeX(y) because delay dosen't works with show() and hide())
			
		}
		
	}
};
/**
 * This function display the score
 **/
cn.displayScore = function() {
	$("#score").html("<p>[ Level started : "+level+" / "+bestLevel+" ] [ Neutral Squares Hits : "+ns+" / "+bestNs+" ]</p><p>[ Green Squares Hits :"+gs+" / "+bestGs+" ]  [ Black Squares Hits :"+bs+" / "+bestBs+" ]</p><p>[ Final Score : "+score+" / "+bestScore+" ]</p>");	
};
/**
 * Start the game
 **/
cn.startGame = function(endCallback) {
    endCallback();
};
