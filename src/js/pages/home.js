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
        });
});