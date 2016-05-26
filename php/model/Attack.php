<?php

class Attack {

    //properties
    private $id;
    private $name;
    private $description;
    private $attribute;
    private $value;
    private $multiplier;
    private $target;
    private $requiredLevel;
    private $buyPrice;

    //constructor
    function __construct($name = "", $description = "", $attribute = "", $value = "", $multiplier = "", $target = "") {
        $this->name = $name;
        $this->description = $description;
        $this->attribute = $attribute;
        $this->value = $value;
        $this->multiplier = $multiplier;
        $this->target = $target;
    }

    //accessors

    public function getId() {
        return $this->id;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function getBuyPrice() {
        return $this->buyPrice;
    }

    public function setBuyPrice($buyPrice) {
        $this->buyPrice = $buyPrice;
    }

    public function getRequiredLevel() {
        return $this->requiredLevel;
    }

    public function setRequiredLevel($requiredLevel) {
        $this->requiredLevel = $requiredLevel;
    }

    function getTarget() {
        return $this->target;
    }

    function setTarget($target) {
        $this->target = $target;
    }

    function getMultiplier() {
        return $this->multiplier;
    }

    function getName() {
        return $this->name;
    }

    function setMultiplier($multiplier) {
        $this->multiplier = $multiplier;
    }

    function getDescription() {
        return $this->description;
    }

    function getAttribute() {
        return $this->attribute;
    }

    function getValue() {
        return $this->value;
    }

    function setName($name) {
        $this->name = $name;
    }

    function setDescription($description) {
        $this->description = $description;
    }

    function setAttribute($attribute) {
        $this->attribute = $attribute;
    }

    function setValue($value) {
        $this->value = $value;
    }

    //methods
    public function toArray() {
        $result = [
            "name" => $this->name,
            "description" => $this->description,
            "attribute" => $this->attribute,
            "value" => $this->value,
            "multiplier" => $this->multiplier,
            "target" => $this->target,
            "requiredLevel" => $this->requiredLevel,
            "buyPrice" => $this->buyPrice,
            "id" => $this->id
        ];
        return $result;
    }

}
