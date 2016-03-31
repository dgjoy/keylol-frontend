(function () {
    "use strict";

    keylolApp.controller("ArticleCommentsController", [
        "$scope", "union", "$http", "utils", "getAndFlushComments", "notification", "window",
        function ($scope, union, $http, utils, getAndFlushComments, notification, window) {
            $scope.union = union;
            $scope.comments = union.comments;
            $scope.article = union.article;
            $scope.hotComments = union.hotComments;
            $scope.user = union.$localStorage.user;
            $scope.pageElements = union.pageElements;
            $scope.textFocus = false;
            $scope.submitLock = false;
            $scope.comment = {};
            $scope.moderateComment = function (event, comment, type, isCancel) {
                comment.showModerationPopup({
                    templateUrl: "components/popup/moderation.html",
                    controller: "ModerationController as moderation",
                    event: event,
                    attachSide: "left",
                    align: "top",
                    offsetX: 710,
                    offsetY: 25,
                    inputs: {
                        targetId: comment.Id,
                        type: {
                            action: type,
                            target: "Comment",
                            isCancel: isCancel,
                            comment: comment
                        }
                    }
                });
            };
            $scope.showRegistrationWindow = function () {
                window.show({
                    templateUrl: "components/windows/registration.html",
                    controller: "RegistrationController",
                    inputs: {
                        options: {}
                    }
                });
            };

            $scope.showLoginSteamWindow = function () {
                window.show({
                    templateUrl: "components/windows/login-steam.html",
                    controller: "LoginSteamController"
                });
            };
            $scope.doComment = function () {
                if ($scope.comment.currentComment) {
                    $scope.submitLock = true;
                    var replyArray = dealWithReply($scope.comment.currentComment);
                    $http.post(apiEndpoint + "comment", {
                        Content: $scope.comment.currentComment,
                        ArticleId: union.article.Id,
                        ReplyToCommentsSn: replyArray
                    }).then(function (response) {
                        notification.success("评论已发出");
                        $scope.submitLock = false;
                        $scope.comment.currentComment = "";
                        var sqNumber = response.data.SequenceNumberForArticle;
                        getAndFlushComments(union.article, sqNumber, "sequence");
                    }, function (response) {
                        notification.error("评论发送失败", response);
                        $scope.submitLock = false;
                    });
                }
            };
            $scope.reply = function (sqNumber) {
                if (!$scope.comment.currentComment) {
                    $scope.comment.currentComment = "#" + sqNumber + " ";
                } else if ($scope.comment.currentComment == "") {
                    $scope.comment.currentComment += "#" + sqNumber + " ";
                } else {
                    $scope.comment.currentComment += "\n#" + sqNumber + " ";
                }
                $scope.textFocus = true;
            };
            $scope.acknowledge = function (comment) {
                $http.post(apiEndpoint + "like", {
                    TargetId: comment.Id,
                    Type: "CommentLike"
                }).then(function () {
                    notification.success("认可已生效");
                }, function (response) {
                    notification.error("认可评论失败", response);
                });
                comment.Liked = true;
                comment.hasLike = true;
                comment.LikeCount += 1;
            };
            $scope.cancelAcknowledge = function (comment) {
                $http.delete(apiEndpoint + "like", {
                    params: {
                        targetId: comment.Id,
                        type: "CommentLike"
                    }
                }).then(function () {
                    notification.success("此认可已被撤销");
                }, function (response) {
                    notification.error("取消认可评论失败", response);
                });
                comment.Liked = false;
                comment.LikeCount -= 1;
                if (comment.LikeCount <= 0) {
                    comment.hasLike = false;
                }
            };

            var dealWithReply = function (str) {
                var regExpForComment = /^((?:#\d+[ \t]*)+)(?:$|[ \t]+)/gm;
                var regExpForEachLine = /(\d+)/g;
                var m = str.match(regExpForComment);
                var replyCommentArray = [];
                if (m) {
                    if (m.length > 1) {
                        replyCommentArray = m.reduce(function (preValue, currValue) {
                            if (typeof preValue === 'string') {
                                preValue = preValue.match(regExpForEachLine);
                            }
                            currValue = currValue.match(regExpForEachLine);
                            return preValue.concat(currValue);
                        });
                    } else {
                        replyCommentArray = m[0].match(regExpForEachLine);
                    }
                }
                replyCommentArray = utils.arrayUnique(replyCommentArray).map(function (s) {
                    return parseInt(s);
                });
                if (replyCommentArray.length > 1) {
                    return replyCommentArray.reduce(function (preValue, currValue) {
                        if (typeof preValue == "number") {
                            preValue = [preValue];
                        }
                        if (currValue > union.article.totalComments) {
                            return preValue;
                        }
                        preValue.push(currValue);
                        return preValue;
                    });
                } else if (replyCommentArray.length == 1) {
                    if (replyCommentArray[0] > union.article.totalComments) {
                        return [];
                    }
                }
                return replyCommentArray;
            };
        }
    ]);
})();