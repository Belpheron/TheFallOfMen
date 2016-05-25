//global variables
var p1AnimationTimer;
var p2AnimationTimer;
var roundIntervalTimer;
var roundWatch;

//angular code
(function() {
    var fallOfMenApp = angular.module("fallOfMenApp", []);
    fallOfMenApp.controller("controller", function($scope, $http, accessService, $interval) {
        //variables
        $scope.game = new Game(accessService, $scope);
        
        //methods
        
    });

    //directives
    fallOfMenApp.factory('accessService', function($http, $log, $q)
    {
        return {
            getData: function(url, async, method, params, data)
            {
                var deferred = $q.defer();
                $http({
                    url: url,
                    method: method,
                    asyn: async,
                    params: params,
                    data: data,
                })
                        .success(function(response, status, headers, config)
                        {
                            deferred.resolve(response);
                        })
                        .error(function(msg, code)
                        {
                            deferred.reject(msg);
                            $log.error(msg, code);
                        });

                return deferred.promise;
            }
        }
    });
})();


