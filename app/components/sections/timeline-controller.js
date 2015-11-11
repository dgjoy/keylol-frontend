(function () {
    "use strict";

    keylolApp.controller("TimelineController", [
        "$scope", "union", "$location", "$http", "$rootScope", "$element", "articleTypes", "notification", "utils", "$timeout",
        function ($scope, union, $location, $http, $rootScope, $element, articleTypes, notification, utils, $timeout) {
            $scope.headingDisplayMode = function (entry) {
                if (entry.source)
                    return "source";
                else
                    return "title";
            };
            $scope.data = union.timeline;

            $scope.clickToSearch = function () {
                var $searchInput = $(".search-box input");
                $searchInput.focus();
                if ($searchInput.hasClass("highlight")) {
                    $searchInput.removeClass("highlight");
                    $searchInput[0].offsetWidth;
                }
                $searchInput.addClass("highlight");
            };

            $scope.clickTheBox = function (entry) {
                $location.url(entry.url);
            };

            $scope.ignore = function (entry) {
                $scope.data.entries.splice($scope.data.entries.indexOf(entry), 1);
                $http.put(apiEndpoint + "like/" + entry.id, {}, {
                    params: {
                        ignore: true
                    }
                }).then(function () {
                    notification.success("移除记录成功");
                }, function (error) {
                    notification.error("移除记录失败", error);
                });
            };

            $scope.noMoreRemind = function (entry) {
                if (entry.commentId) {
                    $http.put(apiEndpoint + "comment/" + entry.commentId + "/ignore", {}, {
                        params: {
                            ignore: true
                        }
                    }).then(function () {
                        notification.success("评论认可不再提醒成功");
                    }, function (error) {
                        notification.error("评论认可不再提醒失败", error);
                    });
                } else {
                    $http.put(apiEndpoint + "article/" + entry.fromArticle.Id + "/ignore", {}, {
                        params: {
                            ignore: true
                        }
                    }).then(function () {
                        notification.success("文章认可不再提醒成功");
                    }, function (error) {
                        notification.error("文章认可不再提醒失败", error);
                    });
                }
            };

            $scope.loadingLock = false;
            $(window).scroll(function () {
                var $windowBottomY = $(window).scrollTop() + $(window).height();
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
                $(window).unbind("scroll");
                cancelListenRoute();
            });

            $scope.expanded = false;

            var filterOptions = [];
            for (var i = 0; i < articleTypes.length; ++i) {
                filterOptions.push(true);
            }

            $scope.expand = function ($event) {
                $scope.expanded = !$scope.expanded;
                $scope.showFilter({
                    templateUrl: "components/popup/entry-filter.html",
                    controller: "EntryFilterController",
                    event: $event,
                    attachSide: "bottom",
                    align: "right",
                    offsetX: 5,
                    inputs: {
                        types: articleTypes,
                        selectedIndexes: filterOptions
                    }
                }).then(function (popup) {
                    return popup.close;
                }).then(function (result) {
                    $scope.expanded = !$scope.expanded;
                    if (result) {
                        filterOptions = result;
                        requestWhenFiltering();
                    }
                });
            };

            function requestWhenFiltering(isLoadingMore) {
                $scope.data.loadingLock = true;
                var filters = "";
                for (var i = 0; i < articleTypes.length; i++) {
                    if (filterOptions[i]) {
                        if (i !== 0) {
                            filters += ",";
                        }
                        filters += articleTypes[i].name;
                    }
                }
                if (!filters) {
                    $scope.data.entries.length = 0;
                    $scope.data.noMoreArticle = true;
                } else {
                    var beforeSN = 2147483647;
                    if (isLoadingMore) {
                        beforeSN = $scope.data.entries[$scope.data.entries.length - 1].sequenceNumber;
                    }
                    $scope.data.loadAction({
                        idType: "IdCode",
                        articleTypeFilter: filters,
                        publishOnly: $scope.data.publishOnly,
                        take: utils.timelineLoadCount,
                        beforeSN: beforeSN
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
                                    } else {
                                        entry.sources.userArray.push({
                                            name: union.$localStorage.user.UserName,
                                            idCode: union.$localStorage.user.IdCode
                                        });
                                    }
                                    break;
                                case "Point":
                                    entry.sources.type = "point";
                                    entry.sources.points = [];
                                    for (var k in article.AttachedPoints) {
                                        entry.sources.points.push({
                                            name: article.AttachedPoints[k][article.AttachedPoints[k].PreferredName + "Name"],
                                            idCode: article.AttachedPoints[k].IdCode
                                        });
                                    }
                                    break;

                                case "Publish":
                                    entry.sources.type = "publish";
                                    break;
                            }
                            (function (entry) {
                                if (!timelineTimeout) {
                                    $scope.data.entries.push(entry);
                                    timelineTimeout = $timeout(function () {
                                    }, utils.timelineInsertDelay);
                                } else {
                                    timelineTimeout = timelineTimeout.then(function () {
                                        $scope.data.entries.push(entry);
                                        return $timeout(function () {
                                        }, utils.timelineInsertDelay);
                                    });
                                }
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
                var optionsFalse = [];
                for (var i = 0; i < filterOptions.length; i++) {
                    if (filterOptions[i]) {
                        optionsTrue.push(i);
                    } else {
                        optionsFalse.push(i);
                    }
                }

                var text;
                if (optionsTrue.length == articleTypes.length) {
                    text = "全部";
                } else if (optionsTrue.length >= Math.floor(articleTypes.length / 2) + 1) {
                    text = "不看";
                    for (var falseIndex in optionsFalse) {
                        text += ("『" + articleTypes[optionsFalse[falseIndex]].name + "』");
                    }
                } else if (optionsFalse.length == articleTypes.length) {
                    text = "全部不看";
                } else {
                    text = "只看";
                    for (var trueIndex in optionsTrue) {
                        text += ("『" + articleTypes[optionsTrue[trueIndex]].name + "』");
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
                }, function (error) {
                    notification.error("未知错误", error);
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
                        }, function (error) {
                            notification.error("未知错误", error);
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