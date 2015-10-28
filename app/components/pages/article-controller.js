(function () {
    "use strict";

    keylolApp.controller("ArticleController", [
        "pageTitle", "$scope", "$sce", "union", "$routeParams", "$http",
        function (pageTitle, $scope, $sce, union, $routeParams, $http) {
            union.article = {};
            union.summary = {};
            union.comments = [];
            union.hotComments = [];
            if ($routeParams.author && $routeParams.article) {
                $http.get(apiEndpoint + "article/" + $routeParams.author + "/" + $routeParams.article)
                    .then(function (response) {
                        var article = response.data;
                        console.log(article);
                        pageTitle.set(article.Title + " - 其乐");
                        article.Content = $sce.trustAsHtml(article.Content);
                        for (var i in article.AttachedPoints) {
                            article.AttachedPoints[i].mainName = article.AttachedPoints[i][article.AttachedPoints[i].PreferedName + "Name"];
                        }
                        article.canBeEdit = (union.$localStorage.user.IdCode == article.AuthorIdCode);
                        if (article.Vote) {
                            switch (article.Vote) {
                                case "Positive":
                                    article.Vote = "好评";
                                    break;
                                case "Negative":
                                    article.Vote = "差评";
                                    break;
                            }
                        }
                        $.extend(union.article, article);

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
                                hotComments[i].Content = $sce.trustAsHtml(parseComments(hotComments[i].Content, parseInt(i)));
                            }
                            $.extend(union.hotComments, hotComments);
                            console.log(response);
                        }, function (error) {
                            alert("未知错误");
                            console.error(error);
                        });

                        $http.get(apiEndpoint + "comment", {
                            params: {
                                articleId: article.Id
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
                                comments[i].Content = $sce.trustAsHtml(parseComments(comments[i].Content, parseInt(i)));
                            }
                            union.article.totalComments = response.headers("X-Total-Record-Count");
                            $.extend(union.comments, comments);
                            console.log(response);
                        }, function (error) {
                            alert("未知错误");
                            console.error(error);
                        });

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
                    }, function (error) {
                        alert("未知错误");
                        console.error(error);
                    });
                $http.get(apiEndpoint + "user/" + $routeParams.author, {
                    params: {
                        includeProfilePointBackgroundImage: true,
                        idType: "IdCode"
                    }
                }).then(function (response) {
                    var author = response.data;
                    var summary = {
                        actions: [
                            {
                                text: "已订阅",
                                extraClass: [
                                    "subscribed"
                                ]
                            }
                        ],
                        head: {
                            mainHead: author.UserName,
                            subHead: author.GamerTag
                        },
                        avatar: author.AvatarImage,
                        background: author.ProfilePointBackgroundImage,
                        pointSum: {
                            type: "个人",
                            readerNum: 157,
                            articleNum: 48
                        }
                    };
                    $.extend(union.summary, summary);
                }, function (error) {
                    alert("未知错误");
                    console.error(error);
                });
            }
            pageTitle.set("文章 - 其乐");
        }
    ]);
})();