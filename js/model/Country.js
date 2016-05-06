/**
 * @name Country()
 * @author Juan
 * @version 1.0
 * @date 05/05/2016
 * @description encapsulates a Country object
 * @param id : country id
 * @param iso : country iso
 * @param name : country name
 * @returns {n/a}
 */
this.Country = function(id, iso, name) {
    //properties
    this.id = id;
    this.iso = iso;
    this.name = name;
    
    //accessors
    this.getId = function() {
        return this.id;
    }
    this.getIso = function() {
        return this.iso;
    }
    this.getName = function() {
        return this.name;
    }
    this.setId = function(id) {
        this.id = id;
    }
    this.setIso = function(iso) {
        this.iso = iso;
    }
    this.setName = function(name) {
        this.name = name;
    }
}


