define((require) => {
    require('jquery');
    let angular = require('angular');
    let template = require('text!html/common/header.html');
    
    angular.module('header', [])
        .directive('headerView', () => {
            return {
                restrict: 'A',
                template: template,
                controller: 'headerCtrl'
            }
        })
        .controller('collapseCtrl', ($scope) => {
            $scope.isCollapsed = true;
        })
        .controller('headerCtrl', ($scope) => {
            $scope.menuOpen = false;
            
            let resizeMenu = () => {
                let $menu = $('#menu');
                
                $(window).resize(() => {
                    let height = $(window).outerHeight() - 60;
                    
                    $menu.outerHeight(`${height}px`);
                });
                
                $(window).resize();
            };
            
            resizeMenu();
        });
});