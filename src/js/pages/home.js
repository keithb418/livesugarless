define((require) => {
    require('jquery');
    let angular = require('angular');
    let angularRoute = require('angularRoute');
    let blogService = require('services/blogServices');
    let template = require('text!html/pages/home.html');
    
    angular.module('home', ['ngRoute', 'blogServices'])
        .config(['$routeProvider', ($routeProvider) => {
            $routeProvider.when('/', {
                template: template,
                controller: 'homeCtrl'
            });
        }])
        .controller('homeCtrl', ($scope, blogResources) => {
            $scope.blogTitle = '';
            $scope.blogContent = '';
            $scope.blogLink = '#/';
            
            let truncate = (content) => {
                let shortContent = content.trim().substr(0, 300);
                
                shortContent = shortContent.substr(0, shortContent.lastIndexOf(' '));
                
                return `${shortContent}...`;
            };
            
            blogResources.getPosts().then((posts) => {
                let post = posts[0] || {};
                let rawContent = post.content || '';
                let $content = $(rawContent);
                
                $scope.blogTitle = post.title || '';
                $scope.blogContent = truncate($content.text());
                $scope.blogImg = $content.find('img').attr('src');
                $scope.blogLink = post.url || '#/';
                
                $scope.$apply();
            });
        })
        .directive('resizeImg', ($window) => {
            return ($scope, $el, attr) => {
                let w = angular.element($window);
                let $footer = angular.element('footer');
                let footerHeight = $footer.outerHeight();
                
                $scope.$watch(() => {
                    return {
                        'height': w.outerHeight(),
                        'width': w.outerWidth()
                    };
                }, (newValue, oldValue) => {
                    $scope.updateImg = () => {
                        if (newValue.width > (newValue.height + footerHeight + 45)) {
                            return {
                                height: 'auto',
                                width: '100%'
                            }
                        }
                        
                        return {
                            height: '100%',
                            width: 'auto'
                        };
                    }
                }, true);
                
                w.bind('resize', () => {
                    $scope.$apply();
                });
            };    
        })
        .filter('showAsHtml', ($sce) => {
            return (val) => {
                return $sce.trustAsHtml(val);
            }
        });
});