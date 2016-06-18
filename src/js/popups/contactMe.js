define((require) => {
    let angular = require('angular');
    let FormHandler = require('common/formHandler');
    let btnTemplate = require('text!html/popups/contactMeBtn.html');
    let template = require('text!html/popups/contactMe.html');
    let apiKeyJSON = require('text!data/api_key.json');
    let apiData = JSON.parse(apiKeyJSON);

    class ContactMe extends FormHandler {
        constructor($window, $http, $uibModal, $uibModalStack, validateForm, showMessage) {
            super({
                $window,
                $http,
                $uibModal,
                $uibModalStack,
                validateForm,
                showMessage
            }, 'free-consult-captcha');

            angular.extend(this, {
                openContact: this.openContact.bind(this)
            });
        }

        openContact() {
            this.$uibModalStack.dismissAll();

            this.$uibModal.open({
                animation: false,
                template: template,
                controller: 'contactMeCtrl'
            }).rendered.then(() => {
                this.showCaptcha();
            });
        }

        submit(form = {}) {
            return super.submit(form, 'http://localhost:8081/contact-me', [
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
            ],
            {
                title: 'Message Sent',
                message: "Thank you for contacting me!  I'll get back to you within the next 2-3 business days."
            });
        }
    };

    angular.module('contact', ['validation', 'ui.bootstrap'])
        .directive('contactMe', () => {
            return {
                restrict: 'E',
                template: btnTemplate,
                controller: 'contactMeBtnCtrl'
            };
        })
        .service('contactMeSrv', ContactMe)
        .controller('contactMeBtnCtrl', ($scope, contactMeSrv) => {
            $scope.openContact = contactMeSrv.openContact;
        })
        .controller('contactMeCtrl', ($scope, $uibModalInstance, contactMeSrv) => {
            angular.extend($scope, {
                captchaId: contactMeSrv.captchaId,
                contact: {},
                closeContact: $uibModalInstance.close,
                submit: () => {
                    $scope.errors = contactMeSrv.submit($scope.contact);
                }
            });
        });
});