app.controller("Person",function($scope, httpServices, apiUrl, $routeParams) {

    var id = $routeParams.id;
    
    if(id === undefined){
        $scope.personlist = httpServices.asyncGet(apiUrl.person, $scope);

    }else{
        $scope.person = httpServices.asyncGet(apiUrl.person+'/'+id, $scope);
    }

    $scope.getPerson = function(data){
        $scope.persondata = []
        for (var i = data.length - 1; i >= 0; i--) {
            $scope.persondata.push(httpServices.asyncGet(data[i], $scope));
        };
    }

    $scope.deleteUser = function(id){
        var response = httpServices.asyncDelete(apiUrl.person+'/'+id, $scope);   
        console.log(response);
        // location.reload();    
    }

    $scope.addperson = function(data){
        var response = httpServices.asyncPost(apiUrl.person, data, $scope);   
        console.log(response);
        // location.reload();
    }

})