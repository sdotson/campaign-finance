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

        var promise = getEntityID(name).then(function(response) {
            return $q.all([
                getContributers(response.data[0].id),
                getIndustries(response.data[0].id)
            ]).then(function(results) {
                console.log(results);
                return {
                    contributors: results[0],
                    industries: results[1]
                };
            });
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
        console.log('entity response');
        console.log(id);
        if (id) {
            var entityID = id;

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

        } else {
            return false;  
        };

    }

    function getIndustries(id) {
        var entityID = id;

        var request = $http({
            url: 'http://transparencydata.org/api/1.0/aggregates/pol/' + entityID + '/contributors/industries.json',
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
        console.log(response);
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