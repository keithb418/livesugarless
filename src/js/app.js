define([
    'jquery',
    'angular',
    'angularAnimate',
    'angularRoute',
    'angularBootstrap',
    'angularBootstrapTemplates',
    'angularResource',
    'services/validationServices',
    'common/header',
    'common/footer',
    'popups/contactMe',
    'popups/message',
    'pages/about',
    'pages/home',
],
($, angular) => {
    angular.module('takeChargeHealth', 
        [
            'ngRoute',
            'ngAnimate',
            'ngResource',
            'ui.bootstrap',
            'ui.bootstrap.tpls',
            'header',
            'footer',
            'home',
            'about',
            'contact',
            'message',
            'validation'
        ])
        .config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
            $routeProvider.otherwise({redirectTo: '/'});
        }]);
});