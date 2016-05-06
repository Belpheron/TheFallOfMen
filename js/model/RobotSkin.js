/**
 * @name RobotSkin()
 * @author Juan
 * @version 1.0
 * @date 06/05/2016
 * @description encapsulates a robot skin object
 * @param id : the id of the skin
 * @param name : the name of the skin
 * @param description : the description of the skin
 * @returns {n/a}
 */
this.RobotSkin = function(id, name, description) {
    //properties
    this.id = id;
    this.name = name;
    this.description = description;
    
    //accessors
    this.getId = function() {
        return this.id;
    }
    this.getName = function() {
        return this.name;
    }
    this.getDescription = function() {
        return this.description;
    }
    this.setId = function(id) {
        this.id = id;
    }
    this.setName = function(name) {
        this.name = name;
    }
    this.setDescription = function(description) {
        this.description = description;
    }
} 


