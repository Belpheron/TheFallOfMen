<?php

require_once "../model/persist/DBConnect.php";
require_once "../model/persist/ADOinterface.php";
require_once "../model/Implant.php";
require_once "../model/Attribute.php";

class RobotADO implements ADOinterface {

    //properties
    private $dbConnection;

    //constructor
    public function __construct() {
        $this->dbConnection = DBConnect::getInstance();
    }

    //methods
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
