(function () {
    "use strict";

    keylolApp.controller("ArticleCommentsController", [
        "$scope", "union", "$http", "utils", "$sce", "getAndFlushComments", "notification",
        function ($scope, union, $http, utils, $sce, getAndFlushComments, notification) {
            $scope.comments = union.comments;
            $scope.article = union.article;
            $scope.hotComments = union.hotComments;
            $scope.user = union.$localStorage.user;
            $scope.pageElements = union.pageElements;
            $scope.textFocus = false;
            $scope.submitDisabled = false;
            $scope.doComment = function () {
                if($scope.currentComment){
                    $scope.submitDisabled = true;
                    var replyArray = dealWithReply($scope.currentComment);
                    $http.post(apiEndpoint + "comment", {
                        Content: $scope.currentComment,
                        ArticleId: union.article.Id,
                        ReplyToCommentsSN: replyArray
                    }).then(function (response) {
                        notification.success("评论已发出");
                        $scope.submitDisabled = false;
                        $scope.currentComment = "";
                        var sqNumber = response.data.SequenceNumberForArticle;
                        getAndFlushComments(union.article, sqNumber, "Sequence");
                    }, function (error) {
                        notification.error("评论发送失败");
                        $scope.submitDisabled = false;
                        console.error(error);
                    });
                }
            };
            $scope.reply = function (sqNumber) {
                if (!$scope.currentComment) {
                    $scope.currentComment = "#" + sqNumber + " ";
                } else if ($scope.currentComment == "") {
                    $scope.currentComment += "#" + sqNumber + " ";
                } else {
                    $scope.currentComment += "\n#" + sqNumber + " ";
                }
                $scope.textFocus = true;
            };
            $scope.acknowledge = function (comment) {
                $http.post(apiEndpoint + "like", {
                    TargetId: comment.Id,
                    Type: "CommentLike"
                }).then(function (response) {
                    notification.success("认可已生效");
                }, function (error) {
                    notification.error("认可评论失败");
                    console.error(error);
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
                }).then(function (response) {
                    notification.success("此认可已被撤销");
                }, function (error) {
                    notification.error("取消认可评论失败");
                    console.error(error);
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