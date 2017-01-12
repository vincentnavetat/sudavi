var SuDaVi = angular.module('SuDaVi',[]);

SuDaVi.controller('mainController', function($scope,sudavicode){
    
    sudavicode.core.init();

});