(function () {
	'use strict';
    
    angular
    	.module('thinkster.authentication.services')
    	.factory('Authentication', Authentication);

    //injecting dependency
    Authentication.$inject = ['$cookies', '$http']

	function Authentication($cookies, $http) {
		var Authentication = {
			getAuthenticatedAccount: getAuthenticatedAccount,
			isAuthenticated: isAuthenticated,
			login: login,
			register: register,
			setAuthenticatedAccount: setAuthenticatedAccount,
			unauthenticate, unauthenticate
		};
		return Authentication;

		function getAuthenticatedAccount() {
			if (!$cookies.authenticatedAccount) {
				return;
			}

			return JSON.parse($cookies.authenciatedAccount);
		}

		function isAuthenticated() {
			return !!$cookies.authenciatedAccount;
		}


		function login(email, password) {
			return $http.post('/api/v1/auth/login/', {
				email: email,
				password: password
			}).then(loginSuccessFn, loginErrorFn);

			function loginSuccessFn(data, status, headers, config) {
				Authentication.setAuthenticatedAccount(data.data);
				//if logged in properly, show the home page
				window.location ='/';
			}

			function loginErrorFn(data, status, headers, config) {
				console.log('failed to login');
			}
		}

		//The thens are promises
		function register(email, password, username) {
			return $http.post('/api/v1/accounts', {
				username: username,
				password: password,
				email: email
			}).then(registerSuccessFn, registerErrorFn);

			function registerSuccessFn(data, status, headers, config) {
				Authentication.login(email, password);
			}

			function registerErrorFn(data, status, headers, config) {
				console.log('could not register');
			}
		}

		function setAuthenticatedAccount(account) {
			$cookies.authenciatedAccount = JSON.stringify(account);
		}

		function unauthenticate() {
			delete $cookies.authenticatedAccount;
		}
	}
})();