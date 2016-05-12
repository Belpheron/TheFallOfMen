<?php

require_once "ControllerInterface.php";
require_once "../model/persist/ChatADO.php";
require_once "../model/ChatMessage.php";

class ChatController implements ControllerInterface {

    private $action;
    private $jsonData;
    private $ado;

    //constructor
    function __construct($action, $jsonData) {
        $this->setAction($action);
        $this->setJsonData(json_decode($jsonData));
        $this->dbConnection = DBConnect::getInstance();
        $this->ado = new ChatADO();
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
                $result = $this->ado->getAllSince($this->jsonData->datetime);
                if ($result != null) {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                } else {
                    $outputData[0] = false;
                    $outputData[1] = "No messages since last login.";
                }
                break;
            case 101:
                $message = new ChatMessage($this->jsonData->datetime, $this->jsonData->content, 
                        $this->jsonData->idUserNameSender, $this->jsonData->idUserNameReceiver);
                var_dump($message);
                $result = $this->ado->insert($message);
                if ($result != 0) {
                    $outputData[0] = true;
                } else {
                    $outputData[0] = false;
                }
                break;
            default:
                $outputData[0] = false;
                $outputData[1] = "Sorry, there has been an error. Try later";
                error_log("Action not correct in ChatController, value: " . $this->getAction());
                break;
        }

        return $outputData;
    }
}

?>

