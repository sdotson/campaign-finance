angular.module('candidates', [])
    .factory('candidatesService', candidatesService);

candidatesService.$inject = ['$http'];
function candidatesService($http) {
    var candidatesService = {
        getCandidates: getCandidates
    };

    function getCandidates() {
        var request = $http({
            url: '',
            method: 'GET',
            cache: true,
            params: {

            }
        });
        return request.then(countriesSuccess, countriesError);
    }

    function countriesSuccess(response) {
        console.log(response);
    }

    function countriesError(response) {
        console.log(response);
    }

    return candidatesService;
}


/*

http://sunlightlabs.github.io/realtime-docs/candidates

API key: 5fb0ee006d904354961ae1e83e80011b



*/