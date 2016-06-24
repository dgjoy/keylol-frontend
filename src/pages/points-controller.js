(function () {
    class PointsController {
        constructor ($scope, pageHead, stateTree) {
            pageHead.setTitle('据点 - 其乐');
            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('PointsController', PointsController);
}());
