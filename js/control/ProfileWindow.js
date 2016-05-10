this.ProfileWindow = function (accessService, scope)
{
    scope.message = "";
    this.dropOutUser = function ()
    {
        var user = new RegisterObj();
        user.setPassword(scope.pass);
        user.setUserName("srsole");
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 2, action: 200, jsonData: JSON.stringify(user)});
        promise.then(function (outputData)
        {
            if (outputData[0] === true)
            {
                window.open("mainWindow.php?logOut=1", "_self");
            }
            else
            {
                scope.message=outputData[1];
            }
        });
    };
};


