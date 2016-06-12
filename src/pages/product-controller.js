(function () {
    class ProductController {
        constructor ($scope, pageHead, stateTree, pageLoad, $state) {
            pageHead.setTitle('据点 - 作品 - 其乐');

            if (stateTree.empty || stateTree.aggregation && stateTree.aggregation.point
                && stateTree.aggregation.point.basicInfo && stateTree.aggregation.point.basicInfo.idCode === $state.params.point_id_code ) {
                pageLoad('aggregation.point.product');
            } else {
                pageLoad('aggregation.point', { entrance: 'Product' });
            }
            
            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('ProductController', ProductController);
}());
