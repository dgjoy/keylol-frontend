(function () {
    class IntelController {
        constructor ($scope, pageHead, stateTree, pageLoad, $state) {
            pageHead.setTitle('据点 - 情报 - 其乐');

            if (stateTree.empty || stateTree.aggregation && stateTree.aggregation.point
                && stateTree.aggregation.point.basicInfo && stateTree.aggregation.point.basicInfo.idCode === $state.params.point_id_code ) {
                pageLoad('aggregation.point.intel');
            } else {
                pageLoad('aggregation.point', { entrance: 'Intel' });
            }
            
            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('IntelController', IntelController);
}());
