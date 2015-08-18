angular.module('home', ['ngRoute'])
    .config(config)
    .controller('HomeCtrl', HomeCtrl);

config.$inject = ['$routeProvider'];
function config($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl'
    });
}

HomeCtrl.$inject = [];
function HomeCtrl() {

}