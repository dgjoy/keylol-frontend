﻿(function () {
    class DiscoveryController {
        constructor ($scope, pageHead, stateTree, $location, pageLoad) {
            pageHead.setTitle('广场 - 其乐');
            if ($location.path() !== '/') {
                pageLoad('entrance.discovery');
            }

            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('DiscoveryController', DiscoveryController);
}());
