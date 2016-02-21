define((require) => {
    let angular = require('angular');
    let angularRoute = require('angularRoute');
    let template = require('text!html/pages/blog.html');
    
    angular.module('blog', ['ngRoute'])
        .config(['$routeProvider', ($routeProvider) => {
            $routeProvider.when('/blog', {
                template: template,
                controller: 'blogCtrl'
            });
        }])
        .controller('blogCtrl', [() => {
            
        }]);
});