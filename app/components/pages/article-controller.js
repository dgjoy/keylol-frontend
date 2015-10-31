(function () {
    "use strict";

    keylolApp.controller("ArticleController", [
        "pageTitle", "$scope", "$sce", "union", "$routeParams", "$http", "getAndFlushComments",
        function (pageTitle, $scope, $sce, union, $routeParams, $http, getAndFlushComments) {
            $scope.articleExist = true;
            pageTitle.set("文章 - 其乐");
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
                        pageTitle.set(article.Title + " - 其乐");
                        article.Content = $sce.trustAsHtml(article.Content);
                        for (var i in article.AttachedPoints) {
                            article.AttachedPoints[i].mainName = article.AttachedPoints[i][article.AttachedPoints[i].PreferedName + "Name"];
                        }
                        article.isMyArticle = (union.$localStorage.user.IdCode == $routeParams.author);
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
                                var point = response.data;
                                point.mainName = point[point.PreferedName + "Name"];
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
                        if(error.status === 404){
                            $scope.articleExist = false;
                        }
                        console.error(error);
                    });
                $http.get(apiEndpoint + "user/" + $routeParams.author, {
                    params: {
                        includeSubscribed: $routeParams.author != union.$localStorage.user.IdCode,
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
                            readerNum: author.SubscriberCount,
                            articleNum: author.ArticleCount
                        },
                        id: author.Id
                    };
                    $.extend(union.summary, summary);
                    if (author.IdCode != union.$localStorage.user.IdCode){
                        union.summary.subscribed = author.Subscribed;
                    }
                }, function (error) {
                    alert("未知错误");
                    console.error(error);
                });
            }
        }
    ]);
})();