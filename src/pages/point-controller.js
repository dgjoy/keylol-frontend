(function () {
    keylolApp.controller("PointController", [
        "pageHead", "$scope", "union", "$routeParams", "$http", "utils", "notification", "window", "$location", "$timeout",
        (pageHead, $scope, union, $routeParams, $http, utils, notification, window, $location, $timeout) => {
            /**
             * 初始化union的一些属性
             */
            $scope.union = union;
            $scope.pointExist = true;
            $scope.isInPoint = true;
            const summary = {};
            const unionUser = {};
            const unionPoint = {};
            const timeline = {
                title: {
                    mainTitle: "讯息轨道",
                    subTitle: "Timeline",
                },
                rightButton: {
                    avatar: "assets/images/edit-pen.png",
                    alt: "发表新文章",
                    text: "文",
                    clickAction () {
                        window.show({
                            templateUrl: "src/windows/editor.html",
                            controller: "EditorController",
                            inputs: { options: null },
                        });
                    },
                },
                datetime: "outBlock",
                hasExpand: true,
                loadingLock: true,
                entries: [],
            };

            if ($routeParams.userIdCode) {
                $scope.isInPoint = false;

                timeline.noArticleText = {
                    main: "这位用户尚未发布或认可任何文章",
                    sub: "订阅并关注即将到来的动态。",
                };

                /**
                 * 定义在 timeline 中调用的加载函数
                 * @param params 加载时请求的参数
                 * @param callback 加载后的回调
                 */
                timeline.loadAction = function (params, callback) {
                    $http.get(`${apiEndpoint}article/user/${$routeParams.userIdCode}`, { params }).then(response => {
                        callback(response);
                    }, response => {
                        notification.error("发生未知错误，请重试或与站务职员联系", response);
                    });
                };

                /**
                 * 请求用户信息，用户的信息会被存储在 unionUser 里。
                 * 同时对用户部分信息做处理后，用于 summary 中。
                 */
                $http.get(`${apiEndpoint}user/${$routeParams.userIdCode}`, {
                    params: {
                        stats: true,
                        idType: "IdCode",
                        profilePointBackgroundImage: true,
                        subscribed: true,
                    },
                }).then(response => {
                    const user = response.data;
                    if (union.$localStorage.user && user.IdCode !== union.$localStorage.user.IdCode) {
                        summary.subscribed = user.Subscribed;
                    }
                    utils.addRecentBroswe("ProfilePoint", user.UserName, user.IdCode);
                    pageHead.setTitle(`${user.UserName} - 其乐`);
                    $.extend(unionUser, user);
                    $.extend(summary, {
                        head: {
                            mainHead: user.UserName,
                            subHead: user.GamerTag,
                        },
                        avatar: user.AvatarImage,
                        background: user.ProfilePointBackgroundImage,
                        pointSum: {
                            type: "个人",
                            readerNum: user.SubscriberCount,
                            articleNum: user.ArticleCount,
                        },
                        id: user.Id,
                        url: `user/${user.IdCode}`,
                    });


                    /**
                     * 请求文章列表，放于请求用户信息之后
                     */
                    $http.get(`${apiEndpoint}article/user/${$routeParams.userIdCode}`, {
                        params: {
                            idType: "IdCode",
                            take: utils.timelineLoadCount,
                        },
                    }).then(response => {
                        const articleList = response.data;
                        timeline.noMoreArticle = articleList.length < utils.timelineLoadCount;

                        if (articleList.length > 0) {
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

                            /**
                             * 对于请求回来的文章列表做一系列处理并按照用户据点的文章格式储存在 timeline.entries 中
                             */
                            for (let i = 0; i < articleList.length; i++) {
                                const article = articleList[i];
                                if (!article.Author) {
                                    article.Author = user;
                                }
                                const entry = {
                                    types: [article.TypeName],
                                    author: {
                                        username: article.Author.UserName,
                                        avatarUrl: article.Author.AvatarImage,
                                        idCode: article.Author.IdCode,
                                    },
                                    sequenceNumber: article.SequenceNumber,
                                    sources: {},
                                    voteForPoint: article.VoteForPoint,
                                    vote: article.Vote,
                                    datetime: article.PublishTime,
                                    title: article.Title,
                                    summary: article.Content,
                                    hasBackground: false,
                                    thumbnail: article.ThumbnailImage,
                                    hasThumbnail: true,
                                    url: `/article/${article.Author.IdCode}/${article.SequenceNumberForAuthor}`,
                                    count: {
                                        like: article.LikeCount,
                                        comment: article.CommentCount,
                                    },
                                };
                                if (article.TimelineReason) {
                                    switch (article.TimelineReason) {
                                        case "Like":
                                            entry.sources.type = "like";
                                            entry.sources.userArray = [];
                                            if (article.LikeByUsers) {
                                                for (let j = 0;j < article.LikeByUsers.length;j++) {
                                                    entry.sources.userArray.push({
                                                        name: article.LikeByUsers[j].UserName,
                                                        idCode: article.LikeByUsers[j].IdCode,
                                                    });
                                                }
                                            } else {
                                                entry.sources.userArray.push({
                                                    name: user.UserName,
                                                    idCode: user.IdCode,
                                                });
                                            }
                                            break;
                                        case "Point":
                                            entry.sources.type = "point";
                                            entry.sources.points = [];
                                            for (let j = 0;j < article.AttachedPoints.length;j++) {
                                                entry.sources.points.push({
                                                    name: article.AttachedPoints[j][`${article.AttachedPoints[j].PreferredName}Name`],
                                                    idCode: article.AttachedPoints[j].IdCode,
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
                                timeline.entries.push(entry);
                                $timeout(createTimeoutFunction(entry));
                            }
                            if (timelineTimeout) {
                                timelineTimeout.then(() => {
                                    timeline.loadingLock = false;
                                });
                            } else {
                                timeline.loadingLock = false;
                            }
                        } else {
                            $http.get(`${apiEndpoint}normal-point/active`).then(response => {
                                timeline.activePoints = response.data;
                                for (let i = 0;i < timeline.activePoints.length;i++) {
                                    const point = timeline.activePoints[i];
                                    timeline.activePoints[i].mainName = utils.getPointFirstName(point);
                                    timeline.activePoints[i].subName = utils.getPointSecondName(point);
                                    timeline.activePoints[i].type = utils.getPointType(point.Type);
                                }
                            }, response => {
                                notification.error("发生未知错误，请重试或与站务职员联系", response);
                            });
                            timeline.loadingLock = false;
                        }
                    }, response => {
                        notification.error("发生未知错误，请重试或与站务职员联系", response);
                        timeline.loadingLock = false;
                    });
                }, response => {
                    $scope.pointExist = false;
                    notification.error("发生未知错误，请重试或与站务职员联系", response);
                });
            }

            if ($routeParams.pointIdCode) {
                timeline.noArticleText = {
                    main: "当前据点尚未收到任何文章投稿",
                    sub: "考虑成为首篇文章的作者？",
                };

                /**
                 * 定义在 timeline 中调用的加载函数
                 * @param params 加载时请求的参数
                 * @param callback 加载后的回调
                 */
                timeline.loadAction = (params, callback) => {
                    $http.get(`${apiEndpoint}article/point/${$routeParams.pointIdCode}`, { params }).then(response => {
                        callback(response);
                    }, response => {
                        notification.error("发生未知错误，请重试或与站务职员联系", response);
                    });
                };

                /**
                 * 请求据点信息，储存在 unionPoint 中。
                 * 以 summary 的格式对于 unionPoint 做一些处理, 存储到 summary 中。
                 */
                $http.get(`${apiEndpoint}normal-point/${$routeParams.pointIdCode}`, {
                    params: {
                        stats: true,
                        votes: true,
                        subscribed: true,
                        related: true,
                        coverDescription: true,
                        more: true,
                        idType: "IdCode",
                    },
                }).then(response => {
                    const point = response.data;

                    if (point.Type === "Game") {
                        $scope.hasVote = true;
                        if (union.$localStorage.user) {
                            $http.get(`${apiEndpoint}user-game-record/${union.$localStorage.user.Id}/${point.SteamAppId}`).then(response => {
                                unionPoint.hoursPlayed = response.data;
                            }, response => {
                                if (response.status !== 404) {
                                    notification.error("发生未知错误，请重试或与站务职员联系", response);
                                }
                            });
                        }
                    }

                    point.totalEvaluate = 0;
                    let totalVote = 0;
                    for (const i in point.VoteStats) {
                        if (point.VoteStats.hasOwnProperty(i)) {
                            point.totalEvaluate += point.VoteStats[i];
                            totalVote += point.VoteStats[i] * 2 * i;
                            if (point.VoteStats[i] > 0 && (!point.highlight || point.VoteStats[i] >= point.VoteStats[point.highlight])) {
                                point.highlight = i;
                            }
                        }
                    }
                    point.votePercent = (((totalVote / point.totalEvaluate) - 2) / 0.8).toFixed(1);

                    const mainName = utils.getPointFirstName(point);

                    pageHead.setTitle(`${mainName} - 其乐`);

                    utils.addRecentBroswe("NormalPoint", mainName, point.IdCode);
                    $.extend(unionPoint, point);
                    $.extend(summary, {
                        head: {
                            mainHead: utils.getPointFirstName(point),
                            subHead: utils.getPointSecondName(point),
                        },
                        avatar: point.AvatarImage,
                        subscribed: point.Subscribed,
                        background: point.BackgroundImage,
                        pointSum: {
                            type: utils.getPointType(point.Type),
                            readerNum: point.SubscriberCount,
                            articleNum: point.ArticleCount,
                        },
                        id: point.Id,
                        url: `point/${point.IdCode}`,
                    });
                }, response => {
                    $scope.pointExist = false;
                    notification.error("发生未知错误，请重试或与站务职员联系", response);
                });

                /**
                 * 请求据点对应的文章
                 */
                $http.get(`${apiEndpoint}article/point/${$routeParams.pointIdCode}`, {
                    params: {
                        idType: "IdCode",
                        take: utils.timelineLoadCount,
                    },
                }).then(response => {
                    const articleList = response.data;
                    timeline.noMoreArticle = articleList.length < utils.timelineLoadCount;
                    if (articleList.length > 0) {
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

                        for (let i = 0; i < articleList.length; i++) {
                            const article = articleList[i];
                            const entry = {
                                types: [article.TypeName],
                                author: {
                                    username: article.Author.UserName,
                                    avatarUrl: article.Author.AvatarImage,
                                    idCode: article.Author.IdCode,
                                },
                                voteForPoint: article.VoteForPoint,
                                vote: article.Vote,
                                sequenceNumber: article.SequenceNumber,
                                datetime: article.PublishTime,
                                title: article.Title,
                                summary: article.Content,
                                hasBackground: false,
                                thumbnail: article.ThumbnailImage,
                                hasThumbnail: true,
                                url: `/article/${article.Author.IdCode}/${article.SequenceNumberForAuthor}`,
                                count: {
                                    like: article.LikeCount,
                                    comment: article.CommentCount,
                                },
                            };
                            timeline.entries.push(entry);
                            $timeout(createTimeoutFunction(entry));
                        }
                        if (timelineTimeout) {
                            timelineTimeout.then(() => {
                                timeline.loadingLock = false;
                            });
                        } else {
                            timeline.loadingLock = false;
                        }
                    } else {
                        $http.get(`${apiEndpoint}normal-point/active`).then(response => {
                            timeline.activePoints = response.data;
                            for (let i = 0;i < timeline.activePoints.length;i++) {
                                const point = timeline.activePoints[i];
                                timeline.activePoints[i].mainName = utils.getPointFirstName(point);
                                timeline.activePoints[i].subName = utils.getPointSecondName(point);
                                timeline.activePoints[i].type = utils.getPointType(point.Type);
                            }
                        }, response => {
                            notification.error("发生未知错误，请重试或与站务职员联系", response);
                        });
                        timeline.loadingLock = false;
                    }
                }, response => {
                    notification.error("发生未知错误，请重试或与站务职员联系", response);
                    timeline.loadingLock = false;
                });
            }

            union.timeline = timeline;
            union.user = unionUser;
            union.point = unionPoint;
            union.summary = summary;
        },
    ]);
}());
