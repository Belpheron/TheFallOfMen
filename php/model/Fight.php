<?php

class Fight {
    //properties
    private $id;
    
    private $p1_id;
    private $p1_ap;
    private $p1_dp;
    private $p1_hp;
    private $p1_cp;
    private $p1_xp;
    private $p1_money;
    private $p1_skin;
    private $p1_attack1_dmg;
    private $p1_attack1_attribute;
    private $p1_attack1_value;
    private $p1_attack1_name;
    private $p1_attack1_description;
    private $p1_attack2_dmg;
    private $p1_attack2_attribute;
    private $p1_attack2_value;
    private $p1_attack2_name;
    private $p1_attack2_description;
    private $p1_attack3_dmg;
    private $p1_attack3_attribute;
    private $p1_attack3_value;
    private $p1_attack3_name;
    private $p1_attack3_description;
    
    private $p2_id;
    private $p2_ap;
    private $p2_dp;
    private $p2_hp;
    private $p2_cp;
    private $p2_xp;
    private $p2_money;
    private $p2_skin;
    private $p2_attack1_dmg;
    private $p2_attack1_attribute;
    private $p2_attack1_value;
    private $p2_attack1_name;
    private $p2_attack1_description;
    private $p2_attack2_dmg;
    private $p2_attack2_attribute;
    private $p2_attack2_value;
    private $p2_attack2_name;
    private $p2_attack2_description;
    private $p2_attack3_dmg;
    private $p2_attack3_attribute;
    private $p2_attack3_value;
    private $p2_attack3_name;
    private $p2_attack3_description;
    
    private $id_winner;
    
    //constructor
    function __construct($id = "", $p1_id= "", $p1_ap= "", $p1_dp="", $p1_hp="", $p1_cp="", $p1_xp="", $p1_money="", 
            $p1_skin="", $p1_attack1_dmg="", $p1_attack1_attribute="", $p1_attack1_value="", $p1_attack1_name="", 
            $p1_attack1_description="", $p1_attack2_dmg="", $p1_attack2_attribute="", $p1_attack2_value="", $p1_attack2_name="", 
            $p1_attack2_description="", $p1_attack3_dmg="", $p1_attack3_attribute="", $p1_attack3_value="", $p1_attack3_name="", 
            $p1_attack3_description="", $p2_id="", $p2_ap="", $p2_dp="", $p2_hp="", $p2_cp="", $p2_xp="", $p2_money="", $p2_skin="", $p2_attack1_dmg="", 
            $p2_attack1_attribute="", $p2_attack1_value="", $p2_attack1_name="", $p2_attack1_description="", $p2_attack2_dmg="", 
            $p2_attack2_attribute="", $p2_attack2_value="", $p2_attack2_name="", $p2_attack2_description="", $p2_attack3_dmg="", 
            $p2_attack3_attribute="", $p2_attack3_value="", $p2_attack3_name="", $p2_attack3_description="", $id_winner = 0) {
        $this->id = $id;
        $this->p1_id = $p1_id;
        $this->p1_ap = $p1_ap;
        $this->p1_dp = $p1_dp;
        $this->p1_hp = $p1_hp;
        $this->p1_cp = $p1_cp;
        $this->p1_xp = $p1_xp;
        $this->p1_money = $p1_money;
        $this->p1_skin = $p1_skin;
        $this->p1_attack1_dmg = $p1_attack1_dmg;
        $this->p1_attack1_attribute = $p1_attack1_attribute;
        $this->p1_attack1_value = $p1_attack1_value;
        $this->p1_attack1_name = $p1_attack1_name;
        $this->p1_attack1_description = $p1_attack1_description;
        $this->p1_attack2_dmg = $p1_attack2_dmg;
        $this->p1_attack2_attribute = $p1_attack2_attribute;
        $this->p1_attack2_value = $p1_attack2_value;
        $this->p1_attack2_name = $p1_attack2_name;
        $this->p1_attack2_description = $p1_attack2_description;
        $this->p1_attack3_dmg = $p1_attack3_dmg;
        $this->p1_attack3_attribute = $p1_attack3_attribute;
        $this->p1_attack3_value = $p1_attack3_value;
        $this->p1_attack3_name = $p1_attack3_name;
        $this->p1_attack3_description = $p1_attack3_description;
        $this->p2_id = $p2_id;
        $this->p2_ap = $p2_ap;
        $this->p2_dp = $p2_dp;
        $this->p2_hp = $p2_hp;
        $this->p2_cp = $p2_cp;
        $this->p2_xp = $p2_xp;
        $this->p2_money = $p2_money;
        $this->p2_skin = $p2_skin;
        $this->p2_attack1_dmg = $p2_attack1_dmg;
        $this->p2_attack1_attribute = $p2_attack1_attribute;
        $this->p2_attack1_value = $p2_attack1_value;
        $this->p2_attack1_name = $p2_attack1_name;
        $this->p2_attack1_description = $p2_attack1_description;
        $this->p2_attack2_dmg = $p2_attack2_dmg;
        $this->p2_attack2_attribute = $p2_attack2_attribute;
        $this->p2_attack2_value = $p2_attack2_value;
        $this->p2_attack2_name = $p2_attack2_name;
        $this->p2_attack2_description = $p2_attack2_description;
        $this->p2_attack3_dmg = $p2_attack3_dmg;
        $this->p2_attack3_attribute = $p2_attack3_attribute;
        $this->p2_attack3_value = $p2_attack3_value;
        $this->p2_attack3_name = $p2_attack3_name;
        $this->p2_attack3_description = $p2_attack3_description;
        $this->id_winner = $id_winner;
    }
    
    //accessors
    function getId() {
        return $this->id;
    }

    function getP1_id() {
        return $this->p1_id;
    }

    function getP1_ap() {
        return $this->p1_ap;
    }

    function getP1_dp() {
        return $this->p1_dp;
    }

    function getP1_hp() {
        return $this->p1_hp;
    }

    function getP1_cp() {
        return $this->p1_cp;
    }

    function getP1_xp() {
        return $this->p1_xp;
    }

    function getP1_money() {
        return $this->p1_money;
    }

    function getP1_skin() {
        return $this->p1_skin;
    }

    function getP1_attack1_dmg() {
        return $this->p1_attack1_dmg;
    }

    function getP1_attack1_attribute() {
        return $this->p1_attack1_attribute;
    }

    function getP1_attack1_value() {
        return $this->p1_attack1_value;
    }

    function getP1_attack1_name() {
        return $this->p1_attack1_name;
    }

    function getP1_attack1_description() {
        return $this->p1_attack1_description;
    }

    function getP1_attack2_dmg() {
        return $this->p1_attack2_dmg;
    }

    function getP1_attack2_attribute() {
        return $this->p1_attack2_attribute;
    }

    function getP1_attack2_value() {
        return $this->p1_attack2_value;
    }

    function getP1_attack2_name() {
        return $this->p1_attack2_name;
    }

    function getP1_attack2_description() {
        return $this->p1_attack2_description;
    }

    function getP1_attack3_dmg() {
        return $this->p1_attack3_dmg;
    }

    function getP1_attack3_attribute() {
        return $this->p1_attack3_attribute;
    }

    function getP1_attack3_value() {
        return $this->p1_attack3_value;
    }

    function getP1_attack3_name() {
        return $this->p1_attack3_name;
    }

    function getP1_attack3_description() {
        return $this->p1_attack3_description;
    }

    function getP2_id() {
        return $this->p2_id;
    }

    function getP2_ap() {
        return $this->p2_ap;
    }

    function getP2_dp() {
        return $this->p2_dp;
    }

    function getP2_hp() {
        return $this->p2_hp;
    }

    function getP2_cp() {
        return $this->p2_cp;
    }

    function getP2_xp() {
        return $this->p2_xp;
    }

    function getP2_money() {
        return $this->p2_money;
    }

    function getP2_skin() {
        return $this->p2_skin;
    }

    function getP2_attack1_dmg() {
        return $this->p2_attack1_dmg;
    }

    function getP2_attack1_attribute() {
        return $this->p2_attack1_attribute;
    }

    function getP2_attack1_value() {
        return $this->p2_attack1_value;
    }

    function getP2_attack1_name() {
        return $this->p2_attack1_name;
    }

    function getP2_attack1_description() {
        return $this->p2_attack1_description;
    }

    function getP2_attack2_dmg() {
        return $this->p2_attack2_dmg;
    }

    function getP2_attack2_attribute() {
        return $this->p2_attack2_attribute;
    }

    function getP2_attack2_value() {
        return $this->p2_attack2_value;
    }

    function getP2_attack2_name() {
        return $this->p2_attack2_name;
    }

    function getP2_attack2_description() {
        return $this->p2_attack2_description;
    }

    function getP2_attack3_dmg() {
        return $this->p2_attack3_dmg;
    }

    function getP2_attack3_attribute() {
        return $this->p2_attack3_attribute;
    }

    function getP2_attack3_value() {
        return $this->p2_attack3_value;
    }

    function getP2_attack3_name() {
        return $this->p2_attack3_name;
    }

    function getP2_attack3_description() {
        return $this->p2_attack3_description;
    }

    function getId_winner() {
        return $this->id_winner;
    }

    function setId($id) {
        $this->id = $id;
    }

    function setP1_id($p1_id) {
        $this->p1_id = $p1_id;
    }

    function setP1_ap($p1_ap) {
        $this->p1_ap = $p1_ap;
    }

    function setP1_dp($p1_dp) {
        $this->p1_dp = $p1_dp;
    }

    function setP1_hp($p1_hp) {
        $this->p1_hp = $p1_hp;
    }

    function setP1_cp($p1_cp) {
        $this->p1_cp = $p1_cp;
    }

    function setP1_xp($p1_xp) {
        $this->p1_xp = $p1_xp;
    }

    function setP1_money($p1_money) {
        $this->p1_money = $p1_money;
    }

    function setP1_skin($p1_skin) {
        $this->p1_skin = $p1_skin;
    }

    function setP1_attack1_dmg($p1_attack1_dmg) {
        $this->p1_attack1_dmg = $p1_attack1_dmg;
    }

    function setP1_attack1_attribute($p1_attack1_attribute) {
        $this->p1_attack1_attribute = $p1_attack1_attribute;
    }

    function setP1_attack1_value($p1_attack1_value) {
        $this->p1_attack1_value = $p1_attack1_value;
    }

    function setP1_attack1_name($p1_attack1_name) {
        $this->p1_attack1_name = $p1_attack1_name;
    }

    function setP1_attack1_description($p1_attack1_description) {
        $this->p1_attack1_description = $p1_attack1_description;
    }

    function setP1_attack2_dmg($p1_attack2_dmg) {
        $this->p1_attack2_dmg = $p1_attack2_dmg;
    }

    function setP1_attack2_attribute($p1_attack2_attribute) {
        $this->p1_attack2_attribute = $p1_attack2_attribute;
    }

    function setP1_attack2_value($p1_attack2_value) {
        $this->p1_attack2_value = $p1_attack2_value;
    }

    function setP1_attack2_name($p1_attack2_name) {
        $this->p1_attack2_name = $p1_attack2_name;
    }

    function setP1_attack2_description($p1_attack2_description) {
        $this->p1_attack2_description = $p1_attack2_description;
    }

    function setP1_attack3_dmg($p1_attack3_dmg) {
        $this->p1_attack3_dmg = $p1_attack3_dmg;
    }

    function setP1_attack3_attribute($p1_attack3_attribute) {
        $this->p1_attack3_attribute = $p1_attack3_attribute;
    }

    function setP1_attack3_value($p1_attack3_value) {
        $this->p1_attack3_value = $p1_attack3_value;
    }

    function setP1_attack3_name($p1_attack3_name) {
        $this->p1_attack3_name = $p1_attack3_name;
    }

    function setP1_attack3_description($p1_attack3_description) {
        $this->p1_attack3_description = $p1_attack3_description;
    }

    function setP2_id($p2_id) {
        $this->p2_id = $p2_id;
    }

    function setP2_ap($p2_ap) {
        $this->p2_ap = $p2_ap;
    }

    function setP2_dp($p2_dp) {
        $this->p2_dp = $p2_dp;
    }

    function setP2_hp($p2_hp) {
        $this->p2_hp = $p2_hp;
    }

    function setP2_cp($p2_cp) {
        $this->p2_cp = $p2_cp;
    }

    function setP2_xp($p2_xp) {
        $this->p2_xp = $p2_xp;
    }

    function setP2_money($p2_money) {
        $this->p2_money = $p2_money;
    }

    function setP2_skin($p2_skin) {
        $this->p2_skin = $p2_skin;
    }

    function setP2_attack1_dmg($p2_attack1_dmg) {
        $this->p2_attack1_dmg = $p2_attack1_dmg;
    }

    function setP2_attack1_attribute($p2_attack1_attribute) {
        $this->p2_attack1_attribute = $p2_attack1_attribute;
    }

    function setP2_attack1_value($p2_attack1_value) {
        $this->p2_attack1_value = $p2_attack1_value;
    }

    function setP2_attack1_name($p2_attack1_name) {
        $this->p2_attack1_name = $p2_attack1_name;
    }

    function setP2_attack1_description($p2_attack1_description) {
        $this->p2_attack1_description = $p2_attack1_description;
    }

    function setP2_attack2_dmg($p2_attack2_dmg) {
        $this->p2_attack2_dmg = $p2_attack2_dmg;
    }

    function setP2_attack2_attribute($p2_attack2_attribute) {
        $this->p2_attack2_attribute = $p2_attack2_attribute;
    }

    function setP2_attack2_value($p2_attack2_value) {
        $this->p2_attack2_value = $p2_attack2_value;
    }

    function setP2_attack2_name($p2_attack2_name) {
        $this->p2_attack2_name = $p2_attack2_name;
    }

    function setP2_attack2_description($p2_attack2_description) {
        $this->p2_attack2_description = $p2_attack2_description;
    }

    function setP2_attack3_dmg($p2_attack3_dmg) {
        $this->p2_attack3_dmg = $p2_attack3_dmg;
    }

    function setP2_attack3_attribute($p2_attack3_attribute) {
        $this->p2_attack3_attribute = $p2_attack3_attribute;
    }

    function setP2_attack3_value($p2_attack3_value) {
        $this->p2_attack3_value = $p2_attack3_value;
    }

    function setP2_attack3_name($p2_attack3_name) {
        $this->p2_attack3_name = $p2_attack3_name;
    }

    function setP2_attack3_description($p2_attack3_description) {
        $this->p2_attack3_description = $p2_attack3_description;
    }

    function setId_winner($id_winner) {
        $this->id_winner = $id_winner;
    }



}

