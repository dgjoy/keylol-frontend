(function () {
    "use strict";

    keylolApp.controller("EditorController", [
        "$scope", "close", "$element", "utils", "$http", "union", "$timeout", "$location",
        function ($scope, close, $element, utils, $http, union, $timeout, $location) {
            $scope.cancel = function () {
                if ($scope.cancelTimeout) {
                    $timeout.cancel($scope.cancelTimeout);
                }
                close();
            };
            $scope.radioId = [utils.uniqueId(), utils.uniqueId(), utils.uniqueId()];
            $scope.vm = {
                vote: 0
            };
            if (union.$localStorage.editCache) {
                $scope.vm.title = union.$localStorage.editCache.title;
                $scope.vm.content = union.$localStorage.editCache.content;
                $scope.vm.saveTime = union.$localStorage.editCache.saveTime;
            }
            $scope.saveDraft = function () {
                $scope.vm.saveTime = moment();
                union.$localStorage.editCache = {
                    title: $scope.vm.title,
                    content: $scope.vm.content,
                    saveTime: $scope.vm.saveTime
                };
                if ($scope.cancelTimeout) {
                    $timeout.cancel($scope.cancelTimeout);
                }
                createTimeout();
            };
            var createTimeout = function () {
                $scope.cancelTimeout = $timeout(function () {
                    $scope.vm.saveTime = moment();
                    union.$localStorage.editCache = {
                        title: $scope.vm.title,
                        content: $scope.vm.content,
                        saveTime: $scope.vm.saveTime
                    };
                    createTimeout();
                }, 30000);
            };
            createTimeout();
            $scope.submit = function () {
                var attachedId = [];
                if ($scope.vm.selector && $scope.vm.selector.length > 5) {
                    return alert("不能同时投稿多于5个据点");
                }
                for (var i in $scope.vm.selector) {
                    attachedId.push($scope.vm.selector[i].id);
                }
                var submitObj = {
                    TypeId: $scope.articleTypeArray[selectedType].Id,
                    Title: $scope.vm.title,
                    Content: $scope.vm.content,
                    AttachedPointsId: attachedId
                };
                if ($scope.articleTypeArray[selectedType].AllowVote) {
                    submitObj.VoteForPointId = "";
                    if ($scope.vm.voteForPoint[0]) {
                        submitObj.VoteForPointId = $scope.vm.voteForPoint[0].id;
                    }
                    if ($scope.vm.vote != 2) {
                        submitObj.Vote = $scope.vm.vote;
                    }
                }
                $http.post(apiEndpoint + "article", submitObj)
                    .then(function (response) {
                        alert("发布成功");
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
                        alert("未知错误, 请尝试再次发布");
                        console.error(error);
                    });
            };
            $scope.funcs = {};
            $scope.expanded = false;
            var selectedType = 0;
            $http.get(apiEndpoint + "article-type")
                .then(function (response) {
                    $scope.articleTypeArray = response.data;

                    $scope.expandString = $scope.articleTypeArray[selectedType].Name;
                    $scope.allowVote = $scope.articleTypeArray[selectedType].AllowVote;
                    $scope.expand = function ($event) {
                        var popup = $scope.funcs.showSelector({
                            templateUrl: "components/popup/article-selector.html",
                            controller: "ArticleSelectorController",
                            event: $event,
                            attachSide: "bottom",
                            align: "left",
                            offsetX: -6,
                            inputs: {
                                selectedType: selectedType,
                                articleTypeArray: $scope.articleTypeArray
                            }
                        });

                        $scope.expanded = !$scope.expanded;
                        if (popup) {
                            popup.then(function (popup) {
                                return popup.close;
                            }).then(function (result) {
                                if (result || result == 0) {
                                    selectedType = result;
                                    $scope.expandString = $scope.articleTypeArray[selectedType].Name;
                                    $scope.allowVote = $scope.articleTypeArray[selectedType].AllowVote;
                                }
                                $scope.expanded = !$scope.expanded;
                            });
                        }
                    }
                }, function (error) {
                    alert(error);
                    console.error(error);
                });
        }
    ]);
})();