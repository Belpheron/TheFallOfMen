this.MessageTool = function () {
    //properties

    //methods
    this.showMessage = function (message, zone, color) {
        if (zone == "center") {
            $("#centerMsg").css("top", "50%").css("font-size", "3em").css("opacity", 1);
            $("#centerMsg").html(message);
            $("#centerMsg").show();
            $("#centerMsg").animate({
                top: "20%",
                opacity: 0.5,
                fontSize: "2em"
            }, 4000, function () {
                $("#centerMsg").hide();
            });
        }
        if (zone == "player1" && color != "green") {
            $("#p1DmgMsg").css("top", "40%").css("font-size", "3em").css("opacity", 1);
            $("#p1DmgMsg").html(message);
            $("#p1DmgMsg").show();
            $("#p1DmgMsg").animate({
                top: "20%",
                opacity: 0.5,
                fontSize: "2em"
            }, 4000, function () {
                $("#p1DmgMsg").hide();
            });
        }
        if (zone == "player1" && color == "green") {
            $("#p1HealMsg").css("top", "40%").css("font-size", "3em").css("opacity", 1);
            $("#p1HealMsg").html(message);
            $("#p1HealMsg").show();
            $("#p1HealMsg").animate({
                top: "20%",
                opacity: 0.5,
                fontSize: "2em"
            }, 4000, function () {
                $("#p1HealMsg").hide();
            });
        }
        if (zone == "player2" && color != "green") {
            $("#p2DmgMsg").css("top", "40%").css("font-size", "3em").css("opacity", 1);
            $("#p2DmgMsg").html(message);
            $("#p2DmgMsg").show();
            $("#p2DmgMsg").animate({
                top: "20%",
                opacity: 0.5,
                fontSize: "2em"
            }, 4000, function () {
                $("#p2DmgMsg").hide();
            });
        }
        if (zone == "player2" && color == "green") {
            $("#p2HealMsg").css("top", "40%").css("font-size", "3em").css("opacity", 1);
            $("#p2HealMsg").html(message);
            $("#p2HealMsg").show();
            $("#p2HealMsg").animate({
                top: "20%",
                opacity: 0.5,
                fontSize: "2em"
            }, 4000, function () {
                $("#p2HealMsg").hide();
            });
        }
    }
}


