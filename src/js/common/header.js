define((require) => {
    let angular = require('angular');
    let template = require('text!html/common/header.html');
    
    angular.module('header', [])
        .directive('headerView', () => {
            return {
                restrict: 'A',
                template: template
            }
        });
});