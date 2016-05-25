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
                //load initial data.
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
                }
                break;
            case 103:
                $user = new User($this->jsonData->userName);
                $all = $this->ado->getAllOnline($user);
                if ($all != null)
                {
                    $outputData[0] = true;
                    $outputData[1] = $all;
                    $friends = $this->ado->getFriends($user);
                    if ($friends != null)
                    {
                        $outputData[2] = $friends;
                        $blocked = $this->ado->getBlocked($user);
                        if ($blocked != null)
                        {
                            $outputData[3] = $blocked;
                        }
                        else
                        {
                            $outputData[3] = false;
                        }
                    }
                    else
                    {
                        $outputData[2] = false;
                    }
                }
                else
                {
                    $outputData[0] = false;
                    $outputData[1] = "No users online found.";
                }
                break;
            case 104:
                $user = new User($this->jsonData->userName);
                if ($this->ado->removeOnlineUser($user))
                {
                    $outputData[0] = true;
                }
                else
                {
                    $outputData[0] = false;
                    $outputData[1] = "Error found while deleting the session.";
                }
                break;
            case 107:
                $user = new User($this->jsonData->userName);
                $friend = new User($this->jsonData->friend);
                if ($this->ado->addFriend($user, $friend))
                {
                    $outputData[0] = true;
                }
                else
                {
                    $outputData[1] = false;
                }
                break;
            case 108:
                $user = new User($this->jsonData->userName);
                $friend = new User($this->jsonData->friend);
                if ($this->ado->checkFriendShip($user, $friend))
                {
                    $outputData[0] = true;
                }
                else
                {
                    $outputData[1] = false;
                }
                break;
            case 109:
                $user = new User($this->jsonData->userName);
                $friend = new User($this->jsonData->friend);
                if ($this->ado->removeFriendShip($user, $friend))
                {
                    $outputData[0] = true;
                }
                else
                {
                    $outputData[1] = false;
                }
                break;
            case 110:
                $user = new User($this->jsonData->userName);
                $friend = new User($this->jsonData->friend);
                if ($this->ado->blockUser($user, $friend))
                {
                    $outputData[0] = true;
                }
                else
                {
                    $outputData[1] = false;
                }
                break;
            case 111:
                $user = new User($this->jsonData->userName);
                $friend = new User($this->jsonData->friend);
                if ($this->ado->removeBlock($user, $friend))
                {
                    $outputData[0] = true;
                }
                else
                {
                    $outputData[1] = false;
                }
                break;
            default:
                $outPutData[0] = false;
                $outputData[1] = "Sorry, there has been an error. Try later";
                break;
        }
        return $outputData;
    }

}
