<?php

require_once "../model/persist/DBConnect.php";
require_once "../model/persist/ADOinterface.php";

class CountryADO implements ADOinterface {
    //properties
    private $dbConnection;
    
    //constructor
    public function __construct() {
        $this->dbConnection = DBConnect::getInstance();
    }
    
    //methods
    public function getAll() {
        $sql = "SELECT * FROM country";
        $query = $this->dbConnection->execute($sql, []);
        if ($query != null) {            
            return $query->fetchAll();
        }
        return null;
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
