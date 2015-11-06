/**
 * Created by Rex on 15/9/23.
 */
(function () {
    "use strict";

    keylolApp.controller("SearchResultsController", [
        "pageTitle", "$scope", "union", "$http", "notification", "$routeParams", "$location", "utils",
        function (pageTitle, $scope, union, $http, notification, $routeParams, $location, utils) {
            if(!$routeParams.searchType || !$routeParams.keyword){
                $location.url("404");
            }
            pageTitle.set($routeParams.keyword + " 的搜索结果 - 其乐");
            union.summary = {
                actions: [],
                head: {
                    mainHead: $routeParams.keyword ,
                    subHead: "的搜索结果"
                },
                background: "04be114e21692aa38afe2e4d1bc605b6.png",
                defaultSum: {
                    text: "找到  个符合的项目"
                }
            };
            union.timeline = {
                title: {
                    mainTitle: "搜索结果",
                    subTitle: "Search Result"
                },
                noMoreArticle: true,
                searchNotFound: true,
                actions: [
                    {
                        active: false,
                        text: "据点",
                        onClick: function () {
                            $location.url("search/point/" + encodeURIComponent($routeParams.keyword));
                        }
                    },
                    {
                        active: false,
                        text: "文章",
                        onClick: function () {
                            $location.url("search/article/" + encodeURIComponent($routeParams.keyword));
                        }
                    },
                    {
                        active: false,
                        text: "用户",
                        onClick: function () {
                            $location.url("search/user/" + encodeURIComponent($routeParams.keyword));
                        }
                    },
                    {
                        active: false,
                        text: "全站",
                        onClick: function () {
                        }
                    }
                ],
                datetime: "outBlock",
                entries: []
            };
            switch ($routeParams.searchType){
                case "point":
                    union.timeline.loadAction = function (params, callback) {};
                    union.timeline.actions[0].active = true;
                    $http.get(apiEndpoint + "normal-point/keyword/" + encodeURIComponent($routeParams.keyword), {
                        params: {
                            full: true,
                            take: 50
                        }
                    }).then(function(response){
                        union.summary.defaultSum.text = "找到 " + response.data.length + " 个符合的项目";
                        if(response.data.length > 0){
                            union.timeline.searchNotFound = false;
                            for(var i in response.data){
                                var point = response.data[i];
                                var result = {
                                    types: [utils.getPointType(point.Type)],
                                    pointInfo: {
                                        reader: point.SubscriberCount,
                                        article: point.ArticleCount
                                    },
                                    pointAvatar: point.AvatarImage,
                                    url: "point/" + point.IdCode,
                                    subscribed: point.Subscribed,
                                    id: point.Id
                                };
                                if(point.PreferedName === "Chinese"){
                                    result.title = point.ChineseName;
                                    result.summary = point.EnglishName;
                                }else {
                                    result.title = point.EnglishName;
                                    result.summary = point.ChineseName;
                                }
                                union.timeline.entries.push(result);
                            }
                        }
                    },function(error){
                        notification.error("未知错误", error);
                    });
                    break;
                case "article":
                    union.timeline.loadAction = function (params, callback) {};
                    union.timeline.actions[1].active = true;
                    $http.get(apiEndpoint + "article/keyword/" + encodeURIComponent($routeParams.keyword), {
                        params: {
                            full: true,
                            take: 50
                        }
                    }).then(function(response){
                        union.summary.defaultSum.text = "找到 " + response.data.length + " 个符合的项目";
                        if(response.data.length > 0) {
                            union.timeline.searchNotFound = false;
                            for (var i in response.data) {
                                var article = response.data[i];
                                var result = {
                                    types: [article.TypeName],
                                    author: {
                                        username: article.Author.UserName,
                                        avatarUrl: article.Author.AvatarImage,
                                        idCode: article.Author.IdCode
                                    },
                                    sequenceNumber: article.SequenceNumber,
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
                                union.timeline.entries.push(result);
                            }
                        }
                    },function(error){
                        notification.error("未知错误", error);
                    });
                    break;
                case "user":
                    union.timeline.loadAction = function (params, callback) {};
                    union.timeline.actions[2].active = true;
                    $http.get(apiEndpoint + "user/" + encodeURIComponent($routeParams.keyword), {
                        params: {
                            idType: "UserName",
                            includeStats: true,
                            includeSubscribed: true
                        }
                    }).then(function(response){
                        if(response.data){
                            union.timeline.searchNotFound = false;
                            union.summary.defaultSum.text = "找到 1 个符合的项目";
                            var user = response.data;
                            union.timeline.entries.push({
                                types: ["个人"],
                                pointInfo: {
                                    reader: user.SubscriberCount,
                                    article: user.ArticleCount
                                },
                                title: user.UserName,
                                summary: user.GamerTag,
                                pointAvatar: user.AvatarImage,
                                url: "user/" + user.IdCode,
                                isUser: true,
                                id: user.Id
                            });
                            if (user.IdCode != union.$localStorage.user.IdCode) {
                                union.timeline.entries[0].subscribed = user.Subscribed;
                            }
                        }
                    },function(error){
                        if(error.status === 404){
                            union.summary.defaultSum.text = "找到 0 个符合的项目";
                        }else {
                            notification.error("未知错误", error);
                        }
                    });
                    break;
                default :
                    $location.url("404");
            }
        }
    ]);
})();