(function () {
    class UnreadController {
        constructor ($scope, pageHead, stateTree, pageLoad) {
            pageHead.setTitle('未读 - 邮政 - 其乐');
            pageLoad('post-office.unread');
            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('UnreadController', UnreadController);
}());
