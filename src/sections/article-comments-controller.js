(function () {
    class ArticleCommentsController {
        constructor ($scope, union, $http, utils, getAndFlushComments, notification, window) {
            $.extend(this, {
                union,
                window,
                $timeout,
            });
            $scope.textFocus = false;
            $scope.submitLock = false;
            $scope.comment = {};
            $scope.moderateComment = (event, comment, type, isCancel) => {
                comment.showModerationPopup({
                    event,
                    templateUrl: "src/popup/moderation.html",
                    controller: "ModerationController as moderation",
                    attachSide: "left",
                    align: "top",
                    offsetX: 710,
                    offsetY: 25,
                    inputs: {
                        targetId: comment.Id,
                        type: {
                            isCancel,
                            comment,
                            action: type,
                            target: "Comment",
                        },
                    },
                });
            };
            $scope.showRegistrationWindow = () => {
                window.show({
                    templateUrl: "src/windows/registration.html",
                    controller: "RegistrationController",
                    inputs: { options: {} },
                });
            };

            $scope.showLoginSteamWindow = () => {
                window.show({
                    templateUrl: "src/windows/login-steam.html",
                    controller: "LoginSteamController",
                });
            };
            $scope.doComment = () => {
                if ($scope.comment.currentComment) {
                    $scope.submitLock = true;
                    $http.post(`${apiEndpoint}comment`, {
                        Content: $scope.comment.currentComment,
                        ArticleId: union.article.Id,
                        ReplyToCommentsSn: dealWithReply($scope.comment.currentComment),
                    }).then(response => {
                        notification.success("评论已发出");
                        $scope.submitLock = false;
                        $scope.comment.currentComment = "";
                        getAndFlushComments(union.article, response.data.SequenceNumberForArticle, "sequence");
                    }, response => {
                        notification.error("评论发送失败", response);
                        $scope.submitLock = false;
                    });
                }
            };
            $scope.reply = sqNumber => {
                if (!$scope.comment.currentComment) {
                    $scope.comment.currentComment = `#${sqNumber} `;
                } else {
                    $scope.comment.currentComment += `\n#${sqNumber} `;
                }
                $scope.textFocus = true;
            };
            $scope.acknowledge = comment => {
                $http.post(`${apiEndpoint}like`, {
                    TargetId: comment.Id,
                    Type: "CommentLike",
                }).then(response => {
                    if (response.data === "Free") {
                        notification.success("认可已生效，每日发出的前 5 个认可不会消耗文券");
                    } else {
                        notification.success("认可已生效");
                        if (union.getUnreadLogs) {
                            union.getUnreadLogs();
                        }
                    }
                }, response => {
                    comment.Liked = false;
                    comment.LikeCount -= 1;
                    if (comment.LikeCount <= 0) {
                        comment.hasLike = false;
                    }
                    if (response.status === 401) {
                        notification.error("现有文券数量不足，无法发出认可");
                    } else {
                        notification.error("认可评论失败", response);
                    }
                });
                comment.Liked = true;
                comment.hasLike = true;
                comment.LikeCount += 1;
            };
            $scope.cancelAcknowledge = comment => {
                $http.delete(`${apiEndpoint}like`, {
                    params: {
                        targetId: comment.Id,
                        type: "CommentLike",
                    },
                }).then(() => {
                    notification.success("此认可已被撤销");
                }, response => {
                    notification.error("取消认可评论失败", response);
                });
                comment.Liked = false;
                comment.LikeCount -= 1;
                if (comment.LikeCount <= 0) {
                    comment.hasLike = false;
                }
            };

            function dealWithReply (str) {
                const regExpForComment = /^((?:#\d+[ \t]*)+)(?:$|[ \t]+)/gm;
                const regExpForEachLine = /(\d+)/g;
                const m = str.match(regExpForComment);
                let replyCommentArray = [];
                if (m) {
                    if (m.length > 1) {
                        replyCommentArray = m.reduce((preValue, currValue) => {
                            let preValueTem = preValue;
                            if (typeof preValue === "string") {
                                preValueTem = preValue.match(regExpForEachLine);
                            }
                            const currValueTem = currValue.match(regExpForEachLine);
                            return preValueTem.concat(currValueTem);
                        });
                    } else {
                        replyCommentArray = m[0].match(regExpForEachLine);
                    }
                }
                replyCommentArray = utils.arrayUnique(replyCommentArray).map(s => {
                    return parseInt(s);
                });
                if (replyCommentArray.length > 1) {
                    return replyCommentArray.reduce((preValue, currValue) => {
                        let valueArr = preValue;
                        if (typeof preValue == "number") {
                            valueArr = [preValue];
                        }
                        if (currValue > union.article.totalComments) {
                            return valueArr;
                        }
                        valueArr.push(currValue);
                        return valueArr;
                    });
                } else if (replyCommentArray.length === 1) {
                    if (replyCommentArray[0] > union.article.totalComments) {
                        return [];
                    }
                }
                return replyCommentArray;
            }
        }
    }

    keylolApp.component("articleComments", {
        templateUrl: "src/sections/article-comments.html",
        controller: ArticleCommentsController,
        controllerAs: "articleComments",
    });
}());
