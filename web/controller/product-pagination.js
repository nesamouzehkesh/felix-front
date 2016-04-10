(function() {

var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination','StoryServices']);

    myApp.controller('MyController', ['$scope', 'ProductRepository', function ($scope, ProductRepository) {
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
    }]);

    myApp.controller('OtherController', ['$scope', function ($scope) {
      $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
      };
    }]);

})();