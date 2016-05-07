define((require) => {
    require('jquery');
    
    let angular = require('angular');

    angular.module('spinnerServices', [])
        .config(($httpProvider) => {
            $httpProvider.interceptors.push('spinnerInterceptor');
            let spinnerFunction = (data) => {
                $('.ajax-spinner').removeClass('hidden');
                return data;
            };
            $httpProvider.defaults.transformRequest.push(spinnerFunction);
        })
        .factory('spinnerInterceptor', ($q, $window) => {
            return {
                'requestError': (rejection) => {
                    $('.ajax-spinner').addClass('hidden');
                    
                    return $q.reject(rejection);
                },
                'response': (response) => {
                    $('.ajax-spinner').addClass('hidden');
                    
                    return response;
                },
                'responseError': (rejection) => {
                    $('.ajax-spinner').addClass('hidden');
                    
                    return $q.reject(rejection);
                }
            };
        });
});