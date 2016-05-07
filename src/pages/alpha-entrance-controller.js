(function () {
    keylolApp.controller('AlphaEntranceController', [
        'pageHead', '$scope', '$timeout', '$rootScope', 'window', '$window',
        (pageHead, $scope, $timeout, $rootScope, window, $window) => {
            pageHead.setTitle('其乐 - 一个交流评测感悟的玩家社区');

            $scope.showRegistrationWindow = function () {
                window.show({
                    templateUrl: 'src/windows/registration.html',
                    controller: 'RegistrationController',
                    inputs: { options: {} },
                });
            };

            $scope.showLoginSteamWindow = function () {
                window.show({
                    templateUrl: 'src/windows/login-steam.html',
                    controller: 'LoginSteamController',
                    controllerAs: 'LoginSteam',
                });
            };

            $scope.showInvitationWindow = function () {
                window.show({
                    templateUrl: 'src/windows/alpha-invitation.html',
                    controller: 'AlphaInvitationController',
                });
            };

            $scope.secondAnimate = false;
            $scope.active = 0;
            let activeLock = 0;
            let activeTimeout;
            const scrollCallback = () => {
                $scope.$apply(() => {
                    if ($scope.secondAnimate === false) {
                        if ($($window).scrollTop() >= 538) {
                            $scope.secondAnimate = true;
                        }
                    }
                    if ($($window).scrollTop() < 1152) {
                        $scope.active = 0;
                        activeLock = 0;
                    } else if ($($window).scrollTop() > 2077) {
                        $scope.active = 6;
                        activeLock = 6;
                    } else {
                        if ($($window).scrollTop() < 1337) {
                            changeActive(1);
                        } else if ($($window).scrollTop() < 1522) {
                            changeActive(2);
                        } else if ($($window).scrollTop() < 1707) {
                            changeActive(3);
                        } else if ($($window).scrollTop() < 1892) {
                            changeActive(4);
                        } else {
                            changeActive(5);
                        }
                    }
                });
            };
            $($window).scroll(scrollCallback);

            const cancelListenRoute = $scope.$on('$destroy', () => {
                $($window).unbind('scroll', scrollCallback);
                cancelListenRoute();
            });

            function changeActive (index) {
                if (activeLock !== index) {
                    activeLock = index;
                    if (activeTimeout) {
                        $timeout.cancel(activeTimeout);
                    }
                    activeTimeout = $timeout(() => {
                        $scope.active = index;
                    }, 100);
                }
            }
        },
    ]);
}());
