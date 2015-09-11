(function() {
    'use strict';


    angular.module('cfa.components.candidate', ['ngRoute','chart.js','cfa.directives.cfaImage'])
        .config(candidateConfig)
        .controller('CandidateCtrl', CandidateCtrl);

    candidateConfig.$inject = ['$routeProvider'];
    function candidateConfig($routeProvider) {
        $routeProvider.when('/candidate/:name', {
            templateUrl: 'components/candidate/candidate.html',
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

    CandidateCtrl.$inject = ['$scope', 'candidate', 'name'];
    function CandidateCtrl($scope, candidate, name) {
        $scope.name = name;
        $scope.candidate = candidate;
        $scope.contributors = candidate.contributors;
        $scope.industries = candidate.industries;
        $scope.typeBreakdown = candidate.types;

        $scope.options = {
            responsive: true
        };

        var lastName = name.split(',')[0].replace("'","");

        $scope.headshotsrc = "./assets/images/" + lastName + ".jpg";


        var industryNamesArray = [];
        var industryDataArray = [];

        if ($scope.industries) {
            $scope.industries.forEach(function(c) {
                industryNamesArray.push(c.name);
                industryDataArray.push(c.amount);
            });
        };

        $scope.labels = industryNamesArray;
        $scope.data = industryDataArray;

    }

})();