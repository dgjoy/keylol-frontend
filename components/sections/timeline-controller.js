(function () {
    "use strict";

    keylolApp.controller("TimelineController", [
        "$scope", "union", "$location", "$http", "$rootScope", "$element", "articleTypes", "notification", "utils", "$timeout", "$window",
        function ($scope, union, $location, $http, $rootScope, $element, articleTypes, notification, utils, $timeout, $window) {
            $scope.headingDisplayMode = function (entry) {
                if (entry.source)
                    return "source";
                else
                    return "title";
            };
            $scope.data = union.timeline;
            $scope.utils = utils;
            $scope.union = union;

            $scope.clickToSearch = function () {
                var $searchInput = $(".search-box input");
                $searchInput.focus();
                if ($searchInput.hasClass("highlight")) {
                    $searchInput.removeClass("highlight");
                }
                $searchInput.addClass("highlight");
            };

            $scope.clickTheBox = function (entry) {
                $location.url(entry.url);
            };

            $scope.ignore = function (entry) {
                notification.attention("移除后将不再显示这条记录", [
                    {action: "移除", value: true},
                    {action: "取消"}
                ]).then(function (result) {
                    if (result) {
                        $http.delete(apiEndpoint + "message/" + entry.id).then(function () {
                            notification.success("移除记录成功");
                            $scope.data.entries.splice($scope.data.entries.indexOf(entry), 1);
                        }, function (response) {
                            notification.error("移除记录失败", response);
                        });
                    }
                });
            };

            $scope.noMoreRemind = function (entry) {
                if (entry.fromArticle.fromComment) {
                    if (entry.types[0] === "评论") {
                        // notification.attention("忽略这则评论收到回复的邮政信息", [
                        //     {action: "不再提醒", value: true},
                        //     {action: "取消"}
                        // ]).then(function (result) {
                        //     if (result) {
                        //         $http.put(apiEndpoint + "comment/" + entry.targetCommentId + "/ignore", {}, {
                        //             params: {
                        //                 ignore: true,
                        //                 type: "Comment"
                        //             }
                        //         }).then(function () {
                        //             notification.success("已忽略这则评论的回复信息");
                        //         }, function (response) {
                        //             notification.error("忽略这则评论的回复信息失败", response);
                        //         });
                        //     }
                        // });
                    } else if (entry.types[0] === "认可") {
                        notification.attention("忽略这则评论获得认可的邮政信息", [
                            {action: "不再提醒", value: true},
                            {action: "取消"}
                        ]).then(function (result) {
                            if (result) {
                                $http.put(apiEndpoint + "comment/" + entry.targetCommentId + "/ignore", {}, {
                                    params: {
                                        ignore: true,
                                        type: "Like"
                                    }
                                }).then(function () {
                                    notification.success("已忽略这则评论的认可信息");
                                }, function (response) {
                                    notification.error("忽略这则评论的认可信息失败", response);
                                });
                            }
                        });
                    }
                } else {
                    if (entry.types[0] === "评论") {
                        notification.attention("忽略这篇文章收到评论的邮政信息", [
                            {action: "不再提醒", value: true},
                            {action: "取消"}
                        ]).then(function (result) {
                            if (result) {
                                $http.put(apiEndpoint + "article/" + entry.fromArticle.id + "/ignore", {}, {
                                    params: {
                                        ignore: true,
                                        type: "Comment"
                                    }
                                }).then(function () {
                                    notification.success("已忽略这篇文章的回复信息");
                                }, function (response) {
                                    notification.error("忽略这篇文章的回复信息失败", response);
                                });
                            }
                        });
                    } else if (entry.types[0] === "认可") {
                        notification.attention("忽略这篇文章获得认可的邮政信息", [
                            {action: "不再提醒", value: true},
                            {action: "取消"}
                        ]).then(function (result) {
                            if (result) {
                                $http.put(apiEndpoint + "article/" + entry.fromArticle.id + "/ignore", {}, {
                                    params: {
                                        ignore: true,
                                        type: "Like"
                                    }
                                }).then(function () {
                                    notification.success("已忽略这篇文章的认可信息");
                                }, function (response) {
                                    notification.error("忽略这篇文章的认可信息失败", response);
                                });
                            }
                        });
                    }
                }
            };

            $scope.loadingLock = false;
            $($window).scroll(function () {
                var $windowBottomY = $($window).scrollTop() + $($window).height();
                var $timelineBottomY = $element.offset().top + $element.height();
                $scope.$apply(function () {
                    if ($windowBottomY > $timelineBottomY - 60 && !$scope.data.loadingLock && !$scope.data.noMoreArticle) {
                        if ($scope.data.hasExpand) {
                            requestWhenFiltering(true);
                        } else {
                            $scope.data.loadAction();
                        }
                    }
                });
            });
            var cancelListenRoute = $scope.$on("$destroy", function () {
                $($window).unbind("scroll");
                cancelListenRoute();
            });

            $scope.expanded = false;

            $scope.articleTypes = $.extend([], articleTypes);
            var filterOptions = [];
            var shortReviewFilter = 1;
            var sourceFilter = 1;

            var url = $location.url().substr(1, 4);
            var currPage;
            if (url === "") {
                currPage = "home";
                if (union.$localStorage.homeFilter && union.$localStorage.homeFilter.filterOptions && union.$localStorage.homeFilter.shortReviewFilter) {
                    filterOptions = union.$localStorage.homeFilter.filterOptions.slice();
                    shortReviewFilter = union.$localStorage.homeFilter.shortReviewFilter;
                } else {
                    for (var i = 0; i < $scope.articleTypes.length; ++i) {
                        filterOptions.push(true);
                    }
                }
            } else if (url === "user") {
                currPage = "user";
                $scope.articleTypes.unshift({
                    name: "简评"
                });
                for (var i = 0; i < $scope.articleTypes.length; ++i) {
                    filterOptions.push(true);
                }
            } else if (url === "late") {
                currPage = "latest";
                $scope.articleTypes.unshift({
                    name: "简评"
                });
                filterOptions.push(false);
                for (var i = 1; i < $scope.articleTypes.length; ++i) {
                    filterOptions.push(true);
                }
            } else {
                currPage = "point";
                $scope.articleTypes.unshift({
                    name: "简评"
                });
                for (var i = 0; i < $scope.articleTypes.length; ++i) {
                    filterOptions.push(true);
                }
            }

            $scope.expand = function ($event) {
                $scope.expanded = !$scope.expanded;
                console.log(filterOptions, shortReviewFilter, sourceFilter);
                $scope.showFilter({
                    templateUrl: "components/popup/entry-filter.html",
                    controller: "EntryFilterController as entryFilter",
                    event: $event,
                    attachSide: "bottom",
                    align: "right",
                    offsetX: 5,
                    inputs: {
                        types: $scope.articleTypes,
                        selectedIndexes: filterOptions,
                        currPage: currPage,
                        shortReviewFilter: shortReviewFilter,
                        sourceFilter: sourceFilter
                    }
                }).then(function (popup) {
                    return popup.close;
                }).then(function (result) {
                    $scope.expanded = !$scope.expanded;
                    if (result) {
                        filterOptions = result.filterOptions.slice();
                        shortReviewFilter = result.shortReviewFilter;
                        sourceFilter = result.sourceFilter;
                        if (currPage === "home") {
                            union.$localStorage.homeFilter = result;
                        }
                        requestWhenFiltering();
                    }
                });
            };

            function requestWhenFiltering(isLoadingMore) {
                $scope.data.loadingLock = true;
                var filters = "";
                for (var i = 0; i < $scope.articleTypes.length; i++) {
                    if (filterOptions[i]) {
                        if (filters.length !== 0) {
                            filters += ",";
                        }
                        filters += $scope.articleTypes[i].name;
                    }
                }
                var notLoad = false;
                switch (currPage) {
                    case "home":
                        notLoad = !filters && !shortReviewFilter;
                        break;
                    case "user":
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
                    var beforeSn;
                    if (isLoadingMore) {
                        beforeSn = $scope.data.entries[$scope.data.entries.length - 1].sequenceNumber;
                    }
                    $scope.data.loadAction({
                        idType: "IdCode",
                        articleTypeFilter: filters ? filters : "hack",
                        shortReviewFilter: shortReviewFilter,
                        source: sourceFilter,
                        take: utils.timelineLoadCount,
                        beforeSn: beforeSn,
                        titleOnly: false
                    }, function (response) {
                        var articleList = response.data;
                        if (!isLoadingMore) {
                            $scope.data.entries.length = 0;
                        }
                        $scope.data.noMoreArticle = articleList.length < utils.timelineLoadCount;
                        var timelineTimeout;

                        for (var i in articleList) {
                            var article = articleList[i];
                            if (!article.Author) {
                                article.Author = union.user;
                            }
                            var entry = {
                                types: [article.TypeName],
                                author: {
                                    username: article.Author.UserName,
                                    avatarUrl: article.Author.AvatarImage,
                                    idCode: article.Author.IdCode
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
                                url: "/article/" + article.Author.IdCode + "/" + article.SequenceNumberForAuthor,
                                count: {
                                    like: article.LikeCount,
                                    comment: article.CommentCount
                                }
                            };
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
                                    } else if (union.user) {
                                        entry.sources.userArray.push({
                                            name: union.user.UserName,
                                            idCode: union.user.IdCode
                                        });
                                    } else {
                                        entry.sources.userArray.push({
                                            name: union.$localStorage.user.UserName,
                                            idCode: union.$localStorage.user.IdCode
                                        });
                                    }
                                    break;
                                case "Publish":
                                    entry.sources.type = "publish";
                                    break;
                                default:
                                    if (article.AttachedPoints && article.AttachedPoints.length > 0) {
                                        entry.sources.type = "point";
                                        entry.sources.points = article.AttachedPoints;
                                    } else {
                                        entry.sources = null;
                                    }
                                    break;
                            }
                            $scope.data.entries.push(entry);
                            (function (entry) {
                                $timeout(function () {
                                    if (!timelineTimeout) {
                                        entry.show = true;
                                        timelineTimeout = $timeout(function () {
                                        }, utils.timelineShowDelay);
                                    } else {
                                        timelineTimeout = timelineTimeout.then(function () {
                                            entry.show = true;
                                            return $timeout(function () {
                                            }, utils.timelineShowDelay);
                                        });
                                    }
                                });
                            })(entry);
                        }
                        if (timelineTimeout) {
                            timelineTimeout.then(function () {
                                $scope.data.loadingLock = false;
                            });
                        } else {
                            $scope.data.loadingLock = false;
                        }
                    });
                }
            }

            $scope.filterText = function () {
                var optionsTrue = [];
                for (var i = 0; i < filterOptions.length; i++) {
                    if (filterOptions[i]) {
                        optionsTrue.push(i);
                    }
                }

                var text;
                if (currPage === "home") {
                    if (optionsTrue.length === $scope.articleTypes.length && shortReviewFilter === 1) {
                        text = "默认过滤";
                    } else if (optionsTrue.length === $scope.articleTypes.length && shortReviewFilter === 7) {
                        text = "关闭过滤";
                    } else {
                        text = "自定义过滤";
                    }
                } else if (currPage === "user") {
                    if (optionsTrue.length === $scope.articleTypes.length && sourceFilter === 1) {
                        text = "默认过滤";
                    } else if (optionsTrue.length === $scope.articleTypes.length && sourceFilter === 3) {
                        text = "关闭过滤";
                    } else {
                        text = "自定义过滤";
                    }
                } else if (currPage === "latest") {
                    if (optionsTrue.length === $scope.articleTypes.length - 1 && !filterOptions[0]) {
                        text = "默认过滤";
                    } else if (optionsTrue.length === $scope.articleTypes.length) {
                        text = "关闭过滤";
                    } else {
                        text = "自定义过滤";
                    }
                } else {
                    if (optionsTrue.length === $scope.articleTypes.length) {
                        text = "默认过滤";
                    } else {
                        text = "自定义过滤";
                    }
                }
                return text;
            };

            $scope.subscribe = function (entry) {
                entry.subscribeDisabled = true;
                $http.post(apiEndpoint + "user-point-subscription", {}, {
                    params: {
                        pointId: entry.id
                    }
                }).then(function () {
                    notification.success("据点已订阅，其今后收到的文章投稿将推送到你的首页");
                    entry.subscribed = true;
                    entry.subscribeDisabled = false;
                    entry.pointInfo.reader++;
                    union.$localStorage.user.SubscribedPointCount++;
                }, function (response) {
                    notification.error("发生未知错误，请重试或与站务职员联系", response);
                });
            };
            $scope.unsubscribe = function (entry) {
                entry.subscribeDisabled = true;
                notification.attention("退订并不再接收此据点的文章推送", [
                    {action: "退订", value: true},
                    {action: "取消"}
                ]).then(function (result) {
                    if (result) {
                        $http.delete(apiEndpoint + "user-point-subscription", {
                            params: {
                                pointId: entry.id
                            }
                        }).then(function () {
                            notification.success("据点已退订");
                            entry.subscribed = false;
                            entry.pointInfo.reader--;
                            union.$localStorage.user.SubscribedPointCount--;
                        }, function (response) {
                            notification.error("发生未知错误，请重试或与站务职员联系", response);
                        }).finally(function () {
                            $scope.subscribeDisabled = false;
                        });
                    } else {
                        entry.subscribeDisabled = false;
                    }
                });
            }
        }
    ]);
})();
