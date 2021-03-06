(function() {
    angular.module("myApp")
        .config(function ($routeProvider) {
           
            
            $routeProvider.when("/checkout", {
                templateUrl: "/views/checkoutSummary.html"
            });

            $routeProvider.when("/", {
                templateUrl: "/views/thePanel.html"
            });

            $routeProvider.when("/complete", {
                templateUrl: "/views/thankYou.html"
            });

            $routeProvider.when("/placeorder", {
                templateUrl: "/views/placeOrder.html"
            });
            
            $routeProvider.when("/categories", {
                templateUrl: "/categories.html"
            });
            
            $routeProvider.otherwise({ redirectTo: '/' });
        })
})();    