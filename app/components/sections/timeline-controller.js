(function () {
    "use strict";

    keylolApp.controller("TimelineController", [
        "$scope", "union",
        function ($scope, union) {
            $scope.headingDisplayMode = function (entry) {
                if (entry.source)
                    return "source";
                else
                    return "title";
            };
            $scope.data = union.timeline;

            $scope.showSelectorClick = function (options) {
                var popup = $scope.showSelectorClickImpl(options);
                if (popup) {
                    popup.then(function (popup) {
                        return popup.close;
                    }).then(function (result) {
                        console.log("悬浮窗返回结果。")
                        console.log(result);
                    });
                }
            };
        }
    ]);
})();