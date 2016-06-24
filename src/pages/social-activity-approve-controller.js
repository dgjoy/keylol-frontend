(function () {
    class SocialActivityApproveController {
        constructor ($scope, pageHead, stateTree, pageLoad) {
            pageHead.setTitle('社交 - 邮政 - 其乐');
            pageLoad('post-office.social-activity.like');
            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('SocialActivityApproveController', SocialActivityApproveController);
}());
