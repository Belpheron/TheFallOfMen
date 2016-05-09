this.Profile = function(id, name, lastName1, lastName2, birthDate, email, idCountry) {
    //properties
    this.id = id;
    this.name = name;
    this.lastName1 = lastName1;
    this.lastName2 = lastName2;
    this.birthDate = birthDate;
    this.email = email;
    this.idCountry = idCountry;
    
    //accessors
    this.getId = function() {
        return this.id;
    }
    this.getName = function() {
        return this.name;
    }
    this.getLastName1 = function() {
        return this.lastName1;
    }
    this.getLastName2 = function() {
        return this.lastName2;
    }
    this.getBirthDate = function() {
        return this.birthDate;
    }
    this.getEmail = function() {
        return this.email;
    }
    this.getIdCountry = function() {
        return this.idCountry;
    }
    this.setId = function(id) {
        this.id = id;
    }
    this.setName = function(name) {
        this.name = name;
    }
    this.setLastName1 = function(lastName1) {
        this.lastName1 = lastName1;
    }
    this.setLastName2 = function(lastName2) {
        this.lastName2 = lastName2;
    }
    this.setBirthDate = function(birthDate) {
        this.birthDate = birthDate;
    }
    this.setEmail = function(email) {
        this.email = email;
    }
    this.setIdCountry = function(idCountry) {
        this.idCountry = idCountry;
    }
}

