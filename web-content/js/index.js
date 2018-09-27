var app =angular.module('mainApp',["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider.when('/Login',{
   
                    templateUrl: 'Login.htm'
                
                }).when('/',{
   
                    templateUrl: 'products.htm',
                    controller: 'productCtrl'
                
                }).when('/single_product',{
   
                  templateUrl: 'single_product.html',
                  controller: 'productCtrl2'
                 
              
              }).when('/signup',{
                templateUrl: 'signup.htm',
              });
   });




app.controller("productCtrl2",function($rootScope,$scope,$http){
  console.log("inside of single product and id is "+$scope.pId)
  $http.get("http://localhost:8080/product/"+$scope.pId)
  .then(function(response) {
    console.log("inside of single product response is here")
        console.log(response.data);
       $rootScope.selectedProduct = response.data;
   
  });
})





 app.controller("productCtrl",function($rootScope,$scope,$http,$location){

    $http.get("http://localhost:8080/products")
   .then(function(response) {
      if(!$scope.products){

        $scope.products = response.data;
        console.log(response.data)
      }
     
   });

   $scope.go = function(index){
                $rootScope.pId =$scope.products[index].id;
        $location.path('single_product');
    }
   
   
   
  $scope.order='';
   $scope.orderList=function(order){
        $scope.order=order;
   };
  

 }); 