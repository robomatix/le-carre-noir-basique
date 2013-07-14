/* 
 * CARRE NOIR BASIQUE ACTION
 * V 0.0.1
 * Started saturday 06 July 2013 by Robomatix Rebirth
 * */
$(function() {
    var initialize = function() {
        $("#mygame").append("<div id='container' style='display: block; width: 400px; height: 400px;'>");
        cn.addSquare("container", "player", {dim: 40, bgColor: "black", y: 360, x: 120});
        $("#player").css({'z-index': 100});
        cn.addSquare("player", "jauge", {dim: 0, bgColor: "green", y: 20, x: 20});
        $("#startButton").remove();
    };

    //var gameState = "START";
    turn = 1;
    score = 0;

    $(document).keydown(function(e) {
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
    });

    $("#startButton").click(function() {
        cn.startGame(initialize);
    });


});


