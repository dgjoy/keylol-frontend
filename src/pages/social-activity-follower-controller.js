(function () {
    class SocialActivityFollowerController {
        constructor ($scope, pageHead, stateTree, pageLoad) {
            pageHead.setTitle('听众 - 社交 - 邮政 - 其乐');
            pageLoad('post-office.social-activity.subscriber');
            $scope.stateTree = stateTree;
        }
    }

    keylolApp.controller('SocialActivityFollowerController', SocialActivityFollowerController);
}());
