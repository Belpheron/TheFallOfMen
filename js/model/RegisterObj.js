this.RegisterObj = function(name, surname1, surname2, birthDate, email, countryId,
        userName, password, repeatPassword) {
    //properties
    //register fields
    this.name = name;
    this.surname1 = surname1;
    this.surname2 = surname2;
    this.birthDate = birthDate;
    this.email = email;
    this.countryId = countryId;
    this.userName = userName;
    this.password = password;
    this.repeatPassword = repeatPassword;
    
    //validation flags
    this.validName = true;
    this.validSurname1 = true;
    this.validSurname2 = true;
    this.validBirthDate = true;
    this.validEmail = true;
    this.validUserName = true;
    this.validPassword;

    //accessors
    this.getName = function() {
        return this.name;
    }
    this.getSurname1 = function() {
        return this.surname1;
    }
    this.getSurname2 = function() {
        return this.surname2;       
    }
    this.getBirthDate = function() {
        return this.birthDate;
    }
    this.getEmail = function() {
        return this.email;
    }
    this.getCountryId = function() {
        return this.countryId;
    }
    this.getUserName = function() {
        return this.userName;
    }
    this.getPassword = function() {
        return this.password;
    }
    this.getRepeatPassword = function() {
        return this.repeatPassword;
    }
    this.setName = function(name) {
        this.name = name;
    }
    this.setSurname1 = function(surname1) {
        this.surname1 = surname1;
    }
    this.setSurname2 = function(surname2) {
        this.surname2 = surname2;
    }
    this.setBirthDate = function(birthDate) {
        this.birthDate = birthDate;
    }
    this.setEmail = function(email) {
        this.email = email;
    }
    this.setCountryId = function(countryId) {
        this.countryId = countryId;
    }
    this.setUserName = function(userName) {
        this.userName = userName;
    }
    this.setPassword = function(password) {
        this.password = password;
    }
    this.setRepeatPassword = function(repeatPassword){
        this.repeatPassword = repeatPassword;
    }
    
    //methods
}


