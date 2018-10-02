var app = angular.module("app",[]);
app.controller("view-modify-product-ctrl",function($scope,$http){
  $http.get("http://localhost:8080/products")
  .then(function(response) {
    $scope.ProductList = response.data;
    console.log($scope.ProductList);
$scope.editItem = function(index){
      var temp = $scope.ProductList[index];
      $scope.productid=temp.id;
      $scope.productname = temp.name;
      $scope.productprice= temp.price;
      $scope.productdescription = temp.description;
      $scope.category = temp.category;
        $scope.hide=false;
        $scope.lock=true;
    

}


$scope.disableeditItem = function(){
    $scope.hide=true;
}    
});
})