(function() {

var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination',
    'StoreServices', 'Cart', 'ngRoute']);

    myApp.controller('MyController', ['$scope', '$http', 'ProductRepository', 
        'OrderRepository', 'cartService', function 
        ($scope, $http, ProductRepository, OrderRepository, cartService) {
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
            
        $scope.shipOrder = function (shippingDetails) { //the shipOrder behaviour will use the sendOrder service
            var order = angular.copy(shippingDetails);  //create a copy of the shipping details
                                                        //object so that I can safely manipulate it without 
                                                        //affecting other parts of the application.
            order.products = cartService.getProductsInCart();
            OrderRepository.sendOrder(order)
                .success(function (data) {
                    $scope.orderId = data.id;
                    cartService.getProductsInCart().length = 0;
                 }) 
                .error(function (error) {
                    $scope.error = error;
                })
                .finally(function () {
                    $location.path("/complete");
                }); 
        };
            
        $scope.pageChangeHandler = function(num) {
            console.log('meals page changed to ' + num);
        };
        
        $scope.addProductToCart = function (product) {
            cartService.addProduct(product.id, product.name, product.price);
        };

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