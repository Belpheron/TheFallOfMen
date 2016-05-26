this.Hangar = function(accessService, scope)
{
    //properties
    this.currentTab = "skills";
    this.assignedImplants = [];
    this.storedImplants = [];
    this.assignedAttacks = [];
    this.storedAttacks = [];

    //methods
    this.showItemInfo = function(item, event, message) {
        var xpos;
        var ypos;
        if (event.offsetX == undefined) {
            if (item.type == "skill") {
                xpos = event.pageX;
                ypos = event.pageY;
            } else if (item.type == "implant") {
                xpos = event.pageX;
                ypos = event.pageY;
            }
        } else {
            xpos = event.offsetX;
            ypos = event.offsetY;
        }
        if (xpos <= 10) {
            xpos == 20;
        }
        if (ypos <= 10) {
            ypos = 20;
        }
        var content = "<h4>Item information</h4><hr/>";
        content += "<ul>";
        content += "<li><b>Name</b>: "+item.name+"</li>";
        content += "<li><b>Type</b>: "+item.type+"</li>";
        content += "<li><b>Description</b>: "+item.description+"</li>";
        content += "<li><b>Affected attribute<b/>: "+item.attribute.toUpperCase()+"</li>";
        content += "<li><b>Value<b/>: +"+item.value+"</li>";
        if (item.type == "skill") {
            content += "<li><b>Multiplier<b/>: x"+item.multiplier+"</li>";
        }
        content += "</ul>";
        
        //inserts content into the pop up window
        $("#hangarInfoPopUp").css("left", xpos);
        $("#hangarInfoPopUp").css("top", ypos);
        $("#hangarInfoPopUp").html(content);
        $("#hangarInfoPopUp").show();
    }
    
    this.hideItemInfo = function() {
        $("#hangarInfoPopUp").hide();
    }

    this.show = function()
    {
        clearInterval(hangarAnimationTemp);
        scope.hangar.doAnimation();
        scope.currentWindow = "hangar";
        scope.hangar.loadData();
    };

    this.setTab = function(tabName) {
        scope.hangar.currentTab = tabName;
        if (tabName == "skills") {
            $("#hangar_implants_tab").removeClass("active");
            $("#hangar_attributes_tab").removeClass("active");
        } else if (tabName == "implants") {
            $("#hangar_skills_tab").removeClass("active");
            $("#hangar_attributes_tab").removeClass("active");
        } else {
            $("#hangar_skills_tab").removeClass("active");
            $("#hangar_implants_tab").removeClass("active");
        }
        $("#hangar_" + tabName + "_tab").addClass("active");
    }

    this.loadData = function() {
        //gets all assigned implants
        scope.hangar.assignedImplants = [];
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                {controllerType: 3, action: 101, jsonData: {userName: scope.currentUser.userName}});
        promise.then(function(outputData) {
            for (var i = 0; i < outputData[1].length; i++) {
                var implant = new Implant(outputData[1][i].id, outputData[1][i].name,
                        outputData[1][i].description, outputData[1][i].buyPrice);
                implant.attribute = outputData[1][i].attribute;
                implant.value = outputData[1][i].value;
                scope.hangar.assignedImplants.push(implant);
            }

            //gets all stored implants
            scope.hangar.storedImplants = [];
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                    {controllerType: 3, action: 106, jsonData: {userName: scope.currentUser.userName}});
            promise.then(function(outputData) {
                for (var i = 0; i < outputData[1].length; i++) {
                    var isAssigned = false;
                    for (var j = 0; j < scope.hangar.assignedImplants.length; j++) {
                        if (outputData[1][i].id == scope.hangar.assignedImplants[j].id) {
                            isAssigned = true;
                            break;
                        }
                    }
                    if (!isAssigned) {
                        var implant = new Implant(outputData[1][i].id, outputData[1][i].name,
                                outputData[1][i].description, outputData[1][i].buyPrice);
                        implant.attribute = outputData[1][i].attribute;
                        implant.value = outputData[1][i].value;
                        scope.hangar.storedImplants.push(implant);
                    }
                }
                console.log("Implantes asignados");
                console.log(scope.hangar.assignedImplants);
                console.log("Implantes inventario");
                console.log(scope.hangar.storedImplants);
            });
        });

        //gets all assigned attacks
        scope.hangar.assignedAttacks = [];
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                {controllerType: 3, action: 104, jsonData: {userName: scope.currentUser.userName}});
        promise.then(function(outputData) {
            for (var i = 0; i < outputData[1].length; i++) {
                var attack = new Skill(outputData[1][i].id, outputData[1][i].name,
                        outputData[1][i].description, outputData[1][i].requiredLevel,
                        outputData[1][i].buyPrice, outputData[1][i].multiplier);
                attack.attribute = outputData[1][i].attribute;
                attack.value = outputData[1][i].value;
                scope.hangar.assignedAttacks.push(attack);
            }
            console.log("Ataques asignados");
            console.log(scope.hangar.assignedAttacks);

            //gets all stored attacks
            scope.hangar.storedAttacks = [];
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                    {controllerType: 3, action: 107, jsonData: {userName: scope.currentUser.userName}});
            promise.then(function(outputData) {
                for (var i = 0; i < outputData[1].length; i++) {
                    var isAssigned = false;
                    for (var j = 0; j < scope.hangar.assignedAttacks.length; j++) {
                        if (outputData[1][i].id == scope.hangar.assignedAttacks[j].id) {
                            isAssigned = true;
                            break;
                        }
                    }
                    if (!isAssigned) {
                        var attack = new Skill(outputData[1][i].id, outputData[1][i].name,
                                outputData[1][i].description, outputData[1][i].requiredLevel,
                                outputData[1][i].buyPrice, outputData[1][i].multiplier);
                        scope.hangar.storedAttacks.push(attack);
                        attack.attribute = outputData[1][i].attribute;
                        attack.value = outputData[1][i].value;
                    }
                }
                console.log("Ataques inventario");
                console.log(scope.hangar.storedAttacks);
            });
        });
    }

    /**
     * doAnimation()
     * @author Franc
     * @date 18/05/2016
     * @description init a animation robot of user.
     * @param none
     * @returns none
     */
    this.doAnimation = function()
    {
        var robotName;
        if (scope.currentUser.robotStatistic.idRobotSkin == 1) {
            robotName = "MOBOT";
        } else {
            robotName = "PRIME";
        }
        var currentFrame = 0;
        hangarAnimationTemp = setInterval(function() {
            $("#robotImage").attr("src", "images/animations/" + robotName.toLowerCase() +
                    "/hangar/" + robotName.toUpperCase() + "_HANGAR." + putFourDigits(currentFrame) + ".png");
            if (currentFrame == 35) {
                clearInterval(hangarAnimationTemp);
                scope.hangar.doAnimation();
            }
            currentFrame++;
        }, 100);

    };
};

