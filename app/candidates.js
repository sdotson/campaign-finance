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
        })

        return request.then(getContributers, entityErrorHandler);
    }

    function getContributers(response) {
        console.log('entity response');
        console.log(response);
        if (response.data[0]) {
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

        } else {
            return false;  
        };

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