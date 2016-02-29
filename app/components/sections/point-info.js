(function () {
    "use strict";

    keylolApp.controller("PointInfoController", [
        "$scope", "union", "window", "utils", "notification",
        function ($scope, union, window, utils, notification) {
            $scope.utils = utils;
            $scope.point = union.point;
            $scope.showShortReviewWindow = function (vote) {
                window.show({
                    templateUrl: "components/windows/short-review.html",
                    controller: "ShortReviewController",
                    inputs: {
                        options: {
                            point: {
                                Id: $scope.point.Id,
                                IdCode:  $scope.point.IdCode,
                                CoverImage: $scope.point.CoverImage,
                                Name: utils.getPointFirstName($scope.point)
                            },
                            vm: {
                                Vote: vote
                            },
                            gameHours: 790.5
                        }
                    }
                });
                return true;
            };
            $scope.showEditorWindow = function () {
                notification.attention("此前尚未发布的草稿会被覆盖", [
                    {action: "覆盖", value: true},
                    {action: "取消"}
                ]).then(function (result) {
                    if (result) {
                        window.show({
                            templateUrl: "components/windows/editor.html",
                            controller: "EditorController",
                            inputs: {
                                options: {
                                    voteForPoint: $scope.point,
                                    vm: {
                                        TypeName: "评",
                                        Pros: [],
                                        Cons: []
                                    },
                                    doNotLoadDraft: true
                                }
                            }
                        });
                    }
                });
            };
            $scope.showRelatedGames = function ($event, type, count) {
                $scope.showRelatedPopup({
                    templateUrl: "components/popup/related-games.html",
                    controller: "RelatedGamesController",
                    event: $event,
                    attachSide: "left",
                    align: "top",
                    offsetX: 580,
                    offsetY: 32,
                    inputs: {
                        idCode: union.point.IdCode,
                        type: type,
                        count: count
                    }
                });
            }
        }
    ]);
})();