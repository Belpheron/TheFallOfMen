<?php

require_once "ControllerInterface.php";
require_once "../model/persist/CountryADO.php";

class CountryController implements ControllerInterface {

    private $action;
    private $jsonData;
    private $ado;

    //constructor
    function __construct($action, $jsonData) {
        $this->setAction($action);
        $this->setJsonData(json_decode($jsonData));
        $this->dbConnection = DBConnect::getInstance();
        $this->ado = new CountryADO();
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
                $result = $this->ado->getAll($this->jsonData);
                if ($result != null) {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                } else {
                    $outputData[0] = false;
                    $outputData[1] = "No countries found in database.";
                }
                break;
            default:
                $outPutData[0] = false;
                $outputData[1] = "Sorry, there has been an error. Try later";
                error_log("Action not correct in CountryController, value: " . $this->getAction());
                break;
        }

        return $outputData;
    }
}

?>

