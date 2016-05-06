//angular code
(function ()
{
    var fallOfMenApp = angular.module("fallOfMenApp", []);
    fallOfMenApp.controller("recovery", function ($scope)
    {
        $scope.password;
        $scope.rPassword;
        $scope.show = 0;

        this.checkPassword = function ()
        {
            if ($scope.password == $scope.rPassword)
            {
                $("#rPasswordBox").removeClass("ng-valid ng-dirty").addClass("ng-invalid ng-dirty");
                $scope.show = 0;
            }
            else
            {
                $("#rPasswordBox").removeClass("ng-invalid ng-dirty").addClass("ng-valid ng-dirty");
                $scope.show = 1;
            }
        };
    });
})();

