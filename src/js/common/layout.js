define((require) => {
    let angular = require('angular');
    let template = require('text!html/common/layout.html');

    angular.module('layout', [])
        .directive('layout', () => {
            return {
                restrict: 'A',
                template
            }
        });
});