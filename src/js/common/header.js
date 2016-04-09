define((require) => {
    require('jquery');
    let angular = require('angular');
    let template = require('text!html/common/header.html');
    let navData = require('text!data/nav.json');
    
    angular.module('header', [])
        .directive('headerView', () => {
            return {
                restrict: 'A',
                template,
                controller: 'headerCtrl'
            }
        })
        .directive('resize', ($window) => {
            return ($scope, $el, attr) => {
                let w = angular.element($window);
                let changeWidth = 400;
                
                $scope.$watch(() => {
                    return {
                        'height': w.outerHeight(),
                        'width': window.innerWidth
                    };
                }, (newValue, oldValue) => {
                    $scope.smallScreen = newValue.width < changeWidth;
                    
                    $scope.updateHeight = (offset) => {
                        return {
                            height: `${newValue.height - offset}px`
                        };
                    };
                }, true);
                
                w.bind('resize', () => {
                    $scope.$apply();
                });
            };    
        })
        .controller('collapseCtrl', ($scope) => {
            $scope.isCollapsed = true;
        })
        .controller('headerCtrl', ($scope) => {
            try {
                navData = JSON.parse(navData);
                
                $scope.items = navData.items || [];
            } catch (e) {
                $scope.items = [];
            }
            
            $scope.closeMenu = () => {
                $scope.menuOpen = false;
            };
            
            $scope.closeMenu();
        });
});