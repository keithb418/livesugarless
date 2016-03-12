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
            
        }])
        .directive('resizeImg', ($window) => {
            return ($scope, $el, attr) => {
                let w = angular.element($window);
                let $header = angular.element('header');
                let $footer = angular.element('footer');
                let headerHeight = $header.outerHeight();
                let footerHeight = $footer.outerHeight();
                let height = w.outerHeight() - (headerHeight + footerHeight);
                
                $scope.$watch(() => {
                    return {
                        'height': w.outerHeight(),
                        'width': w.outerWidth()
                    };
                }, (newValue, oldValue) => {
                    $scope.updateImg = () => {
                        var style = {};
                        
                        if (newValue.width >= newValue.height) {
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
        });
});