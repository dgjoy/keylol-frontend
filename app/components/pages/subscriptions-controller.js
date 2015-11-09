/**
 * Created by Rex on 15/9/23.
 */
(function () {
    "use strict";

    keylolApp.controller("SubscriptionsController", [
        "pageTitle", "$scope", "union", "$http", "notification", "$location", "utils",
        function (pageTitle, $scope, union, $http, notification, $location, utils) {

            $scope.searchExist = true;
            union.summary = {
                head: {
                    mainHead: union.$localStorage.user.UserName,
                    subHead: union.$localStorage.user.GamerTag
                },
                avatar: union.$localStorage.user.AvatarImage,
                pointSum: {
                    type: "个人",
                    readerNum: union.$localStorage.user.SubscriberCount,
                    articleNum: union.$localStorage.user.ArticleCount
                }
            };
            pageTitle.set(union.$localStorage.user.UserName + " 的订阅 - 其乐");

            $http.get(apiEndpoint + "user/" + union.$localStorage.user.IdCode, {
                params: {
                    idType: "IdCode",
                    includeProfilePointBackgroundImage: true
                }
            }).then(function (response) {
                union.summary.background = response.data.ProfilePointBackgroundImage;
            }, function (error) {
                notification.error("未知错误", error);
            });

            union.timeline = {
                title: {
                    mainTitle: "搜索结果",
                    subTitle: "Search Result"
                },
                noMoreArticle: true,
                searchNotFound: true,
                datetime: "outBlock",
                loadAction: function(callback){
                    $http.get(apiEndpoint + "user-point-subscription/my", {
                        params: {
                            take: utils.timelineLoadCount,
                            skip: union.timeline.entries.length
                        }
                    }).then(function (response) {
                        union.timeline.noMoreArticle = response.data.length < utils.timelineLoadCount;
                        if(response.data.length > 0){
                            union.timeline.searchNotFound = false;
                            for (var i in response.data) {
                                if(response.data[i].NormalPoint){
                                    var point = response.data[i].NormalPoint;
                                    var result = {
                                        types: [utils.getPointType(point.Type)],
                                        pointInfo: {
                                            reader: response.data[i].SubscriberCount,
                                            article: response.data[i].ArticleCount
                                        },
                                        pointAvatar: point.AvatarImage,
                                        url: "point/" + point.IdCode,
                                        subscribed: true,
                                        id: point.Id
                                    };
                                    result.title = utils.getPointFirstName(point);
                                    result.summary = utils.getPointSecondName(point);
                                    union.timeline.entries.push(result);
                                }else if(response.data[i].User){
                                    var user = response.data[i].User;
                                    union.timeline.searchNotFound = false;
                                    union.timeline.entries.push({
                                        types: ["个人"],
                                        pointInfo: {
                                            reader: response.data[i].SubscriberCount,
                                            article: response.data[i].ArticleCount
                                        },
                                        subscribed: true,
                                        title: user.UserName,
                                        summary: user.GamerTag,
                                        pointAvatar: user.AvatarImage,
                                        url: "user/" + user.IdCode,
                                        isUser: true,
                                        id: user.Id
                                    });
                                }
                            }
                        }
                    }, function (error) {
                        notification.error("未知错误", error);
                    }).finally(function () {
                        if (callback) {
                            callback();
                        }
                    });
                },
                entries: []
            };
            union.timeline.loadAction();
        }
    ]);
})();