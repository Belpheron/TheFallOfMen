this.RobotStatistic = function(id, name, level, experience, idRobotSkin) {
    //properties
    this.id = id;
    this.name = name;
    this.level = level;
    this.experience = experience;
    this.idRobotSkin = idRobotSkin;
    
    //accessors
    this.getId = function() {
        return this.id;
    }
    this.getName = function() {
        return this.name;
    }
    this.getLevel = function() {
        return this.level;
    }
    this.getExperience = function() {
        return this.experience;
    }
    this.getIdRobotSkin = function() {
        return this.idRobotSkin;
    }
    this.setId = function(id) {
        this.id = id;
    }
    this.setName = function(name) {
        this.name = name;
    }
    this.setLevel = function(level) {
        this.level = level;
    }
    this.setExperience = function(experience) {
        this.experience = experience;
    }
    this.setIdRobotSkin = function(idRobotSkin) {
        this.idRobotSkin = idRobotSkin;
    }
}

