/**
 * Created by Rex on 15/9/23.
 */
(function () {
    keylolApp.controller('SubscriptionsController', [
        'pageHead', '$scope', 'union', '$http', 'notification', '$location', 'utils', '$timeout', 'window',
        (pageHead, $scope, union, $http, notification, $location, utils, $timeout, window) => {
            $scope.union = union;
            $scope.searchExist = true;
            const summary = {
                head: {
                    mainHead: union.$localStorage.user.UserName,
                    subHead: union.$localStorage.user.GamerTag,
                },
                avatar: union.$localStorage.user.AvatarImage,
                pointSum: {
                    type: '个人',
                    readerNum: union.$localStorage.user.SubscriberCount,
                    articleNum: union.$localStorage.user.ArticleCount,
                },
            };
            pageHead.setTitle(`${union.$localStorage.user.UserName} 的订阅 - 其乐`);

            $http.get(`${apiEndpoint}user/${union.$localStorage.user.IdCode}`, {
                params: {
                    idType: 'IdCode',
                    profilePointBackgroundImage: true,
                },
            }).then(response => {
                summary.background = response.data.ProfilePointBackgroundImage;
            }, response => {
                notification.error('发生未知错误，请重试或与站务职员联系', response);
            });

            const timeline = {
                title: {
                    mainTitle: '搜索结果',
                    subTitle: 'Search Result',
                },
                cannotClick: true,
                actions: [
                    {
                        active: false,
                        text: '同步订阅列表',
                        onClick () {
                            const that = this;
                            if (!that.lock) {
                                that.lock = true;
                                $http.get(`${apiEndpoint}user-point-subscription/my/auto`).then(response => {
                                    that.lock = false;
                                    window.show({
                                        templateUrl: 'src/windows/synchronization.html',
                                        controller: 'SynchronizationController',
                                        inputs: {
                                            condition: 'review',
                                            autoSubscribed: response.data,
                                            options: {},
                                        },
                                    });
                                }, response => {
                                    notification.error('发生未知错误，请重试或与站务职员联系', response);
                                    that.lock = false;
                                });
                            }
                        },
                    },
                ],
                loadAction () {
                    if (timeline) {
                        timeline.loadingLock = true;
                        $http.get(`${apiEndpoint}user-point-subscription/my`, {
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
                                    let entry = {};
                                    if (response.data[i].NormalPoint) {
                                        const point = response.data[i].NormalPoint;
                                        entry = {
                                            types: [utils.getPointType(point.Type)],
                                            pointInfo: {
                                                reader: response.data[i].SubscriberCount,
                                                article: response.data[i].ArticleCount,
                                            },
                                            title: utils.getPointFirstName(point),
                                            summary: utils.getPointSecondName(point),
                                            hasBackground: true,
                                            isPoint: true,
                                            background: point.BackgroundImage,
                                            pointAvatar: point.AvatarImage,
                                            url: `point/${point.IdCode}`,
                                            subscribed: true,
                                            id: point.Id,
                                        };
                                    } else if (response.data[i].User) {
                                        const user = response.data[i].User;
                                        timeline.searchNotFound = false;
                                        entry = {
                                            types: ['个人'],
                                            pointInfo: {
                                                reader: response.data[i].SubscriberCount,
                                                article: response.data[i].ArticleCount,
                                            },
                                            subscribed: true,
                                            title: user.UserName,
                                            summary: user.GamerTag,
                                            hasBackground: true,
                                            background: user.ProfilePointBackgroundImage,
                                            pointAvatar: user.AvatarImage,
                                            url: `user/${user.IdCode}`,
                                            isUser: true,
                                            id: user.Id,
                                        };
                                    }
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
                            notification.error('发生未知错误，请重试或与站务职员联系', response);
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
