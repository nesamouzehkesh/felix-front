(function() {
    var StoreServices = angular.module('StoryServices', []);
    
    StoreServices.factory('ProductRepository', ['$http', function ($http) {
        return {
            getAllProducts: function() {
                return $http.get('http://felix-rest.com/api/product/products');
            },
            deleteProduct: function(id) {
                return $http.delete('http://felix-rest.com/api/product/products', {id: id});
            }
        };
    }]);

    StoreServices.factory('CategoryRepository', ['$http', function ($http) {
        return {
            getAllCategories: function() {
                return $http.get('http://felix-rest.com/api/product-category/categories');
                },
            deleteCategory: function(id) {
            return $http.delete('http://felix-rest.com/api/product-category/category', {id: id});
        }
            };
        }]);

    StoreServices.factory('productFactory', function ($resource) {
        return $resource('../api/products/:id', {}, {
            show: { method: 'GET' },
            update: { method: 'PUT', params: {id: '@id'} },
            delete: { method: 'DELETE', params: {id: '@id'} }
        })
    });
    
   

})();
