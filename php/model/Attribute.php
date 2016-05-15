<?php

class Attribute {
    //properties
    private $iso;
    private $name;
    private $value;
    
    //constructor
    function __construct($iso="", $name="", $value="") {
        $this->iso = $iso;
        $this->name = $name;
        $this->value = $value;
    }

    //accessors
    function getIso() {
        return $this->iso;
    }

    function getName() {
        return $this->name;
    }

    function getValue() {
        return $this->value;
    }

    function setIso($iso) {
        $this->iso = $iso;
    }

    function setName($name) {
        $this->name = $name;
    }

    function setValue($value) {
        $this->value = $value;
    }

    //methods
    public function toArray() {
        $result = [
            "iso" => $this->iso,
            "name" => $this->name,
            "value" => $this->value
        ];
        return $result;
    }
}

