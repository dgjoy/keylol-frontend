(function () {
    "use strict";

    keylolApp.controller("HomeController", [
        "pageTitle", "$scope", "union", "$http", "notification", "window", "utils", "$timeout",
        function (pageTitle, $scope, union, $http, notification, window, utils, $timeout) {
            pageTitle.set("其乐");
            $scope.union = union;
            union.timeline = {
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
                                vm: null
                            }
                        });
                    }
                },
                noArticleText: {
                    main: "从你的游戏兴趣开始，慢慢搭建一条讯息轨道",
                    sub: "订阅一个据点后，其收到的文章投稿会推送到这里。"
                },
                datetime: "outBlock",
                hasExpand: true,
                loadingLock: true,
                loadAction: function (params, callback) {
                    $http.get(apiEndpoint + "article/subscription", {
                        params: params
                    }).then(function (response) {
                        callback(response);
                    }, function (error) {
                        notification.error("未知错误");
                        console.log(error);
                    });
                },
                entries: []
            };


            $http.get(apiEndpoint + "article/subscription", {
                params: {
                    take: utils.timelineLoadCount
                }
            }).then(function (response) {
                var articleList = response.data;
                union.timeline.noMoreArticle = articleList.length < utils.timelineLoadCount;

                if(articleList.length > 0){
                    var timelineTimeout;

                    /**
                     * 对于请求回来的文章列表做一系列处理并按照用户据点的文章格式储存在 union.timeline.entries 中
                     */
                    for (var i in articleList) {
                        var article = articleList[i];
                        var entry = {
                            types: [article.TypeName],
                            author: {
                                username: article.Author.UserName,
                                avatarUrl: article.Author.AvatarImage,
                                idCode: article.Author.IdCode
                            },
                            sequenceNumber: article.SequenceNumber,
                            sources: {},
                            datetime: article.PublishTime,
                            title: article.Title,
                            summary: article.Content,
                            thumbnail: article.ThumbnailImage,
                            url: "/article/" + article.Author.IdCode + "/" + article.SequenceNumberForAuthor,
                            count: {
                                like: article.LikeCount,
                                comment: article.CommentCount
                            }
                        };
                        if (article.TimelineReason) {
                            switch (article.TimelineReason) {
                                case "Like":
                                    entry.sources.type = "like";
                                    entry.sources.userArray = [];
                                    if (article.LikeByUsers) {
                                        for (var j in article.LikeByUsers) {
                                            entry.sources.userArray.push({
                                                name: article.LikeByUsers[j].UserName,
                                                idCode: article.LikeByUsers[j].IdCode
                                            });
                                        }
                                    } else {
                                        entry.sources.userArray.push({
                                            name: union.$localStorage.user.UserName,
                                            idCode: "/user/" + union.$localStorage.user.IdCode
                                        });
                                    }
                                    break;
                                case "Point":
                                    entry.sources.type = "point";
                                    entry.sources.points = [];
                                    for (var j in article.AttachedPoints) {
                                        entry.sources.points.push({
                                            name: article.AttachedPoints[j][article.AttachedPoints[j].PreferredName + "Name"],
                                            idCode: article.AttachedPoints[j].IdCode
                                        });
                                    }
                                    break;
                                case "Publish":
                                    entry.sources.type = "publish";
                                    break;
                                default :
                                    break;
                            }
                        }
                        (function(entry){
                            if(!timelineTimeout){
                                union.timeline.entries.push(entry);
                                timelineTimeout = $timeout(function(){}, utils.timelineInsertDelay);
                            }else {
                                timelineTimeout = timelineTimeout.then(function(){
                                    union.timeline.entries.push(entry);
                                    return $timeout(function(){}, utils.timelineInsertDelay);
                                });
                            }
                        })(entry);
                    }
                    if(timelineTimeout){
                        timelineTimeout.then(function(){
                            union.timeline.loadingLock = false;
                        });
                    }else {
                        union.timeline.loadingLock = false;
                    }
                }else {
                    $http.get(apiEndpoint + "normal-point/active").then(function(response){
                        union.timeline.activePoints = response.data;
                        for(var i in union.timeline.activePoints){
                            var point = union.timeline.activePoints[i];
                            union.timeline.activePoints[i].mainName = utils.getPointFirstName(point);
                            union.timeline.activePoints[i].subName = utils.getPointSecondName(point);
                            union.timeline.activePoints[i].type = utils.getPointType(point.Type);
                        }
                    },function(error){
                        notification.error("未知错误", error);
                    });
                    union.timeline.loadingLock = false;
                }

            }, function (error) {
                notification.error("未知错误", error);
                union.timeline.loadingLock = false;
            });
        }
    ]);
})();