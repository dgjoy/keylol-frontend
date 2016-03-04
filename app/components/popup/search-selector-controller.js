(function () {
    "use strict";

    keylolApp.controller("SearchSelectorController", [
        "$scope", "union", "$location", "options", "$http", "notification", "utils", "window",
        function ($scope, union, $location, options, $http, notification, utils, window) {
            $scope.onSearching = options.onSearching;
            $scope.filterArray = union.searchFilter;
            var getSearchResult = function (filterTxt) {
                if (options.searchText) {
                    switch (filterTxt) {
                        case "据点":
                            $http.get(apiEndpoint + "normal-point/keyword/" + encodeURIComponent(options.searchText))
                                .then(function (response) {
                                    if (response.data.length > 0) {
                                        $scope.resultArray = [];
                                        for (var i in response.data) {
                                            var point = response.data[i];
                                            var result = {
                                                avatar: point.AvatarImage,
                                                type: utils.getPointType(point.Type),
                                                url: "point/" + point.IdCode
                                            };
                                            result.mainTitle = utils.getPointFirstName(point);
                                            result.subTitle = utils.getPointSecondName(point);
                                            $scope.resultArray.push(result);
                                        }
                                    } else {
                                        $scope.resultArray = undefined;
                                        $scope.notFound = true;
                                    }
                                }, function (response) {
                                    notification.error("发生未知错误，请重试或与站务职员联系", response);
                                });
                            break;
                        case "文章":
                            $http.get(apiEndpoint + "article/keyword/" + encodeURIComponent(options.searchText))
                                .then(function (response) {
                                    if (response.data.length > 0) {
                                        $scope.resultArray = [];
                                        for (var i in response.data) {
                                            var article = response.data[i];
                                            $scope.resultArray.push({
                                                mainTitle: article.Title,
                                                articleInfo: {
                                                    acknowledgeNum: article.LikeCount,
                                                    commentNum: article.CommentCount
                                                },
                                                url: "article/" + article.AuthorIdCode + "/" + article.SequenceNumberForAuthor
                                            });
                                        }
                                    } else {
                                        $scope.resultArray = undefined;
                                        $scope.notFound = true;
                                    }
                                }, function (response) {
                                    notification.error("发生未知错误，请重试或与站务职员联系", response);
                                });
                            break;
                        case "用户":
                            $http.get(apiEndpoint + "user/" + encodeURIComponent(options.searchText), {
                                params: {
                                    idType: "UserName"
                                }
                            }).then(function (response) {
                                if (response.data) {
                                    $scope.resultArray = [];
                                    var user = response.data;
                                    $scope.resultArray.push({
                                        mainTitle: user.UserName,
                                        subTitle: user.GamerTag,
                                        avatar: user.AvatarImage,
                                        type: "个人",
                                        url: "user/" + user.IdCode,
                                        isUser: true
                                    });
                                }
                            }, function (error) {
                                if (error.status === 404) {
                                    $scope.resultArray = undefined;
                                    $scope.notFound = true;
                                } else {
                                    notification.error("发生未知错误，请重试或与站务职员联系", response);
                                }
                            });
                            break;
                        default :
                            $scope.resultArray = undefined;
                            $scope.notFound = true;
                    }
                }
            };
            for (var i in $scope.filterArray) {
                if ($scope.filterArray[i].active === true) {
                    $scope.filterText = $scope.filterArray[i].text;
                }
            }
            $scope.$watch(function () {
                return options.searchText
            }, function () {
                getSearchResult($scope.filterText);
            });
            $scope.showPointAppealWindow = function () {
                window.show({
                    templateUrl: "components/windows/shop-link.html",
                    controller: "ShopLinkController"
                });
            };
            $scope.changeFilter = function ($index) {
                if (!$scope.filterArray[$index].active) {
                    for (var i in $scope.filterArray) {
                        $scope.filterArray[i].active = false;
                    }
                    $scope.filterArray[$index].active = true;
                    $scope.filterText = $scope.filterArray[$index].text;
                    getSearchResult($scope.filterText);
                }
            };
            $scope.jumpTo = function (url) {
                $location.url(url);
            };
        }
    ]);
})();