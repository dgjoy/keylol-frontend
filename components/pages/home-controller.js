(function () {
    keylolApp.controller("HomeController", [
        "pageHead", "$scope", "union", "$http", "notification", "window", "utils", "$timeout", "$location",
        "$rootScope", "articleTypes",
        (pageHead, $scope, union, $http, notification, window, utils, $timeout, $location,
        $rootScope, articleTypes) => {
            if (!union.$localStorage.login) {
                $scope.notLogin = true;
                return;
            }
            pageHead.setTitle("其乐 Keylol");
            $scope.union = union;
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
                            templateUrl: "components/windows/editor.html",
                            controller: "EditorController",
                            inputs: { options: null },
                        });
                    },
                },
                noArticleText: {
                    main: "从你的游戏兴趣开始，慢慢搭建一条讯息轨道",
                    sub: "订阅一个据点后，其收到的文章投稿会推送到这里。",
                },
                hasExpand: true,
                loadingLock: true,
                loadAction (params, callback) {
                    $http.get(`${apiEndpoint}article/subscription`, { params }).then(response => {
                        callback(response);
                    }, response => {
                        notification.error("发生未知错误，请重试或与站务职员联系", response);
                    });
                },
                entries: [],
            };

            if (union.$localStorage.firstOpenKeylol) {
                union.$localStorage.firstOpenKeylol = false;
                window.show({
                    templateUrl: "components/windows/sync-loading.html",
                    controller: "SyncLoadingController",
                    inputs: {
                        options: {
                            isFirstTime: true,
                            getSubscription,
                        },
                    },
                });
            } else {
                getSubscription();

                $http.put(`${apiEndpoint}user-game-record/my`, {}).then(response => {
                    window.show({
                        templateUrl: "components/windows/synchronization.html",
                        controller: "SynchronizationController",
                        inputs: {
                            condition: "subsequential",
                            autoSubscribed: response.data,
                            options: { getSubscription },
                        },
                    });
                }, response => {
                    if (!union.$localStorage.login) return;
                    if (response.status === 404) return;
                    if (response.status === 401) {
                        window.show({
                            templateUrl: "components/windows/synchronization.html",
                            controller: "SynchronizationController",
                            inputs: {
                                condition: "fetchFailed",
                                autoSubscribed: {},
                                options: { getSubscription },
                            },
                        });
                        return;
                    }
                    notification.error("发生未知错误，请重试或与站务职员联系", response);
                });
            }

            $rootScope.$on("homeRefresh", () => {
                getSubscription();
            });

            function getSubscription() {
                timeline.entries = [];
                timeline.loadingLock = true;
                timeline.activePoints = null;
                const params = {
                    take: utils.timelineLoadCount,
                    articleTypeFilter: "",
                    shortReviewFilter: 1,
                };
                let filterOptions = [];
                for (let i = 0; i < articleTypes.length; ++i) {
                    filterOptions.push(true);
                }
                if (union.$localStorage.homeFilter) {
                    filterOptions = union.$localStorage.homeFilter.filterOptions.slice();
                    params.shortReviewFilter = union.$localStorage.homeFilter.shortReviewFilter;
                }
                for (let i = 0; i < articleTypes.length; i++) {
                    if (filterOptions[i]) {
                        if (params.articleTypeFilter.length !== 0) {
                            params.articleTypeFilter += ",";
                        }
                        params.articleTypeFilter += articleTypes[i].name;
                    }
                }
                if (!params.articleTypeFilter && params.shortReviewFilter === 0) {
                    timeline.noMoreArticle = true;
                    timeline.loadingLock = false;
                } else {
                    if (!params.articleTypeFilter) {
                        params.articleTypeFilter = "hack";
                    }

                    $http.get(`${apiEndpoint}article/subscription`, { params }).then(response => {
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
                             * 对于请求回来的文章列表做一系列处理并按照用户据点的文章格式储存在 union.timeline.entries 中
                             */

                            for (let i = 0; i < articleList.length; i++) {
                                const article = articleList[i];
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
                                                    name: union.$localStorage.user.UserName,
                                                    idCode: `/user/${union.$localStorage.user.IdCode}`,
                                                });
                                            }
                                            break;
                                        case "Point":
                                            if (article.AttachedPoints) {
                                                entry.sources.type = "point";
                                                entry.sources.points = article.AttachedPoints;
                                            } else {
                                                entry.sources = null;
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
                }
            }

            union.timeline = timeline;
        },
    ]);
}());
