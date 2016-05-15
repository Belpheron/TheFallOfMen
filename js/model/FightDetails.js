this.FightDetails = function (accessService, scope) {
    //properties
    //player 1
    this.p1_id;
    this.p1_ap;
    this.p1_dp;
    this.p1_hp;
    this.p1_cp;
    this.p1_xp;
    this.p1_money;
    this.p1_skin;
    this.p1_attack1_dmg;
    this.p1_attack1_attribute;
    this.p1_attack1_value;
    this.p1_attack1_name;
    this.p1_attack1_description;
    this.p1_attack2_dmg;
    this.p1_attack2_attribute;
    this.p1_attack2_value;
    this.p1_attack2_name;
    this.p1_attack2_description;
    this.p1_attack3_dmg;
    this.p1_attack3_attribute;
    this.p1_attack3_value;
    this.p1_attack3_name;
    this.p1_attack3_description;

    //player 2
    this.p2_id;
    this.p2_ap;
    this.p2_dp;
    this.p2_hp;
    this.p2_cp;
    this.p2_xp;
    this.p2_money;
    this.p2_skin;
    this.p2_attack1_dmg;
    this.p2_attack1_attribute;
    this.p2_attack1_value;
    this.p2_attack1_name;
    this.p2_attack1_description;
    this.p2_attack2_dmg;
    this.p2_attack2_attribute;
    this.p2_attack2_value;
    this.p2_attack2_name;
    this.p2_attack2_description;
    this.p2_attack3_dmg;
    this.p2_attack3_attribute;
    this.p2_attack3_value;
    this.p2_attack3_name;
    this.p2_attack3_description;

    this.id_winner;

    //methods
    this.loadPlayer1 = function (playerName) {
        if (playerName == "_local") {
            alert("hola");
            var implants;
            var attributes;
            this.p1_id = scope.currentUser.userName;
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                    {controllerType: 3, action: 101, jsonData: {userName: scope.currentUser.getUserName()}});
            promise.then(function (outputData) {
                if (outputData[0] === true) {
                    implants = outputData[1];
                    var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                            {controllerType: 3, action: 102, jsonData: {userName: scope.currentUser.getUserName()}});
                    promise.then(function (outputData) {
                        if (outputData[0] === true) {
                            attributes = outputData[1];
                            //sums implants to attributes
                            for (var i=0; i<attributes.length; i++) {
                                for (var j=0; j<implants.length; j++) {
                                    if (attributes[i].iso == implants[j].attribute) {
                                        switch(attributes[i].iso) {
                                            case "ap":
                                                this.p1_ap = parseInt(attributes[i].value) +  parseInt(implants[j].value);
                                                break;
                                            case "dp":
                                                this.p1_dp = parseInt(attributes[i].value) +  parseInt(implants[j].value);
                                                break;
                                            case "cp":
                                                this.p1_cp = parseInt(attributes[i].value) +  parseInt(implants[j].value);
                                                break;
                                            case "hp":
                                                this.p1_cp = parseInt(attributes[i].value) +  parseInt(implants[j].value);
                                                break;
                                            default:
                                                break;
                                        }
                                    }
                                }
                            }
                            alert("total ap player 1 = "+this.p1_ap);
                        } else {
                            alert("Error loading attributes, try later.");
                        }
                    });
                } else {
                    alert("Error loading implants, try later.");
                }
            });
        }
    }
}


