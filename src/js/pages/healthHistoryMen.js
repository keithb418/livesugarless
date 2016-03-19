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
        .controller('healthHistoryMenCtrl', [() => {
            
        }]);
});