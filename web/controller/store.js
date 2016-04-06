(function() {
    var app = angular.module('store', ['product', 'StoryServices']);
    
    app.controller('StoreController', ['$http', 'ProductRepository', 'CategoryRepository', 
        function($http, ProductRepository, CategoryRepository) {
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
    
    
    
})();
