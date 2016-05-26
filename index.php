<!DOCTYPE html>
<?php
//includes
require_once "php/controllers/LoginController.php";

//session control
session_start();
if (isset($_SESSION["user"])) {
    header("Location: mainWindow.php");
}

//controller start
$controller = new LoginController();
$controller->run();
?>
<html ng-app="fallOfMenApp">
    <head>
        <title>The fall of men - Login</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!--FRAMEWORKS-->
        <script src="js/frameWorks/jQuery/jquery-2.2.3.min.js" type="text/javascript"></script>
        <script src="js/frameWorks/angular/angular.min.js" type="text/javascript"></script>
        <!--<script src="js/frameWorks/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>-->

        <!--STYLE-->
        <link href="css/LoginStyle.css" rel="stylesheet" type="text/css"/>        
        <!--<link href="js/frameWorks/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css"/>-->

        <!--DATEPICKER-->
        <script src="js/frameWorks/jquery-ui-1.12.0-rc.2/jquery-ui.min.js" type="text/javascript"></script>
        <link href="js/frameWorks/jquery-ui-1.12.0-rc.2/jquery-ui.min.css" rel="stylesheet" type="text/css"/>

        <!--CONTROL-->
        <script src="js/control/LoginPage.js" type="text/javascript"></script>
        <script src="js/control/generalFunctions.js" type="text/javascript"></script>

        <!--MODEL-->
        <script src="js/model/RegisterObj.js" type="text/javascript"></script>
        <script src="js/model/Country.js" type="text/javascript"></script>
        <script src="js/model/RobotSkin.js" type="text/javascript"></script>
    </head>
    <body ng-controller="controller as ctrl" class="background">
        <header class="menuBar">
            <button class="menuButton active" ng-click="show = 0">LOGIN</button>
            <button class="menuButton" disabled>HOME</button>
            <button class="menuButton" disabled>HANGAR</button>
            <button class="menuButton" disabled>SHOP</button>
            <button class="menuButton" disabled>PROFILE</button>
            <span class="gameTitle">The fall of men<small class="byJuanFra">  by JuanFra</small></span>
        </header>
        <section class="loginBox" ng-show="show == 0">
            <form class="loginForm" action="" method="post">
                <label class='loginLabel'>User name</label><br/>
                <input type="text" name="userNameBox" class="loginInput" ng-pattern="/^[A-Za-z]$/"/><br/>
                <label class='loginLabel'>Password</label><br/>
                <input type="password" name="passBox" class="loginInput"/><br/>
                <hr/>
                <button type="submit" name="loginButton" 
                        class="loginButton">Login</button>
            </form>
            <a class="forgotPasswordLink" ng-click="show = 2">Forgot password?</a>
            <span class="text-danger">
                <?php
                if (isset($_GET["error"])) {
                    $error = $_GET["error"];
                    switch ($error) {
                        case 1:
                            echo "Username and/or password not found. <a class='text-primary' ng-click='show = 1'>Register</a> for free!!";
                            break;
                        case 2:
                            echo "No session started, Login please.";
                            break;
                        case 3:
                            echo "Found errors during register. Please fill the formulary again.";
                            break;
                        case 4:
                            echo "Entered user already online. Please try later or contact administrator.";
                            break;
                        case 5:
                            echo "Loged out with problems. Please contact administrator.";
                            break;
                        default:
                            break;
                    }
                }
                ?>
            </span>
            <?php
            if (isset($_GET["send"])) {
                $action = $_GET["send"];
                switch ($action) {
                    case 0:
                        echo "<span class='text-success'>";
                        echo "Email send successfully!";
                        break;
                    case 1:
                        echo "<span class='text-danger'>";
                        echo "Error reported while sending email.";
                        break;
                    case 2:
                        echo "<span class='text-warning'>";
                        echo "Introduced email not found in database.";
                        break;
                    default:
                        break;
                }
                echo "</span>";
            }
            ?>
            <span class="text-success">
                <?php
                if (isset($_GET["register"])) {
                    echo "Register succesfull. You can now login.";
                }
                ?>
            </span>
            <span class="text-success">
                <?php
                if (isset($_GET["recovery"])) {
                    echo "Succes to reset password, Try to login.";
                }
                ?>
            </span>
        </section>
        <section ng-show="show == 0" class="registerText">Don't have an account yet?<a class="registerLink" ng-click="show = 1"> Register for free!!</a></section>        
    <register-template></register-template>
    <retrieve-credentials-template></retrieve-credentials-template>
</body>
</html>
