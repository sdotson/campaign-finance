angular.module('candidate', ['ngRoute'])
    .config(config)
    .controller('CandidateCtrl', CandidateCtrl);


config.$inject = ['$routeProvider'];
function config($routeProvider) {
    $routeProvider.when('/candidate', {
        templateUrl: 'candidate/candidate.html',
        controller: 'CandidateCtrl'
    });
}

CandidateCtrl.$inject = [];
function CandidateCtrl() {

}