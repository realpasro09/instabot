'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider, $scope) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', function($scope, $http) {
  $scope.getAccess = function() {
    $http.get("http://localhost:8000/authorize_user")
    .then(function(response) {
        $scope.accessToken = response.data;
    });
  };
});