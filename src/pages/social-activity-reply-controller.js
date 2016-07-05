(function () {
    class SocialActivityReplyController {
        constructor ($scope, pageHead, stateTree, pageLoad) {
            pageHead.setTitle('回复 - 社交 - 邮政 - 其乐');
            pageLoad('post-office.social-activity.comment');
            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('SocialActivityReplyController', SocialActivityReplyController);
}());
