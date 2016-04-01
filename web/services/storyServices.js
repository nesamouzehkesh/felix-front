(function() {
    var StoryServices = angular.module('StoryServices', []);
    
    StoryServices.factory('ProductRepository', ['$http', function ($http) {
        return {
            getAllProducts: function() {
                return $http.get('http://saman-felix-rest.dev/api/product/products');
            },
            deleteProduct: function(id) {
                return $http.delete('http://saman-felix-rest.dev/api/product/products', {id: id});
            }
        };
    }]);

    StoryServices.factory('productFactory', function ($resource) {
        return $resource('../api/products/:id', {}, {
            show: { method: 'GET' },
            update: { method: 'PUT', params: {id: '@id'} },
            delete: { method: 'DELETE', params: {id: '@id'} }
        })
    });
})();