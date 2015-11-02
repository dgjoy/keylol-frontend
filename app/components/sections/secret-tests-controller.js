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
                        options: {
                            type: "upload"
                        }
                    }
                });
            };
            $scope.showSettings = function () {
                window.show({
                    templateUrl: "components/windows/settings.html",
                    controller: "SettingsController"
                });
            };
            var feedbackArray = [
                {
                    description: "文章已发布",
                    title: "成功",
                    subTitle: "Succeeded"
                }, {
                    description: "发生未知错误，请重试或与站务职员联系",
                    title: "错误",
                    subTitle: "Error"
                }, {
                    description: "确认要登出当前账户吗？",
                    title: "注意",
                    subTitle: "Attention",
                    actions: [
                        {
                            action: "登出"
                        }, {
                            action: "取消"
                        }
                    ]
                }
            ];
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