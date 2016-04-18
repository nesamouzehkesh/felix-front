(function() {

var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination','StoreServices', 'Cart']);

    myApp.controller('MyController', ['$scope', '$http', 'ProductRepository', 'cartService', function 
        ($scope, $http, ProductRepository, cartService) {
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.products = [];

        ProductRepository.getAllProducts()
          .success(function (data) {
              $scope.products = data;
          }) 
          .error(function (error) {
                $scope.error = error;
            });

        $scope.pageChangeHandler = function(num) {
            console.log('meals page changed to ' + num);
        };
        
        $scope.addProductToCart = function (product) {
            cartService.addProduct(product.id, product.name, product.price);
        }

        $scope.deleteItem = function (itemId) {
            ProductRepository.deleteProduct(itemId)
                .success(function (data) {
                    for (var i = 0; i < $scope.products.length; i++ ) {
                        if( $scope.products[i].id === itemId ) {
                            $scope.products.splice(i, 1 );     
                            break;
                        }
                    }              
            }); 
        };
    }]);
    
    

    myApp.controller('OtherController', ['$scope', function ($scope) {
      $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
      };
    }]);
})();