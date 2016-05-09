//global variables
var userTimer;

//angular code
(function() {
    var fallOfMenApp = angular.module("fallOfMenApp", []);
    fallOfMenApp.controller("controller", function($scope, $http, accessService) {
        //scope variables
        $scope.home = new Home(accessService);        

        //interface variables
        $scope.currentWindow = "profile";

        //methods
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


