/**
 * Created by kodero on 12/21/14.
 */

//list controller KeyAccountBalanceListCtrl
angular.module('app').controller('DashboardCtrl', 
    function($injector, $scope, $location, $alert, $route, UserService, Entity) {

        $scope.labels = ["July", "Aug", "Sept", "Oct", "Nov", "Dec"];
        $scope.series = ['Cash In', 'Cash Out'];
        $scope.data = [
            [65, 59, 80, 81, 56, 55],
            [28, 48, 40, 19, 86, 27]
        ];
        $scope.onClick = function (points, evt) {
            console.log(points, evt);
        };
        
        $scope.receivableStats = {};
        $scope.payableStats = {};
        
        /*//load user
        UserService.loadUser().then(function(user){
            
            //load receivables
            $scope.receivableStats = Entity['DashboardStats'].getReceivableStats({retailStoreId : user.data.attributes.retailStore.attributes.id}, function(receivableStats){
                $scope.receivableStats = receivableStats[0];
            })
            
            //load receivables
            $scope.payableStats = Entity['DashboardStats'].getPayableStats({retailStoreId : user.data.attributes.retailStore.attributes.id}, function(payableStats){
                $scope.payableStats = payableStats[0];
            })
        })*/
        
        $scope.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
        $scope.options = {
            scales: {
              yAxes: [
                {
                  id: 'y-axis-1',
                  type: 'linear',
                  display: true,
                  position: 'left'
                },
                {
                  id: 'y-axis-2',
                  type: 'linear',
                  display: true,
                  position: 'right'
                }
              ]
            }
        };

    }
);