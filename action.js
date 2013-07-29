/* 
 * CARRE NOIR BASIQUE ACTION
 * V 0.0.1
 * Started saturday 06 July 2013 by Robomatix Rebirth
 * */
$(function() {
    // Hide and show stuffs... And initiate some variable...
    $("#gameOver").hide();
    $("#score").hide();
    $("#buttonLeft").hide();
    $("#buttonRight").hide();
    gameOn = 0;

    var initialize = function() {
        turn = 1;
        gameOn = 1;
        $("#gameOver").hide();
        $("#score").hide();
        $("#containerCarreNoirGame").append("<div id='container' style='display: block; width: 400px; height: 400px;'>");
        cn.addSquare("container", "player", {dim: 40, bgColor: "black", y: 360, x: 120});
        $("#player").css({'z-index': 100});
        cn.addSquare("player", "jauge", {dim: 0, bgColor: "green", y: 20, x: 20});
        $("#startButtonContainer").hide();
        $("#buttonLeft").show();
        $("#buttonRight").show();
    };


// Move the player square with the arrows
    $(document).keydown(function(e) {
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
    // Move the player square with the button (It seems impossible to emulate keydown... Avoid duplicate code later !

    $("#buttonLeft").click(function() {
        if (gameOn === 1) {// Dosen't seem to work outside the click function...
            var newPos = cn.x("player");
            newPos -= 40;
            cn.movePlayerSquare(newPos);
        }
    });
    $("#buttonRight").click(function() {
        if (gameOn === 1) {
            var newPos = cn.x("player");
            newPos += 40;
            cn.movePlayerSquare(newPos);
        }
    });


    // Start the game
    $("#startButton").click(function() {
        cn.startGame(initialize);
    });

});


