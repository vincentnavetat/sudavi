var SuDaVi = angular.module('SuDaVi',[]);

SuDaVi.controller('mainController', function($scope,$timeout,sudavicode){

    //Init SuDaVi
    sudavicode.core.init();
    $scope.template = sudavicode.core.getUserMatrix();
    $scope.Attempts = sudavicode.core.getAttempts();

    //Events
    $scope.onKeyNumber = function($event){
        var key = $event.keyCode;
        // console.log(key);
        // console.log($event);

        var el = $event.srcElement;
        if(el.id.indexOf("element") > -1){
            if(el.value != "")
            {
                var x = parseInt(el.attributes.x.value);
                var y = parseInt(el.attributes.y.value);
                var value = parseInt(el.value);

                var isValid = sudavicode.core.isValidNumberInXY(x,y,value);
                var attempts = sudavicode.core.getAttempts();

                if(!isValid) {
                    el.style.backgroundColor = "#E58080";
                    var element = document.body;
                    if(attempts > 1){
                        element.classList.remove("mistake-" + (attempts - 1));
                    }
                    element.classList.add("mistake-" + attempts);
                }
                $scope.Attempts = attempts;
                $scope.AreYouDone = sudavicode.core.isDone($scope.template);
                if($scope.AreYouDone){
                    alert("yep");
                }
            }
        }
    }

    $scope.onSolution = function($event){
        var solutionMatrix = sudavicode.core.getSolutionMatrix();
        for(var x = 0; x < sudavicode.core.maxLength; x++)
        {
            for(var y = 0; y < sudavicode.core.maxLength; y++)
            {
                document.getElementById("element["+x+"]["+y+"]").value = solutionMatrix[x][y].n;
            }
        }

        document.getElementById('solution-popup').style.display = 'block';
    }
});
