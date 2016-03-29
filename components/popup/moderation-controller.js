(function () {
    "use strict";

    keylolApp.controller("ModerationController", [
        "$scope", "close", "$http", "notification", "$route", "$timeout", "type",
        "targetId", "moderationText", "union", "getAndFlushComments",
        function ($scope, close, $http, notification, $route, $timeout, type,
                  targetId, moderationText, union, getAndFlushComments) {
            var vm = this;
            $scope.union = union;
            $scope.text = type.isCancel?moderationText["Un" + type.action]:moderationText[type.action];
            $scope.type = type;
            vm.reasons = [];
            vm.notifyAuthor = true;

            $scope.submit = function () {
                if($scope.submitLock){
                    return;
                }
                var dto = {
                    Value: !type.isCancel,
                    NotifyAuthor: vm.notifyAuthor,
                    Property: type.action,
                    Reasons: []
                };
                for(var i = 0;i < vm.reasons.length;i++){
                    if(vm.reasons[i]){
                        dto.Reasons.push(i);
                    }
                }
                $scope.reasonEmpty = false;
                $timeout(function () {
                    $scope.submitLock = true;
                    if(type.target === "Article"){
                        $http.put(apiEndpoint + "article/" + targetId + "/moderation", dto).then(function () {
                            notification.success("操作成功");
                            $scope.submitLock = false;
                            $route.reload();
                        }, function (response) {
                            notification.error("发生未知错误，请重试或与站务职员联系", response);
                            $scope.submitLock = false;
                        });
                    }else if(type.target === "Comment") {
                        $http.put(apiEndpoint + "comment/" + targetId + "/moderation", dto).then(function () {
                            notification.success("操作成功");
                            $scope.submitLock = false;
                            close();
                            if(type.action === "Archived"){
                                if(type.isCancel){
                                    type.comment.Archived = 'None';
                                }else if(union.$localStorage.user.StaffClaim === "operator"){
                                    type.comment.Archived = 'Operator';
                                }else {
                                    type.comment.Archived = 'User';
                                }
                            }else if(type.action === "Warned"){
                                type.comment.Warned = !type.isCancel;
                            }
                        }, function (response) {
                            notification.error("发生未知错误，请重试或与站务职员联系", response);
                            $scope.submitLock = false;
                        });
                    }
                });
            }
        }
    ]);
})();