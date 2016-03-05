(function () {
    "use strict";

    keylolApp.controller("SyncLoadingController", [
        "$scope", "close", "$timeout",
        function ($scope, close, $timeout) {
            var staticGroup = ["A","B","C","D","E","F","G","H","I","J","K","L","M","O","P","Q"];
            $scope.animateGroup = staticGroup.slice();
            $scope.animateIndex = -1;
            $scope.changeFlag = true;
            var timeoutFunction = function(){
                $scope.changeFlag = !$scope.changeFlag;
                $scope.animateGroup.splice($scope.animateIndex, 1);
                if($scope.animateGroup.length === 0){
                    $scope.animateGroup = staticGroup.slice();
                }
                $scope.animateIndex = Math.floor(Math.random()*$scope.animateGroup.length);
                console.log($scope.animateIndex);
                $timeout(timeoutFunction,2000);
            };
            $timeout(timeoutFunction,100);
        }
    ]);
})();