define((require) => {
    let angular = require('angular');
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
        .controller('contactMeCtrl', ($scope, $uibModalInstance, $http) => {
            $scope.contact = {};
            
            $scope.closeContact = $uibModalInstance.close;
            
            $scope.send = () => {
                $scope.closeContact();
                
                $http.post('http://localhost:8081/contact-me', $scope.contact, {
                    'headers': {
                        'Content-Type': 'application/json'
                    }
                });
            };
        });
});