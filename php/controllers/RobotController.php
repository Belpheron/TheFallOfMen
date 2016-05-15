<?php

require_once "ControllerInterface.php";
require_once "../model/persist/RobotADO.php";
require_once "../model/User.php";

class RobotController implements ControllerInterface {

    private $action;
    private $jsonData;
    private $ado;

    //constructor
    function __construct($action, $jsonData) {
        $this->setAction($action);
        $this->setJsonData(json_decode($jsonData));
        $this->dbConnection = DBConnect::getInstance();
        $this->ado = new RobotADO();
    }

    //accessors
    public function getAction() {
        return $this->action;
    }

    public function getJsonData() {
        return $this->jsonData;
    }

    public function setAction($action) {
        $this->action = $action;
    }

    public function setJsonData($jsonData) {
        $this->jsonData = $jsonData;
    }

    //methods    
    public function run() {
        $outputData = [];
        switch ($this->getAction()) {
            case 100:
                $result = $this->ado->getAllSkins();
                if ($result != null) {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                } else {
                    $outputData[0] = false;
                    $outputData[1] = "No skins robots found.";
                }
                break;
            //gets all attributes for given username                
            case 101:
                $user = new User($this->jsonData->userName);
                $result = $this->ado->getAllImplants($user);
                if ($result != null) {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                } else {
                    $outputData[0] = false;
                    $outputData[1] = "Error loading implants.";
                }
                break;
            //gets all attributes from username
            case 102:
                $user = new User($this->jsonData->userName);
                $result = $this->ado->getAllAttributes($user);
                if ($result != null) {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                } else {
                    $outputData[0] = false;
                    $outputData[1] = "Error loading attributes";
                }
                break;
            default:
                $outputData[0] = false;
                $outputData[1] = "Sorry, there has been an error. Try later";
                error_log("Action not correct in RobotController, value: " . $this->getAction());
                break;
        }

        return $outputData;
    }
}

?>

