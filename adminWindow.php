<!DOCTYPE html>
<?php
session_start();
if (!isset($_SESSION["admin"]))
{
    header("Location:index.php?error=2");
}

if (isset($_GET["logOut"]))
{
    $user = $_SESSION["admin"];
    session_destroy();
    Header("Location: index.php");
}
?>

<html ng-app="fallOfMenAppAdmin" >
    <head>
        <title>The fall of men - Admin</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <!--FRAMEWORKS-->
        <script src="js/frameWorks/jQuery/jquery-2.2.3.min.js" type="text/javascript"></script>
        <script src="js/frameWorks/angular/angular.min.js" type="text/javascript"></script>
        <script src="js/frameWorks/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>

        <!--STYLE-->
        <link href="js/frameWorks/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">
        <link href="css/adminWindow.css" rel="stylesheet" type="text/css"/>
        <link href="css/generalStyle.css" rel="stylesheet" type="text/css"/>

        <!--CONTROL-->
        <script src="js/control/AdminWindow.js" type="text/javascript"></script>
        <script src="js/control/generalFunctions.js" type="text/javascript"></script>

        <!--MODEL-->
        <script src="js/model/User.js" type="text/javascript"></script>
        <script src="js/model/Skill.js" type="text/javascript"></script>
        <script src="js/model/Implant.js" type="text/javascript"></script>
    </head>
    <body class="background" ng-controller="controller as ctrl">
        <header class="menuBar row">
            <a href="mainWindow.php?logOut=1" class="menuButton logoutButton btn">LOGOUT</a>
            <button class="menuButton btn" ng-click="manageImplants()">MANAGE IMPLANTS</button>
            <button class="menuButton btn" ng-click="manageSkills()">MANAGE SKILLS</button>
            <button class="menuButton btn" ng-click="manageChat()">CHAT</button>
            <button class="menuButton btn" ng-click="dropOutUsers()">DROP OUT USER</button>
        </header>
        <main>
            <!--init -->
            <div ng-show="showAdmin == 0">
                <label class="text-capitalize alert-info">Choose a option</label>
                informacion variada y de uso administrativo.
            </div>

            <!--manage implants -->
            <div ng-show="showAdmin == 1">
                <button class="btn btn-info" ng-click="showFormCreateImplant()">Create Implant</button>
                <button class="btn btn-info" ng-click="modifyImplant()">Modify Implant</button>
                <button class="btn btn-info"ng-click="deleteImplant()">Delete Implant</button>
                <button class="btn btn-danger bottom-left" ng-click="showAdmin = 0">Back</button>
                <hr>
                <div  class="row" ng-show="showFormsAdmin == 11">
                    <div class="col-md-7">
                        <form  id="formCreateImplant" name="formCreateImplant" class="bordered semi-color-form col-lg-offset-2" novalidate="" ng-submit="formCreateImplant.$valid && ctrl.saveImplant()">
                            <div class="row">
                                <div class="col-md-4">
                                    <label class="label-form">Name</label><br>
                                    <label class="label-form">Description</label><br>
                                    <label class="label-form">Price</label><br>
                                    <label class="label-form">Attribute affected</label><br>
                                    <label class="label-form">Value</label><br>
                                    <label class="label-form">Target</label><br>

                                </div>
                                <div class="col-md-8"> 
                                    <input required class="form-control" ng-pattern="^[\D\d]{5,50}$" type="text" ng-model="implant.name"><br>
                                    <input required class="form-control" ng-pattern="^[\D\d]{5,50}$" type="text" ng-model="implant.description"><br>
                                    <input required class="form-control" type="number" min="5" max="100" step="1" ng-pattern="/^[1]?[0-9]{1,2}$/" ng-model="implant.buyPrice"><br>
                                    <select class="" type="text" ng-model="implant.attrName" ng-init="implant.attrName = '1'">
                                        <option value="1">Attack points</option>
                                        <option value="2">Defense points</option>
                                        <option value="3">Critical points</option>
                                        <option value="4">Health points</option>
                                    </select><br>
                                    <input required class="form-control" type="number" min="1" max="20" ng-pattern="/^[1-2]?[0-9]{1}$/" ng-model="implant.attrValue"><br>
                                    <select class="" type="text" ng-model="implant.target" ng-init="implant.target = 'self'">
                                        <option value="self">Self</option>
                                        <option value="enemy">Enemy</option>
                                    </select><br>
                                </div> 
                                <button type="submit" id="btnCreate" class= "btn btn-success" ng-disabled="formCreateImplant.$invalid">Create</button>
                                <button type="reset" id="btnReset" class= "btn btn-danger">Reset</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </body>
    {{messageAdmin}}
</html>


