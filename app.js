var SuDaVi = angular.module('SuDaVi',[]);

SuDaVi.controller('mainController', function($scope,sudavicode){

    sudavicode.core.init();

    $scope.template = [[6,-1,4,-1,8,3,-1,-1,7],
                    [3,9,7,5,4,1,-1,6,2],
                    [-1,8,-1,-1,7,-1,5,-1,-1],
                    [-1,6,1,-1,-1,-1,4,2,3],
                    [-1,3,8,1,2,6,9,-1,5],
                    [9,2,-1,-1,3,7,-1,1,8],
                    [-1,-1,-1,-1,-1,4,-1,-1,-1],
                    [2,4,9,-1,1,8,-1,5,6],
                    [-1,7,-1,9,5,2,3,-1,1]
                  ];
});
