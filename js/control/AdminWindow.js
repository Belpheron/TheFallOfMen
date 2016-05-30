//angular code
(function ()
{
    var fallOfMenAppAdmin = angular.module("fallOfMenAppAdmin", ["angularUtils.directives.dirPagination"]);

    fallOfMenAppAdmin.controller("controller", function ($scope, $http, accessService)
    {

        //scope
        $scope.showAdmin = 0;
        $scope.showFormsAdmin = 0;
        $scope.implant = new Implant();
        $scope.skill = new Skill();
        $scope.messageAdmin = "";
        $scope.allImplants = new Array();
        $scope.allSkills = new Array();
        $scope.editImplant = -1;
        $scope.editSkill = -1;
        $scope.calcAttribute = -1;
        $scope.currentPage = 1;
        $scope.pagSize = 5;
        $scope.implantToSearchName;
        $scope.implantToSearchAttr;
        this.implantSearch = new Implant();
        this.skillSearch = new Skill();

        //variables
        var editInProgress = false;

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
        $scope.manageImplants = function ()
        {
            $scope.showAdmin = 1;
        };

        /**
         * @name showFormCreateImplant()
         * @author franc
         * @version 1.0
         * @date 26/05/2016
         * @description shows a form to add new implant.
         * @returns none.
         */
        $scope.showFormCreateImplant = function ()
        {
            $scope.showFormsAdmin = 11;
        };

        /**
         * @name saveImplant()
         * @author franc
         * @version 1.0
         * @date 26/05/2016
         * @description send a request for save new implant.
         * @returns none.
         */
        this.saveImplant = function ()
        {
            var implant = angular.copy($scope.implant);
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 8, action: 200, jsonData: JSON.stringify(implant)});
            promise.then(function (outputData)
            {
                if (outputData[0] === true)
                {
                    $scope.messageAdmin = "Implant save success";
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
         * @name modifyImplant()
         * @author franc
         * @version 1.0
         * @date 27/05/2016
         * @description shows a form to modify  implant.
         * @returns none.
         */
        $scope.modifyImplant = function ()
        {
            $scope.showFormsAdmin = 12;
            $scope.allImplants = new Array();
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 8, action: 201, jsonData: ""});
            promise.then(function (outputData)
            {
                if (outputData[0] === true)
                {
                    for (var i = 0; i < outputData[1].length; i++)
                    {
                        var implant = new Implant(outputData[1][i].id,
                                outputData[1][i].name,
                                outputData[1][i].description,
                                parseInt(outputData[1][i].buyPrice));
                        implant.attribute = (outputData[1][i].attribute);
                        implant.value = (outputData[1][i].value);
                        implant.target = (outputData[1][i].target);
                        $scope.allImplants.push(implant);
                    }
                }
                else
                {
                    $scope.messageAdmin = outputData[1];
                }
            });
        };

        /**
         * @name deleteImplant()
         * @author franc
         * @version 1.0
         * @date 27/05/2016
         * @description shows a form to delete implant.
         * @returns none.
         */
        $scope.deleteImplant = function ()
        {
            $scope.showFormsAdmin = 13;
            $scope.allImplants = new Array();
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 8, action: 201, jsonData: ""});
            promise.then(function (outputData)
            {
                if (outputData[0] === true)
                {
                    for (var i = 0; i < outputData[1].length; i++)
                    {
                        var implant = new Implant(outputData[1][i].id,
                                outputData[1][i].name,
                                outputData[1][i].description,
                                parseInt(outputData[1][i].buyPrice));
                        implant.attribute = (outputData[1][i].attribute);
                        implant.value = (outputData[1][i].value);
                        implant.target = (outputData[1][i].target);
                        $scope.allImplants.push(implant);
                    }
                }
                else
                {
                    $scope.messageAdmin = outputData[1];
                }
            });
        };

        /**
         * @name allowEdit()
         * @author franc
         * @version 1.0
         * @date 27/05/2016
         * @description allow edit implant in table.
         * @returns none.
         */
        $scope.allowEdit = function (index)
        {
            if (editInProgress == false)
            {
                editInProgress = true;
                $scope.editImplant = index;
            }
            else
            {
                $scope.messageAdmin = "Before edit a new row first finish current";
            }

        };

        /**
         * @name loadSelectAttribute()
         * @author franc
         * @version 1.0
         * @date 27/05/2016
         * @description set a first value for a select.
         * @returns none.
         */
        $scope.loadSelectAttribute = function (attribute)
        {
            switch (attribute)
            {
                case 'ap':
                    $scope.calcAttribute = '1';
                    break;
                case 'dp':
                    $scope.calcAttribute = '2';
                    break;
                case 'cp':
                    $scope.calcAttribute = '3';
                    break;
                case 'hp':
                    $scope.calcAttribute = '4';
                    break;
                default:
                    break;
            }
        };


        /**
         * @name trySaveChangesImplant()
         * @author franc
         * @version 1.0
         * @date 27/05/2016
         * @description send a request to save a implant changes.
         * @returns none.
         */
        $scope.trySaveChangesImplant = function (implant, attr)
        {
            if ($scope.allOK(implant))
            {
                implant.setAttribute(attr);
                var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 8, action: 202, jsonData: JSON.stringify(implant)});
                promise.then(function (outputData)
                {
                    if (outputData[0] === true)
                    {
                        $scope.messageAdmin = "Implant modify success";
                        $scope.editImplant = -1;
                        editInProgress = false;
                    }
                    else
                    {
                        $scope.messageAdmin = outputData[1];
                    }
                });
            }
            else
            {
                $scope.messageAdmin = "Fill correctly all fields to update";
            }
        };

        /**
         * @name delete()
         * @author franc
         * @version 1.0
         * @date 27/05/2016
         * @description send a request to delete a implant.
         * @returns none.
         */
        $scope.delete = function (implant)
        {
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 8, action: 203, jsonData: JSON.stringify(implant)});
            promise.then(function (outputData)
            {
                if (outputData[0] === true)
                {
                    $scope.messageAdmin = "Implant delete success";
                    for (var i = 0; i < $scope.allImplants.length; i++)
                    {
                        if (implant.getId() == $scope.allImplants[i].getId())
                        {
                            $scope.allImplants.splice(i, 1);
                        }
                    }
                }
                else
                {
                    $scope.messageAdmin = outputData[1];
                }
            });
        };

        /**
         * @name allOK()
         * @author franc
         * @version 1.0
         * @date 27/05/2016
         * @description ensure that all fileds arre well informed.
         * @returns none.
         */
        $scope.allOK = function (implant)
        {
            var flag = 0;
            if (implant.nameOK())
            {
                flag++;
            }
            if (implant.descriptionOK())
            {
                flag++;
            }
            if (implant.buyPriceOK())
            {
                flag++;
            }
            if (implant.valueOK())
            {
                flag++;
            }
            if (flag == 4)
            {
                return true;
            }
            else
            {
                return false;
            }
        };

        /**
         * @name manageSkills()
         * @author franc
         * @version 1.0
         * @date 26/05/2016
         * @description allow CRUD skills
         * @returns none.
         */
        $scope.manageSkills = function ()
        {
            $scope.showAdmin = 2;
        };

        /**
         * @name showFormCreateSkill()
         * @author franc
         * @version 1.0
         * @date 30/05/2016
         * @description shows a form to add new skill.
         * @returns none.
         */
        $scope.showFormCreateSkill = function ()
        {
            $scope.showFormsAdmin = 21;
        };

        /**
         * @name modifySkill()
         * @author franc
         * @version 1.0
         * @date 30/05/2016
         * @description shows a form to modify skill.
         * @returns none.
         */
        $scope.modifySkill = function ()
        {
            $scope.showFormsAdmin = 22;
            $scope.allSKills = new Array();
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 8, action: 204, jsonData: ""});
            promise.then(function (outputData)
            {
                if (outputData[0] === true)
                {
                    for (var i = 0; i < outputData[1].length; i++)
                    {
                        var skill = new Skill(outputData[1][i].id,
                                outputData[1][i].name,
                                outputData[1][i].description,
                                parseInt(outputData[1][i].requiredLevel),
                                parseInt(outputData[1][i].buyPrice),
                                parseInt(outputData[1][i].multiplier)
                                );
                        skill.attribute = (outputData[1][i].attribute);
                        skill.value = (outputData[1][i].value);
                        skill.target = (outputData[1][i].target);
                        $scope.allSkills.push(skill);
                    }
                }
                else
                {
                    $scope.messageAdmin = outputData[1];
                }
            });
            console.log($scope.allSKills);
        };

        /**
         * @name deleteSkill()
         * @author franc
         * @version 1.0
         * @date 30/05/2016
         * @description shows a form to delete skill.
         * @returns none.
         */
        $scope.deleteSkill = function ()
        {
            $scope.showFormsAdmin = 23;
            $scope.allSkills = new Array();
            //otro numero de action
            //var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 8, action: 201, jsonData: ""});
            promise.then(function (outputData)
            {
                if (outputData[0] === true)
                {
                    for (var i = 0; i < outputData[1].length; i++)
                    {
                        var skill = new Skill(outputData[1][i].id,
                                outputData[1][i].name,
                                outputData[1][i].description,
                                parseInt(outputData[1][i].buyPrice));
                        skill.attribute = (outputData[1][i].attribute);
                        skill.value = (outputData[1][i].value);
                        $scope.allSkills.push(skill);
                    }
                }
                else
                {
                    $scope.messageAdmin = outputData[1];
                }
            });
        };

        /**
         * @name saveSkill()
         * @author franc
         * @version 1.0
         * @date 30/05/2016
         * @description send a request for save new skill.
         * @returns none.
         */
        this.saveSkill = function ()
        {
            var skill = angular.copy($scope.skill);
            console.log(skill);
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 8, action: 205, jsonData: JSON.stringify(skill)});
            promise.then(function (outputData)
            {
                if (outputData[0] === true)
                {
                    $scope.messageAdmin = "Skill save success";
                    $scope.formCreateSkill.$setPristine();
                    $scope.skill = new Skill();
                }
                else
                {
                    $scope.messageAdmin = outputData[1];
                }
            });
        };

        /**
         * @name allowEditSkill()
         * @author franc
         * @version 1.0
         * @date 30/05/2016
         * @description allow edit skill in table.
         * @returns none.
         */
        $scope.allowEditSkill = function (index)
        {
            if (editInProgress == false)
            {
                editInProgress = true;
                $scope.editSkill = index;
            }
            else
            {
                $scope.messageAdmin = "Before edit a new row first finish current";
            }

        };

        /**
         * @name trySaveChangesSkill()
         * @author franc
         * @version 1.0
         * @date 30/05/2016
         * @description send a request to save a skill changes.
         * @returns none.
         */
        $scope.trySaveChangesSkill = function (skill, attr)
        {
            if ($scope.allOKSkill(skill))
            {
                skill.setAttribute(attr);
                var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 8, action: 206, jsonData: JSON.stringify(implant)});
                promise.then(function (outputData)
                {
                    if (outputData[0] === true)
                    {
                        $scope.messageAdmin = "Skill modify success";
                        $scope.editSkill = -1;
                        editInProgress = false;
                    }
                    else
                    {
                        $scope.messageAdmin = outputData[1];
                    }
                });
            }
            else
            {
                $scope.messageAdmin = "Fill correctly all fields to update";
            }
        };

           /**
         * @name allOK()
         * @author franc
         * @version 1.0
         * @date 30/05/2016
         * @description ensure that all fileds arre well informed.
         * @returns none.
         */
        $scope.allOKSkill = function (skill)
        {
            var flag = 0;
            if (skill.nameOK())
            {
                flag++;
            }
            if (skill.descriptionOK())
            {
                flag++;
            }
            if (skill.buyPriceOK())
            {
                flag++;
            }
            if (skill.valueOK())
            {
                flag++;
            }
            if (flag == 4)
            {
                return true;
            }
            else
            {
                return false;
            }
        };

















        /**
         * @name manageChat()
         * @author franc
         * @version 1.0
         * @date 26/05/2016
         * @description allow erase some file of chat
         * @returns none.
         */
        $scope.manageChat = function ()
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
        $scope.dropOutUsers = function ()
        {

        };
    });


    //directives
    fallOfMenAppAdmin.directive("manageImplant", function ()
    {
        return {
            restrict: 'E',
            templateUrl: "templates/manage-implant.html",
            controller: function ()
            {

            },
            controllerAs: 'manageImplant'
        };
    });

    fallOfMenAppAdmin.directive("manageSkill", function ()
    {
        return {
            restrict: 'E',
            templateUrl: "templates/manage-skill.html",
            controller: function ()
            {

            },
            controllerAs: 'manageSkill'
        };
    });

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
