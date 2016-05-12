this.Home = function(accessService, scope) {
    //properties  
    this.currentTab = "all";

    //accessors    

    //methods
    /**
     * @name start()
     * @author Juan
     * @version 1.0
     * @date 09/05/2016
     * @description starts the chat, loading online users
     * @returns {n/a}
     */
    this.start = function() {
        userTimer = setInterval(function() {
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 2, action: 103, jsonData: {userName: scope.currentUser.getUserName()}});
            promise.then(function(outputData) {
                if (outputData[0] === true) {
                    //if (outputData[1].length != scope.onlineUserList.length) {
                        scope.onlineUserList = new Array();
                        for (var i = 0; i < outputData[1].length; i++) {
                            var u = new User(outputData[1][i].idUser, 0);
                            scope.onlineUserList.push(u);                            
                        }
                        console.log(scope.onlineUserList);
                        /*var promise2 = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 2, action: 105, jsonData: {userName: scope.currentUser.getUserName()}});
                        promise2.then(function(outputData) {
                            if (outputData[0] === true) {
                                scope.onlineFriendList = [];
                                for (var i = 0; i < outputData[1].length; i++) {
                                    for (var j = 0; j < scope.onlineUserList.length; j++) {
                                        if (scope.onlineUserList[j].getUserName() == outputData[i].idUserNameFriend) {
                                            var u = new User(outputData[i].idUserNameFriend, 0);
                                            scope.onlineFriendList.push(u);
                                        }
                                    }

                                }
                                var promise3 = accessService.getData("php/controllers/MainController.php", true, "POST", {controllerType: 2, action: 106, jsonData: {userName: scope.currentUser.getUserName()}});
                                promise3.then(function(outputData) {
                                    if (outputData[0] === true) {
                                        scope.onlineBlockedList = [];
                                        for (var i = 0; i < outputData[1].length; i++) {
                                            for (var j = 0; j < scope.onlineUserList.length; j++) {
                                                if (scope.onlineUserList[j].getUserName() == outputData[i].idUserNameBloqued) {
                                                    var u = new User(outputData[i].idUserNameBloqued, 0);
                                                    scope.onlineBlockedList.push(u);
                                                }
                                            }
                                        }
                                    }
                                });
                            }
                        });*/
                    //}
                }
            });
            console.log(scope.onlineUserList);
        }, 5000);
    }

    /**
     * @name showAllTab()
     * @author Juan
     * @version 1.0
     * @date 09/05/2016
     * @description shows all online users tab
     * @returns {n/a}
     */
    this.showAllTab = function() {
        this.currentTab = "all";
        $("#friendsTab").removeClass("active");
        $("#blockedTab").removeClass("active");
        $("#allTab").addClass("active");
    }

    /**
     * @name showAllTab()
     * @author Juan
     * @version 1.0
     * @date 09/05/2016
     * @description shows all friend users tab
     * @returns {n/a}
     */
    this.showFriendsTab = function() {
        this.currentTab = "friends";
        $("#friendsTab").addClass("active");
        $("#blockedTab").removeClass("active");
        $("#allTab").removeClass("active");
    }

    /**
     * @name showAllTab()
     * @author Juan
     * @version 1.0
     * @date 09/05/2016
     * @description shows blocked online users tab
     * @returns {n/a}
     */
    this.showBlockedTab = function() {
        this.currentTab = "blocked";
        $("#friendsTab").removeClass("active");
        $("#blockedTab").addClass("active");
        $("#allTab").removeClass("active");
    }

    /**
     * @name stop()
     * @author Juan
     * @version 1.0
     * @date 09/05/2016
     * @description stops the online user load
     * @returns {n/a}
     */
    this.stop = function() {
        clearInterval(userTimer);
    }
}


