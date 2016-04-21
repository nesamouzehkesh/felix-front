/* 
 * This is a cart bundle that will have both the functionalities needed in a 
 * service (with few methods) and also a directive that will help to generate the 
 * missing "shopping cart" section of your page ;-) Ciao!!!
 * */


(function() {
var Cart = angular.module("Cart", [])
    
    Cart.factory("cartService", function () {
        var cartData = [];
        return {
            addProduct: function (id, name, price) {
                var addedToExistingItem = false;
                for (var i = 0; i < cartData.length; i++) {
                    if (cartData[i].id == id) {
                        cartData[i].count++;
                        addedToExistingItem = true;
                        break;
                    }
                }
                if (!addedToExistingItem) {
                    cartData.push({
                        count: 1, id: id, price: price, name: name
                    });
                }
            },
            removeProduct: function (id) {
                for (var i = 0; i < cartData.length; i++) {
                    if (cartData[i].id == id) {
                        cartData.splice(i, 1);
                        break;
                    }
                }
            },
            getProductsInCart: function () {
                return cartData;
            }
        }
    });
    /* 
     * The service above is for the functionality of what happens when a user clicks on 
     * "Add to Cart" button in the main markup. The calculations of the total price and 
     * number of items (based on the specific product's id, name and price are done by 
     * this service methods and then there is the last method that actually returns 
     * the shopping cart items as an array. 
     * */
    
    /* 
     * The directive then takes that shopping cart array and generates two output needed 
     * for the markup to show on top of the page. Generating the outputs are done by 
     * its controller and they will be shown the templateUrl provided. This little 
     * html markup (the templateUrl) is then placed wherever you put your directive 
     * in the markup as an element. 
     * */
    Cart.directive("cartSummary", function (cartService) {
        return {
            restrict: "E",
            templateUrl: "components/cartSummary.html", //the html that generates wherever 
                                                        //you put your directive as an element 
            controller: function ($scope) {

                var cartData = cartService.getProductsInCart();

                $scope.total = function () {
                    var total = 0;
                    for (var i = 0; i < cartData.length; i++) {
                        total += (cartData[i].price * cartData[i].count);
                    }
                    return total;
                }

                $scope.itemCount = function () {
                    var total = 0;
                    for (var i = 0; i < cartData.length; i++) {
                        total += cartData[i].count;
                    }
                    return total;
                }
            }
        };
    });
})();


/* 
 * So service says this is how I generate the shopping cart array if you give me a 
 * product specifics, and directive says this is how I show the items in that 
 * generated array the way I want (in this case its total price and its total count). 
 */