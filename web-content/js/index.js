var app =angular.module('app',["ngRoute","ngCookies","ngStorage"]);
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
              }).when('/orders',{
                templateUrl:'orders.html',
                controller:'ordersctrl'
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
    if($cookies.getObject("cart")==undef ||$cookies.getObject("cart")==""){
          $rootScope.cart=[]
    }else {
      $rootScope.cart=  JSON.parse($cookies.getObject('cart'))
      console.log($rootScope.cart)
      $rootScope.cartlength = $rootScope.cart.length;
    }






  $scope.login = function(){
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
  $scope.order = {emailid:"",product_id:"",name:"",quantity:"",number:"",image:"",price:""}
  $scope.item = {emailid:"",product_id:"",name:"",quantity:"",number:"",image:"",price:""}

  console.log("inside of single product and id is "+$rootScope.pId)

  console.log($routeParams._id)

  //console.log("http://localhost:8080/product/"+$routeParams._id)
  $http.get("http://localhost:8080/product/"+$routeParams._id)
  .then(function(response) {
    console.log("inside of single product response is here")
        console.log(response.data);
       $rootScope.selectedProduct = response.data;

  });

  $scope.increment = (quantity)=>{
    $scope.quantity=quantity;
  }
  $scope.submitOrder = function(index){

    $scope.order.emailid=$cookies.get('emailid');
    $scope.order.number=$cookies.get('number');
    $scope.order.product_id=$rootScope.selectedProduct[0]._id;
    $scope.order.name=$rootScope.selectedProduct[0].name;
    $scope.order.image = $rootScope.selectedProduct[0].image[0].image
    $scope.order.quantity = $scope.quantity;
    $scope.order.price = $rootScope.selectedProduct[0].price*$scope.quantity
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

    $scope.item.product_id=$rootScope.selectedProduct[0]._id;
    $scope.item.name=$rootScope.selectedProduct[0].name;
    $scope.item.image = $rootScope.selectedProduct[0].image[0].image
    $scope.item.quantity = $scope.quantity;
    $scope.item.price =  $rootScope.selectedProduct[0].price

    let undef;
    if($rootScope.cart){
      $rootScope.cart.push($scope.item)
      $cookies.putObject("cart",JSON.stringify($rootScope.cart))
      $rootScope.cartlength = $rootScope.cart.length;
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

  console.log("cart controller loaded");
  $scope.cart = $rootScope.cart;
      $scope.total =0;
  for(let i=0;i<$scope.cart.length;i++){
    $scope.total=$scope.total+$scope.cart[i].price;
  }
  $scope.order = {emailid:"",product_id:"",name:"",quantity:"",number:"",image:"",price:""}
  //
  // $scope.submitOrderFromCart = ()=>{
  //   if($cookies.get('loggedin')!="true"){
  //     alert('please login first')
  //     $location.path('Login')
  //     return;
  //   }
  //   let listOfOrders=[]
  //   for(let i=0;i<$scope.cart.length;i++){
  //     $scope.order.emailid=$cookies.get('emailid');
  //     $scope.order.number=$cookies.get('number');
  //     $scope.order.product_id=$scope.cart[0]._id;
  //     $scope.order.name=$scope.cart[0].name;
  //     $scope.order.image = $scope.cart[0].image[0].image
  //     $scope.order.quantity = $scope.cart[0].quantity;
  //     $scope.order.price = $scope.cart[0].price
  //     $scope.order.status = "processing"
  //     listOfOrders.push($scope.order)
  //   }
  //   let data = {orders:listOfOrders}
  //   $http.post('http://localhost:8080/placeOrders',data).then(function(response){
  //     if(response.data==""){
  //       alert('something went wrong')
  //     }else {
  //         alert('success')
  //     }
  //   })
  //
  // }

  $scope.remove = (index)=>{
    $scope.cart.splice(index,1);
    $rootScope.cart.splice(index,1)
    $cookies.putObject('cart',JSON.stringify($rootScope.cart))
  }
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
        $cookies.remove('cart')
        $rootScope.cartlength=0;
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


//testing purpose only
app.controller('ordersctrl',function($scope,$http,$rootScope,$cookies){
  console.log('this is email of user logged in '+$cookies.get('emailid'))
  $http.get('http://localhost:8080/getOrder/'+$cookies.get('emailid')).then((response)=>{
    $scope.orderlist = response.data;
  })
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
