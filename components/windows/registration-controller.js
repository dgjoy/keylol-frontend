(function () {
    "use strict";

    keylolApp.controller("RegistrationController", [
        "$scope", "close", "$http", "utils", "union", "apiEndpoint", "window", "notification", "$element", "$timeout", "$location", "options",
        function ($scope, close, $http, utils, union, apiEndpoint, window, notification, $element, $timeout, $location, options) {
            $scope.vm = {
                IdCode: "",
                UserName: "",
                Password: "",
                SteamBindingTokenId: "",
                AvatarImage: "",
                SteamProfileName: "",
                GeetestChallenge: "",
                GeetestSeccode: "",
                GeetestValidate: "",
                InvitationCode: union.invitationCode
            };
            var consumeBindingToken;
            var geetestResult;
            var geetest = utils.createGeetest("float");
            $scope.geetestId = geetest.id;
            geetest.ready.then(function (gee) {
                $timeout(function () {
                    var geetestDom = $("#geetest-" + geetest.id, $element);
                    gee.appendTo(geetestDom);
                });
            });
            var useGeetestResult = function (gee) {
                geetestResult = gee.getValidate();
                $scope.vm.GeetestChallenge = geetestResult.geetest_challenge;
                $scope.vm.GeetestSeccode = geetestResult.geetest_seccode;
                $scope.vm.GeetestValidate = geetestResult.geetest_validate;
            };
            geetest.success.then(useGeetestResult);

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
                    controller: "SteamConnectController",
                    inputs: {
                        options: {
                            registrationClose: $scope.cancel,
                            whenReviewing: options.whenReviewing
                        }
                    }
                }).then(function (window) {
                    window.close.then(function (result) {
                        if (result) {
                            consumeBindingToken = result.consume;
                            $scope.vm.SteamBindingTokenId = result.tokenId;
                            $scope.vm.SteamProfileName = result.steamProfileName;
                            $scope.vm.AvatarImage = "keylol://steam/avatars/" + result.steamAvatarHash;
                        } else {
                            $scope.vm.SteamBindingTokenId = "";
                        }
                    });
                });
            };
            $timeout($scope.showSteamConnectWindow, 500);

            $scope.discardBinding = function () {
                $scope.vm.SteamBindingTokenId = "";
                if (consumeBindingToken)
                    consumeBindingToken.resolve();
            };

            $scope.submitLock = false;
            $scope.submit = function () {
                if ($scope.submitLock)
                    return;
                $scope.submitLock = true;
                $scope.error = {};
                $timeout(function(){
                    $scope.vm.IdCode = $scope.vm.IdCode.toUpperCase();
                    utils.modelValidate.steamBindingTokenId($scope.vm.SteamBindingTokenId, $scope.error, "vm.SteamBindingTokenId");
                    utils.modelValidate.idCode($scope.vm.IdCode, $scope.error, "vm.IdCode");
                    utils.modelValidate.username($scope.vm.UserName, $scope.error, "vm.UserName");
                    utils.modelValidate.password($scope.vm.Password, $scope.error, "vm.Password");
                    if (!geetestResult) {
                        $scope.error.authCode = true;
                    }
                    if (!$.isEmptyObject($scope.error)) {
                        $scope.submitLock = false;
                        return;
                    }
                    $http.post(apiEndpoint + "user", $scope.vm)
                        .then(function (response) {
                            union.$localStorage.firstOpenKeylol = true;
                            union.$localStorage.login = response.data;
                            $location.url("/home");
                            close();
                            if (consumeBindingToken)
                                consumeBindingToken.resolve();
                        }, function (response) {
                            switch (response.status) {
                                case 400:
                                    $scope.error = response.data.ModelState;
                                    geetestResult = null;
                                    geetest.refresh().then(useGeetestResult);
                                    break;
                                default:
                                    notification.error("发生未知错误，请重试或与站务职员联系", response);
                            }
                            $scope.submitLock = false;
                        });
                });
            };
        }
    ]);
})();