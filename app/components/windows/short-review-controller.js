(function () {
    "use strict";

    keylolApp.controller("ShortReviewController", [
        "$scope", "close", "window", "notification",
        function ($scope, close, window, notification) {

            $scope.cancel = function () {
                close();
            };
            
            $scope.changeToLong = function () {
                notification.attention("从简评切换为长评将会覆盖长评已保存的草稿", [
                    {action: "仍然切换", value: true},
                    {action: "取消"}
                ]).then(function (result) {
                    if (result) {
                        window.show({
                            templateUrl: "components/windows/editor.html",
                            controller: "EditorController",
                            inputs: {
                                options: {
                                    doNotLoadDraft: true
                                }
                            }
                        });
                        close();
                    }
                });
            }
        }
    ]);
})();