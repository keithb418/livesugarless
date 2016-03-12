define([
    'jquery',
    'angular',
    'angularAnimate',
    'angularRoute',
    'angularBootstrap',
    'angularBootstrapTemplates',
    'angularResource',
    'common/header',
    'common/footer',
    'popups/contactMe',
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
            'contact'
        ])
        .config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
            $routeProvider.otherwise({redirectTo: '/'});
        }]);
});