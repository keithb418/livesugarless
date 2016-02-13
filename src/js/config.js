requirejs.config({
    paths: {
        jquery: '../lib/jquery/dist/jquery.min',
        angular: '../lib/angular/angular',
        angularRoute: '../lib/angular-route/angular-route.min',
        angularBootstrap: '../lib/angular-bootstrap/ui-bootstrap.min',
        text: '../lib/requirejs-text/text',
        html: '../html'
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        angularRoute: {
            deps: ['angular']
        },
        jquery: {
            exports: '$'
        },
        angularBootstrap: {
            deps: ['angular']
        }
    }
});

requirejs(['app'], () => {
    angular.element(document.getElementsByTagName('html')[0]);
    angular.element().ready(() => {
        angular.bootstrap(document, ['takeChargeHealth']);
    });
});