/**
 * Created by Rex on 15/9/23.
 */
(function () {
    "use strict";

    keylolApp.controller("AllArticlesController", [
        "pageHead", "$scope", "union", "$http", "notification", "$location", "utils", "$timeout", "window",
        function (pageHead, $scope, union, $http, notification, $location, utils, $timeout, window) {
            $scope.searchExist = true;
            $scope.union = union;
            pageHead.setTitle("最新文章 - 其乐");
            var summary = {
                actions: [],
                head: {
                    mainHead: "最新投稿",
                    subHead: "Recent Submissions"
                },
                background: "keylol://989df8e508510f8447aaf06ddadcac5f.jpg",
                defaultSum: {
                    text: "所有近日发布的投稿文章"
                }
            };
            var timeline = {
                title: {
                    mainTitle: "讯息轨道",
                    subTitle: "Timeline"
                },
                rightButton: {
                    avatar: "assets/images/edit-pen.png",
                    alt: "发表新文章",
                    text: "文",
                    clickAction: function () {
                        window.show({
                            templateUrl: "components/windows/editor.html",
                            controller: "EditorController",
                            inputs: {
                                options: null
                            }
                        });
                    }
                },
                loadAction: function (params, callback) {
                    $http.get(apiEndpoint + "article/latest", {
                        params: params
                    }).then(function (response) {
                        callback(response);
                    }, function (response) {
                        notification.error("发生未知错误，请重试或与站务职员联系", response);
                    });
                },
                datetime: "outBlock",
                hasExpand: true,
                loadingLock: true,
                entries: []
            };

            $http.get(apiEndpoint + "article/latest", {
                params: {
                    titleOnly: false,
                    take: utils.timelineLoadCount,
                    articleTypeFilter: "评,研,讯,谈,档"
                }
            }).then(function (response) {
                var articleList = response.data;
                timeline.noMoreArticle = articleList.length < utils.timelineLoadCount;
                if (articleList.length > 0) {
                    var timelineTimeout;


                    for (var i in articleList) {
                        var article = articleList[i];
                        var entry = {
                            types: [article.TypeName],
                            author: {
                                username: article.Author.UserName,
                                avatarUrl: article.Author.AvatarImage,
                                idCode: article.Author.IdCode
                            },
                            voteForPoint: article.VoteForPoint,
                            vote: article.Vote,
                            sequenceNumber: article.SequenceNumber,
                            datetime: article.PublishTime,
                            title: article.Title,
                            summary: article.Content,
                            hasBackground: false,
                            thumbnail: article.ThumbnailImage,
                            hasThumbnail: true,
                            url: "/article/" + article.Author.IdCode + "/" + article.SequenceNumberForAuthor,
                            count: {
                                like: article.LikeCount,
                                comment: article.CommentCount
                            }
                        };
                        if (article.AttachedPoints && article.AttachedPoints.length > 0) {
                            entry.sources = {
                                type: "point",
                                points: article.AttachedPoints
                            };
                        } else {
                            entry.sources = null;
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
                }
            }, function (response) {
                notification.error("发生未知错误，请重试或与站务职员联系", response);
                timeline.loadingLock = false;
            });

            union.timeline = timeline;
            union.summary = summary;
        }
    ]);
})();