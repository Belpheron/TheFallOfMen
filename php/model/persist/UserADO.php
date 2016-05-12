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
    public function removeBlock($user, $friend) {
        $sql = "DELETE FROM bloqued WHERE iduserName = ? AND idUserNameBloqued = ?";
        $query = $this->dbConnection->execute($sql, [$user->getUserName(), $friend->getUserName()]);
        if ($query == null || $query->rowCount() == 0) {
            return false;
        }
        return true;
    }
    
    public function blockUser($user, $friend) {
        $sql = "INSERT INTO bloqued (iduserName, idUserNameBloqued) VALUES (?, ?)";
        $query = $this->dbConnection->execute($sql, [$user->getUserName(), $friend->getUserName()]);
        if ($query != null) {
            return true;
        }
        return false;
    }
    
    public function removeFriendShip($user, $friend) {
        $sql = "DELETE FROM friend WHERE iduserName = ? AND idUserNameFriend = ?";
        $query = $this->dbConnection->execute($sql, [$user->getUserName(), $friend->getUserName()]);
        if ($query->rowCount() != 0) {
            return true;
        }
        return false;
    }
    
    public function addFriend($user, $friend) {
        $sql = "INSERT INTO friend (iduserName, idUserNameFriend) VALUES (?, ?)";
        $query = $this->dbConnection->execute($sql, [$user->getUserName(), $friend->getUserName()]);
        if ($query != null) {
            return true;
        }
        return false;
    }
    
    public function checkFriendShip($user, $friend) {
        $sql = "SELECT * FROM friend WHERE iduserName = ? AND idUserNameFriend = ?";
        $query = $this->dbConnection->execute($sql, [$user->getUserName(), $friend->getUserName()]);
        if ($query->rowCount() == 0 || $query == null) return false;
        return true;
    }
    
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
    
    public function getFriends($user) {
        $sql = "SELECT * FROM friend WHERE iduserName = ?";
        $query = $this->dbConnection->execute($sql, [$user->getUserName()]);
        if ($query != null) {
            return $query->fetchAll();
        }
        return null;
    }
    
    public function getBlocked($user) {
        $sql = "SELECT * FROM bloqued WHERE iduserName = ?";
        $query = $this->dbConnection->execute($sql, [$user->getUserName()]);
        if ($query != null) {
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
    
    public function getAllOnline($user) {
        $sql = "SELECT * FROM onlineusers WHERE idUser != ?";
        $query = $this->dbConnection->execute($sql, [$user->getUserName()]);
        if ($query != null) {            
            return $query->fetchAll();
        }
        return null;
    }
    
    public function removeOnlineUser($user) {
        $sql = "DELETE FROM onlineusers WHERE idUser = ?";
        $query = $this->dbConnection->execute($sql, [$user->getUserName()]);
        if ($query != null) {
            return true;
        }
        return false;
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
