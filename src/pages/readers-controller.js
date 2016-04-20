/**
 * Created by Rex on 15/9/23.
 */
(function () {
    keylolApp.controller("ReadersController", [
        "pageHead", "$scope", "union", "$http", "notification", "utils", "$timeout", "$location",
        (pageHead, $scope, union, $http, notification, utils, $timeout, $location) => {
            if (!union.$localStorage.user) {
                $location.url("/");
                return;
            }
            $scope.union = union;
            $scope.searchExist = true;
            const summary = {
                head: {
                    mainHead: union.$localStorage.user.UserName,
                    subHead: union.$localStorage.user.GamerTag,
                },
                avatar: union.$localStorage.user.AvatarImage,
                pointSum: {
                    type: "个人",
                    readerNum: union.$localStorage.user.SubscriberCount,
                    articleNum: union.$localStorage.user.ArticleCount,
                },
            };
            pageHead.setTitle(`${union.$localStorage.user.UserName} 的读者 - 其乐`);

            $http.get(`${apiEndpoint}user/${union.$localStorage.user.IdCode}`, {
                params: {
                    idType: "IdCode",
                    profilePointBackgroundImage: true,
                },
            }).then(response => {
                summary.background = response.data.ProfilePointBackgroundImage;
            }, response => {
                notification.error("发生未知错误，请重试或与站务职员联系", response);
            });

            const timeline = {
                title: {
                    mainTitle: "搜索结果",
                    subTitle: "Search Result",
                },
                cannotClick: true,
                loadAction () {
                    if (timeline) {
                        timeline.loadingLock = true;
                        $http.get(`${apiEndpoint}user/my`, {
                            params: {
                                take: utils.timelineLoadCount,
                                skip: timeline.entries.length,
                            },
                        }).then(response => {
                            timeline.noMoreArticle = response.data.length < utils.timelineLoadCount;
                            let timelineTimeout;
                            function createTimeoutFunction (entry) {
                                return () => {
                                    if (!timelineTimeout) {
                                        entry.show = true;
                                        timelineTimeout = $timeout(() => {
                                        }, utils.timelineShowDelay);
                                    } else {
                                        timelineTimeout = timelineTimeout.then(() => {
                                            entry.show = true;
                                            return $timeout(() => {}, utils.timelineShowDelay);
                                        });
                                    }
                                };
                            }

                            if (response.data.length > 0) {
                                timeline.searchNotFound = false;
                                for (let i = 0; i < response.data.length; i++) {
                                    const user = response.data[i];
                                    timeline.searchNotFound = false;
                                    const entry = {
                                        types: ["个人"],
                                        pointInfo: {
                                            reader: user.SubscriberCount,
                                            article: user.ArticleCount,
                                        },
                                        title: user.UserName,
                                        summary: user.GamerTag,
                                        hasBackground: true,
                                        background: user.ProfilePointBackgroundImage,
                                        pointAvatar: user.AvatarImage,
                                        url: `user/${user.IdCode}`,
                                        isUser: true,
                                        id: user.Id,
                                    };
                                    timeline.entries.push(entry);
                                    $timeout(createTimeoutFunction(entry));
                                }
                            } else {
                                timeline.searchNotFound = true;
                            }
                            if (timelineTimeout) {
                                timelineTimeout.then(() => {
                                    timeline.loadingLock = false;
                                });
                            } else {
                                timeline.loadingLock = false;
                            }
                        }, response => {
                            notification.error("发生未知错误，请重试或与站务职员联系", response);
                            timeline.loadingLock = false;
                        });
                    }
                },
                entries: [],
            };
            timeline.loadAction();

            union.timeline = timeline;
            union.summary = summary;
        },
    ]);
}());
