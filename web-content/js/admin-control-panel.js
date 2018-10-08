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




app.controller("viewmodifyproductctrl",function($rootScope,$scope,$http,$location,$window,$route){
  $http.get("http://localhost:8080/products")
  .then(function(response) {
    $scope.ProductList = response.data;
    console.log($scope.ProductList);
  });

 $scope.deleteItem = function(index){

    console.log("deleteing item of id " +$scope.ProductList[index]._id)
    $http.get("http://localhost:8080/removeproduct/"+$scope.ProductList[index]._id).then(function(response){
          console.log("server returned "+response)
          if(response=='true'){
                $scope.ProductList.splice(index,1)
                  $route.reload();
          }

    })}

    $scope.editItem = function(index){
      console.log(index);
      console.log($scope.ProductList[index])
      $rootScope.updateproduct = $scope.ProductList[index];
      $location.path('modify-product')

    }



    $scope.disableeditItem = function(){
      $scope.hide=true;
    }
})





app.controller('adminloginctrl',function($scope,$http,$location){
  $scope.submitAdminLogin  = function(){
    console.log("email submitted "+$scope.data.emailid)
    console.log("password submited"+$scope.data.password)
    console.log($scope.data)


    $http.post("http://localhost:8080/admin-login-check",$scope.data).then(function(response){
      if(response){
        console.log(response.data);
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
app.controller("modify-product-ctrl",function($rootScope,$scope,$location,$http){
    console.log("controllerworking")
    $scope.temp;
    if($rootScope.updateproduct==$scope.temp){
      $location.path('view-modify-product')
    }
    $scope.p=$rootScope.updateproduct
    $scope.updateproduct=[{_id:$scope.p._id,image:$scope.p.image,name:$scope.p.name,description:$scope.p.description,price:$scope.p.price,category:$scope.p.category}]
    console.log($scope.updateproduct)
    $scope.submitUpdate=function(index){
      console.log($scope.updateproduct[index]);
      $http.post("http://localhost:8080/updateproduct/",$scope.updateproduct[index]).then(response=>{
        if(response.data!=""){
          $rootScope.updateproduct=""
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
