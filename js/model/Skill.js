/**
 * @name Skill()
 * @author Franc
 * @version 1.0
 * @date 12/05/2016
 * @description encapsulates a Skill object.
 * @param id : skill id.
 * @param name : a name skill.
 * @param description : description of skill.
 * @param requiredLevel: a required level for buy.
 * @param buyPrice: a price for this skill.
 * @param multiplier: a bost give the skill.
 * @returns none.
 */
this.Skill = function (id, name, description, requiredLevel, buyPrice, multiplier)
{
    //properties
    this.id = id;
    this.name = name;
    this.description = description;
    this.requiredLevel = requiredLevel;
    this.buyPrice = buyPrice;
    this.multiplier = multiplier;
    this.invalid = 0;
    this.sellPrice = Math.round((this.buyPrice/3));

    //accessors
    //getters
    this.getId = function ()
    {
        return this.id;
    };
    
    this.getName = function ()
    {
        return this.name;
    };
    
    this.getDescription = function ()
    {
        return this.description;
    };
    
    this.getRequiredLevel = function ()
    {
        return this.requiredLevel;
    };
    
    this.getBuyPrice = function ()
    {
        return this.buyPrice;
    };
    
    this.getMultiplier = function ()
    {
        return this.multiplier;
    };
    
    //setters
    this.setId = function (id)
    {
        this.id = id;
    };
    
    this.setName = function (name)
    {
        this.name = name;
    };
    
    this.setDescription = function (description)
    {
        this.description = description;
    };
    
     this.setRequiredLevel = function (requiredLevel)
    {
        this.requiredLevel = requiredLevel;
    };
    
    this.setBuyPrice = function (buyPrice)
    {
        this.buyPrice = buyPrice;
    };
    
    this.setMultiplier = function (multiplier)
    {
        this.multiplier = multiplier;
    };
};


