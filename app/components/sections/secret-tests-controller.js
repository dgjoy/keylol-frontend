(function () {
    "use strict";

    keylolApp.controller("SecretTestsController", [
        "$scope", "window",
        function ($scope, window) {
            $scope.showEditor = function () {
                window.show({
                    templateUrl: "components/windows/editor.html",
                    controller: "EditorController"
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
                    type: "progress",
                    mainText: "文章已发布",
                    mainTitle: "成功",
                    subTitle: "Succeeded"
                }, {
                    type: "error",
                    mainText: "发生未知错误，请重试或与站务职员联系",
                    mainTitle: "错误",
                    subTitle: "Error"
                }, {
                    type: "attention",
                    mainText: "确认要登出当前账户吗？",
                    mainTitle: "注意",
                    subTitle: "Attention",
                    actions: [
                        {
                            text: "登出"
                        }, {
                            text: "取消"
                        }
                    ]
                }
            ];
            $scope.showFeedback = function (index, $event) {
                $scope.onFeedback({
                    templateUrl: "components/popup/operation-feedback.html",
                    controller: "OperationFeedbackController",
                    event: $event,
                    computePosition: false,
                    inputs: {
                        data: feedbackArray[index]
                    }
                });
            }
        }
    ]);
})();