var app =angular.module('mainApp',["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider.when('/Login',{

                    templateUrl: 'Login.htm',
                    controller: 'login-ctrl'

                }).when('/',{

                    templateUrl: 'products.htm',
                    controller: 'productCtrl'

                }).when('/single_product',{

                  templateUrl: 'single_product.html',
                  controller: 'productCtrl2'


              }).when('/signup',{

                templateUrl: 'signup.htm',
                controller: 'signupctrl'

              }).when('/products',{
                templateUrl: 'products.htm',
                controller: 'productCtrl'
              })
   });



// controller for fetching single product
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

})

// controller for cart data
app.controller("cartCtrl",function($scope,$http){

    $http.get("http://localhost:8080/cart/userId")
   .then(function(response) {
      if(!$scope.products){

        $scope.products = response.data;
        console.log(response.data)
      }

   });
 })


app.controller('signupCtrl',function($scope,$http,$location){
  $scope.submit = function(){
    console.log($scope.data)
    $http.post("http://localhost:8080/signupdata",$scope.data).then(function(response){
      if(response!==""){
        console.log("user registered successful")
        $location.path('products')
      }
    })
  }
})

app.controller("login-Ctrl",function($scope,$http){
  $scope.submit = function(){
    console.log($scope.data)
    $http.post("http://localhost:8080/logindata",$scope.data).then(function(response){
      if(response!==""){
        console.log("user registered successful")
        $location.path('products')
      }
    })
  }
})
