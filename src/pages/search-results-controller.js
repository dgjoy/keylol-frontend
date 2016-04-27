/**
 * Created by Rex on 15/9/23.
 */
(function () {
    keylolApp.controller('SearchResultsController', [
        'pageHead', '$scope', 'union', '$http', 'notification', '$stateParams', '$location', 'utils', '$timeout',
        (pageHead, $scope, union, $http, notification, $stateParams, $location, utils, $timeout) => {
            $scope.searchExist = true;
            $scope.union = union;
            if (!$stateParams.searchType || !$stateParams.keyword) {
                $scope.searchExist = false;
            }
            pageHead.setTitle(`${$stateParams.keyword} 的搜索结果 - 其乐`);
            const summary = {
                actions: [],
                head: {
                    mainHead: $stateParams.keyword,
                    subHead: '的搜索结果',
                },
                background: 'keylol://18714f31d985cb8e8b59661cabd9d23a.jpg',
                defaultSum: { text: '' },
            };
            const timeline = {
                title: {
                    mainTitle: '搜索结果',
                    subTitle: 'Search Result',
                },
                actions: [
                    {
                        active: false,
                        text: '据点',
                        onClick () {
                            $location.url(`search/point/${encodeURIComponent($stateParams.keyword)}`);
                        },
                    },
                    {
                        active: false,
                        text: '文章',
                        onClick () {
                            $location.url(`search/article/${encodeURIComponent($stateParams.keyword)}`);
                        },
                    },
                    {
                        active: false,
                        text: '用户',
                        onClick () {
                            $location.url(`search/user/${encodeURIComponent($stateParams.keyword)}`);
                        },
                    },
                    {
                        active: false,
                        text: '全站',
                        onClick () {},
                    },
                ],
                entries: [],
            };
            switch ($stateParams.searchType) {
                case 'point':
                    timeline.actions[0].active = true;
                    timeline.loadAction = function () {
                        timeline.loadingLock = true;
                        const skip = timeline.entries.length;
                        $http.get(`${apiEndpoint}normal-point/keyword/${encodeURIComponent($stateParams.keyword)}`, {
                            params: {
                                skip,
                                full: true,
                                take: utils.timelineLoadCount,
                            },
                        }).then(response => {
                            const totalRecordCount = response.headers('X-Total-Record-Count');
                            summary.defaultSum.text = `找到 ${totalRecordCount} 个符合的项目`;
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
                            if (totalRecordCount > 0) {
                                if (!skip)
                                    summary.background = response.data[0].BackgroundImage;
                                timeline.searchNotFound = false;
                                for (let i = 0; i < response.data.length; i++) {
                                    const point = response.data[i];
                                    const entry = {
                                        types: [utils.getPointType(point.Type)],
                                        pointInfo: {
                                            reader: point.SubscriberCount,
                                            article: point.ArticleCount,
                                        },
                                        hasBackground: true,
                                        background: point.BackgroundImage,
                                        pointAvatar: point.AvatarImage,
                                        url: `point/${point.IdCode}`,
                                        isPoint: true,
                                        subscribed: point.Subscribed,
                                        id: point.Id,
                                    };
                                    entry.title = utils.getPointFirstName(point);
                                    entry.summary = utils.getPointSecondName(point);
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
                    };
                    timeline.loadAction();
                    break;
                case 'article':
                    timeline.actions[1].active = true;
                    timeline.loadAction = function () {
                        timeline.loadingLock = true;
                        const skip = timeline.entries.length;
                        $http.get(`${apiEndpoint}article/keyword/${encodeURIComponent($stateParams.keyword)}`, {
                            params: {
                                skip,
                                full: true,
                                take: utils.timelineLoadCount,
                            },
                        }).then(response => {
                            const totalRecordCount = response.headers('X-Total-Record-Count');
                            summary.defaultSum.text = `找到 ${totalRecordCount} 个符合的项目`;
                            timeline.noMoreArticle = response.data.length < utils.timelineLoadCount;
                            if (totalRecordCount > 0) {
                                if (!skip)
                                    summary.background = response.data[0].ThumbnailImage;
                                timeline.searchNotFound = false;
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
                                for (let i = 0; i < response.data.length; i++) {
                                    const article = response.data[i];
                                    const entry = {
                                        types: [article.TypeName],
                                        author: {
                                            username: article.Author.UserName,
                                            avatarUrl: article.Author.AvatarImage,
                                            idCode: article.Author.IdCode,
                                        },
                                        voteForPoint: article.VoteForPoint,
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
                    };
                    timeline.loadAction();
                    break;
                case 'user':
                    timeline.loadAction = function () {
                    };
                    timeline.loadingLock = true;
                    timeline.noMoreArticle = true;
                    timeline.actions[2].active = true;
                    $http.get(`${apiEndpoint}user/${encodeURIComponent($stateParams.keyword)}`, {
                        params: {
                            idType: 'UserName',
                            stats: true,
                            subscribed: true,
                            profilePointBackgroundImage: true,
                        },
                    }).then(response => {
                        if (response.data) {
                            const user = response.data;
                            summary.background = user.ProfilePointBackgroundImage;
                            timeline.searchNotFound = false;
                            summary.defaultSum.text = '找到 1 个符合的项目';
                            timeline.entries.push({
                                types: ['个人'],
                                pointInfo: {
                                    reader: user.SubscriberCount,
                                    article: user.ArticleCount,
                                },
                                show: true,
                                hasBackground: true,
                                background: user.ProfilePointBackgroundImage,
                                title: user.UserName,
                                summary: user.GamerTag,
                                pointAvatar: user.AvatarImage,
                                url: `user/${user.IdCode}`,
                                isUser: true,
                                id: user.Id,
                            });
                            if (union.$localStorage.user && user.IdCode !== union.$localStorage.user.IdCode) {
                                timeline.entries[0].subscribed = user.Subscribed;
                            }
                        }
                        timeline.loadingLock = false;
                    }, response => {
                        if (response.status === 404) {
                            summary.defaultSum.text = '找到 0 个符合的项目';
                        } else {
                            notification.error('发生未知错误，请重试或与站务职员联系', response);
                        }
                        timeline.loadingLock = false;
                        timeline.searchNotFound = true;
                    });
                    break;
            }

            union.timeline = timeline;
            union.summary = summary;
        },
    ]);
}());
