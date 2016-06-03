(function () {
    class SocialActivityController {
        constructor($scope, pageHead, stateTree, $state, $location, $timeout) {
            pageHead.setTitle('社交 - 邮政 - 其乐');
            console.log($location.url());
            if ($location.url().match(/\/social-activity\/?$/)) {
                $timeout(() => {
                    $state.go('.approve', {}, { location: false });
                });
            }

            $scope.tabArray = [
                { state: '.approve', name: '认可' },
                { state: '.follower', name: '听众' },
                { state: '.invitation', name: '邀评' },
                { state: '.reply', name: '回复' },
            ];
            $scope.$watch(() => {
                return $state.current.name;
            }, () => {
                const subState = $state.current.name.substr(26);
                switch (subState) {
                    case 'approve' :
                        $scope.currentPage = 0;
                        break;
                    case 'follower' :
                        $scope.currentPage = 1;
                        break;
                    case 'invitation' :
                        $scope.currentPage = 2;
                        break;
                    case 'reply' :
                        $scope.currentPage = 3;
                        break;
                }
            });
        }
    }

    keylolApp.controller('SocialActivityController', SocialActivityController);
}());
