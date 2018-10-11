var app =angular.module('app',["ngRoute"]);
app.run(function(dataService){
  dataService.getProductsFromDB();
  console.log("data services is Completed")
})
app.config(function($routeProvider){
    $routeProvider.when('/Login',{

                    templateUrl: 'Login.htm',
                    controller: 'loginctrl'

                }).when('/',{
                  templateUrl:'products.htm',
                  controller:'productCtrl'

                }).when('/single_product/',{

                  templateUrl: 'single_product.html',
                  controller: 'singlepctrl'


              }).when('/signup',{

                templateUrl: 'signup.htm',
                controller: 'signupctrl'

              }).when('/products',{
                templateUrl: 'products.htm',
                controller: 'productCtrl'
              }).when('/cart',{
                templateUrl:'cart.html',
                controller:'cartctrl'
              })
   });



app.controller("appController",function($rootScope,$scope,$http,$location){
  console.log("app controller is loaded")
  $scope.submitlogin = function(){
    console.log($scope.login)
    $http.post("http://localhost:8080/logindata",$scope.login).then(function(response){
      if(response!=""){
        console.log(response.data)
        console.log("user registered successful")
        $scope.login.emailid=""
        $scope.login.password=""

        $location.path('products')

      }
    })
  }

  $scope.resetfields= function(arg){
    console.log("reset function call")

      $scope.signup=""
      $scope.login=""



  }
  $scope.submitsignup = function(signup){
    console.log($scope.signup)
    $http.post("http://localhost:8080/signupdata",$scope.signup).then(function(response){
      if(response!==""){
        console.log("user registered successful")
        $scope.signup.name=""
        $scope.signup.number=""
        $scope.signup.emailid=""
        $scope.signup.password="";

        $location.path('products')
      }
    })
  }




})


// controller for fetching single product
app.controller("singlepctrl",function($rootScope,$scope,$http){
  console.log("inside of single product and id is "+$rootScope.pId)

  $http.get("http://localhost:8080/product/"+$rootScope.pId)
  .then(function(response) {
    console.log("inside of single product response is here")
        console.log(response.data);
       $rootScope.selectedProduct = response.data;

  });
})


app.controller("productCtrl",function($rootScope,$scope,$location,$http,dataService){

    $http.get("http://localhost:8080/products")
   .then(function(response) {
      if(!$scope.products){

        $scope.products = response.data;
        //$rootScope.products=response.data;
        console.log(response.data)
      }
      });
   //$scope.products= dataService.getProducts();



   //
    $scope.go = function(index){
     $rootScope.pId =$scope.products[index]._id;
     $location.path('single_product');
    }

    $scope.order='';

    $scope.orderList=function(order){
     $scope.order=order;
    }

})

// controller for cart data
app.controller("cartctrl",function($scope,$http,$rootScope){
  console.log("cart controller loaded")

      $http.get("http://localhost:8080/cart/robot@mail")
     .then(function(response) {
          $scope.cart = response.data;
          console.log("result from server "+response.data)


     });


 })


app.controller('signupctrl',function($scope,$http,$location){
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

app.controller("loginctrl",function($scope,$http,$location){
  $scope.submit = function(){
    console.log($scope.data)
    $http.post("http://localhost:8080/logindata",$scope.data).then(function(response){
    console.log("response from server "+response)
      if(response!=""){
        console.log(response.data)
        console.log("user registered successful")
        $location.path('products')
      }


    })
  }
})

//this service is not working
app.service('dataService',function($http){
  this.products=[];
  this.getProductsFromDB = function(){
    $http.get("http://localhost:8080/products")

    .then(function(response){

     this.products=response.data;
     console.log(this.products)
  })
  }


  this.getProducts= ()=>{
    return this.products;
  }
  this.getProduct=(index)=>{
   return this.products[index];
  }
})
