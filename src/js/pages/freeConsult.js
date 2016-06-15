define((require) => {
    let angular = require('angular');
    let angularRoute = require('angularRoute');
    let template = require('text!html/pages/freeConsult.html');
    let apiKeyJSON = require('text!data/api_key.json');
    let apiData = JSON.parse(apiKeyJSON);

    class FreeConsult {
        constructor($window, $http, $location, validateForm, showMessage) {
            angular.extend(this, {
                $window,
                $http,
                $location,
                validateForm,
                showMessage,
                formConfig: [
                    {
                        name: 'firstName',
                        type: 'textStrict',
                        required: true
                    },
                    {
                        name: 'lastName',
                        type: 'textStrict',
                        required: true
                    },
                    {
                        name: 'nickname',
                        type: 'textStrict'
                    },
                    {
                        name: 'email',
                        type: 'email',
                        required: true
                    },
                    {
                        name: 'phone',
                        type: 'phone',
                        required: true
                    }
                ],
                captchaId: 'free-consult-captcha',
                showCaptcha: this.showCaptcha.bind(this),
                submit: this.submit.bind(this)
            });
        }

        validateAvailability(availability = {}, errors) {
            errors;

            if (!(availability.wedAM || availability.wedPM ||
                availability.thursAM || availability.thursPM ||
                availability.friAM || availability.friPM)) {
                errors = errors || {};
                
                angular.extend(errors, {
                    availability: "Please indicate your availability"
                });
            }

            return errors;
        }

        disableAllInputs() {
            angular.element('input, button, textarea').attr('disabled', 'disabled');
        }

        showCaptcha() {
            let width = angular.element(this.$window).outerWidth();
            let size = width < 370 ? 'compact' : 'normal';

            this.captcha = grecaptcha.render(this.captchaId, {
                'sitekey': apiData.captchaKey,
                size
            });
        }

        submit(consult = {}) {
            angular.extend(consult, { captcha: this.captcha });

            let errors = this.validateForm(consult, this.formConfig);
            
            errors = this.validateAvailability(consult.availability, errors);

            if (errors) {
                return errors;
            }
            
            this.$http.post('http://localhost:8081/free-consultation', consult, {
                'headers': {
                    'Content-Type': 'application/json'
                }
            }).then(() => {
                this.disableAllInputs();

                this.showMessage({
                    title: 'Form Submitted',
                    message: "Thank you for requesting a free consultation!  I'll get back to you within the next 2-3 business days to schedule your appointment.  Please fill out a health history form before your consultation and have it ready so we can talk about it.  Thanks again!",
                    action1: {
                        text: "Men's Health History",
                        action: () => {
                            this.$location.path('/health-history-men');
                        }
                    },
                    action2: {
                        text: "Women's Health History",
                        action: () => {
                            this.$location.path('/health-history-women');
                        }
                    },
                    icon: 'fa-check'
                });
            }, () => {
                this.showMessage({
                    title: 'Error Submitting Form',
                    message: "There was an error submitting your form.  Please try again later or contact me directly if it's still an issue: teribrown1015@gmail.com",
                    icon: 'fa-warning'
                });
            });

            return;
        };
    }

    angular.module('consult', ['ngRoute'])
        .config(['$routeProvider', ($routeProvider) => {
            $routeProvider.when('/free-consultation', {
                template: template,
                controller: 'consultCtrl'
            });
        }])
        .service('freeConsult', FreeConsult)
        .controller('collapseCtrl', ($scope) => {
            $scope.isCollapsed = true;
        })
        .controller('consultCtrl', ($scope, $timeout, freeConsult) => {
            angular.extend($scope, {
                captchaId: freeConsult.captchaId,
                consult: {},
                submit: () => {
                    $scope.errors = freeConsult.submit($scope.consult);
                }
            });
            
            $timeout(() => {
                freeConsult.showCaptcha();
            }, 0, false);
        });
});