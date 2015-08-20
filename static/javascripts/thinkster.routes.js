(function () {
	'use strict';
	//config will give us the way to configure...
	//place this config into routes module
	angular
		.module('thinkster.routes')
		.config(config);

	config.$inject = ['$routeProvider'];

	function config($routeProvider) {
		$routeProvider.when('/', {
			controller: 'IndexController',
			controllerAs: 'vm', 
			templateUrl: '/static/templates/layout/index.html'
		}).when('/register', {
			controller: 'RegisterController',
			controllerAs: 'vm',
			templateUrl: '/static/templates/authentication/register.html'
		}).when('/login', {
			controller: 'LoginController',
			controllerAs: 'vm',
			templateUrl: 'static/templates/authentication/login.html'
		}).when('/+:usename', {
			controller:'ProfileController',
			controllerAs: 'vm',
			templateUrl: '/static/templates/profiles/profiles.html'
		}).when('/+:username/settings/', {
			controller: 'ProfileSettingsController',
			controlleAs: 'vm',
			templateUrl: '/static/templates/profiles/settings.html'
		}).otherwise('/');
	}
})();