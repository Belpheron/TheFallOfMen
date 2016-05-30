this.Hangar = function (accessService, scope) {
    //properties
    this.currentTab = "skills";
    this.assignedImplants = [];
    this.storedImplants = [];
    this.assignedRockAttack;
    this.assignedPaperAttack;
    this.assignedScissorsAttack;
    this.storedAttacks = [];
    this.implantImageArray = [
        "images/tooltips/implant1.jpg",
        "images/tooltips/implant2.jpg",
        "images/tooltips/implant1.jpg"
    ];
    this.textInfo = "";
    this.textInfoError = "";

    //methods
    this.installImplant = function (implant) {
        if (scope.hangar.assignedImplants.length >= 3) {
            scope.hangar.textInfo = "";
            scope.hangar.textInfoError = "Maximum of 3 implants allowed.";
        } else {
            scope.hangar.assignedImplants.push(implant);
            scope.hangar.storedImplants.splice(scope.hangar.storedImplants.indexOf(implant), 1);
            //updates database
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                    {controllerType: 3, action: 108,
                        jsonData: {idRobot: scope.currentUser.robotStatistic.id, idImplant: implant.id}});
            promise.then(function (outputData) {
                scope.hangar.textInfo = "Implant succesfully installed";
                scope.hangar.textInfoError = "";
            });
        }
    }

    this.removeImplant = function (implant) {
        scope.hangar.assignedImplants.splice(scope.hangar.assignedImplants.indexOf(implant), 1);
        scope.hangar.storedImplants.push(implant);
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                {controllerType: 3, action: 109,
                    jsonData: {idRobot: scope.currentUser.robotStatistic.id, idImplant: implant.id}});
        promise.then(function (outputData) {
            scope.hangar.textInfo = "Implant removed";
            scope.hangar.textInfoError = "";
        });
    }
    
    this.setSkill = function(skill, type) {
        if (type == "rock") {
            if (scope.hangar.assignedRockAttack != null) {
                scope.hangar.storedAttacks.push(scope.hangar.assignedRockAttack);
            }
            scope.hangar.assignedRockAttack = skill;
        }
        if (type == "paper") {
            if (scope.hangar.assignedPaperAttack != null) {
                scope.hangar.storedAttacks.push(scope.hangar.assignedPaperAttack);
            }
            scope.hangar.assignedPaperAttack = skill;
        }
        if (type == "scissors") {
            if (scope.hangar.assignedScissorsAttack != null) {
                scope.hangar.storedAttacks.push(scope.hangar.assignedScissorsAttack);
            }
            scope.hangar.assignedScissorsAttack = skill;
        }
        scope.hangar.storedAttacks.splice(scope.hangar.storedAttacks.indexOf(skill), 1);
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                {controllerType: 3, action: 111,
                    jsonData: {idSkill:skill.id, idRobot: scope.currentUser.robotStatistic.id, type:type}});
        promise.then(function (outputData) {
            scope.hangar.textInfo = "Skill set for "+type+" attack.";
            scope.hangar.textInfoError = "";
        });        
    }

    this.removeSkill = function (type) {
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                {controllerType: 3, action: 110,
                    jsonData: {idRobot: scope.currentUser.robotStatistic.id, type: type}});
        promise.then(function (outputData) {
            if (type == "rock") {
                var a = new Skill(scope.hangar.assignedRockAttack.id,
                        scope.hangar.assignedRockAttack.name,
                        scope.hangar.assignedRockAttack.description,
                        scope.hangar.assignedRockAttack.requiredLevel,
                        scope.hangar.assignedRockAttack.buyPrice,
                        scope.hangar.assignedRockAttack.multiplier);
                a.attribute = scope.hangar.assignedRockAttack.attribute;
                a.value = scope.hangar.assignedRockAttack.value;
                a.type = scope.hangar.assignedRockAttack.type;
                scope.hangar.storedAttacks.push(a);
                scope.hangar.assignedRockAttack = null;
            } else if (type == "paper") {
                var a = new Skill(scope.hangar.assignedPaperAttack.id,
                        scope.hangar.assignedPaperAttack.name,
                        scope.hangar.assignedPaperAttack.description,
                        scope.hangar.assignedPaperAttack.requiredLevel,
                        scope.hangar.assignedPaperAttack.buyPrice,
                        scope.hangar.assignedPaperAttack.multiplier);
                a.attribute = scope.hangar.assignedPaperAttack.attribute;
                a.value = scope.hangar.assignedPaperAttack.value;
                a.type = scope.hangar.assignedPaperAttack.type;
                scope.hangar.storedAttacks.push(a);
                scope.hangar.assignedPaperAttack = null;
            } else if (type == "scissors") {
                var a = new Skill(scope.hangar.assignedScissorsAttack.id,
                        scope.hangar.assignedScissorsAttack.name,
                        scope.hangar.assignedScissorsAttack.description,
                        scope.hangar.assignedScissorsAttack.requiredLevel,
                        scope.hangar.assignedScissorsAttack.buyPrice,
                        scope.hangar.assignedScissorsAttack.multiplier);
                a.attribute = scope.hangar.assignedScissorsAttack.attribute;
                a.value = scope.hangar.assignedScissorsAttack.value;
                a.type = scope.hangar.assignedScissorsAttack.type;
                scope.hangar.storedAttacks.push(a);
                scope.hangar.assignedScissorsAttack = null;
            }
            scope.hangar.textInfoError = "";
            scope.hangar.textInfo = "Skill removed from "+type+" attack.";
        });
    }

    this.showItemInfo = function (item, event, message) {
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
        content += "<li><b>Name</b>: " + item.name + "</li>";
        content += "<li><b>Type</b>: " + item.type + "</li>";
        content += "<li><b>Description</b>: " + item.description + "</li>";
        content += "<li><b>Affected attribute<b/>: " + item.attribute.toUpperCase() + "</li>";
        content += "<li><b>Value<b/>: +" + item.value + "</li>";
        if (item.type == "skill") {
            content += "<li><b>Multiplier<b/>: x" + item.multiplier + "</li>";
        }
        content += "</ul>";

        //inserts content into the pop up window
        $("#hangarInfoPopUp").css("left", xpos);
        $("#hangarInfoPopUp").css("top", ypos);
        $("#hangarInfoPopUp").html(content);
        $("#hangarInfoPopUp").show();
    }

    this.hideItemInfo = function () {
        $("#hangarInfoPopUp").hide();
    }

    this.show = function ()
    {
        clearInterval(hangarAnimationTemp);
        scope.hangar.doAnimation();
        scope.currentWindow = "hangar";
        scope.hangar.loadData();
    };

    this.setTab = function (tabName) {
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

    this.loadData = function () {
        //gets all assigned implants
        scope.hangar.assignedImplants = [];
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                {controllerType: 3, action: 101, jsonData: {userName: scope.currentUser.userName}});
        promise.then(function (outputData) {
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
            promise.then(function (outputData) {
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
            });
        });

        //gets all assigned attacks
        scope.hangar.assignedRockAttack = null;
        scope.hangar.assignedPaperAttack = null;
        scope.hangar.assignedScissorsAttack = null;
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                {controllerType: 3, action: 104, jsonData: {userName: scope.currentUser.userName}});
        promise.then(function (outputData) {
            for (var i = 0; i < outputData[1].length; i++) {
                var attack = new Skill(outputData[1][i].id, outputData[1][i].name,
                        outputData[1][i].description, outputData[1][i].requiredLevel,
                        outputData[1][i].buyPrice, outputData[1][i].multiplier);
                attack.attribute = outputData[1][i].attribute;
                attack.value = outputData[1][i].value;
                attack.type = outputData[1][i].type;
                if (attack.type == "rock") {
                    scope.hangar.assignedRockAttack = attack;
                } else if (attack.type == "paper") {
                    scope.hangar.assignedPaperAttack = attack;
                } else if (attack.type == "scissors") {
                    scope.hangar.assignedScissorsAttack = attack;
                }
            }

            //gets all stored attacks
            scope.hangar.storedAttacks = [];
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                    {controllerType: 3, action: 107, jsonData: {userName: scope.currentUser.userName}});
            promise.then(function (outputData) {
                for (var i = 0; i < outputData[1].length; i++) {
                    var isAssigned = false;
                    if (scope.hangar.assignedRockAttack != null) {
                        if (outputData[1][i].id == scope.hangar.assignedRockAttack.id) {
                            isAssigned = true;
                        }
                    }
                    if (scope.hangar.assignedPaperAttack != null) {
                        if (outputData[1][i].id == scope.hangar.assignedPaperAttack.id) {
                            isAssigned = true;
                        }
                    } 
                    if (scope.hangar.assignedScissorsAttack != null) {
                        if (outputData[1][i].id == scope.hangar.assignedScissorsAttack.id) {
                            isAssigned = true;
                        }
                    }
                    if (!isAssigned) {
                        var attack = new Skill(outputData[1][i].id, outputData[1][i].name,
                                outputData[1][i].description, outputData[1][i].requiredLevel,
                                outputData[1][i].buyPrice, outputData[1][i].multiplier);
                        attack.attribute = outputData[1][i].attribute;
                        attack.value = outputData[1][i].value;
                        scope.hangar.storedAttacks.push(attack);
                    }
                }
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
    this.doAnimation = function ()
    {
        var robotName;
        if (scope.currentUser.robotStatistic.idRobotSkin == 1) {
            robotName = "MOBOT";
        } else {
            robotName = "PRIME";
        }
        var currentFrame = 0;
        hangarAnimationTemp = setInterval(function () {
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
