this.User = function(userName, coins) {
    //properties
    this.userName = userName;
    this.coins = coins;
    this.profile;
    this.robotStatistic;
    this.userStatistic;
    
    //accessors
    this.getUserName = function() {
        return this.userName;        
    }
    this.getCoins = function() {
        return this.coins;
    }
    this.getProfile = function() {
        return this.profile;
    }
    this.getRobotStatistic = function() {
        return this.robotStatistic;
    }
    this.getUserStatistic = function() {
        return this.userStatistic;
    }
    this.setUserName = function(userName) {
        this.userName = userName;
    }
    this.setCoins = function(coins) {
        this.coins = coins;
    }
    this.setProfile = function(profile) {
        this.profile = profile;
    }
    this.setRobotStatistic = function(robotStatistic) {
        this.robotStatistic = robotStatistic;
    }
    this.setUserStatistic = function(userStatistic) {
        this.userStatistic = userStatistic;
    }
}


