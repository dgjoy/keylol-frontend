(function () {
    "use strict";

    keylolApp.controller("EditorController", [
        "$scope", "close", "utils", "$http", "union", "$timeout", "$location", "notification", "options",
        "articleTypes", "$route", "$element",
        function ($scope, close, utils, $http, union, $timeout, $location, notification, options,
                  articleTypes, $route, $element) {
            $scope.editorOptions = {
                scrollableContainer: $element
            };
            $scope.articleTypes = articleTypes;
            $scope.expanded = false;
            $scope.lastSaveTime = null;
            $scope.inline = {};
            $scope.selectedTypeIndex = 0;
            var autoSaveInterval = 30000;

            var editorId = utils.uniqueId();
            $(window).on("beforeunload.editor" + editorId, function () {
                return "未保存的内容将被弃置。";
            });

            $scope.$on("$destroy", function () {
                $(window).off("beforeunload.editor" + editorId);
            });

            var detachLocationListener = $scope.$on("$locationChangeStart", function (e) {
                if (confirm("未保存的内容将被弃置，确认离开？")) {
                    detachLocationListener();
                    $(window).off("beforeunload.editor" + editorId);
                } else {
                    e.preventDefault();
                }
            });

            options = $.extend({
                vm: null,
                needConfirmLoadingDraft: false
            }, options);

            var setupNewVM = function () {
                $scope.vm = options.vm ? $.extend({}, options.vm) : {
                    Title: "",
                    Content: "",
                    Summary: "",
                    Pros: [],
                    Cons: [],
                    Vote: null
                };
                if ($scope.vm.TypeName) {
                    for (var i = 0; i < articleTypes.length; ++i) {
                        if (articleTypes[i].name === options.TypeName) {
                            $scope.selectedTypeIndex = i;
                            break;
                        }
                    }
                }
                if (options.attachedPoints)
                    $scope.inline.attachedPoints = options.attachedPoints;
                if (options.voteForPoint) {
                    options.vm.VoteForPointId = options.voteForPoint.Id;
                    $scope.inline.voteForPoints = [options.voteForPoint];
                }
            };

            var autoSaveTimeout;
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
                autoSaveTimeout = $timeout($scope.saveDraft, autoSaveInterval);
            };

            if (!union.$localStorage.editorDrafts) union.$localStorage.editorDrafts = {};
            var draftKey = options.vm ? options.vm.Id : "new";
            var draft = union.$localStorage.editorDrafts[draftKey];
            if (draft) {
                var loadDraft = function () {
                    $scope.vm = draft.vm;
                    $scope.lastSaveTime = draft.time;
                    if(articleTypes[draft.selectedTypeIndex].allowVote){
                        $scope.inline.voteForPoints = draft.voteForPoints;
                    }else {
                        $scope.inline.attachedPoints = draft.attachedPoints;
                    }
                    $scope.selectedTypeIndex = draft.selectedTypeIndex;
                    notification.success("本地草稿已加载");
                };
                if (options.needConfirmLoadingDraft) {
                    notification.attention("直接编辑上次未完成的草稿", [
                        {action: "加载草稿", value: true},
                        {action: "取消"}
                    ]).then(function (result) {
                        if (result) {
                            loadDraft();
                        }else {
                            setupNewVM();
                        }
                        autoSaveTimeout = $timeout($scope.saveDraft, autoSaveInterval);
                    });
                } else if (options.doNotLoadDraft) {
                    setupNewVM();
                    autoSaveTimeout = $timeout($scope.saveDraft, autoSaveInterval);
                } else {
                    loadDraft();
                    autoSaveTimeout = $timeout($scope.saveDraft, autoSaveInterval);
                }
            } else {
                setupNewVM();
                autoSaveTimeout = $timeout($scope.saveDraft, autoSaveInterval);
            }

            var getAttachedPointsFromVoteForPoint = function(){
                $scope.inline.attachedPoints = [];
                if($scope.vm.VoteForPointId){
                    $http.get(apiEndpoint + "/normal-point/" + $scope.vm.VoteForPointId + "/related")
                        .then(function (response) {
                            $scope.inline.attachedPoints = response.data;
                        }, function (response) {
                            notification.error("获取关联据点错误", response);
                        });
                }
            };

            $scope.$watchCollection("inline.attachedPoints", function (newValue) {
                $scope.vm.AttachedPointsId = [];
                if (newValue)
                    for (var i = 0; i < newValue.length; ++i) {
                        $scope.vm.AttachedPointsId.push(newValue[i].Id);
                    }
            });

            $scope.$watchCollection("inline.voteForPoints", function (newValue) {
                $scope.vm.VoteForPointId = null;
                if (newValue && newValue.length > 0){
                    $scope.vm.VoteForPointId = newValue[0].Id;
                }
                getAttachedPointsFromVoteForPoint();
            });

            $scope.$watch("selectedTypeIndex", function (newValue, oldValue) {
                $scope.vm.TypeName = articleTypes[newValue].name;
                if(articleTypes[newValue].allowVote && !articleTypes[oldValue].allowVote){
                    getAttachedPointsFromVoteForPoint();
                }
            });

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

            var findNotCompleteVm = function(){
                if(!$scope.vm.Title) return "标题";
                if(!$scope.vm.Content) return "内容";
                if(articleTypes[$scope.selectedTypeIndex].allowVote){
                    if(!$scope.vm.Vote) return "评分";
                    if(!$scope.vm.VoteForPointId) return "评价的游戏";
                }
                return null;
            };

            var submitLock = false;
            $scope.submit = function () {
                if (submitLock)
                    return;
                submitLock = true;
                var notComplete = findNotCompleteVm();
                if(!notComplete){
                    if ($scope.vm.Id) {

                        $http.put(apiEndpoint + "article/" + $scope.vm.Id, $scope.vm)
                            .then(function () {
                                delete union.$localStorage.editorDrafts[draftKey];
                                $timeout.cancel(autoSaveTimeout);
                                close();
                                detachLocationListener();
                                $route.reload();
                                notification.success("文章已发布");
                            }, function (response) {
                                notification.error("未知错误, 请尝试再次发布", response);
                                submitLock = false;
                            });
                    } else {
                        $http.post(apiEndpoint + "article", $scope.vm)
                            .then(function (response) {
                                delete union.$localStorage.editorDrafts[draftKey];
                                $timeout.cancel(autoSaveTimeout);
                                close();
                                detachLocationListener();
                                $location.url("article/" + union.$localStorage.user.IdCode + "/" + response.data.SequenceNumberForAuthor);
                                notification.success("文章已发布");
                            }, function (response) {
                                notification.error("未知错误, 请尝试再次发布", response);
                                submitLock = false;
                            });
                    }
                }else {
                    notification.error(notComplete + "不能为空");
                }
            };
        }
    ]);
})();