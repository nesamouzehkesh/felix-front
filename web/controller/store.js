(function() {
    var app = angular.module('store', ['product','StoreServices'])
            .constant("categoryActiveClass", "btn-primary");
            //.constant("productListPageCount", 3);
    
    app.controller('StoreController', ['$http', '$scope', '$filter', 'ProductRepository', 'CategoryRepository', 
        function($http, $scope, $filter, ProductRepository, CategoryRepository) {
        var store = this;
        store.products = [];
        store.categories = [];
        
        ProductRepository.getAllProducts()
            .success(function (data) {
                store.products = data;
            });
          
        CategoryRepository.getAllCategories()
            .success(function (data) {
                store.categories = data;
            });    
        /*        
        this.deleteProduct = function(product, index) {
            ProductRepository.deleteProduct(product.id)
                .success(function (data) {
                    store.products.splice(index, 1);
                });
        };
        */
       
        
    }]);
    
    

    /*app.controller('PaginationController', [ '$scope', '$filter', 'ProductRepository', 
        function($scope, $filter, productListPageCount, productListActiveClass) {
            
        $scope.selectedPage = 1;
        $scope.pageSize = productListPageCount;
        
        $scope.selectPage = function (newPage) {
        $scope.selectedPage = newPage;
        };
        
        $scope.getPageClass = function (page) {
        return $scope.selectedPage == page ? productListActiveClass : "";
        };
       
        }]);*/


    app.controller('PanelController', function() {
        this.tab = 1;
        this.selectTab = function(tab) {
            this.tab = tab;
        };
        this.isSelected = function(tab) {
            return this.tab === tab;
        };
    });
    
    app.controller('ReviewController', function() {
        this.review = {};
        this.addReview = function(product) {
            product.reviews.push(this.review);
            this.review = {};
        };
    });
    
    app.controller("CategoryHighlight", function ($scope, categoryActiveClass) {

        var selectedCategory = null;

        $scope.selectCategory = function (newCategory) {
            selectedCategory = newCategory.id;
            //$scope.selectedPage = 1;
        };
        $scope.getCategoryClass = function (category) {
            return selectedCategory === category.id ? categoryActiveClass : "";
        };
    });    
})();