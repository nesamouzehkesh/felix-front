(function() {

var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination','StoryServices']);

    myApp.controller('MyController', ['$scope', '$http', 'ProductRepository', function ($scope, $http, ProductRepository) {
        $scope.currentPage = 1;
        $scope.pageSize = 10;
        $scope.products = [];

        ProductRepository.getAllProducts()
          .success(function (data) {
              $scope.products = data;
          }); 

        $scope.pageChangeHandler = function(num) {
            console.log('meals page changed to ' + num);
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