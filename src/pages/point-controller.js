(function () {
    class PointController {
        constructor ($scope, stateTree, $location, pageLoad, $state) {
            $scope.stateTree = stateTree;

            if ($location.url().match(/\/point\/[^\/]*\/?$/)) {
                pageLoad('aggregation.point', { entrance: 'auto' }).then(() => {
                    $scope.theme = {
                        main: stateTree.aggregation.point.basicInfo.themeColor,
                        light: stateTree.aggregation.point.basicInfo.lightThemeColor,
                        logo: stateTree.aggregation.point.basicInfo.logo,
                    };
                });
            }
            $scope.$watch('stateTree.aggregation.point.basicInfo', newValue => {
                if (newValue) {
                    newValue.idCode = $state.params.point_id_code;
                }
            });
        }
    }

    keylolApp.controller('PointController', PointController);
}());
