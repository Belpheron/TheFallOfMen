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
            //get info attributes skill.
            case 200: 
                $implant = new Implant(0,  $this->jsonData->name, $this->jsonData->description, $this->jsonData->buyPrice, $this->jsonData->attrName, $this->jsonData->attrValue );
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
                    $outputData[1] = "Sorry cannot creater implant";
                }
                break;
            //get infoattributes implant.
            case 201:
                $implant = new Implant($this->jsonData->id, $this->jsonData->name, $this->jsonData->description, $this->jsonData->buyPrice);
                $result = $this->ado->getAllInfoImplant($implant);
                if ($result != null)
                {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                }
                else
                {
                    $outputData[0] = false;
                    $outputData[1] = "Sorry can't load extra info.";
                }
                break;
            //retrive a attributes of robot
            case 202:
                $user = new User($this->jsonData->userName);
                $user->setidRobotStatistic($this->jsonData->robotStatistic->id);
                $result = $this->ado->getRobotAttributes($user);
                if ($result != null)
                {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                }
                else
                {
                    $outputData[0] = false;
                    $outputData[1] = "Sorry can't load attributes robot.";
                }
                break;
            //load skill assigned.
            case 203:
                $user = new User($this->jsonData->userName);
                $user->setIdRobotStatistic($this->jsonData->robotStatistic->id);
                $result = $this->ado->getAssignedSkill($user);
                if ($result != null)
                {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                }
                else
                {
                    $outputData[0] = false;
                    $outputData[1] = "Sorry can't load assigned skills robot.";
                }
                break;
            //take info about a skill whit only give id
            case 204:
                $result = $this->ado->getSkill($this->jsonData->id);
                if ($result != null)
                {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                }
                else
                {
                    $outputData[0] = false;
                    $outputData[1] = "Sorry cannot load assigned skills robot";
                }
                break;
            case 205:
                $skill = new Skill($this->jsonData->id);
                $user = new User(0);
                $user->setIdRobotStatistic($this->jsonData->idRobotStatistic);
                $objective = $this->jsonData->objective;
                $result = $this->ado->updateSkill($skill, $user, $objective);
                if ($result != null)
                {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                }
                else
                {
                    $outputData[0] = false;
                    $outputData[1] = "Sorry skill alredy assigned";
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
