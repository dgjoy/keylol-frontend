(function () {
    class FrontpageController {
        constructor ($scope, $rootScope, pageHead, loadResult, stateTree) {
            pageHead.setTitle('广场 - 其乐');

            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('FrontpageController', FrontpageController);
}());
