(function () {
	'use strict';

	angular
		.module('thinkster.posts.directives')
		.directive('posts', posts);

	function posts() {

		var directive = {
			controller: 'PostsController',
			controllerAs: 'vm',
			restrict: 'E', //E stands for element, A for attribute, depending how our elements are laid out. 
			scope: {
				posts: '=' 
			},
			templateUrl: '/static/templates/posts/posts.html'
	};

		return directive;
	}
})();	