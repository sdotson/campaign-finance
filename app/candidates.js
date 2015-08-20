angular.module('candidates', [])
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
        var request = $http({
            url: 'http://transparencydata.org/api/1.0/entities.json',
            method: 'JSONP',
            cache: true,
            params: {
                apikey: "5fb0ee006d904354961ae1e83e80011b",
                search: name,
                type: "politician",
                callback: 'JSON_CALLBACK',
            }
        })

        return request.then(getContributers, errorHandler);
    }

    function getContributers(response) {
        var entityID = response.data[0].id;

        var request = $http({
            url: 'http://transparencydata.org/api/1.0/aggregates/pol/' + entityID + '/contributors.json',
            method: 'JSONP',
            cache: true,
            params: {
                apikey: "5fb0ee006d904354961ae1e83e80011b",
                callback: 'JSON_CALLBACK',
            }
        });

        return request.then(candidatesSuccess, errorHandler);
    }

    function getIndustries(response) {
        var entityID = response.data[0].id;

        var request = $http({
            url: 'http://transparencydata.org/api/1.0/aggregates/pol/' + entityID + 'contributors/industries.json',
            method: 'JSONP',
            cache: true,
            params: {
                apikey: "5fb0ee006d904354961ae1e83e80011b",
                callback: 'JSON_CALLBACK',
            }
        });

        return request.then(candidatesSuccess, errorHandler);
    }

    function candidatesSuccess(response) {
        console.log(response.data);
        return response.data;
    }

    function errorHandler(response) {
        console.log(response);
        return response;
    }


    return candidatesService;
}