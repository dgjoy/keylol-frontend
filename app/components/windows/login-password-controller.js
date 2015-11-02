(function () {
    "use strict";

    keylolApp.controller("LoginPasswordController", [
        "$scope", "close", "$http", "utils", "union", "apiEndpoint", "window", "notification",
        function ($scope, close, $http, utils, union, apiEndpoint, window, notification) {
            $scope.error = {};
            $scope.errorDetect = utils.modelErrorDetect;

            $scope.vm = {
                EmailOrIdCode: "",
                Password: "",
                GeetestChallenge: "",
                GeetestSeccode: "",
                GeetestValidate: ""
            };

            var geetestResult;
            var gee;
            $scope.geetestId = utils.createGeetest("float", function (result, geetest) {
                gee = geetest;
                geetestResult = result;
                $scope.vm.GeetestChallenge = geetestResult.geetest_challenge;
                $scope.vm.GeetestSeccode = geetestResult.geetest_seccode;
                $scope.vm.GeetestValidate = geetestResult.geetest_validate;
            });

            $scope.cancel = function () {
                close();
            };

            $scope.switchToLoginSteamWindow = function () {
                window.show({
                    templateUrl: "components/windows/login-steam.html",
                    controller: "LoginSteamController"
                });
                close();
            };

            $scope.submit = function () {
                $scope.error = {};
                if (!$scope.vm.EmailOrIdCode) {
                    $scope.error["vm.EmailOrIdCode"] = "Email or UIC cannot be empty.";
                }
                if (!$scope.vm.Password) {
                    $scope.error["vm.Password"] = "Password cannot be empty.";
                }
                if (typeof geetestResult === "undefined") {
                    $scope.error.authCode = true;
                }
                if (!$.isEmptyObject($scope.error))
                    return;
                $http.post(apiEndpoint + "login", $scope.vm)
                    .then(function (response) {
                        union.$localStorage.login = response.data;
                        notification.success("登录成功，欢迎回到其乐");
                        close();
                    }, function (response) {
                        switch (response.status) {
                            case 400:
                                $scope.error = response.data.ModelState;
                                if ($scope.error.authCode) {
                                    gee.refresh();
                                }
                                break;
                            default:
                                notification.error("未知错误");
                                console.error(response.data);
                        }
                    });
            };
        }
    ]);
})();