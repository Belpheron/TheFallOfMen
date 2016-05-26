this.ProfileWindow = function (accessService, scope)
{

    scope.message = "";
    scope.countryList = [];
    scope.countryId;
    scope.show = 0;
    scope.newPassword;
    scope.repeatNewPassword;

    this.showProfile = function ()
    {
        
        scope.currentWindow = "profile";
        clearInterval(scope.tempo);
    };

    /**
     * dropOutUser()
     * @description send information (user object) to server and ask to inactive a user.
     * @param none
     * @returns {undefined}
     */
    this.dropOutUser = function ()
    {
        var user = new RegisterObj();
        user.setPassword(scope.pass);
        user.setUserName(scope.currentUser.getUserName());
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 2, action: 200, jsonData: JSON.stringify(user)});
        promise.then(function (outputData)
        {
            if (outputData[0] === true)
            {
                window.open("mainWindow.php?logOut=1", "_self");
            }
            else
            {
                scope.message = outputData[1];
            }
        });
    };

    /**
     * loadCountries()
     * @description ask for information for all countries in BD and put in a select.
     * @param none
     * @returns {undefined}
     */
    scope.loadCountries = function ()
    {
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 1, action: 100, jsonData: ""});
        promise.then(function (outputData)
        {
            if (outputData[0] === true)
            {
                scope.countryList = [];
                for (var i = 0; i < outputData[1].length; i++)
                {
                    var c = new Country(outputData[1][i].id, outputData[1][i].iso, outputData[1][i].name);
                    scope.countryList.push(c);
                }
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
                alert("Changes succesfully saved!");
            }
            else
            {
                alert("Can't posible to change user profile information.\nHint: Change any field to save changes.");
            }
        });
    };
};


