(function () {
    "use strict";

    keylolApp.controller("ArticleController", [
        "pageTitle", "$scope", "union", "$routeParams", "$http", "getAndFlushComments", "notification", "$location", "$timeout", "$rootScope",
        function (pageTitle, $scope, union, $routeParams, $http, getAndFlushComments, notification, $location, $timeout, $rootScope) {
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
                        if(union.$localStorage.user){
                            article.isMyArticle = union.$localStorage.user.IdCode === $routeParams.author;
                            article.canEdit = article.isMyArticle || union.$localStorage.user.StaffClaim === "operator";
                        }
                        if (article.Vote) {
                            $scope.hasVote = true;
                            $http.get(apiEndpoint + "normal-point/" + article.VoteForPoint.Id, {
                                params: {
                                    votes: true,
                                    coverDescription: true,
                                    related: true
                                }
                            }).then(function (response) {
                                var point = response.data;


                                $http.get(apiEndpoint + "user-game-record/" + $routeParams.author + "/" + point.SteamAppId, {
                                    params: {
                                        idType: "IdCode"
                                    }
                                }).then(function (response) {
                                    unionPoint.hoursPlayed = response.data;
                                }, function (response) {
                                    if(response.status !== 404){
                                        notification.error("发生未知错误，请重试或与站务职员联系", response);
                                    }
                                });

                                point.totalEvaluate = 0;
                                var totalVote = 0;
                                for(var i in point.VoteStats){
                                    point.totalEvaluate += point.VoteStats[i];
                                    totalVote += point.VoteStats[i] * 2 * i;
                                    if(article.Vote == i){
                                        point.highlight = i;
                                    }
                                }
                                point.votePercent = (((totalVote / point.totalEvaluate) - 2) / 0.8).toFixed(1);

                                $.extend(unionPoint, point);
                            }, function (response) {
                                notification.error("发生未知错误，请重试或与站务职员联系", response);
                            });
                        }
                        $.extend(unionArticle, article);

                        getAndFlushComments(article, null, "hot");
                        if (!$location.hash()) {
                            getAndFlushComments(article, 1, "page");
                        } else {
                            getAndFlushComments(article, $location.hash(), "sequence", function () {
                                $timeout(function () {
                                    $("html,body").animate({
                                        scrollTop: $("#comment-" + $location.hash()).offset().top
                                    }, function () {
                                        $("#comment-" + $location.hash()).addClass("highlight");
                                    });
                                });
                            });
                        }
                        var cancelListenLocationChangeStart = $rootScope.$on("$locationChangeStart", function (e, newUrl, oldUrl) {
                            var newSplit = newUrl.split("#");
                            var oldSplit = oldUrl.split("#");
                            if(newSplit[0] === oldSplit[0] && newSplit[1] && newSplit[1] !== oldSplit[1]){
                                var hashNumber = parseInt(newSplit[1]);
                                getAndFlushComments(article, hashNumber, "sequence", function () {
                                    $timeout(function () {
                                        $("html,body").animate({
                                            scrollTop: $("#comment-" + hashNumber).offset().top
                                        }, function () {
                                            $("#comment-" + hashNumber).addClass("highlight");
                                        });
                                    });
                                });
                                e.preventDefault();
                            }else {
                                cancelListenLocationChangeStart();
                            }
                        });
                        pageElements.changePage = function (oldPage, newPage) {
                            getAndFlushComments(article, newPage, "page");
                        };
                    }, function (error) {
                        if (error.status === 404) {
                            $scope.articleExist = false;
                            return;
                        } else if(error.status === 401) {
                            unionArticle.TypeName = "封";
                            return;
                        }
                        notification.error("发生未知错误，请重试或与站务职员联系", error)
                    });
                $http.get(apiEndpoint + "user/" + $routeParams.author, {
                    params: {
                        subscribed: union.$localStorage.user?$routeParams.author != union.$localStorage.user.IdCode:false,
                        stats: true,
                        profilePointBackgroundImage: true,
                        reviewStats: true,
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
                        url: "user/" + author.IdCode,
                        reviewCount: author.ReviewCount,
                        shortReviewCount: author.ShortReviewCount,
                        idCode: author.IdCode,
                        userName: "@" + author.UserName
                    });
                    if (union.$localStorage.user && author.IdCode != union.$localStorage.user.IdCode) {
                        summary.subscribed = author.Subscribed;
                    }
                }, function (response) {
                    notification.error("发生未知错误，请重试或与站务职员联系", response);
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