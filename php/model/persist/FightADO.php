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
    public function rejectRequest($sender, $receiver) {
        $sql = "UPDATE duel_requests SET answer = ? WHERE idSender = ? OR idReceiver = ?";
        $query = $this->dbConnection->execute($sql, [2, $sender->getUserName(), $receiver->getUserName()]);
        if ($query->rowCount() != 0) {
            return true;
        }
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
