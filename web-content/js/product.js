var fourthApp = angular.module("mainApp",[]) ;

fourthApp.controller("productsController", function($scope,$http) {
   
   $scope.myFilter='';

   $http.get("https://fir-c90c5.firebaseio.com/products.json")
   .then(function(response) {
      
       $scope.products = response.data;

   });

    

    


});





