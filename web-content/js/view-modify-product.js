var app = angular.module("app",["ngRoute"]);

app.config(function($routeProvider){
  $routeProvider.when('/modify-view',{
 
                  templateUrl: 'modify-product.html',
                  controller: 'modify-product-ctrl'
                  
              
              }).when('/view-modify-product',{
                    templateUrl: 'view-modify-product.html',
                    controller: 'view-modify-product-ctrl'
              }).when('/',{ 
                templateUrl: 'view-modify-product.html',
                controller: 'view-modify-product-ctrl'
                
              }).when('/admin',{
                templateUrl: 'admin.html',
                controller: 'view-modify-product-ctrl'
              })
 });

app.controller("view-modify-product-ctrl",function($rootScope,$scope,$http,$location){
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
      window.location.href="http://localhost:8080/modify-product.html"
      $location.path('modify-view')
    }



    $scope.disableeditItem = function(){
      $scope.hide=true;
    }    
})