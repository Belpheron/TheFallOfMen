//angular code
(function ()
{
    var fallOfMenApp = angular.module("fallOfMenApp", []);
    fallOfMenApp.controller("controller", function($scope, $http, accessService) {
        //interface variables
        $scope.show = 0;

        //register variables
        $scope.register = new RegisterObj("", "", "", "", "", "", "", "", "");
        $scope.countryList = [];
        $scope.robotSkinList = [];
        $scope.skinDescription = "";
        $scope.registerRobotImage = "images/tooltips/MOBOT_TOOLTIP.jpg";

        //methods
        /**
         * @name getSkinDescription()
         * @author Juan
         * @version 1.0
         * @date 06/05/2016
         * @description shows robot information and image in the form
         * @returns {n/a}
         */
        $scope.getSkinDescription = function() {
            for (var i=0; i<$scope.robotSkinList.length; i++) {
                if ($scope.robotSkinList[i].getId() == $scope.register.getRobotSkinId()) {
                    $scope.skinDescription = $scope.robotSkinList[i].getDescription();
                    $scope.registerRobotImage = "images/tooltips/"+
                            ($scope.robotSkinList[i].getName()).toUpperCase()+"_TOOLTIP.jpg";
                }
            }
        }
        
        /**
         * @name loadRobotSkins()
         * @author Juan
         * @version 1.0
         * @date 06/05/2016
         * @description loads robot skins from the database 
         * @returns {n/a}
         */
        $scope.loadRobotSkins = function() {
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 3, action: 100, jsonData: ""});
            promise.then(function(outputData) {
                if (outputData[0] === true) {
                    $scope.robotSkinList = [];
                    for (var i = 0; i < outputData[1].length; i++) {
                        var s = new RobotSkin(outputData[1][i].id, outputData[1][i].name, outputData[1][i].description);
                        $scope.robotSkinList.push(s);
                    }
                    $scope.register.robotSkinId = "1";
                    $scope.skinDescription = $scope.robotSkinList[0].getDescription();
                } else {
                    alert("Error loading robot skins, try later.");
                }
            });
        }

        /**
         * @name validatePassword()
         * @author Juan
         * @version 1.0
         * @date 05/05/2016
         * @description validates given passwords
         * @returns {n/a}
         */
        $scope.validatePassword = function() {
            $scope.register.validatePassword();
            $scope.register.validateEqualPasswords();
        }

        /**
         * @name validateEmail()
         * @author Juan
         * @version 1.0
         * @date 05/05/2016
         * @description validates if given email is already in the database
         * @returns {n/a}
         */
        $scope.validateEmail = function() {
            $scope.register.validateEmail();
            if (!$scope.register.validEmail) {
                $("#emailBox").removeClass("ng-valid").addClass("ng-invalid");
            } else {
                var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 2, action: 101, jsonData: {email: $scope.register.email}});
                promise.then(function(outputData) {
                    if (outputData[0] === true) {
                        $scope.register.emailInUse = true;
                        $("#emailBox").removeClass("ng-valid").addClass("ng-invalid");
                    } else {
                        $scope.register.emailInUse = false;
                        $("#emailBox").removeClass("ng-invalid").addClass("ng-valid");
                    }
                });
            }
        }

        /**
         * @name validateUserName()
         * @author Juan
         * @version 1.0
         * @date 05/05/2016
         * @description validates entered username
         * @returns {n/a}
         */
        $scope.validateUserName = function() {
            $scope.register.validateUserName();
            if (!$scope.register.validEmail) {
                $("#userNameBox").removeClass("ng-valid").addClass("ng-invalid");
            } else {
                var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 2, action: 100, jsonData: {userName: $scope.register.userName}});
                promise.then(function(outputData) {
                    if (outputData[0] === true) {
                        $scope.register.nickInUse = true;
                        $("#userNameBox").removeClass("ng-valid").addClass("ng-invalid");
                    } else {
                        $scope.register.nickInUse = false;
                        $("#userNameBox").removeClass("ng-invalid").addClass("ng-valid");
                    }
                });
            }
        }

        /**
         * @name loadCountries()
         * @author Juan
         * @version 1.0
         * @date 05/05/2016
         * @description loads all countries from database and inserts them into
         *      countryList array
         * @returns {n/a}
         */
        $scope.loadCountries = function() {
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 1, action: 100, jsonData: ""});
            promise.then(function(outputData) {
                if (outputData[0] === true) {
                    $scope.countryList = [];
                    for (var i = 0; i < outputData[1].length; i++) {
                        var c = new Country(outputData[1][i].id, outputData[1][i].iso, outputData[1][i].name);
                        $scope.countryList.push(c);
                    }
                    $scope.register.countryId = "202";
                } else {
                    alert("Error loading countries, try later.");
                }
            });
        }
    });

    //directives   
    fallOfMenApp.factory('accessService', function($http, $log, $q) {
        return {
            getData: function(url, async, method, params, data) {
                var deferred = $q.defer();
                $http({
                    url: url,
                    method: method,
                    asyn: async,
                    params: params,
                    data: data,
                })
                        .success(function(response, status, headers, config) {
                            deferred.resolve(response);
                        })
                        .error(function(msg, code) {
                            deferred.reject(msg);
                            $log.error(msg, code);
                        });

                return deferred.promise;
            }
        }
    });
    fallOfMenApp.directive("registerTemplate", function() {
        return {
            restrict: 'E',
            templateUrl: "templates/register-template.html",
            controller: function() {
            },
            controllerAs: 'registerTemplate'
        };
    });
    fallOfMenApp.directive("retrieveCredentialsTemplate", function ()
    {
        return {
            restrict: 'E',
            templateUrl: "templates/retrieve-credentials-template.html",
            controller: function ()
            {

            },
            controllerAs: 'retrieveCredentialsTemplate'
        };
    });
    fallOfMenApp.directive('calendar', function ()
    {
        return {
            require: 'ngModel',
            link: function (scope, el, attr, ngModel)
            {
                $(el).datepicker({
                    dateFormat: 'yy-mm-dd',
                    onSelect: function (dateText)
                    {
                        scope.$apply(function ()
                        {
                            ngModel.$setViewValue(dateText);
                        });
                    }
                });
            }
        };
    });
})();
//jquery
