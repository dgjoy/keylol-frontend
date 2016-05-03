(function () {
    keylolApp.controller('SearchSelectorController', [
        '$scope', 'union', '$location', 'options', '$http', 'notification', 'utils', 'window',
        ($scope, union, $location, options, $http, notification, utils, window) => {
            $scope.onSearching = options.onSearching;
            $scope.union = union;
            $scope.filterArray = union.searchFilter;
            function getSearchResult (filterTxt) {
                if (options.searchText) {
                    switch (filterTxt) {
                        case '据点':
                            $http.get(`${apiEndpoint}normal-point/keyword/${encodeURIComponent(options.searchText)}`)
                                .then(response => {
                                    if (response.data.length > 0) {
                                        $scope.resultArray = [];
                                        for (let i = 0;i < response.data.length;i++) {
                                            const point = response.data[i];
                                            const result = {
                                                avatar: point.AvatarImage,
                                                type: utils.getPointType(point.Type),
                                                url: `point/${point.IdCode}`,
                                            };
                                            result.mainTitle = utils.getPointFirstName(point);
                                            result.subTitle = utils.getPointSecondName(point);
                                            $scope.resultArray.push(result);
                                        }
                                    } else {
                                        $scope.resultArray = undefined;
                                        $scope.notFound = true;
                                    }
                                }, response => {
                                    notification.error('发生未知错误，请重试或与站务职员联系', response);
                                });
                            break;
                        case '文章':
                            $http.get(`${apiEndpoint}article/keyword/${encodeURIComponent(options.searchText)}`)
                                .then(response => {
                                    if (response.data.length > 0) {
                                        $scope.resultArray = [];
                                        for (let i = 0;i < response.data.length;i++) {
                                            const article = response.data[i];
                                            $scope.resultArray.push({
                                                mainTitle: article.Title,
                                                articleInfo: {
                                                    acknowledgeNum: article.LikeCount,
                                                    commentNum: article.CommentCount,
                                                },
                                                url: `article/${article.AuthorIdCode}/${article.SequenceNumberForAuthor}`,
                                            });
                                        }
                                    } else {
                                        $scope.resultArray = undefined;
                                        $scope.notFound = true;
                                    }
                                }, response => {
                                    notification.error('发生未知错误，请重试或与站务职员联系', response);
                                });
                            break;
                        case '用户':
                            $http.get(`${apiEndpoint}user/${encodeURIComponent(options.searchText)}`, {
                                params: { idType: 'UserName' },
                            }).then(response => {
                                if (response.data) {
                                    $scope.resultArray = [];
                                    const user = response.data;
                                    $scope.resultArray.push({
                                        mainTitle: user.UserName,
                                        subTitle: user.GamerTag,
                                        avatar: user.AvatarImage,
                                        type: '个人',
                                        url: `user/'${user.IdCode}`,
                                        isUser: true,
                                    });
                                }
                            }, error => {
                                if (error.status === 404) {
                                    $scope.resultArray = undefined;
                                    $scope.notFound = true;
                                } else {
                                    notification.error('发生未知错误，请重试或与站务职员联系', response);
                                }
                            });
                            break;
                        default :
                            $scope.resultArray = undefined;
                            $scope.notFound = true;
                    }
                }
            }
            for (let i = 0;i < $scope.filterArray.length;i++) {
                if ($scope.filterArray[i].active === true) {
                    $scope.filterText = $scope.filterArray[i].text;
                }
            }
            $scope.$watch(() => {
                return options.searchText;
            }, () => {
                getSearchResult($scope.filterText);
            });
            $scope.showPointAppealWindow = function () {
                window.show({
                    templateUrl: 'src/windows/shop-link.html',
                    controller: 'ShopLinkController',
                    controllerAs: 'ShopLink',
                });
            };
            $scope.changeFilter = function ($index) {
                if (!$scope.filterArray[$index].active) {
                    for (let i = 0;i < $scope.filterArray.length;i++) {
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
        },
    ]);
}());
