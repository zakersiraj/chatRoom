var user_app = angular.module('userApp', ['ngRoute', 'ngResource','templates']);

user_app.factory('Users', ['$resource',function($resource){
    return $resource('users.json', {},{
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
}]);

user_app.factory('User', ['$resource', function($resource){
    return $resource('users/:id.json', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    });
}]);

//Controller
user_app.controller("UserListController", ['$scope', '$http', '$resource', 'Users', 'User', '$location', function($scope, $http, $resource, Users, User, $location) {

    $scope.users = Users.query(function(){
        $scope.users = $scope.users;
    });


}]);

//Routes
user_app.config([
    '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.when('/users',{
            templateUrl: 'users/index.html',
            controller: 'UserListController'
        });
        $routeProvider.otherwise({
            redirectTo: '/users'
        });
    }
]);
