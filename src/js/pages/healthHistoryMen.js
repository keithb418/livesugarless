define((require) => {
    let angular = require('angular');
    let angularRoute = require('angularRoute');
    let template = require('text!html/pages/healthHistoryMen.html');

    angular.module('healthHistoryMen', ['ngRoute'])
        .config(['$routeProvider', ($routeProvider) => {
            $routeProvider.when('/health-history-men', {
                template: template,
                controller: 'healthHistoryMenCtrl'
            });
        }])
        .controller('collapseCtrl', ($scope) => {
            $scope.isCollapsed = true;
        })
        .controller('healthHistoryMenCtrl', ($scope) => {
            $scope.formName = "health";
            
            $scope.restrictTo = (maxlength, value, field) => {
                value = value ? `${value}` : '';
                if (value.length > maxlength) {
                    value = value.substr(0, maxlength);
                    $scope[$scope.formName][field] = parseInt(value);
                } else if (value[value.length - 1] === ".") {
                    value = value.substr(0, value.length - 1);
                    $scope[$scope.formName][field] = parseInt(value);
                }
            };
        });
});