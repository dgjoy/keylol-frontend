(function () {
    keylolApp.controller("RelatedPointsController", [
        "$scope", "union", "utils",
        ($scope, union, utils) => {
            $scope.union = union;
            $scope.utils = utils;
        },
    ]);
}());
