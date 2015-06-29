angular.module('howWasIt', [
  'howWasIt.login',
  'howWasIt.signup',
  'howWasIt.home',
  'howWasIt.map',
  'howWasIt.friends',
  'howWasIt.topfive',
  'howWasIt.services',
  'LocalStorageModule',
  'ui.router'
])

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $urlRouterProvider.otherwise("/login");
  $stateProvider
    .state('home', {
      url:"/home",
      templateUrl: 'app/home/home.html',
      controller: 'HomeController'
    })
    .state('login', {
      url:"/login",
      templateUrl: 'app/login/login.html',
      controller: 'LoginController'
    })
    .state('signup', {
      url:"/signup",
      templateUrl: 'app/signup/signup.html',
      controller: 'SignupController'
    });

    $httpProvider.interceptors.push('AttachTokens');
})

.run(function ($rootScope, $state, $location, AuthFactory) {
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to login page. the exceptions are when they are trying to go to login or signup
  $rootScope.$on('$stateChangeStart', function (evt, toState, toParams, fromState, fromParams) {
    if (!AuthFactory.isAuthenticated() && toState.url !== '/login' && toState.url !== '/signup') {
      // $state.go('login');
      $location.path('login');
    } 
    // redirect to home on every state change when you are already logged in
    if (AuthFactory.isAuthenticated() && toState.url !== '/home'){
      console.log('already logged in');
      // TODO: must account for completion of original event BEFORE redirecting. need resolve.
      $location.path('home');
    }
  });
});

