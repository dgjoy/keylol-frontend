(function () {
    "use strict";

    keylolApp.factory("getAndFlushComments", [
        "$http", "$sce", "union",
        function ($http, $sce, union) {
            var parseComments = function (str, index) {
                var regExpForComment = /^((?:#\d+[ \t]*)+)(?:$|[ \t]+)/gm;
                var regExpForEachLine = /#(\d+)/g;
                return str.replace(regExpForComment, function (match) {
                    return match.replace(regExpForEachLine, function (m) {
                        var sqNumber = parseInt(m.slice(1, m.length));
                        if (sqNumber < index + 1) {
                            return '<a href="' + sqNumber + '">' + m + '</a>';
                        }
                        return m;
                    });
                });
            };

            return function getAndFlushComments(article, pageNumOrSqNum, getCommentsType) {
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
                            if(preHotComments[i].LikeCount >= 5){
                                var hotComment = preHotComments[i];
                                if (hotComment.Commentotar.IdCode == article.AuthorIdCode) {
                                    hotComment.Commentotar.isAuthor = true;
                                }
                                if (hotComment.LikeCount > 0) {
                                    hotComment.hasLike = true;
                                }
                                if (hotComment.Commentotar.IdCode == union.$localStorage.user.IdCode){
                                    hotComment.cannotLike = true;
                                }
                                hotComment.Content = $sce.trustAsHtml(parseComments(hotComment.Content, hotComment.SequenceNumberForArticle));
                                hotComments.push(hotComment);
                            }
                        }
                        $.extend(union.hotComments, hotComments);
                    }, function (error) {
                        alert("未知错误");
                        console.error(error);
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
                            if (comments[i].Commentotar.IdCode == article.AuthorIdCode) {
                                comments[i].Commentotar.isAuthor = true;
                            }
                            if (comments[i].LikeCount > 0) {
                                comments[i].hasLike = true;
                            }
                            if (comments[i].Commentotar.IdCode == union.$localStorage.user.IdCode){
                                comments[i].cannotLike = true;
                            }
                            comments[i].Content = $sce.trustAsHtml(parseComments(comments[i].Content, comments[i].SequenceNumberForArticle));
                        }
                        union.article.totalComments = response.headers("X-Total-Record-Count");
                        union.pageElements.totalPages = union.article.totalComments <= 17 ? 1 : parseInt((union.article.totalComments - 18) / 20) + 2;
                        union.pageElements.currPage = pageNum;
                        union.comments.length = 0;
                        $.extend(union.comments, comments);
                    }, function (error) {
                        alert("未知错误");
                        console.error(error);
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
                            if (comments[i].Commentotar.IdCode == article.AuthorIdCode) {
                                comments[i].Commentotar.isAuthor = true;
                            }
                            if (comments[i].LikeCount > 0) {
                                comments[i].hasLike = true;
                            }
                            if (comments[i].Commentotar.IdCode == union.$localStorage.user.IdCode){
                                comments[i].cannotLike = true;
                            }
                            comments[i].Content = $sce.trustAsHtml(parseComments(comments[i].Content, comments[i].SequenceNumberForArticle));
                        }
                        union.article.totalComments = response.headers("X-Total-Record-Count");
                        union.pageElements.totalPages = union.article.totalComments <= 17 ? 1 : parseInt((union.article.totalComments - 18) / 20) + 2;
                        union.pageElements.currPage = sqNum <= 17 ? 1 : parseInt((sqNum - 17) / 20) + 2;
                        union.comments.length = 0;
                        $.extend(union.comments, comments);
                    }, function (error) {
                        alert("评论刷新失败");
                        console.error(error);
                    });
                }
            }
        }
    ]);
})();