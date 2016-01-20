(function () {
    "use strict";

    keylolApp.controller("ShortReviewController", [
        "$scope", "close", "window", "notification", "$http", "options", "$location", "$route",
        function ($scope, close, window, notification, $http, options, $location, $route) {
            $scope.options = options;

            $scope.vm = options.vm ? $.extend({
                TypeName: "简评",
                Title: options.point.Name + " 的简评",
                VoteForPointId: options.point.Id
            }, options.vm) : {
                TypeName: "简评",
                Title: options.point.Name + " 的简评",
                Content: "",
                Vote: null,
                VoteForPointId: options.point.Id
            };
            $scope.count = $scope.vm.Content.length;

            $scope.cancel = function () {
                close();
            };
            
            $scope.changeToLong = function () {
                notification.attention("从简评切换为长评将会覆盖长评已保存的草稿", [
                    {action: "仍然切换", value: true},
                    {action: "取消"}
                ]).then(function (result) {
                    if (result) {
                        window.show({
                            templateUrl: "components/windows/editor.html",
                            controller: "EditorController",
                            inputs: {
                                options: {
                                    doNotLoadDraft: true,
                                    vm: {
                                        TypeName: "评",
                                        Title: "",
                                        Content: $scope.vm.Content,
                                        Vote: $scope.vm.Vote,
                                        Summary: "",
                                        Pros: [],
                                        Cons: []
                                    },
                                    voteForPoint: options.point
                                }
                            }
                        });
                        close();
                    }
                });
            };

            var submitLock = false;
            var checkEmpty = function(){
                if(!$scope.vm.Content) return "简评内容";
                if(!$scope.vm.Vote) return "简评评分";
                return null;
            };
            $scope.submit = function(){
                if (submitLock || $scope.vm.Content.length > 199)
                    return;
                var emptyString = checkEmpty();
                if(emptyString){
                    return notification.error(emptyString + "不能为空");
                }
                submitLock = true;
                if ($scope.vm.Id) {
                    $http.put(apiEndpoint + "article/" + $scope.vm.Id, $scope.vm)
                        .then(function (response) {
                            close();
                            $route.reload();
                            notification.success("简评已发布");
                        }, function (response) {
                            notification.error("未知错误, 请尝试再次发布", response);
                            submitLock = false;
                        });
                } else {
                    $http.post(apiEndpoint + "article", $scope.vm)
                        .then(function (response) {
                            close();
                            $location.url("article/" + union.$localStorage.user.IdCode + "/" + response.data.SequenceNumberForAuthor);
                            notification.success("简评已发布");
                        }, function (response) {
                            notification.error("未知错误, 请尝试再次发布", response);
                            submitLock = false;
                        });
                }
            }
        }
    ]);
})();