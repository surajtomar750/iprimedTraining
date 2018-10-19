var app = angular.module('app',["ngRoute"]);
app.config(function($routeProvider){
  $routeProvider.when('/',{
    templateUrl:'logistics-view-orders.html'

  }).when('/logistics-update-status',{
    templateUrl:'logistics-update-status.html'
  }).when('/logistics-view-orders',{
    templateUrl:'logistics-view-orders.html'
  }).when('/logistics-login',{
    templateUrl:'logistics-login.html'
  })
})


app.controller('appController',function($scope,$rootScope,$http,$location){
  //initialization of data
    $scope.data={emailid:"",password:""};


    $http.get('http://localhost:8080/getOrders').then(function(response){
      if(response.data!=""){
        $scope.orderList = response.data;
      }
    })


// for open logistic-update-status.html
    $scope.updateStatus = function(index){
      console.log(index);
      console.log($scope.orderList[index])
      $rootScope.updateorder = $scope.orderList[index];
      $location.path('logistics-update-status')

    }

    $scope.submitUpdate = function(data){
      console.log("status is "+data)
      $http.post("http://localhost:8080/update-status",data).then(function(response){
        if(response.data!=""){
            alert("status updated")
            $location.path('/')
        }
      })




      $scope.submitlogin = function(){
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

            console.log("user login successful")
            $rootScope.loginbtn="LOGOUT"
            $location.path('products')
          }



        })
      }

    }

})
