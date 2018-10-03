var fourthApp = angular.module("mainApp",[]) ;

fourthApp.controller("productsController", function($scope,$http) {
   
   $scope.myFilter='';

   $http.get("http://localhost/products")
   .then(function(response) {
      
       $scope.products = response.data;

   }); 
});





