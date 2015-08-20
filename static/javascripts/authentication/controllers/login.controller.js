(function () {
	'use strict';

	angular
		.module('thinkster.authentication.controllers')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$location', '$scope', 'Authentication']
	function LoginController($location, $scope, Authentication) {
		var vm = this;
		vm.login = login; 
		activate();
		//want this to run when controller is run, we will relocate to the index, if they are authenticated already
		function activate() {
			if (Authentication.isAuthenticated()) {
				$location.url('/');
			}
		}
		function login() {
			Authentication.login(vm.email, vm.password);
		}
	}
})();