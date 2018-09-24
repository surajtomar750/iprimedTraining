var app =angular.module('mainApp',["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider.when('/Login',{
   
                    templateUrl: 'Login.htm'
                
                }).when('/',{
   
                    templateUrl: 'products.htm',
                    controller: 'productCtrl'
                
                }).when('/single_product',{
   
                  templateUrl: 'single_product.html',
                  controller: 'productCtrl'
                 
              
              }).when('/signup',{
                templateUrl: 'signup.htm',
              });
   });


 app.controller("productCtrl",function(,$scope,$http,$location){

    $http.get("http://localhost:8080/products")
   .then(function(response) {
      if(!$scope.products){
        $scope.products = response.data;
      }
     
   });

   $scope.go = function(index){
        $scope.getSingleProduct($scope.products[index].name);        
        $location.path('single_product');
    }
    $scope.getSingleProduct = function(name){
        $http.get('/product/'+name).then(function(response){
          console.log("hello call is working");
          console.log(response.data)
          $scope.selectedProduct=[];
          $scope.selectedProduct=response.data;
       })
    }
   
   
  $scope.order='';
   $scope.orderList=function(order){
        $scope.order=order;
   };
  

 }); 