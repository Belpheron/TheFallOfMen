<?php

class FightResult {
    //properties
    private $p1_id;
    private $p2_id;
    private $p1_xp;
    private $p2_xp;
    private $p1_money;
    private $p2_money;
    private $id_winner;
    private $id_defeated;
    private $p1_total_damage;
    private $p1_received_damage;
    private $p2_total_damage;
    private $p2_received_damage;
    
    //constructor
    function __construct($p1_id, $p2_id, $p1_xp, $p2_xp, $p1_money, $p2_money, $id_winner, $id_defeated, $p1_total_damage, $p1_received_damage, $p2_total_damage, $p2_received_damage) {
        $this->p1_id = $p1_id;
        $this->p2_id = $p2_id;
        $this->p1_xp = $p1_xp;
        $this->p2_xp = $p2_xp;
        $this->p1_money = $p1_money;
        $this->p2_money = $p2_money;
        $this->id_winner = $id_winner;
        $this->id_defeated = $id_defeated;
        $this->p1_total_damage = $p1_total_damage;
        $this->p1_received_damage = $p1_received_damage;
        $this->p2_total_damage = $p2_total_damage;
        $this->p2_received_damage = $p2_received_damage;
    }
    
    //accessors
    function setP1_id($p1_id) {
        $this->p1_id = $p1_id;
    }

    function setP2_id($p2_id) {
        $this->p2_id = $p2_id;
    }

    function setP1_xp($p1_xp) {
        $this->p1_xp = $p1_xp;
    }

    function setP2_xp($p2_xp) {
        $this->p2_xp = $p2_xp;
    }

    function setP1_money($p1_money) {
        $this->p1_money = $p1_money;
    }

    function setP2_money($p2_money) {
        $this->p2_money = $p2_money;
    }

    function setId_winner($id_winner) {
        $this->id_winner = $id_winner;
    }

    function setId_defeated($id_defeated) {
        $this->id_defeated = $id_defeated;
    }

    function setP1_total_damage($p1_total_damage) {
        $this->p1_total_damage = $p1_total_damage;
    }

    function setP1_received_damage($p1_received_damage) {
        $this->p1_received_damage = $p1_received_damage;
    }

    function setP2_total_damage($p2_total_damage) {
        $this->p2_total_damage = $p2_total_damage;
    }

    function setP2_received_damage($p2_received_damage) {
        $this->p2_received_damage = $p2_received_damage;
    }

        function getP1_id() {
        return $this->p1_id;
    }

    function getP2_id() {
        return $this->p2_id;
    }

    function getP1_xp() {
        return $this->p1_xp;
    }

    function getP2_xp() {
        return $this->p2_xp;
    }

    function getP1_money() {
        return $this->p1_money;
    }

    function getP2_money() {
        return $this->p2_money;
    }

    function getId_winner() {
        return $this->id_winner;
    }

    function getId_defeated() {
        return $this->id_defeated;
    }

    function getP1_total_damage() {
        return $this->p1_total_damage;
    }

    function getP1_received_damage() {
        return $this->p1_received_damage;
    }

    function getP2_total_damage() {
        return $this->p2_total_damage;
    }

    function getP2_received_damage() {
        return $this->p2_received_damage;
    }



}
