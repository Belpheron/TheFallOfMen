<?php

class Implant {

    //attributes
    private $id;
    private $name;
    private $description;
    private $buyPrice;
    private $attribute;
    private $value;
    private $turns;

    //constructor
    function __construct($id = "", $name = "", $description = "", $buyPrice = "", $attribute = "", $value = "", $turns = "") {
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->buyPrice = $buyPrice;
        $this->attribute = $attribute;
        $this->value = $value;
        $this->turns = $turns;
    }
    
    //methods
    function toArray() {
        $result = [
            "id" => $this->id,
            "name" => $this->name,
            "description" => $this->description,
            "buyPrice" => $this->buyPrice,
            "attribute" => $this->attribute,
            "value" => $this->value,
            "turns" => $this->turns
        ];
        return $result;
    }

    //accessors
    function getTurns() {
        return $this->turns;
    }

    function getId() {
        return $this->id;
    }
    function setTurns($turns) {
        $this->turns = $turns;
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

    function getAttribute() {
        return $this->attribute;
    }

    function getValue() {
        return $this->value;
    }

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

    function setAttribute($attribute) {
        $this->attribute = $attribute;
    }

    function setValue($value) {
        $this->value = $value;
    }

}
