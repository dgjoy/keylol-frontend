(function () {
    "use strict";

    keylolApp.controller("HomeController", [
        "pageTitle", "$scope", "union", "$http", "notification", "window",
        function (pageTitle, $scope, union, $http, notification, window) {
            pageTitle.set("其乐");
            union.timeline = {
                title: {
                    mainTitle: "讯息轨道",
                    subTitle: "Timeline"
                },
                rightButton: {
                    avatar: "assets/images/edit-pen.png",
                    alt: "发表新文章",
                    href: "test",
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
                datetime: "outBlock",
                hasExpand: true,
                noMoreArticle: true,
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
            if (union.$localStorage.homeTimeline) {
                union.timeline.entries = union.$localStorage.homeTimeline;
            }


            $http.get(apiEndpoint + "article/subscription", {
                params: {
                    take: 20
                }
            }).then(function (response) {
                var articleList = response.data;
                if (articleList.length < 20) {
                    union.timeline.noMoreArticle = true;
                } else {
                    union.timeline.noMoreArticle = true;
                }
                union.timeline.entries.length = 0;

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
                        sources: {},
                        datetime: article.PublishTime,
                        title: article.Title,
                        summary: article.Content,
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
                                        name: article.AttachedPoints[j][article.AttachedPoints[j].PreferedName + "Name"],
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
                    union.timeline.entries.push(entry);
                }
                union.$localStorage.homeTimeline = union.timeline.entries;
            }, function (error) {
                notification.error("未知错误");
                console.log(error);
            });
        }
    ]);
})();