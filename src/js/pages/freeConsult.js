define((require) => {
    let angular = require('angular');
    let angularRoute = require('angularRoute');
    let FormHandler = require('common/formHandler');
    let template = require('text!html/pages/freeConsult.html');
    let apiKeyJSON = require('text!data/api_key.json');
    let apiData = JSON.parse(apiKeyJSON);

    class FreeConsult extends FormHandler {
        constructor($window, $http, $location, validateForm, showMessage) {
            super({
                $window,
                $http,
                $location,
                validateForm,
                showMessage
            }, 'free-consult-captcha', 'form.free-consult');
        }

        submit(form = {}) {
            return super.submit(form, 'http://localhost:8081/free-consultation', [
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
                },
                {
                    name: 'availability',
                    required: true
                }
            ],
            {
                title: 'Form Submitted',
                message: "Thank you for requesting a free consultation!  I'll get back to you within the next 2-3 business days to schedule your appointment.  Please fill out a health history form before your consultation so we can talk about it.  Thanks again!",
                action1: {
                    text: "Men's Health History",
                    action: () => {
                        this.$location.path('/health-history');
                    }
                }
            });
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
                },
                clickArea: ($event) => {
                    $timeout(() => {
                        freeConsult.clickArea($event);
                    });
                }
            });
            
            $timeout(() => {
                freeConsult.showCaptcha();
            }, 0, false);
        });
});