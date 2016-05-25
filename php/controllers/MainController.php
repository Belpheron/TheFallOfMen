<?php

require_once "CountryController.php";
require_once "UserController.php";
require_once "RobotController.php";
require_once "ShopController.php";
require_once "ChatController.php";
require_once "FightController.php";
require_once "HangarController.php";


$outputData = [];

if (isset($_REQUEST['controllerType']))
{
    $action = (int) $_REQUEST['controllerType'];
    switch ($action)
    {
        case 1:
            $countryController = new CountryController($_REQUEST['action'], $_REQUEST['jsonData']);
            $outputData = $countryController->run();
            break;
        case 2:
            $userController = new UserController($_REQUEST['action'], $_REQUEST['jsonData']);
            $outputData = $userController->run();
            break;
        case 3:
            $robotController = new RobotController($_REQUEST['action'], $_REQUEST['jsonData']);
            $outputData = $robotController->run();
            break;
        case 4:
            $chatController = new ChatController($_REQUEST['action'], $_REQUEST['jsonData']);
            $outputData = $chatController->run();
            break;
        case 5:
            $fightController = new FightController($_REQUEST['action'], $_REQUEST['jsonData']);
            $outputData = $fightController->run();
            break;
        case 6:
            $shopController = new ShopController($_REQUEST['action'], $_REQUEST['jsonData']);
            $outputData = $shopController->run();
            break; 
        case 7:
            $hangarController = new HangarController($_REQUEST['action'], $_REQUEST['jsonData']);
            $outputData = $hangarController->run();
            break;
       
       
        default:
            $outputData[0] = false;
            $outputData[1] = "Sorry, there has been an error. Try later";
            error_log("MainControllerClass: action not correct, value: " . $_REQUEST['controllerType']);
            break;
    }
}
else
{
    $outputData[0] = false;
    $outputData[1] = "Sorry, there has been an error. Try later";
    error_log("MainControllerClass: action does not exist.");
}

echo json_encode($outputData);
?>

