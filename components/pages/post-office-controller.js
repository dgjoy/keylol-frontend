/**
 * Created by Rex on 15/9/23.
 */
(function () {
    "use strict";

    keylolApp.controller("PostOfficeController", [
        "pageHead", "$scope", "union", "$http", "notification", "$routeParams", "utils", "$timeout", "$location", "messageTypes",
        "window",
        function (pageHead, $scope, union, $http, notification, $routeParams, utils, $timeout, $location, messageTypes,
                  window) {
            if (!union.$localStorage.user) {
                $location.url("/");
                return;
            }
            var filter;
            if ($routeParams.type) {
                if ($routeParams.type === "acknowledgement") {
                    pageHead.setTitle("邮政中心 - 认可 - 其乐");
                    filter = "Like";
                    union.spolightActive = 0;
                } else if ($routeParams.type === "comment") {
                    pageHead.setTitle("邮政中心 - 评论 - 其乐");
                    filter = "Comment";
                    union.spolightActive = 1;
                } else if ($routeParams.type === "missive") {
                    pageHead.setTitle("邮政中心 - 公函 - 其乐");
                    filter = "Missive";
                    union.spolightActive = 2;
                } else {
                    $scope.notFound = true;
                }
            } else {
                pageHead.setTitle("邮政中心 - 其乐");
            }

            var timeline = {
                title: {
                    mainTitle: "邮政中心",
                    subTitle: "Post Office"
                },
                loadAction: function () {
                    timeline.loadingLock = true;
                    getMessages(timeline.entries.length);
                },
                loadingLock: true,
                notArticle: true,
                hasDeleteButton: true,
                clickable: true,
                entries: []
            };

            getMessages();

            function getMessages(skip) {
                if (!skip) {
                    timeline.entries.length = 0;
                    skip = 0;
                }
                $http.get(apiEndpoint + "message", {
                    params: {
                        filter: filter,
                        skip: skip,
                        take: utils.timelineLoadCount
                    }
                }).then(function (response) {
                    timeline.noMoreArticle = response.data.length < utils.timelineLoadCount;
                    var timelineTimeout;
                    for (var i in response.data) {
                        var message = response.data[i];
                        var entryType = messageTypes[message.Type];
                        var entry = {
                            id: message.Id,
                            isNew: message.Unread,
                            disabled: !message.Unread && !$routeParams.type,
                            types: [entryType.type],
                            fromArticle: {
                                id: message.Article.Id,
                                fromComment: (message.Type === 'CommentLike') || (message.Type === 'CommentReply'),
                                text: message.Article.Title,
                                href: "article/" + message.Article.AuthorIdCode + "/" + message.Article.SequenceNumberForAuthor
                            },
                            targetCommentId: message.Comment ? message.Comment.Id : undefined,
                            datetime: message.CreateTime,
                            author: message.Operator ? {
                                username: message.Operator.UserName,
                                avatarUrl: message.Operator.AvatarImage,
                                idCode: message.Operator.IdCode
                            } : {
                                username: "其乐职员团队",
                                avatarUrl: "keylol://1f414be0769957946950b073d468ce77.png",
                                isStaffTeam: true
                            },
                            hasBackground: true,
                            background: entryType.backgroundUrl,
                            isMissive: entryType.type === "公函",
                            missiveName: entryType.name,
                            summary: entryType.getSummary(message)
                        };
                        if (entryType.type === "公函") {
                            (function (message) {
                                entry.clickAction = function () {
                                    window.show({
                                        templateUrl: "components/windows/missive.html",
                                        controller: "MissiveController",
                                        inputs: {
                                            message: message
                                        }
                                    });
                                }
                            })(message);
                        } else {
                            entry.url = "article/" + message.Article.AuthorIdCode + "/" + message.Article.SequenceNumberForAuthor + (message.Comment ? "#" + message.Comment.SequenceNumberForArticle : "");
                        }
                        timeline.entries.push(entry);
                        (function (entry) {
                            $timeout(function () {
                                if (!timelineTimeout) {
                                    entry.show = true;
                                    timelineTimeout = $timeout(function () {
                                    }, utils.timelineShowDelay);
                                } else {
                                    timelineTimeout = timelineTimeout.then(function () {
                                        entry.show = true;
                                        return $timeout(function () {
                                        }, utils.timelineShowDelay);
                                    });
                                }
                            });
                        })(entry);
                    }
                    if (timelineTimeout) {
                        timelineTimeout.then(function () {
                            timeline.loadingLock = false;
                        });
                    } else {
                        timeline.loadingLock = false;
                    }
                }, function (response) {
                    notification.error("发生未知错误，请重试或与站务职员联系", response);
                    timeline.loadingLock = false;
                });
            }

            union.timeline = timeline;
        }
    ]);
})();