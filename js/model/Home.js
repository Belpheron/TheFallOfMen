this.Home = function(accessService) {
    //properties
    this.userList = [];

    //methods
    this.start = function() {
        userTimer = setInterval(function() {
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 2, action: 102, jsonData: ""});
            promise.then(function(outputData) {
                if (outputData[0] === true) {
                    this.userList = [];
                    for (var i=0; i<outputData[1].length; i++) {
                        var u = new User(outputData[1][i].userName, outputData[1][i].coins);
                        this.userList.push(u);                        
                    }
                    console.log(this.userList);
                } 
            });
        }, 5000);

    }
}


