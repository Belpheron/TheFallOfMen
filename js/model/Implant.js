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
    this.type = "implant";
    this.id = id;
    this.name = name;
    this.description = description;
    this.buyPrice = buyPrice;
    this.invalid = 0;
    this.sellPrice = Math.round((this.buyPrice / 4));
    this.target = "";
    this.attribute = "";
    this.value = "";

    this.nameOK = function ()
    {
        if (/^[\w\d ]{5,50}$/.test(this.name))
        {
            return true;
        }
        else
        {
            return false;
        }
    };

    this.descriptionOK = function ()
    {
        if (/^[\w\d ]{5,50}$/.test(this.description))
        {
            return true;
        }
        else
        {
            return false;
        }
    };

    this.buyPriceOK = function ()
    {
        if (/^[1]?[0-9]{1,2}$/.test(this.buyPrice))
        {
            return true;
        }
        else
        {
            return false;
        }
    };

    this.valueOK = function ()
    {
        if (/^[1-2]?[0-9]{1}$/.test(this.value))
        {
            return true;
        }
        else
        {
            return false;
        }
    };
//attrName, attrValue
    //accessors
    //getters
    this.getId = function ()
    {
        return this.id;
    };

    this.getTarget = function ()
    {
        return this.target;
    };
    this.getAttributte = function ()
    {
        return this.attribute;
    };
    this.getValue = function ()
    {
        return this.value;
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

    this.setAttribute = function (attribute)
    {
        this.attribute = attribute;
    };
    this.setValue = function (value)
    {
        this.value = value;
    };
    this.setTarget = function (target)
    {
        this.target = target;
    };


};


