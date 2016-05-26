this.Hangar = function (accessService, scope)
{
//    this.hangarShow = function ()
//    {
//        //clearInterval(scope.tempo);
//        scope.currentWindow = "hangar";
//        scope.loadPurchasedSkillHangar();
//        //scope.loadPurchasedImplantHangar();
//        scope.loadAssignedSkill();
//        //scopeloadAssignedImpant();
//        //this.setPercent();
//        //scope.doAnimation(scope.hangar);
//    };
//
//    //scope
//    scope.arrayPurchasedSkill = new Array();
//    scope.arrayAttributesPurchasedSkill = new Array();
//    scope.arrayAssignedSkill = new Array();
//    scope.showOptionHangar = "skill";
//
//    //methods
//
//
//
//    /**
//     * setActive(tab)
//     * @author Franc
//     * @date 18/05/2016
//     * @description allows active a certain tab of form.
//     * @param tab: selected tab to active.
//     * @returns none
//     */
//    scope.setActive = function (tab)
//    {
//        switch (tab)
//        {
//            case 'skill':
//                $("#tabSkill").addClass("active");
//                $("#tabImplant").removeClass("active");
//                $("#tabAttribute").removeClass("active");
//                scope.showOptionHangar = "skill";
//                break;
//            case 'implant':
//                $("#tabSkill").removeClass("active");
//                $("#tabImplant").addClass("active");
//                $("#tabAttribute").removeClass("active");
//                scope.showOptionHangar = "implant";
//                break;
//            case 'attribute':
//                $("#tabSkill").removeClass("active");
//                $("#tabImplant").removeClass("active");
//                $("#tabAttribute").addClass("active");
//                scope.showOptionHangar = "attribute";
//                break;
//            default:
//
//                break;
//        }
//    };
//
//    /**
//     * loadAssignedSkill()
//     * @author Franc
//     * @date 18/05/2016
//     * @description load all assigned skills of robot
//     * @param none
//     * @returns none
//     */
//    scope.loadAssignedSkill = function ()
//    {
//        scope.arrayAssignedSkill = new Array();
//
//        //load all skill assigned
//        var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 7, action: 203, jsonData: JSON.stringify(scope.currentUser)});
//        promise.then(function (outputData)
//        {
//            if (outputData[0] === true)
//            {
//                var temp = new Array();
//                temp = new Array(outputData[1].attack1_id, outputData[1].attack2_id, outputData[1].attack3_id);
//                console.log(temp);
//                for (var i = 0; i < temp.length; i++)
//                {
//                    var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 7, action: 204, jsonData: {id: temp[i]}});
//                    promise.then(function (outputData)
//                    {
//                        if (outputData[0] === true)
//                        {
//                            scope.arrayAssignedSkill.push(outputData[1]);
//                        }
//                        else
//                        {
//                            scope.messageHangar = outputData[1];
//                        }
//                       // console.log(scope.arrayAssignedSkill);
//                    });
//                }
//            }
//            else
//            {
//                scope.messageHangar = outputData[1];
//            }
//        });
//    };
//
//    /**
//     * loadPurchaseSkillHangar()
//     * @author Franc
//     * @date 15/05/2016
//     * @description load all data of all skills previously purchased.
//     * @param none
//     * @returns none
//     */
//    scope.loadPurchasedSkillHangar = function ()
//    {
//        scope.arrayPurchasedSkill = new Array();
//        scope.arrayAttributesPurchasedSkill = new Array();
//        var user = angular.copy(scope.currentUser);
//        var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 6, action: 202, jsonData: JSON.stringify(user)});
//        promise.then(function (outputData)
//        {
//            if (outputData[0] === true)
//            {
//                for (var i = 0; i < outputData[1].length; i++)
//                {
//                    var skill = new Skill(outputData[1][i].id,
//                            outputData[1][i].name,
//                            outputData[1][i].description,
//                            outputData[1][i].requiredLevel,
//                            parseInt(outputData[1][i].buyPrice),
//                            outputData[1][i].multiplier);
//                    scope.arrayPurchasedSkill.push(skill);
//                }
//                for (var j = 0; j < scope.arrayPurchasedSkill.length; j++)
//                {
//                    var skill = angular.copy(scope.arrayPurchasedSkill[j]); alert(scope.arrayPurchasedSkill[j].id);
//                    var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 6, action: 209, jsonData: JSON.stringify(skill)});
//                    promise.then(function (outputData)
//                    {
//                        if (outputData[0] === true)
//                        {
//                            scope.arrayAttributesPurchasedSkill.push(new Array(outputData[1][1]['name'], outputData[1][0]['value']));
//                        }
//                        else
//                        {
//                            scope.messageHangar = outputData[1];
//                        }
//                        console.log(scope.arrayAttributesPurchasedSkill);
//                    });
//                }
//                //console.log(scope.arrayPurchasedSkill);
//            }
//            else
//            {
//                scope.messageHangar = outputData[1];
//            }
//        });
//    };
//};
    //constructor.
    //load all data from db.
    this.hangarShow = function ()
    {
        clearInterval(scope.tempo);
        scope.currentWindow = "hangar";
        scope.loadPurchasedSkill();
        scope.loadPurchasedImplant();
        //scopeloadAssignedImpant();
        this.setPercent();
        scope.doAnimation(scope.hangar);
        scope.loadAssignedSkill();
    };
    //scope and properties.
    scope.infoSkill = new Array();
    scope.infoImplant = new Array();
    scope.image;
    scope.tempo;
    scope.messageHangar;
    scope.arraySkillsAssigned = new Array();
    scope.showOptionHangar = "skill";
    scope.assignedSkill = new Array();
    scope.assignedImplant = new Array();
    scope.attrSkill = new Array();
    scope.attrSkillAssgined = new Array();
    scope.attrImplant = new Array();
    scope.loadingComplete=0;
    this.images = new Array();
    this.attributes = new Array();
    
     scope.$watch('loadingComplete', function ()
    {
        console.log(scope.purchasedSkills);
        for (var i = 0; i < scope.purchasedSkills.length; i++)
        {
            for (var j = 0; j < scope.arraySkillsAssigned.length; j++)
            {
                if (scope.purchasedSkills[i].id == scope.arraySkillsAssigned[j].id)
                {
                    scope.purchasedSkills[i].hide=1;
                }
                else
                {
                    scope.purchasedSkills[i].hide=0;
                }
            }
        }
    }, true);
    //methods

    /**
     * updateSkillAssign()
     * @author Franc
     * @date 25/05/2016
     * @description send a request to update the assignament of attack.
     * @param skill, objective.
     * @returns none
     */

    this.updateSkillAssign = function (skill, objective)
    {
        skill.objective = objective;
        skill.idRobotStatistic = scope.currentUser.robotStatistic.getId();
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 7, action: 205, jsonData: JSON.stringify(skill)});
        promise.then(function (outputData)
        {
            if (outputData[0] === true)
            {
                scope.arraySkillsAssigned[objective-1]=skill;
                scope.messageHangar = "Succesfull assigned";
            }
            else
            {
                scope.messageHangar = outputData[1];
            }
        });
    }
    /**
     * loadPurchaseImplant()
     * @author Franc
     * @date 16/05/2016
     * @description load all data of all implants previously purchased.
     * @param none
     * @returns none
     */
    scope.loadPurchasedImplant = function ()
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
                    var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 6, action: 210, jsonData: JSON.stringify(implant)});
                    promise.then(function (outputData)
                    {
                        if (outputData[0] === true)
                        {
                            scope.attrImplant.push(new Array(outputData[1][1]['name'], outputData[1][0]['value']));
                        }
                        else
                        {
                            scope.messageHangar = outputData[1];
                        }
                    });
                }
            }
            else
            {
                scope.messageHangar = outputData[1];
            }
        });
    };

    /**
     * loadPurchaseSkill()
     * @author Franc
     * @date 15/05/2016
     * @description load all data of all skills previously purchased.
     * @param none
     * @returns none
     */
    scope.loadPurchasedSkill = function ()
    {
        scope.purchasedSkills = new Array();
        scope.attrSkill = new Array();
        var user = angular.copy(scope.currentUser);
        var skill = new Skill();
        var promise = accessService.getData("php/controllers/MainController.php", false, "POST", {controllerType: 6, action: 202, jsonData: JSON.stringify(user)});
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
                    var promise = accessService.getData("php/controllers/MainController.php", false, "POST", {controllerType: 6, action: 209, jsonData: JSON.stringify(skill)});
                    promise.then(function (outputData)
                    {
                        if (outputData[0] === true)
                        {
                            scope.attrSkill.push(new Array(outputData[1][1]['name'], outputData[1][0]['value'], skill.getId()));
                            console.log(scope.attrSkill);
                            scope.loadingComplete++;
                        }
                        else
                        {
                            scope.messageHangar = outputData[1];
                        }
                    });
                }
            }
            else
            {
                scope.messageHangar = outputData[1];
            }
        });
        console.log("loadPurchasedSkill");
        console.log(scope.purchasedSkills);
        console.log(scope.attrSkill);

    };

    /**
     * loadAttributesAssignedSkill()   ----------------- no se usa.
     * @author Franc
     * @date 23/05/2016
     * @description give attributes of skill
     * @param skillObj
     * @returns array: attributes and values.
     */
    scope.loadAttributesAssignedSkill = function (skillObj)
    {
        var skill = new Skill(skillObj.id, skillObj.name, skillObj.description, skillObj.requiredLevel, skillObj.buyPrice, skillObj.multiplier);
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 6, action: 209, jsonData: JSON.stringify(skill)});
        promise.then(function (outputData)
        {
            if (outputData[0] === true)
            {
                return (outputData[1][1]['name'], outputData[1][0]['value']);
            }
            else
            {
                scope.messageHangar = outputData[1];
            }
        });
    };

    /**
     * loadAssignedSkill()
     * @author Franc
     * @date 18/05/2016
     * @description format a number for array images.
     * @param num: a number to format
     * @returns number formatted.
     */
    scope.loadAssignedSkill = function ()
    {
        //load all skill assigned
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 7, action: 203, jsonData: JSON.stringify(scope.currentUser)});
        promise.then(function (outputData)
        {
            if (outputData[0] === true)
            {
                scope.arraySkillsAssigned = new Array();
                //rock , pos 0;
                for (var i = 0; i < scope.purchasedSkills.length; i++)
                {
                    if (scope.purchasedSkills[i].id == outputData[1].attack1_id)
                    {
                        scope.arraySkillsAssigned.push(scope.purchasedSkills[i]);
                        for (var j = 0; j < scope.attrSkill.length; j++)
                        {
                            if (scope.attrSkill[j][2] == scope.purchasedSkills[i].id)
                            {
                                scope.attrSkillAssgined.push(new Array(scope.attrSkill[j][0], scope.attrSkill[j][1], scope.attrSkill[j][2]));
                            }
                        }
                    }
                }
                //paper, pos 1;
                for (var i = 0; i < scope.purchasedSkills.length; i++)
                {
                    if (scope.purchasedSkills[i].id == outputData[1].attack2_id)
                    {
                        scope.arraySkillsAssigned.push(scope.purchasedSkills[i]);
                    }
                }
                //scissors, pos 2;
                for (var i = 0; i < scope.purchasedSkills.length; i++)
                {
                    if (scope.purchasedSkills[i].id == outputData[1].attack3_id)
                    {
                        scope.arraySkillsAssigned.push(scope.purchasedSkills[i]);
                    }
                }
                console.log(scope.arraySkillsAssigned);
                scope.loadingComplete++;
            }
            else
            {
                scope.messageHangar = outputData[1];
            }
        });
    };
  
    /**
     * format()
     * @author Franc
     * @date 18/05/2016
     * @description format a number for array images.
     * @param num: a number to format
     * @returns number formatted.
     */
    scope.format = function (num)
    {
        var result;
        switch (num.toString().length)
        {
            case 1:
                result = "000" + num;
                break;
            case 2:
                result = "00" + num;
                break;
            case 3:
                result = "0" + num;
                break;
            case 4:
                result = num;
                break;
            default:
                //none
                break;
        }
        return result;
    };
    /**
     * doAnimation()
     * @author Franc
     * @date 18/05/2016
     * @description init a animation robot of user.
     * @param none
     * @returns none
     */
    scope.doAnimation = function (instance)
    {
        var numFrames = 35;
        switch (scope.currentUser.robotStatistic.idRobotSkin)
        {
            case '2':
                for (var i = 0; i <= numFrames; i++)
                {
                    instance.images.push("images/animations/prime/hangar/PRIME_HANGAR." + scope.format(i) + ".png");
                }
                break;
            case '1':
                for (var i = 0; i <= numFrames; i++)
                {
                    instance.images.push("images/animations/mobot/hangar/MOBOT_HANGAR." + scope.format(i) + ".png");
                }
                break;
            default:
                break;
        }
        var num = 0;
        scope.tempo = setInterval(frame, 120);
        function frame()
        {
            scope.$apply();
            if (num < numFrames)
            {
                num++;
            }
            else
            {
                num = 1;
            }
            scope.image = instance.images[num];
        }
        ;
    };
    /**
     * setPercent()
     * @author Franc
     * @date 18/05/2016
     * @description fix the bar of experience robot in correct position of charge.
     * @param none
     * @returns none
     */
    this.setPercent = function ()
    {
        $("#bar").css("width", (scope.currentUser.robotStatistic.experience / scope.currentUser.robotStatistic.expToNextLevel) * 100);
    };
    /**
     * loadAttributes()
     * @author Franc
     * @date 18/05/2016
     * @description retrives all attributes of robot.
     * @param none
     * @returns none
     */
    this.loadAttributes = function (instance)
    {
        scope.currentUser = angular.copy(scope.currentUser);
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 7, action: 202, jsonData: JSON.stringify(scope.currentUser)});
        promise.then(function (outputData)
        {
            if (outputData[0] === true)
            {
                instance.attributes = (outputData[1]);
            }
            else
            {
                scope.messageHangar = outputData[1];
            }
        });
    };
    /**
     * getInfoSKill()
     * @author Franc
     * @date 18/05/2016
     * @description retrives all info of a skill.
     * @param none
     * @returns none
     */
    scope.getInfoSkillHangar = function (id)
    {
        var skill = new Skill(id);
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 7, action: 200, jsonData: JSON.stringify(skill)});
        promise.then(function (outputData)
        {
            if (outputData[0] === true)
            {
                scope.infoSkill.push(outputData[1]);
               console.log(scope.infoSkill);
            }
            else
            {
                scope.messageHangar = outputData[1];
            }
        });
    };
    /**
     * getInfoImplant()
     * @author Franc
     * @date 18/05/2016
     * @description retrives all info of a skill.
     * @param none
     * @returns none
     */
    this.getInfoImplant = function (implant)
    {
        implant = angular.copy(implant);
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 7, action: 201, jsonData: JSON.stringify(implant)});
        promise.then(function (outputData)
        {
            if (outputData[0] === true)
            {
                scope.infoImplant.push(outputData[1]);
            }
            else
            {
                scope.messageHangar = outputData[1];
            }
        });
    };
    /**
     * setActive(tab)
     * @author Franc
     * @date 18/05/2016
     * @description allows active a certain tab of form.
     * @param tab: selected tab to active.
     * @returns none
     */
    scope.setActive = function (tab)
    {
        switch (tab)
        {
            case 'skill':
                $("#tabSkill").addClass("active");
                $("#tabImplant").removeClass("active");
                $("#tabAttribute").removeClass("active");
                scope.showOptionHangar = "skill";
                break;
            case 'implant':
                $("#tabSkill").removeClass("active");
                $("#tabImplant").addClass("active");
                $("#tabAttribute").removeClass("active");
                scope.showOptionHangar = "implant";
                break;
            case 'attribute':
                $("#tabSkill").removeClass("active");
                $("#tabImplant").removeClass("active");
                $("#tabAttribute").addClass("active");
                scope.showOptionHangar = "attribute";
                break;
            default:

                break;
        }
    };
    //end 
};

