angular.module('app').factory('sequenceService', function($http) {
    return {
        getNextSequence: function(sequenceName) {
            if(sequenceName){
                return $http.get('./resources/sequences/nextSequence/' + sequenceName).then(function(result) {
                    return result.data;
                });
            }
            console.error('Error: sequence name not specified!!')
        }
    }
});