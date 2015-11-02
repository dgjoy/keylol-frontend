(function () {
    "use strict";

    keylolApp.controller("ReceptionController", [
        "$scope",
        function ($scope) {
            $scope.isInPoint = true;
            $scope.quickLinks = [
                {
                    name: "军团要塞2",
                    idCode: "TMFT2"
                }
            ];
            $scope.recentLinks = [
                {
                    name: "第一人称射击",
                    url: "test"
                },
                {
                    name: "即时战略",
                    url: "test"
                },
                {
                    name: "Life is Strange",
                    url: "test"
                },
                {
                    name: "桌面游戏",
                    url: "test"
                },
                {
                    name: "This war of mine",
                    url: "test"
                }
            ];
            $scope.testHover = function ($event) {
                $scope.showTestHover({
                    templateUrl: "components/popup/point-preview-card.html",
                    controller: "PointPreviewCardController",
                    event: $event,
                    attachSide: "bottom",
                    align: "left",
                    inputs: {
                        data: 2
                    }
                });
            };
        }
    ]);
})();