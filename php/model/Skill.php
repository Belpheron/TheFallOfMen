<?php

/**
 * @name Skill()
 * @author Franc
 * @version 1.0
 * @date 12/05/2016
 * @description encapsulates a skill object
 */
class Skill
{
    //properties
    private $id;
    private $name;
    private $description;
    private $requiredLevel;
    private $buyPrice;
    private $multiplier;
    
    //constructor
    function __construct($id="", $name="", $description="", $requiredLevel="", $buyPrice="", $multiplier="")
    {
        $this->id = $id;
        $this->name = $name;
        $this->description = $description;
        $this->requiredLevel = $requiredLevel;
        $this->buyPrice = $buyPrice;
        $this->multiplier = $multiplier;
    }
    
    //accesosrs
    
    //getters
    function getId()
    {
        return $this->id;
    }

    function getName()
    {
        return $this->name;
    }

    function getDescription()
    {
        return $this->description;
    }

    function getRequiredLevel()
    {
        return $this->requiredLevel;
    }

    function getBuyPrice()
    {
        return $this->buyPrice;
    }

    function getMultiplier()
    {
        return $this->multiplier;
    }

    //setters
    function setId($id)
    {
        $this->id = $id;
    }

    function setName($name)
    {
        $this->name = $name;
    }

    function setDescription($description)
    {
        $this->description = $description;
    }

    function setRequiredLevel($requiredLevel)
    {
        $this->requiredLevel = $requiredLevel;
    }

    function setBuyPrice($buyPrice)
    {
        $this->buyPrice = $buyPrice;
    }

    function setMultiplier($multiplier)
    {
        $this->multiplier = $multiplier;
    }



}
