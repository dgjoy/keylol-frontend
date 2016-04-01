(function () {
    "use strict";

    keylolApp.factory("getAndFlushComments", [
        "$http", "union", "notification", "utils", "$timeout",
        function ($http, union, notification, utils, $timeout) {
            var parseComments = function (str, index) {
                var regExpForComment = /^((?:#\d+[ \t]*)+)(?:$|[ \t]+)/gm;
                var regExpForEachLine = /#(\d+)/g;
                return utils.escapeHtml(str).replace(regExpForComment, function (match) {
                    return match.replace(regExpForEachLine, function (m) {
                        var sqNumber = parseInt(m.slice(1, m.length));
                        if (sqNumber < index) {
                            return '<a href="article/' + union.article.authorIdCode + "/" + union.article.sqNumberForAuthor + "#" + sqNumber + '">' + m + '</a>';
                        }
                        return m;
                    });
                });
            };

            return function getAndFlushComments(article, pageNumOrSqNum, getCommentsType, callback) {
                if (!callback) {
                    callback = function () {
                    };
                }
                if (getCommentsType == "hot") {
                    $http.get(apiEndpoint + "comment", {
                        params: {
                            articleId: article.Id,
                            orderBy: "LikeCount",
                            desc: true,
                            take: 3
                        }
                    }).then(function (response) {
                        var preHotComments = response.data;
                        var hotComments = [];
                        for (var i in preHotComments) {
                            if (preHotComments[i].LikeCount >= 5) {
                                var hotComment = preHotComments[i];
                                if (hotComment.Commentator) {
                                    if (hotComment.Commentator.IdCode == article.authorIdCode) {
                                        hotComment.Commentator.isAuthor = true;
                                    }
                                    if (union.$localStorage.user && hotComment.Commentator.IdCode == union.$localStorage.user.IdCode) {
                                        hotComment.cannotLike = true;
                                    }
                                }
                                if (hotComment.LikeCount > 0) {
                                    hotComment.hasLike = true;
                                }
                                if (hotComment.Content) {
                                    hotComment.Content = parseComments(hotComment.Content, hotComment.SequenceNumberForArticle);
                                }
                                hotComments.push(hotComment);
                            }
                        }
                        $.extend(union.hotComments, hotComments);
                    }, function (response) {
                        notification.error("发生未知错误，请重试或与站务职员联系", response);
                    });
                } else if (getCommentsType == "page") {
                    var pageNum = pageNumOrSqNum;
                    $http.get(apiEndpoint + "comment", {
                        params: {
                            articleId: article.Id,
                            skip: pageNum == 1 ? 0 : (17 + (pageNum - 2) * 20),
                            take: pageNum == 1 ? 17 : 20
                        }
                    }).then(function (response) {
                        var comments = response.data;
                        for (var i in comments) {
                            if (comments[i].Commentator) {
                                if (comments[i].Commentator.IdCode == article.authorIdCode) {
                                    comments[i].Commentator.isAuthor = true;
                                }

                                if (union.$localStorage.user && comments[i].Commentator.IdCode == union.$localStorage.user.IdCode) {
                                    comments[i].cannotLike = true;
                                }
                            }
                            if (comments[i].LikeCount > 0) {
                                comments[i].hasLike = true;
                            }
                            if (comments[i].Content) {
                                comments[i].Content = parseComments(comments[i].Content, comments[i].SequenceNumberForArticle);
                            }
                        }
                        union.article.totalComments = response.headers("X-Total-Record-Count");
                        union.pageElements.totalPages = union.article.totalComments <= 17 ? 1 : parseInt((union.article.totalComments - 18) / 20) + 2;
                        union.pageElements.currPage = pageNum;
                        $(".section-article-comments .comment.highlight").removeClass("highlight");
                        union.comments.length = 0;
                        $.extend(union.comments, comments);
                    }, function (response) {
                        notification.error("发生未知错误，请重试或与站务职员联系", response);
                    });
                } else {
                    var sqNum = pageNumOrSqNum;
                    $http.get(apiEndpoint + "comment", {
                        params: {
                            articleId: article.Id,
                            skip: sqNum <= 17 ? 0 : parseInt((sqNum - 17) / 20) * 20 + 17,
                            take: sqNum <= 17 ? 17 : 20
                        }
                    }).then(function (response) {
                        var comments = response.data;
                        for (var i in comments) {
                            if (comments[i].Commentator) {
                                if (comments[i].Commentator.IdCode == article.authorIdCode) {
                                    comments[i].Commentator.isAuthor = true;
                                }

                                if (union.$localStorage.user && comments[i].Commentator.IdCode == union.$localStorage.user.IdCode) {
                                    comments[i].cannotLike = true;
                                }
                            }
                            if (comments[i].LikeCount > 0) {
                                comments[i].hasLike = true;
                            }
                            if (comments[i].Content) {
                                comments[i].Content = parseComments(comments[i].Content, comments[i].SequenceNumberForArticle);
                            }
                        }
                        union.article.totalComments = response.headers("X-Total-Record-Count");
                        union.pageElements.totalPages = union.article.totalComments <= 17 ? 1 : parseInt((union.article.totalComments - 18) / 20) + 2;
                        union.pageElements.currPage = sqNum <= 17 ? 1 : parseInt((sqNum - 17) / 20) + 2;
                        $(".section-article-comments .comment.highlight").removeClass("highlight");
                        union.comments.length = 0;
                        $.extend(union.comments, comments);
                        callback();
                    }, function (response) {
                        notification.error("评论刷新失败", response);
                    });
                }
            }
        }
    ]);
})();