this.UserStatistic = function(id, wins, defeats, totalInflictedDamage, 
totalRecivedDamage, totalWinCoins, totalExpendCoins) {
    //properties
    this.id = id;
    this.wins = wins;
    this.defeats = defeats;
    this.totalInflictedDamage = totalInflictedDamage;
    this.totalRecivedDamage = totalRecivedDamage;
    this.totalWinCoins = totalWinCoins;
    this.totalExpendCoins = totalExpendCoins;
    
    //accessors
    this.getId = function() {
        return this.id;
    }
    this.getWins = function() {
        return this.wins;
    }
    this.getDefeats = function() {
        return this.defeats;
    }
    this.getTotalInflictedDamage = function() {
        return this.totalInflictedDamage;
    }
    this.getTotalRecivedDamage = function() {
        return this.totalRecivedDamage;
    }
    this.getTotalWinCoins = function() {
        return this.totalWinCoins;
    }
    this.getTotalExpendCoins = function() {
        return this.totalExpendCoins;
    }
    this.setId = function(id) {
        this.id = id;
    }
    this.setWins = function(wins) {
        this.wins = wins;
    }
    this.setDefeats = function(defeats) {
        this.defeats = defeats;
    }
    this.setTotalInflictedDamage = function(totalInflictedDamage) {
        this.totalInflictedDamage = totalInflictedDamage;
    }
    this.setTotalRecivedDamage = function(totalRecivedDamage) {
        this.totalRecivedDamage = totalRecivedDamage;
    }
    this.setTotalWinCoins = function(totalWinCoins) {
        this.totalWinCoins = totalWinCoins;
    }
    this.setTotalExpendCoins = function(totalExpendCoins) {
        this.totalExpendCoins = totalExpendCoins;
    }
}


