<?php

class Register {

    //properties
    private $name;
    private $surname1;
    private $surname2;
    private $email;
    private $birthDate;
    private $countryId;
    private $userName;
    private $password;
    private $robotSkinId;

    //constructor
    function __construct($name, $surname1, $surname2, $email, $birthDate, $countryId, $userName, $password, $robotSkinId) {
        $this->name = $name;
        $this->surname1 = $surname1;
        $this->surname2 = $surname2;
        $this->email = $email;
        $this->birthDate = $birthDate;
        $this->countryId = $countryId;
        $this->userName = $userName;
        $this->password = $password;
        $this->robotSkinId = $robotSkinId;
    }

    //accessors
    public function getRobotSkinId() {
        return $this->robotSkinId;
    }

    public function setRobotSkinId($robotSkinId) {
        $this->robotSkinId = $robotSkinId;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function setSurname1($surname1) {
        $this->surname1 = $surname1;
    }

    public function setSurname2($surname2) {
        $this->surname2 = $surname2;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function setBirthDate($birthDate) {
        $this->birthDate = $birthDate;
    }

    public function setCountryId($countryId) {
        $this->countryId = $countryId;
    }

    public function setUserName($userName) {
        $this->userName = $userName;
    }

    public function setPassword($password) {
        $this->password = $password;
    }

    public function getName() {
        return $this->name;
    }

    public function getSurname1() {
        return $this->surname1;
    }

    public function getSurname2() {
        return $this->surname2;
    }

    public function getEmail() {
        return $this->email;
    }

    public function getBirthDate() {
        return $this->birthDate;
    }

    public function getCountryId() {
        return $this->countryId;
    }

    public function getUserName() {
        return $this->userName;
    }

    public function getPassword() {
        return $this->password;
    }

}
