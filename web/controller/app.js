(function() {
    angular.module("myApp")
        .config(function ($routeProvider) {
            $routeProvider.when("/checkout", {
                templateUrl: "/views/checkoutSummary.html"
            });

            $routeProvider.otherwise({
                templateUrl: "/views/thePanel.html"
            });

            $routeProvider.when("/complete", {
                templateUrl: "/views/thankYou.html"
            });

            $routeProvider.when("/placeorder", {
                templateUrl: "/views/placeOrder.html"
            });
        })
})();    