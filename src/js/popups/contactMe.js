define((require) => {
    let angular = require('angular');
    let nodemailer = require('nodemailer');
    let btnTemplate = require('text!html/popups/contactMeBtn.html');
    let template = require('text!html/popups/contactMe.html');
    
    angular.module('contact', [])
        .directive('contactMe', () => {
            return {
                restrict: 'E',
                template: btnTemplate,
                controller: 'contactMeBtnCtrl'
            };
        })
        .controller('contactMeBtnCtrl', ($scope, $uibModal) => {
            $scope.openContact = () => {
                $uibModal.open({
                    template: template,
                    controller: 'contactMeCtrl'
                });
            };
        })
        .controller('contactMeCtrl', ($scope, $uibModalInstance) => {
            $scope.closeContact = $uibModalInstance.close;
            
            $scope.save = () => {
                $scope.closeContact();
            };
        });
});