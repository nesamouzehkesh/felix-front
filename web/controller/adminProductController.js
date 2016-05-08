/*
 * defining the controller that will provide access to the Deployd RESTful API via the AngularJS
$resource service. (You can use the $http service to work with a RESTful API, but doing so means you 
have to expose the complete set of URLs that are used to perform operations throughout the application. 
You can do this by defining a service that performs the operations for you, but a more elegant 
alternative is to use the $resource service, defined in the optional ngResource module, which 
also has a nice way of dealing with defining the URLs that are used to send requests to the server.
 */

angular.module("StoreAdmin")
.config(function($httpProvider) {
    $httpProvider.defaults.withCredentials = true; /*the $resource service is built on top of 
     * the features provided by the $http service, and that means I need to enable the 
     * withCredentials option that I used earlier to get authentication to work properly. 
     * I dont have access the requests made by the $http service, but I can change the default 
     * settings for all Ajax requests by calling the config method on the module and declaring 
     * a dependency on the provider for the $http service as shown above. In this case, 
     * the provider for the $http service, which is called $httpProvider, defines a 
     * defaults property that can be used to configure settings for all Ajax requests.*/
})
.controller("productCtrl", function ($scope, $resource) {

    $scope.productsResource = $resource('http://felix-rest.com/api/product/products' + ":id", { id: "@id" }); /* 
     * This is the most important part of this example, and is the statement that creates 
     * the access object that provides access to the RESTful API. The :id part, which corresponds 
     * to the map object that is the second argument, tells AngularJS that if the data object it 
     * is working with has an id property, then it should be appended to the URL used for the Ajax request.
     * */

    $scope.listProducts = function () {
        $scope.products = $scope.productsResource.query(); /* 
     * The access object that is the result from using the $resource service has query, get, 
     * delete, remove, and save methods that are used to obtain and operate on the data 
     * from the server
     */
    }

    $scope.deleteProduct = function (product) {
        product.$delete().then(function () {
            $scope.products.splice($scope.products.indexOf(product), 1);
        });
    }

    $scope.createProduct = function (product) {
        new $scope.productsResource(product).$save().then(function (newProduct) {
            $scope.products.push(newProduct);
            $scope.editedProduct = null;
        });
    }

    $scope.updateProduct = function (product) {
        product.$save();
        $scope.editedProduct = null;
    }

    $scope.startEdit = function (product) {
        $scope.editedProduct = product;
    }

    $scope.cancelEdit = function () {
        $scope.editedProduct = null;
    }

    $scope.listProducts(); /* The access object doesn’t automatically load the data 
 * from the server, which is why I call the query method directly at the end of 
 * the controller function.*/
});
