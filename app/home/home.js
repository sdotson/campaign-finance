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
            }
        }
    });
}

HomeCtrl.$inject = ['$scope','candidates'];
function HomeCtrl($scope, candidates) {
    candidates.forEach(function(c){
       c.cash_on_hand = parseFloat(c.cash_on_hand);
       c.total_receipts = parseFloat(c.total_receipts);
       c.total_contributions = parseFloat(c.total_contributions);
       c.total_disbursements = parseFloat(c.total_disbursements);
       c.outstanding_loans = parseFloat(c.outstanding_loans);
    });

    $scope.candidates = candidates;

    $scope.parseInt = parseInt;

    /*$scope.criteria = {
        sortBy: "cash_on_hand",
        sortDirection: "+"
    };*/

}