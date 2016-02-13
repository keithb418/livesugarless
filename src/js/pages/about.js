define((require) => {
    let angular = require('angular');
    let angularRoute = require('angularRoute');
    let template = require('text!html/pages/about.html');
    
    angular.module('about', ['ngRoute'])
        .config(['$routeProvider', ($routeProvider) => {
            $routeProvider.when('/about', {
                template: template,
                controller: 'aboutCtrl'
            });
        }])
        .controller('aboutCtrl', [() => {
            
        }]);
});