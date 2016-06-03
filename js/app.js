var app = angular.module("myui", ['ngRoute']);

// define controller to use for routes
app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/persons/:id?', {
        templateUrl: 'views/persons.html',
        controller: 'Person'
      }).
      when('/sessions/:id?', {
        templateUrl: 'views/sessions.html',
        controller: 'Session'
      }).
      otherwise({
        redirectTo: '/persons'
      });
  }]);

var displayError = function (scope, errorResponse) {
  // Upate information area
  if ('undefined' === typeof scope.information || null === scope.information) {
    scope.information = {};
  }
  scope.information.showError = true;
  scope.information.showWarning = false;
  scope.information.showSuccess = false;
  scope.information.message = 'Erreur : [code ' + errorResponse.status + '] ' + errorResponse.data;
};


app.factory('httpServices', ['$http',
  function ($http) {
    var httpService = {
      asyncGet: function (path, scope) {
        var promise = $http.get(path).then(
          function (successResponse) {
            // Success
            console.log(successResponse.data);
            return successResponse.data;
          },
          function (errorResponse) {
            // Error
            console.log(errorResponse);
            displayError(scope, errorResponse);
            return errorResponse.data;
          });
        return promise;
      },
      asyncPut: function (path, data, scope) {
        var promise = $http.put(path, data)
          .then(
            function (response) {
              // Success
              return response;
            },
            function (errorResponse) {
              // Error
              displayError(scope, errorResponse);
              return null;
            });
        return promise;
      },
      asyncPost: function (path, data, scope) {
        var promise = $http.post(path, data)
          .then(
            function (response) {
              // Success
              return response;
            },
            function (errorResponse) {
              // Error
              displayError(scope, errorResponse);
              return null;
            });
        return promise;
      },
      asyncDelete: function (path, data, scope) {
        var config = {
          'method': 'DELETE',
          'url': path,
          'data': data
        };
        var promise = $http(config)
          .then(
            function (response) {
              return response;
            },
            function (errorResponse) {
              // Error
              displayError(scope, errorResponse);
              return null;
            });
        return promise;
      }
    };
    return httpService;
  }
]);

// add error message to scope if server send it
function error($scope, socket){
    socket.on('errorMessage', function(message){
        $scope.errorMessage = message;
    })
}

app.factory('apiUrl', function() {
  return {
      person : 'http://localhost:8008/api/personnes',
      session : 'http://localhost:8008/api/sessions'
      
  };
});

app.filter('getid', function () {
    function getid(string) {
      var arr =  string.split("/");
        return arr[arr.length-1];
    }
    return getid;
});
