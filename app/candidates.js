angular.module('candidates', [])
    .factory('candidatesService', candidatesService);

candidatesService.$inject = ['$http'];
function candidatesService($http) {
    var candidatesService = {
        getCandidates: getCandidates
    };

    function getCandidates() {
        var request = $http({
            url: 'http://stuartdotson.com/sunlightapi/candidates_json.php',
            method: 'GET',
            cache: true
        });
        return request.then(countriesSuccess, countriesError);
    }

    function countriesSuccess(response) {
        console.log(response.data);
        return response.data;
    }

    function countriesError(response) {
        console.log(response);
    }


    return candidatesService;
}


/*

http://sunlightlabs.github.io/realtime-docs/candidates

API key: 



*/