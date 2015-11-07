(function () {
    "use strict";

    keylolApp.controller("SecretTestsController", [
        "$scope", "window", "notification",
        function ($scope, window, notification) {
            $scope.showEditor = function () {
                window.show({
                    templateUrl: "components/windows/editor.html",
                    controller: "EditorController",
                    inputs: {
                        vm: null
                    }
                });
            };
            $scope.showSettings = function () {
                window.show({
                    templateUrl: "components/windows/settings.html",
                    controller: "SettingsController"
                });
            };
            $scope.showSuccess = function () {
                notification.success("文章已发布")
            };
            $scope.showError = function () {
                notification.error("发生未知错误，请重试或与站务职员联系");
            };
            $scope.showWarning = function () {
                notification.attention("确认要登出当前账户吗？", [
                    {action: "登出", value: true},
                    {action: "取消"}
                ]).then(function (result) {
                    if (result)
                        notification.success("已登出");
                });
            };
        }
    ]);
})();