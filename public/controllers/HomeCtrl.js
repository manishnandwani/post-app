angular.module("postApp",[])
.controller("homeCtrl",['$scope',function($scope){

    $scope.getPosts = function(){
        $http.get("/list").then(function(response) {
            if(response.data.status == "success"){
                
                console.log("orgdrop",response)
            }else{
                console.log("error");
            }
            angular.element('#ajax-loader').hide();
        }); 
    }
    
    $scope.list =[1,2,3,4,5]


}])
