(function () {
    class IntelController {
        constructor ($scope, pageHead, stateTree, pageLoad, $state) {
            pageHead.setTitle('据点 - 情报 - 其乐');

            let fetchPromise;
            if (stateTree.empty || stateTree.aggregation && stateTree.aggregation.point
                && stateTree.aggregation.point.basicInfo && stateTree.aggregation.point.basicInfo.idCode === $state.params.point_id_code ) {
                fetchPromise = pageLoad('aggregation.point.intel');
            } else {
                fetchPromise = pageLoad('aggregation.point', { entrance: 'Intel' });
            }
            fetchPromise.then(() => {
                $scope.theme = {
                    main: stateTree.aggregation.point.basicInfo.themeColor,
                    light: stateTree.aggregation.point.basicInfo.lightThemeColor,
                    logo: stateTree.aggregation.point.basicInfo.logo,
                };
            });
            
            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('IntelController', IntelController);
}());
