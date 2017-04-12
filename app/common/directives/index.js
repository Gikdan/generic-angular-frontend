'use strict';

require('./Validation');

angular.module('app').directive('initialisation', function($rootScope) {
    return {
        restrict: 'A',
        link: function($scope) {
            var to;
            var listener = $scope.$watch(function() {
                clearTimeout(to);
                to = setTimeout(function () {
                    console.log('initialised');
                    listener();
                    $rootScope.$broadcast('initialised');
                }, 50);
            });
        }
    };
});

//metis menu
angular.module('app').directive('metisMenu', function () {
    return function ($scope, element, attrs) {
        jQuery(element).metisMenu();
    };
});

angular.module('app').directive('newEntityButton', function () {
    return {
        restrict: 'EA',
        priority: 1,
        //transclude: true,
        replace: 'false',
        template: '<button class="btn btn-primary" ng-disabled="!permissionService.checkScopePermission(permissionFilter + \'.save\')" ng-click="newp()"><i class="fa fa-plus"></i> Add </button>',
        link: function ($scope, $element, $attrs, ngModelCtrl) {

        }
    };
});

angular.module('app').directive('viewButton', function () {
    return {
        restrict: 'EA',
        priority: 1,
        transclude: true,
        replace: 'true',
        template: '<button type="button" class="btn btn-default" ng-click="view()" ng-disabled="!permissionService.checkScopePermission(permissionFilter + \'.view\')"><i class="fa fa-edit"></i> </button>',
        link: function ($scope, $element, $attrs, ngModelCtrl) {

        }
    };
});

angular.module('app').directive('editButton', function () {
    return {
        restrict: 'EA',
        priority: 1,
        transclude: true,
        replace: 'true',
        template: '<button type="button" class="btn btn-default" ng-click="edit()" ng-disabled="!permissionService.checkScopePermission(permissionFilter + \'.save\')"><i class="fa fa-pencil"></i> </button>',
        link: function ($scope, $element, $attrs, ngModelCtrl) {

        }
    };
});

angular.module('app').directive('deleteButton', function () {
    return {
        restrict: 'EA',
        priority: 1,
        transclude: true,
        replace: 'true',
        template: '<button type="button" class="btn btn-default" data-placement="bottom"' +
        'data-template="./views/common/popover/delete.popover.tpl.html" ' +
        'data-animation="am-flip-x" bs-popover ng-disabled="!permissionService.checkScopePermission(permissionFilter + \'.delete\')"><i class="fa fa-trash-o"></i>' +
        '</button>',
        link: function ($scope, $element, $attrs, ngModelCtrl) {

        }
    };
});

angular.module('app').directive('saveButton', function () {
    return {
        restrict: 'EA',
        priority: 1,
        transclude: true,
        replace: 'true',
        template: '<button class="btn btn-primary" ng-class="!permissionService.checkScopePermission(permissionFilter + \'.save\') ? \'btn-default\' : \'btn-primary\'" ng-disabled="((!form.checkValid(entityForm)) || !permissionService.checkScopePermission(permissionFilter + \'.save\')) ? true : false"><i class="fa fa-check"></i> Save </button>',
        link: function ($scope, $element, $attrs, ngModelCtrl) {

        }
    };
});

angular.module('app').directive('viewEditButton', function () {
    return {
        restrict: 'EA',
        priority: 1,
        transclude: true,
        replace: 'true',
        template: '<button class="btn btn-primary" ng-click="edit()" ng-disabled="!permissionService.checkScopePermission(permissionFilter + \'.save\')"><i class="fa fa-edit"></i> Edit </button>',
        link: function ($scope, $element, $attrs, ngModelCtrl) {

        }
    };
});

angular.module('app').directive('viewDoneButton', function () {
    return {
        restrict: 'EA',
        priority: 1,
        transclude: true,
        replace: 'true',
        template: '<button class="btn btn-default" ng-click="done()"><i class="fa fa-share-square-o"></i> Done </button>',
        link: function ($scope, $element, $attrs, ngModelCtrl) {

        }
    };
});

angular.module('app').directive('saveDoneButton', function () {
    return {
        restrict: 'EA',
        priority: 1,
        transclude: true,
        replace: 'true',
        template: '<a ng-click="done()" ng-hide="!entity.attributes.id" ng-href="" class="btn btn-default"><i class="fa fa-times"></i> Done </a>',
        link: function ($scope, $element, $attrs, ngModelCtrl) {

        }
    };
});

angular.module('app').directive('saveCancelButton', function () {
    return {
        restrict: 'EA',
        priority: 1,
        transclude: true,
        replace: 'true',
        template: '<a ng-click="done()" ng-hide="entity.attributes.id" ng-href="" class="btn btn-default"><i class="fa fa-times"></i> Cancel </a>',
        link: function ($scope, $element, $attrs, ngModelCtrl) {

        }
    };
});

angular.module('app').directive('number', function(){
    return {
        require: 'ngModel',
        link: function(scope, ele, attr, ctrl){
            ctrl.$parsers.push(function(viewValue){
                return parseInt(viewValue);
            });
        }
    };
});

angular.module('app').directive('backButton', function($window){
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            console.log('defining click handler...');
            $(elem).on('click', function () {
                console.log('clicked...');
                $window.history.back();
            })
        }
    };
});

//filestyle
angular.module('app').directive('fileStyle', function(){
    return {
        require: '?ngModel',
        link: function($scope, $element, $attr, ctrl){
            $element.addClass('filestyle');
            $($element).filestyle({
                buttonBefore: true,
                buttonText : '',
                size: "sm"
            });
        }
    };
});

//on-enter
angular.module('app').directive('onEnter', function () {
    return function ($scope, element, attrs) {
        element.bind('keydown keypress', function (e) {
            if (e.which === 13) {
                $scope.$apply(function () {
                    $scope.$eval(attrs.onEnter);
                });
                e.preventDefault();
            }
        });
    };
});

//custom scroll
angular.module('app').directive('customScroll', function () {
    return {
        restrict: 'A',
        priority: 1,
        link: function ($scope, $element, $attrs, ngModelCtrl) {
            var padding = $attrs.removableArea || 198;//223
            var scrollClass = "top-bar-scrolled";
            $($element).addClass( "scrollable-content" );
            $($element).css('height', ($(window).height() - padding));
            $($element).mCustomScrollbar({
                theme: 'dark',
                autoHideScrollbar: true,
                scrollInertia: 150,
                scrollButtons: {
                    enable: true
                },
                advanced: {
                    updateOnContentResize: true,
                    autoScrollOnFocus: false
                },
                callbacks:{
                    whileScrolling:function(){
                        var pct = this.mcs.topPct;
                        if(pct > 0){
                            $(".scroll-spy").addClass(scrollClass);
                        }else{
                            $(".scroll-spy").removeClass(scrollClass);
                        }
                    }
                }
            });
        }
    };
});

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
    $(window).bind("load resize", function() {
        topOffset = 50;
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

    var url = window.location;
    var element = $('ul.nav a').filter(function() {
        return this.href == url || url.href.indexOf(this.href) == 0;
    }).addClass('active').parent().parent().addClass('in').parent();
    if (element.is('li')) {
        element.addClass('active');
    }
});