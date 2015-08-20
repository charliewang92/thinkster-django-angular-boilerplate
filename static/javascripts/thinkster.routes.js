(function () {
	'use strict';
	//config will give us the way to configure...
	//place this config into routes module
	angular
		.module('thinkster.routes')
		.config(config);

	config.$inject = ['$routeProvider'];

	function config($routeProvider) {
		$routeProvider.when('/register', {
			controller: 'RegisterController',
			controllerAs: 'vm',
			templateUrl: '/static/templates/authentication/register.html'
		}).when('/login', {
			controller: 'LoginController',
			controllerAs: 'vm',
			templateUrl: 'static/templates/authentication/login.html'
		}).otherwise('/');
	}
})();