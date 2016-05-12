<?php

require_once "../model/persist/DBConnect.php";
require_once "../model/persist/ADOinterface.php";

class UserADO implements ADOinterface
{

    //properties
    private $dbConnection;

    //constructor
    public function __construct()
    {
        $this->dbConnection = DBConnect::getInstance();
    }

    //methods
    public function getEmail($email)
    {
        $sql = "SELECT * FROM profile WHERE email = ?";
        $query = $this->dbConnection->execute($sql, [$email]);
        if ($query != null)
        {
            return $query->fetchAll();
        }
        return null;
    }

    public function getAll()
    {
        $sql = "SELECT * FROM user";
        $query = $this->dbConnection->execute($sql, []);
        if ($query != null)
        {
            return $query->fetchAll();
        }
        return null;
    }

    public function getAllOnline()
    {
        $sql = "SELECT * FROM onlineusers";
        $query = $this->dbConnection->execute($sql, []);
        if ($query != null)
        {
            return $query->fetchAll();
        }
        return null;
    }

    public function delete($entity)
    {
        
    }

    public function get($entity)
    {
        $sql = "SELECT * FROM user WHERE userName = ?";
        $query = $this->dbConnection->execute($sql, [$entity->getUserName()]);
        if ($query != null)
        {
            return $query->fetch();
        }
        return null;
    }

    public function insert($entity)
    {
        
    }

    public function update($entity)
    {
        
    }
    
    /**
     * @name updateProfile()
     * @author Franc
     * @version 1.0
     * @date 11/05/2016
     * @description do a update sentence of user table.
     * @param $entity: user object.
     * @return number of affected files, 1 ok; 0 error.
     */
    public function updateProfile($entity)
    {
        $sql = "UPDATE `profile` SET `name`=?, `lastName1`=? ,`lastName2`=? ,`birthDate`=? ,`email`=? ,`idCountry`=? WHERE id = ?";
        $array = [$entity->getName(),
            $entity->getLastName1(),
            $entity->getLastName2(),
            $entity->getBirthDate(),
            $entity->getEmail(),
            $entity->getIdCountry(),
            $entity->getId()];
        try
        {
            $query = $this->dbConnection->execute($sql, $array);
            $rowAffected = $query->rowCount();
            if ($rowAffected != 1)
            {
                $result = false;
            }
            else
            {
                $result = true;
            }
            
        }
        catch (Exception $e)
        {
            error_log($e->getMessage());
            $result = false;
        }
        return $result;
    }

    /**
     * @name updateResetPassword()
     * @author Franc
     * @version 1.0
     * @date 05/05/2016
     * @description do a select for update the password of given user whit a given new password.
     * @param $user: user to change password.
     *              $password: new password to update.
     * @return number of affected files, 1ok; 0 error.
     */
    public function updateResetPassword($user, $password)
    {
        $sql = "UPDATE `user` SET password = ? WHERE userName =?";
        $array = [$password, $user];
        try
        {
            $query = $this->dbConnection->execute($sql, $array);
            $result = true;
        }
        catch (Exception $e)
        {
            error_log($e->getMessage(), 3, "log/my-errors.log");
            $result = false;
        }
        return $result;
    }

    /**
     * @name deCript()
     * @author Franc
     * @version 1.0
     * @date 07/05/2016
     * @description decrypting a text
     * @param $value : the text decrypt.
     * @return : the decrypted text
     */
    public function deCript($value)
    {
        $value = hex2bin($value);
        $value = explode("$", $value);
        $name = "";
        for ($i = 0; $i < count($value) - 1; $i++)
        {
            $name .= chr($value[$i] - 5);
        }
        return $name;
    }

    /**
     * @name setInactive()
     * @author Franc
     * @version 1.0
     * @date 10/05/2016
     * @description set a user to inactive.
     * @param $entity user object
     * @return : boolean
     */
    public function setInactive($entity)
    {
        $sql = "UPDATE `user` SET active = 0 WHERE userName = ?";
        $array = [$entity->getUserName()];
        try
        {
            $query = $this->dbConnection->execute($sql, $array);
            $result = true;
        }
        catch (Exception $e)
        {
            error_log($e->getMessage(), 3, "log/my-errors.log");
            $result = false;
        }
        return $result;
    }

    /**
     * @name comprobeValidate()
     * @author Franc
     * @version 1.0
     * @date 10/05/2016
     * @description comprobe if user exist and password are correct.
     * @param : $user object user.
     * @return : int: num of row found.
     */
    public function comprobeValidate($user)
    {
        try
        {
            $sql = "SELECT count(userName) AS n FROM user WHERE `userName` = ? AND `password` = ? AND `active` = 1";
            $query = $this->dbConnection->execute($sql, [$user->getUserName(), $user->getPassword()]);
            if ($query != null)
            {
                $result = $query->fetch(PDO::FETCH_ASSOC);
                return $result["n"];
            }
        }
        catch (Exception $e)
        {
            error_log($e->getMessage());
            return 0;
        }
    }

    /**
     * @name getUserStatistic()
     * @author Franc
     * @version 1.0
     * @date 10/05/2016
     * @description do a select and retrive all data from userStatistic table.
     * @param : $id id for search
     * @return : a data retrived in json. | null.
     */
    public function getUserStatistic($id)
    {
        try
        {
            $sql = "SELECT * FROM userstatistic WHERE `id` = ?";
            $array = [$id];
            $query = $this->dbConnection->execute($sql, $array);
            if ($query != null)
            {
                $result = $query->fetch();
                return $result;
            }
        }
        catch (Exception $e)
        {
            error_log($e->getMessage());
            return null;
        }
    }

    /**
     * @name getRobotStatistic()
     * @author Franc
     * @version 1.0
     * @date 10/05/2016
     * @description do a select and retrive all data from getRobotStatistic table.
     * @param : $id id for search
     * @return : a data retrived in json. | null.
     */
    public function getRobotStatistic($id)
    {
        try
        {
            $sql = "SELECT * FROM robotstatistic WHERE `id` = ?";
            $array = [$id];
            $query = $this->dbConnection->execute($sql, $array);
            if ($query != null)
            {
                $result = $query->fetch();
                return $result;
            }
        }
        catch (Exception $e)
        {
            error_log($e->getMessage());
            return null;
        }
    }

    /**
     * @name getProfile()
     * @author Franc
     * @version 1.0
     * @date 10/05/2016
     * @description do a select and retrive all data from getProfile table.
     * @param : $id id for search
     * @return : a data retrived in json.
     */
    public function getProfile($id)
    {
        try
        {
            $sql = "SELECT * FROM profile WHERE `id` = ?";
            $array = [$id];
            $query = $this->dbConnection->execute($sql, $array);
            if ($query != null)
            {
                $result = $query->fetch();
                return $result;
            }
        }
        catch (Exception $e)
        {
            error_log($e->getMessage());
            return null;
        }
    }

}
