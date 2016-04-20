(function () {
    keylolApp.controller("SteamConnectController", [
        "$scope", "close", "$timeout", "$q", "notification", "utils", "options", "window",
        ($scope, close, $timeout, $q, notification, utils, options, window) => {
            let tokenId, result;
            let closed = false;
            const connection = $.connection.new();
            const steamBindingHubProxy = connection.steamBindingHub;

            $scope.utils = utils;
            $scope.currentStation = 0;
            $scope.options = options;

            $scope.showLoginSteamWindow = function () {
                window.show({
                    templateUrl: "src/windows/login-steam.html",
                    controller: "LoginSteamController",
                });
                $scope.cancel();
                if (typeof options.registrationClose === "function") {
                    options.registrationClose();
                }
            };

            $scope.cancel = function () {
                close(result);
                closed = true;
                if (!result)
                    connection.stop();
            };

            steamBindingHubProxy.client.NotifySteamFriendAdded = function () {
                $scope.$apply(() => {
                    if ($scope.currentStation === 0)
                        $scope.currentStation = 1;
                });
            };

            steamBindingHubProxy.client.NotifyCodeReceived = function (steamProfileName, steamAH) {
                $scope.$apply(() => {
                    $scope.currentStation = 2;
                    const consume = $q.defer();
                    consume.promise.finally(() => {
                        connection.stop();
                    });
                    let steamAvatarHash = steamAH;
                    if (steamAvatarHash === "0000000000000000000000000000000000000000")
                        steamAvatarHash = "fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb";
                    result = {
                        tokenId,
                        steamProfileName,
                        steamAvatarHash,
                        consume,
                    };
                    $timeout(() => {
                        $scope.currentStation = 3;
                        $timeout(() => {
                            if (!closed) {
                                close(result);
                                closed = true;
                            }
                        }, 1500);
                    }, 200);
                });
            };

            connection.start().then(() => {
                steamBindingHubProxy.server.createToken().then(token => {
                    $scope.$apply(() => {
                        if (token) {
                            tokenId = token.Id;
                            $scope.botSteamId64 = token.BotSteamId64;
                            $scope.code = token.Code;
                        } else {
                            notification.error("暂无可用机器人。");
                            $scope.cancel();
                        }
                    });
                });
            }, () => {
                notification.error("连接失败。");
                $scope.cancel();
            });
        },
    ]);
}());
