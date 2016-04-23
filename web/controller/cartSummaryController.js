angular.module("myApp")
    .controller("cartSummaryController", ['$scope', 'cartService', function($scope, cartService) {
 
    $scope.cartData = cartService.getProductsInCart();
 
    $scope.total = function () {
        var total = 0;
        for (var i = 0; i < $scope.cartData.length; i++) {
            total += ($scope.cartData[i].price * $scope.cartData[i].count);
        }
        
        return total;
    };
 
    $scope.remove = function (id) {
        cartService.removeProduct(id);
    };
}]);