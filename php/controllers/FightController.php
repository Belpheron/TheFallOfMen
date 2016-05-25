<?php

require_once "ControllerInterface.php";
require_once "../model/persist/FightADO.php";
require_once "../model/User.php";
require_once "../model/Fight.php";
require_once "../model/FightEvents.php";
require_once "../model/FightResult.php";

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
                if ($this->ado->removeRequest($this->jsonData->requestId)) {
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
            case 108:
                if ($this->ado->setFightIsReady($this->jsonData->requestId)) {
                    $outputData[0] = true;
                } else {
                    $outputData[0] = true;
                }
                break;
            case 109:
                $fight = new Fight(
                        0, 
                        $this->jsonData->p1_id, 
                        $this->jsonData->p1_ap, 
                        $this->jsonData->p1_dp, 
                        $this->jsonData->p1_hp, 
                        $this->jsonData->p1_cp, 
                        $this->jsonData->p1_xp, 
                        $this->jsonData->p1_money, 
                        $this->jsonData->p1_skin, 
                        $this->jsonData->p1_attack1_dmg, 
                        $this->jsonData->p1_attack1_attribute, 
                        $this->jsonData->p1_attack1_value, 
                        $this->jsonData->p1_attack1_name, 
                        $this->jsonData->p1_attack1_description, 
                        $this->jsonData->p1_attack2_dmg, 
                        $this->jsonData->p1_attack2_attribute, 
                        $this->jsonData->p1_attack2_value, 
                        $this->jsonData->p1_attack2_name, 
                        $this->jsonData->p1_attack2_description, 
                        $this->jsonData->p1_attack3_dmg, 
                        $this->jsonData->p1_attack3_attribute, 
                        $this->jsonData->p1_attack3_value, 
                        $this->jsonData->p1_attack3_name, 
                        $this->jsonData->p1_attack3_description, 
                        $this->jsonData->p2_id, 
                        $this->jsonData->p2_ap, 
                        $this->jsonData->p2_dp, 
                        $this->jsonData->p2_hp, 
                        $this->jsonData->p2_cp, 
                        $this->jsonData->p2_xp, 
                        $this->jsonData->p2_money, 
                        $this->jsonData->p2_skin, 
                        $this->jsonData->p2_attack1_dmg, 
                        $this->jsonData->p2_attack1_attribute, 
                        $this->jsonData->p2_attack1_value, 
                        $this->jsonData->p2_attack1_name, 
                        $this->jsonData->p2_attack1_description, 
                        $this->jsonData->p2_attack2_dmg, 
                        $this->jsonData->p2_attack2_attribute, 
                        $this->jsonData->p2_attack2_value, 
                        $this->jsonData->p2_attack2_name, 
                        $this->jsonData->p2_attack2_description, 
                        $this->jsonData->p2_attack3_dmg, 
                        $this->jsonData->p2_attack3_attribute, 
                        $this->jsonData->p2_attack3_value, 
                        $this->jsonData->p2_attack3_name, 
                        $this->jsonData->p2_attack3_description, 
                        0);
                if ($this->ado->createFight($fight)) {
                    $outputData[0] = true;
                } else {
                    $outputData[0] = false;
                }
                break;
            case 110:
                $p1 = new User($this->jsonData->p1);
                $p2 = new User($this->jsonData->p2);
                $result = $this->ado->loadFightDetails($p1, $p2);
                if ($result != null) {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                } else {
                    $outputData[0] = false;
                }
                break;
            case 111:
                $p1 = new User($this->jsonData->player1);
                $p2 = new User($this->jsonData->player2);
                $result = $this->ado->createFightEvent($p1, $p2);
                if ($result != null) {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                } else {
                    $outputData[1] = false;
                }
                break;
            case 112:
                $this->ado->setPlayerIsReady($this->jsonData->id, $this->jsonData->player);
                $outputData[1] = true;
                break;
            case 113:
                $result = $this->ado->checkBothPlayersAreReady($this->jsonData->id);
                $outputData = $result;
                break;  
            case 114:
                $p1 = new User($this->jsonData->player1);
                $p2 = new User($this->jsonData->player2);
                $result = $this->ado->checkFightEventIsCreated($p1, $p2);
                if ($result != null) {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                } else {
                    $outputData[0] = false;
                }
                break;
            case 115:
                $fe = new FightEvents($this->jsonData->id, $this->jsonData->p1IsReady, 
                        $this->jsonData->p2IsReady, $this->jsonData->winner, $this->jsonData->player1Action, 
                        $this->jsonData->player2Action, $this->jsonData->roundIsEnded, 
                        $this->jsonData->roundNumber, $this->jsonData->p1Health, $this->jsonData->p2Health);
                $result = $this->ado->updateFightEvent($fe, $this->jsonData->currentPlayer);
                if ($result != null) {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                } else {
                    $outputData[0] = false;
                }
                break;
            case 116:
                $fightResult = new FightResult(
                        $this->jsonData->p1_id, 
                        $this->jsonData->p2_id, 
                        $this->jsonData->p1_xp, 
                        $this->jsonData->p2_xp, 
                        $this->jsonData->p1_money, 
                        $this->jsonData->p2_money, 
                        $this->jsonData->id_winner, 
                        $this->jsonData->id_defeated, 
                        $this->jsonData->p1_total_damage, 
                        $this->jsonData->p1_received_damage, 
                        $this->jsonData->p2_total_damage, 
                        $this->jsonData->p2_received_damage);
                $this->ado->setFightResult($fightResult);
                $outputData[0] = true;
                break;
            case 117:
                if ($this->ado->deleteFightData($this->jsonData->eventId, $this->jsonData->fightId)) {
                    $outputData[0] = true;
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

