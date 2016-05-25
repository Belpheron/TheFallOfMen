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
    public function deleteFightData($eventId, $fightId) {
        $sql = "DELETE FROM fight_events WHERE id = ?";
        $query = $this->dbConnection->execute($sql, [$eventId]);
        $sql = "DELETE FROM fights WHERE id = ?";
        $query = $this->dbConnection->execute($sql, [$fightId]);
        if ($query != null) {
            return true;
        }
        return false;
    }
    
    public function updateFightEvent($fightEvent, $currentPlayer) {
        if ($currentPlayer == 1) {
            $sql = "UPDATE fight_events SET p1IsReady = ?, player1Action = ?, p1Health = ?, winner = ? WHERE id = ?";
            $query = $this->dbConnection->execute($sql, [$fightEvent->getP1IsReady(), $fightEvent->getPlayer1Action(), 
                $fightEvent->getP1Health(), $fightEvent->getWinner(),$fightEvent->getId()]);            
        } else {
            $sql = "UPDATE fight_events SET p2IsReady = ?, player2Action = ?, p2Health = ?, winner = ? WHERE id = ?";
            $query = $this->dbConnection->execute($sql, [$fightEvent->getP2IsReady(), $fightEvent->getPlayer2Action(), 
                $fightEvent->getP2Health(), $fightEvent->getWinner(),$fightEvent->getId()]);            
        }
        $sql = "SELECT * FROM fight_events WHERE id = ?";
        $query = $this->dbConnection->execute($sql, [$fightEvent->getId()]);
        if ($query != null) {
            return $query->fetch();
        }
        return null;
    }
    
    public function updateFight($p1_xp, $p1_money, $p2_xp, $p2_money, $id, $id_winner) {        
        $sql = "UPDATE fights SET p1_xp = ?, p1_money = ?, p2_xp = ?, p2_money = ?, id_winner = ? WHERE id = ?";
        $query = $this->dbConnection->execute($sql, [$p1_xp, $p1_money, $p2_xp, $p2_money, $id_winner, $id]);
        if ($query->rowCount() != 0) {
            return true;
        }
        return false;
    }
    
    public function setFightResult($fightResult) {
        //$p1_id, $p2_id, $p1_xp, $p2_xp, $p1_money, $p2_money, $id_winner, $id_defeated, $p1_total_damage, $p1_received_damage, $p2_total_damage, $p2_received_damage
        //PLAYER 1
        //gets user
        $sql = "SELECT * FROM user WHERE userName = ?";
        $query = $this->dbConnection->execute($sql, [$fightResult->getP1_id()]);
        $player1 = $query->fetch();
        //updates coins
        $p1coins = $player1["coins"] + $fightResult->getP1_money();
        $sql = "UPDATE user SET coins = ? WHERE userName = ?";
        $query = $this->dbConnection->execute($sql, [$p1coins, $fightResult->getP1_id()]);
        //updates experience
        $sql = "SELECT * FROM robotstatistic WHERE id = (SELECT idRobotStatistic FROM user WHERE userName = ?)";
        $query = $this->dbConnection->execute($sql, [$fightResult->getP1_id()]);
        $p1Robot = $query->fetch();
        $p1xp = $p1Robot["experience"] + $fightResult->getP1_xp();
        $sql = "UPDATE robotstatistic SET experience = ? WHERE id = ?";
        $query = $this->dbConnection->execute($sql, [$p1xp, $p1Robot["id"]]);
        //updates wins and defeats
        $sql = "SELECT * FROM userstatistic WHERE id = (SELECT idUserStatistic FROM user WHERE userName = ?)";
        $query = $this->dbConnection->execute($sql, [$player1["userName"]]);
        $p1User = $query->fetch();    
        $wins = $p1User["wins"];
        $defeats = $p1User["defeats"];
        if ($fightResult->getId_winner() == $player1["userName"]) {
            $wins++;
        } else {
            $defeats++;
        }
        $totalDmgDone = $p1User["totalInflictedDamage"] + $fightResult->getP1_total_damage();
        $totalDmgReceived = $p1User["totalRecivedDamage"] + $fightResult->getP1_received_damage();
        $totalCoins = $p1User["totalWinCoins"] + $fightResult->getP1_money();
        $sql = "UPDATE userstatistic SET wins = ?, defeats = ?, totalInflictedDamage = ?, totalRecivedDamage = ?, totalWinCoins = ? WHERE id = ?";
        $query = $this->dbConnection->execute($sql, [$wins, $defeats, $totalDmgDone, $totalDmgReceived, $totalCoins, $p1User["id"]]);
        
        //PLAYER 2
        //gets user
        $sql = "SELECT * FROM user WHERE userName = ?";
        $query = $this->dbConnection->execute($sql, [$fightResult->getP2_id()]);
        $player2 = $query->fetch();
        //updates coins
        $p2coins = $player2["coins"] + $fightResult->getP2_money();
        $sql = "UPDATE user SET coins = ? WHERE userName = ?";
        $query = $this->dbConnection->execute($sql, [$p2coins, $fightResult->getP2_id()]);
        //updates experience
        $sql = "SELECT * FROM robotstatistic WHERE id = (SELECT idRobotStatistic FROM user WHERE userName = ?)";
        $query = $this->dbConnection->execute($sql, [$fightResult->getP2_id()]);
        $p2Robot = $query->fetch();
        $p2xp = $p2Robot["experience"] + $fightResult->getP2_xp();
        $sql = "UPDATE robotstatistic SET experience = ? WHERE id = ?";
        $query = $this->dbConnection->execute($sql, [$p2xp, $p2Robot["id"]]);
        //updates wins and defeats
        $sql = "SELECT * FROM userstatistic WHERE id = (SELECT idUserStatistic FROM user WHERE userName = ?)";
        $query = $this->dbConnection->execute($sql, [$player2["userName"]]);
        $p2User = $query->fetch();    
        $wins = $p2User["wins"];
        $defeats = $p2User["defeats"];
        if ($fightResult->getId_winner() == $player2["userName"]) {
            $wins++;
        } else {
            $defeats++;
        }
        $totalDmgDone = $p2User["totalInflictedDamage"] + $fightResult->getP2_total_damage();
        $totalDmgReceived = $p2User["totalRecivedDamage"] + $fightResult->getP2_received_damage();
        $totalCoins = $p2User["totalWinCoins"] + $fightResult->getP2_money();
        $sql = "UPDATE userstatistic SET wins = ?, defeats = ?, totalInflictedDamage = ?, totalRecivedDamage = ?, totalWinCoins = ? WHERE id = ?";
        $query = $this->dbConnection->execute($sql, [$wins, $defeats, $totalDmgDone, $totalDmgReceived, $totalCoins, $p2User["id"]]);        
    }
    
    public function checkFightEventIsCreated($player1, $player2) {
        $sql = "SELECT * FROM fight_events WHERE p1_id = ? AND p2_id = ?";
        $query = $this->dbConnection->execute($sql, [$player1->getUserName(), $player2->getUserName()]);
        if ($query != null) {
            return $query->fetch();
        }
        return null;
    }
    
    public function checkBothPlayersAreReady($fightEventId) {
        $result = [];
        $sql = "SELECT p1IsReady FROM fight_events WHERE id = ?";
        $query = $this->dbConnection->execute($sql, [$fightEventId]);
        if ($query != null) {
            $result[] = $query->fetch();
        } else {
            $result[] = 0;
        }
        $sql = "SELECT p2IsReady FROM fight_events WHERE id = ?";
        $query = $this->dbConnection->execute($sql, [$fightEventId]);
        if ($query != null) {
            $result[] = $query->fetch();
        } else {
            $result[] = 0;
        }
        return $result;
    }
    
    public function setPlayerIsReady($fightEventId, $playerNumber) {
        if ($playerNumber == 1) {
            $set = "p1IsReady";
        } else {
            $set = "p2IsReady";
        }
        $sql = "UPDATE fight_events SET ".$set." = ? WHERE id = ?";
        $query = $this->dbConnection->execute($sql, [1, $fightEventId]);
        return true;
    }
    
    public function createFightEvent($player1, $player2) {
        $sql = "INSERT INTO fight_events (p1_id,p2_id,p1IsReady,p2IsReady) VALUES (?,?,?,?)";
        $query = $this->dbConnection->execute($sql, [$player1->getUserName(), $player2->getUserName(), 0, 0]);
        if ($query->rowCount() != 0) {
            $id = $this->dbConnection->getLink()->lastInsertId();
            $sql = "SELECT * FROM fight_events WHERE id = ?";
            $query = $this->dbConnection->execute($sql, [$id]);
            return $query->fetch();
        }
        return null;
    }
    
    public function loadFightDetails($p1, $p2) {
        $sql = "SELECT * FROM fights WHERE p1_id = ? AND p2_id = ?";
        $query = $this->dbConnection->execute($sql, [$p1->getUserName(), $p2->getUserName()]);
        if ($query != null) {
            return $query->fetch();
        }
        return null;
    }
    
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
        if ($query != null) {
            return true;
        } 
        return false;
    }
    
    public function checkFightIsReady($sender, $receiver) {
        $sql = "SELECT * FROM duel_requests WHERE idSender = ? AND idReceiver = ?";
        $query = $this->dbConnection->execute($sql, [$sender->getUserName(), $receiver->getUserName()]);
        if ($query != null) {
            return $query->fetch();
        }
        return null;
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
