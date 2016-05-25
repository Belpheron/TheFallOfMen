//global variables
var userLoadTimer;
var chatMessageLoadTimer;
var duelRequestTimer;
var responseTimer;
var checkRequestResponseTimer;

//jQuery code

//angular code
(function ()
{
    var fallOfMenApp = angular.module("fallOfMenApp", []);

    fallOfMenApp.controller("controller", function ($scope, $window, $http, $compile, accessService)
    {
        //profile variables
        $scope.profileWindow = new ProfileWindow(accessService, $scope);
        $scope.showDisclaimerDropOut = 0;

        //shop variables
        $scope.shop = new Shop(accessService, $scope);

        //home variables
        $scope.home = new Home(accessService, $scope);
        $scope.currentUser = new User();
        $scope.loginDateTime = getNowSQLDatetime();

        //interface variables
        $scope.currentWindow = "profile";
        $scope.showBlocker = false;
        
        //Hangar variables
        $scope.hangar = new Hangar(accessService, $scope);

        //methods         

        /**
         * @name loadUserDetails()
         * @author Juan/franc
         * @version 2.0
         * @date 11/05/2016
         * @description loads all user details from database
         * @param userName : the user name to load
         * @returns {n/a}
         */
        $scope.loadUserDetails = function (userName)
        {
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 2, action: 100, jsonData: {userName: userName}});
            promise.then(function (outputData)
            {
                if (outputData[0] === true)
                {
                    //load profile data.
                    var profileData = new Profile(
                            outputData[2].id,
                            outputData[2].name,
                            outputData[2].lastName1,
                            outputData[2].lastName2,
                            outputData[2].birthDate,
                            outputData[2].email,
                            outputData[2].idCountry);
                    //load user statistics data.
                    var userStatisticData = new UserStatistic(
                            outputData[3].id,
                            outputData[3].id,
                            outputData[3].wins,
                            outputData[3].defeats,
                            outputData[3].totalInflictedDamage,
                            outputData[3].totalRecivedDamage,
                            outputData[3].totalWinCoins,
                            outputData[3].totalExpendCoins);
                    //load robot statistica data.
                    var robotStatisticData = new RobotStatistic(
                            outputData[4].id,
                            outputData[4].name,
                            outputData[4].level,
                            outputData[4].experience,
                            outputData[4].idRobotSkin);
                    //load user data.
                    $scope.currentUser = new User(
                            outputData[1].userName,
                            outputData[1].coins);
                    $scope.currentUser.setProfile(profileData);
                    $scope.currentUser.setUserStatistic(userStatisticData);
                    $scope.currentUser.setRobotStatistic(robotStatisticData);
                    console.log($scope.currentUser);
                } else
                {
                    alert("Can't load all information about user, Try again please.");
                    window.open("mainWindow.php?logOut=1", "_self");
                }
            });
            ///////////////////////////////////////
            /*var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                    {controllerType: 2, action: 100, jsonData: {userName: "alumne"}});
            promise.then(function (outputData) {
                console.log(outputData[1]);
            });*/
        };

        /**
         * @name logout()
         * @author Juan
         * @version 1.0
         * @date 09/05/2016
         * @description removes userName from onlineusers table
         * @returns {n/a}
         */

        $scope.logout = function ()
        {
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 2, action: 104, jsonData: {userName: $scope.currentUser.getUserName()}});
            promise.then(function (outputData)
            {
                if (outputData[0] === true)
                {
                    window.open("mainWindow.php?logOut=1", "_self");
                } else
                {
                    window.open("mainWindow.php?logOut=2", "_self");
                }
            });
        };

        /**
         * @name showHome()
         * @author Juan
         * @version 1.0
         * @date 09/05/2016
         * @descripton loads online users data and creates a new Home object, then
         *      shows the home tab
         * @returns {undefined}
         */
        $scope.showHome = function ()
        {
            $scope.home.start();
            $scope.currentWindow = "home";
             clearInterval($scope.tempo);
        };
    });


    //directives

    fallOfMenApp.directive('compileData', function ($compile)
    {
        return {
            scope: true,
            link: function (scope, element, attrs)
            {

                var elmnt;

                attrs.$observe('template', function (myTemplate)
                {
                    if (angular.isDefined(myTemplate))
                    {
                        // compile the provided template against the current scope
                        elmnt = $compile(myTemplate)(scope);

                        element.html(""); // dummy "clear"

                        element.append(elmnt);
                    }
                });
            }
        };
    });

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
    fallOfMenApp.directive("homeTemplate", function ()
    {
        return {
            restrict: 'E',
            templateUrl: "templates/home-template.html",
            controller: function ()
            {

            },
            controllerAs: 'homeTemplate'
        };
    });
    fallOfMenApp.directive("hangarTemplate", function ()
    {
        return {
            restrict: 'E',
            templateUrl: "templates/hangar-template_1.html",
            controller: function ()
            {

            },
            controllerAs: 'hangarTemplate'
        };
    });
    fallOfMenApp.directive("profileTemplate", function ()
    {
        return {
            restrict: 'E',
            templateUrl: "templates/profile-template.html",
            controller: function ()
            {

            },
            controllerAs: 'profileTemplate'
        };
    });
    fallOfMenApp.directive("statisticTemplate", function ()
    {
        return {
            restrict: 'E',
            templateUrl: "templates/statistic-template.html",
            controller: function ()
            {

            },
            controllerAs: 'statisticTemplate'
        };
    });
    fallOfMenApp.directive("shopTemplate", function ()
    {
        return {
            restrict: 'E',
            templateUrl: "templates/shop-template.html",
            controller: function ()
            {

            },
            controllerAs: 'shopTemplate'
        };
    });
})();
