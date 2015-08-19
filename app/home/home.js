angular.module('home', ['ngRoute','candidates'])
    .config(config)
    .controller('HomeCtrl', HomeCtrl);

config.$inject = ['$routeProvider'];
function config($routeProvider) {
    $routeProvider.when('/', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl',
        resolve: {
            candidates: function(candidatesService) {
                return candidatesService.getCandidates();
            }
        }
    });
}

HomeCtrl.$inject = ['$scope','candidates'];
function HomeCtrl($scope, candidates) {
    $scope.candidates = candidates;
}