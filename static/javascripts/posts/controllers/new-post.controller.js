(function () {
	'use strict';

	angular
		.module('thinkster.posts.controllers')
		.controller('NewPostController', NewPostController);

	//rootscope is needed to broad cast changes
	//scope to close dialog when user closes form
	//The last three are services that need to post and validate

	NewPostController.$inject =['$rootScope', '$scope', 'Authentication', 'Snackbar', 'Posts'];

	function NewPostController($rootScope, $scope, Authentication, Snackbar, Posts) {
		var vm = this;

		vm.submit = submit; 

		function submit() {
			//we assume it's accepted, due to perceieved performance
			//this is the event that was broadcasted and we were reading earlier
			$rootScope.$broadcast('post.created', {
				content: vm.content,
				author: {
					username: Authentication.getAuthenticatedAccount().username
				}
			});

			//Closes this dialog
			$scope.closeThisDialog();
			Posts.create(vm.content).then(createPostSuccessFn, createPostErrorFn);

			function createPostSuccessFn(data, status, headers, config) {
				Snackbar.show('success! created');
			}

			function createPostErrorFn(data, status, headers, config) {
				$rootScope.$broadcast('post.created.error');
				Snackbar.error(data.error);
			}
		}
	}
})();