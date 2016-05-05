angular.module("storeAdmin")
.controller("authCtrl", function($scope, $http, $location) {

    $scope.authenticate = function (user, pass) {
        $http.post('felix-rest admin controller action address', {
            username: user,
            password: pass
        }, {
            withCredentials: true
        }).success(function (data) {
            $location.path("/main");
        }).error(function (error) {
            $scope.authenticationError = error;
        });
    }
})
.controller("mainCtrl", function($scope) {
 
    $scope.screens = ["Products", "Orders"];
    $scope.current = $scope.screens[0];
 
    $scope.setScreen = function (index) {
    $scope.current = $scope.screens[index];
    };
 
    $scope.getScreen = function () {
        return $scope.current == "Products"
            ? "/views/adminProducts.html" : "/views/adminOrders.html";
        }
})
        
//the controller above is made because we could not have nested ng-view (it is 
//not allowed in AngularJs, so we had to find another way using a directive to 
//switch between two different views using ng-include inside ng-view. 

.controller("ordersCtrl", function ($scope, $http) {

    $http.get('http://felix-rest.com/api/product-order/orders')
        .success(function (data) {
            $scope.orders = data;
        })
        .error(function (error) {
            $scope.error = error;
        });

    $scope.selectedOrder;

    $scope.selectOrder = function (order) {
        $scope.selectedOrder = order;
    };

    $scope.calcTotal = function (order) {
        var total = 0;
        for (var i = 0; i < order.detail.length; i++) {
            total +=
                order.detail[i].count * order.detail[i].price;
        }
        return total;
    }
});
