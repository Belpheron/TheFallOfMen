this.RobotStatistic = function (id, name, level, experience, idRobotSkin)
{
    //properties
    this.id = id;
    this.name = name;
    this.level = level;
    this.experience = experience;
    this.idRobotSkin = idRobotSkin;
    this.arrayLevels = {
        1: "250",
        2: "350",
        3: "500",
        4: "700",
        5: "950",
        6: "1250",
        7: "1600",
        8: "2000",
        9: "2450",
        10: "3000"
    };
    this.expToNextLevel=this.arrayLevels[parseInt(this.level)+1];

    //accessors
    this.getId = function ()
    {
        return this.id;
    };

    this.getName = function ()
    {
        return this.name;
    };

    this.getLevel = function ()
    {
        return this.level;
    };

    this.getExperience = function ()
    {
        return this.experience;
    };

    this.getIdRobotSkin = function ()
    {
        return this.idRobotSkin;
    };

    this.getExpToNextLevel = function ()
    {
        return this.expToNextLevel;
    };

    this.setId = function (id)
    {
        this.id = id;
    };

    this.setName = function (name)
    {
        this.name = name;
    };

    this.setLevel = function (level)
    {
        this.level = level;
    };

    this.setExperience = function (experience)
    {
        this.experience = experience;
    };

    this.setIdRobotSkin = function (idRobotSkin)
    {
        this.idRobotSkin = idRobotSkin;
    };

    this.setExpToNextLevel = function (exp)
    {
        this.expToNextLevel = exp;
    };

    this.calculateLevel = function ()
    {
        if (this.experience > this.arrayLevels[this.getLevel()])
        {
            this.increseLevel();
        }
    };

    this.addExp = function (exp)
    {
        this.experience = this.experience + exp;
        this.calculateLevel();
    };

    this.increseLevel = function ()
    {
        this.level = this.level + 1;
        this.setExpToNextLevel(this.arrayLevels[this.getLevel()]);
    };
    
    this.getPhotoSource = function() {
        var robotName;
        if (this.idRobotSkin == 1) {
            robotName = "MOBOT";
        } else if (this.idRobotSkin == 2) {
            robotName == "PRIME";
        }
        return "images/tooltips/"+robotName+"_TOOLTIP.jpg";
    }

};

