(function () {
    class IntelController {
        constructor ($scope, pageHead, stateTree, $location, pageLoad, $stateParams) {
            pageHead.setTitle('据点 - 情报 - 其乐');
            pageLoad('aggregation.point.intel');
            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('IntelController', IntelController);
}());
