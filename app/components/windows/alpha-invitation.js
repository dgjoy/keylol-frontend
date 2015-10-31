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
                $("body").animate({
                    scrollTop: $("#get-invitation-code").offset().top
                }, 3000);
            };

            $scope.submit = function () {
                $scope.invitationCodeError = null;

                if (!$scope.vm.InvitationCode) {
                    $scope.invitationCodeError = "empty";
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
                        notification.error("未知错误");
                        console.log(response.data);
                    }
                });

                //.then(function (window) {
                //    return window.close;
                //}).then(function () {
                //    if (union.$localStorage.login)
                //        $location.url("home");
                //})
            };
        }
    ]);
})();