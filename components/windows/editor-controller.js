(function () {
    keylolApp.controller("EditorController", [
        "$scope", "close", "utils", "$http", "union", "$timeout", "$location", "notification", "options",
        "articleTypes", "$route", "$element",
        ($scope, close, utils, $http, union, $timeout, $location, notification, options,
        articleTypes, $route, $element) => {
            union.inEditor = true;
            $scope.editorOptions = { scrollableContainer: $element };
            $scope.union = union;
            $scope.articleTypes = articleTypes;
            $scope.expanded = false;
            $scope.lastSaveTime = null;
            $scope.inline = {};
            $scope.selectedTypeIndex = 0;
            const autoSaveInterval = 30000;

            const editorId = utils.uniqueId();
            $(window).on(`beforeunload.editor${editorId}`, () => {
                return "未保存的内容将被弃置。";
            });

            $scope.$on("$destroy", () => {
                $(window).off(`beforeunload.editor${editorId}`);
            });

            const detachLocationListener = $scope.$on("$locationChangeStart", e => {
                if (confirm("未保存的内容将被弃置，确认离开？")) {
                    detachLocationListener();
                    $(window).off(`beforeunload.editor${editorId}`);
                } else {
                    e.preventDefault();
                }
            });

            const finalOptions = $.extend({
                vm: null,
                needConfirmLoadingDraft: false,
            }, options);

            function setupNewVM () {
                $scope.vm = $.extend({
                    Title: "",
                    Content: "",
                    Summary: "",
                    Pros: [],
                    Cons: [],
                    Vote: null,
                }, finalOptions.vm);
                if ($scope.vm.TypeName) {
                    for (let i = 0; i < articleTypes.length; ++i) {
                        if (articleTypes[i].name === $scope.vm.TypeName) {
                            $scope.selectedTypeIndex = i;
                            break;
                        }
                    }
                }
                if (finalOptions.attachedPoints)
                    $scope.inline.attachedPoints = finalOptions.attachedPoints;
                if (finalOptions.voteForPoint) {
                    $scope.vm.VoteForPointId = finalOptions.voteForPoint.Id;
                    $scope.inline.voteForPoints = [finalOptions.voteForPoint];
                }
            }

            let autoSaveTimeout;
            $scope.saveDraft = function () {
                $timeout.cancel(autoSaveTimeout);
                $scope.lastSaveTime = moment();
                union.$localStorage.editorDrafts[draftKey] = {
                    vm: $scope.vm,
                    time: $scope.lastSaveTime,
                    selectedTypeIndex: $scope.selectedTypeIndex,
                    attachedPoints: $scope.inline.attachedPoints,
                    voteForPoints: $scope.inline.voteForPoints,
                };
                autoSaveTimeout = $timeout($scope.saveDraft, autoSaveInterval);
            };

            if (!union.$localStorage.editorDrafts) union.$localStorage.editorDrafts = {};
            const draftKey = finalOptions.vm ? finalOptions.vm.Id : "new";
            const draft = union.$localStorage.editorDrafts[draftKey];
            if (draft) {
                const loadDraft = () => {
                    $scope.vm = draft.vm;
                    $scope.lastSaveTime = draft.time;
                    if (articleTypes[draft.selectedTypeIndex].allowVote) {
                        $scope.inline.voteForPoints = draft.voteForPoints;
                    } else {
                        $scope.inline.attachedPoints = draft.attachedPoints;
                    }
                    $scope.selectedTypeIndex = draft.selectedTypeIndex;
                    notification.success("本地草稿已加载");
                };
                if (finalOptions.needConfirmLoadingDraft) {
                    setupNewVM();
                    notification.attention("直接编辑上次未完成的草稿", [
                        { action: "加载草稿", value: true },
                        { action: "取消" },
                    ]).then(result => {
                        if (result) {
                            loadDraft();
                        }
                        autoSaveTimeout = $timeout($scope.saveDraft, autoSaveInterval);
                    });
                } else if (finalOptions.doNotLoadDraft) {
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

            function getAttachedPointsFromVoteForPoint () {
                $scope.inline.attachedPoints = [];
                if ($scope.vm.VoteForPointId) {
                    $http.get(`${apiEndpoint}/normal-point/${$scope.vm.VoteForPointId}/related`)
                        .then(response => {
                            $scope.inline.attachedPoints = response.data;
                        }, response => {
                            notification.error("获取关联据点错误", response);
                        });
                }
            }

            $scope.$watchCollection("inline.attachedPoints", newValue => {
                $scope.vm.AttachedPointsId = [];
                if (newValue)
                    for (let i = 0; i < newValue.length; ++i) {
                        $scope.vm.AttachedPointsId.push(newValue[i].Id);
                    }
            });

            $scope.$watchCollection("inline.voteForPoints", newValue => {
                $scope.vm.VoteForPointId = null;
                if (newValue && newValue.length > 0) {
                    $scope.vm.VoteForPointId = newValue[0].Id;
                }
                if ($scope.vm.TypeName === "评") {
                    getAttachedPointsFromVoteForPoint();
                }
            });

            $scope.$watch("selectedTypeIndex", (newValue, oldValue) => {
                $scope.vm.TypeName = articleTypes[newValue].name;
                if (articleTypes[newValue].allowVote && !articleTypes[oldValue].allowVote) {
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
                    inputs: { selectedIndex: $scope.selectedTypeIndex },
                }).then(popup => {
                    return popup.close;
                }).then(result => {
                    $scope.expanded = !$scope.expanded;
                    if (!angular.isUndefined(result)) {
                        $scope.selectedTypeIndex = result;
                    }
                });
            };

            $scope.cancel = function () {
                notification.attention("关闭文章编辑器需要额外确认", [
                    { action: "关闭", value: true },
                    { action: "取消" },
                ]).then(result => {
                    if (result) {
                        $timeout.cancel(autoSaveTimeout);
                        union.inEditor = false;
                        close();
                    }
                });
            };

            function findNotCompleteVm () {
                if (!$scope.vm.Title) return "标题";
                if (!$scope.vm.Content) return "内容";
                if (articleTypes[$scope.selectedTypeIndex].allowVote) {
                    if (!$scope.vm.Vote) return "评分";
                    if (!$scope.vm.VoteForPointId) return "评价的游戏";
                }
                return null;
            }

            $scope.submitLock = false;
            $scope.submit = function () {
                if ($scope.submitLock)
                    return;
                $scope.submitLock = true;
                const notComplete = findNotCompleteVm();
                if (!notComplete) {
                    if ($scope.vm.Id) {
                        $http.put(`${apiEndpoint}article/${$scope.vm.Id}`, $scope.vm).then(() => {
                            delete union.$localStorage.editorDrafts[draftKey];
                            $timeout.cancel(autoSaveTimeout);
                            union.inEditor = false;
                            close();
                            detachLocationListener();
                            $route.reload();
                            notification.success("文章已发布");
                        }, response => {
                            notification.error("发生未知错误，请重试或与站务职员联系", response);
                            $scope.submitLock = false;
                        });
                    } else {
                        $http.post(`${apiEndpoint}article`, $scope.vm)
                            .then(response => {
                                delete union.$localStorage.editorDrafts[draftKey];
                                $timeout.cancel(autoSaveTimeout);
                                union.inEditor = false;
                                close();
                                detachLocationListener();
                                $location.url(`article/${union.$localStorage.user.IdCode}/${response.data.SequenceNumberForAuthor}`);
                                notification.success("文章已发布");
                            }, response => {
                                if (response.status === 401) {
                                    notification.error("现有文券数量不足，无法发文");
                                } else {
                                    notification.error("发生未知错误，请重试或与站务职员联系", response);
                                }
                                $scope.submitLock = false;
                            });
                    }
                } else {
                    notification.error(`${notComplete}不能为空`);
                    $scope.submitLock = false;
                }
            };
        },
    ]);
}());
