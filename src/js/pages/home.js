define((require) => {
    let angular = require('angular');
    let angularRoute = require('angularRoute');
    let template = require('text!html/pages/home.html');
    
    angular.module('home', ['ngRoute'])
        .config(['$routeProvider', ($routeProvider) => {
            $routeProvider.when('/', {
                template: template,
                controller: 'homeCtrl'
            });
        }])
        .controller('homeCtrl', [() => {
            
        }]);
});