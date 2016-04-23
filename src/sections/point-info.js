(function () {
    keylolApp.controller('PointInfoController', [
        '$scope', 'union', 'window', 'utils', 'notification',
        ($scope, union, window, utils, notification) => {
            $scope.union = union;
            $scope.utils = utils;
            $scope.point = union.point;
            $scope.showShortReviewWindow = function (vote) {
                window.show({
                    templateUrl: 'src/windows/short-review.html',
                    controller: 'ShortReviewController',
                    inputs: {
                        options: {
                            point: {
                                Id: $scope.point.Id,
                                IdCode: $scope.point.IdCode,
                                CoverImage: $scope.point.CoverImage,
                                Name: utils.getPointFirstName($scope.point),
                            },
                            vm: {
                                Vote: vote,
                            },
                            hoursPlayed: $scope.point.hoursPlayed,
                        },
                    },
                });
                return true;
            };
            $scope.showRegistrationWindow = function () {
                window.show({
                    templateUrl: 'src/windows/registration.html',
                    controller: 'RegistrationController',
                    inputs: {
                        options: { whenReviewing: true },
                    },
                });
                return true;
            };
            $scope.showEditorWindow = function () {
                notification.attention('此前尚未发布的草稿会被覆盖', [
                    { action: '覆盖', value: true },
                    { action: '取消' },
                ]).then(result => {
                    if (result) {
                        window.show({
                            templateUrl: 'src/windows/editor.html',
                            controller: 'EditorController',
                            inputs: {
                                options: {
                                    voteForPoint: $scope.point,
                                    vm: {
                                        TypeName: '评',
                                        Pros: [],
                                        Cons: [],
                                    },
                                    doNotLoadDraft: true,
                                },
                            },
                        });
                    }
                });
            };
            $scope.showRelatedGames = function ($event, type, count) {
                $scope.showRelatedPopup({
                    templateUrl: 'src/popup/related-games.html',
                    controller: 'RelatedGamesController',
                    event: $event,
                    attachSide: 'left',
                    align: 'top',
                    offsetX: 580,
                    offsetY: 32,
                    inputs: {
                        type,
                        count,
                        idCode: union.point.IdCode,
                    },
                });
            };
            $scope.showPointEdit = function (isGame) {
                window.show({
                    templateUrl: 'src/windows/point-settings.html',
                    controller: 'PointSettingsController',
                    inputs: {
                        isGame,
                        point: $scope.point,
                        isJustCreated: false,
                    },
                });
            };
        },
    ]);
}());
