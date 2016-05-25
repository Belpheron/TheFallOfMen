this.Shop = function (accessService, scope)
{
    scope.messageShop;
    scope.skills = new Array();
    this.invalid=0;

    this.showShop = function ()
    {
        scope.currentWindow = "shop";
        this.loadSkills();
    }


    /**
     * loadSkills()
     * @author Franc
     * @date 12/05/2016
     * @description send information (user object) to server and ask to inactive a user.
     * @param none
     * @returns none
     */
    this.loadSkills = function ()
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
                console.log(scope.skills);
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
        skill = angular.copy(skill);
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 6, action: 201, jsonData: JSON.stringify(skill)});
        promise.then(function (outputData)
        {
            if (outputData[0] === true)
            {
              alert("si");
              scope.messageShop = outputData[1];
            }
            else
            {
                alert("Error loading countries, try later.");
            }
        });
    };

    scope.match = function ()
    {
        if (scope.newPassword == scope.repeatNewPassword)
        {
            $("#newPassword").removeClass("ng-valid ng-dirty").addClass("ng-invalid ng-dirty");
            scope.show = 0;
        }
        else
        {
            $("#repeatNewPassword").removeClass("ng-invalid ng-dirty").addClass("ng-valid ng-dirty");
            scope.show = 1;
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


