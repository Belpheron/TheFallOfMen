<?php

/**
 * @name Profile()
 * @author Juan
 * @version 1.0
 * @date 02/05/2016
 * @description encapsulates a Profile object
 */
class Profile {
    //properties
    private $id;
    private $name;
    private $lastName1;
    private $lastName2;
    private $birthDate;
    private $email;
    private $idCountry;
    
    //constructor
    function __construct($id, $name, $lastName1, $lastName2 = "", $birthDate, $email, $idCountry) {
        $this->id = $id;
        $this->name = $name;
        $this->lastName1 = $lastName1;
        $this->lastName2 = $lastName2;
        $this->birthDate = $birthDate;
        $this->email = $email;
        $this->idCountry = $idCountry;
    }
    
    //accessors
    public function setId($id) {
        $this->id = $id;
    }

    public function setName($name) {
        $this->name = $name;
    }

    public function setLastName1($lastName1) {
        $this->lastName1 = $lastName1;
    }

    public function setLastName2($lastName2) {
        $this->lastName2 = $lastName2;
    }

    public function setBirthDate($birthDate) {
        $this->birthDate = $birthDate;
    }

    public function setEmail($email) {
        $this->email = $email;
    }

    public function setIdCountry($idCountry) {
        $this->idCountry = $idCountry;
    }

        public function getId() {
        return $this->id;
    }

    public function getName() {
        return $this->name;
    }

    public function getLastName1() {
        return $this->lastName1;
    }

    public function getLastName2() {
        return $this->lastName2;
    }

    public function getBirthDate() {
        return $this->birthDate;
    }

    public function getEmail() {
        return $this->email;
    }

    public function getIdCountry() {
        return $this->idCountry;
    }



}
