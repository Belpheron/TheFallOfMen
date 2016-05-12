<?php

require_once "ControllerInterface.php";
require_once "../model/persist/ShopADO.php";
require_once "../model/Skill.php";

class ShopController implements ControllerInterface
{

    private $action;
    private $jsonData;
    private $ado;

    //constructor
    function __construct($action, $jsonData)
    {
        $this->setAction($action);
        $this->setJsonData(json_decode($jsonData));
        $this->dbConnection = DBConnect::getInstance();
        $this->ado = new ShopADO();
    }

    //accessors
    public function getAction()
    {
        return $this->action;
    }

    public function getJsonData()
    {
        return $this->jsonData;
    }

    public function setAction($action)
    {
        $this->action = $action;
    }

    public function setJsonData($jsonData)
    {
        $this->jsonData = $jsonData;
    }

    //methods    
    public function run()
    {
        $outputData = [];
        switch ($this->getAction())
        {
            //get all skills
            case 200:
                $result = $this->ado->getAll();
                if ($result != null)
                {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                }
                else
                {
                    $outputData[0] = false;
                    $outputData[1] = "No skills found.";
                }
                break;
            //purchase a skill
            case 201:
                $skill = new Skill($this->jsonData->id, $this->jsonData->name, $this->jsonData->description, $this->jsonData->requiredLevel, $this->jsonData->buyPrice, $this->jsonData->multiplier);
                $result = $this->ado->purchaseSkill($skill);
                if ($result != null)
                {
                    $outputData[0] = true;
                    $outputData[1] = "Purchase succesfull!";
                }
                else
                {
                    $outputData[0] = false;
                    $outputData[1] = "Sorry purchase can't done.";
                }
                break;
            default:
                $outputData[0] = false;
                $outputData[1] = "Sorry, there has been an error. Try later";
                error_log("Action not correct in ShopController, value: " . $this->getAction());
                break;
        }
        return $outputData;
    }

}
