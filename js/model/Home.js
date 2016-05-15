this.Home = function (accessService, scope) {
    //properties  
    this.currentTab = "all";
    this.textMessage = "";
    scope.playerTarget = "";
    scope.messageList = [];
    scope.onlineUserList = [];
    scope.onlineFriendList = [];
    scope.onlineBlockedList = [];
    scope.playerTooltipContent = "";
    scope.duelAcceptCoolDown = 10;
    scope.showDuelConfirmPopUp = false;
    scope.showRequestWaitPopUp = false;
    scope.duelRequester = "";

    //accessors    

    //methods 
    /**
     * @name acceptDuel()
     * @author Juan
     * @version 1.0
     * @date 12/05/2016
     * @description accepts the requested duel
     * @returns {n/a}
     */
    this.acceptDuel = function () {
        clearInterval(duelRequestTimer);
        clearInterval(responseTimer);
        clearInterval(checkRequestResponseTimer);
        //sets the duel request as accepted
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                {controllerType: 5, action: 103, jsonData: {idReceiver: scope.currentUser.getUserName(), idSender: scope.duelRequester}});
        promise.then(function (outputData) {
            if (outputData[0] === true) {
                var timer = setInterval(function () {
                    //waits for the fight to be loaded and ready
                    var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                            {controllerType: 5, action: 107, jsonData: {idReceiver: scope.currentUser.getUserName(), idSender: scope.duelRequester}});
                    promise.then(function (outputData) {
                        if (outputData[0] === true) {
                            if (outputData[1].fight_is_ready == "1") {
                                window.open("fightWindow.php", "_self");
                            }                            
                        }
                    });
                }, 500);
            }
        });

    }

    /**
     * @name rejectDuel()
     * @author Juan
     * @version 1.0
     * @date 12/05/2016
     * @description rejects the requested duel
     * @returns {n/a}
     */
    this.rejectDuel = function () {
        scope.showBlocker = false;
        scope.showDuelConfirmPopUp = false;
        clearInterval(duelRequestTimer);
        clearInterval(responseTimer);
        clearInterval(checkRequestResponseTimer);
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                {controllerType: 5, action: 106, jsonData: {idReceiver: scope.currentUser.getUserName(), idSender: scope.duelRequester}});
        promise.then(function (outputData) {
            if (outputData[0] !== true) {
                alert("Server error. Try later.");
            }
            scope.startRequestTimer();
        });
    }

    scope.configureAndStartFight = function (requestId) {
        clearInterval(checkRequestResponseTimer);
        var fd = new FightDetails(accessService, scope);
        fd.loadPlayer1("_local");
    }

    /**
     * @name requestDuel()
     * @author Juan
     * @version 1.0
     * @date 12/05/2016
     * @description sends a duel request to the selected player
     * @returns {n/a}
     */
    this.requestDuel = function () {
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                {controllerType: 5, action: 104, jsonData: {idReceiver: scope.playerTarget}});
        promise.then(function (outputData) {
            if (outputData[0] === false) {
                var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                        {controllerType: 5, action: 100, jsonData: {idSender: scope.currentUser.getUserName(), idReceiver: scope.playerTarget}});
                promise.then(function (outputData) {
                    if (outputData[0] !== true) {
                        alert("Error while sending duel request. Please try later.");
                    } else {
                        scope.showBlocker = true;
                        scope.showRequestWaitPopUp = true;
                        scope.duelAcceptCoolDown = 11;
                        checkRequestResponseTimer = setInterval(function () {
                            //checks request response
                            var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                                    {controllerType: 5, action: 105, jsonData: {idSender: scope.currentUser.getUserName(), idReceiver: scope.playerTarget}});
                            promise.then(function (outputData) {
                                if (outputData[1].answer == "1") {
                                    var requestId = outputData[1].id;
                                    var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                                            {controllerType: 5, action: 102, jsonData: {requestId: outputData[1].id}});
                                    promise.then(function (outputData) {
                                        scope.configureAndStartFight(requestId);
                                    });
                                } else if (outputData[1].answer == "2") {
                                    var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                                            {controllerType: 5, action: 102, jsonData: {requestId: outputData[1].id}});
                                    promise.then(function (outputData) {
                                        clearInterval(duelRequestTimer);
                                        scope.showBlocker = false;
                                        scope.showRequestWaitPopUp = false;
                                        alert(scope.playerTarget + " rejected your duel request.");
                                        scope.startRequestTimer();
                                        clearInterval(checkRequestResponseTimer);
                                    });

                                }
                            });
                            scope.duelAcceptCoolDown--;
                            if (scope.duelAcceptCoolDown < 0) {
                                clearInterval(duelRequestTimer);
                                scope.showBlocker = false;
                                scope.showRequestWaitPopUp = false;
                                alert("Duel request timed out.");
                                scope.startRequestTimer();
                                clearInterval(timer);
                            }
                        }, 1000);
                    }
                });
            } else {
                alert(scope.playerTarget + " is busy right now.");
            }
        });
        this.closeTooltipPopUp();
    }

    /**
     * @name removeBlock()
     * @author Juan
     * @version 1.0
     * @date 12/05/2016
     * @description removes selected user from block table
     * @returns {n/a}
     */
    this.removeBlock = function () {
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                {controllerType: 2, action: 111, jsonData: {userName: scope.currentUser.getUserName(), friend: scope.playerTarget}});
        promise.then(function (outputData) {
            if (outputData[0] === true) {
                alert(scope.playerTarget + " has been removed from the block list.");
            } else {
                alert("Server error. Try later.");
            }
        });
        this.closeTooltipPopUp();
    }

    /**
     * @name blockUser()
     * @author Juan
     * @version 1.0
     * @date 11/05/2016
     * @description adds selected user to the block list
     * @returns {n/a}
     */
    this.blockUser = function () {
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                {controllerType: 2, action: 110, jsonData: {userName: scope.currentUser.getUserName(), friend: scope.playerTarget}});
        promise.then(function (outputData) {
            if (outputData[0] === true) {
                alert(scope.playerTarget + " has been added to the block list.");
            } else {
                alert("Server error. Try later.");
            }
        });
        this.closeTooltipPopUp();
    }

    /**
     * @name removeFriend()
     * @author Juan
     * @version 1.0
     * @date 11/05/2016
     * @description removes user from friend list
     * @returns {n/a}
     */
    this.removeFriend = function () {
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                {controllerType: 2, action: 109, jsonData: {userName: scope.currentUser.getUserName(), friend: scope.playerTarget}});
        promise.then(function (outputData) {
            if (outputData[0] === true) {
                alert(scope.playerTarget + " has been removed from your friend list.");
            } else {
                alert("Server error. Try later.");
            }
        });
        this.closeTooltipPopUp();
    }

    /**
     * @name addAsFriend()
     * @author Juan
     * @version 1.0
     * @date 11/05/2016
     * @description adds selected user to friend list, if dont exists already
     * @returns {n/a}
     */
    this.addAsFriend = function () {
        var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                {controllerType: 2, action: 108, jsonData: {userName: scope.currentUser.getUserName(), friend: scope.playerTarget}});
        promise.then(function (outputData) {
            if (outputData[0] === true) {
                alert(scope.playerTarget + " is already in your friend list.");
            } else {
                var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                        {controllerType: 2, action: 107, jsonData: {userName: scope.currentUser.getUserName(), friend: scope.playerTarget}});
                promise.then(function (outputData) {
                    if (outputData[0] === true) {
                        alert(scope.playerTarget + " has been added as friend.");
                    } else {
                        alert("Oops! Unable to add " + scope.playerTarget + " as friend. Try later.");
                    }
                });
            }
        });
        this.closeTooltipPopUp();
    }

    /**
     * @name closeTooltipPopUp()
     * @author Juan
     * @version 1.0
     * @date 11/05/2106
     * @description closes the player tooltip window
     * @returns {n/a}
     */
    this.closeTooltipPopUp = function () {
        $("#playerTooltip").css("display", "none");
        scope.showBlocker = false;
    }

    /**
     * @name sendPrivateMessage()
     * @author Juan
     * @version 1.0
     * @date 11/05/2106
     * @description writes down in the text entry box the name of the selected user
     *      to send a private message to him
     * @param userName : the name of the selected user
     * @returns {n/a}
     */
    this.sendPrivateMessage = function (userName) {
        this.textMessage = "/" + scope.playerTarget + " ";
        $("#textEntryBox").focus();
        this.closeTooltipPopUp();
    }

    /**
     * @name showUserPopUpMenu()
     * @author Juan
     * @version 1.0
     * @date 11/05/216
     * @description builds a menu for the clicked user and shows it in screen
     * @param user : the user that has been clicked
     * @param event : the mouse click event
     * @returns {n/a}
     */
    this.showUserPopUpMenu = function (user, event) {
        var xpos;
        var ypos;
        scope.playerTarget = user.getUserName();
        if (event.offsetX == undefined) {
            xpos = event.pageX - $("#" + user.getUserName() + "Tooltip").offset().left;
            ypos = event.pageY - $("#" + user.getUserName() + "Tooltip").offset().top;
        } else {
            xpos = event.offsetX;
            ypos = event.offsetY;
        }
        var targetName = "<h5 class='pull-left'>" + user.getUserName() + "</h5>";
        var closeCross = "<span class='glyphicon glyphicon-remove playerTooltipCloseCross pull-right' ng-click='home.closeTooltipPopUp()'></span>";
        //adds user name and close cross to tooltip
        scope.playerTooltipContent = targetName + closeCross;
        if (this.currentTab != "blocked") {
            //adds send message button
            var sendMessageButton = "<button class='btn btn-info tooltipButton' ng-click='home.sendPrivateMessage()'>Send private message</button>";
            //adds request duel button
            var requestDuelButton = "<button class='btn btn-info tooltipButton' ng-click='home.requestDuel()'>Request duel</button>";
            scope.playerTooltipContent += sendMessageButton + requestDuelButton;
        }
        if (this.currentTab == "all") {
            //adds add friend button and block user button
            var addFriendButton = "<button class='btn btn-info tooltipButton' ng-click='home.addAsFriend()'>Add as friend</button>";
            var blockUserButton = "<button class='btn btn-info tooltipButton' ng-click='home.blockUser()'>Block user</button>";
            scope.playerTooltipContent += addFriendButton;
            scope.playerTooltipContent += blockUserButton;
        }
        if (this.currentTab == "friends") {
            var removeFriendButton = "<button class='btn btn-info tooltipButton' ng-click='home.removeFriend()'>Remove friend</button>";
            scope.playerTooltipContent += removeFriendButton;
        }
        if (this.currentTab == "blocked") {
            var removeBlockButton = "<button class='btn btn-info tooltipButton' ng-click='home.removeBlock()'>Remove block</button>";
            scope.playerTooltipContent += removeBlockButton;
        }
        $("#playerTooltip").css("left", xpos);
        $("#playerTooltip").css("top", ypos);
        $("#playerTooltip").css("display", "block");
        $("#playerTooltip").css("position", "absolute");
        $("#playerTooltip").css("z-index", "1000");
        scope.showBlocker = true;
    }

    /**
     * @name sendMessage()
     * @author Juan
     * @version 1.0
     * @date 10/05/2016
     * @description saves a user given text message to the database
     * @param keycode : the keycode for entre press
     * @returns {n/a}
     */
    this.sendMessage = function (keycode) {
        if (keycode == 13) {
            var text = (cleanText(this.textMessage)).trim();
            var receiver = "all";
            if (text.substring(0, 1) == "/") {
                var receiverAux = text.split(" ")[0];
                var message = (text.substr(receiverAux.length)).trim();
                receiver = (receiverAux.substring(1, receiverAux.length)).trim();
                var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                        {controllerType: 2, action: 100, jsonData: {userName: receiver}});
                promise.then(function (outputData) {
                    if (outputData[0] === false) {
                        receiver = "all";
                    }
                    var chatMessage = new ChatMessage(getNowSQLDatetime(), message, scope.currentUser.getUserName(), receiver);
                    var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                            {controllerType: 4, action: 101, jsonData: JSON.stringify(chatMessage)});
                    promise.then(function (outputData) {
                        if (outputData[0] === false) {
                            alert("Problem found while sending message to chat. Please try later.");
                        }
                    });
                });
            } else {
                var chatMessage = new ChatMessage(getNowSQLDatetime(), text, scope.currentUser.getUserName(), receiver);
                var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                        {controllerType: 4, action: 101, jsonData: JSON.stringify(chatMessage)});
                promise.then(function (outputData) {
                    if (outputData[0] === false) {
                        alert("Problem found while sending message to chat. Please try later.");
                    }
                });
            }
            this.textMessage = "";
        }
    }

    /**
     * @name startRequestTimer()
     * @author Juan
     * @version 1.0
     * @date 12/05/216
     * @description starts a timer that will search for fight requests in the database
     * @returns {n/a}
     */
    scope.startRequestTimer = function () {
        duelRequestTimer = setInterval(function () {
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                    {controllerType: 5, action: 101, jsonData: {userName: scope.currentUser.getUserName()}});
            promise.then(function (outputData) {
                if (outputData[0] === true) {
                    scope.requestReceived(outputData[1]);
                }
            });
        }, 1000);
    }

    /**
     * @name requestReceive()
     * @author Juan
     * @version 1.0
     * @date 12/05/2016
     * @description shows a pop up window asking user to accept or not a fight request
     *      and processes the answer
     * @param requestData : the request data
     * @returns {n/a}
     */
    scope.requestReceived = function (requestData) {
        clearInterval(duelRequestTimer);
        scope.showBlocker = true;
        scope.duelRequester = requestData.idSender;
        scope.showDuelConfirmPopUp = true;
        scope.duelAcceptCoolDown = 10;
        responseTimer = setInterval(function () {
            scope.duelAcceptCoolDown--;
            //response time out
            if (scope.duelAcceptCoolDown < 0) {
                scope.showBlocker = false;
                scope.showDuelConfirmPopUp = false;
                var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                        {controllerType: 5, action: 102, jsonData: {requestId: requestData.id}});
                promise.then(function (outputData) {
                    if (outputData[0] !== true) {
                        alert("Server error. Try later.");
                    }
                    clearInterval(responseTimer);
                    scope.startRequestTimer();
                });
            }
        }, 1000);
    }

    /**
     * @name start()
     * @author Juan
     * @version 1.0
     * @date 09/05/2016
     * @description starts the chat, loading online users and chat messages
     * @returns {n/a}
     */
    this.start = function () {
        scope.startRequestTimer();
        chatMessageLoadTimer = setInterval(function () {
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                    {controllerType: 4, action: 100, jsonData: {datetime: scope.loginDateTime}});
            promise.then(function (outputData) {
                if (outputData[0] === true) {
                    if (scope.messageList.length != outputData[1].length) {
                        scope.messageList = [];
                        for (var i = 0; i < outputData[1].length; i++) {
                            if (outputData[1][i].idUserNameReceiver == "all" ||
                                    outputData[1][i].idUserNameReceiver == scope.currentUser.getUserName() ||
                                    outputData[1][i].idUserNameSender == scope.currentUser.getUserName()) {
                                var c = new ChatMessage(outputData[1][i].date, outputData[1][i].content,
                                        outputData[1][i].idUserNameSender, outputData[1][i].idUserNameReceiver);
                                scope.messageList.push(c);
                            }
                        }
                    }
                }
            });
        }, 10000);
        userLoadTimer = setInterval(function () {
            var promise = accessService.getData("php/controllers/MainController.php", true, "POST",
                    {controllerType: 2, action: 103, jsonData: {userName: scope.currentUser.getUserName()}});
            promise.then(function (outputData) {
                if (outputData[0] === true) {
                    if (outputData[1].length != scope.onlineUserList.length ||
                            outputData[3].length != scope.onlineBlockedList.length ||
                            outputData[2].length != scope.onlineFriendList.length) {
                        scope.onlineUserList = [];
                        scope.onlineFriendList = [];
                        scope.onlineBlockedList = [];
                        for (var i = 0; i < outputData[1].length; i++) {
                            var isFriend = false;
                            var isBlocked = false;
                            if (outputData[2] !== false) {
                                for (var j = 0; j < outputData[2].length; j++) {
                                    if (outputData[2][j].idUserNameFriend == outputData[1][i].idUser) {
                                        isFriend = true;
                                    }
                                }
                            }
                            if (outputData[3] !== false) {
                                for (var j = 0; j < outputData[3].length; j++) {
                                    if (outputData[3][j].idUserNameBloqued == outputData[1][i].idUser) {
                                        isBlocked = true;
                                    }
                                }
                            }
                            var u = new User(outputData[1][i].idUser, 0);
                            if (!isBlocked) {
                                scope.onlineUserList.push(u);
                            }
                            if (isFriend) {
                                scope.onlineFriendList.push(u);
                            }
                            if (isBlocked) {
                                scope.onlineBlockedList.push(u);
                            }
                        }
                    }
                } else {
                    alert("There is a server problem, please try later");
                }
            });
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
    this.showAllTab = function () {
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
    this.showFriendsTab = function () {
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
    this.showBlockedTab = function () {
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
    this.stop = function () {
        clearInterval(chatMessageLoadTimer);
        clearInterval(userLoadTimer);
        clearInterval(duelRequestTimer);
    }
}


