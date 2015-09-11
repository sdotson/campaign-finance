(function() {
  
  'use strict';

  angular.module('cfa.components.home', ['ngRoute','cfa.services.candidates', 'chart.js'])
      .config(config)
      .controller('HomeCtrl', HomeCtrl);

  config.$inject = ['$routeProvider'];
  function config($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'components/home/home.html',
          controller: 'HomeCtrl',
          controllerAs: 'home',
          resolve: {
              candidates: ['candidatesService', function(candidatesService) {
                  return candidatesService.getCandidates();
              }]
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
          dataArray.push(parseInt(c[newValue[0]],10));
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
          fillColor: '#de7a60',
          strokeColor: '#de7a60',
          highlightFill: '#449e6b',
          highlightStroke: '#449e6b'
      }];

      $scope.options = {
        responsive: true,
        scaleLabel: function(label) {
          return  '$' + label.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        },
        tooltipTemplate: function(value) {
          if (value.label)  {
              return value.label + ": $" + value.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          } else {
              return value.value;
          };
        }
      }

      $scope.data = [
        dataArray
      ];

  }

})();
