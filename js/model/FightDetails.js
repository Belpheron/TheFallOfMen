this.FightDetails = function (accessService, scope) {
//properties
    this.id;
    //player 1
    this.p1_id;
    this.p1_ap;
    this.p1_dp;
    this.p1_hp;
    this.p1_cp;
    this.p1_xp;
    this.p1_money;
    this.p1_skin;
    this.p1_attack1_dmg;
    this.p1_attack1_attribute;
    this.p1_attack1_value;
    this.p1_attack1_name;
    this.p1_attack1_description;
    this.p1_attack2_dmg;
    this.p1_attack2_attribute;
    this.p1_attack2_value;
    this.p1_attack2_name;
    this.p1_attack2_description;
    this.p1_attack3_dmg;
    this.p1_attack3_attribute;
    this.p1_attack3_value;
    this.p1_attack3_name;
    this.p1_attack3_description;
    this.p1IsReady = false;
    //player 2
    this.p2_id;
    this.p2_ap;
    this.p2_dp;
    this.p2_hp;
    this.p2_cp;
    this.p2_xp;
    this.p2_money;
    this.p2_skin;
    this.p2_attack1_dmg;
    this.p2_attack1_attribute;
    this.p2_attack1_value;
    this.p2_attack1_name;
    this.p2_attack1_description;
    this.p2_attack2_dmg;
    this.p2_attack2_attribute;
    this.p2_attack2_value;
    this.p2_attack2_name;
    this.p2_attack2_description;
    this.p2_attack3_dmg;
    this.p2_attack3_attribute;
    this.p2_attack3_value;
    this.p2_attack3_name;
    this.p2_attack3_description;
    this.p2IsReady = false;
    this.id_winner = 0;
    this.dataLoaded = false;
    this.loadPlayersData = function (p1, p2, instance) {
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                {controllerType: 5, action: 110, jsonData: {p1: p1, p2: p2}});
        promise.then(function (outputData) {
            if (outputData[0] === true) {
                console.log(outputData[1]);
                instance.id = outputData[1].id;
                //player1
                instance.p1_id = outputData[1].p1_id;
                instance.p1_ap = outputData[1].p1_ap;
                instance.p1_dp = outputData[1].p1_dp;
                instance.p1_hp = outputData[1].p1_hp;
                instance.p1_cp = outputData[1].p1_cp;
                instance.p1_xp = outputData[1].p1_xp;
                instance.p1_money = outputData[1].p1_money;
                instance.p1_skin = outputData[1].p1_skin;
                instance.p1_attack1_dmg = outputData[1].p1_attack1_dmg;
                instance.p1_attack1_attribute = outputData[1].p1_attack1_attribute;
                instance.p1_attack1_value = outputData[1].p1_attack1_value;
                instance.p1_attack1_name = outputData[1].p1_attack1_name;
                instance.p1_attack1_description = outputData[1].p1_attack1_description;
                instance.p1_attack2_dmg = outputData[1].p1_attack2_dmg;
                instance.p1_attack2_attribute = outputData[1].p1_attack2_attribute;
                instance.p1_attack2_value = outputData[1].p1_attack2_value;
                instance.p1_attack2_name = outputData[1].p1_attack2_name;
                instance.p1_attack2_description = outputData[1].p1_attack2_description;
                instance.p1_attack3_dmg = outputData[1].p1_attack3_dmg;
                instance.p1_attack3_attribute = outputData[1].p1_attack3_attribute;
                instance.p1_attack3_value = outputData[1].p1_attack3_value;
                instance.p1_attack3_name = outputData[1].p1_attack3_name;
                instance.p1_attack3_description = outputData[1].p1_attack3_description;
                //player 2
                instance.p2_id = outputData[1].p2_id;
                instance.p2_ap = outputData[1].p2_ap;
                instance.p2_dp = outputData[1].p2_dp;
                instance.p2_hp = outputData[1].p2_hp;
                instance.p2_cp = outputData[1].p2_cp;
                instance.p2_xp = outputData[1].p2_xp;
                instance.p2_money = outputData[1].p2_money;
                instance.p2_skin = outputData[1].p2_skin;
                instance.p2_attack1_dmg = outputData[1].p2_attack1_dmg;
                instance.p2_attack1_attribute = outputData[1].p2_attack1_attribute;
                instance.p2_attack1_value = outputData[1].p2_attack1_value;
                instance.p2_attack1_name = outputData[1].p2_attack1_name;
                instance.p2_attack1_description = outputData[1].p2_attack1_description;
                instance.p2_attack2_dmg = outputData[1].p2_attack2_dmg;
                instance.p2_attack2_attribute = outputData[1].p2_attack2_attribute;
                instance.p2_attack2_value = outputData[1].p2_attack2_value;
                instance.p2_attack2_name = outputData[1].p2_attack2_name;
                instance.p2_attack2_description = outputData[1].p2_attack2_description;
                instance.p2_attack3_dmg = outputData[1].p2_attack3_dmg;
                instance.p2_attack3_attribute = outputData[1].p2_attack3_attribute;
                instance.p2_attack3_value = outputData[1].p2_attack3_value;
                instance.p2_attack3_name = outputData[1].p2_attack3_name;
                instance.p2_attack3_description = outputData[1].p2_attack3_description;
                instance.id_winner = 0;
                instance.dataLoaded = true;
                console.log(instance);
            } else {
                alert("Error loading game. Redirecting...");
                window.open("mainWindow.php", "_self");
            }
        });
    }

    /**
     * @name startFight()
     * @author Juan
     * @version 1.0
     * @date 16/05/2016
     * @description sets the fight-is-ready to 1 and redirects to the fight screen
     * @returns {n/a}
     */
    this.startFight = function () {
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                {controllerType: 5, action: 108, jsonData: {player1: this.p1_id, player2: this.p2_id}});
        promise.then(function (outputData) {
            if (outputData[0] === true) {
                window.open("fightWindow.php");
            } else {
                alert("Error starting fight. Please try later.");
            }
        });
    }

    /**
     * @name loadPlayer1()
     * @author Juan
     * @version 1.0
     * @date 16/05/2016
     * @description loads all details for fight for player 1
     * @param playerName : the name of the player to load as player 1
     * @returns {n/a}
     */
    this.loadPlayer1 = function (playerName, instance) {
        if (playerName == "_local") {
            var implants;
            var attributes;
            instance.p1_id = scope.currentUser.userName;
            instance.p1_xp = 0;
            instance.p1_money = 0;
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                    {controllerType: 3, action: 101, jsonData: {userName: scope.currentUser.getUserName()}});
            promise.then(function (outputData) {
                implants = outputData[1];
                var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                        {controllerType: 3, action: 102, jsonData: {userName: scope.currentUser.getUserName()}});
                promise.then(function (outputData) {
                    attributes = outputData[1];
                    //sums implants to attributes                            
                    for (var i = 0; i < attributes.length; i++) {
                        switch (attributes[i].iso) {
                            case "ap":
                                instance.p1_ap = parseInt(attributes[i].value);
                                break;
                            case "dp":
                                instance.p1_dp = parseInt(attributes[i].value);
                                break;
                            case "cp":
                                instance.p1_cp = parseInt(attributes[i].value);
                                break;
                            case "hp":
                                instance.p1_hp = parseInt(attributes[i].value);
                                break;
                            default:
                                break;
                        }
                        for (var j = 0; j < implants.length; j++) {
                            if (attributes[i].iso == implants[j].attribute) {
                                switch (attributes[i].iso) {
                                    case "ap":
                                        instance.p1_ap = parseInt(attributes[i].value) + parseInt(implants[j].value);
                                        break;
                                    case "dp":
                                        instance.p1_dp = parseInt(attributes[i].value) + parseInt(implants[j].value);
                                        break;
                                    case "cp":
                                        instance.p1_cp = parseInt(attributes[i].value) + parseInt(implants[j].value);
                                        break;
                                    case "hp":
                                        instance.p1_hp = parseInt(attributes[i].value) + parseInt(implants[j].value);
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }
                    }
                    //sets skin name
                    var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                            {controllerType: 3, action: 103, jsonData: {idSkin: scope.currentUser.robotStatistic.idRobotSkin}});
                    promise.then(function (outputData) {
                        if (outputData[0] === true) {
                            instance.p1_skin = outputData[1].name;
                            //loads player attacks
                            var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                                    {controllerType: 3, action: 104, jsonData: {userName: scope.currentUser.getUserName()}});
                            promise.then(function (outputData) {
                                if (outputData[0] === true) {
                                    var dmg;
                                    var mult;
                                    //attack1
                                    mult = parseFloat(outputData[1][0].multiplier);
                                    dmg = parseInt(10 * mult);
                                    instance.p1_attack1_dmg = dmg;
                                    instance.p1_attack1_attribute = outputData[1][0].attribute;
                                    instance.p1_attack1_description = outputData[1][0].description;
                                    instance.p1_attack1_name = outputData[1][0].name;
                                    instance.p1_attack1_value = outputData[1][0].value;
                                    //attack2
                                    mult = parseFloat(outputData[1][1].multiplier);
                                    dmg = parseInt(10 * mult);
                                    instance.p1_attack2_dmg = dmg;
                                    instance.p1_attack2_attribute = outputData[1][1].attribute;
                                    instance.p1_attack2_description = outputData[1][1].description;
                                    instance.p1_attack2_name = outputData[1][1].name;
                                    instance.p1_attack2_value = outputData[1][1].value;
                                    //attack3
                                    mult = parseFloat(outputData[1][2].multiplier);
                                    dmg = parseInt(10 * mult);
                                    instance.p1_attack3_dmg = dmg;
                                    instance.p1_attack3_attribute = outputData[1][2].attribute;
                                    instance.p1_attack3_description = outputData[1][2].description;
                                    instance.p1_attack3_name = outputData[1][2].name;
                                    instance.p1_attack3_value = outputData[1][2].value;
                                    //sets player 1 as ready
                                    instance.p1IsReady = true;
                                } else {
                                    alert("Error loading attacks.");
                                }
                            });
                        } else {
                            alert("Error loading skins. Try later.");
                        }
                    });
                })
            });
        } else {
            var implants;
            var attributes;
            instance.p1_id = playerName;
            instance.p1_xp = 0;
            instance.p1_money = 0;
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                    {controllerType: 3, action: 101, jsonData: {userName: instance.p1_id}});
            promise.then(function (outputData) {
                implants = outputData[1];
                var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                        {controllerType: 3, action: 102, jsonData: {userName: playerName}});
                promise.then(function (outputData) {
                    attributes = outputData[1];
                    //sums implants to attributes
                    for (var i = 0; i < attributes.length; i++) {
                        switch (attributes[i].iso) {
                            case "ap":
                                instance.p1_ap = parseInt(attributes[i].value);
                                break;
                            case "dp":
                                instance.p1_dp = parseInt(attributes[i].value);
                                break;
                            case "cp":
                                instance.p1_cp = parseInt(attributes[i].value);
                                break;
                            case "hp":
                                instance.p1_hp = parseInt(attributes[i].value);
                                break;
                            default:
                                break;
                        }
                        for (var j = 0; j < implants.length; j++) {
                            if (attributes[i].iso == implants[j].attribute) {
                                switch (attributes[i].iso) {
                                    case "ap":
                                        instance.p1_ap = parseInt(attributes[i].value) + parseInt(implants[j].value);
                                        break;
                                    case "dp":
                                        instance.p1_dp = parseInt(attributes[i].value) + parseInt(implants[j].value);
                                        break;
                                    case "cp":
                                        instance.p1_cp = parseInt(attributes[i].value) + parseInt(implants[j].value);
                                        break;
                                    case "hp":
                                        instance.p1_hp = parseInt(attributes[i].value) + parseInt(implants[j].value);
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }
                    }
                    var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                            {controllerType: 2, action: 100, jsonData: {userName: playerName}});
                    promise.then(function (outputData) {
                        var user = outputData[1];
                        //sets skin name
                        var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                                {controllerType: 3, action: 103, jsonData: {idSkin: user.robotStatistic.idRobotSkin}});
                        promise.then(function (outputData) {
                            if (outputData[0] === true) {
                                instance.p1_skin = outputData[1].name;
                                //loads player attacks
                                var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                                        {controllerType: 3, action: 104, jsonData: {userName: playerName}});
                                promise.then(function (outputData) {
                                    if (outputData[0] === true) {
                                        var dmg;
                                        var mult;
                                        //attack1
                                        mult = parseFloat(outputData[1][0].multiplier);
                                        dmg = parseInt(10 * mult);
                                        instance.p1_attack1_dmg = dmg;
                                        instance.p1_attack1_attribute = outputData[1][0].attribute;
                                        instance.p1_attack1_description = outputData[1][0].description;
                                        instance.p1_attack1_name = outputData[1][0].name;
                                        instance.p1_attack1_value = outputData[1][0].value;
                                        //attack2
                                        mult = parseFloat(outputData[1][1].multiplier);
                                        dmg = parseInt(10 * mult);
                                        instance.p1_attack2_dmg = dmg;
                                        instance.p1_attack2_attribute = outputData[1][1].attribute;
                                        instance.p1_attack2_description = outputData[1][1].description;
                                        instance.p1_attack2_name = outputData[1][1].name;
                                        instance.p1_attack2_value = outputData[1][1].value;
                                        //attack3
                                        mult = parseFloat(outputData[1][2].multiplier);
                                        dmg = parseInt(10 * mult);
                                        instance.p1_attack3_dmg = dmg;
                                        instance.p1_attack3_attribute = outputData[1][2].attribute;
                                        instance.p1_attack3_description = outputData[1][2].description;
                                        instance.p1_attack3_name = outputData[1][2].name;
                                        instance.p1_attack3_value = outputData[1][2].value;
                                        //sets player 1 as ready
                                        instance.p1IsReady = true;
                                    } else {
                                        alert("Error loading attacks.");
                                    }
                                });
                            } else {
                                alert("Error loading skins. Try later.");
                            }
                        });
                    });
                })
            });
        }
    }

    /**
     * @name loadPlayer2()
     * @author Juan
     * @version 1.0
     * @date 16/05/2016
     * @description loads all fight details for player 2
     * @param playerName : the userName to load as player 2
     * @returns {n/a}
     */
    this.loadPlayer2 = function (playerName, instance) {
        if (playerName == "_local") {
            var implants;
            var attributes;
            instance.p2_id = scope.currentUser.userName;
            instance.p2_xp = 0;
            instance.p2_money = 0;
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                    {controllerType: 3, action: 101, jsonData: {userName: scope.currentUser.getUserName()}});
            promise.then(function (outputData) {
                implants = outputData[1];
                var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                        {controllerType: 3, action: 102, jsonData: {userName: scope.currentUser.getUserName()}});
                promise.then(function (outputData) {
                    attributes = outputData[1];
                    //sums implants to attributes
                    for (var i = 0; i < attributes.length; i++) {
                        switch (attributes[i].iso) {
                            case "ap":
                                instance.p2_ap = parseInt(attributes[i].value);
                                break;
                            case "dp":
                                instance.p2_dp = parseInt(attributes[i].value);
                                break;
                            case "cp":
                                instance.p2_cp = parseInt(attributes[i].value);
                                break;
                            case "hp":
                                instance.p2_hp = parseInt(attributes[i].value);
                                break;
                            default:
                                break;
                        }
                        for (var j = 0; j < implants.length; j++) {
                            if (attributes[i].iso == implants[j].attribute) {
                                switch (attributes[i].iso) {
                                    case "ap":
                                        instance.p2_ap = parseInt(attributes[i].value) + parseInt(implants[j].value);
                                        break;
                                    case "dp":
                                        instance.p2_dp = parseInt(attributes[i].value) + parseInt(implants[j].value);
                                        break;
                                    case "cp":
                                        instance.p2_cp = parseInt(attributes[i].value) + parseInt(implants[j].value);
                                        break;
                                    case "hp":
                                        instance.p2_hp = parseInt(attributes[i].value) + parseInt(implants[j].value);
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }
                    }
                    //sets skin name
                    var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                            {controllerType: 3, action: 103, jsonData: {idSkin: scope.currentUser.robotStatistic.idRobotSkin}});
                    promise.then(function (outputData) {
                        if (outputData[0] === true) {
                            instance.p2_skin = outputData[1].name;
                            //loads player attacks
                            var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                                    {controllerType: 3, action: 104, jsonData: {userName: scope.currentUser.getUserName()}});
                            promise.then(function (outputData) {
                                if (outputData[0] === true) {
                                    var dmg;
                                    var mult;
                                    //attack1
                                    mult = parseFloat(outputData[1][0].multiplier);
                                    dmg = parseInt(10 * mult);
                                    instance.p2_attack1_dmg = dmg;
                                    instance.p2_attack1_attribute = outputData[1][0].attribute;
                                    instance.p2_attack1_description = outputData[1][0].description;
                                    instance.p2_attack1_name = outputData[1][0].name;
                                    instance.p2_attack1_value = outputData[1][0].value;
                                    //attack2
                                    mult = parseFloat(outputData[1][1].multiplier);
                                    dmg = parseInt(10 * mult);
                                    instance.p2_attack2_dmg = dmg;
                                    instance.p2_attack2_attribute = outputData[1][1].attribute;
                                    instance.p2_attack2_description = outputData[1][1].description;
                                    instance.p2_attack2_name = outputData[1][1].name;
                                    instance.p2_attack2_value = outputData[1][1].value;
                                    //attack3
                                    mult = parseFloat(outputData[1][2].multiplier);
                                    dmg = parseInt(10 * mult);
                                    instance.p2_attack3_dmg = dmg;
                                    instance.p2_attack3_attribute = outputData[1][2].attribute;
                                    instance.p2_attack3_description = outputData[1][2].description;
                                    instance.p2_attack3_name = outputData[1][2].name;
                                    instance.p2_attack3_value = outputData[1][2].value;
                                    //sets player 2 as ready
                                    instance.p2IsReady = true;
                                } else {
                                    alert("Error loading attacks.");
                                }
                            });
                        } else {
                            alert("Error loading skins. Try later.");
                        }
                    })
                })
            });
        } else {
            var implants;
            var attributes;
            instance.p2_id = playerName;
            instance.p2_xp = 0;
            instance.p2_money = 0;
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                    {controllerType: 3, action: 101, jsonData: {userName: playerName}});
            promise.then(function (outputData) {
                implants = outputData[1];
                var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                        {controllerType: 3, action: 102, jsonData: {userName: playerName}});
                promise.then(function (outputData) {
                    if (outputData[0] === true) {
                        //sums implants to attributes
                        attributes = outputData[1];
                        for (var i = 0; i < attributes.length; i++) {
                            switch (attributes[i].iso) {
                                case "ap":
                                    instance.p2_ap = parseInt(attributes[i].value);
                                    break;
                                case "dp":
                                    instance.p2_dp = parseInt(attributes[i].value);
                                    break;
                                case "cp":
                                    instance.p2_cp = parseInt(attributes[i].value);
                                    break;
                                case "hp":
                                    instance.p2_hp = parseInt(attributes[i].value);
                                    break;
                                default:
                                    break;
                            }
                            for (var j = 0; j < implants.length; j++) {
                                if (attributes[i].iso == implants[j].attribute) {
                                    switch (attributes[i].iso) {
                                        case "ap":
                                            instance.p2_ap = parseInt(attributes[i].value) + parseInt(implants[j].value);
                                            break;
                                        case "dp":
                                            instance.p2_dp = parseInt(attributes[i].value) + parseInt(implants[j].value);
                                            break;
                                        case "cp":
                                            instance.p2_cp = parseInt(attributes[i].value) + parseInt(implants[j].value);
                                            break;
                                        case "hp":
                                            instance.p2_hp = parseInt(attributes[i].value) + parseInt(implants[j].value);
                                            break;
                                        default:
                                            break;
                                    }
                                }
                            }
                        }
                        var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                                {controllerType: 2, action: 100, jsonData: {userName: playerName}});
                        promise.then(function (outputData) {
                            //sets skin name
                            var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                                    {controllerType: 3, action: 103, jsonData: {idSkin: outputData[4].idRobotSkin}});
                            promise.then(function (outputData) {
                                if (outputData[0] === true) {
                                    instance.p2_skin = outputData[1].name;
                                    //loads player attacks
                                    var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                                            {controllerType: 3, action: 104, jsonData: {userName: playerName}});
                                    promise.then(function (outputData) {
                                        if (outputData[0] === true) {
                                            var dmg;
                                            var mult;
                                            //attack1
                                            mult = parseFloat(outputData[1][0].multiplier);
                                            dmg = parseInt(10 * mult);
                                            instance.p2_attack1_dmg = dmg;
                                            instance.p2_attack1_attribute = outputData[1][0].attribute;
                                            instance.p2_attack1_description = outputData[1][0].description;
                                            instance.p2_attack1_name = outputData[1][0].name;
                                            instance.p2_attack1_value = outputData[1][0].value;
                                            //attack2
                                            mult = parseFloat(outputData[1][1].multiplier);
                                            dmg = parseInt(10 * mult);
                                            instance.p2_attack2_dmg = dmg;
                                            instance.p2_attack2_attribute = outputData[1][1].attribute;
                                            instance.p2_attack2_description = outputData[1][1].description;
                                            instance.p2_attack2_name = outputData[1][1].name;
                                            instance.p2_attack2_value = outputData[1][1].value;
                                            //attack3
                                            mult = parseFloat(outputData[1][2].multiplier);
                                            dmg = parseInt(10 * mult);
                                            instance.p2_attack3_dmg = dmg;
                                            instance.p2_attack3_attribute = outputData[1][2].attribute;
                                            instance.p2_attack3_description = outputData[1][2].description;
                                            instance.p2_attack3_name = outputData[1][2].name;
                                            instance.p2_attack3_value = outputData[1][2].value;
                                            //sets player 2 as ready
                                            instance.p2IsReady = true;
                                        } else {
                                            alert("Error loading attacks.");
                                        }
                                    });
                                } else {
                                    alert("Error loading skins. Try later.");
                                }
                            });
                        });
                    }
                });
            });
        }
    }
}


