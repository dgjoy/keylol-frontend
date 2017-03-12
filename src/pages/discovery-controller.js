(function () {
    class DiscoveryController {
        constructor ($scope, pageHead, stateTree, $location, pageLoad, $window, $element, $http, apiEndpoint, notification) {
            pageLoad('entrance.discovery');
            if ($location.path() !== '/') {
                pageHead.setTitle('广场 - 其乐 - Keylol.com');
            } else {
                pageHead.setTitle('其乐 - 发现、解读、分享游戏的价值');
            }
            pageHead.setDescription('游戏评测社区');
            pageHead.setKeywords('其乐, steam, 游戏, 评测, 社区, 正版, 史低');

            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('DiscoveryController', DiscoveryController);
}());
