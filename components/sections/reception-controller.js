(function () {
    "use strict";

    keylolApp.controller("ReceptionController", [
        "$scope", "$http", "notification", "union", "$routeParams", "utils",
        function ($scope, $http, notification, union, $routeParams, utils) {
            $scope.quickLinks = [];
            $scope.recentLinks = [];
            $.extend($scope.recentLinks, union.$localStorage.recentBrowse);

            var setupQuickLinks = function (quickLinks) {
                $.extend($scope.quickLinks, quickLinks);
                $scope.canBeAdd = $scope.quickLinks.length < 5;
                for (var i in $scope.quickLinks) {
                    switch ($scope.quickLinks[i].Type) {
                        case "Unknown":
                            break;
                        case "NormalPoint":
                            if ($routeParams.pointIdCode === $scope.quickLinks[i].IdCode) {
                                $scope.canBeAdd = false;
                            }
                            break;
                        case "ProfilePoint":
                            if ($routeParams.userIdCode === $scope.quickLinks[i].IdCode) {
                                $scope.canBeAdd = false;
                            }
                            break;
                    }
                }
            };

            if (union.$localStorage.favorites)
                setupQuickLinks(union.$localStorage.favorites);

            $http.get(apiEndpoint + "favorite")
                .then(function (response) {
                    union.$localStorage.favorites = response.data;
                    setupQuickLinks(response.data);
                }, function (response) {
                    notification.error("发生未知错误，请重试或与站务职员联系", response);
                });

            $scope.deleteFavorite = function (index) {
                var deleteLink = $scope.quickLinks[index];
                notification.attention("将此据点由收藏夹移除", [
                    {action: "移除", value: true},
                    {action: "取消"}
                ]).then(function (result) {
                    if (result) {
                        $http.delete(apiEndpoint + "favorite/" + deleteLink.Id)
                            .then(function () {
                                if (deleteLink.Type !== "Unknown" && ($routeParams.pointIdCode === deleteLink.IdCode || $routeParams.userIdCode === deleteLink.IdCode)) {
                                    $scope.canBeAdd = true;
                                }
                                $scope.quickLinks.splice(index, 1);
                            }, function (response) {
                                notification.error("发生未知错误，请重试或与站务职员联系", response);
                            });
                    }
                });
            };

            $scope.addFavorite = function () {
                if ($routeParams.pointIdCode && union.point.Id) {
                    $scope.canBeAdd = false;
                    $http.post(apiEndpoint + "favorite", {}, {
                        params: {
                            pointId: union.point.Id
                        }
                    }).then(function (response) {
                        $scope.quickLinks.push({
                            Id: response.data,
                            Type: "NormalPoint",
                            IdCode: union.point.IdCode,
                            Name: utils.getPointFirstName(union.point)
                        });
                        notification.success("当前据点已添加到收藏夹");
                    }, function (response) {
                        notification.error("发生未知错误，请重试或与站务职员联系", response);
                        $scope.canBeAdd = true;
                    });
                } else if ($routeParams.userIdCode && union.user.Id) {
                    $scope.canBeAdd = false;
                    $http.post(apiEndpoint + "favorite", {}, {
                        params: {
                            pointId: union.user.Id
                        }
                    }).then(function (response) {
                        $scope.quickLinks.push({
                            Id: response.data,
                            Type: "ProfilePoint",
                            IdCode: union.user.IdCode,
                            Name: union.user.UserName
                        })
                    }, function (response) {
                        notification.error("发生未知错误，请重试或与站务职员联系", response);
                        $scope.canBeAdd = true;
                    });
                }
            };

            $scope.deleteRecentBroswe = function () {
                union.$localStorage.recentBrowse = [];
                $scope.recentLinks = [];
            }
        }
    ]);
})();