define([
    'jquery',
    'angular',
    'angularRoute',
    'angularBootstrap'
],
($, angular) => {
    let app = angular.module('takeChargeHealth', ['ngRoute', 'ui.bootstrap']);
    
    app.controller('controller', ['$scope', ($scope) => {
        $scope.message = 'Welcome to TakeChargeHealth.com!!';
    }]);
    
    return app;
});