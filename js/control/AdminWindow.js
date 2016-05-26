//angular code
(function ()
{
    var fallOfMenAppAdmin = angular.module("fallOfMenAppAdmin", []);

    fallOfMenAppAdmin.controller("controller", function ($scope, $http, accessService)
    {

        //scope
        $scope.showAdmin=0;
        $scope.showFormsAdmin=0;
        $scope.implant = new Implant();
        $scope.messageAdmin="";
        
        //methods        
        /**
         * @name logout()
         * @author franc
         * @version 1.0
         * @date 26/05/2016
         * @description log out the user
         * @returns none.
         */
        $scope.logout = function ()
        {
            window.open("mainWindow.php?logOut=1", "_self");
        };
        
        /**
         * @name manageImplants()
         * @author franc
         * @version 1.0
         * @date 26/05/2016
         * @description allow CRUD implants
         * @returns none.
         */
        $scope.manageImplants = function()
        {
             $scope.showAdmin=1;
        };
        
        /**
         * @name showFormCreateImplant()
         * @author franc
         * @version 1.0
         * @date 26/05/2016
         * @description shows a form to add new implant.
         * @returns none.
         */
        $scope.showFormCreateImplant = function()
        {
            $scope.showFormsAdmin=11;
        };
        
         /**
         * @name saveImplant()
         * @author franc
         * @version 1.0
         * @date 26/05/2016
         * @description send a request for save new implant.
         * @returns none.
         */
        this.saveImplant = function()
        {
            alert();
            var implant = angular.copy($scope.implant);
             var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 8, action: 200, jsonData:JSON.stringify(implant)});
            promise.then(function (outputData)
            {
                if (outputData[0] === true)
                {
                    $scope.messageAdmin="Implant save success";
                    $scope.formCreateImplant.$setPristine();
                    $scope.implant = new Implant();
                }
                else
                {
                    $scope.messageAdmin = outputData[1];
                }
            });
        };
        
          /**
         * @name manageSkills()
         * @author franc
         * @version 1.0
         * @date 26/05/2016
         * @description allow CRUD skills
         * @returns none.
         */
        $scope.manageSkills = function()
        {
            
        };
        
          /**
         * @name manageChat()
         * @author franc
         * @version 1.0
         * @date 26/05/2016
         * @description allow erase some file of chat
         * @returns none.
         */
        $scope.manageChat = function()
        {
            
        };
        
              /**
         * @name dropOutUsers()
         * @author franc
         * @version 1.0
         * @date 26/05/2016
         * @description allow drop users are inactive.
         * @returns none.
         */
        $scope.dropOutUsers = function()
        {
            
        };
    });


    //directives


    fallOfMenAppAdmin.factory('accessService', function ($http, $log, $q)
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
