angular.module('home', ['ngRoute','candidates', 'chart.js'])
    .config(config)
    .controller('HomeCtrl', HomeCtrl);

config.$inject = ['$routeProvider'];
function config($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home/home.html',
        controller: 'HomeCtrl',
        resolve: {
            candidates: function(candidatesService) {
                return candidatesService.getCandidates();
            }
        }
    }).otherwise({
      redirectTo: '/'
    });
}

HomeCtrl.$inject = ['$scope','candidates'];
function HomeCtrl($scope, candidates) {
  var namesArray = [];
  var dataArray = [];

    candidates.forEach(function(c){
       namesArray.push(c.name);
    });

    $scope.$watch('criteria.sortBy', function(newValue) {
      dataArray = [];
      candidates.forEach(function(c) {
        dataArray.push(c[newValue]);
      });

      $scope.data = [
        dataArray
      ];
      
    });

    $scope.candidates = candidates;


    $scope.labels = namesArray;
    $scope.series = ['Series A'];

    $scope.data = [
      dataArray
    ];

}