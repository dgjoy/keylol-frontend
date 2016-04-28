(function () {
    class PointInfoController {
        constructor (union, window, utils, notification) {
            $.extend(this, {
                union,
                window,
                utils,
                notification,
                point: union.point,
            });
        }
        showShortReviewWindow (vote) {
            this.window.show({
                templateUrl: 'src/windows/short-review.html',
                controller: 'ShortReviewController',
                controllerAs: 'ShortReview',
                inputs: {
                    options: {
                        point: {
                            Id: this.point.Id,
                            IdCode: this.point.IdCode,
                            CoverImage: this.point.CoverImage,
                            Name: this.utils.getPointFirstName(this.point),
                        },
                        vm: {
                            Vote: vote,
                        },
                        hoursPlayed: this.point.hoursPlayed,
                    },
                },
            });
            return true;
        }
        showRegistrationWindow () {
            this.window.show({
                templateUrl: 'src/windows/registration.html',
                controller: 'RegistrationController',
                inputs: {
                    options: { whenReviewing: true },
                },
            });
            return true;
        }
        showEditorWindow () {
            this.notification.attention('此前尚未发布的草稿会被覆盖', [
                { action: '覆盖', value: true },
                { action: '取消' },
            ]).then(result => {
                if (result) {
                    this.window.show({
                        templateUrl: 'src/windows/editor.html',
                        controller: 'EditorController',
                        inputs: {
                            options: {
                                voteForPoint: this.point,
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
        }
        showRelatedGames ($event, type, count) {
            this.showRelatedPopup({
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
                    idCode: this.point.IdCode,
                },
            });
        }
        showPointEdit (isGame) {
            this.window.show({
                templateUrl: 'src/windows/point-settings.html',
                controller: 'PointSettingsController',
                inputs: {
                    isGame,
                    point: this.point,
                    isJustCreated: false,
                },
            });
        }
    }

    keylolApp.component('pointInfo', {
        templateUrl: 'src/sections/point-info.html',
        controller: PointInfoController,
        controllerAs: 'pointInfo',
    });
}());
