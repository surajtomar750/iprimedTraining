var app =angular.module('app',["ngRoute","ngCookies"]);

// filters


app.filter('pCategory', function () {
  return function (input, category) {
      var output = [];
      var undef;
      if(category=="" | category==undef){
        output=input;
      }else{
        angular.forEach(input, function (item) {
          if (item.category===category) {
                output.push(item)
            }
        });
      }     
      
      return output;
  }
})
//filters end
app.config(function($routeProvider){
    $routeProvider.when('/admin-login',{

                    templateUrl: 'admin-login.html',
                    controller: 'adminloginctrl'

                }).when('/',{
                  templateUrl: 'view-modify-product.htm',
                  controller: 'viewmodifyproductctrl'
                }).when('/admin',{

                    templateUrl: 'admin.html',



                }).when('/admin-add-product',{

                  templateUrl: 'admin.html',



              }).when('/view-modify-product',{

                  templateUrl: 'view-modify-product.html',
                  controller: 'viewmodifyproductctrl'


              }).when('/modify-product',{
                  templateUrl: 'modify-product.html',
                  controller: 'modify-product-ctrl'

              }).when( '/admin-signup',{
                templateUrl:'admin-signup',
                controller:'admin-signup-ctrl'


              })
            })


// controller for fetching products for admin
app.controller("adminctrlpanel",function($rootScope,$scope,$http,$cookies,$location){
  $rootScope.loginbtn = "LOGIN"

  if($cookies.get("adminloggedin")=="true"){
    $rootScope.loginbtn = "LOGOUT"
    console.log($cookies.get("adminloggedin"))
    $location.path('view-modify-product')

  }else{
    $rootScope.loginbtn = "LOGIN"
    $location.path('/admin-login')

  }



  $scope.login = function(){
     let undef;
     console.log("login check is called")
      if($cookies.get('adminloggedin')=="true"){
          console.log("value of loggedin "+$cookies.get("adminloggedin"))
          $cookies.put("adminloggedin","false");
          $rootScope.loginbtn="LOGIN"
          $location.path('admin-login')
        }else{

          $location.path('admin-login')
        }

  }

$scope.gotoaddproductpage = function(){
  if($cookies.get('adminloggedin')=="true"){
      console.log("value of loggedin "+$cookies.get("adminloggedin"))
      $location.path('admin-add-product')
    }else{
      $location.path('admin-login')
    }
}



$scope.gotoviewproductspage = function(){
  if($cookies.get('adminloggedin')=="true"){
      console.log("value of loggedin "+$cookies.get("adminloggedin"))
      $location.path('view-modify-product')
    }else{
      $location.path('admin-login')
    }
}



})




app.controller("viewmodifyproductctrl",function($rootScope,$scope,$http,$location,$cookies,$route){

  if($cookies.get("adminloggedin")=="true"){
    $rootScope.loginbtn = "LOGOUT"
    console.log($cookies.get("adminloggedin"))
    //$location.path('view-modify-product')

  }else{
    $rootScope.loginbtn = "LOGIN"
    $location.path('/admin-login')

  }


  $http.get("http://localhost:8080/products")
  .then(function(response) {
    $scope.ProductList = response.data;
    console.log($scope.ProductList);
  });

 $scope.deleteItem = function(index){

    console.log("deleteing item of id " +$scope.ProductList[index]._id)
    $http.get("http://localhost:8080/removeproduct/"+$scope.ProductList[index]._id).then(function(response){
          console.log("server returned "+response)
          if(response.data=='true'){
                $scope.ProductList.splice(index,1)
                $location.path('view-modify-product')

          }

    })}

    $scope.editItem = function(product){
      console.log(product)
      $rootScope.selectedProduct={_id:product._id,image:product.image,name:product.name,description:product.description,price:product.price,category:product.category}
      $location.path('modify-product')

    }



    $scope.disableeditItem = function(){
      $scope.hide=true;
    }
})





app.controller('adminloginctrl',function($scope,$http,$location,$cookies,$rootScope){

  $scope.submitAdminLogin  = function(data){
    let undef;


    if($cookies.get("adminloggedin")=="true"){
      $location.path('view-modify-product')
    }

    if(data == undef || data.emailid==undef || data.password == undef){
      alert("all field required")
      return;
    }else{
      console.log("else")
      $http.post("http://localhost:8080/admin-login-check",data).then(function(response){
        if(response.data.token!=""){
          $cookies.put("adminloggedin","true")
          $rootScope.loginbtn = "LOGOUT"
          console.log(response.data.token);
          $location.path('view-modify-product')
        }else{
          console.log("id or paaaword is wrong")
        }
      })
    }




  }
})






//not in use
app.controller("admin-add-product-Ctrl",function($scope,$http){

  $scope.submitProduct = ()=>{
              $http.post("http://localhost:8080/adminaddproduct",$scope.product).then(function(response){
                      if(response.data!=""){

                          $scope.product.name=""
                          $scope.product.price=""
                          $scope.product.description=""
                          $scope.product.category=""
                          $scope.product.image=""

                      }
              })
  }

})
app.controller("modify-product-ctrl",function($rootScope,$scope,$location,$http,$routeParams){
    console.log("controllerworking")

    
  

    let undef;
    if($rootScope.selectedProduct == undef){
      $location.path('view-modify-product')
    }
    
    $scope.p=$rootScope.selectedProduct;
    $scope.updateproduct=[{_id:$scope.p._id,image:$scope.p.image,name:$scope.p.name,description:$scope.p.description,price:$scope.p.price,category:$scope.p.category}]
    //console.log($scope.updateproduct)
    $scope.submitUpdate=function(index){
      console.log($scope.updateproduct[index]);
      $http.post("http://localhost:8080/updateproduct/",$scope.updateproduct[index]).then(response=>{
        if(response.data!=""){
          $rootScope.selectedProduct=""
          $scope.updateproduct==""
          $location.path('view-modify-product')
       }
     })
    }


})

app.controller('admin-signup-ctrl',function($scope,$http,$location){

console.log("adminsignupctrl working")
     $scope.submit = function(data){

console.log("data submitted"+$scope.data)
console.log("data submitted"+data.name)
       $http.post("http://localhost:8080/admin-signup-data",data).then(function(response){
         if(response.data!=""){
           console.log(response)
           $location.path('admin-login');
         }
       })
     }
})



function submitproduct(){
  console.log("function is working")
  let name = document.getElementById("nameofproduct")
  let price = document.getElementById("priceofproduct")
  let desc = document.getElementById("descofproduct")
  let cat = document.getElementById("catofproduct")
  console.log("value of cat is "+cat.value)
  if(name.value==""){
    alert("please provide name")
    return false;
  }else if(price.value==""){
    alert("please provide price")
    return false;
  }else if(desc.value==""){
    alert("please provide description")
    return false;

  }else if(cat.value=='? undefined:undefined ?'){
    alert("please provide category")
    return false;
  }
}


function clearproduct(){
document.getElementById("nameofproduct").value=""
document.getElementById("priceofproduct").value=""
document.getElementById("descofproduct").value=""
document.getElementById("catofproduct").value=""
}
