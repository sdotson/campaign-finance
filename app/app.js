angular.module('campaignFinanceApp', ['cfa.components.home','cfa.components.candidate', 'ngResource'])

    .config(config);


function config($httpProvider) {
    $httpProvider.interceptors.push(function ($rootScope) {
      $rootScope.loading = false;
      return function (promise) {
        $rootScope.loading = true;
        // make sure the loading screen is visible
        var hide = function (r) {
            $rootScope.loading = false;
             return r;
        };
        return promise.then(hide, hide);
      };
    });
}