angular.module('candidate', ['ngRoute'])
    .config(config)
    .controller('CandidateCtrl', CandidateCtrl);


config.$inject = ['$routeProvider'];
function config($routeProvider) {
    $routeProvider.when('/candidate/:name', {
        templateUrl: 'candidate/candidate.html',
        controller: 'CandidateCtrl',
        resolve: {
            candidate: ['candidatesService', '$route', function(candidatesService, $route) {
                return candidatesService.getCandidateDetails($route.current.params.name);
            }],
            name: ['$route', function($route) {
                return $route.current.params.name;
            }],
        }
    });
}

CandidateCtrl.$inject = ['$scope','candidate','name'];
function CandidateCtrl($scope, candidate, name) {
    $scope.name = name;
    $scope.candidate = candidate;
    $scope.contributors = candidate.contributors;
    $scope.industries = candidate.industries;
}