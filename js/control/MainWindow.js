//global variables
var userTimer;

//angular code
(function() {
    var fallOfMenApp = angular.module("fallOfMenApp", []);
    fallOfMenApp.controller("controller", function($scope, $window, $http, accessService) {
        //profile variables
        $scope.profile = new ProfileWindow(accessService, $scope);
        $scope.showDisclaimerDropOut=0;
        
        //home variables
        $scope.home = new Home(accessService, $scope);  
        $scope.currentUser = new User();
        $scope.onlineUserList = [];
        $scope.onlineFriendList = [];
        $scope.onlineBlockedList = [];

        //interface variables
        $scope.currentWindow = "profile";

        //methods
        /**
         * @name loadUserDetails()
         * @author Juan
         * @version 1.0
         * @date 09/05/2106
         * @description loads basic user details from database
         * @param userName : the user name to load
         * @returns {n/a}
         */
        $scope.loadUserDetails = function(userName) {
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 2, action: 100, jsonData: {userName:userName}});
            promise.then(function(outputData) {
                if (outputData[0] === true) {
                    $scope.currentUser = new User(outputData[1].userName, outputData[1].coins);
                }
            });
        }
        
        /**
         * @name logout()
         * @author Juan
         * @version 1.0
         * @date 09/05/2016
         * @description removes userName from onlineusers table
         * @returns {n/a}
         */
        $scope.logout = function() {
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 2, action: 104, jsonData: {userName:$scope.currentUser.getUserName()}});
            promise.then(function(outputData) {
                if (outputData[0] === true) {
                    window.open("mainWindow.php?logOut=1", "_self");
                } else {
                    window.open("mainWindow.php?logOut=2", "_self");
                }
            });
        }
        
        //event to fire on tab closing
        //$window.onunload =  $scope.logout;
        
        /**
         * @name showHome()
         * @author Juan
         * @version 1.0
         * @date 09/05/2016
         * @descripton loads online users data and creates a new Home object, then
         *      shows the home tab
         * @returns {undefined}
         */
        $scope.showHome = function() {
            $scope.home.start();
            $scope.currentWindow = "home";
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
    fallOfMenApp.directive("homeTemplate", function() {
        return {
            restrict: 'E',
            templateUrl: "templates/home-template.html",
            controller: function() {

            },
            controllerAs: 'homeTemplate'
        };
    });
    fallOfMenApp.directive("hangarTemplate", function() {
        return {
            restrict: 'E',
            templateUrl: "templates/hangar-template.html",
            controller: function() {

            },
            controllerAs: 'hangarTemplate'
        };
    });
    fallOfMenApp.directive("profileTemplate", function() {
        return {
            restrict: 'E',
            templateUrl: "templates/profile-template.html",
            controller: function() {

            },
            controllerAs: 'profileTemplate'
        };
    });
    fallOfMenApp.directive("statisticTemplate", function() {
        return {
            restrict: 'E',
            templateUrl: "templates/statistic-template.html",
            controller: function() {

            },
            controllerAs: 'statisticTemplate'
        };
    });
    fallOfMenApp.directive("shopTemplate", function() {
        return {
            restrict: 'E',
            templateUrl: "templates/shop-template.html",
            controller: function() {

            },
            controllerAs: 'shopTemplate'
        };
    });
})();
