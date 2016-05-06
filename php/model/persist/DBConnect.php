<?php
class DBConnect {
    //properties
    private $server;
    private $user;
    private $password;
    private $dataBase;
    private $link;
    private $stmt;
    private $array;
    static $instance;
    
    //constructor
    private function __construct() {
        $this->setConnection();
        $this->connect();
    }
    
    //methods
    /**
     * @name setConexion()
     * @description sets default parameters for conexion
     */
    private function setConnection() {
        $this->server = "localhost";
        $this->dataBase = "fallenofmen";
        $this->user = "franc";
        $this->password = "9983212";
    }
    
    /**
     * @name connect()
     * @description performs conexion to the database
     */
    private function connect() {
        try {
            $this->link = new PDO("mysql:dbname=".$this->dataBase."; host=".
                    $this->server, $this->user, $this->password, 
                    array(PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION));
        } catch (PDOException $ex) {
            $this->link = null;
        }
    }
    
    /**
     * @name getInstance()
     * @description returns an instance of the current class, if it's not yet created
     * @return : the instance of this class
     */
    public static function getInstance() {
        if (!(self::$instance instanceof self)) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    /**
     * @name execute()
     * @description executes a sql statement
     * @param $sql
     * @param $vector
     * @return : the query or the number of rows affected
     */
    public function execute($sql, $vector) {
        if ($this->link != null) {
            $this->stmt = $this->link->prepare($sql);
            $this->stmt->execute($vector);
        } else $this->stmt = null;
        return $this->stmt;
    }
}
?>
