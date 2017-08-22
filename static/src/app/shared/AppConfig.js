import $ from 'jquery';

function AppConfig($interpolateProvider, $httpProvider, $locationProvider, $urlRouterProvider, $stateProvider) {
  $interpolateProvider.startSymbol('[[');
  $interpolateProvider.endSymbol(']]');

  $httpProvider.defaults.xsrfCookieName = 'csrftoken';
  $httpProvider.defaults.xsrfHeaderName = 'X-CSRFToken';

  $stateProvider
    .state('root', {
      url: '/',
      template: '<tw-home></tw-home>'
    });

  $urlRouterProvider.otherwise("/");

  $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

  $locationProvider.html5Mode(true);
}

AppConfig.$inject = ['$interpolateProvider', '$httpProvider', '$locationProvider', '$urlRouterProvider', '$stateProvider'];

export default AppConfig;
