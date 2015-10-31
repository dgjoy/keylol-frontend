(function () {
    "use strict";

    keylolApp.controller("PointController", [
        "pageTitle", "$scope", "union", "$routeParams", "$http", "utils",
        function (pageTitle, $scope, union, $routeParams, $http, utils) {
            union.summary = {};
            union.timeline = {
                title: {
                    mainTitle: "讯息轨道",
                    subTitle: "Timeline"
                },
                rightButton: {
                    avatar: "assets/images/edit-pen.png",
                    alt: "发表新文章",
                    href: "test"
                },
                datetime: "outBlock",
                hasExpand: true,
                entries: []
            };
            union.point = {};
            if($routeParams.userIdCode){}
            if($routeParams.pointIdCode){
                union.timeline.loadAction = function(params, callback){
                    $http.get(apiEndpoint + "/article/point/" + $routeParams.pointIdCode, {
                        params: params
                    }).then(function(response){
                        callback(response);
                    },function(error){
                        alert("未知错误");
                        console.log(error);
                    });
                };
                $http.get(apiEndpoint + "/normal-point/" + $routeParams.pointIdCode, {
                    params: {
                        includeStats: true,
                        includeVotes: true,
                        idType: "IdCode"
                    }
                }).then(function(response){
                    console.log(response.data);

                    var point = response.data;
                    var summary = {
                        head: {},
                        avatar: point.AvatarImage,
                        background: point.BackgroundImage,
                        pointSum: {
                            type: utils.getPointType(point.Type),
                            readerNum: point.SubscriberCount,
                            articleNum: point.ArticleCount
                        },
                        id: point.Id
                    };

                    if(point.PreferedName == "Chinese"){
                        point.mainName = point.ChineseName;
                        summary.head.mainHead = point.ChineseName;
                        summary.head.subHead = point.EnglishName;
                    }else {
                        point.mainName = point.EnglishName;
                        summary.head.mainHead = point.EnglishName;
                        summary.head.subHead = point.ChineseName;
                    }
                    pageTitle.set(point.mainName + " - 其乐");
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
                    $.extend(union.summary, summary);

                    $http.get(apiEndpoint + "user-point-subscription", {
                        params: {
                            pointId: point.Id
                        }
                    }).then(function (response) {
                        union.summary.subscribed = response.data;
                    }, function (error) {
                        alert("未知错误");
                        console.error(error);
                    });
                },function(error){
                    alert("未知错误");
                    console.log(error);
                });

                $http.get(apiEndpoint + "/article/point/" + $routeParams.pointIdCode, {
                    params: {
                        idType: "IdCode",
                        take: 10
                    }
                }).then(function(response){
                    console.log(response.data);
                    var articleList = response.data;
                    if(articleList.length < 10){
                        union.timeline.noMoreArticle = true;
                    }

                    for(var i in articleList){
                        var article = articleList[i];
                        union.timeline.entries.push({
                            types: [article.TypeName],
                            author: {
                                username: article.Author.UserName,
                                avatarUrl: article.Author.AvatarImage
                            },
                            datetime: article.PublishTime,
                            title: article.Title,
                            summary: article.Content,
                            url: "/article/" + article.Author.IdCode + "/" + article.SequenceNumberForAuthor,
                            count: {
                                like: article.LikeCount,
                                comment: article.CommentCount
                            }
                        });
                    }
                },function(error){
                    alert("未知错误");
                    console.log(error);
                });
            }
        }
    ]);
})();