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
                
                /* some extra stuff in here because api throws a fit if middle names are included */
                var routeName = $route.current.params.cname,
                    newName = routeName.split(' ');

                if (newName.length > 2) {
                    newName.splice(2, newName.length - 1)
                };

                newName = newName.join(" ");

                console.log(routeName);
                console.log(newName);

                return candidatesService.getCandidateEntityID(newName);
            }],
            cname: ['$route', function($route) {
                return $route.current.params.cname;
            }]
        }
    });
}

CandidateCtrl.$inject = ['$scope','contributers','cname'];
function CandidateCtrl($scope, contributers, cname) {
    $scope.name = cname;
    $scope.contributers = contributers;
}