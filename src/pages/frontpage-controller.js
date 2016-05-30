(function () {
    class FrontpageController {
        constructor ($scope, pageHead, stateTree, pageLoad, $location, $state) {
            pageHead.setTitle('据点 - 扉页 - 其乐');
            if (!$location.url().match(/\/point\/[^\/]*\/?$/)) {
                if (stateTree.aggregation && stateTree.aggregation.point
                    && stateTree.aggregation.point.idCode === $state.params.point_id_code ) {
                    pageLoad('aggregation.point.frontpage');
                } else {
                    pageLoad('aggregation.point', { entrance: 'Frontpage' }).then(result => {
                        if (result) {
                            result.idCode = $state.params.point_id_code;
                        }
                    });
                }
            }
            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('FrontpageController', FrontpageController);
}());
