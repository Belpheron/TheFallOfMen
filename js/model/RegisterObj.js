this.RegisterObj = function (name, surname1, surname2, birthDate, email, countryId, userName, password, repeatPassword, robotSkinId)
{
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
    this.robotSkinId = robotSkinId;

    //validation flags
    this.validName = true;
    this.validSurname1 = true;
    this.validSurname2 = true;
    this.validBirthDate = true;
    this.validEmail = true;
    this.validUserName = true;
    this.validPassword = true;
    this.emailInUse = false;
    this.nickInUse = false;
    this.equalPasswords = true;

    //accessors
    this.getRobotSkinId = function ()
    {
        return this.robotSkinId;
    }
    this.getName = function ()
    {
        return this.name;
    }
    this.getSurname1 = function ()
    {
        return this.surname1;
    }
    this.getSurname2 = function ()
    {
        return this.surname2;
    }
    this.getBirthDate = function ()
    {
        return this.birthDate;
    }
    this.getEmail = function ()
    {
        return this.email;
    }
    this.getCountryId = function ()
    {
        return this.countryId;
    }
    this.getUserName = function ()
    {
        return this.userName;
    }
    this.getPassword = function ()
    {
        return this.password;
    }
    this.getRepeatPassword = function ()
    {
        return this.repeatPassword;
    }
    this.setName = function (name)
    {
        this.name = name;
    }
    this.setRobotSkinId = function (robotSkinId)
    {
        this.robotSkinId = robotSkinId;
    }
    this.setSurname1 = function (surname1)
    {
        this.surname1 = surname1;
    }
    this.setSurname2 = function (surname2)
    {
        this.surname2 = surname2;
    }
    this.setBirthDate = function (birthDate)
    {
        this.birthDate = birthDate;
    }
    this.setEmail = function (email)
    {
        this.email = email;
    }
    this.setCountryId = function (countryId)
    {
        this.countryId = countryId;
    }
    this.setUserName = function (userName)
    {
        this.userName = userName;
    }
    this.setPassword = function (password)
    {
        this.password = password;
    }
    this.setRepeatPassword = function (repeatPassword)
    {
        this.repeatPassword = repeatPassword;
    }

    //methods
    //validation functions
    this.validateName = function ()
    {
        if (this.name != undefined)
        {
            if (this.name.match(/^[A-Z][a-z ]+$/) != null && this.name.length > 3)
            {
                this.validName = true;
            }
            else
            {
                this.validName = false;
            }
        }
        else
        {
            this.validName = false;
        }
    }
    this.validateSurname1 = function ()
    {
        if (this.surname1 != undefined)
        {
            if (this.surname1.match(/^[A-Z][a-z ]+$/) != null && this.surname1.length > 3)
            {
                this.validSurname1 = true;
            }
            else
            {
                this.validSurname1 = false;
            }
        }
        else
        {
            this.validSurname1 = false;
        }
    }
    this.validateSurname2 = function ()
    {
        if (this.surname2 != undefined)
        {
            if (this.surname2.match(/^[A-Z][a-z ]+$/) != null && this.surname2.length > 3)
            {
                this.validSurname2 = true;
            }
            else
            {
                this.validSurname2 = false;
            }
        }
        else
        {
            this.validSurname2 = false;
        }
    }
    this.validateBirthDate = function ()
    {
        if (this.birthDate != undefined)
        {
            if (!isDate(this.birthDate))
            {
                $("#registerBirthDate").removeClass("ng-valid").addClass("ng-invalid");
                this.validBirthDate = false;
            }
            else
            {
                var dateAux = new Date();
                if (dateAux.getDate() < 10)
                    var day = "0" + dateAux.getDate();
                else
                    var day = dateAux.getDate();
                if ((dateAux.getMonth() + 1) < 10)
                    var month = "0" + (dateAux.getMonth() + 1);
                else
                    var month = dateAux.getMonth();
                var currentDate = dateAux.getFullYear() + "-" + month + "-" + day;
                if (this.birthDate >= currentDate)
                {
                    $("#registerBirthDate").removeClass("ng-valid").addClass("ng-invalid");
                    this.validBirthDate = false;
                }
                else
                {
                    $("#registerBirthDate").removeClass("ng-invalid").addClass("ng-valid");
                    this.validBirthDate = true;
                }
            }
        }
        else
        {
            this.validBirthDate = false;
        }
    }
    this.validateEmail = function ()
    {
        if (this.email != undefined)
        {
            if (this.email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/) != null)
            {
                this.validEmail = true;
            }
            else
            {
                this.validEmail = false;
            }
        }
        else
        {
            this.validEmail = false;
        }
    }
    this.validateUserName = function ()
    {
        if (this.userName != undefined)
        {
            if (this.userName.match(/^[A-Za-z0-9_]{4,}$/) != null)
            {
                this.validUserName = true;
            }
            else
            {
                this.validUserName = false;
            }
        }
        else
        {
            this.validUserName = false;
        }
    }
    this.validatePassword = function ()
    {
        if (this.password != undefined)
        {
            if (this.password.match(/^[A-Za-z0-9_]{4,}$/) != null)
            {
                this.validPassword = true;
            }
            else
            {
                this.validPassword = false;
            }
        }
        else
        {
            this.validPassword = false;
        }
    }
    this.validateEqualPasswords = function ()
    {
        if (this.password != this.repeatPassword)
        {
            this.equalPasswords = false;
        }
        else
        {
            this.equalPasswords = true;
        }
    }
}


