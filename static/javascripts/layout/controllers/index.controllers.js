(function () {
	'use strict';

	angular
		.module('thinkster.layout.controllers')
		.controller('IndexController', IndexController);

	IndexController.$inject = ['$scope', 'Authentication', 'Posts', 'Snackbar'];

	function IndexController($scope, Authentication, Posts, Snackbar) {
		var vm = this;

		vm.isAuthenticated = Authentication.isAuthenticated();
		vm.posts = [];

		activate(); 

		function activate() {
			Posts.all().then(postSuccessFn, postErrorFn);

			//when a new post is made, we add watcher to the scope for post.create
			$scope.$on('post.created', function (event, post) {
				vm.posts.unshift(post); //this adds to the front of the array
			})

			//if there's an error, we will take it out
			$scope.$on('post.created.error', function () {
				vm.posts.shift();
			});

			function postSuccessFn(data, status, headers, config) {
				vm.posts = data.data;
			}

			function postErrorFn(data, status, headers, config) {
				Snackbar.error(data.error);
			}
		}
	}
})();