'use strict'

angular.module('app').factory('PermissionService', function($rootScope, $http) {
    var _scopePermissions = [];
    var _navPermissions = [];

    //load scope permissions
    var _loadScopePermissions = function(permissionFilter){
        _scopePermissions = [];
        //load the permissions
        $http.get('./resources/userProfileRules/loadUserPermissions/' + permissionFilter).then(function(result){
            console.log('checking permissions in ' + JSON.stringify(result));
            _scopePermissions = result.data;
        })
    };

    //load nav permissions
    var _loadNavPermissions = function(permissionFilter){
        _navPermissions = [];
        //load the permissions
        $http.get('./resources/userProfileRules/loadUserPermissions/' + permissionFilter).then(function(result){
            console.log('Returned permissions ' + JSON.stringify(result));
            _navPermissions = result.data;
        })
    };

    //check scope permissions
    var _checkScopePermission = function(permission){
        if( _scopePermissions.indexOf(permission) >= 0) return true;
        return false;
    };

    //check nav permissions
    var _checkNavPermission = function(permission){
        if( _navPermissions.indexOf(permission) >= 0) return true;
        return false;
    };

    return {
        loadScopePermissions : _loadScopePermissions,
        checkScopePermission : _checkScopePermission,

        //nav
        loadNavPermissions : _loadNavPermissions,
        checkNavPermission : _checkNavPermission
    };
});