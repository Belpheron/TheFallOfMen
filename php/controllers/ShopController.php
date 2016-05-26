<?php

require_once "ControllerInterface.php";
require_once "../model/persist/ShopADO.php";
require_once "../model/Skill.php";
require_once "../model/Implant.php";

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
                $result = $this->ado->getAllSkills();
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
                $user = new User($this->jsonData->userName);
                $user->setIdRobotStatistic($this->jsonData->idRobotStatistic);
                $result = $this->ado->purchaseSkill($skill, $user);
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
            //load skill purchased
            case 202:
                $array = [];
                $user = new User($this->jsonData->userName);
                $user->setIdRobotStatistic($this->jsonData->robotStatistic->id);
                
                $result = $this->ado->getAllPurchasedSkill($user);
                if ($result != null)
                {
                    $array = $this->ado->getInfoSkill($result);
                    if ($array != null)
                    {
                        $outputData[0] = true;
                        $outputData[1] = $array;
                    }
                }
                else
                {
                    $outputData[0] = false;
                    $outputData[1] = "All done...";
                }
                break;
            //sell skill
            case 203:
                $skill = new Skill($this->jsonData->id, $this->jsonData->name, $this->jsonData->description, $this->jsonData->requiredLevel, $this->jsonData->buyPrice, $this->jsonData->multiplier);
                $skill->setSellPrice($this->jsonData->sellPrice);
                $user = new User($this->jsonData->userName);
                $user->setIdRobotStatistic($this->jsonData->idRobotStatistic);
                $result = $this->ado->sellSkill($skill, $user);
                if ($result != null)
                {
                    $outputData[0] = true;
                    $outputData[1] = "Sell succesfull!";
                }
                else
                {
                    $outputData[0] = false;
                    $outputData[1] = "Sorry sell can't done.";
                }
                break;
            //update coins user.
            case 204:
                $user = new User($this->jsonData->userName);
                $result = $this->ado->getCoins($user);
                if ($result != null)
                {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                }
                else
                {
                    $outputData[0] = false;
                    $outputData[1] = 0;
                }
                break;
            //load implants
            case 205:
                $result = $this->ado->getAllImplants();
                if ($result != null)
                {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                }
                else
                {
                    $outputData[0] = false;
                    $outputData[1] = "No implants found.";
                }
                break;
            //load purchased implants.
            case 206:
                $array = [];
                $user = new User($this->jsonData->userName);
                $user->setIdRobotStatistic($this->jsonData->robotStatistic->id);
                $result = $this->ado->getAllPurchasedImplant($user);
                if ($result != null)
                {
                    $array = $this->ado->getInfoImplant($result);
                    if ($array != null)
                    {
                        $outputData[0] = true;
                        $outputData[1] = $array;
                    }
                }
                else
                {
                    $outputData[0] = false;
                    $outputData[1] = "All done...";
                }
                break;
            //purchase a implant.
            case 207:
                $implant = new Implant($this->jsonData->id, $this->jsonData->name, $this->jsonData->description, $this->jsonData->buyPrice);
                $user = new User($this->jsonData->userName);
                $user->setIdRobotStatistic($this->jsonData->idRobotStatistic);
                $result = $this->ado->purchaseImplant($implant, $user);
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
            //sell implant
            case 208:
                $implant = new Implant($this->jsonData->id, $this->jsonData->name, $this->jsonData->description, $this->jsonData->buyPrice);
                $implant->setSellPrice($this->jsonData->sellPrice);
                $user = new User($this->jsonData->userName);
                $user->setIdRobotStatistic($this->jsonData->idRobotStatistic);
                $result = $this->ado->sellImplant($implant, $user);
                if ($result != null)
                {
                    $outputData[0] = true;
                    $outputData[1] = "Sell succesfull!";
                }
                else
                {
                    $outputData[0] = false;
                    $outputData[1] = "Sorry sell can't done.";
                }
                break;
            //load info for SKILL tooltip
            case 209:
                $skill = new Skill($this->jsonData->id, $this->jsonData->name, $this->jsonData->description, $this->jsonData->requiredLevel, $this->jsonData->buyPrice, $this->jsonData->multiplier);
                $result = $this->ado->getAllInfoSkill($skill);
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
                //load info for IMPLANT tooltip
            case 210:
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
            default:
                $outputData[0] = false;
                $outputData[1] = "Sorry, there has been an error. Try later";
                error_log("Action not correct in ShopController, value: " . $this->getAction());
                break;
        }
        return $outputData;
    }

}
