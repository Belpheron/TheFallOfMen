/**
 * @name Implant()
 * @author Franc
 * @version 1.0
 * @date 16/05/2016
 * @description encapsulates a Implant object.
 * @param id : implant id.
 * @param name : a name implant.
 * @param description : description of implant.
 * @param buyPrice: a price for this implant.
 * @returns none.
 */
this.Implant = function (id, name, description, buyPrice)
{
    //properties
    this.id = id;
    this.name = name;
    this.description = description;
    this.buyPrice = buyPrice;
    this.invalid = 0;
    this.sellPrice = Math.round((this.buyPrice/4));

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
        
    this.getBuyPrice = function ()
    {
        return this.buyPrice;
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
        
    this.setBuyPrice = function (buyPrice)
    {
        this.buyPrice = buyPrice;
    };
};


