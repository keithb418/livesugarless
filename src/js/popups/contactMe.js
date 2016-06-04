define((require) => {
    let angular = require('angular');
    let btnTemplate = require('text!html/popups/contactMeBtn.html');
    let template = require('text!html/popups/contactMe.html');
    let apiKeyJSON = require('text!data/api_key.json');
    let apiData = JSON.parse(apiKeyJSON);

    class ContactMe {
        constructor($window, $http, $uibModal, $uibModalStack, validateForm, showMessage) {
            angular.extend(this, {
                $window,
                $http,
                $uibModal,
                $uibModalStack,
                validateForm,
                showMessage,
                formConfig: [
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
                captchaId: 'free-consult-captcha',
                openContact: this.openContact.bind(this),
                send: this.send.bind(this)
            });
        }

        disableAllInputs() {
            angular.element('.modal').find('input, button, textarea').attr('disabled', 'disabled');
        }

        openContact() {
            this.$uibModalStack.dismissAll();

            this.$uibModal.open({
                animation: false,
                template: template,
                controller: 'contactMeCtrl'
            }).rendered.then(() => {
                let width = angular.element(this.$window).outerWidth();
                let size = width < 370 ? 'compact' : 'normal';
                
                this.captcha = grecaptcha.render(this.captchaId, {
                    'sitekey': apiData.captchaKey,
                    size
                });
            });
        }

        send(contactForm) {
            angular.extend(contactForm, { captcha: this.captcha });

            let errors = this.validateForm(contactForm, this.formConfig);

            if (errors) {
                return errors;
            }

            this.disableAllInputs();

            this.$http.post('http://localhost:8081/contact-me', contactForm, {
                'headers': {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                this.showMessage({
                    title: 'Message Sent',
                    message: "Thank you for contacting me!  I'll get back to you within the next 2-3 business days.",
                    icon: 'fa-check'
                });
            }, () => {
                this.showMessage({
                    title: 'Error Sending Message',
                    message: "There was an error sending your message.  Please try again later or contact me directly if it's still an issue: teribrown1015@gmail.com",
                    icon: 'fa-warning'
                });
            });

            return;
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
                send: () => {
                    $scope.errors = contactMeSrv.send($scope.contact);
                }
            });
        });
});