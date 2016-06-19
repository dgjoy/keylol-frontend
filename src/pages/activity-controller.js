(function () {
    class ActivityController {
        constructor (pageHead, pageLoad, $scope, stateTree) {
            pageHead.setTitle('动态 - 其乐');
            pageLoad('content.activity');

            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('ActivityController', ActivityController);
}());
