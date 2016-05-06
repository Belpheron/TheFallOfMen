<?php

/**
 * @name User()
 * @author Juan
 * @version 1.0
 * @date 02/05/2016
 * @description encapsulates a user object
 */

class User {
    //properties
    private $userName;
    private $password;
    private $coins;
    private $userType;
    private $idProfile;
    private $idUserStatistic;
    private $idRobotStatistic;
    
    //constructor
    function __construct($userName, $password = "", $coins = "", $userType = "", $idProfile = "", 
            $idUserStatistic = "", $idRobotStatistic = "") {
        $this->userName = $userName;
        $this->password = $password;
        $this->coins = $coins;
        $this->userType = $userType;
        $this->idProfile = $idProfile;
        $this->idUserStatistic = $idUserStatistic;
        $this->idRobotStatistic = $idRobotStatistic;
    }
    
    //accessors
    public function setUserName($userName) {
        $this->userName = $userName;
    }

    public function setPassword($password) {
        $this->password = $password;
    }

    public function setCoins($coins) {
        $this->coins = $coins;
    }

    public function setUserType($userType) {
        $this->userType = $userType;
    }

    public function setIdProfile($idProfile) {
        $this->idProfile = $idProfile;
    }

    public function setIdUserStatistic($idUserStatistic) {
        $this->idUserStatistic = $idUserStatistic;
    }

    public function setIdRobotStatistic($idRobotStatistic) {
        $this->idRobotStatistic = $idRobotStatistic;
    }

        
    public function getUserName() {
        return $this->userName;
    }

    public function getPassword() {
        return $this->password;
    }

    public function getCoins() {
        return $this->coins;
    }

    public function getUserType() {
        return $this->userType;
    }

    public function getIdProfile() {
        return $this->idProfile;
    }

    public function getIdUserStatistic() {
        return $this->idUserStatistic;
    }

    public function getIdRobotStatistic() {
        return $this->idRobotStatistic;
    }



}
