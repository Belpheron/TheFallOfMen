this.FightEvents = function() {
    //properties
    this.id;
    this.p1IsReady = false;
    this.p2IsReady = false;
    this.p1Health = 0;
    this.p2Health = 0;
    this.currentPlayer;
    this.winner = 0;
    this.player1Action = "null";
    this.player2Action = "null";
    this.roundIsEnded = false;
    this.roundNumber = 10;

    //methods
    this.newRound = function() {
        this.winner = 0;
        this.player1Action = "null";
        this.player2Action = "null";
        this.roundIsEnded = false;
        this.roundNumber--;
    }
}


