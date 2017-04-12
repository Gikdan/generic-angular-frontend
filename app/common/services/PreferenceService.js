'use strict'

angular.module('app').factory('PreferenceService', function($rootScope, $http, $q) {
    var ret = {
        prefsLoaded : false,
        prefs : {
            attributes : {}
        },
        isPrefEnabled : function(code){
            if(!ret.prefsLoaded) return false;
            return this.prefs.attributes[code] === true || this.prefs.attributes[code] === 'true';
        },
        getPrefValue : function(code){
            if(!this.prefsLoaded) return '';
            return this.prefs.attributes[code];
        }
    };

    function loadPrefs(){
        if(ret.prefsLoaded) return $q.resolve({data : ret.prefs});
        var $promise = $http.get('./resources/preferenceValues/compact');
        $promise.then(function(data) {
            ret.prefs = data.data;
            ret.prefsLoaded = true;
        });
        return $promise;
    };

    ret.loadPrefs = loadPrefs;
    loadPrefs();//eager load the preferences
    return ret;
});