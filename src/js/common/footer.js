define((require) => {
    let angular = require('angular');
    let template = require('text!html/common/footer.html');
    
    angular.module('footer', [])
        .directive('footerView', () => {
            return {
                restrict: 'A',
                template: template,
                controller: 'footerCtrl'
            }
        })
        .controller('footerCtrl', ($scope, $uibModal) => {
        })
        .controller('contactMe', () => {
        });
});