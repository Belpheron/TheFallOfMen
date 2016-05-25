<?php

require_once "../model/persist/DBConnect.php";
require_once "../model/persist/ADOinterface.php";
require_once "../model/Implant.php";
require_once "../model/Attribute.php";
require_once "../model/Attack.php";

class RobotADO implements ADOinterface {

    //properties
    private $dbConnection;

    //constructor
    public function __construct() {
        $this->dbConnection = DBConnect::getInstance();
    }

    //methods
    public function getImages($skinName) {
        $sql = "SELECT * FROM infoanimations WHERE idskin = (SELECT id FROM robotskin WHERE name = ?)";
        $query = $this->dbConnection->execute($sql, [$skinName]);
        if ($query != null) {
            return $query->fetchAll();
        }
        return null;
    }
    
    public function getAllSkins() {
        $sql = "SELECT * FROM robotskin";
        $query = $this->dbConnection->execute($sql, []);
        if ($query != null) {
            return $query->fetchAll();
        }
        return null;
    }
    
    public function getAllAttributes($user) {
        $result = [];
        $sql = "SELECT * FROM robotattribute WHERE idRobotStatistic = (SELECT idRobotStatistic FROM user WHERE userName = ?)";
        $query = $this->dbConnection->execute($sql, [$user->getUserName()]);
        if ($query != null) {
            $attList = $query->fetchAll();
            for ($i=0; $i<count($attList); $i++) {
                $att = new Attribute();
                $att->setValue($attList[$i]["value"]);
                switch ($attList[$i]["idAttribute"]) {
                    case 1:
                        $att->setIso("ap");
                        $att->setName("Attack points");
                        break;
                    case 2:
                        $att->setIso("dp");
                        $att->setName("Defense points");
                        break;
                    case 3:
                        $att->setIso("cp");
                        $att->setName("Critical points");
                        break;
                    case 4:
                        $att->setIso("hp");
                        $att->setName("Health points");
                        break;
                    default:
                        break;
                }
                $result[] = $att->toArray();
            }
        } else {
            $result = null;
        }
        return $result;
    }
    
    public function getAllAttacks($user) {
        $result = [];
        //attack1
        $sql = "SELECT * FROM skill WHERE id = (SELECT attack1_id FROM robotskill WHERE idRobotStatistic = (SELECT idRobotStatistic FROM user WHERE userName = ?))";
        $query = $this->dbConnection->execute($sql, [$user->getUserName()]);
        $temp = $query->fetch();
        $attack = new Attack();
        $attack->setName($temp["name"]);
        $attack->setDescription($temp["description"]);
        $attack->setMultiplier($temp["multiplier"]);
        $skillId = $temp["id"];
        $sql = "SELECT * FROM attribute WHERE id = (SELECT idAttribute FROM effectattribute WHERE idEffect = (SELECT idEffect FROM skilleffect WHERE idSkill = ?))";
        $query = $this->dbConnection->execute($sql, [$skillId]);
        $temp = $query->fetch();
        $attack->setAttribute($temp["iso"]);
        $sql = "SELECT * FROM effect WHERE id = (SELECT idEffect FROM skilleffect WHERE idSkill = ?)";
        $query = $this->dbConnection->execute($sql, [$skillId]);
        $temp = $query->fetch();
        $attack->setValue($temp["value"]);
        $attack->setTarget($temp["target"]);
        $result[] = $attack->toArray();
        //attack2
        $sql = "SELECT * FROM skill WHERE id = (SELECT attack2_id FROM robotskill WHERE idRobotStatistic = (SELECT idRobotStatistic FROM user WHERE userName = ?))";
        $query = $this->dbConnection->execute($sql, [$user->getUserName()]);
        $temp = $query->fetch();
        $attack = new Attack();
        $attack->setName($temp["name"]);
        $attack->setDescription($temp["description"]);
        $attack->setMultiplier($temp["multiplier"]);
        $skillId = $temp["id"];
        $sql = "SELECT * FROM attribute WHERE id = (SELECT idAttribute FROM effectattribute WHERE idEffect = (SELECT idEffect FROM skilleffect WHERE idSkill = ?))";
        $query = $this->dbConnection->execute($sql, [$skillId]);
        $temp = $query->fetch();
        $attack->setAttribute($temp["iso"]);
        $sql = "SELECT * FROM effect WHERE id = (SELECT idEffect FROM skilleffect WHERE idSkill = ?)";
        $query = $this->dbConnection->execute($sql, [$skillId]);
        $temp = $query->fetch();
        $attack->setValue($temp["value"]);
        $attack->setTarget($temp["target"]);
        $result[] = $attack->toArray();
        //attack3
        $sql = "SELECT * FROM skill WHERE id = (SELECT attack3_id FROM robotskill WHERE idRobotStatistic = (SELECT idRobotStatistic FROM user WHERE userName = ?))";
        $query = $this->dbConnection->execute($sql, [$user->getUserName()]);
        $temp = $query->fetch();
        $attack = new Attack();
        $attack->setName($temp["name"]);
        $attack->setDescription($temp["description"]);
        $attack->setMultiplier($temp["multiplier"]);
        $skillId = $temp["id"];
        $sql = "SELECT * FROM attribute WHERE id = (SELECT idAttribute FROM effectattribute WHERE idEffect = (SELECT idEffect FROM skilleffect WHERE idSkill = ?))";
        $query = $this->dbConnection->execute($sql, [$skillId]);
        $temp = $query->fetch();
        $attack->setAttribute($temp["iso"]);
        $sql = "SELECT * FROM effect WHERE id = (SELECT idEffect FROM skilleffect WHERE idSkill = ?)";
        $query = $this->dbConnection->execute($sql, [$skillId]);
        $temp = $query->fetch();
        $attack->setValue($temp["value"]);
        $attack->setTarget($temp["target"]);
        $result[] = $attack->toArray();
        
        //returns result
        return $result;
    }
    
    public function getSkin($skinId) {
        $sql = "SELECT * FROM robotskin WHERE id = ?";
        $query = $this->dbConnection->execute($sql, [$skinId]);
        if ($query != null) {
            return $query->fetch();
        }
        return null;
    }

    public function getAllImplants($user) {
        $result = [];
        $sql = "SELECT * FROM implant WHERE id IN (SELECT idImplant FROM robotstoreimplant WHERE idRobotStatistic IN (SELECT idRobotStatistic FROM user WHERE userName = ?))";
        $query = $this->dbConnection->execute($sql, [$user->getUserName()]);
        if ($query != null) {
            $implantList = $query->fetchAll();
            if (count($implantList) > 0) {
                for ($i = 0; $i < count($implantList); $i++) {
                    $implant = new Implant();
                    $implant->setId($implantList[$i]["id"]);
                    $implant->setName($implantList[$i]["name"]);
                    $implant->setDescription($implantList[$i]["description"]);
                    $implant->setBuyPrice($implantList[$i]["buyPrice"]);
                    $sql = "SELECT * FROM effect WHERE id = (SELECT idEffect FROM implanteffect WHERE idImplant = ?)";
                    $query2 = $this->dbConnection->execute($sql, [$implantList[$i]["id"]]);
                    $effect = $query2->fetch();
                    $implant->setTurns($effect["turns"]);
                    $implant->setValue($effect["value"]);
                    $sql = "SELECT * FROM attribute WHERE id = (SELECT idAttribute FROM effectattribute WHERE idEffect = ?)";
                    $query3 = $this->dbConnection->execute($sql, [$effect["id"]]);
                    $att = $query3->fetch();
                    $implant->setAttribute($att["iso"]);
                    $result[] = $implant->toArray();
                }
            } else {
                $result = [];
            }
        } else {
            $result = [];
        }       
        return $result;
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
