'use strict';

ResourceFactory.$inject = ['$resource'];
function ResourceFactory($resource) {
    var _this = this;
    return {
        Resource : $resource('http://localhost:8080/SimpleBooks/resources/quotes/:id', {id: '@id'},{
            getRandomQuote : {method : 'GET', url : 'http://localhost:8080/SimpleBooks/resources/quotes/random', isArray : false}
        })
    }
}

module.exports = ResourceFactory;