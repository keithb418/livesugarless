define((require) => {
    let angular = require('angular');
    let angularRoute = require('angularRoute');
    let template = require('text!html/pages/healthHistoryWomen.html');
    
    angular.module('healthHistoryWomen', ['ngRoute'])
        .config(['$routeProvider', ($routeProvider) => {
            $routeProvider.when('/health-history-women', {
                template: template,
                controller: 'healthHistoryWomenCtrl'
            });
        }])
        .controller('healthHistoryWomenCtrl', [() => {
            
        }]);
});