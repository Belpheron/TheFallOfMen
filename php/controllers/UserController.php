<?php

require_once "ControllerInterface.php";
require_once "../model/persist/UserADO.php";
require_once "../model/persist/LoginADO.php";
require_once "../model/User.php";

class UserController implements ControllerInterface
{

    private $action;
    private $jsonData;
    private $ado;

//constructor
    function __construct($action, $jsonData)
    {
        $this->setAction($action);
        $this->setJsonData(json_decode($jsonData));
        $this->dbConnection = DBConnect::getInstance();
        $this->ado = new UserADO();
    }

//accessors
    public function getAction()
    {
        return $this->action;
    }

    public function getJsonData()
    {
        return $this->jsonData;
    }

    public function setAction($action)
    {
        $this->action = $action;
    }

    public function setJsonData($jsonData)
    {
        $this->jsonData = $jsonData;
    }

    //methods    
    public function run()
    {
        $outputData = [];
        switch ($this->getAction())
        {
            case 100:
                //comprobe if nick alredy exist
                $user = new User($this->jsonData->userName);
                $result = $this->ado->get($user);
                if ($result != null)
                {
                    $outputData[0] = true;
                }
                else
                {
                    $outputData[0] = false;
                    $outputData[1] = "No user found with that user name.";
                    error_log("FAIL: UserController, action 100.\n", 3, "log/my-errors.log");
                }
                break;
            //comprobe if email alredy exist
            case 101:
                $result = $this->ado->getEmail($this->jsonData->email);
                if ($result != null)
                {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                }
                else
                {
                    $outputData[0] = false;
                    $outputData[1] = "No emails found.";
                    error_log("FAIL: UserController, action 101.\n", 3, "log/my-errors.log");
                }
                break;
            //allows change a reset password.
            case 102:
                $user = $this->ado->deCript($this->jsonData[0]);
                $result = $this->ado->updateResetPassword($user, $this->jsonData[1]);
                if ($result == true)
                {
                    $outputData[0] = true;
                    $outputData[1] = "Changed succesfull.";
                }
                else
                {
                    $outputData[0] = false;
                    $outputData[1] = "Impossible reset and update your password, contact Web developer.";
                    error_log("FAIL: UserController, action 102.\n", 3, "log/my-errors.log");
                }
                break;
            //comprobe if exsit a user
            case 103:
                $result = $this->ado->getAllOnline();
                if ($result != null)
                {
                    $outputData[0] = true;
                    $outputData[1] = $result;
                }
                else
                {
                    $outputData[0] = false;
                    $outputData[1] = "No users online found.";
                }
                break;

            //set to inactive a user.
            case 200:
                $pass = md5($this->jsonData->password);
                $user = new User($this->jsonData->userName, $pass);
                if ($this->ado->comprobeValidate($user) == 1)
                {
                    $result = $this->ado->setInactive($user);
                    if ($result != null)
                    {
                        //correct
                        $outputData[0] = true;
                        $outputData[1] = $result;
                    }
                    else
                    {
                        //uncontrolled error
                        $outputData[0] = false;
                        $outputData[1] = "Imposible to set inactive.";
                    }
                }
                else
                {
                    //password incorrect.
                    $outputData[0] = false;
                    $outputData[1] = "Password incorrect.";
                }
                break;
            default:
                $outPutData[0] = false;
                $outputData[1] = "Sorry, there has been an error. Try later";
                error_log("FAIL: action not correct in UserController, value: " . $this->getAction(), 3, "log/my-errors.log");
                break;
        }
        return $outputData;
    }

}
?>

