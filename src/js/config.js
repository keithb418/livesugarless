requirejs.config({
    paths: {
        jquery: '../lib/jquery/dist/jquery.min',
        angular: '../lib/angular/angular.min',
        angularBootstrap: '../lib/angular-bootstrap/ui-bootstrap.min'
    },
    shim: {
        jquery: {
            exports: '$'
        }
    }
});

requirejs(['app']);