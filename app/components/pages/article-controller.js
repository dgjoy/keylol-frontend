(function () {
    "use strict";

    keylolApp.controller("ArticleController", [
        "pageTitle", "$scope", "union", "$routeParams", "$http", "getAndFlushComments", "notification", "$location", "$timeout",
        function (pageTitle, $scope, union, $routeParams, $http, getAndFlushComments, notification, $location, $timeout) {
            $scope.articleExist = true;
            $scope.union = union;
            pageTitle.set("文章 - 其乐");
            var unionArticle = {};
            var unionPoint = {};
            var summary = {};
            var pageElements = {};
            if ($routeParams.author && $routeParams.article) {
                $http.get(apiEndpoint + "article/" + $routeParams.author + "/" + $routeParams.article)
                    .then(function (response) {
                        var article = response.data;
                        article.authorIdCode = $routeParams.author;
                        article.sqNumberForAuthor = $routeParams.article;
                        pageTitle.set(article.Title + " - 其乐");
                        for (var i in article.AttachedPoints) {
                            article.AttachedPoints[i].mainName = article.AttachedPoints[i][article.AttachedPoints[i].PreferredName + "Name"];
                        }
                        article.isMyArticle = union.$localStorage.user.IdCode === $routeParams.author;
                        article.canEdit = article.isMyArticle || union.$localStorage.user.StaffClaim === "operator";
                        if (article.Vote) {
                            $scope.hasVote = true;
                            switch (article.Vote) {
                                case "Positive":
                                    article.VoteText = "好评";
                                    break;
                                case "Negative":
                                    article.VoteText = "差评";
                                    break;
                            }
                            $http.get(apiEndpoint + "normal-point/" + article.VoteForPointId, {
                                params: {
                                    includeVotes: true
                                }
                            }).then(function (response) {
                                var point = response.data;
                                point.mainName = point[point.PreferredName + "Name"];
                                if (point.PositiveArticleCount + point.NegativeArticleCount > 0) {
                                    point.votePercent = (point.PositiveArticleCount * 10 / (point.PositiveArticleCount + point.NegativeArticleCount)).toFixed(1);
                                    point.voteCircles = [{}, {}, {}, {}, {}];
                                    if (point.votePercent >= 8) {
                                        for (var i in point.voteCircles) {
                                            point.voteCircles[i].type = "awesome";
                                        }
                                    } else if (point.votePercent >= 6) {
                                        for (var i = 0; i < 4; i++) {
                                            point.voteCircles[i].type = "good";
                                        }
                                    } else if (point.votePercent >= 4) {
                                        for (var i = 0; i < 3; i++) {
                                            point.voteCircles[i].type = "not-bad";
                                        }
                                    } else if (point.votePercent >= 2) {
                                        for (var i = 0; i < 2; i++) {
                                            point.voteCircles[i].type = "bad";
                                        }
                                    } else {
                                        point.voteCircles[0].type = "terrible"
                                    }
                                } else {
                                    point.votePercent = "N/A";
                                    point.voteCircles = [{}, {}, {}, {}, {}];
                                    point.noVotes = true;
                                }
                                $.extend(unionPoint, point);
                            }, function (response) {
                                notification.error("未知错误", response);
                            });
                        }
                        $.extend(unionArticle, article);

                        getAndFlushComments(article, null, "hot");
                        if (!$location.hash()) {
                            getAndFlushComments(article, 1, "page");
                        } else {
                            getAndFlushComments(article, $location.hash(), "sequence", function () {
                                $timeout(function () {
                                    $("body").animate({
                                        scrollTop: $("#comment-" + $location.hash()).offset().top
                                    }, function () {
                                        $("#comment-" + $location.hash()).addClass("highlight");
                                    });
                                });
                            });
                        }
                        pageElements.changePage = function (oldPage, newPage) {
                            getAndFlushComments(article, newPage, "page");
                        };
                    }, function (error) {
                        if (error.status === 404) {
                            $scope.articleExist = false;
                        }
                        console.error(error);
                    });
                $http.get(apiEndpoint + "user/" + $routeParams.author, {
                    params: {
                        includeSubscribed: $routeParams.author != union.$localStorage.user.IdCode,
                        includeStats: true,
                        includeProfilePointBackgroundImage: true,
                        idType: "IdCode"
                    }
                }).then(function (response) {
                    var author = response.data;
                    $.extend(summary, {
                        head: {
                            mainHead: author.UserName,
                            subHead: author.GamerTag
                        },
                        avatar: author.AvatarImage,
                        background: author.ProfilePointBackgroundImage,
                        pointSum: {
                            type: "个人",
                            readerNum: author.SubscriberCount,
                            articleNum: author.ArticleCount
                        },
                        id: author.Id,
                        url: "user/" + author.IdCode
                    });
                    if (author.IdCode != union.$localStorage.user.IdCode) {
                        summary.subscribed = author.Subscribed;
                    }
                }, function (response) {
                    notification.error("未知错误", response);
                });
            }
            union.summary = summary;
            union.article = unionArticle;
            union.point = unionPoint;
            union.comments = [];
            union.hotComments = [];
            union.pageElements = pageElements;
        }
    ]);
})();