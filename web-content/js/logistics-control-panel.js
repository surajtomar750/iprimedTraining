var app = angular.module('app',["ngRoute","ngCookies"]);
app.config(function($routeProvider){
  $routeProvider.when('/',{
    templateUrl:'logistics-view-orders.html',
    controller: 'vieworderctrl'    // load html document to see a list of orders
  }).when('/logistics-update-status',{
    templateUrl:'logistics-update-status.html'  // load html document to update  status of a particular order
  }).when('/logistics-view-orders',{
    templateUrl:'logistics-view-orders.html',
    controller:'vieworderctrl'
  }).when('/logistics-login',{
    templateUrl:'logistics-login.html'
  })
})

// main application controller
app.controller('appController',function($scope,$rootScope,$http,$location,$cookies){
  //initialization of data
    $scope.data={emailid:"",password:""};
    let undef;
    $rootScope.logisticsdata = $cookies.getObject('logisticsdata')
     console.log("app controller value of logisticsdata : "+$rootScope.logisticsdata)

    if($rootScope.logisticsdata=="" || $rootScope.logisticsdata==undef){
      $rootScope.loginbtn="LOGIN"
      console.log("no cookies found")
      $location.path('logistics-login')

    }else{
      console.log("cookies found")
      $rootScope.loginbtn="LOGOUT"
    }




// requesting orders data from order collection/Table from database
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

    $scope.gotoViewOrders = ()=>{

    }
//
    $scope.submitUpdate = function(data){
      console.log("status is "+data)
      $http.post("http://localhost:8080/update-status",data).then(function(response){
        if(response.data!=""){
            alert("status updated")
            $location.path('/')
        }
      })
    }

    $scope.login = ()=>{
      if($rootScope.logisticsdata==undef || $rootScope.logisticsdata==""){
        $location.path('logistics-login')
      }else {
        $rootScope.loginbtn="LOGIN"
        $cookies.remove("logisticsdata")
        $rootScope.logisticsdata=undef;
        $location.path('logistics-login')
      }
    }


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


      $http.post("http://localhost:8080/logisticsLogin",$scope.data).then(function(response){
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
        console.log('token generated')
        $scope.data.emailid="";
        $scope.data.password="";
        let logisticsdata = {
                                "token":response.data.token,
                                "loggedin":"true",
                                "username":response.data.name,
                                "emailid":response.data.emailid
                              }
        console.log("cookie created : "+logisticsdata)
        $cookies.putObject("logisticsdata",JSON.stringify(logisticsdata))
        $rootScope.logisticsdata=logisticsdata;
        $rootScope.loginbtn="LOGOUT"
        $rootScope.userName =$rootScope.logisticsdata.username;
        $location.path('logistics-view-orders')
      }
      })
    }
})

app.controller('vieworderctrl',function($rootScope,$scope,$location){
  console.log("controller vieworderctrl loaded")
  let undef;
  if( $rootScope.logisticsdata=="" || $rootScope.logisticsdata==undef){
    $rootScope.loginbtn="LOGIN"
    $location.path('logistics-login')
  }else {
    $rootScope.loginbtn="LOGOUT"
  }
})
