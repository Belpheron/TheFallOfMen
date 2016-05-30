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
        $scope.allUsers = new Array();
        $scope.editImplant = -1;
        $scope.editSkill = -1;
        $scope.calcAttribute = -1;
        calcAttributeSkill = -1;
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
            $scope.messageAdmin = "";
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
            $scope.messageAdmin = "";
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
         * @name trySaveChangesImplant()
         * @author franc
         * @version 1.0
         * @date 27/05/2016
         * @description send a request to save a implant changes.
         * @returns none.
         */
        $scope.trySaveChangesImplant = function (implant)
        {

            var idAttribute = 0;
            var iso = "";
            if ($scope.allOKSkill(implant))
            {

                switch (implant.attribute)
                {
                    case 'ap':
                        idAttribute = '1';
                        iso = "ap";
                        break;
                    case 'dp':
                        idAttribute = '2';
                        iso = "dp";
                        break;
                    case 'cp':
                        idAttribute = '3';
                        iso = "cp";
                        break;
                    case 'hp':
                        idAttribute = '4';
                        iso = "hp";
                        break;
                    default:
                        break;
                }
                implant.setAttribute(idAttribute);
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
                    implant.attribute = iso;
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
            $scope.messageAdmin = "";
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
            $scope.messageAdmin = "";
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
            $scope.messageAdmin = "";
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
                                (outputData[1][i].multiplier)
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
            $scope.messageAdmin = "";
            $scope.allSkills = new Array();
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
                                (outputData[1][i].multiplier)
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
         * @name cancelEdit()
         * @author franc
         * @version 1.0
         * @date 30/05/2016
         * @description hide the current edition and discard the changes.
         * @returns none.
         */

        $scope.cancelEdit = function ()
        {
            $scope.messageAdmin = "Skill or implant no modified";
            $scope.editImplant = -1;
            $scope.editSkill = -1;
            editInProgress = false;
        };

        /**
         * @name trySaveChangesSkill()
         * @author franc
         * @version 1.0
         * @date 30/05/2016
         * @description send a request to save a skill changes.
         * @returns none.
         */
        $scope.trySaveChangesSkill = function (skill)
        {
            var idAttribute = 0;
            var iso = "";
            if ($scope.allOKSkill(skill))
            {

                switch (skill.attribute)
                {
                    case 'ap':
                        idAttribute = '1';
                        iso = "ap";
                        break;
                    case 'dp':
                        idAttribute = '2';
                        iso = "dp";
                        break;
                    case 'cp':
                        idAttribute = '3';
                        iso = "cp";
                        break;
                    case 'hp':
                        idAttribute = '4';
                        iso = "hp";
                        break;
                    default:
                        break;
                }
                skill.setAttribute(idAttribute);
                var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 8, action: 206, jsonData: JSON.stringify(skill)});
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
                    skill.attribute = iso;
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
         * @name tryDeleteSkill()
         * @author franc
         * @version 1.0
         * @date 27/05/2016
         * @description send a request to delete a skill.
         * @returns none.
         */
        $scope.tryDeleteSkill = function (skill)
        {
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 8, action: 207, jsonData: JSON.stringify(skill)});
            promise.then(function (outputData)
            {
                if (outputData[0] === true)
                {
                    $scope.messageAdmin = "Skill delete success";
                    for (var i = 0; i < $scope.allSkills.length; i++)
                    {
                        if (skill.getId() == $scope.allSkills[i].getId())
                        {
                            $scope.allSkills.splice(i, 1);
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
         * @name manageChat()
         * @author franc
         * @version 1.0
         * @date 26/05/2016
         * @description allow erase some file of chat
         * @returns none.
         */
        $scope.manageChat = function ()
        {
            $scope.showAdmin = 3;
            $scope.messageAdmin = "";
        };

        /**
         * @name cleanChat()
         * @author franc
         * @version 1.0
         * @date 30/05/2016
         * @description erase a few rows of chat (lees size of data base.).
         * @returns none.
         */
        $scope.cleanChat = function ()
        {
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 8, action: 208, jsonData: ""});
            promise.then(function (outputData)
            {
                if (outputData[0] === true)
                {
                    $scope.messageAdmin = "Size of chat reduced!";
                }
                else
                {
                    $scope.messageAdmin = outputData[1];
                }
            });

        };

        /**
         * @name dropOutUsers()
         * @author franc
         * @version 1.0
         * @date 30/05/2016
         * @description erase a few rows of chat (lees size of data base.).
         * @returns none.
         */
        $scope.dropOutUsers = function ()
        {
            $scope.showAdmin = 4;
            $scope.messageAdmin = "";   
            //load all user are inactive.
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 8, action: 209, jsonData: ""});
            promise.then(function (outputData)
            {
                $scope.allUsers = new Array();
                if (outputData[0] === true)
                {
                    
                    for (var i = 0; i < outputData[1].length; i++)
                    {
                        var user = new User(outputData[1][i].userName,0);
                        $scope.allUsers.push(user);
                    }
                }
                else
                {
                    $scope.messageAdmin = outputData[1];
                }
                console.log($scope.allUsers);
            });
        };
        
         /**
         * @name tryDeleteUser()
         * @author franc
         * @version 1.0
         * @date 30/05/2016
         * @description send a requset for delete a user at db.
         * @returns none.
         */
        $scope.tryDeleteUser = function (user)
        {
            //try to delete user.
             var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 8, action: 210, jsonData: JSON.stringify(user)});
            promise.then(function (outputData)
            {
                if (outputData[0] === true)
                {
                    for (var i = 0; i < $scope.allUsers.length; i++)
                    {
                        if (user.getUserName() == $scope.allUsers[i].getUserName())
                        {
                            $scope.allUsers.splice(i, 1);
                        }
                    }
                }
                else
                {
                    $scope.messageAdmin = outputData[1];
                }
                console.log($scope.allUsers);
            });
        };
    });


    //directives
    fallOfMenAppAdmin.directive("manageUser", function ()
    {
        return {
            restrict: 'E',
            templateUrl: "templates/manage-user.html",
            controller: function ()
            {

            },
            controllerAs: 'manageUser'
        };
    });
     fallOfMenAppAdmin.directive("manageChatTemplate", function ()
    {
        return {
            restrict: 'E',
            templateUrl: "templates/manage-chat-template.html",
            controller: function ()
            {

            },
            controllerAs: 'manageChatTemplate'
        };
    });

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
