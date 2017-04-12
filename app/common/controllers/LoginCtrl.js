angular.module('app').controller('LoginCtrl', function ($rootScope, $scope, $location, $http, $window, Entity, UserService) {
        $scope.user = {};
        $scope.loginFailureMsg = '';
        $scope.login = function (user) {
            $scope.loginFailureMsg = '';
            Entity['Authentication'].login({}, user, function(data, status){
                $window.localStorage.GF_token = data.encryptionKey;
                UserService.isLoggedIn = true;
                UserService.name = data.encryptionKey;
                $rootScope.$broadcast('userLoggedIn');
                $scope.user = {};                
            }, function(){
                $scope.loginFailureMsg = 'Sorry, the login details provided are not correct!';
            })
        };
});