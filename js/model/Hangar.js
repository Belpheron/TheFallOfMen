//global variable.
var post;
//jquery
function refresh(scope)
{
    var n = 0;
    var html;
    if (n < 2)
    {
        n++;
        $(".draggable").draggable();
        $(".elementSkill").draggable({
            contaiment: $("#areaDroppable"),
            revert: "invalid", 
            helper: 'clone'
        });
        $(".droppableSkill").droppable({
            drop: function (event, ui)
            {
                //if not current skill set.
                if (!$(this).hasClass("ui-state-highlight"))
                {
                    $(this).addClass("ui-state-highlight small");
                    $(this).find(".blur").remove();
                    html = $("<span></span>").html(ui.draggable[0]);
                    html.appendTo(this);
                }
                else
                {
                    $(this).find("span").remove();
                    html = $("<span></span>").html(ui.draggable[0]);
                    html.appendTo(this);
                }
                var id = (html.find("input").val());
                scope.cutSkill(id);
            }
        });
    }
    else
    {
        clearInterval(post);
    }
}

this.Hangar = function (accessService, scope)
{
    //constructor.
    //load all data from db.
    this.hangarShow = function ()
    {
        clearInterval(scope.tempo);
        scope.currentWindow = "hangar";
        scope.loadPurchasedSkill();
        scope.loadPurchasedImplant();
        scope.loadAssignedSkill();
        //scopeloadAssignedImpant();
        this.setPercent();
        scope.doAnimation(scope.hangar);
        post = setInterval(refresh, 100, scope);
    };
    //scope and properties.
    scope.infoSkill = new Array();
    scope.infoImplant = new Array();
    scope.image;
    scope.tempo;
    scope.show = "skill";
    scope.assignedSkill = new Array();
    scope.assignedImplant = new Array();
    scope.attrSkill = new Array();
    scope.attrImplant = new Array();
    this.images = new Array();
    this.attributes = new Array();
    //methods
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
                scope.messageShop = outputData[1];
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
                    var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 6, action: 209, jsonData: JSON.stringify(skill)});
                    promise.then(function (outputData)
                    {
                        if (outputData[0] === true)
                        {
                            scope.attrSkill.push(new Array(outputData[1][1]['name'], outputData[1][0]['value']));
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
                scope.messageShop = outputData[1];
            }
        });
    };

    /**
     * loadAttributesAssignedSkill()
     * @author Franc
     * @date 23/05/2016
     * @description give attributes of skill
     * @param skillObj
     * @returns array: attributes and values..
     */
    scope.loadAttributesAssignedSkill = function (skill,where)
    {
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 6, action: 209, jsonData: JSON.stringify(skill)});
        promise.then(function (outputData)
        {
            if (outputData[0] === true)
            {
                scope.attrSkill.push(new Array(outputData[1][1]['name'], outputData[1][0]['value']));
                html = "<span><div class='draggable ui-widget-content elementSkill'>";
                html += "<ul>";
                html += "<input type='hidden' value='" + skill.id + "'/>";
                html += "<li><label>Name: </label>" + skill.name + "</li>";
                html += "<li><label>Description: </label>" + skill.description + "</li>";
                html += "<li><label>Level: </label>" + skill.requiredLevel + "</li>";
                html += "<li><label>Boost: </label>" + skill.multiplier + "</li>";
                html += "<li><label>Attribute: </label>" + outputData[1][1]['name'] + "</li>";
                html += "<li><label>Value: </label>" + outputData[1][0]['value'] + "</li>";
                html += "</ul>";
                html += "</div></span>";
                $(where).html(html).addClass("ui-state-highlight small");
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
        var html;
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 7, action: 203, jsonData: JSON.stringify(scope.currentUser)});
        promise.then(function (outputData)
        {
            //load all skill assigned
            if (outputData[0] === true)
            {
                var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 7, action: 204, jsonData: {skill: outputData[1].attack1_id}});
                promise.then(function (outputData)
                {
                    //load info and put in rock
                    if (outputData[0] === true)
                    {
                        var skill = new Skill(outputData[1].id, outputData[1].name, outputData[1].description, outputData[1].requiredLevel, outputData[1].buyPrice, outputData[1].multiplier);
                        scope.loadAttributesAssignedSkill(skill,"#skillRock");
                    }
                    else
                    {
                        scope.messageShop = outputData[1];
                    }
                });
                var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 7, action: 204, jsonData: {skill: outputData[1].attack2_id}});
                promise.then(function (outputData)
                {
                    //load info and put in paper
                    if (outputData[0] === true)
                    {
                        var skill = new Skill(outputData[1].id, outputData[1].name, outputData[1].description, outputData[1].requiredLevel, outputData[1].buyPrice, outputData[1].multiplier);
                        scope.loadAttributesAssignedSkill(skill,"#skillPaper");
                    }
                    else
                    {
                        scope.messageShop = outputData[1];
                    }
                });
                var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 7, action: 204, jsonData: {skill: outputData[1].attack3_id}});
                promise.then(function (outputData)
                {
                    //load info and put in scissor
                    if (outputData[0] === true)
                    {
                        var skill = new Skill(outputData[1].id, outputData[1].name, outputData[1].description, outputData[1].requiredLevel, outputData[1].buyPrice, outputData[1].multiplier);
                        scope.loadAttributesAssignedSkill(skill, "#skillScissor");
                    }
                    else
                    {
                        scope.messageShop = outputData[1];
                    }
                });
            }
            else
            {
                scope.messageShop = outputData[1];
            }
        });

    };
    /**
     * cutSkill()
     * @author Franc
     * @date 24/05/2016
     * @description hide a part of skill purchased.
     * @param id: id to be removed.
     * @return none
     */
    scope.cutSkill = function (id)
    {
        for (var i = 0; i < scope.purchasedSkills.length; i++)
        {
            if (scope.purchasedSkills[i].getId()==id)
            {
                scope.purchasedSkills.slice(i,1);
                
            }
           alert(scope.purchasedSkills.length);
        }
        scope.setActive("implant");
        scope.$apply();
        scope.setActive("skill");
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
                scope.messageShop = outputData[1];
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
    this.getInfoSkill = function (skill)
    {
        skill = angular.copy(skill);
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 7, action: 200, jsonData: JSON.stringify(skill)});
        promise.then(function (outputData)
        {
            if (outputData[0] === true)
            {
                scope.infoSkill.push(outputData[1]);
            }
            else
            {
                scope.messageShop = outputData[1];
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
                scope.messageShop = outputData[1];
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
                scope.show = "skill";
                break;
            case 'implant':
                $("#tabSkill").removeClass("active");
                $("#tabImplant").addClass("active");
                $("#tabAttribute").removeClass("active");
                scope.show = "implant";
                break;
            case 'attribute':
                $("#tabSkill").removeClass("active");
                $("#tabImplant").removeClass("active");
                $("#tabAttribute").addClass("active");
                scope.show = "attribute";
                break;
            default:

                break;
        }
        post = setInterval(refresh, 100, scope);
    };
    //end 
};

