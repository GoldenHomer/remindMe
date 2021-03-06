angular.module('remindMe', ['ionic', 'remindMe.controllers','remindMe.services','ui.bootstrap.datetimepicker'])

.run(function($ionicPlatform, $rootscope, $ionicLoading, $location, $timeout, SessionFactory) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });

  $rootScope.authktd = false;
 
  $rootScope.showLoading = function(msg) {
    $ionicLoading.show({
      template: msg || 'Loading',
      animation: 'fade-in',
      showBackdrop: true,
      maxWidth: 200,
      showDelay: 0
    });
  }
 
  $rootScope.hideLoading = function() {
    $ionicLoading.hide();
  };
 
  $rootScope.toast = function(msg) {
    $rootScope.showLoading(msg);
    $timeout(function() {
      $rootScope.hideLoading();
    }, 2999);
  };
 
  $rootScope.logout = function() {
    SessionFactory.deleteSession();
    $location.path('/auth/login');
  }
 
  $rootScope.$on('$locationChangeStart', function(event, newRoute, oldRoute) { // Listener for route change
    var isLoggedIn = SessionFactory.checkSession();
    $rootScope.authktd = isLoggedIn;
    if (newRoute.indexOf('/auth') >= 0) {
      if (isLoggedIn)
      {
        $location.path('/home');
      }
    }
  });
 
})
 
.config(function($stateProvider, $urlRouterProvider) {
 
 
  $stateProvider
 
  .state('auth', {
    url: "/auth",
    abstract: true,
    templateUrl: "templates/auth.html"
  })
 
  .state('auth.login', {
    url: '/login',
    views: {
      'auth-login': {
        templateUrl: 'templates/auth-login.html',
        controller: 'LoginCtrl'
      }
    }
  })
 
  .state('auth.register', {
    url: '/register',
    views: {
      'auth-register': {
        templateUrl: 'templates/auth-register.html',
        controller: 'RegisterCtrl'
      }
    }
  })
 
  .state('home', {
    url: "/home",
    templateUrl: "templates/home.html",
    controller: 'HomeCtrl'
  });
 
  $urlRouterProvider.otherwise('/auth/login');
});
