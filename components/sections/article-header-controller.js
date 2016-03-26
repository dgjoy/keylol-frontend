(function () {
    "use strict";

    keylolApp.controller("ArticleHeaderController", [
        "$scope", "union", "window", "utils",
        function ($scope, union, window, utils) {
            var vm = this;
            $scope.utils = utils;
            $scope.union = union;
            $scope.article = union.article;
            $scope.point = union.point;
            $scope.summary = union.summary;
            $scope.circles = function(i){
                return new Array(i);
            };
            $scope.editArticle = function () {
                if($scope.article.TypeName === "简评"){
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
                                    Id: $scope.article.Id,
                                    Content: $scope.article.Content,
                                    Vote: $scope.article.Vote
                                },
                                gameHours: 790.5
                            }
                        }
                    });
                }else {
                    window.show({
                        templateUrl: "components/windows/editor.html",
                        controller: "EditorController",
                        inputs: {
                            options: {
                                vm: {
                                    Id: $scope.article.Id,
                                    Title: $scope.article.Title,
                                    Content: $scope.article.Content,
                                    Summary: $scope.article.Summary,
                                    Pros: $scope.article.Pros,
                                    Cons: $scope.article.Cons,
                                    Vote: $scope.article.Vote,
                                    TypeName: $scope.article.TypeName
                                },
                                attachedPoints: $scope.article.AttachedPoints,
                                voteForPoint: $scope.article.VoteForPoint,
                                needConfirmLoadingDraft: true
                            }
                        }
                    });
                }
            };
            $scope.moderateArticle = function (e, type, isCancel) {
                vm.showModerationPopup({
                    templateUrl: "components/popup/moderation.html",
                    controller: "ModerationController as moderation",
                    event: e,
                    attachSide: "left",
                    align: "top",
                    offsetX: 710,
                    offsetY: 32,
                    inputs: {
                        targetId: $scope.article.Id,
                        type: {
                            action: type,
                            target: "Article",
                            isCancel: isCancel
                        }
                    }
                });
            };
        }
    ]);
})();