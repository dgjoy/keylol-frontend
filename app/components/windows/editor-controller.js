(function () {
    "use strict";

    keylolApp.controller("EditorController", [
        "$scope", "close", "$element", "utils", "$http", "union", "$timeout", "$location", "notification", "options",
        function ($scope, close, $element, utils, $http, union, $timeout, $location, notification, options) {
            $scope.cancel = function () {
                notification.attention("关闭已改动的编辑器", [
                    {action: "关闭", value: true},
                    {action: "取消"}
                ]).then(function (result) {
                    if (result) {
                        if ($scope.cancelTimeout) {
                            $timeout.cancel($scope.cancelTimeout);
                        }
                        close();
                    }
                });
            };
            $scope.radioId = [utils.uniqueId(), utils.uniqueId(), utils.uniqueId()];

            /**
             * 读取对应文章在本地的缓存或读取文章信息以初始化 vm 变量。
             */
            if (!union.$localStorage.editCache) {
                union.$localStorage.editCache = {}
            }
            if (options.type === "upload") {
                if (!($scope.vm = union.$localStorage.editCache["upload"])) {
                    $scope.vm = {
                        vote: 2,
                        selectedType: 0
                    }
                } else {
                    notification.success("本地草稿已加载");
                }
            } else {
                if (!($scope.vm = union.$localStorage.editCache[options.article.Id])) {
                    $scope.vm = {
                        title: options.article.Title,
                        content: options.article.Content,
                        selectedType: 0
                    };
                    if (options.article.Vote) {
                        switch (options.article.Vote) {
                            case "好评":
                                $scope.vm.vote = 0;
                                break;
                            case "差评":
                                $scope.vm.vote = 1;
                                break;
                        }
                    } else {
                        $scope.vm.vote = 2;
                    }
                    if (options.article.AttachedPoints.length > 0) {
                        $scope.vm.selector = [];
                        for (var i in options.article.AttachedPoints) {
                            var point = options.article.AttachedPoints[i];
                            $scope.vm.selector.push({
                                title: point[point.PreferedName + "Name"],
                                selected: false,
                                id: point.Id
                            });
                        }
                    }
                } else {
                    notification.success("本地草稿已加载");
                }
            }

            $scope.funcs = {};
            $scope.expanded = false;
            $scope.articleTypeArray = union.$localStorage.articleTypes;
            if ($scope.articleTypeArray) {
                $scope.expandString = $scope.articleTypeArray[$scope.vm.selectedType].Name;
                $scope.allowVote = $scope.articleTypeArray[$scope.vm.selectedType].AllowVote;
            }

            $scope.saveDraft = function () {
                $scope.vm.saveTime = moment();
                var editCacheObj;
                if (options.type === "upload") {
                    editCacheObj = "upload";
                } else {
                    editCacheObj = options.article.Id;
                }
                union.$localStorage.editCache[editCacheObj] = {};
                $.extend(union.$localStorage.editCache[editCacheObj], $scope.vm);
                if ($scope.cancelTimeout) {
                    $timeout.cancel($scope.cancelTimeout);
                }
                createTimeout();
            };
            var createTimeout = function () {
                $scope.cancelTimeout = $timeout(function () {
                    $scope.saveDraft();
                }, 30000);
            };
            createTimeout();
            $scope.submit = function () {
                var attachedId = [];
                if ($scope.vm.selector && $scope.vm.selector.length > 5) {
                    notification.attention("不能同时投稿多于5个据点");
                    return;
                }
                for (var i in $scope.vm.selector) {
                    attachedId.push($scope.vm.selector[i].id);
                }
                var submitObj = {
                    TypeId: $scope.articleTypeArray[$scope.vm.selectedType].Id,
                    Title: $scope.vm.title,
                    Content: $scope.vm.content,
                    AttachedPointsId: attachedId
                };
                if ($scope.articleTypeArray[$scope.vm.selectedType].AllowVote) {
                    submitObj.VoteForPointId = "";
                    if ($scope.vm.voteForPoint && $scope.vm.voteForPoint[0]) {
                        submitObj.VoteForPointId = $scope.vm.voteForPoint[0].id;
                    }
                    if ($scope.vm.vote != 2) {
                        submitObj.Vote = $scope.vm.vote;
                    }
                }
                if (options.type === "upload") {
                    $http.post(apiEndpoint + "article", submitObj)
                        .then(function (response) {
                            notification.success("文章已发布");
                            union.$localStorage.editCache = {
                                title: "",
                                content: "",
                                saveTime: null
                            };
                            if ($scope.cancelTimeout) {
                                $timeout.cancel($scope.cancelTimeout);
                            }
                            close();
                            $location.url("article/" + union.$localStorage.user.IdCode + "/" + response.data.SequenceNumberForAuthor);
                        }, function (error) {
                            notification.error("未知错误, 请尝试再次发布");
                            console.error(error);
                        });
                } else {
                    console.log(submitObj);
                }
            };

            $scope.expand = function ($event) {
                if (!$scope.articleTypeArray) return;
                var popup = $scope.funcs.showSelector({
                    templateUrl: "components/popup/article-selector.html",
                    controller: "ArticleSelectorController",
                    event: $event,
                    attachSide: "bottom",
                    align: "left",
                    offsetX: -6,
                    inputs: {
                        selectedType: $scope.vm.selectedType,
                        articleTypeArray: $scope.articleTypeArray
                    }
                });

                $scope.expanded = !$scope.expanded;
                if (popup) {
                    popup.then(function (popup) {
                        return popup.close;
                    }).then(function (result) {
                        if (result || result == 0) {
                            $scope.vm.selectedType = result;
                            $scope.expandString = $scope.articleTypeArray[$scope.vm.selectedType].Name;
                            $scope.allowVote = $scope.articleTypeArray[$scope.vm.selectedType].AllowVote;
                        }
                        $scope.expanded = !$scope.expanded;
                    });
                }
            };

            $http.get(apiEndpoint + "article-type").then(function (response) {
                $scope.articleTypeArray = response.data;
                union.$localStorage.articleTypes = response.data;
                if (!$scope.expandString) {
                    $scope.expandString = $scope.articleTypeArray[$scope.vm.selectedType].Name;
                    $scope.allowVote = $scope.articleTypeArray[$scope.vm.selectedType].AllowVote;
                }
            }, function (error) {
                notification.error(error);
                console.error(error);
            });
        }
    ]);
})();