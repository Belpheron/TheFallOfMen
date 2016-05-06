<?php

require_once "php/controllers/ControllerInterface.php";
require_once "php/model/persist/DBConnect.php";
require_once "php/model/User.php";
require_once "php/model/persist/LoginADO.php";
require_once "php/model/Register.php";

class LoginController implements ControllerInterface {

    //properties  
    private $ado;

    //constructor 
    public function __construct() {
        $this->ado = new LoginADO();
    }

    //methods
    /**
     * @name run()
     * @author JuanFran
     * @version 1.0
     * @date 02/05/2016
     * @description main controller run method
     */
    public function run() {

        //login button click
        if (isset($_POST["loginButton"])) {
            $userName = $this->cleanText($_POST["userNameBox"]);
            $userPass = md5($this->cleanText($_POST["passBox"]));
            echo "username=".$userName;
            
            $loginUser = new User($userName, $userPass);
            $foundUser = $this->ado->getUser($loginUser);
            if ($foundUser != null) {
                //if user is found, create a user object with data from database
                $loginUser->setCoins($foundUser["coins"]);
                $loginUser->setUserType($foundUser["userType"]);
                $loginUser->setCoins($foundUser["coins"]);
                $loginUser->setIdProfile($foundUser["idProfile"]);
                $loginUser->setIdUserStatistic($foundUser["idUserStatistic"]);
                $loginUser->setIdRobotStatistic($foundUser["idRobotStatistic"]);
                //save user object in session variable
                $_SESSION["user"] = $loginUser;
                if ($this->ado->addOnlineUser($loginUser)) {
                    header("Location: mainWindow.php");
                } else {
                    header("Location: index.php?error=4");
                }                
            } else {
                header("Location: index.php?error=1");
            }
        }
        
        //submit register button click
        if (isset($_POST["registerButton"])) {
            $name = $this->cleanText($_POST["nameBox"]);
            $surname1 = $this->cleanText($_POST["surname1Box"]);
            $surname2 = $this->cleanText($_POST["surname2Box"]);
            $birthDate = $this->cleanText($_POST["birthDateBox"]);
            $email = $this->cleanText($_POST["emailBox"]);
            $countryId = $_POST["countrySelect"];
            $userName = $this->cleanText($_POST["userNameBox"]);
            $password = md5($this->cleanText($_POST["passwordBox"]));
            $robotSkinId = $_POST["robotSkinId"];
            
            $user = new Register($name, $surname1, $surname2, $email, $birthDate, 
                    $countryId, $userName, $password, $robotSkinId);
            
            $result = $this->ado->saveRegister($user);
            if ($result) {
                header("Location: index.php?register=1");
            } else {
                header("Location: index.php?error=3");
            }
        }
    }
    
    /**
     * @name cleanText()
     * @author Juan
     * @version 1.0
     * @date 04/05/2016
     * @description cleans text of html characters and spaces
     * @param $text : the text to clean
     * @return : the cleaned text
     */
    private function cleanText($text) {
        return htmlspecialchars(stripslashes(trim($text)));
    }

}
