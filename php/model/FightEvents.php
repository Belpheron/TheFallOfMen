<?php

class FightEvents {
    //properties
    private $id;
    private $p1IsReady;
    private $p2IsReady;
    private $winner;
    private $player1Action;
    private $player2Action;
    private $roundIsEnded ;
    private $roundNumber;
    private $p1Health;
    private $p2Health;
    
    //constructor
    function __construct($id="", $p1IsReady="", $p2IsReady="", $winner="", 
            $player1Action="", $player2Action="", $roundIsEnded="", $roundNumber="", $p1Health="", $p2Health="") {
        $this->id = $id;
        $this->p1IsReady = $p1IsReady;
        $this->p2IsReady = $p2IsReady;
        $this->winner = $winner;
        $this->player1Action = $player1Action;
        $this->player2Action = $player2Action;
        $this->roundIsEnded = $roundIsEnded;
        $this->roundNumber = $roundNumber;
        $this->p1Health = $p1Health;
        $this->p2Health = $p2Health;
    }
    
    //accessors
    public function getP1Health() {
        return $this->p1Health;
    }

    public function getP2Health() {
        return $this->p2Health;
    }

    public function setP1Health($p1Health) {
        $this->p1Health = $p1Health;
    }

    public function setP2Health($p2Health) {
        $this->p2Health = $p2Health;
    }

    
    public function getId() {
        return $this->id;
    }

    public function getP1IsReady() {
        return $this->p1IsReady;
    }

    public function getP2IsReady() {
        return $this->p2IsReady;
    }

    public function getWinner() {
        return $this->winner;
    }

    public function getPlayer1Action() {
        return $this->player1Action;
    }

    public function getPlayer2Action() {
        return $this->player2Action;
    }

    public function getRoundIsEnded() {
        return $this->roundIsEnded;
    }

    public function getRoundNumber() {
        return $this->roundNumber;
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setP1IsReady($p1IsReady) {
        $this->p1IsReady = $p1IsReady;
    }

    public function setP2IsReady($p2IsReady) {
        $this->p2IsReady = $p2IsReady;
    }

    public function setWinner($winner) {
        $this->winner = $winner;
    }

    public function setPlayer1Action($player1Action) {
        $this->player1Action = $player1Action;
    }

    public function setPlayer2Action($player2Action) {
        $this->player2Action = $player2Action;
    }

    public function setRoundIsEnded($roundIsEnded) {
        $this->roundIsEnded = $roundIsEnded;
    }

    public function setRoundNumber($roundNumber) {
        $this->roundNumber = $roundNumber;
    }    

}
