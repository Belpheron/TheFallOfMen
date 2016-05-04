//angular code
(function() {
    var fallOfMenApp = angular.module("fallOfMenApp", []);
    fallOfMenApp.controller("controller", function($scope) {
        $scope.show = 0;
    });

    //directives    
    fallOfMenApp.directive("registerTemplate", function () {
        return {
            restrict: 'E',
            templateUrl: "templates/register-template.html",
            controller: function () {

            },
            controllerAs: 'registerTemplate'
        };
    });
    fallOfMenApp.directive('calendar', function() {
        return {
            require: 'ngModel',
            link: function(scope, el, attr, ngModel) {
                $(el).datepicker({
                    dateFormat: 'yy-mm-dd',
                    onSelect: function(dateText) {
                        scope.$apply(function() {
                            ngModel.$setViewValue(dateText);
                        });
                    }
                });
            }
        };
    });
})();


