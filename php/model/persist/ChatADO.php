<?php

require_once "../model/persist/DBConnect.php";
require_once "../model/persist/ADOinterface.php";

class ChatADO implements ADOinterface {

    //properties
    private $dbConnection;

    //constructor
    public function __construct() {
        $this->dbConnection = DBConnect::getInstance();
    }

    //methods
    public function getAll() {
        $sql = "SELECT * FROM chatmessage";
        $query = $this->dbConnection->execute($sql, []);
        if ($query != null) {
            return $query->fetchAll();
        }
        return null;
    }

    public function getAllSince($dateTime) {
        $sql = "SELECT * FROM chatmessage WHERE date > ? ORDER BY date";
        $query = $this->dbConnection->execute($sql, [$dateTime]);
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
        $sql = "INSERT INTO chatmessage (date, content, idUserNameSender, idUserNameReceiver) VALUES (?,?,?,?)";
        $query = $this->dbConnection->execute($sql, [$entity->getDatetime(), $entity->getContent(),
            $entity->getIdUserNameSender(), $entity->getIdUserNameReceiver()]);
        echo $query->rowCount();
        if ($query != null) {
            return $query->rowCount();
        }
        return 0;
    }

    public function update($entity) {
        
    }

}
