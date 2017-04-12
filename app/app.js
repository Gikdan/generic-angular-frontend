angular.module('app', ['ngResource', 'ngRoute', 'ngAnimate', 'oc.lazyLoad', 
	'mgcrea.ngStrap', 'angularMoment', 'angular.filter', 'validation', 'angular-websocket']);
//common js files
require('./common');

//additional js files
require('angular-strap/dist/angular-strap.tpl');

//css
require('bootstrap/dist/css/bootstrap.css');
require('bootstrap-additions/dist/bootstrap-additions.css');
require('font-awesome/css/font-awesome.css');
require('metismenu/dist/metisMenu.css');
require('malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.css');
require('angular-motion/dist/angular-motion.css')
require('../stylesheets/ezen.css');