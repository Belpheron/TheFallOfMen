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
     * @name getAllInfoImplant()
     * @author Franc
     * @version 1.0
     * @date 17/05/2016
     * @description give all information about a implant selected.
     * @param skill: object skill wants info.
     * @return : boolean.
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
     * @date 17/05/2016
     * @description give all information about a skill selected.
     * @param skill: object skill wants info.
     * @return : boolean.
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

    /**
     * @name sellImplant()
     * @author Franc
     * @version 1.0
     * @date 16/05/2016
     * @description allow sell a implant if all conditions are done.
     * @param none.
     * @return : boolean.
     */
    public function sellImplant($implant, $user)
    {
        try
        {
            //1 take user coins.
            $sql1 = "SELECT `coins` FROM `user` WHERE userName = ?";
            $array = [$user->getUserName()];
            $query1 = $this->dbConnection->execute($sql1, $array);
            if ($query1 != null)
            {
                $result = $query1->fetch();
                //2 update coins user.
                $sql2 = "UPDATE `user` SET `coins`= ? WHERE `userName` = ?";
                $array = [$result[0] + $implant->getSellPrice(), $user->getUserName()];
                $query2 = $this->dbConnection->execute($sql2, $array);
                //3 remove skill to inventory.
                $sql3 = "DELETE FROM `robotstoreimplant` WHERE `idRobotStatistic` = ? AND `idImplant` = ?";
                $array = [$user->getIdRobotStatistic(), $implant->getId()];
                $query3 = $this->dbConnection->execute($sql3, $array);
                return true;
            }
            else
            {
                //problem coins// ¿hack?
                return null;
            }
        }
        catch (Exception $e)
        {
            return null;
            error_log($e->getMessage());
        }
    }

    /**
     * @name purchaseImplant()
     * @author Franc
     * @version 1.0
     * @date 16/05/2016
     * @description allow purchase a implant if all conditions are done.
     * @param none.
     * @return : boolean.
     */
    public function purchaseImplant($imaplant, $user)
    {
        try
        {
            //1 comprobe user have enough coins.
            $sql1 = "SELECT `coins` FROM `user` WHERE userName = ?";
            $array = [$user->getUserName()];
            $query1 = $this->dbConnection->execute($sql1, $array);
            if ($query1 != null)
            {
                $result = $query1->fetch();
                if ($result[0] >= $imaplant->getBuyPrice())
                {
                    //2 update coins user.
                    $sql2 = "UPDATE `user` SET `coins`= ? WHERE `userName` = ?";
                    $array = [$result[0] - $imaplant->getBuyPrice(), $user->getUserName()];
                    $query2 = $this->dbConnection->execute($sql2, $array);
                    //3 add skill to inventory.
                    $sql3 = "INSERT INTO `robotstoreimplant`(`idRobotStatistic`, `idImplant`) VALUES (?,?)";
                    $array = [$user->getIdRobotStatistic(), $imaplant->getId()];
                    $query3 = $this->dbConnection->execute($sql3, $array);
                    return true;
                }
            }
            else
            {
                //not enough coins// ¿hack?
                return null;
            }
        }
        catch (Exception $e)
        {
            return null;
            error_log($e->getMessage());
        }
    }

    /**
     * @name getInfoImplant()
     * @author Franc
     * @version 1.0 
     * @date 16/05/2016
     * @description get all data of selected implants.
     * @param id array of implants.
     * @return : data of implants purchased. (purchased)
     */
    public function getInfoImplant($arrayId)
    {
        $arrayResult = [];
        try
        {
            for ($i = 0; $i < count($arrayId); $i++)
            {
                $sql = "SELECT * FROM implant WHERE id = ?";
                $array = [$arrayId[$i][0]];
                $query = $this->dbConnection->execute($sql, $array);
                if ($query != null)
                {
                    $result = $query->fetch();
                    array_push($arrayResult, $result);
                }
            }
            return $arrayResult;
        }
        catch (Exception $ex)
        {
            error_log($ex->getMessage());
        }

        return null;
    }

    /**
     * @name getAllPurchasedImplant()
     * @author Franc
     * @version 1.0
     * @date 16/05/2016
     * @description get all data of implant previously purchased
     * @param none.
     * @return : data of implants purchased. (purchased)
     */
    public function getAllPurchasedImplant($user)
    {
        try
        {
            $sql = "SELECT idImplant FROM robotstoreimplant WHERE idRobotStatistic = ?";
            $array = [$user->getIdRobotStatistic()];
            $query = $this->dbConnection->execute($sql, $array);
            if ($query != null)
            {
                return $query->fetchAll();
            }
        }
        catch (Exception $ex)
        {
            error_log($ex->getMessage());
        }

        return null;
    }

    /**
     * @name getAllImplants()
     * @author Franc
     * @version 1.0
     * @date 16/05/2016
     * @description get all data of implants
     * @param none.
     * @return : data of implants. (all)
     */
    public function getAllImplants()
    {
        try
        {
            $sql = "SELECT * FROM implant";
            $array = [];
            $query = $this->dbConnection->execute($sql, $array);
            if ($query != null)
            {
                return $query->fetchAll();
            }
        }
        catch (Exception $ex)
        {
            error_log($ex->getMessage());
        }

        return null;
    }

    /**
     * @name getCoins()
     * @author Franc
     * @version 1.0
     * @date 15/05/2016
     * @description get info coins from user
     * @param user object.
     * @return : data of coins.
     */
    public function getCoins($user)
    {
        try
        {
            $sql1 = "SELECT `coins` FROM `user` WHERE userName = ?";
            $array = [$user->getUserName()];
            $query1 = $this->dbConnection->execute($sql1, $array);
            if ($query1 != null)
            {
                return $query1->fetchAll();
            }
        }
        catch (Exception $ex)
        {
            error_log($ex->getMessage());
        }

        return null;
    }

    /**
     * @name getAllPurchasedSkill()
     * @author Franc
     * @version 1.0
     * @date 15/05/2016
     * @description get all data of skill previously purchased
     * @param none.
     * @return : data of skill purchased. (all)
     */
    public function getAllPurchasedSkill($user)
    {
        try
        {
            $sql = "SELECT idSkill FROM robotstoreskill WHERE idRobotStatistic = ?";
            $array = [$user->getIdRobotStatistic()];
            $query = $this->dbConnection->execute($sql, $array);
            if ($query != null)
            {
                return $query->fetchAll();
            }
        }
        catch (Exception $ex)
        {
            error_log($ex->getMessage());
        }

        return null;
    }

    /**
     * @name getInfoSkill()
     * @author Franc
     * @version 1.0 
     * @date 15/05/2016
     * @description get all data of selected skills.
     * @param id array of skills.
     * @return : data of skill purchased. (selected)
     */
    public function getInfoSkill($arrayId)
    {
        $arrayResult = [];
        try
        {
            for ($i = 0; $i < count($arrayId); $i++)
            {
                $sql = "SELECT * FROM skill WHERE id = ?";
                $array = [$arrayId[$i][0]];
                $query = $this->dbConnection->execute($sql, $array);
                if ($query != null)
                {
                    $result = $query->fetch();
                    array_push($arrayResult, $result);
                }
            }
            return $arrayResult;
        }
        catch (Exception $ex)
        {
            error_log($ex->getMessage());
        }

        return null;
    }

    /**
     * @name getAllSkills()
     * @author Franc
     * @version 1.0
     * @date 12/05/2016
     * @description get all data of skill
     * @param none.
     * @return : data of skill. (all)
     */
    public function getAllSkills()
    {
        try
        {
            $sql = "SELECT * FROM skill";
            $array = [];
            $query = $this->dbConnection->execute($sql, $array);
            if ($query != null)
            {
                return $query->fetchAll();
            }
        }
        catch (Exception $ex)
        {
            error_log($ex->getMessage());
        }
        return null;
    }

    /**
     * @name sellSkill()
     * @author Franc
     * @version 1.0
     * @date 12/05/2016
     * @description allow sell a skill if all conditions are done.
     * @param none.
     * @return : boolean.
     */
    public function sellSkill($skill, $user)
    {
        try
        {
            //1 take user coins.
            $sql1 = "SELECT `coins` FROM `user` WHERE userName = ?";
            $array = [$user->getUserName()];
            $query1 = $this->dbConnection->execute($sql1, $array);
            if ($query1 != null)
            {
                $result = $query1->fetch();
                //2 update coins user.
                $sql2 = "UPDATE `user` SET `coins`= ? WHERE `userName` = ?";
                $array = [$result[0] + $skill->getSellPrice(), $user->getUserName()];
                $query2 = $this->dbConnection->execute($sql2, $array);
                //3 remove skill to inventory.
                $sql3 = "DELETE FROM `robotstoreskill` WHERE `idRobotStatistic` = ? AND `idSkill` = ?";
                $array = [$user->getIdRobotStatistic(), $skill->getId()];
                $query3 = $this->dbConnection->execute($sql3, $array);
                return true;
            }
            else
            {
                //problem coins// ¿hack?
                return null;
            }
        }
        catch (Exception $e)
        {
            return null;
            error_log($e->getMessage());
        }
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
    public function purchaseSkill($skill, $user)
    {
        try
        {
            //1 comprobe user have enough coins.
            $sql1 = "SELECT `coins` FROM `user` WHERE userName = ?";
            $array = [$user->getUserName()];
            $query1 = $this->dbConnection->execute($sql1, $array);
            if ($query1 != null)
            {
                $result = $query1->fetch();
                if ($result[0] >= $skill->getBuyPrice())
                {
                    //2 update coins user.
                    $sql2 = "UPDATE `user` SET `coins`= ? WHERE `userName` = ?";
                    $array = [$result[0] - $skill->getBuyPrice(), $user->getUserName()];
                    $query2 = $this->dbConnection->execute($sql2, $array);
                    //3 add skill to inventory.
                    $sql3 = "INSERT INTO `robotstoreskill`(`idRobotStatistic`, `idSkill`) VALUES (?,?)";
                    $array = [$user->getIdRobotStatistic(), $skill->getId()];
                    $query3 = $this->dbConnection->execute($sql3, $array);
                    return true;
                }
            }
            else
            {
                //not enough coins// ¿hack?
                return null;
            }
        }
        catch (Exception $e)
        {
            return null;
            error_log($e->getMessage());
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
