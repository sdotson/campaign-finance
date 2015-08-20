angular.module('candidate', ['ngRoute'])
    .config(config)
    .controller('CandidateCtrl', CandidateCtrl);


config.$inject = ['$routeProvider'];
function config($routeProvider) {
    $routeProvider.when('/candidate/:cname', {
        templateUrl: 'candidate/candidate.html',
        controller: 'CandidateCtrl',
        resolve: {
            contributers: ['candidatesService', '$route', function(candidatesService, $route) {
                return candidatesService.getCandidateEntityID($route.current.params.cname);
            }]
        }
    });
}

CandidateCtrl.$inject = ['$scope','contributers'];
function CandidateCtrl($scope, contributers) {
    $scope.contributers = contributers;
}