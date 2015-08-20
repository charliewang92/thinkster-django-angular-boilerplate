angular
  .module('thinkster', [
  	'thinkster.config',
  	'thinkster.routes',
  	'thinkster.authentication',
  	'thinkster.layout',
  	'thinkster.posts',
  	'thinkster.utils',
  	'thinkster.profiles'
  	]);

angular
	.module('thinkster.routes', ['ngRoute']);

angular
	.module('thinkster.config', []);
//run blocks are called beofre anything
angular
	.module('thinkster')
	.run(run);

run.$inject = ['$http'];

//run before to attach a csrf token
function run($http) {
	$http.defaults.xsrfHeaderName = 'X-CSRFToken';
	$http.defaults.xsrfCookieName = 'csrftoken';
}