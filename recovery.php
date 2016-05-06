<html ng-app="fallOfMenApp">
    <head>
        <title>Recovery</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">

        <!--FRAMEWORKS-->
        <script src="js/frameWorks/jQuery/jquery-2.2.3.min.js" type="text/javascript"></script>
        <script src="js/frameWorks/angular/angular.min.js" type="text/javascript"></script>
        <script src="js/frameWorks/bootstrap/js/bootstrap.min.js" type="text/javascript"></script>

        <!--STYLE-->
        <link href="css/LoginStyle.css" rel="stylesheet" type="text/css"/>
        <link href="js/frameWorks/bootstrap/css/bootstrap.css" rel="stylesheet" type="text/css"/>

        <!--CONTROL-->
        <script src="js/control/Recovery.js" type="text/javascript"></script>
    
    </head>
    <body ng-controller="recovery">
        <form name="resetPassForm" class="registerBox row" action="" method="post" novalidate ng-submit="recovery.save()">
            <div class="col-md-6 registerLeftBox">
                <h3>Reset credentials</h3>
                <label>Write new password</label>
                <input type="text" id="passwordBox" name="passwordBox" class="form-control" ng-model="password" ng-pattern="/^[a-zA-Z0-9_]{4,}$/" required/>
                <label>Repeat new password</label>
                <input type="text" id="rPasswordBox" name="repeatPassBox" class="form-control" ng-model="rPassword" ng-change="recovery.checkPassword()" ng-pattern="/^[a-zA-Z0-9_]{4,}$/" required/>
                <label class="text-danger" ng-if="show==1">The field not match with 'password'</label>
                <hr/>
                <button type="submit" id="ResetButton" ng-disabled="resetPassForm.$invalid" name="ResetButton" class="btn btn-success">Reset & Save</button>
            </div>    
        </form>
    </body>
</html>
