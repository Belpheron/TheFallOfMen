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
        <script src="js/frameWorks/angular/dirPagination.js" type="text/javascript"></script>

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
                <manage-implant></manage-implant>
            </div>
            <div ng-show="showAdmin == 2">
                <manage-skill></manage-skill>
            </div>
            
        </main>
    </body>
    {{messageAdmin}}

</html>


