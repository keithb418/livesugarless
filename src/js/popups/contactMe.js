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
        .controller('contactMeBtnCtrl', ($scope, $uibModal, $uibModalStack) => {
            $scope.openContact = () => {
                $uibModalStack.dismissAll();
                
                $uibModal.open({
                    animation: false,
                    template: template,
                    controller: 'contactMeCtrl'
                });
            };
        })
        .controller('contactMeCtrl', ($scope, $uibModalInstance, $http, validateForm, showMessage) => {
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
            
            let disableAllInputs = () => {
                angular.element('.modal').find('input, button, textarea').attr('disabled', 'disabled');
            };
            
            $scope.send = () => {
                let errors = validateForm($scope.contact, formConfig);
                
                if (errors) {
                    $scope.errors = errors;
                } else {
                    disableAllInputs();
                    
                    $http.post('http://localhost:8081/contact-me', $scope.contact, {
                        'headers': {
                            'Content-Type': 'application/json'
                        }
                    }).then(() => {
                        showMessage({
                            title: 'Message Sent',
                            message: "Thank you for contacting me!  I'll get back to you within the next 2-3 business days.",
                            icon: 'fa-check'
                        });
                    }, () => {
                        showMessage({
                            title: 'Error Sending Message',
                            message: "There was an error sending your message.  Please try again later or contact me directly if it's still an issue: teribrown1015@gmail.com",
                            icon: 'fa-warning'
                        });
                    });
                }
            };
        });
});