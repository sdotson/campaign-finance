angular.module('candidate', ['ngRoute'])
    .config(config)
    .controller('CandidateCtrl', CandidateCtrl);


config.$inject = ['$routeProvider'];
function config($routeProvider) {
    $routeProvider.when('/candidate/:name', {
        templateUrl: 'candidate/candidate.html',
        controller: 'CandidateCtrl',
        resolve: {
            contributers: ['candidatesService', '$route', function(candidatesService, $route) {
                
                /* some extra stuff in here because api throws a fit if middle names are included */
                var routeName = $route.current.params.name,
                    newName = routeName.split(' ');

                if (newName.length > 2) {
                    newName.splice(2, newName.length - 1)
                };

                newName = newName.join(" ");

                return candidatesService.getCandidateDetails(newName);
            }],
            name: ['$route', function($route) {
                return $route.current.params.name;
            }],
        }
    });
}

CandidateCtrl.$inject = ['$scope','contributers','name'];
function CandidateCtrl($scope, contributers, name) {
    $scope.name = name;
    $scope.contributers = contributers;
}