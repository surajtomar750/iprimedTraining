var app =angular.module('app',["ngRoute"]);
app.config(function($routeProvider){
    $routeProvider.when('/admin-login',{

                    templateUrl: 'admin-login.html',
                    controller: 'adminloginctrl'

                }).when('/',{
                  templateUrl:'admin-login.html',
                  controller:'adminloginctrl'
                }).when('/admin',{

                    templateUrl: 'admin.html',
                    controller: 'adminctrlpanel'


                }).when('/admin-add-product',{

                  templateUrl: 'admin.html',
                  controller: 'admin-add-product-ctrl'


              }).when('/view-modify-product',{

                  templateUrl: 'view-modify-product.html',
                  controller: 'viewmodifyproductctrl'


              }).when('/modify-admin',{
                  templateUrl: 'modify-product.html',
                  controller: 'modify-product'
              });
            })


// controller for fetching products for admin
app.controller("adminctrlpanel",function($rootScope,$scope,$http){
  console.log("inside the controller adminctrlpanel")
  $http.get("http://localhost:8080/products")
  .then(function(response) {
    console.log("inside of single product response is here")
        console.log(response.data);
       $rootScope.ProductList = response.data;
       console.log($rootScope.ProductList);

  });
})








app.controller("viewmodifyproductctrl",function($rootScope,$scope,$http,$location){
  $http.get("http://localhost:8080/products")
  .then(function(response) {
    $scope.ProductList = response.data;
    console.log($scope.ProductList);
  });

 $scope.deleteItem = function(index){

    alert("deleteing item of id " +$scope.ProductList[index]._id)
    $http.get("http://localhost:8080/removeproduct/"+$scope.ProductList[index]._id).then(function(response){
          console.log("server returned "+response)
          if(response=='true'){
                $scope.ProductList.splice(index)
          }

    })}

    $scope.editItem = function(x){
      console.log(x);
      $rootScope.productSelected = $scope.ProductList[x];
      //window.location.href="http://localhost:8080/modify-product.html"
      $location.path('modify-view')
    }



    $scope.disableeditItem = function(){
      $scope.hide=true;
    }
})





app.controller('adminloginctrl',function($scope,$http,$location){
  $scope.submitAdminLogin  = function(){
    $http.post("http://localhost:8080/admin-login-check").then(function(response){
      if(response){
        $location.path('view-modify-product')
      }
    })
  }
})







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

app.controller("modify-product-ctrl",)