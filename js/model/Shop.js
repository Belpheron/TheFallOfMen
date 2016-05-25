this.Shop = function (accessService, scope)
{
    scope.loadingPurchasedSkill = 0;
    scope.loadingImplant = 0;
    scope.loadingSkill = 0;
    scope.messageShop;
    scope.infoSkill;
    scope.infoImplant;
    scope.showToolTipSkill = false;
    scope.showToolTipImplant = false;
    scope.skills = new Array();
    scope.purchasedSkills = new Array();
    scope.implants = new Array();
    scope.purchasedImplants = new Array();
    this.invalid = 0;
    this.show = "skill";
    this.showInventory = "skill";

    //watch for any change in array was occured.
    scope.$watch('loadingSkill', function ()
    {
        for (var i = 0; i < scope.purchasedSkills.length; i++)
        {
            for (var j = 0; j < scope.skills.length; j++)
            {
                if (scope.purchasedSkills[i].getId() == scope.skills[j].getId())
                {
                    scope.skills.splice(j, 1);
                }
            }
        }
    }, true);

    //watch for any change in array was occured.
    scope.$watch('loadingImplant', function ()
    {
        for (var i = 0; i < scope.purchasedImplants.length; i++)
        {
            for (var j = 0; j < scope.implants.length; j++)
            {
                if (scope.purchasedImplants[i].getId() == scope.implants[j].getId())
                {
                    scope.implants.splice(j, 1);
                }
            }
        }
    }, true);

    //constructor.
    //load all data from db.
    this.showShop = function ()
    {
        scope.currentWindow = "shop";
        scope.loadSkills();
        scope.loadPurchasedSkills();
        scope.loadImplants();
        scope.loadPurchasedImplants();
        clearInterval(scope.tempo);
    };

    /**
     * hideInfoSkill()
     * @author Franc
     * @date 17/05/2016
     * @description reset a tooltip and hide it.
     * @param none
     * @returns none
     */
    this.hideInfoSkill = function ()
    {
        scope.showToolTipSkill = false;
        scope.showToolTipImplant = false;
        $("#tooltipMessage").css("opacity", "0");
        $("#tooltipMessage").css("z-index", "-1");
        //$("#tooltipMessage").css("top", "25%");
    };

    /**
     * getInfoImplant()
     * @author Franc
     * @date 17/05/2016
     * @description get all info for a selected implant.
     * @param implant:  object.
     * @returns none
     */
    this.getInfoImplant = function (implant, index, mode)
    {
        scope.showToolTipImplant = true;
        if (mode == "shop")
        {
            $("#tooltipMessageImplant").css("top", "25%");
            $("#tooltipMessageImplant").css("left", "12%");
        }
        else
        {
            $("#tooltipMessageImplant").css("top", "25%");
            $("#tooltipMessageImplant").css("left", "65%");
        }
        implant = angular.copy(implant);
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 6, action: 210, jsonData: JSON.stringify(implant)});
        promise.then(function (outputData)
        {
            if (outputData[0] === true)
            {

                scope.infoImplant = outputData[1];
                var currentTop = $("#tooltipMessageImplant").css("top");
                var top = Math.round(currentTop.substring(0, currentTop.length - 2));
                $("#tooltipMessageImplant").css("top", (top + (45 * index + 1)) + 'px');
                $("#tooltipMessageImplant").css("opacity", "1");
                $("#tooltipMessageImplant").css("z-index", "1000");
            }
            else
            {
                scope.messageShop = outputData[1];
            }
        });
    };

    /**
     * getInfoSkill()
     * @author Franc
     * @date 17/05/2016
     * @description get all info for a selected skill.
     * @param skill:  object.
     * @returns none
     */
    this.getInfoSkill = function (skill, index, mode)
    {
        scope.showToolTipSkill = true;
        if (mode == "shop")
        {
            $("#tooltipMessageSkill").css("top", "25%");
            $("#tooltipMessageSkill").css("left", "12%");
        }
        else
        {
            $("#tooltipMessageSkill").css("top", "25%");
            $("#tooltipMessageSkill").css("left", "65%");
        }
        skill = angular.copy(skill);
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 6, action: 209, jsonData: JSON.stringify(skill)});
        promise.then(function (outputData)
        {
            if (outputData[0] === true)
            {

                scope.infoSkill = outputData[1];
                var currentTop = $("#tooltipMessageSkill").css("top");
                var top = Math.round(currentTop.substring(0, currentTop.length - 2));
                $("#tooltipMessageSkill").css("top", (top + (45 * index + 1)) + 'px');
                $("#tooltipMessageSkill").css("opacity", "1");
                $("#tooltipMessageSkill").css("z-index", "1000");
            }
            else
            {
                scope.messageShop = outputData[1];
            }
        });
    };


    /**
     * sellImplant()
     * @author Franc
     * @date 16/05/2016
     * @description send a request to sell a implant.
     * @param skill:  object implant to be selled.
     * @returns none
     */
    this.sellImplant = function (implant)
    {
        implant.userName = scope.currentUser.getUserName();
        implant.idRobotStatistic = scope.currentUser.robotStatistic.getId();
        implant = angular.copy(implant);
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 6, action: 208, jsonData: JSON.stringify(implant)});
        promise.then(function (outputData)
        {
            if (outputData[0] === true)
            {
                scope.messageShop = outputData[1];
                scope.updateImplants();

            }
            else
            {
                scope.messageShop = outputData[1];
            }
        });
    };

    /**
     * updateImplants()
     * @author Franc
     * @date 16/05/2016
     * @description del a implant at array if alredy purchased.
     * @param none
     * @returns none
     */
    scope.updateImplants = function ()
    {
        scope.loadImplants();
        scope.loadPurchasedImplants();
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 6, action: 204, jsonData: JSON.stringify(scope.currentUser)});
        promise.then(function (outputData)
        {
            if (outputData[0] === true)
            {
                scope.currentUser.setCoins(outputData[1][0]["coins"]);
            }
            else
            {
                scope.currentUser.setCoins(0);
            }
        });
        for (var i = 0; i < scope.purchasedImplants.length; i++)
        {
            for (var j = 0; j < scope.implants.length; j++)
            {
                if (scope.purchasedImplants[i].getId() == scope.implants[j].getId())
                {
                    scope.implants.splice(j, 1);
                }
            }
        }
    };

    /**
     * purchaseImplant()
     * @author Franc
     * @date 16/05/2016
     * @description send a request to purchase a implant.
     * @param implant:  object implant to be purchased.
     * @returns none
     */
    this.purchaseImplant = function (implant)
    {
        implant.userName = scope.currentUser.getUserName();
        implant.idRobotStatistic = scope.currentUser.robotStatistic.getId();
        implant = angular.copy(implant);
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 6, action: 207, jsonData: JSON.stringify(implant)});
        promise.then(function (outputData)
        {
            if (outputData[0] === true)
            {
                scope.messageShop = outputData[1];
                scope.updateImplants();
            }
            else
            {
                scope.messageShop = outputData[1];
            }
        });
    };

    /**
     * loadPurchaseImplants()
     * @author Franc
     * @date 16/05/2016
     * @description load all data of all implants previously purchased.
     * @param none
     * @returns none
     */
    scope.loadPurchasedImplants = function ()
    {
        scope.purchasedImplants = new Array();
        var user = angular.copy(scope.currentUser);
        var implant = new Implant();
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 6, action: 206, jsonData: JSON.stringify(user)});
        promise.then(function (outputData)
        {
            if (outputData[0] === true)
            {
                for (var i = 0; i < outputData[1].length; i++)
                {
                    implant = new Implant(outputData[1][i].id,
                            outputData[1][i].name,
                            outputData[1][i].description,
                            parseInt(outputData[1][i].buyPrice));
                    scope.purchasedImplants.push(implant);
                }
                scope.loadingImplant++;
            }
            else
            {
                scope.messageShop = outputData[1];
            }
        });
    };

    /**
     * loadImplants()
     * @author Franc
     * @date 12/05/2016
     * @description send information (user object) to server and ask to inactive a user.
     * @param none
     * @returns none
     */
    scope.loadImplants = function ()
    {
        scope.implants = new Array();
        var implant = new Implant();
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 6, action: 205, jsonData: ""});
        promise.then(function (outputData)
        {
            if (outputData[0] === true)
            {
                for (var i = 0; i < outputData[1].length; i++)
                {
                    implant = new Implant(outputData[1][i].id,
                            outputData[1][i].name,
                            outputData[1][i].description,
                            parseInt(outputData[1][i].buyPrice));
                    scope.implants.push(implant);
                }
                scope.loadingImplant++;
            }
            else
            {
                scope.messageShop = outputData[1];
            }
        });
    };

    /**
     * updateSkills()
     * @author Franc
     * @date 15/05/2016
     * @description del a skill at array if alredy purchased.
     * @param none
     * @returns none
     */
    scope.updateSkills = function ()
    {
        scope.loadSkills();
        scope.loadPurchasedSkills();
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 6, action: 204, jsonData: JSON.stringify(scope.currentUser)});
        promise.then(function (outputData)
        {
            if (outputData[0] === true)
            {
                scope.currentUser.setCoins(outputData[1][0]["coins"]);
            }
            else
            {
                scope.currentUser.setCoins(0);
            }
        });
        for (var i = 0; i < scope.purchasedSkills.length; i++)
        {
            for (var j = 0; j < scope.skills.length; j++)
            {
                if (scope.purchasedSkills[i].getId() == scope.skills[j].getId())
                {
                    scope.skills.splice(j, 1);
                }
            }
        }
    };

    /**
     * sellskill()
     * @author Franc
     * @date 15/05/2016
     * @description send a request to sell a skill.
     * @param skill:  object skill to be purchased.
     * @returns none
     */
    this.sellSkill = function (skill)
    {
        skill.userName = scope.currentUser.getUserName();
        skill.idRobotStatistic = scope.currentUser.robotStatistic.getId();
        skill = angular.copy(skill);
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 6, action: 203, jsonData: JSON.stringify(skill)});
        promise.then(function (outputData)
        {
            if (outputData[0] === true)
            {
                scope.messageShop = outputData[1];
                scope.updateSkills();

            }
            else
            {
                scope.messageShop = outputData[1];
            }
        });
    };

    /**
     * loadSkills()
     * @author Franc
     * @date 12/05/2016
     * @description send information (user object) to server and ask to inactive a user.
     * @param none
     * @returns none
     */
    scope.loadSkills = function ()
    {
        scope.skills = new Array();
        var skill = new Skill();
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 6, action: 200, jsonData: ""});
        promise.then(function (outputData)
        {
            if (outputData[0] === true)
            {
                for (var i = 0; i < outputData[1].length; i++)
                {
                    skill = new Skill(outputData[1][i].id,
                            outputData[1][i].name,
                            outputData[1][i].description,
                            outputData[1][i].requiredLevel,
                            parseInt(outputData[1][i].buyPrice),
                            outputData[1][i].multiplier);
                    scope.skills.push(skill);
                }
                scope.loadingSkill++;
            }
            else
            {
                scope.messageShop = outputData[1];
            }
        });
    };

    /**
     * loadPurchaseSkills()
     * @author Franc
     * @date 15/05/2016
     * @description load all data of all skills previously purchased.
     * @param none
     * @returns none
     */
    scope.loadPurchasedSkills = function ()
    {
        scope.purchasedSkills = new Array();
        var user = angular.copy(scope.currentUser);
        var skill = new Skill();
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 6, action: 202, jsonData: JSON.stringify(user)});
        promise.then(function (outputData)
        {
            if (outputData[0] === true)
            {
                for (var i = 0; i < outputData[1].length; i++)
                {
                    skill = new Skill(outputData[1][i].id,
                            outputData[1][i].name,
                            outputData[1][i].description,
                            outputData[1][i].requiredLevel,
                            parseInt(outputData[1][i].buyPrice),
                            outputData[1][i].multiplier);
                    scope.purchasedSkills.push(skill);
                }
                scope.loadingSkill++;
            }
            else
            {
                scope.messageShop = outputData[1];
            }
        });
    };

    /**
     * purchaseSkill()
     * @author Franc
     * @date 12/05/2016
     * @description send a request to purchase a skill.
     * @param skill:  object skill to be purchased.
     * @returns none
     */
    this.purchaseSkill = function (skill)
    {
        skill.userName = scope.currentUser.getUserName();
        skill.idRobotStatistic = scope.currentUser.robotStatistic.getId();
        skill = angular.copy(skill);
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 6, action: 201, jsonData: JSON.stringify(skill)});
        promise.then(function (outputData)
        {
            if (outputData[0] === true)
            {
                scope.messageShop = outputData[1];
                scope.updateSkills();
            }
            else
            {
                scope.messageShop = outputData[1];
            }
        });
    };

    this.active = function (id)
    {
        switch (id)
        {
            case 'implant':
                $("#shopImplantTab").addClass("active");
                $("#shopSkillTab").removeClass("active");
                this.show = "implant";
                break;
            case 'skill':
                $("#shopSkillTab").addClass("active");
                $("#shopImplantTab").removeClass("active");
                this.show = "skill";
                break;
            case 'skillInventory':
                $("#skillInventoryTab").addClass("active");
                $("#implantInventoryTab").removeClass("active");
                this.showInventory = "skill";
                break;
            case 'implantInventory':
                $("#skillInventoryTab").removeClass("active");
                $("#implantInventoryTab").addClass("active");
                this.showInventory = "implant";
                break;
            default:
                break;
        }
    };

    scope.saveChanges = function ()
    {
        scope.currentUser = angular.copy(scope.currentUser);
        if (scope.newPassword != undefined)
        {
            scope.currentUser.password = scope.newPassword;
        }
        else
        {
            scope.currentUser.password = 0;
        }
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 2, action: 201, jsonData: JSON.stringify(scope.currentUser)});
        promise.then(function (outputData)
        {
            if (outputData[0] === true)
            {
                //changes saved
                alert("Changes successfully saved!");
            }
            else
            {
                alert("No changes to save.");
            }
        });
    };
};


