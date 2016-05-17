<?php

require_once "../model/persist/DBConnect.php";
require_once "../model/persist/ADOinterface.php";

class FightADO implements ADOinterface {
    //properties
    private $dbConnection;
    
    //constructor
    public function __construct() {
        $this->dbConnection = DBConnect::getInstance();
    }
    
    //methods
    public function createFight($fight) {
        $sql = "INSERT INTO `fights` (`p1_id`, `p1_ap`, `p1_dp`, `p1_hp`, `p1_cp`, `p1_xp`, `p1_money`, `p1_skin`, `p1_attack1_dmg`, `p1_attack1_attribute`, `p1_attack1_value`, `p1_attack1_name`, `p1_attack1_description`, `p1_attack2_dmg`, `p1_attack2_attribute`, `p1_attack2_value`, `p1_attack2_name`, `p1_attack2_description`, `p1_attack3_dmg`, `p1_attack3_attribute`, `p1_attack3_value`, `p1_attack3_name`, `p1_attack3_description`, `p2_id`, `p2_ap`, `p2_dp`, `p2_hp`, `p2_cp`, `p2_xp`, `p2_money`, `p2_skin`, `p2_attack1_dmg`, `p2_attack1_attribute`, `p2_attack1_value`, `p2_attack1_name`, `p2_attack1_description`, `p2_attack2_dmg`, `p2_attack2_attribute`, `p2_attack2_value`, `p2_attack2_name`, `p2_attack2_description`, `p2_attack3_dmg`, `p2_attack3_attribute`, `p2_attack3_value`, `p2_attack3_name`, `p2_attack3_description`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
        $query = $this->dbConnection->execute($sql, [
            $fight->getP1_id(),
            $fight->getP1_ap(),
            $fight->getP1_dp(),
            $fight->getP1_hp(),
            $fight->getP1_cp(),
            $fight->getP1_xp(),
            $fight->getP1_money(),
            $fight->getP1_skin(),
            $fight->getP1_attack1_dmg(),
            $fight->getP1_attack1_attribute(),
            $fight->getP1_attack1_value(),
            $fight->getP1_attack1_name(),
            $fight->getP1_attack1_description(),
            $fight->getP1_attack2_dmg(),
            $fight->getP1_attack2_attribute(),
            $fight->getP1_attack2_value(),
            $fight->getP1_attack2_name(),
            $fight->getP1_attack2_description(),
            $fight->getP1_attack3_dmg(),
            $fight->getP1_attack3_attribute(),
            $fight->getP1_attack3_value(),
            $fight->getP1_attack3_name(),
            $fight->getP1_attack3_description(),
            $fight->getP2_id(),
            $fight->getP2_ap(),
            $fight->getP2_dp(),
            $fight->getP2_hp(),
            $fight->getP2_cp(),
            $fight->getP2_xp(),
            $fight->getP2_money(),
            $fight->getP2_skin(),
            $fight->getP2_attack1_dmg(),
            $fight->getP2_attack1_attribute(),
            $fight->getP2_attack1_value(),
            $fight->getP2_attack1_name(),
            $fight->getP2_attack1_description(),
            $fight->getP2_attack2_dmg(),
            $fight->getP2_attack2_attribute(),
            $fight->getP2_attack2_value(),
            $fight->getP2_attack2_name(),
            $fight->getP2_attack2_description(),
            $fight->getP2_attack3_dmg(),
            $fight->getP2_attack3_attribute(),
            $fight->getP2_attack3_value(),
            $fight->getP2_attack3_name(),
            $fight->getP2_attack3_description()
        ]);
        if ($query->rowCount() != 0) {
            return true;
        } 
        return false;
    }
    
    public function rejectRequest($sender, $receiver) {
        $sql = "UPDATE duel_requests SET answer = ? WHERE idSender = ? OR idReceiver = ?";
        $query = $this->dbConnection->execute($sql, [2, $sender->getUserName(), $receiver->getUserName()]);
        if ($query->rowCount() != 0) {
            return true;
        }
        return false;
    }
    
    public function setFightIsReady($requestId) {
        $sql = "UPDATE duel_requests SET fight_is_ready = ? WHERE id = ?";
        $query = $this->dbConnection->execute($sql, [1, $requestId]);
        if ($query != null) return true;
        return false;
    }
    
    public function answerRequestYes($sender, $receiver) {
        $sql = "UPDATE duel_requests SET answer = ? WHERE idSender = ? OR idReceiver = ?";
        $query = $this->dbConnection->execute($sql, [1, $sender->getUserName(), $receiver->getUserName()]);
        if ($query != null) {
            return true;
        }
        return false;
    }
    
    public function playerIsBusy($user) {
        $sql = "SELECT * FROM duel_requests WHERE idSender = ? OR idReceiver = ?";
        $query = $this->dbConnection->execute($sql, [$user->getUserName(), $user->getUserName()]);
        if ($query->rowCount() != 0) {
            return true;
        } 
        return false;
    }
    
    public function checkRequestAnswer($sender, $receiver) {
        $sql = "SELECT * FROM duel_requests WHERE idSender = ? AND idReceiver = ?";
        $query = $this->dbConnection->execute($sql, [$sender->getUserName(), $receiver->getUserName()]);
        if ($query != null) {
            return $query->fetch();
        }
        return null;
    }
    
    public function removeRequest($requestId) {
        $sql = "DELETE FROM duel_requests WHERE id = ?";
        $query = $this->dbConnection->execute($sql, [$requestId]);
        if ($query->rowCount() != 0) {
            return true;
        }
        return false;
    }
    
    public function getFightRequest($user) {
        $sql = "SELECT * FROM duel_requests WHERE idReceiver = ?";
        $query = $this->dbConnection->execute($sql, [$user->getUserName()]);
        if ($query != null) {
            return $query->fetch();
        }
        return null;
    }
    
    public function createRequest($sender, $receiver) {
        $sql = "INSERT INTO duel_requests (idSender,idReceiver,answer,fight_is_ready) VALUES (?,?,?,?)";
        $query = $this->dbConnection->execute($sql, [$sender->getUserName(), $receiver->getUserName(), 0, 0]);
        if ($query->rowCount() != 0) {
            return true;
        }
        return false;
    }
    
    public function getAll() {
        
    }

    public function delete($entity) {
        
    }

    public function get($entity) {
        
    }

    public function insert($entity) {
        
    }

    public function update($entity) {
        
    }

}
