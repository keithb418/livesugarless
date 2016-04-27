requirejs.config({
    paths: {
        jquery: '../lib/jquery/dist/jquery.min',
        moment: '../lib/moment/moment',
        angular: '../lib/angular/angular',
        angularAnimate: '../lib/angular-animate/angular-animate',
        angularRoute: '../lib/angular-route/angular-route.min',
        angularBootstrap: '../lib/angular-bootstrap/ui-bootstrap.min',
        angularBootstrapTemplates: '../lib/angular-bootstrap/ui-bootstrap-tpls.min',
        angularResource: '../lib/angular-resource/angular-resource.min',
        validator: '../lib/validator-js/validator.min',
        scrollMe: '../lib/scrollme/jquery.scrollme.min',
        text: '../lib/requirejs-text/text',
        html: '../html',
        data: '../data',
        services: 'services'
    },
    shim: {
        jquery: {
            exports: '$'
        },
        angular: {
            exports: 'angular'
        },
        angularRoute: {
            deps: ['angular']
        },
        angularBootstrapTemplates: {
            deps: ['angular']
        },
        angularBootstrap: {
            deps: ['angular', 'angularBootstrapTemplates']
        },
        angularAnimate: {
            deps: ['angular']
        },
        angularResource: {
            deps: ['angular']
        },
        scrollMe: {
            deps: ['jquery']
        }
    }
});

requirejs(['app'], () => {
    angular.element(document.getElementsByTagName('html')[0]);
    angular.element().ready(() => {
        angular.bootstrap(document, ['takeChargeHealth']);
    });
});