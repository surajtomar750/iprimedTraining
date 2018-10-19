var app =angular.module('app',["ngRoute","ngCookies"]);
app.run(function(dataService){
  dataService.getProductsFromDB();
  console.log("data services is Completed")
})
app.config(function($routeProvider){
    $routeProvider.when('/Login', {

                    templateUrl: 'Login.htm',
                    controller: 'loginctrl'

                }).when('/',{
                  templateUrl:'products.htm',
                  controller:'productCtrl'

                }).when('/single_product/:_id',{

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



app.controller("appController",function($rootScope,$scope,$http,$location,$cookies){
  console.log("app controller is loaded")

  if($cookies.get("loggedin")=="true" || $cookies.get("loggedin")==true){
    $rootScope.loginbtn='LOGOUT'
  }else {
      $rootScope.loginbtn='LOGIN'
  }
  //code to maintain value of cart after restart
  let undef

  console.log('cart is created')
    if($cookies.get("cart")==undef ||$cookies.get("cart")==""){
          $rootScope.cart=[]
    }else {
      $rootScope.cart=$cookies.get('cart')
    }






  $scope.login = function(loginpage){
     let undef;

      if($cookies.get('loggedin')=="true"){
          console.log("value of loggedin "+$cookies.get("loggedin"))
          $cookies.put("loggedin","false");
          $cookies.remove("emailid")
          $cookies.remove("username")
          $cookies.remove("token")
          $rootScope.loginbtn="LOGIN"
          $location.path('/')
        }else{
          $location.path('Login')
        }

  }


  // $scope.submitsignup = function(signup){
  //   console.log($scope.signup)
  //   $http.post("http://localhost:8080/signupdata",$scope.signup).then(function(response){
  //     if(response.data!==""){
  //       console.log("user registered successful")
  //       $scope.signup.name=""
  //       $scope.signup.number=""
  //       $scope.signup.emailid=""
  //       $scope.signup.password="";
  //
  //       $location.path('Login')
  //     }
  //   })
  // }




})


// controller for fetching single product
app.controller("singlepctrl",function($rootScope,$scope,$http,$routeParams,$cookies,$location){
  $scope.quantity=1;
  $scope.order = {emailid:"",product_id:"",name:"",quantity:"",number:"",image:""}
  console.log("inside of single product and id is "+$rootScope.pId)

  console.log($routeParams._id)

  console.log("http://localhost:8080/product/"+$routeParams._id)
  $http.get("http://localhost:8080/product/"+$routeParams._id)
  .then(function(response) {
    console.log("inside of single product response is here")
        console.log(response.data);
       $rootScope.selectedProduct = response.data;

  });


  $scope.submitOrder = function(index){

    $scope.order.emailid=$cookies.get('emailid');
    $scope.order.number=$cookies.get('number');
    $scope.order.product_id=$rootScope.selectedProduct[0]._id;
    $scope.order.name=$rootScope.selectedProduct[0].name;
    $scope.order.image = $rootScope.selectedProduct[0].image[0].image
    $scope.order.quantity = $scope.quantity;
    $scope.order.status = "processing"
    console.log("value of loggedin")
    if($cookies.get('loggedin')=="true" ){

      $http.post("http://localhost:8080/placeOrder",$scope.order).then(function(response){
          if(response.data=="success"){
             alert("order placed ")

          }
      })
    }
    else {
      //$rootScope.currentPage='/si/'+$routeParams._id
      $location.path('Login')
    }
  }

  $scope.addToCart = function(index){
    // $scope.order.emailid=$cookies.get('emailid');
    // $scope.order.number=$cookies.get('number');
    $scope.order.product_id=$rootScope.selectedProduct[0]._id;
    $scope.order.name=$rootScope.selectedProduct[0].name;
    $scope.order.image = $rootScope.selectedProduct[0].image[0].image
    $scope.order.quantity = $scope.quantity;
    let vCart = '{name:'+$scope.order.name+',product_id:'+$scope.order.product_id+',image:'+$scope.order.image+'}'
    let undef;


    $rootScope.cart=[];
    $rootScope.cart.push(vCart);
    $cookies.put("cart",$rootScope.cart)
    if($rootScope.cartlength==undef){
      console.log("if")
        $rootScope.cartlength=1;
    }else{  console.log("else")
        $rootScope.cartlength=$rootScope.cartlength+1;
    }




  }
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
     $location.path('single_product/'+$scope.products[index]._id);
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


app.controller('signupctrl',function($rootScope,$scope,$http,$location,$cookies){
  $scope.data={name:"",number:"",emailid:"",password:""};
  $scope.submit = function(){
      //form validation

      console.log("what inside of data : "+$scope.data);
    if($scope.data.name=="" || $scope.data.number=="" || $scope.data.emailid=="" || $scope.data.password==""){
      alert("* all field are requered")
      return;
    }
    else if($scope.data.number.toString().length!=10){
      alert("!! length of mobile number should be 10 length is "+$scope.data.number.toString().length)
      return;
    }
    else if ($scope.data.password.length<8) {
        alert("!! length of password should be 8 length is "+$scope.data.password.length)
        return;
    }


    $http.post("http://localhost:8080/signupdata",$scope.data).then(function(response){
      if(response.data==""){
          alert("something went wrong")
      }else if(response.data=="exist")
      {
        alert("email id exists use different email")
      }else if(response.data=="success"){
        console.log("user registered successful")
        $location.path('Login')
      }
    })
  }


})

app.controller("loginctrl",function($rootScope,$scope,$http,$location,$cookies){
  $scope.data={emailid:"",password:""};


  $scope.submit = function(){
    console.log($scope.data)
    let undef;

    if($scope.data.password==""||$scope.data.emailid=="" || $scope.data.password==undef ||$scope.data.emailid==undef){
      alert("* all field are requered")
      return;
    }else if ($scope.data.password.length<8) {
        alert("!! length of password should be 8 length is "+$scope.data.password.length)
        return;
    }


    $http.post("http://localhost:8080/logindata",$scope.data).then(function(response){
    console.log("response from server "+response.data)
      if(response.data==""){
        console.log("response "+response.data)
        alert("wrong user id or password")
        return;

      }else if(response.data=="error"){
        console.log("error")
        alert(" error : wrong user id or password")
        return;

      }else if(response.data.token!=""){
        console.log("token "+response.data.token)
        $cookies.put("token",response.data.token)
        $cookies.put("loggedin",true)
        $cookies.put("emailid",response.data.emailid)
        $cookies.put("username",response.data.name)
        $cookies.put("number",response.data.number)
        console.log("user login successful")
        $rootScope.loginbtn="LOGOUT"
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
