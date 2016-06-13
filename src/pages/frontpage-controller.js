(function () {
    class FrontpageController {
        constructor ($scope, pageHead, stateTree, pageLoad, $location, $state) {
            pageHead.setTitle('据点 - 扉页 - 其乐');
            let fetchPromise;
            if (!$location.url().match(/\/point\/[^\/]*\/?$/)) {
                if (stateTree.empty || (stateTree.aggregation && stateTree.aggregation.point
                    && stateTree.aggregation.point.basicInfo && stateTree.aggregation.point.basicInfo.idCode === $state.params.point_id_code) ) {
                    fetchPromise = pageLoad('aggregation.point.frontpage');
                } else {
                    fetchPromise = pageLoad('aggregation.point', { entrance: 'Frontpage' });
                }
                fetchPromise.then(() => {
                    $scope.theme = {
                        main: stateTree.aggregation.point.basicInfo.themeColor,
                        light: stateTree.aggregation.point.basicInfo.lightThemeColor,
                        logo: stateTree.aggregation.point.basicInfo.logo,
                    };
                });
            }
            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('FrontpageController', FrontpageController);
}());
