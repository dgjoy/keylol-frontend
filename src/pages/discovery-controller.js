(function () {
    class DiscoveryController {
        constructor ($scope, pageHead, stateTree) {
            pageHead.setTitle('广场 - 其乐');

            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('DiscoveryController', DiscoveryController);
}());
