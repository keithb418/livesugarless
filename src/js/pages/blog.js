define((require) => {
    let angular = require('angular');
    let angularRoute = require('angularRoute');
    let blogService = require('services/blogServices');
    let template = require('text!html/pages/blog.html');
    
    angular.module('blog', ['ngRoute', 'blogServices'])
        .config(['$routeProvider', ($routeProvider) => {
            $routeProvider.when('/blog', {
                template: template,
                controller: 'blogCtrl'
            });
        }])
        .controller('blogCtrl', ($scope, blogResources) => {
            $scope.posts = [];
            
            blogResources.getPosts().then((posts) => {
                console.log(posts);
                $scope.posts = posts;
            });
        });
});