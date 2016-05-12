<?php

class ChatMessage {
    //properties
    private $datetime;
    private $content;
    private $idUserNameSender;
    private $idUserNameReceiver;
    
    //constructor
    function __construct($datetime, $content, $idUserNameSender, $idUserNameReceiver) {
        $this->datetime = $datetime;
        $this->content = $content;
        $this->idUserNameSender = $idUserNameSender;
        $this->idUserNameReceiver = $idUserNameReceiver;
    }
    
    //accessors
    public function getDatetime() {
        return $this->datetime;
    }

    public function getContent() {
        return $this->content;
    }

    public function getIdUserNameSender() {
        return $this->idUserNameSender;
    }

    public function getIdUserNameReceiver() {
        return $this->idUserNameReceiver;
    }

    public function setDatetime($datetime) {
        $this->datetime = $datetime;
    }

    public function setContent($content) {
        $this->content = $content;
    }

    public function setIdUserNameSender($idUserNameSender) {
        $this->idUserNameSender = $idUserNameSender;
    }

    public function setIdUserNameReceiver($idUserNameReceiver) {
        $this->idUserNameReceiver = $idUserNameReceiver;
    }



}

