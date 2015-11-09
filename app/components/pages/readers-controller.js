/**
 * Created by Rex on 15/9/23.
 */
(function () {
    "use strict";

    keylolApp.controller("ReadersController", [
        "pageTitle", "$scope", "union", "$http", "notification",
        function (pageTitle, $scope, union, $http, notification) {

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
            pageTitle.set(union.$localStorage.user.UserName + " 的读者 - 其乐");

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
                loadAction: function(){},
                entries: []
            };
            $http.get(apiEndpoint + "user/my", {
                params: {
                    take: timeLineLoadCount,
                    skip: 0
                }
            }).then(function (response) {
                if(response.data.length > 0){
                    union.timeline.searchNotFound = false;
                    for (var i in response.data) {
                        var user = response.data[i];
                        union.timeline.searchNotFound = false;
                        union.timeline.entries.push({
                            types: ["个人"],
                            pointInfo: {
                                reader: user.SubscriberCount,
                                article: user.ArticleCount
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
            }, function (error) {
                notification.error("未知错误", error);
            });
        }
    ]);
})();