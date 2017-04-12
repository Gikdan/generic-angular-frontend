angular.module('app').factory('PrinterService', function($window) {
    var returnObject = {
        connected : false
    };
    var _configurePrinter = function($scope){
        var host = $window.localStorage.printerHost || 'localhost';
        var name = $window.localStorage.printerName || 'GP-Thermal';
        console.log('Defining QZ print...host : ' + host + ', Name : ' + name);

        qz.websocket.connect({host : host}).then(function() {
            console.log('Qz connected...now finding printers');
            return qz.printers.find(name);             // Pass the printer name into the next Promise
        }).then(function(printer) {
            var config = qz.configs.create(printer);       // Create a default config for the found printer
            returnObject.printerConfigured = true;
            returnObject.printerConfig = config; //store the printer config in the $rootScope
            returnObject.print = function(data){
                qz.print(returnObject.printerConfig, data);
            }
        }).catch(function(e) { console.error(e); });
    };
    returnObject.connect = function(){
        if(!qz.websocket.isActive()){
            qz.websocket.connect({}).then(function(){
                returnObject.connected = true;
            })
        }
    };

    returnObject.disconnect = function(){
        if(qz.websocket.isActive()){
            qz.websocket.disconnect();
            returnObject.connected = false;
        }
    };

    returnObject.findPrinter = function(name){
        if(qz.websocket.isActive()){
            qz.printers.find(name).then(function(printer) {
                var config = qz.configs.create(printer);       // Create a default config for the found printer
                returnObject.printerConfigured = true;
                returnObject.printerConfig = config; //store the printer config in the $rootScope
                returnObject.print = function(data){
                    qz.print(returnObject.printerConfig, data);
                }
                console.log('Printer' + JSON.stringify(printer));
            }).catch(function(e) {
                console.error(e);
                returnObject.printerFound = false;
            });
        }
    };

    returnObject.configurePrinter = _configurePrinter;
    return returnObject;
});