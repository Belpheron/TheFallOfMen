<?php

require_once "DBConnect.php";

class LoginADO
{

    //properties
    private $dbConnection;

    //constructor
    public function __construct()
    {
        $this->dbConnection = DBConnect::getInstance();
    }

    //methods
    /**
     * @name removeOnlineUser()
     * @author Juan
     * @version 1.0
     * @date 06/05/2016
     * @description removes user from onlineusers table
     * @param $user : the user to be removed
     * @return : true if successfully removed, false if error
     */
    public function removeOnlineUser($user)
    {
        $sql = "DELETE FROM onlineusers WHERE idUser = ?";
        try
        {
            $query = $this->dbConnection->execute($sql, [$user->getUserName()]);
            if ($query != null)
            {
                return true;
            }
            return false;
        }
        catch (Exception $ex)
        {
            return false;
        }
    }

    /**
     * @name addOnlineUser()
     * @author Juan
     * @version 1.0
     * @date 06/05/2016
     * @description adds the user to the online user table
     * @param $user : the user to be added
     * @return boolean : true if succesfully added, false if error
     */
    public function addOnlineUser($user)
    {
        $sql = "INSERT INTO onlineusers (idUser) VALUES (?)";
        try
        {
            $query = $this->dbConnection->execute($sql, [$user->getUserName()]);
            if ($query != null)
            {
                return true;
            }
            return false;
        }
        catch (Exception $ex)
        {
            return false;
        }
    }

    /**
     * @name getUser()
     * @author Juan
     * @version 1.0
     * @date 05/05/2016
     * @description gets user from database given its username and password
     * @param $user : the user to be found
     * @return : the found user
     */
    public function getUser($user)
    {
        $sql = "SELECT * FROM user WHERE userName = ? AND password = ? AND active = 1";
        $query = $this->dbConnection->execute($sql, [$user->getUserName(), $user->getPassword()]);
        if ($query != null)
        {
            return $query->fetch();
        }
        return null;
    }

    /**
     * @name saveRegister()
     * @author Juan
     * @version 1.0
     * @date 05/05/2016
     * @description given a registration information, saves it to the database
     * @param $user : entity containing registration details
     * @return : true if successfully saved, false if error
     */
    public function saveRegister($user)
    {
        //inserts profile details
        try
        {
            $sql = "INSERT INTO profile (name, lastName1, lastName2, birthDate, email, idCountry) VALUES (?,?,?,?,?,?)";
            $query = $this->dbConnection->execute($sql, [$user->getName(), $user->getSurname1(),
                $user->getSurname2(), $user->getBirthDate(), $user->getEmail(), $user->getCountryId()]);
            if ($query != null)
            {
                $idProfile = $this->dbConnection->getLink()->lastInsertId();
                //creates statistics for user
                $sql = "INSERT INTO userstatistic (wins, defeats, totalInflictedDamage, totalRecivedDamage, totalWinCoins, totalExpendCoins) VALUES (?,?,?,?,?,?)";
                $query = $this->dbConnection->execute($sql, [0, 0, 0, 0, 0, 0]);
                $idStatistic = $this->dbConnection->getLink()->lastInsertId();

                //creates robot statistics for user
                $sql = "INSERT INTO robotstatistic (name, level, experience, idRobotSkin) VALUES (?,?,?,?)";
                $query = $this->dbConnection->execute($sql, [$user->getUserName()."Tron", 1, 1, $user->getRobotSkinId()]);
                $idRobot = $this->dbConnection->getLink()->lastInsertId();

                //creates user
                $sql = "INSERT INTO user (userName, password, coins, userType, idProfile, idUserStatistic, idRobotStatistic, active) VALUES (?,?,?,?,?,?,?,?)";
                $query = $this->dbConnection->execute($sql, [$user->getUserName(), $user->getPassword(), 10, 0, $idProfile, $idStatistic, $idRobot, 1]);
                
                //assigns basic skills
                $sql = "INSERT INTO robotskill (idRobotStatistic,attack1_id,attack2_id,attack3_id) VALUES (?,?,?,?)";
                $query = $this->dbConnection->execute($sql, [$idRobot, 1, 2, 3]);
                $sql = "INSERT INTO robotstoreskill (idRobotStatistic,idSkill) VALUES (?,?)";
                $query = $this->dbConnection->execute($sql, [$idRobot, 1]);
                $query = $this->dbConnection->execute($sql, [$idRobot, 2]);
                $query = $this->dbConnection->execute($sql, [$idRobot, 3]);
                
                //sets starting attributes
                $sql = "INSERT INTO robotattribute (idRobotStatistic,idAttribute,value) VALUES (?,?,?)";
                $query = $this->dbConnection->execute($sql, [$idRobot, 1, 5]);
                $query = $this->dbConnection->execute($sql, [$idRobot, 2, 5]);
                $query = $this->dbConnection->execute($sql, [$idRobot, 3, 5]);
                $query = $this->dbConnection->execute($sql, [$idRobot, 4, 5]);
                if ($query != null)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            else
            {
                return false;
            }
        }
        catch (Exception $e)
        {
            error_log($e->getMessage(), 3, "log/my-errors.log");
        }
    }

    /**
     * existEmail($email)
     * @description do a select and comprobe if exist a given email.
     * @param type $email
     * @return type | null
     */
    public function existEmail($email)
    {
        $sql = "SELECT username, password FROM user WHERE idprofile = ( SELECT id FROM profile WHERE email = ? )";
        $query = $this->dbConnection->execute($sql, [$email]);
        if ($query != null)
        {
            return $query->fetch();
        }
        return null;
    }

}
