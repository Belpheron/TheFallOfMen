<?php

require_once "ControllerInterface.php";
require_once "../model/persist/FightADO.php";
require_once "../model/User.php";

class FightController implements ControllerInterface {

    private $action;
    private $jsonData;
    private $ado;

    //constructor
    function __construct($action, $jsonData) {
        $this->setAction($action);
        $this->setJsonData(json_decode($jsonData));
        $this->dbConnection = DBConnect::getInstance();
        $this->ado = new FightADO();
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
                $sender = new User($this->jsonData->idSender);   
                $receiver = new User($this->jsonData->idReceiver);
                if ($this->ado->createRequest($sender, $receiver)) {
                    $outputData[0] = true;
                } else {
                    $outputData[0] = false;
                }
                break;
            case 101:
                $user = new User($this->jsonData->userName);
                $result = $this->ado->getFightRequest($user);
                if ($result != null) {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                } else {
                    $outputData[0] = false;
                }
                break;
            case 102:
                if($this->ado->removeRequest($this->jsonData->requestId)) {
                    $outputData[0] = true;
                } else {
                    $outputData[0] = false;
                }
                break;
            case 103:
                $sender = new User($this->jsonData->idSender);   
                $receiver = new User($this->jsonData->idReceiver);
                if ($this->ado->answerRequestYes($sender, $receiver)) {
                    $outputData[0] = true;
                } else {
                    $outputData[0] = false;
                }
                break;
            case 104:
                $user = new User($this->jsonData->idReceiver);
                if ($this->ado->playerIsBusy($user)) {
                    $outputData[0] = true;
                } else {
                    $outputData[0] = false;
                }
                break;
            case 105:
                $sender = new User($this->jsonData->idSender);   
                $receiver = new User($this->jsonData->idReceiver);
                $result = $this->ado->checkRequestAnswer($sender, $receiver);
                if ($result != null) {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                } else {
                    $outputData[0] = false;
                }
                break;
            case 106:
                $sender = new User($this->jsonData->idSender);   
                $receiver = new User($this->jsonData->idReceiver);
                if ($this->ado->rejectRequest($sender, $receiver)) {
                    $outputData[0] = true;
                } else {
                    $outputData[0] = false;
                }
                break;
            case 107:
                $sender = new User($this->jsonData->idSender);   
                $receiver = new User($this->jsonData->idReceiver);
                $result = $this->ado->checkFightIsReady($sender, $receiver);
                if ($result != null) {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                } else {
                    $outputData[0] = false;
                }
                break;
            default:
                $outputData[0] = false;
                $outputData[1] = "Sorry, there has been an error. Try later";
                error_log("Action not correct in FightController, value: " . $this->getAction());
                break;
        }

        return $outputData;
    }
}

?>

