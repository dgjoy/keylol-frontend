(function () {
    "use strict";

    keylolApp.controller("TimelineController", [
        "$scope", "union", "$location", "$http", "$rootScope", "$element", "articleTypes",
        function ($scope, union, $location, $http, $rootScope, $element, articleTypes) {
            $scope.headingDisplayMode = function (entry) {
                if (entry.source)
                    return "source";
                else
                    return "title";
            };
            $scope.data = union.timeline;

            $scope.clickTheBox = function () {
                $location.url("test");
            };

            var loadingLock = false;
            $(window).scroll(function () {
                var $windowBottomY = $(window).scrollTop() + $(window).height();
                var $timelineBottomY = $element.offset().top + $element.height();
                $scope.$apply(function () {
                    if ($windowBottomY > $timelineBottomY - 768 && !loadingLock && !$scope.data.noMoreArticle) {
                        requestWhenFiltering(true);
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
                loadingLock = true;
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
                    $scope.data.loadAction({
                        idType: "IdCode",
                        articleTypeFilter: filters,
                        take: 20
                    }, function (response) {
                        var articleList = response.data;
                        if (!isLoadingMore) {
                            $scope.data.entries.length = 0;
                        }
                        if (articleList.length < 20) {
                            $scope.data.noMoreArticle = true;
                        }

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
                                    entry.sources.pointArray = [];
                                    for (var k in article.AttachedPoints) {
                                        entry.sources.pointArray.push({
                                            name: article.AttachedPoints[k][article.AttachedPoints[k].PreferedName + "Name"],
                                            idCode: article.AttachedPoints[k].IdCode
                                        });
                                    }
                                    break;

                                case "Publish":
                                    entry.sources.type = "publish";
                                    break;
                            }
                            $scope.data.entries.push(entry);
                        }
                        loadingLock = false;
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
        }
    ]);
})();