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
    
    public function getAllOnline() {
        $sql = "SELECT * FROM onlineusers";
        $query = $this->dbConnection->execute($sql, []);
        if ($query != null) {            
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
        $today = getdate();
        $ePassword = md5($password);
        $sql = "UPDATE `user` SET password = ? WHERE userName =?";
        $array = [$ePassword, $user];      
        try
        {
            $query=$this->dbConnection->execute($sql, $array);
            $result = true;
        }
        catch (Exception $e)
        {
            error_log("[".$today["wday"]."/".$today["mon"]."/".$today["year"]."][".$today["hours"].":".$today["minutes"].":".$today["seconds"]." ".$e->getMessage(), 3, "log/my-errors.log");
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

}
