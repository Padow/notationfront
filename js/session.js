app.controller("Session",function($scope, httpServices, apiUrl, $routeParams) {

    var id = $routeParams.id;

    
    if(id === undefined){
        console.log(apiUrl.session);
        $scope.sessionlist = httpServices.asyncGet(apiUrl.session, $scope);
    }else{
        $scope.session = httpServices.asyncGet(apiUrl.session+'/'+id, $scope);
    }

    $scope.getSession = function(data){
        $scope.sessiondata = []
        for (var i = data.length - 1; i >= 0; i--) {
            $scope.sessiondata.push(httpServices.asyncGet(data[i], $scope));
        };
    }

    $scope.getTeacher = function(uri){
    	$scope.teacher = httpServices.asyncGet(uri, $scope);
    }

    $scope.getIntern = function(uri){
    	$scope.interns = [];
    	for (var i = uri.length - 1; i >= 0; i--) {
            $scope.interns.push(httpServices.asyncGet(uri[i], $scope));
        };
    }

})