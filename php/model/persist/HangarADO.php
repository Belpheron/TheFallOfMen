<?php

require_once "../model/persist/DBConnect.php";
require_once "../model/persist/ADOinterface.php";

class HangarADO implements ADOinterface
{

    //properties
    private $dbConnection;

    //constructor
    public function __construct()
    {
        $this->dbConnection = DBConnect::getInstance();
    }

    //methods

    public function updateSkill($skill, $user, $objective)
    {
        try
        {
            switch ($objective)
            {
                case '1':
                    $sqlUpdateSkill = "UPDATE `robotskill` SET `attack1_id`=? WHERE `idRobotStatistic`=?";
                    break;
                case '2':
                    $sqlUpdateSkill = "UPDATE `robotskill` SET `attack2_id`=? WHERE `idRobotStatistic`=?";
                    break;
                case '3':
                    $sqlUpdateSkill = "UPDATE `robotskill` SET `attack3_id`=? WHERE `idRobotStatistic`=?";
                    break;
            }
            $array = [$skill->getId(), $user->getIdRobotStatistic()];
            $infoUpdateSkill = $this->dbConnection->execute($sqlUpdateSkill, $array);
            if ($infoUpdateSkill->rowCount() != 0)
            {
                return true;
            }
            else
            {
              return null;  
            }
        }
        catch (Exception $e)
        {
            error_log($e->getMessage());
            return null;
        }
    }

    /**
     * @name getSkill()
     * @author Franc
     * @version 1.0
     * @date 24/05/2016
     * @description give all info about robot assigned skills.
     * @param none.
     * @return array result | null
     */
    public function getSkill($idSkill)
    {
        try
        {
            $sqlSkill = "SELECT * FROM skill WHERE `id` = ?";
            $array = [$idSkill];
            $infoSkill = $this->dbConnection->execute($sqlSkill, $array);
            $result = $infoSkill->fetch();
            return $result;
        }
        catch (Exception $e)
        {
            error_log($e->getMessage());
            return null;
        }
    }

    /**
     * @name getAssignedSkill()
     * @author Franc
     * @version 1.0
     * @date 24/05/2016
     * @description give all info about robot assigned skills.
     * @param none.
     * @return array result | null
     */
    public function getAssignedSkill($user)
    {
        try
        {
            $sqlSkill = "SELECT * FROM robotskill WHERE `idRobotStatistic` = ?";
            $array = [$user->getIdRobotStatistic()];
            $infoSkill = $this->dbConnection->execute($sqlSkill, $array);
            $result = $infoSkill->fetch();
            return $result;
        }
        catch (Exception $e)
        {
            error_log($e->getMessage());
            return null;
        }
    }

    /**
     * @name getRobotAttributes()
     * @author Franc
     * @version 1.0
     * @date 18/05/2016
     * @description give all info attributes about robot user.
     * @param none.
     * @return array result | null
     */
    public function getRobotAttributes($user)
    {
        try
        {
            $sqlAttr = "SELECT `idAttribute`, `value` FROM robotattribute WHERE `idRobotStatistic` = ?";
            $array = [$user->getIdRobotStatistic()];
            $infoAttr = $this->dbConnection->execute($sqlAttr, $array);
            $result = $infoAttr->fetchAll();
            return $result;
        }
        catch (Exception $e)
        {
            error_log($e->getMessage());
            return null;
        }
    }

    /**
     * @name getAllInfoImplant()
     * @author Franc
     * @version 1.0
     * @date 18/05/2016
     * @description give all information about a implant selected.
     * @param implant: object implant wants info.
     * @return : array result | null.
     */
    public function getAllInfoImplant($implant)
    {
        try
        {
            $sqlEffect = "SELECT * FROM effect WHERE `id` = (SELECT `idEffect` FROM implanteffect  WHERE `idImplant` = ?)";
            $array = [$implant->getId()];
            $infoEffect = $this->dbConnection->execute($sqlEffect, $array);
            $infoEffect = $infoEffect->fetch();
            $sqlAttribute = "SELECT * FROM attribute WHERE `id` = (SELECT `idAttribute` FROM effectattribute  WHERE `idEffect` = ?)";
            $array = [$infoEffect["id"]];
            $infoAttribute = $this->dbConnection->execute($sqlAttribute, $array);
            $infoAttribute = $infoAttribute->fetch();
            $result = [];
            array_push($result, $infoEffect);
            array_push($result, $infoAttribute);
            return $result;
        }
        catch (Exception $e)
        {
            error_log($e->getMessage());
            return null;
        }
    }

    /**
     * @name getAllInfoSkill()
     * @author Franc
     * @version 1.0
     * @date 18/05/2016
     * @description give all information about a skill selected.
     * @param skill: object skill wants info.
     * @return : array result | null.
     */
    public function getAllInfoSkill($skill)
    {
        try
        {
            $sqlEffect = "SELECT * FROM effect WHERE `id` = (SELECT `idEffect` FROM skilleffect  WHERE `idSkill` = ?)";
            $array = [$skill->getId()];
            $infoEffect = $this->dbConnection->execute($sqlEffect, $array);
            $infoEffect = $infoEffect->fetch();
            $sqlAttribute = "SELECT * FROM attribute WHERE `id` = (SELECT `idAttribute` FROM effectattribute  WHERE `idEffect` = ?)";
            $array = [$infoEffect["id"]];
            $infoAttribute = $this->dbConnection->execute($sqlAttribute, $array);
            $infoAttribute = $infoAttribute->fetch();
            $result = [];
            array_push($result, $infoEffect);
            array_push($result, $infoAttribute);
            return $result;
        }
        catch (Exception $e)
        {
            error_log($e->getMessage());
            return null;
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

    public function getAll()
    {
        
    }

}
