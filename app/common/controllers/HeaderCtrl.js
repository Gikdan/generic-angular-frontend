'use strict'

angular.module('app').controller('HeaderCtrl', function ($rootScope, $window, $scope, $location, $http, $timeout, $alert, $popover, $modal, $websocket, PrinterService, PreferenceService, UserService, PermissionService, Entity) {
    $scope.user = 'Guest';
    $scope.preferenceService = PreferenceService;
     //logout
     $scope.logout = function () {
         console.log('Logging out..');
         Entity['Authentication'].logout({}, function(){
            UserService.isLoggedIn = false;
            $window.localStorage.Ezen_token = undefined;
            $alert({
                title: 'Success!',
                content: 'You have logged out of Ezen, you now be redirected to the login page in 3 seconds.',
                duration : 525,
                html : true,
                placement: 'top',
                type: 'info',
                show: true,
                animation: 'am-fade-and-slide-top'
             });
             $timeout(function(){
                $('#login').css("display", "inline-block");
                $('#wrapper').css("display", "none");
             }, 2000);
         })
     };

     $scope.permissionService = PermissionService;
     PermissionService.loadNavPermissions('User.list');

     $scope.notifications = [];

     var initialiseWs = function(user){
        var wsProtocol = $location.protocol() === 'http' ? 'ws' : 'wss';
        var ws = $websocket(wsProtocol + '://' + $location.host() + ':8080' + (($location.absUrl().split('#')[0].indexOf('/Ezen') >= 0)? '/ezen/streams/' : '/ezen/streams/') + user.attributes.id);

        ws.onOpen(function () {
            console.log('WebSocket open!');
        });

        ws.onMessage(function (data) {
            console.log('The websocket server has sent the following data: ' + data);
            var _data = eval('(' + data + ')');
            $scope.notifications.splice(0,0,_data);
            $scope.notificationCount = $scope.notificationCount - 1 + 2;
             $alert({
                title: _data.attributes.notificationEventType.name,
                content: '' + _data.attributes.eventMsg,
                duration : 10,
                html : true,
                placement: 'top',
                type: 'info',
                show: true,
                animation: 'am-fade-and-slide-top'
            });
            document.getElementById('notificationEventAudio').play();
        });

        ws.onClose(function () {
            console.log('Websocket connection closed!');
        });

        $scope.ws = ws;
     }

     //dismiss notification
     $scope.dismiss = function(notification, idx){
         Entity['NotificationEvent'].dismiss({id : notification.attributes.id}, function(res){
            $scope.notifications.splice(idx, 1);
            $scope.notificationCount = $scope.notificationCount - 1;
            loadNotifications(UserService.user);
         })
     }

     //dismiss notification
     $scope.view = function(notification){
         /*Entity['NotificationEvent'].dismiss({notification.attributes.id}, function(){
            $scope.notifications.splice(idx, 1);
         })*/
     }

     $scope.notifications = [];
     $scope.notificationCount = 0;

     //get notifications
     var loadNotifications = function(user){
         var where = ['dismissed,=,false', 'baseRetailStore.id,=,' + user.attributes.retailStore.attributes.id]
         Entity['NotificationEvent'].query({fields : 'id,notificationEventType,userName,userEmail,dismissed,eventMsg,eventLevel,time,eventUrl', pageSize : 10, where : where, orderBy : '-createdAt'}, function(notifications, headers){
            $scope.notifications = notifications;
            $scope.notificationCount = headers("totalCount");
         })
     }

     //get currently logged in user
     $scope.getUserDetails = function(){
        Entity['Authentication'].getLoggedInUser({}, function(data, status){
            $scope.user = data.attributes.firstName + ' ' + data.attributes.lastName;
                UserService.isLoggedIn = true;
                UserService.user = data;
                $rootScope.$emit('loggedInUser');
                //initialiseWs(data);
                //loadNotifications(data);
                //do away with login page
                $('.animated-container').remove();
                $('#login').css("display", "none");
                $('#wrapper').css("display", "inline-block");

                //initialize ws
                initialiseWs(data);
        }, function(){
            //currently logged in user failed
            $('.animated-container').remove();
            $('#login').css("display", "inline-block");
            $('#wrapper').css("display", "none");
        })
     };

     $scope.userService = UserService;

     //change pwd
     var changePwdModal = $modal({scope: $scope, templateUrl: './resources/frontendResources/views.inventory/changePassword-modal.html', show: false, animation : 'am-fade-and-slide-top'});
     $scope.showChangePasswordWindow = function(){
        $scope.credentials = {
            attributes : {
                id : UserService.user.attributes.id
            }
        }
        changePwdModal.$promise.then(changePwdModal.show);
     }

     //change password
     $scope.changePassword = function(user){
        Entity['User'].changePassword({id : user.attributes.id, currentPassword : user.attributes.currentPassword, newPassword : user.attributes.newPassword, confirmPassword : user.attributes.confirmPassword}, {}, function(){
            $alert({
                title: 'Success!', content: 'Password changed!', duration : 3, html : true, placement: 'top', type: 'success', show: true, animation: 'am-fade-and-slide-top'
            });
        })
     }

     //printer config
     var changePrinterConfigModal = $modal({scope: $scope, templateUrl: './resources/frontendResources/views.inventory/printerConfig.modal.html', show: false, animation : 'am-fade-and-slide-top'});
     $scope.showChangePasswordWindow = function(){
        $scope.printerConfig = {
            host : $window.localStorage.printerHost,
            name : $window.localStorage.printerName
        }
        changePrinterConfigModal.$promise.then(changePrinterConfigModal.show);
     }

     //save printer
     $scope.savePrinterConfig = function(printerConfig){
        $window.localStorage.printerHost = printerConfig.host;
        $window.localStorage.printerName = printerConfig.name;
        $alert({
            title: 'Success!', content: 'Config changed!', duration : 3, html : true, placement: 'top', type: 'success', show: true, animation: 'am-fade-and-slide-top'
        });
     }

     $scope.testPrinterConfig = function(){
        PrinterService.configurePrinter();
     }

     $scope.entity = {};
     $scope.entityIdx = undefined;

     $scope.$on('initialised', function(){
        $scope.getUserDetails();
     })

     $scope.$on('userLoggedIn', function(){
        $('.animated-container').remove();
        $('#login').css("display", "none");
        $('#wrapper').css("display", "inline-block");
     })

     //switch organization
     var switchOrganizationModal = $modal({scope: $scope, templateUrl: './resources/frontendResources/views.admin/switchOrg-modal.html', show: false, animation : 'am-fade-and-slide-top'});

     $scope.switchOrganization = function(entity){
         switchOrganizationModal.$promise.then(switchOrganizationModal.show);
         $scope.loadOrgAccess();
     }

     $scope.search = {};

     //load org access
     $scope.loadOrgAccess = function(){
        var where = ['allowed,=,true', 'user.id,=,' + UserService.user.attributes.id];
        if($scope.search.orgName) where.push('retailStore.name,LIKE,' + $scope.search.orgName);
        $scope.orgAccesses = Entity['OrganizationAccess'].query({userId : UserService.user.attributes.id, fields : 'id,retailStore:id,retailStore:name,retailStore:orgType,allowed,retailStore:headOffice<id;name>', orderBy : 'retailStore:name', where : where})
     }

     //save initial stock
     $scope.saveCurrentOrg = function(selectedOrg){
         Entity['OrganizationAccess'].switchOrganization({id : selectedOrg.attributes.id}, {}, function(){
             UserService.user.attributes.retailStore = selectedOrg.attributes.retailStore;
             loadNotifications(UserService.user);
             $location.path('/');
             //re-initialize ws
             $scope.ws.$close();
             initialiseWs(UserService.user);
         })
     }
 });