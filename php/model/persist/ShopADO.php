<?php

require_once "../model/persist/DBConnect.php";
require_once "../model/persist/ADOinterface.php";

class ShopADO implements ADOinterface
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
     * @name getAllSkills()
     * @author Franc
     * @version 1.0
     * @date 12/05/2016
     * @description get all data of skill
     * @param none.
     * @return : data of skill. (all)
     */
    public function getAll()
    {
        $sql = "SELECT * FROM skill";
        $array = [];
        $query = $this->dbConnection->execute($sql, $array);
        if ($query != null)
        {
            return $query->fetchAll();
        }
        return null;
    }

    /**
     * @name purchaseSkill()
     * @author Franc
     * @version 1.0
     * @date 12/05/2016
     * @description allow purchase a skill if all conditions are done.
     * @param none.
     * @return : boolean.
     */
    public function purchaseSkill($skill)
    {
        //1 update coins user.
        //2 if success, add skill to inventory.
        try
        {
            $sql = "SELECT * FROM skill";
            $array = [];
            $query = $this->dbConnection->execute($sql, $array);
            if ($query != null)
            {
                return $query->fetchAll();
            }
            return null;
        }
        catch (Exception $e)
        {
            echo $e->getMessage();
        }
    }

    public function delete($entity)
    {
        
    }

    public function get($entity)
    {
        
    }

    public function insert($entity)
    {
        
    }

    public function update($entity)
    {
        
    }

}
