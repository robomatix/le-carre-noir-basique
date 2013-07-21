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
        if (bgn_random > 0 && bgn_random < 7) {// if random number > 5 -> black square otherwise green or neutral (white)F
            bgn = "green";
        } else if (bgn_random > 6 && bgn_random < 10) {
            bgn = "white";
        } else if (bgn_random > 9) {
            bgn = "black";
        }
        cn.addSquare("container", "square-" + turn + "-" + i, {dim: 40, bgColor: bgn, y: 0, x: x});
    }
};
/**
 * This function moves a row of squares towards the bottom
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
            cn.removeSquare(square, newPosSquare);// remove Square dernière ligne en bas...          
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
 * This function removes the line of squares below the player square
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
 * This function makes the action after  a collision with a square according to the type of the square
 **/
cn.squareCollisionPlayer = function(typeSquare) {
    dim = $("#jauge").data("cn").dim;
    if (dim === 40) {// Game ends...
        gameOn = 0;
        $("#container").remove();
        $("#gameOver").show();
        $("#score").show().html('Crack ! Boum ! Hue ! Perdu ! Votre score est de ' + turn);
        $("#buttonLeft").hide();
        $("#buttonRight").hide();
        $("#startButtonContainer").show();
    } else { // Next step of the game
        switch (typeSquare) {
            case 'green':
                if (dim < 40) {
                    dim += 4;
                }
                break;
            case 'black':
                if (dim >= 0) {
                    dim -= 4;
                }
                break;
        }
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
 * Start the game
 **/
cn.startGame = function(endCallback) {
    endCallback();
};


