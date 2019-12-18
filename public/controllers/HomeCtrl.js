angular.module("postApp",[])

.controller("homeCtrl",['$scope','$http',function($scope,$http){
    $scope.flag = 1
    $scope.spinner = false
    $scope.addSpinner = false
    $scope.upVoteSpinner = false
    $scope.getPosts = function(){
    $scope.spinner = true        
        $http({
            method: 'GET',
            url: "/list",
            headers: {
                "Content-Type": "text/plain",
                "X-Login-Ajax-call": 'true',
                "Access-Control-Allow-Origin": null
            }
        }).then(function(response) {
            $scope.spinner = false
            console.log("get",response)
            // if(response.data.status == "success"){
            //     $scope.list = response.data
            //     console.log("orgdrop",response)
            // }else{
            //     console.log("error");
            // }
        }).catch(function(err){
            $scope.spinner = false        

            console.log("err",err)
        })
    }
    $scope.getPosts()
    $scope.list = [{name :"1",createdOn : new Date(),votes : 1}]

    $scope.addPost = function(){
        $scope.addSpinner = true        
        $http.post("/add",{name: $scope.post},{
            headers: {'Content-Type': 'text/plain'}
		}).then(function(response){
            $scope.addSpinner = false        
            $scope.getPosts()
            console.log("add",response)
        }).catch(function(err){
            $scope.addSpinner = false        
            console.log(err)
        })
    }

    $scope.upVote = function(item){
        console.log("test item",item)
        $scope.upVoteSpinner = true
        $http.put('/edit',{name : item.name, votes : item.votes++}).then(function(response){
            console.log("add",response)
            $scope.upVoteSpinner = false
            $scope.getPosts()
        }).catch(function(err){
            $scope.upVoteSpinner = false
            console.log(err)
        })
    }

}])

