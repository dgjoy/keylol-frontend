(function () {
    "use strict";

    keylolApp.controller("ShortReviewController", [
        "$scope", "close", "window", "notification", "$http", "options",
        function ($scope, close, window, notification, $http, options) {
            $scope.vm = {
                TypeName: "简评",
                Content: "",
                Vote: null,
                VoteForPointId: options.pointId
            };
            $scope.options = options;

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
                                        Content: $scope.vm.Content,
                                        Vote: $scope.vm.Vote,
                                        VoteForPoint: {
                                            Id: $scope.vm.VoteForPointId,
                                            EnglishName: "Dota2",
                                            PreferredName: "English"
                                        }
                                    }
                                }
                            }
                        });
                        close();
                    }
                });
            };

            var submitLock = false;
            $scope.submit = function(){
                if (submitLock || !$scope.vm.Content || !$scope.vm.Vote)
                    return;
                submitLock = true;
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
    ]);
})();