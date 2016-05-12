<?php

require_once "ControllerInterface.php";
require_once "../model/persist/UserADO.php";
require_once "../model/persist/LoginADO.php";
require_once "../model/User.php";
require_once "../model/Profile.php";

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
                //comprobe if nick alredy exist and load all details data.
                $user = new User($this->jsonData->userName);
                $result = $this->ado->get($user);
                if ($result != null)
                {
                    //load data profile
                    $profile = $this->ado->getProfile($result["idProfile"]);
                    if ($profile != null)
                    {
                        //load data user statistic
                        $userStatistic = $this->ado->getUserStatistic($result["idUserStatistic"]);
                        if ($userStatistic != null)
                        {
                            //load data robot statistic
                            $robotStatistic = $this->ado->getRobotStatistic($result["idRobotStatistic"]);
                            if ($robotStatistic != null)
                            {
                                $outputData[0] = true;
                                $outputData[1] = $result;
                                $outputData[1]["password"] = 0;
                                $outputData[1][1] = 0;
                                $outputData[2] = $profile;
                                $outputData[3] = $userStatistic;
                                $outputData[4] = $robotStatistic;
                            }
                            else
                            {
                                $outputData[0] = false;
                                $outputData[4] = "Error loading data robot statistic.";
                                error_log("FAIL: UserController, action 100.\n", 3, "log/my-errors.log");
                            }
                        }
                        else
                        {
                            $outputData[0] = false;
                            $outputData[3] = "Error loading data user statistic.";
                        }
                    }
                    else
                    {
                        $outputData[0] = false;
                        $outputData[2] = "Error loading data profile.";
                    }
                }
                else
                {
                    $outputData[0] = false;
                    $outputData[1] = "No user found with that user name.";
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
                $result = $this->ado->updateResetPassword($user, md5($this->jsonData[1]));
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

            case 201:
                $profile = new Profile($this->jsonData->profile->id, $this->jsonData->profile->name, $this->jsonData->profile->lastName1, $this->jsonData->profile->lastName2, $this->jsonData->profile->birthDate, $this->jsonData->profile->email, $this->jsonData->profile->idCountry);
                $user = new User($this->jsonData->userName);
                if ($this->jsonData->password != 0)
                {
                    //do 2 operations
                    //operation 1-> change password.
                    $user->setPassword(md5($this->jsonData->password));
                    $result = $this->ado->updateResetPassword($user->getUserName(), $user->getPassword());
                    //iof success: operation 2-> change data profile.
                    if ($result)
                    {
                        $outputData[0] = $this->ado->updateProfile($profile);
                    }
                }
                else
                //only do 1 operation, change data profile.
                {
                    $outputData[0] = $this->ado->updateProfile($profile);
                }
                if ($outputData[0] == true)
                {
                    $outputData[1] = "Modified successfully!";
                }
                else
                {
                    $outputData[1] = "Modified failed, try again";
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
