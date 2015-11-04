(function () {
    "use strict";

    keylolApp.controller("EditorController", [
        "$scope", "close", "utils", "$http", "union", "$timeout", "$location", "notification", "vm", "articleTypes", "$route",
        function ($scope, close, utils, $http, union, $timeout, $location, notification, vm, articleTypes, $route) {
            $scope.radioId = [utils.uniqueId(), utils.uniqueId(), utils.uniqueId()];
            $scope.articleTypes = articleTypes;
            $scope.expanded = false;
            $scope.lastSaveTime = null;
            $scope.inline = {};
            $scope.selectedTypeIndex = 0;

            if (!union.$localStorage.editorDrafts) union.$localStorage.editorDrafts = {};
            var draftKey = vm ? vm.Id : "new";
            var draft = union.$localStorage.editorDrafts[draftKey];
            if (draft) {
                $scope.vm = draft.vm;
                $scope.lastSaveTime = draft.time;
                $scope.inline.attachedPoints = draft.attachedPoints;
                $scope.inline.voteForPoints = draft.voteForPoints;
                $scope.selectedTypeIndex = draft.selectedTypeIndex;
                notification.success("本地草稿已加载");
            } else {
                $scope.vm = $.extend({}, vm) || {
                        Title: "",
                        Content: "",
                        Vote: null
                    };
                if ($scope.vm.TypeName) {
                    for (var i = 0; i < articleTypes.length; ++i) {
                        if (articleTypes[i].name === $scope.vm.TypeName) {
                            $scope.selectedTypeIndex = i;
                            break;
                        }
                    }
                }
                if ($scope.vm.AttachedPoints)
                    $scope.inline.attachedPoints = $scope.vm.AttachedPoints;
                if ($scope.vm.VoteForPointId)
                    $scope.inline.voteForPoints = [{Id: $scope.vm.VoteForPointId, Name: $scope.vm.VoteForPointName}];
            }

            $scope.$watchCollection("inline.attachedPoints", function (newValue) {
                $scope.vm.AttachedPointsId = [];
                if (newValue)
                    for (var i = 0; i < newValue.length; ++i) {
                        $scope.vm.AttachedPointsId.push(newValue[i].Id);
                    }
            });

            $scope.$watchCollection("inline.voteForPoints", function (newValue) {
                $scope.vm.VoteForPointId = null;
                if (newValue && newValue.length > 0)
                    $scope.vm.VoteForPointId = newValue[0].Id;
            });

            $scope.$watch("selectedTypeIndex", function (newValue) {
                $scope.vm.TypeName = articleTypes[$scope.selectedTypeIndex].name;
            });

            var autoSaveTimeout = $timeout($scope.saveDraft, 30000);
            $scope.saveDraft = function () {
                $timeout.cancel(autoSaveTimeout);
                $scope.lastSaveTime = moment();
                union.$localStorage.editorDrafts[draftKey] = {
                    vm: $scope.vm,
                    time: $scope.lastSaveTime,
                    selectedTypeIndex: $scope.selectedTypeIndex,
                    attachedPoints: $scope.inline.attachedPoints,
                    voteForPoints: $scope.inline.voteForPoints
                };
                autoSaveTimeout = $timeout($scope.saveDraft, 30000);
            };

            $scope.expand = function ($event) {
                $scope.expanded = !$scope.expanded;
                $scope.inline.showSelector({
                    templateUrl: "components/popup/article-type-selector.html",
                    controller: "ArticleTypeSelectorController",
                    event: $event,
                    attachSide: "bottom",
                    align: "left",
                    offsetX: -6,
                    inputs: {
                        selectedIndex: $scope.selectedTypeIndex
                    }
                }).then(function (popup) {
                    return popup.close;
                }).then(function (result) {
                    $scope.expanded = !$scope.expanded;
                    if (!angular.isUndefined(result)) {
                        $scope.selectedTypeIndex = result;
                    }
                });
            };

            $scope.cancel = function () {
                notification.attention("关闭文章编辑器需要额外确认", [
                    {action: "关闭", value: true},
                    {action: "取消"}
                ]).then(function (result) {
                    if (result) {
                        $timeout.cancel(autoSaveTimeout);
                        close();
                    }
                });
            };

            $scope.submit = function () {
                if ($scope.vm.AttachedPointsId.length > 5) {
                    notification.attention("不能同时投稿多于5个据点");
                    return;
                }
                if ($scope.vm.Id) {

                    var dirtyFields = {};
                    for (var key in $scope.vm) {
                        if (key === "AttachedPointsId") {
                            var oldAttachedPointsId = [];
                            for (var i = 0; i < vm.AttachedPoints.length; ++i)
                                oldAttachedPointsId.push(vm.AttachedPoints[i].Id);
                            if (JSON.stringify($scope.vm.AttachedPointsId) != JSON.stringify(oldAttachedPointsId))
                                dirtyFields.AttachedPointsId = $scope.vm.AttachedPointsId;
                            continue;
                        }

                        if ($scope.vm.hasOwnProperty(key) && $scope.vm[key] != vm[key]) {
                            if ($scope.vm[key] != vm[key])
                                dirtyFields[key] = $scope.vm[key];
                        }
                    }

                    if ($.isEmptyObject(dirtyFields)) {
                        delete union.$localStorage.editorDrafts[draftKey];
                        $timeout.cancel(autoSaveTimeout);
                        close();
                        notification.success("文章已发布");
                        return;
                    }

                    dirtyFields.AttachedPointsId = $scope.vm.AttachedPointsId;
                    dirtyFields.VoteForPointId = $scope.vm.VoteForPointId;
                    dirtyFields.Vote = $scope.vm.Vote;

                    $http.put(apiEndpoint + "article/" + $scope.vm.Id, dirtyFields)
                        .then(function () {
                            delete union.$localStorage.editorDrafts[draftKey];
                            $timeout.cancel(autoSaveTimeout);
                            close();
                            $route.reload();
                            notification.success("文章已发布");
                        }, function (error) {
                            notification.error("未知错误, 请尝试再次发布");
                            console.error(error);
                        });
                } else {
                    $http.post(apiEndpoint + "article", $scope.vm)
                        .then(function (response) {
                            delete union.$localStorage.editorDrafts[draftKey];
                            $timeout.cancel(autoSaveTimeout);
                            close();
                            $location.url("article/" + union.$localStorage.user.IdCode + "/" + response.data.SequenceNumberForAuthor);
                            notification.success("文章已发布");
                        }, function (error) {
                            notification.error("未知错误, 请尝试再次发布");
                            console.error(error);
                        });
                }
            };
        }
    ]);
})();