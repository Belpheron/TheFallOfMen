this.Game = function(accessService, scope) {
    //properties
    scope.fightDetails = new FightDetails(accessService, scope);
    scope.player1;
    scope.player2;
    scope.userName;
    scope.loadWindow = new LoadWindow(scope);
    scope.fightEvents = new FightEvents();
    scope.playerContainer;
    scope.roundNumber = 20;
    scope.roundTimer;
    this.showBlockScreen = false;
    this.msg = new MessageTool();
    this.animationIsPlaying = false;
    this.showPlayer1ResultWindow = false;
    this.showPlayer2ResultWindow = false;
    this.fightResults = new FightResults();

    //methods     
    /**
     * @name showfightResults()
     * @author Juan
     * @version 1.0
     * @date 23/05/2016
     * @description gets fight information and shows it to the user in a pop up window
     *      Algo saves the information to the database
     * @param winner : the number of winner player
     * @returns {n/a}
     */
    this.showFightResults = function(winner) {
        scope.game.showBlockScreen = true;

        //calculates result data
        //combat experience
        scope.player1.combatXp = Math.floor(scope.player1.totalDamage / 10);
        //win experience
        if (scope.fightDetails.id_winner == scope.player1.playerNumber) {
            scope.player1.winXp = 20;
        }
        //combat coins
        scope.player1.combatCoins = Math.floor(scope.player1.totalDamage / 25);
        //win coins
        if (scope.fightDetails.id_winner == scope.player1.playerNumber) {
            scope.player1.winCoins = 5;
        }
        //calculates result data
        //combat experience
        scope.player2.combatXp = Math.floor(scope.player2.totalDamage / 10);
        //win experience
        if (scope.fightDetails.id_winner == scope.player2.playerNumber) {
            scope.player2.winXp = 20;
        }
        //combat coins
        scope.player2.combatCoins = Math.floor(scope.player2.totalDamage / 25);
        //win coins
        if (scope.fightDetails.id_winner == scope.player2.playerNumber) {
            scope.player2.winCoins = 5;
        }

        //saves fight results into the database if its the player 1
        if (scope.userName == scope.player1.playerName) {
            //player1
            scope.game.showPlayer1ResultWindow = true;
            scope.game.fightResults.p1_id = scope.player1.playerName;
            scope.game.fightResults.p1_xp = scope.player1.combatXp + scope.player1.winXp;
            scope.game.fightResults.p1_money = scope.player1.combatCoins + scope.player1.winCoins;
            if (scope.fightDetails.id_winner == 1) {
                scope.game.fightResults.id_winner = scope.fightDetails.p1_id;
                scope.game.fightResults.id_defeated = scope.fightDetails.p2_id;
            }

            //player2
            scope.game.fightResults.p2_id = scope.player2.playerName;
            scope.game.fightResults.p2_xp = scope.player2.combatXp + scope.player2.winXp;
            scope.game.fightResults.p2_money = scope.player2.combatCoins + scope.player2.winCoins;
            if (scope.fightDetails.id_winner == 2) {
                scope.game.fightResults.id_winner = scope.fightDetails.p2_id;
                scope.game.fightResults.id_defeated = scope.fightDetails.p1_id;
            }

            //updates database
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                    {controllerType: 5, action: 116, jsonData: JSON.stringify(scope.game.fightResults)});
            promise.then(function(outputData) {
                var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                        {controllerType: 5, action: 117, jsonData: {eventId:scope.fightEvents.id, fightId:scope.fightDetails.id}});
                promise.then(function(outputData) {
                    if (outputData[0] === false) {
                        alert("Error saving fight data. Redirecting...");
                        window.open("mainWindow.php?error=3", "_self");
                    }
                });
            });
        } else {
            scope.game.showPlayer2ResultWindow = true;
        }
    }

    /**
     * @name endFight()
     * @author Juan
     * @version 1.0
     * @date 23/05/2016
     * @description redirects to the main menu window
     * @returns {n/a}
     */
    this.endFight = function() {
        window.open("mainWindow.php", "_self");
    }

    /**
     * @name setAction()
     * @author Juan
     * @version 1.0
     * @date 23/05/2016
     * @description saves the selected user action (rock, paper, scissors or ultimate)
     * @param actionName : the name of the action
     * @param playerNumber : the number of the player who selected the action
     * @returns {n/a}
     */
    this.setAction = function(actionName, playerNumber) {
        if (playerNumber == 1) {
            scope.fightEvents.player1Action = actionName;
        } else {
            scope.fightEvents.player2Action = actionName;
        }
    }

    /**
     * @name start()
     * @author Juan
     * @version 1.0
     * @date 23/05/2016
     * @description hides the load window, sets the default containers for the 
     *      players and sets the default animation
     * @returns {n/a}
     */
    this.start = function() {
        //hides de load window
        scope.loadWindow.hide();
        //sets the default container for the current player
        if (scope.player1 == scope.userName) {
            scope.playerContainer = "p1ImagesContainer";
        } else {
            scope.playerContainer = "p2ImagesContainer";
        }
        //sets the default idle animation
        scope.player1.playAnim("idle", scope.player1);
        scope.player2.playAnim("idle", scope.player2);

        //starts the game rounds 
        scope.processRound();
    }

    /**
     * @name processround()
     * @author Juan
     * @version 1.0
     * @date 23/05/2016
     * @description function that will be executed each round, checks if both players has 
     *      chosen an action and then processes that actoin
     * @returns {n/a}
     */
    scope.processRound = function() {
        scope.roundTimer = 15;
        $("#roundWatch").show();
        $("#roundWatchTitle").show();
        roundWatch = setInterval(function() {
            scope.roundTimer--;
        }, 1000);
        roundIntervalTimer = setInterval(function() {
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                    {controllerType: 5, action: 115, jsonData: JSON.stringify(scope.fightEvents)});
            promise.then(function(outputData) {
                if (outputData[0] === true) {                    
                    console.log(outputData[1]);
                    if ((outputData[1].player1Action != "null" && outputData[1].player2Action != "null") ||
                            scope.roundTimer == 0 || scope.roundNumber < 0 || outputData[1].p1Health <= 0 ||
                            outputData[1].p2Health <= 0 || outputData[1].player1Action == "ultimate" || 
                            outputData[1].player2Action == "ultimate") {
                        clearInterval(roundIntervalTimer);
                        clearInterval(roundWatch);
                        //saves the round data
                        scope.fightEvents.player1Action = outputData[1].player1Action;
                        scope.fightEvents.player2Action = outputData[1].player2Action;
                        scope.checkRoundResult();
                    }
                } 
            });
        }, 500);
        scope.roundNumber--;
    }

    /**
     * @name checkRoundResult()
     * @author Juan
     * @version 1.0
     * @date 23/05/20126
     * @description once all players have chosen an action, checks for the action result
     * @returns {n/a}
     */
    scope.checkRoundResult = function() {
        //checks if rounds has finished
        if (scope.roundNumber < 0 || scope.fightEvents.p1Health <= 0 || scope.fightEvents.p2Health <= 0) {
            if (scope.fightEvents.p1Health > scope.fightEvents.p2Health) {
                scope.game.msg.showMessage(scope.player1.playerName + " WINS!!", "center");
                scope.player1.playAnim("win", scope.player1);
                scope.player2.playAnim("die", scope.player2);
                scope.fightDetails.id_winner = 1;
            } else if (scope.fightEvents.p1Health < scope.fightEvents.p2Health) {
                scope.game.msg.showMessage(scope.player2.playerName + " WINS!!", "center");
                scope.player1.playAnim("die", scope.player1);
                scope.player2.playAnim("win", scope.player2);
                scope.fightDetails.id_winner = 2;
            } else {
                scope.game.msg.showMessage("GAME IS A DRAW!!", "center");
                scope.player1.playAnim("stun", scope.player1);
                scope.player2.playAnim("stun", scope.player2);
                scope.fightDetails.id_winner = 3;
            }
            scope.fightEvents.winner = -1;
        } else {
            //checks if round has finished without user action
            if (scope.roundTimer == 0) {
                if (scope.fightEvents.player1Action == "null" &&
                        scope.fightEvents.player2Action == "null") {
                    scope.fightEvents.winner = 3;
                } else {
                    if (scope.fightEvents.player1Action == "null") {
                        scope.fightEvents.winner = 2;
                    } else {
                        scope.fightEvents.winner = 1;
                    }
                }
            } else {
                if (scope.fightEvents.player1Action == scope.fightEvents.player2Action) {
                    scope.fightEvents.winner = 3;
                } else if (scope.fightEvents.player1Action == "ultimate") {
                    scope.fightEvents.winner = 1;
                } else if (scope.fightEvents.player2Action == "ultimate") {
                    scope.fightEvents.winner = 2;
                } else if (scope.fightEvents.player1Action == "rock") {
                    if (scope.fightEvents.player2Action == "scissors" ||
                            scope.fightEvents.player2Action == "null") {
                        scope.fightEvents.winner = 1;
                    } else {
                        scope.fightEvents.winner = 2;
                    }
                } else if (scope.fightEvents.player1Action == "paper") {
                    if (scope.fightEvents.player2Action == "rock") {
                        scope.fightEvents.winner = 1;
                    } else {
                        scope.fightEvents.winner = 2;
                    }
                } else if (scope.fightEvents.player1Action == "scissors") {
                    if (scope.fightEvents.player2Action == "paper") {
                        scope.fightEvents.winner = 1;
                    } else {
                        scope.fightEvents.winner = 2;
                    }
                }
            }
        }
        //performs winner attack
        if (scope.fightEvents.winner == 1 || scope.fightEvents.winner == 2) {
            if (scope.fightEvents.winner == 1) {
                scope.performAttack(1);
            } else {
                scope.performAttack(2);
            }
        } else if (scope.fightEvents.winner == 3) {
            scope.game.msg.showMessage("DRAW! New round!!", "center");
            scope.fightEvents.newRound();
            scope.player1.resetBonus(scope.player1);
            scope.player2.resetBonus(scope.player2);
            scope.processRound();
        } else if (scope.fightEvents.winner == -1) {
            scope.game.showFightResults(-1);
        }
    }

    scope.performAttack = function(playerNumber) {
        var damage = 0;
        var action;
        var topFrame;
        var attackName;
        if (playerNumber == 1) {
            action = scope.fightEvents.player1Action;
            //player 1 attacks            
            if (action == "rock") {
                attackName = "attack1";
                scope.player1.playAnim("attack1", scope.player1);                
                topFrame = scope.player1.animationInfo["attack1"];
                damage = parseInt(scope.fightDetails.p1_attack1_dmg) + parseInt(scope.fightDetails.p1_ap) + parseInt(scope.player1.apBonus) -
                        parseInt(scope.fightDetails.p2_dp) - parseInt(scope.player2.dpBonus);
            } else if (action == "paper") {
                attackName = "attack2";
                scope.player1.playAnim("attack2", scope.player1);
                topFrame = scope.player1.animationInfo["attack2"];
                damage = parseInt(scope.fightDetails.p1_attack2_dmg) + parseInt(scope.fightDetails.p1_ap) + parseInt(scope.player1.apBonus) -
                        parseInt(scope.fightDetails.p2_dp) - parseInt(scope.player2.dpBonus);
            } else if (action == "scissors") {
                attackName = "attack3";
                scope.player1.playAnim("attack3", scope.player1);
                topFrame = scope.player1.animationInfo["attack3"];
                damage = parseInt(scope.fightDetails.p1_attack3_dmg) + parseInt(scope.fightDetails.p1_ap) + parseInt(scope.player1.apBonus) -
                        parseInt(scope.fightDetails.p2_dp) - parseInt(scope.player2.dpBonus);
            } else if (action == "ultimate") {
                scope.player1.ultimate = 5000;
                scope.player1.playAnim("ultimate", scope.player1);
                topFrame = scope.player1.animationInfo["ultimate"];
                damage = (parseInt(scope.fightDetails.p1_ap) * 8 + parseInt(scope.player1.apBonus)) - 
                        parseInt(scope.fightDetails.p2_dp) - parseInt(scope.player2.dpBonus);
            } 
            if (scope.player1.hpBonus != 0) {
                scope.fightEvents.p1Health += parseInt(scope.player1.hpBonus);
                scope.game.msg.showMessage("+" + scope.player1.hpBonus, "player1", "green");
                scope.player1.calculateHealthPercent(scope.fightEvents.p1Health, scope.player1);
            }
            scope.fightEvents.p2Health = scope.fightEvents.p2Health - damage;
            scope.player1.totalDamage += damage;
            scope.player2.setUltimate(damage, scope.player2);
            scope.game.fightResults.p1_total_damage += damage;
            scope.game.fightResults.p2_received_damage += damage;
            scope.game.msg.showMessage("-" + damage, "player2");
            scope.player2.calculateHealthPercent(scope.fightEvents.p2Health, scope.player2);
            scope.player1.resetBonus(scope.player1);
            scope.player2.resetBonus(scope.player2);
            scope.player1.setAttackBonus(attackName, scope.player1);
        } else {
            action = scope.fightEvents.player2Action;
            //player 2 attacks
            if (action == "rock") {
                attackName = "attack1";
                scope.player2.playAnim("attack1", scope.player2);
                topFrame = scope.player2.animationInfo["attack1"];
                damage = parseInt(scope.fightDetails.p2_attack1_dmg) + parseInt(scope.fightDetails.p2_ap) + parseInt(scope.player2.apBonus) -
                        parseInt(scope.fightDetails.p1_dp) - parseInt(scope.player1.dpBonus);
            } else if (action == "paper") {
                attackName = "attack2";
                scope.player2.playAnim("attack2", scope.player2);
                topFrame = scope.player2.animationInfo["attack2"];
                damage = parseInt(scope.fightDetails.p2_attack2_dmg) + parseInt(scope.fightDetails.p2_ap) + parseInt(scope.player2.apBonus) -
                        parseInt(scope.fightDetails.p1_dp) - parseInt(scope.player1.dpBonus);
            } else if (action == "scissors") {
                attackName = "attack3";
                scope.player2.playAnim("attack3", scope.player2);
                topFrame = scope.player2.animationInfo["attack3"];
                damage = parseInt(scope.fightDetails.p2_attack3_dmg) + parseInt(scope.fightDetails.p2_ap) + parseInt(scope.player2.apBonus) -
                        parseInt(scope.fightDetails.p1_dp) - parseInt(scope.player1.dpBonus);
            } else if (action == "ultimate") {
                scope.player2.ultimate = 5000;
                scope.player2.playAnim("ultimate", scope.player2);
                topFrame = scope.player2.animationInfo["ultimate"];
                damage = (parseInt(scope.fightDetails.p2_ap) * 8 + parseInt(scope.player2.apBonus)) - 
                        parseInt(scope.fightDetails.p1_dp) - parseInt(scope.player1.dpBonus);
            }
            if (scope.player2.hpBonus != 0) {
                scope.fightEvents.p2Health += scope.player2.hpBonus;
                scope.game.msg.showMessage("+" + scope.player2.hpBonus, "player2", "green");
                scope.player2.calculateHealthPercent(scope.fightEvents.p2Health, scope.player2);
            }
            scope.fightEvents.p1Health = scope.fightEvents.p1Health - damage;
            scope.player2.totalDamage += damage;
            scope.player1.setUltimate(damage, scope.player1);
            scope.game.fightResults.p2_total_damage += damage;
            scope.game.fightResults.p1_received_damage += damage;
            scope.game.msg.showMessage("-" + damage, "player1");
            scope.player1.calculateHealthPercent(scope.fightEvents.p1Health, scope.player1);
            scope.player2.resetBonus(scope.player2);
            scope.player1.resetBonus(scope.player1);
            scope.player2.setAttackBonus(attackName, scope.player2);
        }
    }


    /**
     * @name load()
     * @author Juan
     * @version 1.0
     * @date 18/05/2016
     * @descriptions loads all neccessary data for game start and sets both players
     *      ready
     * @param player1 : the name of the player1
     * @param player2 : the name of the player2
     * @param userName : the name of the current user
     * @returns {n/a}
     */
    this.load = function(player1, player2, userName) {
        //creates fight events table
        if (player1 == userName) {
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                    {controllerType: 5, action: 111, jsonData: {player1: player1, player2: player2}});
            promise.then(function(outputData) {
                //saves fight event id
                scope.fightEvents.id = outputData[1].id;
                scope.fightEvents.currentPlayer = 1;
                //loads data
                scope.userName = userName;
                scope.loadWindow.show();
                scope.fightDetails.loadPlayersData(player1, player2, scope.fightDetails);
                var timer = setInterval(function() {
                    if (scope.fightDetails.dataLoaded) {
                        //sets players health
                        scope.fightEvents.p1Health = parseInt(scope.fightDetails.p1_hp * 12);
                        scope.fightEvents.p2Health = parseInt(scope.fightDetails.p2_hp * 12);
                        //creates players and loads animations
                        clearInterval(timer);
                        scope.player1 = new Player(scope.fightDetails.p1_id, 1, accessService, scope);
                        scope.player1.totalHealth = scope.fightEvents.p1Health;
                        scope.player2 = new Player(scope.fightDetails.p2_id, 2, accessService, scope);
                        scope.player2.totalHealth = scope.fightEvents.p2Health;
                        scope.player1.loadImages(scope.fightDetails.p1_skin, scope.loadWindow, scope.player1);
                        scope.loadWindow.setPercentage(50);
                        scope.player2.loadImages(scope.fightDetails.p2_skin, scope.loadWindow, scope.player2);
                        scope.loadWindow.setPercentage(100);

                        //once all data is loaded, sets que p1IsReady state to 1                        
                        var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                                {controllerType: 5, action: 112, jsonData: {id: scope.fightEvents.id, player: 1}});
                        promise.then(function(outputData) {
                            //starts events to see if both players are ready
                            var timerReady = setInterval(function() {
                                var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                                        {controllerType: 5, action: 113, jsonData: {id: scope.fightEvents.id}});
                                promise.then(function(outputData) {
                                    if (outputData[0].p1IsReady == "1" && outputData[1].p2IsReady == "1") {
                                        clearInterval(timerReady);
                                        scope.game.start();
                                    }
                                });
                            }, 500);
                        });
                    }
                }, 200);
            });
        } else {
            var timer = setInterval(function() {
                //if its not the player1, wait to see if fight_events table is created
                var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                        {controllerType: 5, action: 114, jsonData: {player1: player1, player2: player2}});
                promise.then(function(outputData) {
                    if (outputData[0] === true) {
                        clearInterval(timer);
                        scope.fightEvents.id = outputData[1].id;
                        scope.fightEvents.currentPlayer = 2;
                        //loads data
                        scope.userName = userName;
                        //shows load window
                        scope.loadWindow.show();
                        scope.fightDetails.loadPlayersData(player1, player2, scope.fightDetails);
                        var timerLoad = setInterval(function() {
                            if (scope.fightDetails.dataLoaded) {
                                //sets players health
                                scope.fightEvents.p1Health = parseInt(scope.fightDetails.p1_hp * 12);
                                scope.fightEvents.p2Health = parseInt(scope.fightDetails.p2_hp * 12);
                                //creates players and loads animations
                                clearInterval(timerLoad);
                                scope.player1 = new Player(scope.fightDetails.p1_id, 1, accessService, scope);
                                scope.player1.totalHealth = scope.fightEvents.p1Health;
                                scope.player2 = new Player(scope.fightDetails.p2_id, 2, accessService, scope);
                                scope.player2.totalHealth = scope.fightEvents.p2Health;
                                scope.player1.loadImages(scope.fightDetails.p1_skin, scope.loadWindow, scope.player1);
                                scope.loadWindow.setPercentage(50);
                                scope.player2.loadImages(scope.fightDetails.p2_skin, scope.loadWindow, scope.player2);
                                scope.loadWindow.setPercentage(100);

                                //once all data is loaded, sets que p2IsReady state to 1                        
                                var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                                        {controllerType: 5, action: 112, jsonData: {id: scope.fightEvents.id, player: 2}});
                                promise.then(function(outputData) {
                                    //starts events to see if both players are ready
                                    var timerReady = setInterval(function() {
                                        var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                                                {controllerType: 5, action: 113, jsonData: {id: scope.fightEvents.id}});
                                        promise.then(function(outputData) {
                                            if (outputData[0].p1IsReady == "1" && outputData[1].p2IsReady == "1") {
                                                clearInterval(timerReady);
                                                scope.game.start();
                                            }
                                        });
                                    }, 500);
                                });
                            }
                        }, 200);
                    }
                });
            }, 500);
        }
    }
}

