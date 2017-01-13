var SuDaVi = angular.module('SuDaVi',[]);

SuDaVi.controller('mainController', function($scope,sudavicode){

    $scope.onKeyNumber = function($event){
        var key = $event.keyCode;
        console.log(key);
        console.log($event);

        var el = $event.srcElement;
        if(el.id.indexOf("element") > -1){
            if(el.value != "")
            {
                var x = parseInt(el.attributes.x.value);
                var y = parseInt(el.attributes.y.value);
                var value = parseInt(el.value);

                var isValid = sudavicode.core.isValidNumberInXY(x,y,value);
                console.log(isValid);
                if(isValid){
                    el.style.backgroundColor = "#009900";
                }else{
                    el.style.backgroundColor = "#E50000";
                }
            }
        }

    }

    sudavicode.core.init();

    $scope.template = sudavicode.core.getTemplate();

});
