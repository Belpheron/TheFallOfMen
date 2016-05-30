<?php

require_once "ControllerInterface.php";
require_once "../model/persist/AdminADO.php";
require_once "../model/Skill.php";
require_once "../model/Implant.php";

class AdminController implements ControllerInterface
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
        $this->ado = new AdminADO();
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
            //insert a implant
            case 200:
                $implant = new Implant(0, $this->jsonData->name, $this->jsonData->description, $this->jsonData->buyPrice, $this->jsonData->attribute, $this->jsonData->value);
                $implant->setTarget($this->jsonData->target);
                $result = $this->ado->insertImplant($implant);
                if ($result > 0)
                {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                }
                else
                {
                    $outputData[0] = false;
                    $outputData[1] = "Sorry cannot create implant";
                }
                break;
            //get info attributes implant.
            case 201:
                $result = $this->ado->getAllImplants();
                if ($result != null)
                {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                }
                else
                {
                    $outputData[0] = true;
                    $outputData[1] = "Problem reported loadind data implant";
                }
                break;
            //update implant
            case 202:
                $implant = new Implant($this->jsonData->id, $this->jsonData->name, $this->jsonData->description, $this->jsonData->buyPrice, $this->jsonData->attribute, $this->jsonData->value, 1);
                $implant->setTarget($this->jsonData->target);
                $result = $this->ado->updateImplant($implant);
                if ($result != null)
                {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                }
                else
                {
                    $outputData[0] = false;
                    $outputData[1] = "Sorry cannot load update implant";
                }
                break;
            //delete implant
            case 203:
                $implant = new Implant($this->jsonData->id, $this->jsonData->name, $this->jsonData->description, $this->jsonData->buyPrice, $this->jsonData->attribute, $this->jsonData->value, 1);
                $implant->setTarget($this->jsonData->target);

                $result = $this->ado->deleteImplant($implant);
                if ($result != null)
                {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                }
                else
                {
                    $outputData[0] = false;
                    $outputData[1] = "Sorry cannot delete implant";
                }
                break;
            //get info attributes skills.
            case 204:
                $result = $this->ado->getAllSkills();
                if ($result != null)
                {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                }
                else
                {
                    $outputData[0] = true;
                    $outputData[1] = "Problem reported loadind data skill";
                }
                break;
            case 205:
                $skill = new Skill(0, $this->jsonData->name, $this->jsonData->description, $this->jsonData->requiredLevel, $this->jsonData->buyPrice, $this->jsonData->multiplier);
                $skill->setTarget("self");
                $skill->setValue($this->jsonData->value);
                $skill->setAttribute($this->jsonData->attribute);
                $result = $this->ado->insertSkill($skill);
                if ($result > 0)
                {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                }
                else
                {
                    $outputData[0] = false;
                    $outputData[1] = "Sorry cannot create skill";
                }
                break;
            case 206:
                $skill = new Skill($this->jsonData->id, $this->jsonData->name, $this->jsonData->description, $this->jsonData->requiredLevel, $this->jsonData->buyPrice, $this->jsonData->multiplier);
               $skill->setTarget($this->jsonData->target);
                $result = $this->ado->updateSkill($skill);
                if ($result != null)
                {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                }
                else
                {
                    $outputData[0] = false;
                    $outputData[1] = "Sorry cannot load update implant";
                }
                break;
            default:
                $outputData[0] = false;
                $outputData[1] = "Sorry, there has been an error. Try later";
                error_log("Action not correct in HangarController, value: " . $this->getAction());
                break;
        }
        return $outputData;
    }

}
