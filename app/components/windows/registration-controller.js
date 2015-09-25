(function () {
    "use strict";

    keylolApp.controller("RegistrationController", [
        "$scope", "close", "$http", "utils", "union", "apiEndpoint", "window",
        function ($scope, close, $http, utils, union, apiEndpoint, window) {
            $scope.vm = {
                IdCode: "",
                UserName: "",
                Password: "",
                SteamBindingTokenId: "",
                AvatarImage: "",
                SteamProfileName: "",
                GeetestChallenge: "",
                GeetestSeccode: "",
                GeetestValidate: ""
            };
            var consumeBindingToken;
            var geetestResult;
            var gee;
            $scope.geetestId = utils.createGeetest("float", function (result, geetest) {
                gee = geetest;
                geetestResult = result;
                $scope.vm.GeetestChallenge = geetestResult.geetest_challenge;
                $scope.vm.GeetestSeccode = geetestResult.geetest_seccode;
                $scope.vm.GeetestValidate = geetestResult.geetest_validate;
            });
            $scope.error = {};
            $scope.errorDetect = utils.modelErrorDetect;
            $scope.cancel = function () {
                close();
                if (consumeBindingToken)
                    consumeBindingToken.resolve();
            };
            $scope.showSteamConnectWindow = function () {
                window.show({
                    templateUrl: "components/windows/steam-connect.html",
                    controller: "SteamConnectController"
                }).then(function (modal) {
                    modal.close.then(function (result) {
                        if (result) {
                            consumeBindingToken = result.consume;
                            $scope.vm.SteamBindingTokenId = result.tokenId;
                            $scope.vm.SteamProfileName = result.steamProfileName;
                            $scope.vm.AvatarImage = "steam://avatars/" + result.steamAvatarHash;
                        } else {
                            $scope.vm.SteamBindingTokenId = "";
                        }
                    });
                });
            };
            $scope.discardBinding = function () {
                $scope.vm.SteamBindingTokenId = "";
                if (consumeBindingToken)
                    consumeBindingToken.resolve();
            };
            $scope.submit = function () {
                $scope.error = {};
                $scope.vm.IdCode = $scope.vm.IdCode.toUpperCase();
                utils.modelValidate.idCode($scope.vm.IdCode, $scope.error, "vm.IdCode");
                utils.modelValidate.username($scope.vm.UserName, $scope.error, "vm.UserName");
                utils.modelValidate.password($scope.vm.Password, $scope.error, "vm.Password");
                if (typeof geetestResult === "undefined") {
                    $scope.error.authCode = true;
                }
                if (!$.isEmptyObject($scope.error))
                    return;
                $http.post(apiEndpoint + "user", $scope.vm)
                    .then(function (response) {
                        var login = response.data.LoginLog;
                        delete response.data.LoginLog;
                        union.$localStorage.user = response.data;
                        login.fromRegistration = true;
                        union.$localStorage.login = login;
                        close();
                        if (consumeBindingToken)
                            consumeBindingToken.resolve();
                    }, function (response) {
                        switch (response.status) {
                            case 400:
                                $scope.error = response.data.ModelState;
                                if ($scope.error.authCode) {
                                    gee.refresh();
                                }
                                break;
                            default:
                                alert(response.data);
                        }
                    });
            };
        }
    ]);
})();