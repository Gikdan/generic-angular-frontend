angular.module('app').factory('ReportViewerService', function($rootScope, $modal) {
    var _viewReport = function($scope, reportName, reportParams){
        $scope.reportUrl = './frameset?__navigationbar=true&__report=' + reportName + '&' + jQuery.param( reportParams );
        // Pre-fetch an external template populated with a custom scope
        var reportViewerModal = $modal({scope : $scope, template: './views/common/modal/reportViewer.modal.tpl.html', show: false});
        reportViewerModal.$promise.then(reportViewerModal.show);
    };
    var _printReport = function(reportName, reportParams, format){
        var format = format || 'html';
        var reportUrl = './output?__navigationbar=true&__report=' + reportName + '&' + jQuery.param( reportParams ) + '&__format=' + format;
        var win = window.open(reportUrl, '_blank');
        if(format === 'html') win.print();
    };
    return {
        viewReport : _viewReport,
        printReport : _printReport
    };
});