(function () {
    class UnreadController {
        constructor ($scope, pageHead, stateTree, pageLoad) {
            pageHead.setTitle('未读邮件 - 其乐');
            pageLoad('post-office.unread');
            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('UnreadController', UnreadController);
}());
