angular.module('home', ['ngRoute','candidates', 'chart.js'])
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
  var namesArray = [];
  var dataArray = [];

    candidates.forEach(function(c){
       c.cash_on_hand = parseFloat(c.cash_on_hand);
       c.total_receipts = parseFloat(c.total_receipts);
       c.total_contributions = parseFloat(c.total_contributions);
       c.total_disbursements = parseFloat(c.total_disbursements);
       c.outstanding_loans = parseFloat(c.outstanding_loans);
       namesArray.push(c.name);
    });

    $scope.$watch('criteria.sortBy', function(newValue) {
      console.log(newValue);
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

    /*$scope.criteria = {
        sortBy: "cash_on_hand",
        sortDirection: "+"
    };*/

}