(function () {
    class IntelController {
        constructor ($scope, pageHead, stateTree, pageLoad, $state) {
            pageHead.setTitle('据点 - 情报 - 其乐');

            if (stateTree.empty || stateTree.aggregation && stateTree.aggregation.point
                && stateTree.aggregation.point.idCode === $state.params.point_id_code ) {
                pageLoad('aggregation.point.intel');
            } else {
                pageLoad('aggregation.point', { entrance: 'Intel' }).then(result => {
                    if (result) {
                        result.idCode = $state.params.point_id_code;
                    }
                });
            }
            
            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('IntelController', IntelController);
}());
