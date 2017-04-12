angular.module('app').factory('Entity', function ($resource) {
        var __apiBase__ = 'http://localhost:8080/GenericBackend/';
        return {
            Model : $resource(__apiBase__ + 'api/models/fqns'),
            User : $resource(__apiBase__ + 'api/users/:id', {id: '@id', profileId :'@profileId'},{
                getPermissions : {method : 'GET', url : __apiBase__ + 'api/userProfileRules/:profileId/allowedPermissions', isArray : true},
                changePassword : {method : 'POST', url : __apiBase__ + 'api/users/:id/changePassword', isArray : false},
                resetPassword : {method : 'POST', url : __apiBase__ + 'api/users/:id/resetPassword', isArray : false},
                activate : {method : 'POST', url : __apiBase__ + 'api/users/:id/activate', isArray : false},
                deactivate : {method : 'POST', url : __apiBase__ + 'api/users/:id/deactivate', isArray : false}
            }),
            Authentication : $resource(__apiBase__ + 'api/authentication/:id', {id: '@id', newStatus:'@newStatus'},{
                login : {method : 'POST', url : __apiBase__ + 'api/authentication/login'},
                logout : {method : 'POST', url : __apiBase__ + 'api/authentication/logout'},
                getLoggedInUser : {method : 'GET', url : __apiBase__ + 'api/authentication/loggedinUser'}
            }),
            Role : $resource(__apiBase__ + 'api/roles/:id', {id: '@id'}),
            Profile : $resource(__apiBase__ + 'api/profiles/:id', {id: '@id'}),
            UserProfileRule : $resource(__apiBase__ + 'api/userProfileRules/:id', {id: '@id', newStatus:'@newStatus'},{
                togglePermission : {method : 'POST', url : __apiBase__ + 'api/userProfileRules/:id/toggleStatus'}
            }),
            SchemeAccess : $resource(__apiBase__ + 'api/schemeAccess/:id', {id: '@id'}, {
                toggleAccess : {method : 'POST', url : __apiBase__ + 'api/schemeAccess/:id/toggleAccess'},
                switchOrganization : {method : 'POST', url : __apiBase__ + 'api/schemeAccess/:id/switchScheme'},
            }),
            UserOrganization : $resource(__apiBase__ + 'api/userOrganizations/:id', {id: '@id'}),
            Permission : $resource(__apiBase__ + 'api/permissions/:id', {id: '@id'}, {
                createPermissions : {method : 'POST', url : 'api/permissions/createPermissions'}
            }),
            UserPermission : $resource(__apiBase__ + 'api/user_permissions/:userId', {id: '@userId'}),
            SQLExecutor : $resource(__apiBase__ + 'api/sqlExecutor/:id', {id: '@id'},{
                execute : {method : 'POST', url : __apiBase__ + 'api/sqlExecutor/execute', isArray: true}
            })
        }
    }
);