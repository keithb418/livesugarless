define((require) => {
    let angular = require('angular');
    let angularRoute = require('angularRoute');
    let template = require('text!html/pages/freeConsult.html');
    
    angular.module('consult', ['ngRoute'])
        .config(['$routeProvider', ($routeProvider) => {
            $routeProvider.when('/free-consultation', {
                template: template,
                controller: 'consultCtrl'
            });
        }])
        .controller('collapseCtrl', ($scope) => {
            $scope.isCollapsed = true;
        })
        .controller('consultCtrl', ($scope, $http, $location, validateForm, showMessage) => {
            $scope.consult = {};
            
            let formConfig = [
                {
                    name: 'firstName',
                    type: 'textStrict',
                    required: true
                },
                {
                    name: 'middleName',
                    type: 'textStrict'
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
            ];
            
            let validateAvailability = (errors) => {
                let availability = $scope.consult.availability || {};
                
                if (!(availability.wedAM || availability.wedPM ||
                    availability.thursAM || availability.thursPM ||
                    availability.friAM || availability.friPM)) {
                    errors = errors || {};
                    
                    errors.availability = "Please indicate your availability";
                }
                
                return errors;
            };
            
            let disableAllInputs = () => {
                angular.element('input, button, textarea').attr('disabled', 'disabled');
            };
            
            $scope.submit = () => {
                let errors = validateForm($scope.consult, formConfig);
                
                errors = validateAvailability(errors);
                
                if (errors) {
                    $scope.errors = errors;
                } else {
                    $http.post('http://localhost:8081/free-consultation', $scope.consult, {
                        'headers': {
                            'Content-Type': 'application/json'
                        }
                    }).then(() => {
                        $scope.submitted = true;
                        disableAllInputs();
                        
                        showMessage({
                            title: 'Form Submitted',
                            message: "Thank you for requesting a free consultation!  I'll get back to you within the next 2-3 business days to schedule your appointment.  Please fill out a health history form before your consultation and have it ready so we can talk about it.  Thanks again!",
                            action1: {
                                text: "Men's Health History",
                                action: () => {
                                    $location.path('/health-history-men');
                                }
                            },
                            action2: {
                                text: "Women's Health History",
                                action: () => {
                                    $location.path('/health-history-women');
                                }
                            },
                            icon: 'fa-check'
                        });
                    }, () => {
                        showMessage({
                            title: 'Error Submitting Form',
                            message: "There was an error submitting your form.  Please try again later or contact me directly if it's still an issue: teribrown1015@gmail.com",
                            icon: 'fa-warning'
                        });
                    });
                }
            };
        });
});