//Javascript
var url = document.location.href;
var get = url.split("?");
var values = get[1].split("=");
var userName = values[1].split("&")[0];

//angular code
(function ()
{
    var fallOfMenApp = angular.module("fallOfMenApp", []);
    fallOfMenApp.controller("recovery", function ($scope, $http, accessService)
    {
        $scope.password;
        $scope.rPassword;
        $scope.show = 0;
        $scope.arrayObject = new Array();

        $scope.checkPassword = function ()
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

        $scope.save = function ()
        {
            $scope.arrayObject = new Array();
            $scope.arrayObject.push(userName);
            $scope.arrayObject.push($scope.password);
            $scope.arrayObject = angular.copy($scope.arrayObject);
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 2, action: 102, jsonData: JSON.stringify($scope.arrayObject)});
            promise.then(function (outputData)
            {
                if (outputData[0] === true)
                {
                    window.open("index.php?recovery=1", "_self");
                }
                else
                {
                    alert(outputData[1]);
                }
            });
        };
    });
    //directives   
    fallOfMenApp.factory('accessService', function ($http, $log, $q)
    {
        return {
            getData: function (url, async, method, params, data)
            {
                var deferred = $q.defer();
                $http({
                    url: url,
                    method: method,
                    asyn: async,
                    params: params,
                    data: data,
                })
                        .success(function (response, status, headers, config)
                        {
                            deferred.resolve(response);
                        })
                        .error(function (msg, code)
                        {
                            deferred.reject(msg);
                            $log.error(msg, code);
                        });

                return deferred.promise;
            }
        }
    });
})();

