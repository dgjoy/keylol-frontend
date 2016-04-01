(function () {
    "use strict";

    keylolApp.controller("SteamConnectController", [
        "$scope", "close", "$timeout", "$q", "notification", "utils", "options", "window",
        function ($scope, close, $timeout, $q, notification, utils, options, window) {
            var tokenId;
            var result;
            var closed = false;
            var connection = $.connection.new();
            var steamBindingHubProxy = connection.steamBindingHub;

            $scope.utils = utils;
            $scope.currentStation = 0;
            $scope.options = options;

            $scope.showLoginSteamWindow = function () {
                window.show({
                    templateUrl: "components/windows/login-steam.html",
                    controller: "LoginSteamController"
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
                $scope.$apply(function () {
                    if ($scope.currentStation === 0)
                        $scope.currentStation = 1;
                });
            };

            steamBindingHubProxy.client.NotifyCodeReceived = function (steamProfileName, steamAvatarHash) {
                $scope.$apply(function () {
                    $scope.currentStation = 2;
                    var consume = $q.defer();
                    consume.promise.finally(function () {
                        connection.stop();
                    });
                    if (steamAvatarHash === "0000000000000000000000000000000000000000")
                        steamAvatarHash = "fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb";
                    result = {
                        tokenId: tokenId,
                        steamProfileName: steamProfileName,
                        steamAvatarHash: steamAvatarHash,
                        consume: consume
                    };
                    $timeout(function () {
                        $scope.currentStation = 3;
                        $timeout(function () {
                            if (!closed) {
                                close(result);
                                closed = true;
                            }
                        }, 1500);
                    }, 200);
                });
            };

            connection.start().then(function () {
                steamBindingHubProxy.server.createToken().then(function (token) {
                    $scope.$apply(function () {
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
            }, function () {
                notification.error("连接失败。");
                $scope.cancel();
            });
        }
    ]);
})();