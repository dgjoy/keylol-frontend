(function () {
    class IntelController {
        constructor ($scope, pageHead, stateTree, $location, pageLoad, $stateParams) {
            pageHead.setTitle('据点 - 情报 - 其乐');

            if (!$location.url().match(/\/point\/[^\/]*\/?$/)) {
                if (stateTree.aggregation && stateTree.aggregation.point
                    && stateTree.aggregation.point.idCode === $state.params.point_id_code ) {
                    pageLoad('aggregation.point.intel');
                } else {
                    pageLoad('aggregation.point', { entrance: 'Intel' }).then(result => {
                        if (result) {
                            result.idCode = $state.params.point_id_code;
                        }
                    });
                }
            }
            
            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('IntelController', IntelController);
}());
