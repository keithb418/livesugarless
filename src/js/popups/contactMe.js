define((require) => {
    let angular = require('angular');
    let btnTemplate = require('text!html/popups/contactMeBtn.html');
    let template = require('text!html/popups/contactMe.html');
    
    angular.module('contact', ['validation'])
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
        .controller('contactMeCtrl', ($scope, $uibModalInstance, $http, validateForm) => {
            $scope.contact = {};
            
            $scope.closeContact = $uibModalInstance.close;
            
            let formConfig = [
                {
                    name: 'name',
                    type: 'textSpace',
                    required: true
                },
                {
                    name: 'email',
                    type: 'email',
                    required: true
                },
                {
                    name: 'subject',
                    type: 'text',
                    required: true
                },
                {
                    name: 'message',
                    type: 'text',
                    required: true
                }
            ];
            
            $scope.send = () => {
                let errors = validateForm($scope.contact, formConfig);
                
                if (errors) {
                    console.log(errors);
                    $scope.errors = errors;
                } else {
                    $scope.closeContact();
                    
                    $http.post('http://localhost:8081/contact-me', $scope.contact, {
                        'headers': {
                            'Content-Type': 'application/json'
                        }
                    });
                }
            };
        });
});