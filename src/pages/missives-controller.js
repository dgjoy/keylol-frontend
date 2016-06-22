(function () {
    class MissivesController {
        constructor ($scope, pageHead, stateTree, pageLoad) {
            pageHead.setTitle('公函 - 邮政 - 其乐');
            pageLoad('post-office.missive');
            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('MissivesController', MissivesController);
}());
