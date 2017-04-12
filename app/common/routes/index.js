'use strict'

var config =  {
    defaultRoutePath: '/',
    routes: {
        '/': {
            templateUrl: 'views/home.html',
            title: 'Home',
            dependencies: [
                
            ]
        },
        '/about': {
            templateUrl: 'views/about.html',
            title : 'About',
            dependencies: [
                
            ]
        },
        '/contact': {
            templateUrl: 'views/contact.html',
            title : 'Contact',
            dependencies: [
                
            ]
        },
        '/my-tasks': {
            templateUrl: 'views/home/tasks/my-tasks.html',
            title : 'Contact',
            dependencies: [
                './dist/home.bundle.js'
            ]
        },
        '/all-tasks': {
            templateUrl: 'views/home/tasks/all-tasks.html',
            title : 'Contact',
            dependencies: [
                './dist/home.bundle.js'
            ]
        },
        '/report-dashboard': {
            templateUrl: 'views/home/reports/reporting.html',
            title : 'Contact',
            dependencies: [
                './dist/home.bundle.js'
            ]
        },
        '/preferences': {
            templateUrl: 'views/home/preferences/preferences.html',
            title : 'Contact',
            dependencies: [
                './dist/home.bundle.js'
            ]
        }
    }
}

function dependencyResolverFor(dependencies) {
    var definition = {
        resolver: ['$q', '$rootScope', '$ocLazyLoad', function ($q, $rootScope, $ocLazyLoad) {
            var deferred = $q.defer();
            if(dependencies.length == 0) return $q.resolve();
            return $ocLazyLoad.load([{
                name: 'myApp',
                files: dependencies
            }]);
        }]
    }
    return definition;
}

angular.module('app').config(function($routeProvider) {
    angular.forEach(config.routes, function(route, path){
        $routeProvider.when(path, {
            templateUrl:route.templateUrl,
            title : route.title,
            reloadOnSearch: false,
            resolve:dependencyResolverFor(route.dependencies)
        });
    });
});