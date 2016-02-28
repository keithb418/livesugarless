define((require) => {
    let moment = require('moment');
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
                $scope.posts = posts;
            });
            
            $scope.formatDate = (date) => {
                return moment(date).format('MM/DD/YYYY hh:mm a');
            };
        })
        .controller('collapseCtrl', ($scope) => {
            $scope.isCollapsed = true;
        })
        .filter('showAsHtml', ($sce) => {
            return (val) => {
                return $sce.trustAsHtml(val);
            }
        });
});