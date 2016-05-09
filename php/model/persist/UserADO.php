<?php

require_once "../model/persist/DBConnect.php";
require_once "../model/persist/ADOinterface.php";

class UserADO implements ADOinterface {
    //properties
    private $dbConnection;
    
    //constructor
    public function __construct() {
        $this->dbConnection = DBConnect::getInstance();
    }
    
    //methods
    public function getEmail($email) {
        $sql = "SELECT * FROM profile WHERE email = ?";
        $query = $this->dbConnection->execute($sql, [$email]);
        if ($query != null) {
            return $query->fetchAll();
        }
        return null;
    }
    
    public function getAll() {
        $sql = "SELECT * FROM user";
        $query = $this->dbConnection->execute($sql, []);
        if ($query != null) {            
            return $query->fetchAll();
        }
        return null;
    }
    
    public function getAllOnline() {
        $sql = "SELECT * FROM onlineusers";
        $query = $this->dbConnection->execute($sql, []);
        if ($query != null) {            
            return $query->fetchAll();
        }
        return null;
    }

    public function delete($entity) {
        
    }

    public function get($entity) {
        $sql = "SELECT * FROM user WHERE userName = ?";
        $query = $this->dbConnection->execute($sql, [$entity->getUserName()]);
        if ($query != null) {
            return $query->fetch();            
        }
        return null;
    }

    public function insert($entity) {
        
    }

    public function update($entity) {
        
    }

}
