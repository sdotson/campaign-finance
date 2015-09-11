(function() {

    'use strict';

    angular.module('cfa.services.candidates', [])
        .factory('candidatesService', candidatesService);

    candidatesService.$inject = ['$http','$q'];
    function candidatesService($http, $q) {
        var candidatesService = {
            getCandidates: getCandidates,
            getCandidateDetails: getCandidateDetails
        };

        function getCandidates() {
            var request = $http({
                url: 'http://stuartdotson.com/sunlightapi/candidates_json.php',
                method: 'GET',
                cache: true
            });
            return request.then(candidatesSuccess, errorHandler);
        }

        function getCandidateDetails(name) {

            var promise = getEntityID(name).then(function(response) {
                if (response.data[0]) {
                    return $q.all([
                        getContributers(response.data[0].id),
                        getIndustries(response.data[0].id),
                        getTypeBreakdown(response.data[0].id)
                    ]).then(function(results) {
                        return {
                            contributors: results[0],
                            industries: results[1],
                            types: results[2]
                        };
                    });
                } else {
                    return false;
                };
            });

            return promise;

        }

        function getEntityID(name) {

           /* alter name to suit imperfect api lookup */
            var routeName = name,
                newName = routeName.split(' ');

            if (newName.length > 2) {
                newName.splice(2, newName.length - 1)
            };

            newName = newName.join(" ");

            switch (newName) {
                case "CRUZ, RAFAEL":
                    newName = "Ted Cruz";
                    break;
                case "PERRY, JAMES":
                    newName = "Rick Perry";
                    break;
                case "SANTORUM, RICHARD":
                    newName = "RICK SANTORUM";
                    break;
            };


            var request = $http({
                url: 'http://transparencydata.org/api/1.0/entities.json',
                method: 'JSONP',
                cache: true,
                params: {
                    apikey: "5fb0ee006d904354961ae1e83e80011b",
                    search: newName,
                    type: "politician",
                    callback: 'JSON_CALLBACK',
                }
            });

            return request;
        }

        function getContributers(id) {

            var request = $http({
                url: 'http://transparencydata.org/api/1.0/aggregates/pol/' + id + '/contributors.json',
                method: 'JSONP',
                cache: true,
                params: {
                    apikey: "5fb0ee006d904354961ae1e83e80011b",
                    callback: 'JSON_CALLBACK',
                }
            });

            return request.then(successHandler, errorHandler);
        }

        function getIndustries(id) {

            var request = $http({
                url: 'http://transparencydata.org/api/1.0/aggregates/pol/' + id + '/contributors/industries.json',
                method: 'JSONP',
                cache: true,
                params: {
                    apikey: "5fb0ee006d904354961ae1e83e80011b",
                    callback: 'JSON_CALLBACK',
                }
            });

            return request.then(successHandler, errorHandler);
        }

        function getTypeBreakdown(id) {

            var request = $http({
                url: 'http://transparencydata.org/api/1.0/aggregates/pol/' + id + '/contributors/type_breakdown.json',
                method: 'JSONP',
                cache: true,
                params: {
                    apikey: "5fb0ee006d904354961ae1e83e80011b",
                    callback: 'JSON_CALLBACK',
                }
            });

            return request.then(successHandler, errorHandler);
        }



        function candidatesSuccess(response) {
            response.data.forEach(function(c) {
               c.cash_on_hand = parseInt(c.cash_on_hand, 10);
               c.total_receipts = parseInt(c.total_receipts, 10);
               c.total_contributions = parseInt(c.total_contributions, 10);
               c.total_disbursements = parseInt(c.total_disbursements, 10);
               c.outstanding_loans = parseInt(c.outstanding_loans, 10);
               c.expenditures_opposing = parseInt(c.expenditures_opposing, 10);
               c.expenditures_supporting = parseInt(c.expenditures_supporting, 10);
            });

            return response.data;
        }

        function successHandler(response) {
            return response.data;
        }

        function errorHandler(response) {
            return response;
        }

        function entityErrorHandler(response) {
            return response;
        }


        return candidatesService;
    }

})();
