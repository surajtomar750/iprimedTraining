var app =angular.module('mainApp',["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider.when('/Login',{
   
                    templateUrl: 'adminLogin.htm'
                
                }).when('/',{
   
                    templateUrl: 'admin.htm',
                    
                
                }).when('/view-modify-product',{
   
                  templateUrl: 'view-modify-product.html',
                  controller: 'view-modify-product-ctrl'
                 
              
              }).when('/modify-admin',{
                  templateUrl: 'modify-product.html',
                  controller: 'modify-product'
              });
            })


// controller for fetching products for admin
app.controller("view-modify-product-ctrl",function($rootScope,$scope,$http){
  console.log("inside of single product and id is "+$scope.pId)
  $http.get("http://localhost:8080/products")
  .then(function(response) {
    console.log("inside of single product response is here")
        console.log(response.data);
       $rootScope.ProductList = response.data;
       console.log($rootScope.ProductList);
   
  });
})