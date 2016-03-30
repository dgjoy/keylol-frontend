(function () {
    "use strict";

    keylolApp.controller("CouponContentController", [
        "$scope", "union", "window", "utils", "$location",
        function ($scope, union, window, utils, $location) {
            $scope.page = $location.hash();
            $scope.$watch("page", function (newPage) {
                //noinspection JSValidateTypes
                if(newPage !== "records" && newPage !== "ranks" && newPage !== "invite" ){
                    $scope.page = "records";
                }
            });
            $scope.setPage = function (page) {
                $scope.page = page;
            }
        }
    ]);
})();