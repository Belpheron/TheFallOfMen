<!DOCTYPE html>
<?php
//includes
require_once "php/model/User.php";

//session control
session_start();

if (!isset($_SESSION["user"])) {
    header("Location:index.php?error=2");
}
?>
<html ng-app="fallOfMenApp">
    <head>
        <title>The fall of men - Fight</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!--FRAMEWORKS-->
        <script src="js/frameWorks/jQuery/jquery-2.2.3.min.js" type="text/javascript"></script>
        <script src="js/frameWorks/angular/angular.min.js" type="text/javascript"></script>
        <script src="js/frameWorks/jquery-ui-1.12.0-rc.2/jquery-ui.min.js" type="text/javascript"></script>

        <!--STYLE-->
        <link href="js/frameWorks/jquery-ui-1.12.0-rc.2/jquery-ui.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/fightStyle.css" rel="stylesheet" type="text/css"/>

        <!--CONTROL-->
        <script src="js/control/FightWindow.js" type="text/javascript"></script>
        <script src="js/control/generalFunctions.js" type="text/javascript"></script>        
        <!--MODEL-->
        <script src="js/model/FightDetails.js" type="text/javascript"></script>
        <script src="js/model/Game.js" type="text/javascript"></script>
        <script src="js/model/Player.js" type="text/javascript"></script>
        <script src="js/model/LoadWindow.js" type="text/javascript"></script>
        <script src="js/model/FightEvents.js" type="text/javascript"></script>
        <script src="js/model/MessageTool.js" type="text/javascript"></script>
        <script src="js/model/FightResults.js" type="text/javascript"></script>
    </head>
    <body ng-controller="controller as ctrl" id="body" ng-init="game.load(<?php echo "'" . $_GET["p1"] . "','" . $_GET["p2"] . "','" . $_SESSION["user"]->getUserName() . "'"; ?>)">        
        <!--message window-->
        <div class="centerMsg txtMsg" id="centerMsg"></div>
        <div class="p1DmgMsg txtMsg" id="p1DmgMsg"></div>
        <div class="p1HealMsg txtMsg" id="p1HealMsg"></div>
        <div class="p2HealMsg txtMsg" id="p2HealMsg"></div>
        <div class="p2DmgMsg txtMsg" id="p2DmgMsg"></div>
        <!--block section-->
        <div class="blockSection" ng-show="game.showBlockScreen"></div>
        <!--load window-->
        <section class="loadWindow" ng-show="loadWindow.showLoadWindow">
            <div class="loadBarContainer">
                <h3>Loading...</h3>
                <div class="loadBar" style="width: {{loadWindow.loadPercentage}}"></div>
                <span class="pull-right">{{loadWindow.loadPercentage}} %</span>
            </div>
        </section>
        <!-- versus title-->
        <div class="versusTitle">Vs</div>
        <!--player 1 container-->        
        <section class="p1MainContainer mainContainer">
            <!--attack bonus-->
            <div class="attackBonusBox" ng-show="player1.attackBonusText != ''">
                {{player1.attackBonusText}}
            </div>
            <img src="" class="mainContainer" id="p1ImagesContainer"/>
            <img class="tooltip" id="p1Tooltip" src=""/>
            <div class="healthBarContainer">                
                <div class="healthBar" id="p1healthBar"></div>
            </div>
            <div class="userName">{{fightDetails.p1_id}}</div> 
            <!--buttons-->
            <button class="rockButton gameButton" ng-click="game.setAction('rock', '1')" ng-show="userName == player1.playerName"></button>
            <button class="paperButton gameButton" ng-click="game.setAction('paper', '1')" ng-show="userName == player1.playerName"></button>
            <button class="scissorsButton gameButton" ng-click="game.setAction('scissors', '1')" ng-show="userName == player1.playerName"></button>                 
            <div ng-show="player1.ultimate < 5000">
                <div ng-show="userName == player1.playerName">
                    <button ng-show="player1.ultimate >= 100" class="ultimateButton gameButton" ng-click="game.setAction('ultimate', '1')">Ultimate</button>
                </div> 
            </div>            
            <div ng-show="player1.ultimate < 5000">                    
                <div class="ultimateContainer" ng-show="player1.ultimate < 100">
                    <div class="ultimateBar" style="width: {{player1.ultimate}}%">
                    </div>
                </div>
            </div>>
        </section> 
        <!--player 2 container-->        
        <section class="p2MainContainer mainContainer">
            <!--attack bonus-->
            <div class="attackBonusBox unReverse" ng-show="player2.attackBonusText != ''">
                {{player2.attackBonusText}}
            </div>
            <img src="" class="mainContainer" id="p2ImagesContainer"/>
            <img class="tooltip" id="p2Tooltip" src=""/>
            <div class="healthBarContainer">
                <div class="healthBar unReverse" id="p2healthBar"></div>
            </div> 
            <!--buttons-->
            <button class="rockButton gameButton" ng-click="game.setAction('rock', '2')" ng-show="userName == player2.playerName"></button>
            <button class="paperButton gameButton" ng-click="game.setAction('paper', '2')" ng-show="userName == player2.playerName"></button>
            <button class="scissorsButton gameButton" ng-click="game.setAction('scissors', '2')" ng-show="userName == player2.playerName"></button>
            <div ng-show="player2.ultimate < 5000">
                <div ng-show="userName == player2.playerName">
                    <button ng-show="player2.ultimate >= 100" class="ultimateButton gameButton unReverse" ng-click="game.setAction('ultimate', '2')">Ultimate</button>
                </div> 
            </div>
            <div ng-show="player2.ultimate < 5000">                    
                <div class="ultimateContainer" ng-show="player2.ultimate < 100">
                    <div class="ultimateBar" style="width: {{player2.ultimate}}%">
                    </div>
                </div>
            </div>
        </section>        
        <div class="enemyName">{{fightDetails.p2_id}}</div>   
        <!--player 1 results window-->
        <section class="resultsWindow" ng-show="game.showPlayer1ResultWindow">
            <h3>Fight result</h3>
            <hr/>
            <div class="row">
                <table class="table table-striped">
                    <tr>
                        <td>Total damage</td>
                        <td>{{player1.totalDamage}}</td>
                    </tr>
                    <tr>
                        <td>Experience by combat</td>
                        <td>{{player1.combatXp}}</td>
                    </tr>
                    <tr>
                        <td>Experience by victory</td>
                        <td>{{player1.winXp}}</td>
                    </tr>
                    <tr>
                        <td>Human coins by combat</td>
                        <td>{{player1.combatCoins}}
                    </tr>
                    <tr>
                        <td>Human coins by victory</td>
                        <td>{{player1.winCoins}}</td>
                    </tr>
                </table>
                <hr/>
                <button class="backToMainMenuButton" ng-click="game.endFight()">Return to main menu</button>
            </div>
        </section>
        <!--player 2 results window-->
        <section class="resultsWindow" ng-show="game.showPlayer2ResultWindow">
            <h3>Fight result</h3>
            <hr/>
            <div class="row">
                <table class="table table-striped">
                    <tr>
                        <td>Total damage</td>
                        <td>{{player2.totalDamage}}</td>
                    </tr>
                    <tr>
                        <td>Experience by combat</td>
                        <td>{{player2.combatXp}}</td>
                    </tr>
                    <tr>
                        <td>Experience by victory</td>
                        <td>{{player2.winXp}}</td>
                    </tr>
                    <tr>
                        <td>Human coins by combat</td>
                        <td>{{player2.combatCoins}}
                    </tr>
                    <tr>
                        <td>Human coins by victory</td>
                        <td>{{player2.winCoins}}</td>
                    </tr>
                </table>
                <hr/>
                <button class="btn btn-primary form-control" ng-click="game.endFight()">Return to main menu</button>
            </div>
        </section>
        <!--round timer-->
        <div class="roundNumberTitle" ng-show="fightDetails.id_winner == 0">Round {{roundNumber}}</div>
        <div class="roundTimerTitle" id="roundWatchTitle" ng-show="fightDetails.id_winner == 0">Time left</div>
        <div class="roundTimer" id="roundWatch" ng-show="fightDetails.id_winner == 0">{{roundTimer}}</div>
    </body>
</html>

