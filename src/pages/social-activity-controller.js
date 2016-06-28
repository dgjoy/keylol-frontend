(function () {
    class SocialActivityController {
        constructor($scope, pageHead, $state, $location) {
            pageHead.setTitle('社交 - 邮政 - 其乐');

            $scope.tabArray = [
                { state: '.reply', name: '回复' },
                { state: '.approve', name: '认可' },
                { state: '.follower', name: '听众' },
            ];
            $scope.$watch(() => {
                return $state.current.name;
            }, () => {
                const subState = $state.current.name.substr(28);
                switch (subState) {
                    case 'reply' :
                        $scope.currentPage = 0;
                        break;
                    case 'approve' :
                        $scope.currentPage = 1;
                        break;
                    case 'follower' :
                        $scope.currentPage = 2;
                        break;
                }
            });
        }
    }

    keylolApp.controller('SocialActivityController', SocialActivityController);
}());
