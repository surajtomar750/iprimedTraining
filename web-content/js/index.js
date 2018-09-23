var app =angular.module('mainApp',["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider.when('/Login',{
   
                    templateUrl: 'Login.htm'
                
                }).when('/',{
   
                    templateUrl: 'products.htm',
                    controller: 'productCtrl'
                
                }).when('/single_product',{
   
                  templateUrl: 'single_product.html',
                 
              
              }).when('/signup',{
                templateUrl: 'signup.htm',
              });
   });


 app.controller("productCtrl",function($scope,$http,$location){

    $http.get("http://localhost:8080/products")
   .then(function(response) {
      if(!$scope.products){
        $scope.products = response.data;
      }
      
      
      $scope.tempProduct='';
     
   });

   $scope.go = function(path,index){
        $scope.selectedProduct=index;
        // $scope.selectedProduct=$scope.products[index];
        // console.log("hello call is working"+$scope.selectedProduct);
        // console.log("name "+$scope.selectedProduct.name);
        $location.path(path);
    }
   
   
  $scope.order='';
   $scope.orderList=function(order){
        $scope.order=order;
   };
  

 }); 