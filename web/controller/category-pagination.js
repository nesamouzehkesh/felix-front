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
      
      $scope.deleteItem = function (itemId) {
            CategoryRepository.deleteCategory(itemId)
                .success(function (data) {
                    for (var i = 0; i < $scope.category.length; i++ ) {
                        if( $scope.category[i].id === itemId ) {
                            $scope.category.splice(i, 1 );     
                            break;
                        }
                    }              
            }); 
        };
    }]);

    myApp.controller('CatOtherController', ['$scope', function ($scope) {
      $scope.pageChangeHandler = function(num) {
        console.log('going to page ' + num);
      };
    }]);
    

})();