angular.module('candidates', [])
    .factory('candidatesService', candidatesService);

candidatesService.$inject = ['$http'];
function candidatesService($http) {
    var candidatesService = {
        getCandidates: getCandidates,
        getTopCandidates: getTopCandidates
    };

    function getCandidates() {
        var request = $http({
            url: 'http://realtime.influenceexplorer.com/api//candidates/',
            method: 'GET',
            cache: true,
            params: {
                format: 'json',
                apikey: '5fb0ee006d904354961ae1e83e80011b',
                office: 'P',

            }
        });
        return request.then(countriesSuccess, countriesError);
    }

    function countriesSuccess(response) {
        console.log(response.data);
        return response.data.results;
    }

    function countriesError(response) {
        console.log(response);
    }

    function getTopCandidates() {
        var request = $http({
            url: 'http://transparencydata.com/api/1.0/aggregates/pols/top_1.json',
            method: 'GET',
            cache: true,
            params: {
                apikey: '5fb0ee006d904354961ae1e83e80011b',
                cycle: '2016'
            }
        });
        return request.then(countriesSuccess, countriesError);
    }


    return candidatesService;
}


/*

http://sunlightlabs.github.io/realtime-docs/candidates

API key: 



*/