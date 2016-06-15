define((require) => {
    let angular = require('angular');
    let angularRoute = require('angularRoute');
    let template = require('text!html/pages/healthHistoryMen.html');
    let apiKeyJSON = require('text!data/api_key.json');
    let apiData = JSON.parse(apiKeyJSON);

    class HealthHistoryMen {
        constructor ($window, $http, $location, validateForm, showMessage) {
            angular.extend(this, {
                $window,
                $http,
                $location,
                validateForm,
                showMessage,
                captchaId: 'health-history-men-captcha',
                restrictTo: this.restrictTo.bind(this)
            });
        }

        showCaptcha() {
            let width = angular.element(this.$window).outerWidth();
            let size = width < 370 ? 'compact' : 'normal';

            this.captcha = grecaptcha.render(this.captchaId, {
                'sitekey': apiData.captchaKey,
                size
            });
        }

        restrictTo(maxLength, value = '') {
            value = `${value}`;

            if (value.length > maxLength) {
                value = value.substr(0, maxLength);
            } else if (value[value.length - 1] === ".") {
                value = value.substr(0, value.length - 1);
            }

            return parseInt(value);
        }
    }

    angular.module('healthHistoryMen', ['ngRoute'])
        .config(['$routeProvider', ($routeProvider) => {
            $routeProvider.when('/health-history-men', {
                template: template,
                controller: 'healthHistoryMenCtrl'
            });
        }])
        .service('healthHistoryMenSrv', HealthHistoryMen)
        .controller('collapseCtrl', ($scope) => {
            $scope.isCollapsed = true;
        })
        .controller('healthHistoryMenCtrl', ($scope, $timeout, healthHistoryMenSrv) => {
            angular.extend($scope, {
                captchaId: healthHistoryMenSrv.captchaId,
                datepickerOpen: false,
                dateOptions: {
                    minDate: new Date(1900, 1, 1),
                    maxDate: new Date(),
                    showWeeks: false
                },
                health: {},
                restrictTo: (maxlength, field) => {
                    let value = $scope.health[field];

                    $scope.health[field] = healthHistoryMenSrv.restrictTo(maxlength, value);
                }
            });

            $timeout(() => {
                healthHistoryMenSrv.showCaptcha();
            }, 0, false);
        });
});