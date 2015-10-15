(function () {
    "use strict";

    keylolApp.controller("OperationFeedbackController", [
        "$scope", "close", "data", "$timeout",
        function ($scope, close, data, $timeout) {
            $scope.data = data;
            if($scope.data.type != "attention"){
                $timeout(function(){
                    close();
                }, 3000);
            }
            $scope.close = function(){
                close();
            }
        }
    ]);
})();