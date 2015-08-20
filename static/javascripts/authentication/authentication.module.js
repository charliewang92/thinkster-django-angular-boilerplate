(function () {
	'use strict';

	angular
		.module('thinkster.authentication', [
			'thinkster.authentication.controllers',
			'thinkster.authentication.services'
			]);

	//module declaration first, then [] for the set of requirements
	angular
		.module('thinkster.authentication.controllers', []);

	//this ngCookies is is not in the module by angular, so now it is a new feature
	angular
		.module('thinkster.authentication.services', ['ngCookies']);
})();