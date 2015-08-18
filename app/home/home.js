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
            },
            topCandidates: function(candidatesService) {
                return candidatesService.getTopCandidates();
            }
        }
    });
}

HomeCtrl.$inject = ['$scope','candidates', 'topCandidates'];
function HomeCtrl($scope, candidates, topCandidates) {
    $scope.candidates = candidates;
    $scope.topCandidates = topCandidates;
}