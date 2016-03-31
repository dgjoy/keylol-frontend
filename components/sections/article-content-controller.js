(function () {
    "use strict";

    keylolApp.controller("ArticleContentController", [
        "$scope", "union", "$http", "notification",
        function ($scope, union, $http, notification) {
            $scope.union = union;
            $scope.article = union.article;
            $scope.acknowledge = function () {
                $http.post(apiEndpoint + "like", {
                    TargetId: $scope.article.Id,
                    Type: "ArticleLike"
                }).then(function (response) {
                    notification.success("认可已生效，每日发出的前 5 个认可不会消耗文券");
                }, function (response) {
                    $scope.article.LikeCount -= 1;
                    $scope.article.Liked = false;
                    if (response.status === 401) {
                        notification.error("现有文券数量不足，无法发出认可");
                    } else {
                        notification.error("认可失败", response);
                    }
                });
                $scope.article.Liked = true;
                $scope.article.LikeCount += 1;
            };
            $scope.cancelAcknowledge = function () {
                $http.delete(apiEndpoint + "like", {
                    params: {
                        targetId: $scope.article.Id,
                        type: "ArticleLike"
                    }
                }).then(function (response) {
                    notification.success("此认可已被撤销");
                }, function (response) {
                    notification.error("取消认可失败", response);
                });
                $scope.article.Liked = false;
                $scope.article.LikeCount -= 1;
            };
        }
    ]);
})();
