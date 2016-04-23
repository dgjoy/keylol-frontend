(function () {
    keylolApp.controller('TimelineController', [
        '$scope', 'union', '$location', '$http', '$rootScope', '$element', 'articleTypes', 'notification', 'utils', '$timeout', '$window',
        ($scope, union, $location, $http, $rootScope, $element, articleTypes, notification, utils, $timeout, $window) => {
            $scope.headingDisplayMode = function (entry) {
                if (entry.source)
                    return 'source';
                else
                    return 'title';
            };
            $scope.data = union.timeline;
            $scope.utils = utils;
            $scope.union = union;

            $scope.clickToSearch = function () {
                const $searchInput = $('.search-box input');
                $searchInput.focus();
                if ($searchInput.hasClass('highlight')) {
                    $searchInput.removeClass('highlight');
                }
                $searchInput.addClass('highlight');
            };

            $scope.clickTheBox = function (entry) {
                $location.url(entry.url);
            };

            $scope.ignore = function (entry) {
                notification.attention('移除后将不再显示这条记录', [
                    { action: '移除', value: true },
                    { action: '取消' },
                ]).then(result => {
                    if (result) {
                        $http.delete(`${apiEndpoint}message/${entry.id}`).then(() => {
                            notification.success('移除记录成功');
                            $scope.data.entries.splice($scope.data.entries.indexOf(entry), 1);
                        }, response => {
                            notification.error('移除记录失败', response);
                        });
                    }
                });
            };

            $scope.noMoreRemind = function (entry) {
                if (entry.fromArticle.fromComment) {
                    if (entry.types[0] === '评论') {
                        // notification.attention('忽略这则评论收到回复的邮政信息', [
                        //     {action: '不再提醒', value: true},
                        //     {action: '取消'}
                        // ]).then(function (result) {
                        //     if (result) {
                        //         $http.put(apiEndpoint + 'comment/' + entry.targetCommentId + '/ignore', {}, {
                        //             params: {
                        //                 ignore: true,
                        //                 type: 'Comment'
                        //             }
                        //         }).then(function () {
                        //             notification.success('已忽略这则评论的回复信息');
                        //         }, function (response) {
                        //             notification.error('忽略这则评论的回复信息失败', response);
                        //         });
                        //     }
                        // });
                    } else if (entry.types[0] === '认可') {
                        notification.attention('忽略这则评论获得认可的邮政信息', [
                            { action: '不再提醒', value: true },
                            { action: '取消' },
                        ]).then(result => {
                            if (result) {
                                $http.put(`${apiEndpoint}comment/${entry.targetCommentId}/ignore`, {}, {
                                    params: {
                                        ignore: true,
                                        type: 'Like',
                                    },
                                }).then(() => {
                                    notification.success('已忽略这则评论的认可信息');
                                }, response => {
                                    notification.error('忽略这则评论的认可信息失败', response);
                                });
                            }
                        });
                    }
                } else {
                    if (entry.types[0] === '评论') {
                        notification.attention('忽略这篇文章收到评论的邮政信息', [
                            { action: '不再提醒', value: true },
                            { action: '取消' },
                        ]).then(result => {
                            if (result) {
                                $http.put(`${apiEndpoint}article/${entry.fromArticle.id}/ignore`, {}, {
                                    params: {
                                        ignore: true,
                                        type: 'Comment',
                                    },
                                }).then(() => {
                                    notification.success('已忽略这篇文章的回复信息');
                                }, response => {
                                    notification.error('忽略这篇文章的回复信息失败', response);
                                });
                            }
                        });
                    } else if (entry.types[0] === '认可') {
                        notification.attention('忽略这篇文章获得认可的邮政信息', [
                            { action: '不再提醒', value: true },
                            { action: '取消' },
                        ]).then(result => {
                            if (result) {
                                $http.put(`${apiEndpoint}article/${entry.fromArticle.id}/ignore`, {}, {
                                    params: {
                                        ignore: true,
                                        type: 'Like',
                                    },
                                }).then(() => {
                                    notification.success('已忽略这篇文章的认可信息');
                                }, response => {
                                    notification.error('忽略这篇文章的认可信息失败', response);
                                });
                            }
                        });
                    }
                }
            };

            $scope.loadingLock = false;
            $($window).scroll(() => {
                const $windowBottomY = $($window).scrollTop() + $($window).height();
                const $timelineBottomY = $element.offset().top + $element.height();
                $scope.$apply(() => {
                    if ($windowBottomY > $timelineBottomY - 60 && !$scope.data.loadingLock && !$scope.data.noMoreArticle) {
                        if ($scope.data.hasExpand) {
                            requestWhenFiltering(true);
                        } else {
                            $scope.data.loadAction();
                        }
                    }
                });
            });
            const cancelListenRoute = $scope.$on('$destroy', () => {
                $($window).unbind('scroll');
                cancelListenRoute();
            });

            $scope.expanded = false;

            $scope.articleTypes = $.extend([], articleTypes);
            let filterOptions = [];
            let shortReviewFilter = 1;
            let sourceFilter = 1;

            const url = $location.url().substr(1, 4);
            let currPage;
            if (url === '') {
                currPage = 'home';
                if (union.$localStorage.homeFilter && union.$localStorage.homeFilter.filterOptions
                    && union.$localStorage.homeFilter.shortReviewFilter) {
                    filterOptions = union.$localStorage.homeFilter.filterOptions.slice();
                    shortReviewFilter = union.$localStorage.homeFilter.shortReviewFilter;
                } else {
                    for (let i = 0; i < $scope.articleTypes.length; ++i) {
                        filterOptions.push(true);
                    }
                }
            } else if (url === 'user') {
                currPage = 'user';
                $scope.articleTypes.unshift({ name: '简评' });
                for (let i = 0; i < $scope.articleTypes.length; ++i) {
                    filterOptions.push(true);
                }
            } else if (url === 'late') {
                currPage = 'latest';
                $scope.articleTypes.unshift({
                    name: '简评',
                });
                filterOptions.push(false);
                for (let i = 1; i < $scope.articleTypes.length; ++i) {
                    filterOptions.push(true);
                }
            } else {
                currPage = 'point';
                $scope.articleTypes.unshift({
                    name: '简评',
                });
                for (let i = 0; i < $scope.articleTypes.length; ++i) {
                    filterOptions.push(true);
                }
            }

            $scope.expand = function ($event) {
                $scope.expanded = !$scope.expanded;
                $scope.showFilter({
                    templateUrl: 'src/popup/entry-filter.html',
                    controller: 'EntryFilterController as entryFilter',
                    event: $event,
                    attachSide: 'bottom',
                    align: 'right',
                    offsetX: 5,
                    inputs: {
                        currPage,
                        shortReviewFilter,
                        sourceFilter,
                        types: $scope.articleTypes,
                        selectedIndexes: filterOptions,
                    },
                }).then(popup => {
                    return popup.close;
                }).then(result => {
                    $scope.expanded = !$scope.expanded;
                    if (result) {
                        filterOptions = result.filterOptions.slice();
                        shortReviewFilter = result.shortReviewFilter;
                        sourceFilter = result.sourceFilter;
                        if (currPage === 'home') {
                            union.$localStorage.homeFilter = result;
                        }
                        requestWhenFiltering();
                    }
                });
            };

            function requestWhenFiltering(isLoadingMore) {
                $scope.data.loadingLock = true;
                let filters = '';
                for (let i = 0; i < $scope.articleTypes.length; i++) {
                    if (filterOptions[i]) {
                        if (filters.length !== 0) {
                            filters += ',';
                        }
                        filters += $scope.articleTypes[i].name;
                    }
                }
                let notLoad = false;
                switch (currPage) {
                    case 'home':
                        notLoad = !filters && !shortReviewFilter;
                        break;
                    case 'user':
                        notLoad = !filters || !sourceFilter;
                        break;
                    default:
                        notLoad = !filters;
                        break;
                }
                if (notLoad) {
                    $scope.data.entries.length = 0;
                    $scope.data.noMoreArticle = true;
                    $scope.data.loadingLock = false;
                } else {
                    let beforeSn;
                    if (isLoadingMore) {
                        beforeSn = $scope.data.entries[$scope.data.entries.length - 1].sequenceNumber;
                    }
                    $scope.data.loadAction({
                        beforeSn,
                        shortReviewFilter,
                        idType: 'IdCode',
                        articleTypeFilter: filters ? filters : 'hack',
                        source: sourceFilter,
                        take: utils.timelineLoadCount,
                        titleOnly: false,
                    }, response => {
                        const articleList = response.data;
                        if (!isLoadingMore) {
                            $scope.data.entries.length = 0;
                        }
                        $scope.data.noMoreArticle = articleList.length < utils.timelineLoadCount;
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

                        for (let i = 0;i < articleList.length;i++) {
                            const article = articleList[i];
                            if (!article.Author) {
                                article.Author = union.user;
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
                                datetime: article.PublishTime,
                                title: article.Title,
                                summary: article.Content,
                                hasBackground: false,
                                vote: article.Vote,
                                thumbnail: article.ThumbnailImage,
                                hasThumbnail: true,
                                url: `/article/${article.Author.IdCode}/${article.SequenceNumberForAuthor}`,
                                count: {
                                    like: article.LikeCount,
                                    comment: article.CommentCount,
                                },
                            };
                            switch (article.TimelineReason) {
                                case 'Like':
                                    entry.sources.type = 'like';
                                    entry.sources.userArray = [];
                                    if (article.LikeByUsers) {
                                        for (let j = 0;j < article.LikeByUsers.length;j++) {
                                            entry.sources.userArray.push({
                                                name: article.LikeByUsers[j].UserName,
                                                idCode: article.LikeByUsers[j].IdCode,
                                            });
                                        }
                                    } else if (union.user) {
                                        entry.sources.userArray.push({
                                            name: union.user.UserName,
                                            idCode: union.user.IdCode,
                                        });
                                    } else {
                                        entry.sources.userArray.push({
                                            name: union.$localStorage.user.UserName,
                                            idCode: union.$localStorage.user.IdCode,
                                        });
                                    }
                                    break;
                                case 'Publish':
                                    entry.sources.type = 'publish';
                                    break;
                                default:
                                    if (article.AttachedPoints && article.AttachedPoints.length > 0) {
                                        entry.sources.type = 'point';
                                        entry.sources.points = article.AttachedPoints;
                                    } else {
                                        entry.sources = null;
                                    }
                                    break;
                            }
                            $scope.data.entries.push(entry);
                            $timeout(createTimeoutFunction(entry));
                        }
                        if (timelineTimeout) {
                            timelineTimeout.then(() => {
                                $scope.data.loadingLock = false;
                            });
                        } else {
                            $scope.data.loadingLock = false;
                        }
                    });
                }
            }

            $scope.filterText = function () {
                const optionsTrue = [];
                for (let i = 0; i < filterOptions.length; i++) {
                    if (filterOptions[i]) {
                        optionsTrue.push(i);
                    }
                }

                let text;
                if (currPage === 'home') {
                    if (optionsTrue.length === $scope.articleTypes.length && shortReviewFilter === 1) {
                        text = '默认过滤';
                    } else if (optionsTrue.length === $scope.articleTypes.length && shortReviewFilter === 7) {
                        text = '关闭过滤';
                    } else {
                        text = '自定义过滤';
                    }
                } else if (currPage === 'user') {
                    if (optionsTrue.length === $scope.articleTypes.length && sourceFilter === 1) {
                        text = '默认过滤';
                    } else if (optionsTrue.length === $scope.articleTypes.length && sourceFilter === 3) {
                        text = '关闭过滤';
                    } else {
                        text = '自定义过滤';
                    }
                } else if (currPage === 'latest') {
                    if (optionsTrue.length === $scope.articleTypes.length - 1 && !filterOptions[0]) {
                        text = '默认过滤';
                    } else if (optionsTrue.length === $scope.articleTypes.length) {
                        text = '关闭过滤';
                    } else {
                        text = '自定义过滤';
                    }
                } else {
                    if (optionsTrue.length === $scope.articleTypes.length) {
                        text = '默认过滤';
                    } else {
                        text = '自定义过滤';
                    }
                }
                return text;
            };

            $scope.subscribe = function (entry) {
                entry.subscribeDisabled = true;
                $http.post(`${apiEndpoint}user-point-subscription`, {}, {
                    params: { pointId: entry.id },
                }).then(() => {
                    notification.success('据点已订阅，其今后收到的文章投稿将推送到你的首页');
                    entry.subscribed = true;
                    entry.subscribeDisabled = false;
                    entry.pointInfo.reader++;
                    union.$localStorage.user.SubscribedPointCount++;
                }, response => {
                    notification.error('发生未知错误，请重试或与站务职员联系', response);
                });
            };
            $scope.unsubscribe = function (entry) {
                entry.subscribeDisabled = true;
                notification.attention('退订并不再接收此据点的文章推送', [
                    { action: '退订', value: true },
                    { action: '取消' },
                ]).then(result => {
                    if (result) {
                        $http.delete(`${apiEndpoint}user-point-subscription`, {
                            params: { pointId: entry.id },
                        }).then(() => {
                            notification.success('据点已退订');
                            entry.subscribed = false;
                            entry.pointInfo.reader--;
                            union.$localStorage.user.SubscribedPointCount--;
                        }, response => {
                            notification.error('发生未知错误，请重试或与站务职员联系', response);
                        }).finally(() => {
                            $scope.subscribeDisabled = false;
                        });
                    } else {
                        entry.subscribeDisabled = false;
                    }
                });
            };
        },
    ]);
}());
