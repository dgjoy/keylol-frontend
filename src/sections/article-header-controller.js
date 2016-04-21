(function () {
    class ArticleHeaderController {
        constructor (union, window, utils) {
            $.extend(this, {
                union,
                window,
                utils,
                article: union.article,
                point: union.point,
                summary: union.summary,
            });
        }
        editArticle () {
            const article = this.article;
            const point = this.point;
            if (article.TypeName === "简评") {
                this.window.show({
                    templateUrl: "src/windows/short-review.html",
                    controller: "ShortReviewController",
                    inputs: {
                        options: {
                            point: {
                                Id: point.Id,
                                IdCode: point.IdCode,
                                CoverImage: point.CoverImage,
                                Name: this.utils.getPointFirstName(point),
                            },
                            vm: {
                                Id: article.Id,
                                Content: article.Content,
                                Vote: article.Vote,
                            },
                            gameHours: point.hoursPlayed,
                        },
                    },
                });
            } else {
                this.window.show({
                    templateUrl: "src/windows/editor.html",
                    controller: "EditorController",
                    inputs: {
                        options: {
                            vm: {
                                Id: article.Id,
                                Title: article.Title,
                                Content: article.Content,
                                Summary: article.Summary,
                                Pros: article.Pros,
                                Cons: article.Cons,
                                Vote: article.Vote,
                                TypeName: article.TypeName,
                            },
                            attachedPoints: article.AttachedPoints,
                            voteForPoint: article.VoteForPoint,
                            needConfirmLoadingDraft: true,
                        },
                    },
                });
            }
        }
        moderateArticle (e, type, isCancel) {
            this.showModerationPopup({
                templateUrl: "src/popup/moderation.html",
                controller: "ModerationController as moderation",
                event: e,
                attachSide: "left",
                align: "top",
                offsetX: 710,
                offsetY: 32,
                inputs: {
                    targetId: this.article.Id,
                    type: {
                        isCancel,
                        action: type,
                        target: "Article",
                    },
                },
            });
        }
    }

    keylolApp.component("articleHeader", {
        templateUrl: "src/sections/article-header.html",
        controller: ArticleHeaderController,
        controllerAs: "articleHeader",
    });
}());
