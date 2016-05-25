<!DOCTYPE html>
<?php
//includes
require_once "php/model/persist/LoginADO.php";
require_once "php/model/User.php";

//session control
session_start();

if (!isset($_SESSION["user"]))
{
    header("Location:index.php?error=2");
}

if (isset($_GET["logOut"]))
{
    $ado = new LoginADO();
    $user = $_SESSION["user"];
    $ado->removeOnlineUser($user);
    session_destroy();
    Header("Location: index.php");
}
?>
<html ng-app="fallOfMenApp">
    <head>
        <title>The fall of men - Home</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!--FRAMEWORKS-->
        <script src="js/frameWorks/jQuery/jquery-2.2.3.min.js" type="text/javascript"></script>
        <script src="js/frameWorks/angular/angular.min.js" type="text/javascript"></script>
        <script src="js/frameWorks/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>

        <!--STYLE-->
        <link href="css/LoginStyle.css" rel="stylesheet" type="text/css"/>
        <link href="js/frameWorks/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css"/>
        <link href="css/homeStyle.css" rel="stylesheet" type="text/css"/>
        <link href="css/generalStyle.css" rel="stylesheet" type="text/css"/>
        <link href="css/hangarStyle.css" rel="stylesheet" type="text/css"/>
        <link href="css/shopStyle.css" rel="stylesheet" type="text/css"/>
        <link href="css/profileStyle.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">

        <!--CONTROL-->
        <script src="js/control/MainWindow.js" type="text/javascript"></script>
        <script src="js/control/ProfileWindow.js" type="text/javascript"></script>
        <script src="js/control/generalFunctions.js" type="text/javascript"></script>

        <!--MODEL-->
        <script src="js/model/Home.js" type="text/javascript"></script>
        <script src="js/model/Profile.js" type="text/javascript"></script>
        <script src="js/model/RobotStatistic.js" type="text/javascript"></script>
        <script src="js/model/User.js" type="text/javascript"></script>
        <script src="js/model/UserStatistic.js" type="text/javascript"></script>
        <script src="js/model/RegisterObj.js" type="text/javascript"></script>
        <script src="js/model/Country.js" type="text/javascript"></script>
        <script src="js/model/Shop.js" type="text/javascript"></script>
        <script src="js/model/Skill.js" type="text/javascript"></script>
        <script src="js/model/Home.js" type="text/javascript"></script>
        <script src="js/model/Profile.js" type="text/javascript"></script>
        <script src="js/model/RobotStatistic.js" type="text/javascript"></script>
        <script src="js/model/User.js" type="text/javascript"></script>
        <script src="js/model/UserStatistic.js" type="text/javascript"></script>   
        <script src="js/model/ChatMessage.js" type="text/javascript"></script>
        <script src="js/model/Implant.js" type="text/javascript"></script>
        <script src="js/model/FightDetails.js" type="text/javascript"></script>
        <script src="js/model/Hangar.js" type="text/javascript"></script>
    </head>
    <body ng-controller="controller as ctrl" class="background" ng-init="loadUserDetails('<?php echo $_SESSION["user"]->getUserName() ?>')">
        <div class="blocker" ng-show="showBlocker"></div>
        <header class="menuBar row">
            <a href="mainWindow.php?logOut=1" class="menuButton btn btn-danger">LOGOUT</a>
            <button class="menuButton btn btn-primary" ng-click="showHome()">HOME</button>
            <button class="menuButton btn btn-primary" ng-click="hangar.hangarShow()">HANGAR</button>
            <button class="menuButton btn btn-primary" ng-click="shop.showShop()">SHOP</button>
            <button class="menuButton btn btn-primary" ng-click="profileWindow.showProfile()">PROFILE</button>
        </header>
        <!--para mayor rapidez hacemos todos los menus en una misma pagina, asi mismo podremos hacer un efecto slider-->
        <!--esto sera la pestaña de home -->
    <home-template></home-template>
    <!--esto sera la pestaña de  hangar-->
    <hangar-template></hangar-template>
    <!--esto sera la pestaña de home -->
    <shop-template></shop-template>
    <!--esto sera la pestaña de home -->
    <main ng-show="currentWindow == 'profile'">
        <div class="row">
            <profile-template></profile-template>
            <statistic-template></statistic-template>
        </div>
    </main>
    <span class="text-primary">Connected as <strong>{{currentUser.getUserName()}}</strong></span>
</body>
</html>
