(function() {
    "use strict";

    keylolApp.factory("getAndFlushComments", [
        "$http", "$sce", "union",
        function($http, $sce, union) {
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

            return function getAndFlushComments(article, pageNumOrSqNum, getCommentsType){
                if(getCommentsType == "hot"){
                    $http.get(apiEndpoint + "comment", {
                        params: {
                            articleId: article.Id,
                            orderBy: "LikeCount",
                            desc: true,
                            take: 3
                        }
                    }).then(function (response) {
                        var hotComments = response.data;
                        for (var i in hotComments) {
                            if (hotComments[i].Commentotar.IdCode == article.AuthorIdCode) {
                                hotComments[i].Commentotar.isAuthor = true;
                            }
                            if (hotComments[i].LikeCount > 0) {
                                hotComments[i].hasLike = true;
                            }
                            hotComments[i].Content = $sce.trustAsHtml(parseComments(hotComments[i].Content, hotComments[i].SequenceNumberForArticle));
                        }
                        $.extend(union.hotComments, hotComments);
                        console.log(response);
                    }, function (error) {
                        alert("未知错误");
                        console.error(error);
                    });
                }else if(getCommentsType == "page"){
                    var pageNum = pageNumOrSqNum;
                    $http.get(apiEndpoint + "comment", {
                        params: {
                            articleId: article.Id,
                            skip: pageNum == 1 ? 0 : (27 + (newPage - 2) * 30),
                            take: pageNum == 1 ? 27 : 30
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
                            comments[i].Content = $sce.trustAsHtml(parseComments(comments[i].Content, comments[i].SequenceNumberForArticle));
                        }
                        union.article.totalComments = response.headers("X-Total-Record-Count");
                        union.pageElements.totalPages = union.article.totalComments <= 27 ? 1 : parseInt((union.article.totalComments - 27) / 30) + 2;
                        union.pageElements.currPage = pageNum;
                        union.comments.length = 0;
                        $.extend(union.comments, comments);
                        console.log(response);
                    }, function (error) {
                        alert("未知错误");
                        console.error(error);
                    });
                }else {
                    var sqNum = pageNumOrSqNum;
                    $http.get(apiEndpoint + "comment", {
                        params: {
                            articleId: article.Id,
                            skip: sqNum <= 27 ? 0 : parseInt((sqNum - 27) / 30) * 30 + 27,
                            take: sqNum <= 27 ? 27 : 30
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
                            comments[i].Content = $sce.trustAsHtml(parseComments(comments[i].Content, comments[i].SequenceNumberForArticle));
                        }
                        union.article.totalComments = response.headers("X-Total-Record-Count");
                        union.pageElements.totalPages = union.article.totalComments <= 27 ? 1 : parseInt((union.article.totalComments - 27) / 30) + 2;
                        union.pageElements.currPage = sqNum <= 27 ? 1 : parseInt((sqNumber - 27) / 30) + 2;
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