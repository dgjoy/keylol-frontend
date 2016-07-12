(function () {
    class UserEditController {
        constructor ($scope, pageHead, stateTree, $state, $location, $timeout) {
            $scope.tabArray = [
                { state: '.info', name:'信息与资料' },
                { state: '.preference', name:'调整偏好' },
            ];
            $scope.$watch(() => {
                return $state.current.name;
            }, () => {
                const subState = $state.current.name.substr(22);
                switch (subState) {
                    case 'info' :
                        $scope.currentPage = 0;
                        break;
                    case 'preference' :
                        $scope.currentPage = 1;
                        break;
                }
            });
        }
    }

    keylolApp.controller('UserEditController', UserEditController);
}());
