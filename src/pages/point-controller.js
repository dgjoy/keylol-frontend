(function () {
    class PointController {
        constructor ($scope, stateTree, $location, pageLoad, $state, pageHead) {
            $scope.stateTree = stateTree;

            if ($location.path().match(/\/point\/[^\/]*\/?$/)) {
                pageLoad('aggregation.point', { entrance: 'auto' }).then(result => {
                    if (result.current === 'frontpage') {
                        pageHead.setTitle(`${stateTree.aggregation.point.basicInfo.chineseName || stateTree.aggregation.point.basicInfo.englishName} - 扉页 - 其乐`);
                    } else {
                        pageHead.setTitle(`${stateTree.aggregation.point.basicInfo.chineseName || stateTree.aggregation.point.basicInfo.englishName} - 轨道 - 其乐`);
                    }
                    
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
