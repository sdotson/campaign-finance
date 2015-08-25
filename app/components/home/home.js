angular.module('cfa.components.home', ['ngRoute','cfa.services.candidates', 'chart.js'])
    .config(config)
    .controller('HomeCtrl', HomeCtrl);

config.$inject = ['$routeProvider'];
function config($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'components/home/home.html',
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

    $scope.filteredCandidates = candidates;

    $scope.$watchGroup(['criteria.sortBy','criteria.sortDirection','criteria.include'], function(newValue) {
      dataArray = [];
      namesArray = [];
      $scope.filteredCandidates.forEach(function(c) {
        dataArray.push(c[newValue[0]]);
        namesArray.push(c.name);
      });

      $scope.data = [
        dataArray
      ];

      $scope.labels = namesArray;
      
    });

    $scope.candidates = candidates;


    $scope.labels = namesArray;
    $scope.series = ['Series A'];

    $scope.colours = [{
        fillColor: '#cdd0ec',
        strokeColor: '#cdd0ec',
        highlightFill: '#449e6b',
        highlightStroke: '#449e6b'
    }];

    $scope.data = [
      dataArray
    ];

}