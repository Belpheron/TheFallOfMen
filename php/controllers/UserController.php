<?php

require_once "ControllerInterface.php";
require_once "../model/persist/UserADO.php";
require_once "../model/User.php";

class UserController implements ControllerInterface {

    private $action;
    private $jsonData;
    private $ado;

    //constructor
    function __construct($action, $jsonData) {
        $this->setAction($action);
        $this->setJsonData(json_decode($jsonData));
        $this->dbConnection = DBConnect::getInstance();
        $this->ado = new UserADO();
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
                $user = new User($this->jsonData->userName);
                $result = $this->ado->get($user);
                if ($result != null) {
                    $outputData[0] = true;
                } else {
                    $outputData[0] = false;
                    $outputData[1] = "No user found with that user name.";
                }
                break;
            case 101:
                $result = $this->ado->getEmail($this->jsonData->email);
                if ($result != null) {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                } else {
                    $outputData[0] = false;
                    $outputData[1] = "No emails found.";
                }
                break;
            default:
                $outPutData[0] = false;
                $outputData[1] = "Sorry, there has been an error. Try later";
                error_log("Action not correct in UserController, value: " . $this->getAction());
                break;
        }

        return $outputData;
    }
}

?>

