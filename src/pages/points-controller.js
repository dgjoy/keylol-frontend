(function () {
    class PointsController {
        constructor ($scope, pageHead, stateTree) {
            pageHead.setTitle('据点 - 其乐 - Keylol.com');
            pageHead.setDescription('游戏评测社区');
            pageHead.setKeywords('广场, steam, 游戏, 评测, 社区, 正版, 史低');
            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('PointsController', PointsController);
}());
