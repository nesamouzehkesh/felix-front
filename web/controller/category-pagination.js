(function() {

var myApp = angular.module('myApp', ['angularUtils.directives.dirPagination','StoryServices']);

    myApp.controller('MyCatController', ['$scope', 'CategoryRepository', function ($scope, CategoryRepository) {
      $scope.currentPage = 1;
      $scope.pageSize = 10;
      $scope.categories = [];

      CategoryRepository.getAllCategories()
        .success(function (data) {
            $scope.categories = data;
        }); 

      $scope.pageChangeHandler = function(num) {
          console.log('categories page changed to ' + num);
      };
    }]);

    myApp.controller('CatOtherController', ['$scope', function ($scope) {
      $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
      };
    }]);

})();