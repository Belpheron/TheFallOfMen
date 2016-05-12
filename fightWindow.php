<!DOCTYPE html>
<?php
//includes
require_once "php/model/User.php";

//session control
session_start();

if (!isset($_SESSION["user"])) {
    header("Location:index.php?error=2");
}

?>
<html ng-app="fallOfMenApp">
    <head>
        <title>The fall of men - Fight</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!--FRAMEWORKS-->
        <script src="js/frameWorks/jQuery/jquery-2.2.3.min.js" type="text/javascript"></script>
        <script src="js/frameWorks/angular/angular.min.js" type="text/javascript"></script>
        <script src="js/frameWorks/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>
        <script src="js/frameWorks/jquery-ui-1.12.0-rc.2/jquery-ui.min.js" type="text/javascript"></script>

        <!--STYLE-->
        <link href="js/frameWorks/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css"/>
        <link href="css/generalStyle.css" rel="stylesheet" type="text/css"/>
        <link href="js/frameWorks/jquery-ui-1.12.0-rc.2/jquery-ui.min.css" rel="stylesheet" type="text/css"/>
        
        <!--CONTROL-->
        <script src="js/control/FightWindow.js" type="text/javascript"></script>
        <script src="js/control/generalFunctions.js" type="text/javascript"></script>        
        <!--MODEL-->
    </head>
    <body>
        
    </body>
</html>

