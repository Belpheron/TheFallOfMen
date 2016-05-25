this.Player = function(playerName, playerNumber, accessService, scope) {
    //properties
    this.playerNumber = playerNumber;
    this.playerName = playerName;
    this.animationInfo = [];
    this.imageList = [];
    this.skinName;
    this.playerContainer;
    this.healthPercent = 100;
    this.totalHealth;
    this.totalDamage = 0;
    this.combatXp = 0;
    this.winXp = 0;
    this.combatCoins = 0;
    this.winCoins = 0;
    this.ultimate = 0;
    this.attackBonusText = "";
    this.apBonus = 0;
    this.dpBonus = 0;
    this.hpBonus = 0;
    this.cpBonus = 0;

    //methods
    /**
     * @name resetBonus()
     * @author Juan
     * @date 24/05/2016
     * @version 1.0
     * @description resets bonus from previous attack
     * @param instance : pointer to this
     * @returns {n/a}
     */
    this.resetBonus = function(instance) {
        instance.apBonus = 0;
        instance.dpBonus = 0;
        instance.hpBonus = 0;
        instance.cpBonus = 0;
        instance.attackBonusText = "";
    }
    
    /**
     * @name setAttackBonus()
     * @author Juan
     * @version 1.0
     * @date 24/05/2016
     * @description gets the attack bonus for the given attack name, and sets it
     *      to the current player
     * @param attackName : the name of the attack to set
     * @param instance : pointer to this
     * @returns {n/a}
     */
    this.setAttackBonus = function(attackName, instance) {        
        if (attackName == "attack1") {
            if (instance.playerNumber == 1) {
                switch (scope.fightDetails.p1_attack1_attribute) {
                    case "ap":
                        instance.apBonus = parseInt(scope.fightDetails.p1_attack1_value);
                        instance.attackBonusText = "AP+" + instance.apBonus;
                        break;
                    case "dp":
                        instance.dpBonus = parseInt(scope.fightDetails.p1_attack1_value);
                        instance.attackBonusText = "DP+" + instance.apBonus;
                        break;
                    case "cp":
                        instance.cpBonus = parseInt(scope.fightDetails.p1_attack1_value);
                        instance.attackBonusText = "CP+" + instance.cpBonus;
                        break;
                    case "hp":
                        instance.hpBonus = parseInt(scope.fightDetails.p1_attack1_value);
                        instance.attackBonusText = "HP+" + (instance.hpBonus * 10);
                        break;
                    default:
                        instance.attackBonusText = "";
                        break;
                }
            } else if (instance.playerNumber == 2) {
                switch (scope.fightDetails.p2_attack1_attribute) {
                    case "ap":
                        instance.apBonus = parseInt(scope.fightDetails.p2_attack1_value);
                        instance.attackBonusText = "AP+" + instance.apBonus;
                        break;
                    case "dp":
                        instance.dpBonus = parseInt(scope.fightDetails.p2_attack1_value);
                        instance.attackBonusText = "DP+" + instance.apBonus;
                        break;
                    case "cp":
                        instance.cpBonus = parseInt(scope.fightDetails.p2_attack1_value);
                        instance.attackBonusText = "CP+" + instance.cpBonus;
                        break;
                    case "hp":
                        instance.hpBonus = parseInt(scope.fightDetails.p2_attack1_value);
                        instance.attackBonusText = "HP+" + (instance.hpBonus * 10);
                        break;
                    default:
                        instance.attackBonusText = "";
                        break;
                }
            }
        }
        if (attackName == "attack2") {
            if (instance.playerNumber == 1) {
                switch (scope.fightDetails.p1_attack2_attribute) {
                    case "ap":
                        instance.apBonus = parseInt(scope.fightDetails.p1_attack2_value);
                        instance.attackBonusText = "AP+" + instance.apBonus;
                        break;
                    case "dp":
                        instance.dpBonus = parseInt(scope.fightDetails.p1_attack2_value);
                        instance.attackBonusText = "DP+" + instance.apBonus;
                        break;
                    case "cp":
                        instance.cpBonus = parseInt(scope.fightDetails.p1_attack2_value);
                        instance.attackBonusText = "CP+" + instance.cpBonus;
                        break;
                    case "hp":
                        instance.hpBonus = parseInt(scope.fightDetails.p1_attack2_value);
                        instance.attackBonusText = "HP+" + (instance.hpBonus * 10);
                        break;
                    default:
                        instance.attackBonusText = "";
                        break;
                }
            } else if (instance.playerNumber == 2) {
                switch (scope.fightDetails.p2_attack2_attribute) {
                    case "ap":
                        instance.apBonus = parseInt(scope.fightDetails.p2_attack2_value);
                        instance.attackBonusText = "AP+" + instance.apBonus;
                        break;
                    case "dp":
                        instance.dpBonus = parseInt(scope.fightDetails.p2_attack2_value);
                        instance.attackBonusText = "DP+" + instance.apBonus;
                        break;
                    case "cp":
                        instance.cpBonus = parseInt(scope.fightDetails.p2_attack2_value);
                        instance.attackBonusText = "CP+" + instance.cpBonus;
                        break;
                    case "hp":
                        instance.hpBonus = parseInt(scope.fightDetails.p2_attack2_value);
                        instance.attackBonusText = "HP+" + (instance.hpBonus * 10);
                        break;
                    default:
                        instance.attackBonusText = "";
                        break;
                }
            }
        }
        if (attackName == "attack3") {
            if (instance.playerNumber == 1) {
                switch (scope.fightDetails.p1_attack3_attribute) {
                    case "ap":
                        instance.apBonus = parseInt(scope.fightDetails.p1_attack3_value);
                        instance.attackBonusText = "AP+" + instance.apBonus;
                        break;
                    case "dp":
                        instance.dpBonus = parseInt(scope.fightDetails.p1_attack3_value);
                        instance.attackBonusText = "DP+" + instance.apBonus;
                        break;
                    case "cp":
                        instance.cpBonus = parseInt(scope.fightDetails.p1_attack3_value);
                        instance.attackBonusText = "CP+" + instance.cpBonus;
                        break;
                    case "hp":
                        instance.hpBonus = parseInt(scope.fightDetails.p1_attack3_value);
                        instance.attackBonusText = "HP+" + (instance.hpBonus * 10);
                        break;
                    default:
                        instance.attackBonusText = "";
                        break;
                }
            } else if (instance.playerNumber == 2) {
                switch (scope.fightDetails.p2_attack3_attribute) {
                    case "ap":
                        instance.apBonus = parseInt(scope.fightDetails.p2_attack3_value);
                        instance.attackBonusText = "AP+" + instance.apBonus;
                        break;
                    case "dp":
                        instance.dpBonus = parseInt(scope.fightDetails.p2_attack3_value);
                        instance.attackBonusText = "DP+" + instance.apBonus;
                        break;
                    case "cp":
                        instance.cpBonus = parseInt(scope.fightDetails.p2_attack3_value);
                        instance.attackBonusText = "CP+" + instance.cpBonus;
                        break;
                    case "hp":
                        instance.hpBonus = parseInt(scope.fightDetails.p2_attack3_value);
                        instance.attackBonusText = "HP+" + (instance.hpBonus * 10);
                        break;
                    default:
                        instance.attackBonusText = "";
                        break;
                }
            }
        }
    }

    /**
     * @name setUltimate()
     * @author Juan
     * @version 1.0
     * @date 24/05/2016
     * @description sets the percentage of the ultimate based on the taken damage
     * @param damage : the taken damage
     * @param instance : pointer to this
     * @returns {n/a}
     */
    this.setUltimate = function(damage, instance) {
        instance.ultimate += (Math.floor((damage * 100) / instance.totalHealth)) + 10;
    }

    /**
     * @name calculateHealthPercent()
     * @author Juan
     * @version 1.0
     * @date 20/05/2016
     * @description calculates player health percent based on given current healt
     *      and total health
     * @param actualHealth
     * @returns {n/a}
     */
    this.calculateHealthPercent = function(actualHealth, instance) {
        instance.healthPercent = Math.floor((actualHealth * 100) / instance.totalHealth);
        $("#p" + instance.playerNumber + "healthBar").css("width", instance.healthPercent + "%");
    }

    /**
     * @name checkAnimationEvents()
     * @author Juan
     * @version 1.0
     * @date 24/05/2016
     * @description checks if the given animation has any event at a given frame
     * @param animationName : the name of the animation
     * @param currentFrame : the current frame
     * @param instance : pointer to this
     * @returns {n/a}
     */
    this.checkAnimationEvents = function(animationName, currentFrame, instance) {
        if (animationName == "attack1") {
            if (instance.skinName == "mobot") {
                if (currentFrame == 9) {
                    if (instance.playerNumber == 1)
                        scope.player2.playAnim("hit", scope.player2);
                    if (instance.playerNumber == 2)
                        scope.player1.playAnim("hit", scope.player1);
                }
            }
        }
        if (animationName == "attack2") {
            if (instance.skinName == "mobot") {
                if (currentFrame == 10) {
                    if (instance.playerNumber == 1)
                        scope.player2.playAnim("hit", scope.player2);
                    if (instance.playerNumber == 2)
                        scope.player1.playAnim("hit", scope.player1);
                }
                if (currentFrame == 16) {
                    if (instance.playerNumber == 1)
                        scope.player2.playAnim("hit", scope.player2);
                    if (instance.playerNumber == 2)
                        scope.player1.playAnim("hit", scope.player1);
                }
            }
        }
        if (animationName == "attack3") {
            if (instance.skinName == "mobot") {
                if (currentFrame == 12) {
                    if (instance.playerNumber == 1)
                        scope.player2.playAnim("hit", scope.player2);
                    if (instance.playerNumber == 2)
                        scope.player1.playAnim("hit", scope.player1);
                }
            }
        }
        if (animationName == "ultimate") {
            if (instance.skinName == "mobot") {
                if (currentFrame == 10) {
                    if (instance.playerNumber == 1)
                        scope.player2.playAnim("hit", scope.player2);
                    if (instance.playerNumber == 2)
                        scope.player1.playAnim("hit", scope.player1);
                }
            }
        }
    }

    /**
     * @name playAnim()
     * @author Juan
     * @version 1.0
     * @date 18/05/2016
     * @description plays the given anim on the current player
     * @param animationName : the name of the animation to play
     * @param instance : pointer to this
     * @returns {n/a}
     */
    this.playAnim = function(animationName, instance) {
        var topFrame = instance.animationInfo[animationName];
        //blocks the screen for the animation duration
        if (animationName == "attack1" || animationName == "attack2" ||
                animationName == "attack3" || animationName == "ultimate") {
            $("#roundWatch").hide();
            $("#roundWatchTitle").hide();
            clearInterval(roundWatch);
            var animationDuration = topFrame * 60;
            var frameCounter = 0;
            scope.game.showBlockScreen = true;
            var blockerTimer = setInterval(function() {
                frameCounter += 60;
                if (frameCounter >= animationDuration) {
                    clearInterval(blockerTimer);
                    scope.game.showBlockScreen = false;
                    scope.fightEvents.newRound();
                    scope.processRound();
                }
            }, 60);
        }
        //starts the animation
        var currentFrame = 1;
        if (this.playerNumber == 1) {
            clearInterval(p1AnimationTimer);
            instance.playerContainer = "p1ImagesContainer";
            p1AnimationTimer = setInterval(function() {
                var filePath = "images/animations/" + instance.skinName + "/" +
                        animationName + "/" + (instance.skinName).toUpperCase() +
                        "_" + (animationName).toUpperCase() + "." + putFourDigits(currentFrame) +
                        ".png";
                $("#" + instance.playerContainer).attr("src", filePath);
                if (animationName == "attack1" || animationName == "attack2" ||
                        animationName == "attack3" || animationName == "ultimate") {
                    instance.checkAnimationEvents(animationName, currentFrame, instance);
                }
                if (currentFrame == topFrame) {
                    clearInterval(p1AnimationTimer);
                    if (animationName != "win" && animationName != "die") {
                        instance.playAnim("idle", instance);
                    }
                }
                currentFrame++;
            }, 60);
        } else {
            clearInterval(p2AnimationTimer);
            instance.playerContainer = "p2ImagesContainer";
            p2AnimationTimer = setInterval(function() {
                var filePath = "images/animations/" + instance.skinName + "/" +
                        animationName + "/" + (instance.skinName).toUpperCase() +
                        "_" + (animationName).toUpperCase() + "." + putFourDigits(currentFrame) +
                        ".png";
                $("#" + instance.playerContainer).attr("src", filePath);
                if (animationName == "attack1" || animationName == "attack2" ||
                        animationName == "attack3" || animationName == "ultimate") {
                    instance.checkAnimationEvents(animationName, currentFrame, instance);
                }
                if (currentFrame == topFrame) {
                    clearInterval(p2AnimationTimer);
                    if (animationName != "win" && animationName != "die") {
                        instance.playAnim("idle", instance);
                    }
                }
                currentFrame++;
            }, 60);
        }
    }

    /**
     * @name loadImages()
     * @author Juan
     * @version 1.0
     * @date 18/05/2016
     * @description loads all information for the given skinName
     * @param skinName : the name of the skin to load
     * @param loadWindow : pointer to the loadWindow
     * @param instance : pointer to this
     * @returns {n/a}
     */
    this.loadImages = function(skinName, loadWindow, instance) {
        this.skinName = skinName;
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                {controllerType: 3, action: 105, jsonData: {skinName: skinName}});
        promise.then(function(outputData) {
            instance.animationInfo = {
                "attack1": 0,
                "attack2": 0,
                "attack3": 0,
                "die": 0,
                "guard": 0,
                "hangar": 0,
                "hit": 0,
                "idle": 0,
                "stun": 0,
                "ultimate": 0,
                "win": 0
            };
            for (var i = 0; i < outputData[1].length; i++) {
                if (outputData[1][i].name == "attack1")
                    instance.animationInfo["attack1"] = outputData[1][i].numFrames;
                if (outputData[1][i].name == "attack2")
                    instance.animationInfo["attack2"] = outputData[1][i].numFrames;
                if (outputData[1][i].name == "attack3")
                    instance.animationInfo["attack3"] = outputData[1][i].numFrames;
                if (outputData[1][i].name == "die")
                    instance.animationInfo["die"] = outputData[1][i].numFrames;
                if (outputData[1][i].name == "guard")
                    instance.animationInfo["guard"] = outputData[1][i].numFrames;
                if (outputData[1][i].name == "hangar")
                    instance.animationInfo["hangar"] = outputData[1][i].numFrames;
                if (outputData[1][i].name == "hit")
                    instance.animationInfo["hit"] = outputData[1][i].numFrames;
                if (outputData[1][i].name == "idle")
                    instance.animationInfo["idle"] = outputData[1][i].numFrames;
                if (outputData[1][i].name == "stun")
                    instance.animationInfo["stun"] = outputData[1][i].numFrames;
                if (outputData[1][i].name == "ultimate")
                    instance.animationInfo["ultimate"] = outputData[1][i].numFrames;
                if (outputData[1][i].name == "win")
                    instance.animationInfo["win"] = outputData[1][i].numFrames;
            }
            //sets the robots tooltip
            instance.setTooltips(instance);

            //loads the images into cache
            instance.loadPlayerImages(instance);
        });
    }

    /**
     * @name setTooltips()
     * @author Juan
     * @version 1.0
     * @date 19/05/2016
     * @descriptions sets the tooltip image for the current player
     * @param instance : pointer to this
     * @returns {n/a}
     */
    this.setTooltips = function(instance) {
        var toolTip;
        if (instance.playerNumber == 1) {
            toolTip = "p1Tooltip";
        } else {
            toolTip = "p2Tooltip";
        }
        $("#" + toolTip).attr("src", "images/tooltips/" + (instance.skinName).toUpperCase() + "_TOOLTIP.jpg");
    }

    /**
     * @name loadPlayerImages()
     * @author Juan
     * @version 1.0
     * @date 18/05/2016
     * @descriptin loads all player images from server and saves them into cache
     * @param instance : pointer to this
     * @returns {n/a}
     */
    this.loadPlayerImages = function(instance) {
        for (var i = 0; i < instance.animationInfo.length; i++) {
            for (var j = 1; j <= instance.animationInfo[i].numFrames; j++)
                var imagePath = "images/animations/" + instance.skinName + "/" +
                        instance.animationInfo[i].name + "/" + (instance.skinName).toUpperCase() + "_" +
                        (instance.animationInfo[i].name).toUpperCase() + "." + putFourDigits(j) + ".png";
            /*var image = new Image();
             image.src = imagePath;*/
            instance.imageList.push(imagePath);
        }
    }
}

