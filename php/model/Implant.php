<?php

/**
 * @name Skill()
 * @author Franc
 * @version 1.0
 * @date 15/05/2016
 * @description encapsulates a implant object
 */
class Implant {

    //properties
    private $id;
    private $name;
    private $description;
    private $buyPrice;
    private $sellPrice;

    //constructor
    function __construct($id = "", $name = "", $description = "", $buyPrice = "") {
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->buyPrice = $buyPrice;
    }

    //accesosrs
    //getters
    function getId() {
        return $this->id;
    }

    function getName() {
        return $this->name;
    }

    function getDescription() {
        return $this->description;
    }

    function getBuyPrice() {
        return $this->buyPrice;
    }

    //setters
    function setId($id) {
        $this->id = $id;
    }

    function setName($name) {
        $this->name = $name;
    }

    function setDescription($description) {
        $this->description = $description;
    }

    function setBuyPrice($buyPrice) {
        $this->buyPrice = $buyPrice;
    }

    function getSellPrice() {
        return $this->sellPrice;
    }

    function setSellPrice($sellPrice) {
        $this->sellPrice = $sellPrice;
    }

}
