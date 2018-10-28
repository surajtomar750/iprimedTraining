var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

var app =angular.module('app',["ngRoute","ngCookies","ngStorage"]);
app.run(function(dataService){
  dataService.getProductsFromDB();
  console.log("data services is Completed")
})

// custom filters start


app.filter('priceLessThan', function () {
  return function (input, price) {
      var output = [];
      if (isNaN(price)) {
          output = input;
      }
      else {
          angular.forEach(input, function (item) {
              if (item.price <= price) {
                  output.push(item)
              }
          });
      }
      return output;
  }
})




app.filter('priceGreaterThan', function () {
  return function (input, price) {
      var output = [];
      if (isNaN(price)) {
          output = input;
      }
      else {
          angular.forEach(input, function (item) {
              if (item.price >= price) {
                  output.push(item)
              }
          });
      }
      return output;
  }
})



app.filter('pCategory', function () {
  return function (input, category) {
      var output = [];
      var undef;
      if(category=="" | category==undef){
        output=input;
      }else{
        angular.forEach(input, function (item) {
          if (item.category.length==category) {
                output.push(item)
            }
        });
      }
     

        
      
      return output;
  }
})




//custom filters end

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
              }).when('/address',{
                templateUrl:'address.html',
                controller:'addressctrl'
              })
   });



app.controller("appController",function($rootScope,$scope,$http,$location,$cookies){
  console.log("app controller is loaded")

//check if user loogedin or not and accordingly set cartlength and cart
  if($cookies.get("loggedin")=="true" || $cookies.get("loggedin")==true){
    $rootScope.loginbtn='LOGOUT'
    let emailid = $cookies.get('emailid')
    $http.get('http://localhost:8080/getCart/'+emailid).then(function(response){

      if(response.data){
        $rootScope.cart = response.data;
        $rootScope.cartlength=$rootScope.cart.length;

      }else{
        alert("something went wrong")
      }
    })
  }else {
      $rootScope.loginbtn='LOGIN'
  }

//code to maintain value of cart after restart
  let undef

    if($rootScope.cart==undef || $rootScope.cart==""){
      $rootScope.cart=[]
      $rootScope.cartlength=0;
      console.log('cart is created')
    }else {
      console.log('cart already exists with length: '+$rootScope.cart.length)
      $rootScope.cartlength = $rootScope.cart.length;
    }


//to handle login or logout button events
  $scope.login = function(){
     let undef;

      if($cookies.get('loggedin')=="true"){
          console.log("value of loggedin "+$cookies.get("loggedin"))
          $cookies.put("loggedin","false");
          $cookies.remove("emailid")
          $cookies.remove("username")
          $cookies.remove("token")
          $rootScope.loginbtn="LOGIN"
          $rootScope.cartlength=0;
          $location.path('/')
        }else{
          $location.path('Login')
        }

  }

$scope.gotoCat = function(cat){
  $rootScope.cat = cat;
  $location.path('products')
}


})


// controller for fetching single product
app.controller("singlepctrl",function($rootScope,$scope,$http,$routeParams,$cookies,$location){
  $scope.quantity=1;
  $scope.order = {emailid:"",product_id:"",name:"",quantity:"",number:"",image:"",price:""}
  $scope.item = {emailid:"",product_id:"",name:"",quantity:"",number:"",image:"",price:""}



  console.log($routeParams._id)
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
      $location.path('Login')
    }
  }

// to adding product to carts collection in mongodb
  $scope.addToCart = function(index){
    console.log('addToCart is called')
    let undef;
    $scope.item.emailid=$cookies.get('emailid');
    $scope.item.number=$cookies.get('number');
    $scope.item.product_id=$rootScope.selectedProduct[0]._id;
    $scope.item.name=$rootScope.selectedProduct[0].name;
    $scope.item.image = $rootScope.selectedProduct[0].image[0].image
    $scope.item.quantity = $scope.quantity;
    $scope.item.price =  $rootScope.selectedProduct[0].price
    // for debugging
    console.log(" item is "+$scope.item.emailid)
    console.log(" item is "+$scope.item.name)
    console.log(" item is "+$scope.item.number)
    console.log(" item is "+$scope.item.product_id)
    console.log(" item is "+$scope.item.quantity)
    console.log(" item is "+$scope.item.price)
    console.log(" item is "+$scope.item.image)

//Now following code will submit item to server
//  responses from server
//    success means item is unique in carts
//    updated means quantity has been updated
//    "" or null or empty response means some error
    if($cookies.get('loggedin')=="true" ){
      $http.post("http://localhost:8080/setCart",$scope.item).then(function(response){
          if(response.data=="success"){
             alert("item is added to to the cart ")
             $rootScope.cartlength = parseInt($rootScope.cartlength)+1;
          }else if("updated"){
            alert("item is added to to the cart ")
          }else{
            console.log('some error occured')
            alert("some error occured ")
          }
      })
    }
    else {
      $location.path('Login')
    }
  }
})


//controller for product view or product.html
app.controller("productCtrl",function($rootScope,$scope,$location,$http,dataService){
    
    $http.get("http://localhost:8080/products")
   .then(function(response) {
      if(!$scope.products){

        $scope.products = response.data;
        //$rootScope.products=response.data;
        console.log(response.data)
      }
      });


    $rootScope.cat =undefined;

    $scope.go = function(id){
          $location.path('single_product/'+id);
    }

    $scope.order='';
    $scope.orderList=function(order){
      $scope.order=order;
    }



})

// controller for cart data
app.controller("cartctrl",function($scope,$http,$rootScope,$cookies){
  $scope.total =0;
  console.log("cart controller loaded");
  let emailid = $cookies.get("emailid")
  console.log(emailid)
  $http.get('http://localhost:8080/getCart/'+emailid).then(function(response){
    if(response.data!=""){
      $scope.cart = response.data;
      console.log('success')
      $scope.getTotal();
      $rootScope.cartlength=$scope.cart.length;
    }else{
      console.log("something went wrong")
    }
  })

$scope.deletefromcart = function(index){
  let item =$scope.cart[index]._id;
  $http.get('http://localhost:8080/removeFromCart/'+item).then(function(response){
    if(response.data=="success"){
      console.log('item deleted')
      $scope.cart.splice(index,1)
      $rootScope.cartlength = $scope.cart.length
      $scope.getTotal()


    }
  })
}

$scope.getTotal = function(){
    $scope.total=0;
  for(let i=0;i<$scope.cart.length;i++){
    $scope.total=$scope.total+parseInt($scope.cart[i].price)
  }
}


  $scope.submitOrderFromCart = ()=>{
    if($cookies.get('loggedin')!="true"){
      alert('please login first')
      $location.path('Login')
      return;
    }
    if($scope.cart.length==0){
      alert('cart is empty')
      return;
    }
    let listOfOrders=[]
    for(let i=0;i<$scope.cart.length;i++){
      let order = {emailid:"",product_id:"",name:"",quantity:"",number:"",image:"",price:"",status:""}

      order.emailid=$cookies.get('emailid');
      order.number=$cookies.get('number');
      order.product_id=$scope.cart[i]._id;
      order.name=$scope.cart[i].name;
      order.image = $scope.cart[i].image[0].image
      order.quantity = $scope.cart[i].quantity;
      order.price = $scope.cart[i].price
      order.status = "processing"
      listOfOrders.push(order)

    }
// creating object in which all products will be stored
    let data = {orders:listOfOrders}
    $http.post('http://localhost:8080/placeOrders',data).then(function(response){
      if(response.data=="success"){

// a loop to delete items from carts collection in mongodb
        for(let i=0;i<$scope.cart.length;i++){
          $scope.deletefromcart(i);
        }
        // to delete items carts array
        $scope.cart.splice(0,$scope.cart.length)
        $rootScope.cartlength = 0;

        alert('orders placed successfully')
      }else {
          alert('something went wrong')
      }
    })

  }

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
    else if(!re.test($scope.data.emailid)){
     
          
          alert('email format if not correct')
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

        $location.path('products')
      }
    })
  }


})
//controller for login controller
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


app.controller('addressctrl',function($scope,$http,$rootscope,$location,$cookies){
console.log('addressctrl loaded')


  $scope.submitAddress = (addr)=>{
    addr.emailid = $cookies.get('emailid')
    $http.post('http://localhost:8080/setAddress',addr).then(function(response){
      if(response.data!=""){
        alert('address added successfully')
        $location.path('products');
      }else{
        alert('error please try again')
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
