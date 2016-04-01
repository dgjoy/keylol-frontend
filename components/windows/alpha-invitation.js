(function () {
    "use strict";

    keylolApp.controller("AlphaInvitationController", [
        "$scope", "close", "window", "$http", "apiEndpoint", "notification", "union",
        function ($scope, close, window, $http, apiEndpoint, notification, union) {
            $scope.vm = {
                InvitationCode: ""
            };

            $scope.cancel = function () {
                close();
            };

            $scope.switchToLoginWindow = function () {
                window.show({
                    templateUrl: "components/windows/login-steam.html",
                    controller: "LoginSteamController"
                });
                close();
            };

            $scope.getInvitationCode = function () {
                close();
                $("html,body").animate({
                    scrollTop: $("#get-invitation-code").offset().top
                }, 3000);
            };

            $scope.submitLock = false;
            $scope.submit = function () {
                if ($scope.submitLock)
                    return;
                $scope.submitLock = true;
                $scope.invitationCodeError = null;

                if (!$scope.vm.InvitationCode) {
                    $scope.invitationCodeError = "empty";
                    $scope.submitLock = false;
                    return;
                }
                $http.get(apiEndpoint + "invitation-code/" + $scope.vm.InvitationCode).then(function () {
                    union.invitationCode = $scope.vm.InvitationCode;
                    window.show({
                        templateUrl: "components/windows/registration.html",
                        controller: "RegistrationController"
                    });
                    close();
                }, function (response) {
                    if (response.status === 404) {
                        $scope.invitationCodeError = "invalid";
                    } else {
                        notification.error("发生未知错误，请重试或与站务职员联系", response);
                    }
                    $scope.submitLock = false;
                });
            };
        }
    ]);
})();