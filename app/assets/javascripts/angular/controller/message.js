var message_app = angular.module('messageApp', ['ngRoute', 'ngResource','templates']);

message_app.factory('Messagess', ['$resource',function($resource){
    return $resource('messages.json', {},{
        query: { method: 'GET', isArray: true },
        create: { method: 'POST' }
    })
}]);

message_app.factory('Message', ['$resource', function($resource){
    return $resource('messages/:id.json', {}, {
        show: { method: 'GET' },
        update: { method: 'PUT', params: {id: '@id'} },
        delete: { method: 'DELETE', params: {id: '@id'} }
    });
}]);

//Controller
message_app.controller("MessageListController", ['$scope', '$http', '$resource', 'Messages', 'Message', '$location', function($scope, $http, $resource, Users, message, $location) {

    $scope.messages = Messages.query(function(){
        $scope.messages = $scope.messages;
    });


}]);

function NgChatCtrl($scope) {
    // Our server to connect to
    var server = new ServerChannel('http://127.0.0.1:8002');
    var side = 'left';

    // Messages, client info & sending
    $scope.messages = [];
    $scope.sendMessage = function () {
        server.sendNgChatMessage($scope.messageBox);
        $scope.messageText = "";
    };

    // Occurs when we receive chat messages
    server.ngChatMessagesInform = function (p) {
        $scope.messages.push({
            avatar: "data:image/png;base64," + p.avatar.toBase64(),
            text: p.message,
            side: side
        });
        $scope.$apply();

        // Animate
        $("#viewport-content").animate({
            bottom: $("#viewport-content").height() - $("#viewport").height()
        }, 250);

        // flip the side
        side = side == 'left' ? 'right' : 'left';
    };

    // Once connected, we need to join the chat
    server.onConnect(function () {
        server.joinNgChat();
    });
}

message_app.controller("MessageAddController", ['$scope', '$resource', 'Messages', '$location', function($scope, $resource, Messages, $location) {
    $scope.save = function () {
        if ($scope.messageBox.$valid){
            $scope.message = {message:$scope.messageBox.message};
            $scope.id_address = {ip_address: /*get the ip address and put it in here"};
            Messages.create({message: $scope.message}, function(){
                $location.path('/users');
            }, function(error){
                console.log(error)
            });
        }
    }
}]);

//Routes
message_app.config([
    '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.when('/messages',{
            templateUrl: 'messages/index.html',
            controller: 'MessageListController'
        });
        $routeProvider.otherwise({
            redirectTo: '/users'
        });
    }
]);
