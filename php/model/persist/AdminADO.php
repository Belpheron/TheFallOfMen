<?php

require_once "../model/persist/DBConnect.php";
require_once "../model/persist/ADOinterface.php";

class AdminADO implements ADOinterface
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
     * @name insertImplant()
     * @author Franc
     * @version 1.0
     * @date 26/05/2016
     * @description insert a new implant.
     * @param implant: object
     * @return : num last id.
     */
    public function insertImplant($implant)
    {
        try
        {
            //insert implant
            $sqlImplant = "INSERT INTO `implant`(`id`, `name`, `description`, `buyPrice`) VALUES (0,?,?,?) ";
            $array = [$implant->getName(), $implant->getDescription(), $implant->getBuyPrice()];
            $infoImplant = $this->dbConnection->execute($sqlImplant, $array);
            $lastIdImplant = $this->dbConnection->getLink()->lastInsertId();
            //insert effect
            $sqlEffect = "INSERT INTO `effect`( `name`, `description`, `turns`, `value`, `target`) VALUES ('Implant Add for admin','Personal attributes modified',1,?,?) ";
            $array = [$implant->getValue(), $implant->getTarget()];
            $infoEffect = $this->dbConnection->execute($sqlEffect, $array);
            $lastIdEffect = $this->dbConnection->getLink()->lastInsertId();
            //insert ImplantEffect
            $sqlImplantEffect = "INSERT INTO `implanteffect` (`idImplant`, `idEffect`) VALUES (?,?)";
            $array = [$lastIdImplant, $lastIdEffect];
            $infoImplantEffect = $this->dbConnection->execute($sqlImplantEffect, $array);
            //insert effectAttribute
            $sqlEffectAttribute = "INSERT INTO `effectattribute` (`idEffect`, `idAttribute`) VALUES (?,?)";
            $array = [$lastIdEffect, $implant->getAttribute()];
            $infoImplantEffect = $this->dbConnection->execute($sqlEffectAttribute, $array);
            $result = $this->dbConnection->getLink()->lastInsertId();
            return $result;
        }
        catch (Exception $e)
        {
            error_log($e->getMessage());
            return null;
        }
    }

    /**
     * @name getAllImplants()
     * @author Franc
     * @version 1.0
     * @date 27/05/2016
     * @description give all information about a implant selected.
     * @param none
     * @return : array
     */
    public function getAllImplants()
    {
        $result = [];
        $sql = "SELECT * FROM implant";
        $query = $this->dbConnection->execute($sql, []);
        if ($query != null)
        {
            $implantList = $query->fetchAll();
            if (count($implantList) > 0)
            {
                for ($i = 0; $i < count($implantList); $i++)
                {
                    $implant = new Implant();
                    $implant->setId($implantList[$i]["id"]);
                    $implant->setName($implantList[$i]["name"]);
                    $implant->setDescription($implantList[$i]["description"]);
                    $implant->setBuyPrice($implantList[$i]["buyPrice"]);
                    $sql = "SELECT * FROM effect WHERE id = (SELECT idEffect FROM implanteffect WHERE idImplant = ?)";
                    $query2 = $this->dbConnection->execute($sql, [$implantList[$i]["id"]]);
                    $effect = $query2->fetch();
                    $implant->setTurns($effect["turns"]);
                    $implant->setValue($effect["value"]);
                    $implant->setTarget($effect["target"]);
                    $sql = "SELECT * FROM attribute WHERE id = (SELECT idAttribute FROM effectattribute WHERE idEffect = ?)";
                    $query3 = $this->dbConnection->execute($sql, [$effect["id"]]);
                    $att = $query3->fetch();
                    $implant->setAttribute($att["iso"]);
                    $result[] = $implant->toArrayFull();
                }
            }
            else
            {
                $result = [];
            }
        }
        else
        {
            $result = [];
        }
        return $result;
    }

    /**
     * @name updateImplant()
     * @author Franc
     * @version 1.0
     * @date 28/05/2016
     * @description update a implant.
     * @param implant: object
     * @return : boolean
     */
    public function updateImplant($implant)
    {
        try
        {
            //update implant
            $sqlImplant = "UPDATE `implant` SET `name`=?,`description`=?,`buyPrice`=? WHERE `id`=?";
            $array = [$implant->getName(), $implant->getDescription(), $implant->getBuyPrice(), $implant->getId()];
            $infoImplant = $this->dbConnection->execute($sqlImplant, $array);
            //select ImplantEffect
            $sqlImplantEffect = "SELECT `idEffect` FROM `implanteffect` WHERE `idImplant`=?";
            $array = [$implant->getId()];
            $infoImplantEffect = $this->dbConnection->execute($sqlImplantEffect, $array);
            $idEffect = $infoImplantEffect->fetch();
            //insert effect
            $sqlEffect = "UPDATE `effect` SET `value`=?, `target`=? WHERE `id`=? ";
            $array = [$implant->getValue(), $implant->getTarget(), $idEffect[0]];
            $infoEffect = $this->dbConnection->execute($sqlEffect, $array);
            //insert effectAttribute
            $sqlEffectAttribute = "UPDATE `effectattribute` SET`idAttribute`=? WHERE `idEffect`=?";
            $array = [$implant->getAttribute(), $idEffect[0]];
            $infoImplantEffect = $this->dbConnection->execute($sqlEffectAttribute, $array);
            return $this->dbConnection->getLink()->lastInsertId();
        }
        catch (Exception $e)
        {
            error_log($e->getMessage());
            return null;
        }
    }

    public function deleteImplant($implant)
    {
        try
        {
            //select ImplantEffect
            $sqlImplantEffect = "SELECT `idEffect` FROM `implanteffect` WHERE `idImplant`=?";
            $array = [$implant->getId()];
            $infoImplantEffect = $this->dbConnection->execute($sqlImplantEffect, $array);
            $idEffect = $infoImplantEffect->fetch();

            //delte implantEffect
            $sqlImplantEffectDel = "DELETE FROM `implanteffect` WHERE `idImplant`=?";
            $array = [$implant->getId()];
            $infoImplantEffectDel = $this->dbConnection->execute($sqlImplantEffectDel, $array);

            //delete effect
            $sqlEffect = "DELETE FROM `effect` WHERE `id`=? ";
            $array = [$idEffect[0]];
            $infoEffect = $this->dbConnection->execute($sqlEffect, $array);

            //delete effectAttribute
            $sqlEffectAttribute = "DELETE FROM `effectattribute` WHERE `idEffect`=?";
            $array = [$idEffect[0]];
            $infoImplantEffect = $this->dbConnection->execute($sqlEffectAttribute, $array);

            //delete implant
            $sqlImplant = "DELETE FROM `implant` WHERE `id`=?";
            $array = [$implant->getId()];
            $infoImplant = $this->dbConnection->execute($sqlImplant, $array);
            return $this->dbConnection->getLink()->lastInsertId();
        }
        catch (Exception $e)
        {
            error_log($e->getMessage());
            return null;
        }
    }

    /**
     * @name getAllSkills()
     * @author Franc
     * @version 1.0
     * @date 27/05/2016
     * @description give all information about a implant selected.
     * @param none
     * @return : array
     */
    public function getAllSkills()
    {
        $result = [];
        $sql = "SELECT * FROM skill";
        $query = $this->dbConnection->execute($sql, []);
        if ($query != null)
        {
            $skillList = $query->fetchAll();
            if (count($skillList) > 0)
            {
                for ($i = 0; $i < count($skillList); $i++)
                {
                    $skill = new Skill();
                    $skill->setId($skillList[$i]["id"]);
                    $skill->setName($skillList[$i]["name"]);
                    $skill->setDescription($skillList[$i]["description"]);
                    $skill->setRequiredLevel($skillList[$i]["requiredLevel"]);
                    $skill->setBuyPrice($skillList[$i]["buyPrice"]);
                    $skill->setMultiplier($skillList[$i]["multiplier"]);
                    $sql = "SELECT * FROM effect WHERE id = (SELECT idEffect FROM skilleffect WHERE idSkill = ?)";
                    $query2 = $this->dbConnection->execute($sql, [$skillList[$i]["id"]]);
                    $effect = $query2->fetch();
                    $skill->setValue($effect["value"]);
                    $skill->setTarget($effect["target"]);
                    $sql = "SELECT * FROM attribute WHERE id = (SELECT idAttribute FROM effectattribute WHERE idEffect = ?)";
                    $query3 = $this->dbConnection->execute($sql, [$effect["id"]]);
                    $att = $query3->fetch();
                    $skill->setAttribute($att["iso"]);
                    $result[] = $skill->toArrayFull();
                }
            }
            else
            {
                $result = [];
            }
        }
        else
        {
            $result = [];
        }
        return $result;
    }

    /**
     * @name insertSkill()
     * @author Franc
     * @version 1.0
     * @date 30/05/2016
     * @description insert a new skill.
     * @param implant: object
     * @return : num last id.
     */
    public function insertSkill($skill)
    {
        try
        {
            //insert implant
            $sqlSkill = "INSERT INTO `skill`(`id`, `name`, `description`,`requiredLevel` ,`buyPrice`, `multiplier`) VALUES (0,?,?,?,?,?) ";
            $array = [$skill->getName(), $skill->getDescription(), $skill->getRequiredLevel(), $skill->getBuyPrice(), $skill->getMultiplier()];
            $infoSkill = $this->dbConnection->execute($sqlSkill, $array);
            $lastIdSkill = $this->dbConnection->getLink()->lastInsertId();
            //insert effect
            $sqlEffect = "INSERT INTO `effect`( `name`, `description`, `turns`, `value`, `target`) VALUES ('Implant Add for admin','Personal attributes modified',1,?,?) ";
            $array = [$skill->getValue(), $skill->getTarget()];
            $infoEffect = $this->dbConnection->execute($sqlEffect, $array);
            $lastIdEffect = $this->dbConnection->getLink()->lastInsertId();
            //insert ImplantEffect
            $sqlSkillEffect = "INSERT INTO `skilleffect` (`idSkill`, `idEffect`) VALUES (?,?)";
            $array = [$lastIdSkill, $lastIdEffect];
            $infoSkillEffect = $this->dbConnection->execute($sqlSkillEffect, $array);
            //insert effectAttribute
            $sqlEffectAttribute = "INSERT INTO `effectattribute` (`idEffect`, `idAttribute`) VALUES (?,?)";
            $array = [$lastIdEffect, $skill->getAttribute()];
            $infoSkillEffect = $this->dbConnection->execute($sqlEffectAttribute, $array);
            $result = $this->dbConnection->getLink()->lastInsertId();
            return $result;
        }
        catch (Exception $e)
        {
            error_log($e->getMessage());
            return null;
        }
    }

    /**
     * @name updateSkill()
     * @author Franc
     * @version 1.0
     * @date 30/05/2016
     * @description update a skill.
     * @param skill: object
     * @return : boolean
     */
    public function updateSkill($skill)
    {
        try
        {
            //update implant
            $sqlSkill = "UPDATE `skill` SET `name`=?,`description`=?, `requiredLevel`=?,`buyPrice`=?, `multiplier`=? WHERE `id`=?";
            $array = [$skill->getName(), $skill->getDescription(), $skill->getRequiredLevel(), $skill->getBuyPrice(), $skill->getMultiplier(), $skill->getId()];
            $infoSkill = $this->dbConnection->execute($sqlSkill, $array);
            //select SkillEffect
            $sqlSkillEffect = "SELECT `idEffect` FROM `skilleffect` WHERE `idSkill`=?";
            $array = [$skill->getId()];
            $infoSkillEffect = $this->dbConnection->execute($sqlSkillEffect, $array);
            $idEffect = $infoSkillEffect->fetch();
            //insert effect
            $sqlEffect = "UPDATE `effect` SET `value`=? WHERE `id`=? ";
            $array = [$skill->getValue(), $idEffect[0]];
            $infoEffect = $this->dbConnection->execute($sqlEffect, $array);
            //insert effectAttribute
            $sqlEffectAttribute = "UPDATE `effectattribute` SET`idAttribute`=? WHERE `idEffect`=?";
            $array = [$skill->getAttribute(), $idEffect[0]];
            $infoSkillEffect = $this->dbConnection->execute($sqlEffectAttribute, $array);
            return $this->dbConnection->getLink()->lastInsertId();
        }
        catch (Exception $e)
        {
            error_log($e->getMessage());
            return null;
        }
    }

    public function deleteSkill($skill)
    {
        try
        {
            //select ImplantEffect
            $sqlSkillEffect = "SELECT `idEffect` FROM `skilleffect` WHERE `idSkill`=?";
            $array = [$skill->getId()];
            $infoSkillEffect = $this->dbConnection->execute($sqlSkillEffect, $array);
            $idEffect = $infoSkillEffect->fetch();

            //delte implantEffect
            $sqlSkillEffectDel = "DELETE FROM `skilleffect` WHERE `idSkill`=?";
            $array = [$skill->getId()];
            $infoSkillEffectDel = $this->dbConnection->execute($sqlSkillEffectDel, $array);

            //delete effect
            $sqlEffect = "DELETE FROM `effect` WHERE `id`=? ";
            $array = [$idEffect[0]];
            $infoEffect = $this->dbConnection->execute($sqlEffect, $array);

            //delete effectAttribute
            $sqlEffectAttribute = "DELETE FROM `effectattribute` WHERE `idEffect`=?";
            $array = [$idEffect[0]];
            $infoSkillEffect = $this->dbConnection->execute($sqlEffectAttribute, $array);

            //delete implant
            $sqlSkill = "DELETE FROM `skill` WHERE `id`=?";
            $array = [$skill->getId()];
            $infoSkill = $this->dbConnection->execute($sqlSkill, $array);
            return $this->dbConnection->getLink()->lastInsertId();
        }
        catch (Exception $e)
        {
            error_log($e->getMessage());
            return null;
        }
    }

    public function deleteChat()
    {
        $sqlCount = "SELECT count(*) FROM `chatmessage`";
        $array = [];
        $infoCount = $this->dbConnection->execute($sqlCount, $array);
        $count = $infoCount->fetch();
        if ($count[0] < 1)
        {
            return false;
        }
        else
        {

            $sqlDelete = "DELETE FROM `chatmessage`";
            $array = [];
            $infoCount = $this->dbConnection->execute($sqlDelete, $array);
            return true;
        }
    }

    public function loadInactiveUsers()
    {
        try
        {
            $sqlLoad = "SELECT * FROM `user` WHERE `active` = 0";
            $array = [];
            $infoLoad = $this->dbConnection->execute($sqlLoad, $array);
            $result = $infoLoad->fetchAll();
            return $result;
        }
        catch (Exception $ex)
        {
            return false;
        }
    }

    public function deleteInactiveUsers($user)
    {
        try
        {
            //get all info user.
            $sqlLoad = "SELECT * FROM `user` WHERE `userName` = ?";
            $array = [$user->getUserName()];
            $infoLoad = $this->dbConnection->execute($sqlLoad, $array);
            $result = $infoLoad->fetch();
            $userName = $result['userName'];
            $idProfile = $result['idProfile'];
            $idRobotStatistic = $result['idRobotStatistic'];
            $idUserStatistic = $result['idUserStatistic'];

            //user
            $sqlDeleteUser = "DELETE FROM user WHERE `userName` = ?";
            $array = [$user->getUserName()];
            $infoLoad = $this->dbConnection->execute($sqlDeleteUser, $array);

            //UserStatistic
            $sqlDeleteUser = "DELETE FROM userstatistic WHERE `id` = ?";
            $array = [$idUserStatistic];
            $infoLoad = $this->dbConnection->execute($sqlDeleteUser, $array);

            //robotstatistic
            $sqlDeleteUser = "DELETE FROM robotstatistic WHERE `id` = ?";
            $array = [$idRobotStatistic];
            $infoLoad = $this->dbConnection->execute($sqlDeleteUser, $array);

            //profile
            $sqlDeleteUser = "DELETE FROM profile WHERE `id` = ?";
            $array = [$idProfile];
            $infoLoad = $this->dbConnection->execute($sqlDeleteUser, $array);

            //friend
            $sqlDeleteUser = "DELETE FROM friend WHERE `idUserName` = ?";
            $array = [$userName];
            $infoLoad = $this->dbConnection->execute($sqlDeleteUser, $array);
            
            $sqlDeleteUser = "DELETE FROM friend WHERE `idUserNameFriend` = ?";
            $array = [$userName];
            $infoLoad = $this->dbConnection->execute($sqlDeleteUser, $array);
        
            //bloqued
            $sqlDeleteUser = "DELETE FROM bloqued WHERE `idUserName` = ?";
            $array = [$userName];
            $infoLoad = $this->dbConnection->execute($sqlDeleteUser, $array);
            
            $sqlDeleteUser = "DELETE FROM bloqued WHERE `idUserNameBloqued` = ?";
            $array = [$userName];
            $infoLoad = $this->dbConnection->execute($sqlDeleteUser, $array);
            return true;
        }
        catch (Exception $e)
        {
            return false;
        }
    }

    public function delete($entity)
    {
        
    }

    public function get($entity)
    {
        
    }

    public function getAll()
    {
        
    }

    public function insert($entity)
    {
        
    }

    public function update($entity)
    {
        
    }

}
