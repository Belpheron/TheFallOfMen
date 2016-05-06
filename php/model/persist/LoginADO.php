<?php

require_once "php/model/persist/DBConnect.php";

class LoginADO
{

    //properties
    private
            $dbConnection;

    //constructor
    public
            function __construct()
    {
        $this->dbConnection = DBConnect::getInstance();
    }

    //methods
    /**
     * getUser($user)
     * @description do a select in table user and return them, if not exist return null.
     * @param type $user
     * @return type | null
     */
    public
            function getUser($user)
    {
        $sql = "SELECT * FROM user WHERE userName = ? AND password = ?";
        $query = $this->dbConnection->execute($sql, [$user->getUserName(), $user->getPassword()]);
        if ($query != null)
        {
            return $query->fetch();
        }
        return null;
    }

    /**
     * existEmail($email)
     * @description do a select and comprobe if exist a given email.
     * @param type $email
     * @return type | null
     */
    public
            function existEmail($email)
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
