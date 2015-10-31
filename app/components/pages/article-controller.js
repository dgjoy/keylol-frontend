(function () {
    "use strict";

    keylolApp.controller("ArticleController", [
        "pageTitle", "$scope", "$sce", "union", "$routeParams", "$http", "getAndFlushComments",
        function (pageTitle, $scope, $sce, union, $routeParams, $http, getAndFlushComments) {
            union.article = {};
            union.point = {};
            union.summary = {};
            union.pageElements = {};
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
                        article.isMyArticle = (union.$localStorage.user.IdCode == article.AuthorIdCode);
                        if (article.Vote) {
                            $scope.hasVote = true;
                            switch (article.Vote) {
                                case "Positive":
                                    article.Vote = "好评";
                                    break;
                                case "Negative":
                                    article.Vote = "差评";
                                    break;
                            }
                            $http.get(apiEndpoint + "normal-point/" + article.VoteForPointId, {
                                params: {
                                    includeVotes: true
                                }
                            }).then(function (response) {
                                console.log(response.data);
                                var point = response.data;
                                point.mainName = point[point.PreferedName + "Name"];
                                point.PositiveArticleCount = 10;
                                point.NegativeArticleCount = 30;
                                point.votePercent = (point.PositiveArticleCount * 10 / (point.PositiveArticleCount + point.NegativeArticleCount)).toFixed(1);
                                point.voteCircles = [{},{},{},{},{}];
                                if(point.votePercent >= 8){
                                    for(var i in point.voteCircles){
                                        point.voteCircles[i].type = "awesome";
                                    }
                                }else if(point.votePercent >= 6){
                                    for(var i = 0; i < 4; i++){
                                        point.voteCircles[i].type = "good";
                                    }
                                }else if(point.votePercent >= 4){
                                    for(var i = 0; i < 3; i++){
                                        point.voteCircles[i].type = "not-bad";
                                    }
                                }else if(point.votePercent >= 2){
                                    for(var i = 0; i < 2; i++){
                                        point.voteCircles[i].type = "bad";
                                    }
                                }else {
                                    point.voteCircles[0].type = "terrible"
                                }
                                $.extend(union.point, point);
                            }, function (error) {
                                alert("未知错误");
                                console.error(error);
                            });
                        }
                        $.extend(union.article, article);

                        getAndFlushComments(article, null, "hot");
                        getAndFlushComments(article, 1, "page");
                        union.pageElements.changePage = function (oldPage, newPage) {
                            getAndFlushComments(article, newPage, "page");
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
                        },
                        id: author.Id
                    };
                    $.extend(union.summary, summary);
                    if (author.IdCode != union.$localStorage.user.IdCode){
                        $http.get(apiEndpoint + "user-point-subscription", {
                            params: {
                                pointId: author.Id
                            }
                        }).then(function (response) {
                            union.summary.subscribed = response.data;
                        }, function (error) {
                            alert("未知错误");
                            console.error(error);
                        });
                    }
                }, function (error) {
                    alert("未知错误");
                    console.error(error);
                });
            }
            pageTitle.set("文章 - 其乐");
        }
    ]);
})();