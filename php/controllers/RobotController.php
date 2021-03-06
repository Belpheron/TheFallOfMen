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
                    $outputData[0] = true;
                    $outputData[1] = [];
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
                    $outputData[0] = true;
                    $outputData[1] = [];
                }
                break;
            case 103:
                $result = $this->ado->getSkin($this->jsonData->idSkin);
                if ($result != null) {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                } else {
                    $outputData[0] = false;
                }
                break;
            case 104:
                $user = new User($this->jsonData->userName);
                $result = $this->ado->getAllAttacks($user);
                if ($result != null) {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                } else {
                    $outputData[0] = false;
                    $outputData[1] = [];
                }
                break;
            case 105:
                $result = $this->ado->getImages($this->jsonData->skinName);
                if ($result != null) {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                } else {
                    $outputData[0] = false;
                }
                break;
            //gets all attributes for given username                
            case 106:
                $user = new User($this->jsonData->userName);
                $result = $this->ado->getAllStoredImplants($user);
                if ($result != null) {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                } else {
                    $outputData[0] = true;
                    $outputData[1] = [];
                }
                break;
            case 107:
                $user = new User($this->jsonData->userName);
                $result = $this->ado->getAllStoredAttacks($user);
                if ($result != null) {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                } else {
                    $outputData[0] = false;
                    $outputData[1] = [];
                }
                break;
            case 108:
                if ($this->ado->setImplant($this->jsonData->idRobot, $this->jsonData->idImplant)) {
                    $outputData[0] = true;
                } else {
                    $outputData[0] = false;
                }
                break;
            case 109:
                if ($this->ado->unSetImplant($this->jsonData->idRobot, $this->jsonData->idImplant)) {
                    $outputData[0] = true;
                } else {
                    $outputData[0] = false;
                }
                break;
            case 110:
                if ($this->ado->unSetSkill($this->jsonData->idRobot, $this->jsonData->type)) {
                    $outputData[0] = true;
                } else {
                    $outputData[0] = false;
                }
                break;
            case 111:
                if ($this->ado->setSkill($this->jsonData->idRobot, $this->jsonData->idSkill, $this->jsonData->type)) {
                    $outputData[0] = true;
                } else {
                    $outputData[0] = false;
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

