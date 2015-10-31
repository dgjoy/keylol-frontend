(function () {
    "use strict";

    keylolApp.controller("TimelineController", [
        "$scope", "union", "$location", "$http", "$rootScope", "$element",
        function ($scope, union, $location, $http, $rootScope, $element) {
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
            $(window).scroll(function(){
                var $windowBottomY = $(window).scrollTop() + $(window).height();
                var $timelineBottomY = $element.offset().top + $element.height();
                $scope.$apply(function(){
                    if($windowBottomY > $timelineBottomY - 768 && !loadingLock && !$scope.data.noMoreArticle) {
                        requestWhenFiltering(true);
                    }
                });
            });
            var cancelListenRoute = $rootScope.$on("$routeChangeStart", function(){
                $(window).unbind("scroll");
                cancelListenRoute();
            });

            $scope.expanded = false;
            var filterStringModule = ["全部", "不看", "只看", "全部不看"];
            var filterOptions = [];
            $scope.expandString = filterStringModule[0];
            $http.get(apiEndpoint + "article-type")
                .then(function (response) {
                    $scope.filterArray = response.data;
                    while (filterOptions.length < $scope.filterArray.length) {
                        filterOptions.push(true);
                    }

                    $scope.expand = function ($event) {
                        var popup = $scope.showFilter({
                            templateUrl: "components/popup/entry-filter.html",
                            controller: "EntryFilterController",
                            event: $event,
                            attachSide: "bottom",
                            align: "right",
                            offsetX: 5,
                            inputs: {
                                filterArray: $scope.filterArray,
                                filterOptions: filterOptions
                            }
                        });
                        $scope.expanded = !$scope.expanded;
                        if (popup) {
                            popup.then(function (popup) {
                                return popup.close;
                            }).then(function (result) {
                                if (result) {
                                    filterOptions = result;
                                    changeExpandString();
                                    requestWhenFiltering();
                                }
                                $scope.expanded = !$scope.expanded;
                            });
                        }
                    };
                }, function (error) {
                    alert("未知错误");
                    console.error(error);
                });

            function requestWhenFiltering(isLoadingMore) {
                loadingLock = true;
                var filters = "";
                for (var i = 0; i < $scope.filterArray.length; i++) {
                    if (filterOptions[i]) {
                        if (i !== 0) {
                            filters += ",";
                        }
                        filters += $scope.filterArray[i].Id;
                    }
                }
                if (filters === "") {
                    $scope.data.entries.length = 0;
                    $scope.data.noMoreArticle = true;
                } else {
                    $scope.data.loadAction({
                        idType: "IdCode",
                        articleTypeFilter: filters,
                        take: 10
                    }, function (response) {
                        var articleList = response.data;
                        console.log(response);
                        if(!isLoadingMore){
                            $scope.data.entries.length = 0;
                        }
                        if(articleList.length < 10){
                            $scope.data.noMoreArticle = true;
                        }

                        for (var i in articleList) {
                            var article = articleList[i];
                            $scope.data.entries.push({
                                types: [article.TypeName],
                                author: {
                                    username: article.Author.UserName,
                                    avatarUrl: article.Author.AvatarImage
                                },
                                datetime: article.PublishTime,
                                title: article.Title,
                                summary: article.Content,
                                url: "/article/" + article.Author.IdCode + "/" + article.SequenceNumberForAuthor,
                                count: {
                                    like: article.LikeCount,
                                    comment: article.CommentCount
                                }
                            });
                        }
                        loadingLock = false;
                    });
                }
            }

            function changeExpandString() {
                var optionsTrue = [];
                var optionsFalse = [];
                for (var i = 0; i < filterOptions.length; i++) {
                    if (filterOptions[i]) {
                        optionsTrue.push(i);
                    } else {
                        optionsFalse.push(i);
                    }
                }

                if (optionsTrue.length == 5) {
                    $scope.expandString = filterStringModule[0];
                } else if (optionsTrue.length >= 3) {
                    $scope.expandString = filterStringModule[1];
                    for (var falseIndex in optionsFalse) {
                        $scope.expandString += ("『" + $scope.filterArray[optionsFalse[falseIndex]].Name + "』");
                    }
                } else if (optionsFalse.length == 5) {
                    $scope.expandString = filterStringModule[3];
                } else {
                    $scope.expandString = filterStringModule[2];
                    for (var trueIndex in optionsTrue) {
                        $scope.expandString += ("『" + $scope.filterArray[optionsTrue[trueIndex]].Name + "』");
                    }
                }
            }
        }
    ]);
})();