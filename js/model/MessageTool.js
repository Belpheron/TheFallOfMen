this.MessageTool = function() {
    //properties
    
    //methods
    this.showMessage = function(message, zone) {
        if (zone == "center") {
            $("#messageWindow").removeClass("p1Message p2Message").addClass("centerMessage");
            $("#messageWindow").css("top", "60%").css("opacity", 1).css("font-size", "3em");
        } else if (zone == "player1") {
            $("#messageWindow").removeClass("centerMessage p2Message").addClass("p1Message");
            $("#messageWindow").css("top", "40%").css("opacity", 1).css("font-size", "3em");
        } else {
            $("#messageWindow").removeClass("centerMessage p1Message").addClass("p2Message");
            $("#messageWindow").css("top", "40%").css("opacity", 1).css("font-size", "3em");
        }
        $("#messageWindow").html(message);
        $("#messageWindow").show();
        $("#messageWindow").animate({
            top : "20%",
            opacity: 0.5,
            fontSize: "2em"
        }, 4000, function(){
            $("#messageWindow").hide();
        });
    }
}


