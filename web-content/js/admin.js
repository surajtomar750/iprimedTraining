var app = angular.module("adminApp",[]);
app.controller("adminController",function($scope,$http){

    $scope.submitProduct = ()=>{
                $http.post("http://localhost:8080/adminaddproduct",$scope.product).then(function(response){
                        if(response.data!=""){
                            $scope.product.id=""
                            $scope.product.name=""
                            $scope.product.price=""
                            $scope.product.description=""
                            $scope.product.category=""
                            $scope.product.image=""

                        }
                })
    }

})